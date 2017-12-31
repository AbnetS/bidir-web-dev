/**
 * Created by Yoni on 12/30/2017.
 */


(function(angular) {

    'use strict';

    angular.module('app.common')
        .factory('PermissionService', PermissionService);

    PermissionService.$inject = ['StorageService','APP_CONSTANTS','AuthService'];

    function PermissionService(StorageService,APP_CONSTANTS,AuthService) {
            var permissionsloc = _permissions();
        var factory = {
            hasThisPermission:_hasThisPermission,
            hasThesePermissions:_hasThesePermissions,
            permissions:_permissions
        };

        return factory;


        function _permissions() {
            var user =  AuthService.GetCurrentUser();

            if(!_.isUndefined(user) && user !== null){

                if(!_.isUndefined(user.account)){
                    return _.pluck(user.account.role.permissions, 'name');
                }
                else {
                    return null;
                }
            }else{
                return null;
            }

        }

        function _hasThisPermission(permission) {
            var permissions = this.permissions();
            var hasPermission = _.contains(permissions, permission);
            return hasPermission;
        }

        function _hasThesePermissions(permissions) {
            var hasPermission = false;
            _.each(permissions, function(permission) {
                //return true if user has access to one of the permissions
                hasPermission = hasPermission || accountService.hasThisPermission(permission);
            })
            return hasPermission;
        }



    }

})(window.angular);