/**
 * Created by Yonas on 8/17/2018.
 */
(function(angular) {
    'use strict';
    angular.module('app.profile')

        .service('ProfileService', ProfileService);

    ProfileService.$inject = ['$http','CommonService','AuthService'];

    function ProfileService($http, CommonService,AuthService) {

        return {
            GetUser: _getUser,
            UpdateProfile: _updateProfile
        };

        function _getUser(){
            var user = AuthService.GetCurrentUser();
            return _.isUndefined(user.account)? user.admin:user.account;
        }

        function _updateProfile(account){
            return $http.put(CommonService.buildUrlWithParam(API.Service.Users,API.Methods.Users.Account,account._id), account);
        }

    }

})(window.angular);