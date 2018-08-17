/**
 * Created by Yonas on 8/16/2018.
 */
(function(angular) {
    "use strict";

    angular
        .module('app.profile')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['ProfileService',   'blockUI', 'AlertService'];

    function ProfileController( ProfileService,   blockUI,AlertService ) {
        var vm = this;
        vm.updateProfile = _updateUserProfile;

        vm.user = ProfileService.GetUser();
        // console.log("vm.user",vm.user);


        function _updateUserProfile(profile) {
            console.log("update profile clicked");
            var myBlockUI = blockUI.instances.get('UserProfileBlockUI');
            myBlockUI.stop();
            ProfileService.UpdateProfile(profile).then(function (response) {
                myBlockUI.start();
                console.log("updated user profile",response);
                AlertService.showSuccess("User Profile","User Account Info updated successfully" );
            },function (error) {
                myBlockUI.stop();
                console.log("error",error);
                var message = error.data.error.message;
                AlertService.showError("User Account Information failed updating",message);
            });
        }
    }
})(window.angular);