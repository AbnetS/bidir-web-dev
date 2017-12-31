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
            permissions:_permissions,
            permittedModules:_permittedModules
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
                    response.permissions =  user.account.role.permissions;
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

        function _permittedModules(){

            var permissions = _permissions().permissions;
            var moduleObj = _.uniq(permissions,function(permi){
                return permi.module;
            });

            return _.pluck(moduleObj, 'module');
        }

        function _hasThisPermission(permission) {
            var allPermissions = _permissions();
            var hasPermission = false;
            
            if(allPermissions.isSuper){
                hasPermission = true;
            }else{
                var permissions = _.map(allPermissions.permissions, function(perm) {
                    return perm.module + '_' + perm.operation; 
                });
            hasPermission = _.contains(permissions, permission);
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