/**
 * Created by Yoni on 11/30/2017.
 */

(function(angular) {
    "use strict";

    angular
        .module('app.manage_roles')
        .controller('ManageRolesController', ManageRolesController);

    ManageRolesController.$inject = ['ManageUserService',
        '$mdDialog',
        'RouteHelpers',
        '$rootScope',
        'APP_CONSTANTS'
    ];

    function ManageRolesController(
        ManageRoleService,
        $mdDialog,
        RouteHelpers
    ) {
        var vm = this;
        vm.addRole = _addRole;
        vm.editRole = _editRole;

        ManageRoleService.GetRoles().then(function(response){
            vm.roles = response.data.docs;
            console.log("vm.roles",vm.roles);
        },function(error){
            console.log("error role",error);
        });





        function _addRole(ev){

            $mdDialog.show({
                locals: {
                    items: null
                },
                templateUrl: RouteHelpers.basepath('manageroles/create.role.dialog.html'),
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                hasBackdrop: false,
                escapeToClose: true,
                controller: 'CreateRoleController',
                controllerAs: 'vm'
            })
                .then(function (answer) {
                }, function () {
                });
        }

        function _editRole(role,ev) {

        }



    }
})(window.angular);

