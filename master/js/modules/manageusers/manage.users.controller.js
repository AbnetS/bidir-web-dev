/**
 * Created by Yoni on 11/30/2017.
 */

(function(angular) {
    "use strict";

    angular
        .module('app.manage_users')
        .controller('ManageUsersController', ManageUsersController);

    ManageUsersController.$inject = ['RouteHelpers', 'DTOptionsBuilder', 'DTColumnDefBuilder','$scope', 'ngDialog', 'ManageUserService','$mdDialog'];
    function ManageUsersController(RouteHelpers, DTOptionsBuilder, DTColumnDefBuilder,$scope, ngDialog, ManageUserService,$mdDialog) {
        var vm = this;
        vm.addUser = _addUser;

        ManageUserService.GetUsers().then(function(response){
            // console.log("users list",response);
            vm.users = response.data.docs;
        },function(error){
            console.log("error",error);
        });



        activate();

        ////////////////
        function activate() {

            $scope.openConfirm = function () {
                ngDialog.openConfirm({
                    templateUrl: RouteHelpers.basepath('manageusers/create.user.html'),
                    className: 'ngdialog-theme-default',
                    width: 840,
                    showClose: true,
                    closeByEscape: false,
                    closeByDocument:false,
                    controller: 'CreateUserController',
                    controllerAs:'vm'
                }).then(function (value) {
                    console.log('Modal promise resolved. Value: ', value);
                }, function (reason) {
                    console.log('Modal promise rejected. Reason: ', reason);
                });
            };

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

        function _addUser(ev){
            $mdDialog.show({
                locals: {},
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
    }
})(window.angular);

