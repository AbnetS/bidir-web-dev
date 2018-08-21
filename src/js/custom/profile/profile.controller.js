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

        function _updateUserProfile(user) {
            var profile = {
                _id:user._id,
                title:user.title,
                email: user.email,
                first_name : user.first_name,
                last_name:user.last_name,
                grandfather_name:user.grandfather_name,
                phone:user.phone,
                // picture:""
            };
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