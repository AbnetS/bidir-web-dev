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

    CreateUserController.$inject = ['$mdDialog','ManageUserService','items','$scope'];
    function CreateUserController($mdDialog, ManageUserService,items,$scope) {
        var vm = this;
        vm.cancel = _cancel;
        vm.saveUser = _saveUser;
        vm.isEdit = items !== null;
        vm.user = items;
        console.log("user info", items);

        initialize();

        function _saveUser() {
            var userInfo = {
                first_name: vm.user.first_name,
                last_name: vm.user.last_name,
                username: vm.user.username,
                password: vm.user.password,
                role : vm.user.selected_role._id,
                default_branch : vm.user.selected_default_branch._id
            };

            console.log("user info", userInfo);
            ManageUserService.CreateUser(
                userInfo,
                function (data) {
                    console.log("saved successfully", data);
                    $mdDialog.hide();
                    //TODO: Alert & fetch user collection
                },
                function (error) {
                    console.log("could not be saved", error);
                }
            );
        }

        function initialize(){
            if(vm.isEdit){
                angular.extend(vm.user, vm.user.account);
                var dt = new Date(vm.user.hired_date);
                vm.user.hired_date = dt;
                // vm.user.selected_role = vm.user.account.role;
                // vm.user.selected_default_branch = vm.user.default_branch;
            }
            ManageUserService.GetRoles().then(function(response){
                vm.roles = response.data.docs;
                if(vm.isEdit){
                    //LOAD Role select value
                    angular.forEach(vm.roles,function(role){
                       if(role._id === vm.user.account.role._id){
                           vm.user.selected_role = role;
                       }
                    });
                }
            },function(error){
                console.log("error",error);
            });

            ManageUserService.GetBranches().then(function(response){
                vm.branches = response.data.docs;
                if(vm.isEdit){

                    angular.forEach(vm.branches,function(branch){
                        //LOAD Default Branch select value
                        if(branch._id === vm.user.default_branch._id){
                            vm.user.selected_default_branch = branch;
                        }

                        // vm.user.selected_access_branches = [];
                        //LOAD access branch select values
                        // if(vm.user.access_branches){
                        //     angular.forEach(vm.user.access_branches,function(access_id){
                        //         if(branch._id === access_id){
                        //             vm.user.selected_access_branches.push(branch);
                        //         }
                        //     })
                        // }

                    });
                }
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

