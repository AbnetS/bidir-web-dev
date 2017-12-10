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
        vm.selectedRole = items !== null?items:null;

        initialize();

        function _saveRole() {
            var allowedPermissions = [];
            var allowedPermissionIds = [];
            angular.forEach(vm.permissions,function(perm){
                if(!angular.isUndefined(perm.checked)){
                    if(perm.checked){
                        allowedPermissions.push(perm);
                        allowedPermissionIds.push(perm._id);
                    }
                }
            });
            vm.role.Permissions = allowedPermissionIds;
            console.log("vm.role",vm.role);
        }

        function initialize(){
            ManageRoleService.GetPermissions().then(function(response){
                vm.permissions = response.data.docs;
            },function(error){
                console.log("error permissions",error);
            });
        }

        function _cancel() {
            $mdDialog.cancel();
        }
    }
})(window.angular);

