/**
 * Created by Yonas on 8/16/2018.
 */
(function(angular) {
    "use strict";

    angular
        .module('app.profile')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['AuthService',   'blockUI', 'AlertService'];

    function ProfileController( AuthService,   blockUI,AlertService ) {
        var vm = this;
        vm.updateUserProfile = _updateUserProfile;
        vm.user = AuthService.GetCurrentUser();


        function _updateUserProfile(user) {
            console.log("Profile",user);
        }
    }
})(window.angular);