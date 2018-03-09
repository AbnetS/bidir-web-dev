/**
 * Created by Yoni on 12/30/2017.
 */
//Directive

(function(angular) {

    'use strict';

    angular.module('app.common')
        .directive('userpermission', function(PermissionService) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                scope.$watch(attrs.userpermission, function(value) {
                    var permission = value;
                    var hasPermission = false;
                    if (_.isString(permission)) {
                        hasPermission = PermissionService.hasThisPermission(permission);
                    } else if (_.isArray(permission)) {
                        hasPermission = PermissionService.hasThesePermissions(permission); //multiple permissions
                    }

                    toggleVisibility(hasPermission);
                });

                function toggleVisibility(hasPermission) {
                    if (hasPermission) {
                        element.show();
                    } else {
                        element.hide();
                    }
                }
            }
        };
    })
        // Text Editor template directive
        .directive('editor', function() {
        return {
            restrict: 'E',
            template: "<div ng-show='vm.editorEnabledForElement === (radioOption);'>" +
            "<input class='editableTextInput' type='text' ng-model='vm.text' ng-required='true' " +
            "show-focus='vm.editorEnabledForElement === (radioOption);' " +
            "keypress-enter='vm.saveOption(radioOption, vm.text)' " +
            "ng-blur='vm.saveOption(radioOption, vm.text)'" +
            " show-focus select-on-click >" +
            "</div>"
        };
    })
        .directive('keypressEnter', function() {
            return function(scope, element, attrs) {
                element.bind("keydown keypress", function(event) {
                    if (event.which === 13) {
                        scope.$apply(function() {
                            scope.$eval(attrs.keypressEnter);
                        });
                        console.log("Pressed enter.");
                        event.preventDefault();
                    }
                });
            };
        })
    // Put focus on element when event is triggered.
// https://coderwall.com/p/a41lwa/angularjs-auto-focus-into-input-field-when-ng-show-event-is-triggered

        .directive('eventFocus', function(focus) {
            return function(scope, elem, attr) {
                elem.on(attr.eventFocus, function() {
                    focus(attr.eventFocusId);
                });

                // // Removes bound events in the element itself
                // // when the scope is destroyed
                // scope.$on('$destroy', function() {
                //     element.off(attr.eventFocus);
                // });
            };
        })
    // Select text on focus.
// http://stackoverflow.com/questions/14995884/select-text-on-input-focus
    .directive('selectOnClick', ['$window', function($window) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.on('focus', function() {
                    if (!$window.getSelection().toString()) {
                        // Required for mobile Safari
                        this.setSelectionRange(0, this.value.length)
                    }
                });
            }
        };
    }]);


})(window.angular);


