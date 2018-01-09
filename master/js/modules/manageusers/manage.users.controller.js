/**
 * Created by Yoni on 11/30/2017.
 */

(function(angular,document) {
    "use strict";

    angular
        .module('app.manage_users')
        .controller('ManageUsersController', ManageUsersController);

    ManageUsersController.$inject = ['RouteHelpers', 'DTOptionsBuilder','$scope', 'DTColumnDefBuilder', 'ManageUserService','$mdDialog','AlertService','AuthService'];
    function ManageUsersController(RouteHelpers, DTOptionsBuilder,$scope, DTColumnDefBuilder, ManageUserService,$mdDialog,AlertService,AuthService) {
        var vm = this;
        $scope.pageData = {
            total:0
        };
        vm.addUser = _addUser;
        vm.editUser = _editUser;
        vm.changeStatus = _changeStatus;
        vm.statusStyle = _statusStyle;

        activate();

        ////////////////
        function activate() {

            fetchUserData();

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
        function fetchUserData() {
            ManageUserService.GetUsers().then(function(response){
                console.log("users list",response);
                vm.users = response.data.docs;
            },function(error){
                console.log("error",error);
            });
        }

        function _changeStatus(user) {
            vm.toaster = {
                type:  'success',
                title: 'Title',
                text:  'Message'
            };

            var userAccount = {};
            userAccount._id = user._id;
            if(user.status === 'active'){
                userAccount.status = 'suspended';
                user.status = 'suspended';
            }else{
                userAccount.status = 'active';
                user.status = 'active';
            }
        
            ManageUserService.UpdateUserStatus(userAccount).then(function(response){
                console.log('updated user',response);
                var message =   userAccount.status==='active'?'activated':userAccount.status;
                AlertService.showSuccess('Updated User Status!', 'User is ' + message  + '.');
                // toaster.pop(vm.toaster.type, vm.toaster.title, vm.toaster.text);
            },function(error){
                console.log('error',error);
                var message = error.data.error.message;
                AlertService.showError( 'Oops... Something went wrong', message);
                // toaster.pop(vm.toaster.type, vm.toaster.title, vm.toaster.text);
            });
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
                    fetchUserData();
                }, function () {
                });
        }
        function _editUser(user,ev){
            $mdDialog.show({
                locals: {items: user},
                templateUrl: RouteHelpers.basepath('manageusers/create.user.dialog.html'),
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                hasBackdrop: false,
                escapeToClose: true,
                controller: 'CreateUserController',
                controllerAs: 'vm'
            }).then(function (answer) {
                fetchUserData();
                }, function () {
                });
        }


        function _statusStyle(status){
            var style = '';
            switch (status){
                case 'active' || 'active ':
                    style =  'label label-success';
                    break;
                case 'inactive':
                    style =  'label label-default';
                    break;
                case 'suspended':
                    style =  'label label-danger';
                    break;
                default:
                    style =  'label label-default';
            }
            return style;
        }
    }
})(window.angular,window.document);

