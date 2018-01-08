/**
 * Created by Yoni on 12/10/2017.
 */

(function(angular) {
    "use strict";

    angular
        .module('app.manage_roles')
        .controller('CreateRoleController', CreateRoleController);

    CreateRoleController.$inject = ['$mdDialog','ManageRoleService','items','AlertService'];
    function CreateRoleController($mdDialog, ManageRoleService,items,AlertService) {
        var vm = this;
        vm.cancel = _cancel;
        vm.saveRole = _saveRole;
        vm.changeModuleStyle = _modulesStyle;
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
                ManageRoleService.UpdateRole(vm.role ).then(function (data) {
                        console.log("updated successfully", data);
                        $mdDialog.hide();
                        AlertService.showSuccess("updated successfully","Role and Permissions updated successfully");
                    },
                    function (error) {
                        var message = error.data.error.message;
                        AlertService.showError("Failed to update Role",message);
                        console.log("could not be saved", error);
                    });
            }else {

                ManageRoleService.SaveRole( vm.role).then(function (data) {
                        AlertService.showSuccess("Saved successfully","Role and Permissions saved successfully");
                        $mdDialog.hide();
                    },
                    function (error) {
                        var message = error.data.error.message;
                        AlertService.showError("Failed to Save Role",message);
                        console.log("could not be saved", error);
                    });
            }
        }

        function initialize(){

            if(ManageRoleService.GetPermissionsFromStore() !== null){
                vm.permissions = ManageRoleService.GetPermissionsFromStore();
                console.log("permissions from storage",vm.permissions);
                if(vm.isEdit){
                    setPermissions();
                }

            }else {
                ManageRoleService.GetPermissions().then(function(response){
                    vm.permissions = response.data.docs;
                    ManageRoleService.StorePermissions(vm.permissions);
                    console.log("permissions from api",vm.permissions);
                    if(vm.isEdit){
                        setPermissions();
                    }
                },function(error){
                    console.log("error permissions",error);
                });

            }

        }

        function _modulesStyle(module){
            var style = '';
            switch (module){
                case 'SCREENING':
                    style =  'label label-primary';
                    break;
                case 'FORM_BUILDER':
                    style =  'label label-danger';
                    break;
                case 'USER_MANAGEMENT':
                    style =  'label label-green';
                    break;
                case 'SCREENING_MODULE':
                    style =  'label label-warning';
                    break;
                case 'MFI_SETUP':
                    style =  'label label-purple';
                    break;
                default:
                    style =  'label label-default';
            }
            return style;
        }





        function _cancel() {
            $mdDialog.cancel();
        }
    }
})(window.angular);

