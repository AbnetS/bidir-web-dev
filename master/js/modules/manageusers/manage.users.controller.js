/**
 * Created by Yoni on 11/30/2017.
 */

(function(angular) {
    "use strict";

    angular
        .module('app.manage_users')
        .controller('ManageUsersController', ManageUsersController);

    ManageUsersController.$inject = ['RouteHelpers', 'DTOptionsBuilder', 'DTColumnDefBuilder','$scope', 'ngDialog', 'ManageUserService'];
    function ManageUsersController(RouteHelpers, DTOptionsBuilder, DTColumnDefBuilder,$scope, ngDialog, ManageUserService) {
        var vm = this;

        ManageUserService.GetUsers().then(function(response){
            console.log("users list",response);
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
                    width: 800,
                    showClose: true,
                    closeByEscape: false,
                    closeByDocument:false,
                    controller: ['$scope', function($scope) {
                        var vm = this;

                        vm.people = [
                            { name: 'Adam',      email: 'adam@email.com',      age: 12, country: 'United States' },
                            { name: 'Amalie',    email: 'amalie@email.com',    age: 12, country: 'Argentina' },
                            { name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina' },
                            { name: 'Adrian',    email: 'adrian@email.com',    age: 21, country: 'Ecuador' }
                        ];

                        vm.clear = function() {
                            vm.dt = null;
                        };

                        vm.dateOptions = {
                            dateDisabled: false,
                            formatYear: "yy",
                            maxDate: new Date(2020, 5, 22),
                            startingDay: 1
                        };

                        vm.open1 = function() {
                            vm.popup1.opened = true;
                        };

                        vm.format = "dd-MMMM-yyyy";
                        vm.altInputFormats = ["d!/M!/yyyy"];
                        vm.popup1 = {
                            opened: false
                        };

                    }],
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
    }
})(window.angular);

