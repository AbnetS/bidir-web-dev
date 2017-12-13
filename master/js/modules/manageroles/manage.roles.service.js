/**
 * Created by Yoni on 12/11/2017.
 */
(function(angular) {
    'use strict';
    angular.module('app.manage_roles')

        .service('ManageRoleService', ManageRoleService);
    ManageRoleService.$inject = ['$http', 'CommonService','AuthService'];

    function ManageRoleService($http, CommonService,AuthService) {
        return {
            GetRoles: _getRoles,
            GetPermissions: _getPermissions,
            SaveRole: _saveRole,
            UpdateRole:_updateRole
        };

        function _getRoles(){
            var httpConfig = {
                headers: {
                    'Authorization': 'Bearer ' + AuthService.GetToken(),
                    'Accept': 'application/json'
                }
            };
            return $http.get(CommonService.buildPaginatedUrl(API.Service.Users,API.Methods.Users.Roles),httpConfig);
        }

        function _getPermissions(){
            var httpConfig = {
                headers: {
                    'Authorization': 'Bearer ' + AuthService.GetToken(),
                    'Accept': 'application/json'
                }
            };
            return $http.get(CommonService.buildPaginatedUrl(API.Service.Users,API.Methods.Roles.Permissions),httpConfig);
        }

        function _saveRole(role) {
            var httpConfig = {
                headers: {
                    'Authorization': 'Bearer ' + AuthService.GetToken(),
                    'Accept': 'application/json'
                }
            };
            return $http.post(CommonService.buildUrl(API.Service.Users,API.Methods.Roles.Create), role,httpConfig);
        }

        function _updateRole(role) {
            var httpConfig = {
                headers: {
                    'Authorization': 'Bearer ' + AuthService.GetToken(),
                    'Accept': 'application/json'
                }
            };
            return $http.put(CommonService.buildUrlWithParam(API.Service.Users,API.Methods.Roles.GetAll,role._id), role,httpConfig);
        }

    }

})(window.angular);
