/**
 * Created by Yoni on 12/2/2017.
 */
/**
 * Created by Yoni on 11/30/2017.
 */

(function(angular) {
    "use strict";

    angular
        .module('app.manage_users')
        .controller('CreateUserController', CreateUserController);

    CreateUserController.$inject = ['$mdDialog','ManageUserService'];
    function CreateUserController($mdDialog, ManageUserService,data) {
        var vm = this;
        vm.cancel = _cancel;
        vm.saveUser = _saveUser;
        console.log("data",data);

        initialize();

        function _saveUser() {

            vm.user.default_Branch = vm.user.selected_default_branch._id;
            vm.user.role = vm.user.selected_role._id;
            vm.user.user_role = "load_officer";

            ManageUserService.CreateUser(
                vm.user,
                function (data) {
                    console.log("saved successfully", data);
                    //TODO: Alert & fetch user collection
                },
                function (error) {
                    console.log("could not be saved", error);
                }
            );
        }

        function initialize(){
            ManageUserService.GetRoles().then(function(response){
                console.log("roles",response);
                vm.roles = response.data.docs;
            },function(error){
                console.log("error",error);
            });

            ManageUserService.GetBranches().then(function(response){
                console.log("branches",response);
                vm.branches = response.data.docs;
            },function(error){
                console.log("error",error);
            });
        }

        vm.clear = function() {
            vm.dt = null;
        };
        vm.dateOptions = {
            dateDisabled: false,
            formatYear: "yy",
            maxDate: new Date(2020, 5, 22),
            startingDay: 1
        };
        vm.openDatePicker = function() {
            vm.popup1.opened = true;
        };
        vm.format = "dd-MMMM-yyyy";
        vm.altInputFormats = ["d!/M!/yyyy"];
        vm.popup1 = {
            opened: false
        };

        function _cancel() {
            $mdDialog.cancel();
        }
    }
})(window.angular);

