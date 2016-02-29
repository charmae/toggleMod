/**************************************************************
 *
 * ToggleMod version 1.0.0
 * Documentation can be found at https://github.com/charmae/toggleMod
 *
 **************************************************************/

(function($) {
    var ToggleMod = function(element, options) {
        var settings = $.extend({}, $.fn.toggleMod.defaults, options);
        var link_trigger_selector = $(settings.linkTargetSelector);
        var not_link_target = $(settings.targetsHide);
        var link_target = $(settings.targetsShow);

        //init event handler
        var toggleMethod = function() {

            var last_clicked;
            link_trigger_selector.click(function(e) {
                if (last_clicked != e.target.id) {
                    settings.updateCallback();
                    last_clicked = e.target.id;
                    markTargets(link_target, "show");
                    markTargets(not_link_target, "hide");
                } else {
                    var target = link_target[0];
                    if ($(target + ":hidden")
                        .length) {

                        markTargets(link_target, "show");
                        markTargets(not_link_target, "hide");
                    } else if ($(target + ":visible")
                        .length) {
                        markTargets(link_target, "hide");
                    }
                }
            });
        };

        var markTargets = function(elements, options) {

            var isHidden = {
                "hide": true,
                "show": false
            };
            $(elements)
                .each(function(index, element) {
                    isHidden[options] ? $(element)
                        .hide() : $(element)
                        .show();
                });
        };

        var isTargetHidden = function(targets) {
            targets.each(function(elem) {
                return elem.is('hidden');
            });
        }

        var initState = {
            'collapse': function() {
                markTargets(link_target, "hide");
            },
            'collapsed': function() {
                markTargets(link_target, "show");

            }
        }

        var start = function() {
            initState[settings.initialState]();
            toggleMethod();
        };

        start();
    }

    $.fn.toggleMod = function(options) {
        return this.each(function(key, value) {
            var element = $(this);
            if (element.data('toggleMod')) {
                return element.data('toggleMod');
            }
            var toggleMod = new ToggleMod(this, options);
            element.data('toggleMod', toggleMod);
        });
    };

    //Default paramenters:
    //link_trigger_selector - link target holder to trigger toggle
    //targetsShow - list of targets selector to show ex. div#target
    //targetsHide - list of non target selector to hide ex. div#target
    //initialState 
    //     collapse - for collapsed in state
    //     collapsed - for collapsed out state
    $.fn.toggleMod.defaults = {
        linkTargetSelector: "toggle-mod",
        targetsShow: [],
        targetsHide: [],
        initialState: "collapse"
            //updateCallback: updateMethod//method for update
    };

})(jQuery);
