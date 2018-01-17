/**
 * Created by Yoni on 11/30/2017.
 */

(function(angular,document) {
    "use strict";

    angular
        .module('app.manage_users')
        .controller('ManageUsersController', ManageUsersController);

    ManageUsersController.$inject = ['RouteHelpers', 'DTOptionsBuilder', 'ManageUserService','$mdDialog','AlertService','AuthService'];
    function ManageUsersController(RouteHelpers, DTOptionsBuilder, ManageUserService,$mdDialog,AlertService,AuthService) {
        var vm = this;
        vm.currentUser = {
            selected_access_branch:undefined
        };
        vm.addUser = _addUser;
        vm.editUser = _editUser;
        vm.changeStatus = _changeStatus;
        vm.statusStyle = _statusStyle;
        vm.onSelectedBranch = _onSelectedBranch;

        activate();


        ////////////////
        function activate() {

            fetchUserData();

            GetBranchFilter();

            vm.dtOptions = DTOptionsBuilder.newOptions()
                .withPaginationType('full_numbers')
                .withDOM('<"html5buttons"B>lTfgitp')
                .withOption('processing', true)
                .withOption('scrollY', 430);

        }

        function fetchUserData() {
            ManageUserService.GetUsers().then(function(response){
                // console.log("users list",response);
                vm.users = response.data.docs;
                vm.usersCopy = angular.copy(vm.users);
            },function(error){
                console.log("error",error);
            });
        }

        function GetBranchFilter() {
            if(AuthService.IsSuperuser()){
                ManageUserService.GetBranches().then(function(response){
                    vm.currentUser.user_access_branches = response.data.docs;
                },function(error){
                    vm.currentUser.user_access_branches = [];
                });
            }
            else {
                vm.currentUser.user_access_branches = AuthService.GetAccessBranches();
            }
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

        function _onSelectedBranch(){
         vm.users = vm.usersCopy;

         vm.users = _.filter(vm.users,function(user){
                 if(!_.isUndefined(user.account)){
                     if(user.account.default_branch !== null){
                         return user.account.default_branch._id === vm.currentUser.selected_access_branch._id;
                     }
                 }
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

