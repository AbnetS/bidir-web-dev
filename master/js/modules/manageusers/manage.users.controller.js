/**
 * Created by Yoni on 11/30/2017.
 */

(function(angular,document) {
    "use strict";

    angular
        .module('app.manage_users')
        .controller('ManageUsersController', ManageUsersController);

    ManageUsersController.$inject = ['RouteHelpers', 'DTOptionsBuilder', 'DTColumnBuilder','$scope', 'ngDialog', 'ManageUserService','$mdDialog'];
    function ManageUsersController(RouteHelpers, DTOptionsBuilder, DTColumnBuilder,$scope, ngDialog, ManageUserService,$mdDialog) {
        var vm = this;
        $scope.pageData = {
            total:0
        };
        vm.addUser = _addUser;
        vm.editUser = _editUser;
        vm.changeStatus = _changeStatus;
        vm.statusStyle = _statusStyle;

        // ManageUserService.GetUsers().then(function(response){
        //     // console.log("users list",response);
        //     vm.users = response.data.docs;
        // },function(error){
        //     console.log("error",error);
        // });



        activate();

        // this function used to get all data
        function getUsersData(sSource, aoData, fnCallback, oSettings){
            debugger
            var draw = aoData[0].value;
            var columns = aoData[1].value;
            var order = aoData[2].value;
            var start = aoData[3].value;
            var length = aoData[4].value;
            var search = aoData[5].value;

            var params  = {
                start:start+1,
                limit:length
            };
            ManageUserService.GetUsers(params).then(function(response){
                debugger
                var records = {
                    'draw': 0,
                    'recordsTotal': 0,
                    'recordsFiltered': 0,
                    'data': []
                };

                if(response.data){
                    records = {
                        'draw': draw,
                        'recordsTotal': response.data.total_pages,
                        'recordsFiltered':response.data.total_pages,
                        'data': response.data.docs
                    };
                }
                $scope.pageData.total= response.data.total_pages;

                fnCallback(records);

            },function(error){
                console.log("error",error);
            });
        };
        function rowCallback() {

        }

        ////////////////
        function activate() {

           vm.dtOptions = DTOptionsBuilder.newOptions()
               .withFnServerData(getUsersData) // method name server call
               .withDataProp('data')// parameter name of list use in getLeads Fuction
               .withOption('processing', true) // required,
               .withOption('serverSide', true)// required
               .withOption('paging', true)// required
               .withPaginationType('full_numbers')
               .withDisplayLength(25)
               .withOption('rowCallback', rowCallback)
               .withDOM('lrtip');


            vm.dtColumns = [
                DTColumnBuilder.newColumn('_id').withTitle('ID'),
                DTColumnBuilder.newColumn('account.first_name').withTitle('First name'),
                DTColumnBuilder.newColumn('account.last_name').withTitle('Last name'),
                DTColumnBuilder.newColumn('account.role').withTitle('Last name'),
                DTColumnBuilder.newColumn('account.default_branch').withTitle('Last name'),
                DTColumnBuilder.newColumn('username').withTitle('username')
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

