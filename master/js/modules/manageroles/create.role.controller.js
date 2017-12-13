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

        function setPermissions() {
            _.each(vm.role.permissions, function(oldPermission){
                _.each(vm.permissions, function(permission) {
                    if(permission.name === oldPermission.name && !permission.checked){
                        permission.checked = permission.name === oldPermission.name;
                    }
                });
            });
        }

        function preparePermissions() {
            vm.role.permissions = _.filter(vm.permissions,function(permission){
                return permission.checked? permission._id : null;
            });
        }

        function _saveRole() {
            preparePermissions();
            if(vm.isEdit){
                ManageRoleService.UpdateRole( vm.role ).then(function (data) {
                        console.log("updated successfully", data);
                        $mdDialog.hide();
                        //TODO: Alert & fetch data
                    },
                    function (error) {
                        console.log("could not be saved", error);
                    });
            }else {

                ManageRoleService.SaveRole( vm.role ).then(function (data) {
                        console.log("updated successfully", data);
                        $mdDialog.hide();
                        //TODO: Alert & fetch data
                    },
                    function (error) {
                        console.log("could not be saved", error);
                    });
            }
        }

        function initialize(){

            ManageRoleService.GetPermissions().then(function(response){
                vm.permissions = response.data.docs;
                if(vm.isEdit){
                    setPermissions();
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

