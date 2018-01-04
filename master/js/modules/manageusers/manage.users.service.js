/**
 * Created by Yoni on 11/30/2017.
 */
(function(angular) {
    'use strict';
    angular.module('app.manage_users')

        .service('ManageUserService', ManageUserService);
    ManageUserService.$inject = ['$resource','$http', 'CommonService','AuthService'];

    function ManageUserService($resource,$http, CommonService,AuthService) {
        return {
            GetUsers: _getUsers,
            GetRoles: _getRoles,
            GetBranches: _getBranches,
            CreateUser: _saveUser,
            UpdateUser: _updateUser,
            UpdateUserStatus: _updateUserStatus
        };

        function _getUsers(params){

            // var httpConfig = {
            //     headers: {
            //         'Authorization': 'Bearer ' + AuthService.GetToken(),
            //         'Accept': 'application/json'
            //     }
            // };
            return $http.get(CommonService.buildPaginatedUrl(API.Service.Users,API.Methods.Users.GetAll,params));
        }
        function _getRoles(){
            // var httpConfig = {
            //     headers: {
            //         'Authorization': 'Bearer ' + AuthService.GetToken(),
            //         'Accept': 'application/json'
            //     }
            // };
            return $http.get(CommonService.buildPaginatedUrl(API.Service.Users,API.Methods.Users.Roles));
        }
        function _getBranches(){
            return $http.get(CommonService.buildPaginatedUrl(API.Service.MFI,API.Methods.MFI.Branches));
        }
        function _saveUser(user) {
            // var httpConfig = {
            //     headers: {
            //         'Authorization': 'Bearer ' + AuthService.GetToken(),
            //         'Accept': 'application/json'
            //     }
            // };
            return $http.post(CommonService.buildUrl(API.Service.Users,API.Methods.Users.User), user);
        }
        function _updateUser(account) {
            return $http.put(CommonService.buildUrlWithParam(API.Service.Users,API.Methods.Users.Account,account._id), account);
        }
        function _updateUserStatus(user) {
            return $http.put(CommonService.buildUrlWithParam(API.Service.Users,API.Methods.Users.UserUpdate,user._id), user);
        }
        
    }

})(window.angular);
