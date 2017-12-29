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

    CreateUserController.$inject = ['$mdDialog','ManageUserService','items','AlertService'];
    function CreateUserController($mdDialog, ManageUserService,items,AlertService) {
        var vm = this;
        vm.cancel = _cancel;
        vm.saveUser = _saveUser;
        vm.onSelectedDefaultBranch = _onSelectedDefaultBranch;
        vm.isEdit = items !== null;
        vm.user = items !== null?items:null;
        console.log("user info", items);
        vm.multi_branch = false;

        initialize();

        function _saveUser() {
            debugger
            if(!_.isUndefined(vm.user.selected_role) &&  !_.isUndefined(vm.user.selected_default_branch)){
                var userInfo = {
                    first_name: vm.user.first_name,
                    last_name: vm.user.last_name,
                    grandfather_name:vm.user.grandfather_name,
                    role : vm.user.selected_role._id,
                    hired_date:vm.user.hired_date,
                    default_branch : vm.user.selected_default_branch._id,
                    access_branches:[],
                    multi_branches: vm.multi_branches
                };
                if(vm.isEdit){

                    userInfo._id = vm.user.account._id;
                    userInfo.access_branches.push(userInfo.default_branch);

                    _.forEach(vm.user.selected_access_branches,function(accessBranch){

                        var found = userInfo.access_branches.some(function (el) {
                            return el._id === accessBranch._id;
                        });

                        if (!found) {
                            userInfo.access_branches.push(accessBranch._id);
                        }
                    });

                    ManageUserService.UpdateUser( userInfo ).then(function (data) {
                            console.log("updated successfully", data);
                            $mdDialog.hide();
                            AlertService.showSuccess('Updated Successfully!', 'User Information is Updated');
                        },
                        function (error) {
                            var message = error.data.error.message;
                            AlertService.showError( 'Oops... Something went wrong', message);
                            console.log("could not be saved", error);
                        });

                }else {

                    userInfo.username = vm.user.username;
                    userInfo.password = vm.user.password;

                    ManageUserService.CreateUser(userInfo).then(
                        function (data) {
                            AlertService.showSuccess('Saved Successfully!', 'User Information is saved successfully');
                            console.log("saved successfully", data);
                            $mdDialog.hide();
                            //TODO: Alert & fetch user collection
                        },
                        function (error) {
                            var message = error.data.error.message;
                            AlertService.showError( 'Oops... Something went wrong', message);
                            console.log("could not be saved", error);
                        }
                    );
                }
            }else {
                AlertService.showError( 'Oops... Something went wrong', "You haven't provided all required fields.");
            }



        }

        function initialize(){
            if(vm.isEdit){
                angular.extend(vm.user, vm.user.account);
                vm.multi_branch = vm.user.multi_branch;
                var dt = new Date(vm.user.hired_date);
                vm.user.hired_date = dt;
            }
            ManageUserService.GetRoles().then(function(response){
                vm.roles = response.data.docs;
                if(vm.isEdit){
                    //LOAD Role select value
                    angular.forEach(vm.roles,function(role){
                        if(!_.isUndefined(vm.user.account)){
                       if(role._id === vm.user.account.role._id){
                           vm.user.selected_role = role;
                       }}

                    });
                }
            },function(error){
                console.log("error",error);
            });

            ManageUserService.GetBranches().then(function(response){
                vm.branches = response.data.docs;
                vm.user.selected_access_branches = [];
                if(vm.isEdit){
                    angular.forEach(vm.branches,function(branch){
                        //LOAD Default Branch select value
                        if(!_.isUndefined(vm.user.default_branch._id)){

                            if(branch._id === vm.user.default_branch._id){
                                vm.user.selected_default_branch = branch;
                            }
                        }
                        //LOAD access branch select values
                        if(vm.user.access_branches.length > 0)
                        {
                            var found = vm.user.access_branches.some(function (accBranch) {
                                return accBranch._id === branch._id;
                            });

                            if (found) {
                                vm.user.selected_access_branches.push(branch);
                            }
                        }

                    });
                }
            },function(error){
                console.log("error",error);
            });
        }


        function _onSelectedDefaultBranch() {
            if(vm.isEdit){
                //TODO: REMOVE Branch
            }else {
                vm.user.selected_access_branches.push(vm.user.selected_default_branch);
            }

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

