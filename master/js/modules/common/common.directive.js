/**
 * Created by Yoni on 12/30/2017.
 */
//Directive

(function(angular) {

    'use strict';

    angular.module('angle')
        .directive('permission', function(PermissionService) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {

                // scope.$watch(attrs.permission, function(value) {
                //     var permission = value;
                //     var hasPermission = false;
                //     if (_.isString(permission)) {
                //         hasPermission = PermissionService.hasThisPermission(permission)
                //     } else if (_.isArray(permission)) {

                //         hasPermission = PermissionService.hasThesePermissions(permission) //multiple permissions
                //     }

                //     toggleVisibility(hasPermission);
                // });

                function toggleVisibility(hasPermission) {
                    if (hasPermission) {
                        element.show();
                    } else {
                        element.hide();
                    }
                }
            }
        };
    }).directive('filesInput', function() {
        return {
          require: 'ngModel',
          link: function postLink(scope,elem,attrs,ngModel) {
              console.log("file added");
            elem.on('change', function(e) {
              var files = elem[0].files;
              ngModel.$setViewValue(files);
            })
          }
        }
      });



})(window.angular);


