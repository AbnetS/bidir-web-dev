/**
 * Created by Yoni on 11/30/2017.
 */

(function(angular,document) {
    "use strict";

    angular
        .module('app.manage_users')
        .controller('ManageUsersController', ManageUsersController);

    ManageUsersController.$inject = ['RouteHelpers', 'DTOptionsBuilder', 'DTColumnDefBuilder','$scope', 'ngDialog', 'ManageUserService','$mdDialog'];
    function ManageUsersController(RouteHelpers, DTOptionsBuilder, DTColumnDefBuilder,$scope, ngDialog, ManageUserService,$mdDialog) {
        var vm = this;
        vm.addUser = _addUser;
        vm.editUser = _editUser;
        vm.changeStatus = _changeStatus;
        vm.statusStyle = _statusStyle;

        ManageUserService.GetUsers().then(function(response){
            console.log("users list",response);
            vm.users = response.data.docs;
        },function(error){
            console.log("error",error);
        });



        activate();

        ////////////////
        function activate() {

           vm.dtOptions = DTOptionsBuilder.newOptions()
                .withPaginationType('full_numbers')
                .withDOM('<"html5buttons"B>lTfgitp')
                .withButtons([
                    {extend: 'copy',  className: 'btn-sm' },
                    {extend: 'csv',   className: 'btn-sm' },
                    {extend: 'excel', className: 'btn-sm', title: 'XLS-File'},
                    {extend: 'pdf',   className: 'btn-sm', title: $('title').text() },
                    {extend: 'print', className: 'btn-sm' }
                ]);
            vm.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(0),
                DTColumnDefBuilder.newColumnDef(1),
                DTColumnDefBuilder.newColumnDef(2),
                DTColumnDefBuilder.newColumnDef(3).notSortable()
            ];



        }

        function _changeStatus(user) {
            console.log("user to change status",user);
        }

        function _addUser(ev){
            $mdDialog.show({
                locals: {
                    items: null
                },
                templateUrl: RouteHelpers.basepath('manageusers/create.user.dialog.html'),
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                hasBackdrop: false,
                escapeToClose: true,
                controller: 'CreateUserController',
                controllerAs: 'vm'
            })
                .then(function (answer) {
                }, function () {
                });
        }
        function _editUser(user,ev){
            $mdDialog.show({
                locals: {
                    items: user
                },
                templateUrl: RouteHelpers.basepath('manageusers/create.user.dialog.html'),
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                hasBackdrop: false,
                escapeToClose: true,
                controller: 'CreateUserController',
                controllerAs: 'vm'
            })
                .then(function (answer) {
                }, function () {
                });
        }

        function _statusStyle(status){
            var style = '';
            switch (status){
                case 'active':
                    style =  'label label-success';
                    break;
                case 'inactive':
                    style =  'label label-default';
                    break;
                case 'declined':
                    style =  'label label-danger';
                    break;
                case 'pending':
                    style =  'label label-warning';
                    break;
                default:
                    style =  'label label-default';
            }
            return style;
        }
    }
})(window.angular,window.document);

