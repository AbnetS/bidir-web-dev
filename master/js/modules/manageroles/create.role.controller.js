/**
 * Created by Yoni on 12/10/2017.
 */

(function(angular) {
    "use strict";

    angular
        .module('app.manage_roles')
        .controller('CreateRoleController', CreateRoleController);

    CreateRoleController.$inject = ['$mdDialog','ManageRoleService','items','SweetAlert'];
    function CreateRoleController($mdDialog, ManageRoleService,items,SweetAlert) {
        var vm = this;
        vm.cancel = _cancel;
        vm.saveRole = _saveRole;
        vm.isEdit = items !== null;
        vm.role = items !== null?items:null;
        initialize();

        function preparePermissions() {
            var allowedPermissions = [];
            var allowedPermissionIds = [];
            angular.forEach(vm.permissions,function(perm){
                if(vm.isEdit){
                    if(!angular.isUndefined(vm.role.permissions)){
                        angular.forEach(vm.role.permissions,function(rolePerm){
                            debugger
                            rolePerm.checked = perm._id === rolePerm._id;

                        });
                    }
                }
                else{
                    if(!angular.isUndefined(perm.checked)){
                        if(perm.checked){
                            allowedPermissions.push(perm);
                            allowedPermissionIds.push(perm._id);
                        }
                    }
                }
            });
            vm.role.permissions = allowedPermissionIds;
        }
        function _saveRole() {
            preparePermissions();
            console.log("vm.role",vm.role);
            ManageRoleService.SaveRole( vm.role ).then(function (data) {
                    console.log("updated successfully", data);
                    $mdDialog.hide();
                    //TODO: Alert & fetch data
                },
                function (error) {
                    console.log("could not be saved", error);
                });
        }

        function initialize(){

            ManageRoleService.GetPermissions().then(function(response){
                vm.permissions = response.data.docs;
                if(vm.isEdit){
                    preparePermissions();
                }
            },function(error){
                console.log("error permissions",error);
            });


        }

        function _cancel() {
            $mdDialog.cancel();
        }
    }
})(window.angular);

