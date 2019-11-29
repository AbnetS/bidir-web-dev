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
            GetUserAccount: _getUserAccount,
            UpdateProfile: _updateProfile,
            ChangePassword: _changePassword
        };
        function _getUserAccount(){
            var user = AuthService.GetCurrentUser();
            return _.isUndefined(user.account)? user.admin:user.account;
        }
        function _updateProfile(account){
            return $http.put(CommonService.buildUrlWithParam(API.Service.Users,API.Methods.Users.Account,account._id) + '/profile', account);
        }
        function _changePassword(userInfo){
            var user = AuthService.GetCurrentUser();
            return $http.put(CommonService.buildUrlWithParam(API.Service.Users,API.Methods.Users.UserUpdate,user._id) + '/passwords',
                {old_password: userInfo.old_password, new_password:userInfo.new_password});
        }
    }

})(window.angular);