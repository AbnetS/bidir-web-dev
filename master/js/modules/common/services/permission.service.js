/**
 * Created by Yoni on 12/30/2017.
 */


(function(angular) {

    'use strict';

    angular.module('app.auth')
        .factory('PermissionService', PermissionService);

    PermissionService.$inject = ['StorageService','APP_CONSTANTS','AuthService'];

    function PermissionService(StorageService,APP_CONSTANTS,AuthService) {
        var factory = {
            hasThisPermission:_hasThisPermission,
            hasThesePermissions:_hasThesePermissions,
            permissions:_permissions
        };

        return factory;


        function _permissions() {
            var user =  AuthService.GetCurrentUser();
            var response = {
                isSuper: false,
                permissions:[]
            };

            if(!_.isUndefined(user) && user !== null){
                if(!_.isUndefined(user.account)){
                    response.isSuper = false;
                    response.permissions =  _.map(user.account.role.permissions, function(perm) {
                        return perm.module + '_' + perm.operation; 
                    });
                    return response;
                }
                else if (!_.isUndefined(user.admin)) {
                    response  = {
                        isSuper: true,//superadmin
                        permissions:[]
                    };
                    return response;
                } else {
                    return response;
                }
            }else{
                return null;
            }

        }

        function _hasThisPermission(permission) {
            var permissions = _permissions();
            var hasPermission = false;
            
            if(permissions.isSuper){
                hasPermission = true;
            }else{
            hasPermission = _.contains(permissions.permissions, permission);
            }
            return hasPermission;
        }

        function _hasThesePermissions(permissions) {
            var hasPermission = false;
            _.each(permissions, function(permission) {
                //return true if user has access to one of the permissions
                hasPermission = hasPermission || _hasThisPermission(permission);
            });
            return hasPermission;
        }



    }

})(window.angular);