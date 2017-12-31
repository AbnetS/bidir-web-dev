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
                debugger;
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
    });



})(window.angular);


