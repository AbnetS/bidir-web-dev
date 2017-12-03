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
            SetUserInfo: function(user){
                this.user = user;
            },
            GetUserInfo:function(){
                return this.user;
            }
        };

        function _getUsers(){
            var httpConfig = {
                headers: {
                    'Authorization': 'Bearer ' + AuthService.GetToken(),
                    'Accept': 'application/json'
                }
            };
            return $http.get(CommonService.buildUrl(API.Service.Users,API.Methods.Users.GetAll),httpConfig);
        }
        function _getRoles(){
            var httpConfig = {
                headers: {
                    'Authorization': 'Bearer ' + AuthService.GetToken(),
                    'Accept': 'application/json'
                }
            };
            return $http.get(CommonService.buildUrl(API.Service.Users,API.Methods.Users.GetRoles),httpConfig);
        }
        function _getBranches(){
            var httpConfig = {
                headers: {
                    'Authorization': 'Bearer ' + AuthService.GetToken(),
                    'Accept': 'application/json'
                }
            };
            return $http.get(CommonService.buildUrl(API.Service.MFI,API.Methods.MFI.GetAllBranches),httpConfig);
        }
        function _saveUser(user,success,error) {
            var httpConfig = {
                headers: {
                    'Authorization': 'Bearer ' + AuthService.GetToken(),
                    'Accept': 'application/json'
                }
            };
            return $resource(CommonService.buildUrl(API.Service.Users,API.Methods.Users.User), user, httpConfig).save(success,error);
        }
    }

})(window.angular);
