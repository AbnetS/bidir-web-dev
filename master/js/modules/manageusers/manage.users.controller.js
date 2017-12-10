/**
 * Created by Yoni on 11/30/2017.
 */

(function(angular,document) {
    "use strict";

    angular
        .module('app.manage_users')
        .controller('ManageUsersController', ManageUsersController);

    ManageUsersController.$inject = ['RouteHelpers', 'DTOptionsBuilder', 'DTColumnBuilder','$scope', '$compile', 'ManageUserService','$mdDialog'];
    function ManageUsersController(RouteHelpers, DTOptionsBuilder, DTColumnBuilder,$scope, $compile, ManageUserService,$mdDialog) {
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
            var draw = aoData[0].value;
            var columns = aoData[1].value;
            var order = aoData[2].value;
            var start = aoData[3].value;
            var length = aoData[4].value;
            var search = aoData[5].value;

            var params  = {
                start:start + 1,
                limit:length,
                search: search
            };

            ManageUserService.GetUsers(params).then(function(response){
                var records = {
                    'draw': 0,
                    'recordsTotal': 0,
                    'recordsFiltered': 0,
                    'data': []
                };

                if(response.data){


                var filteredData = [];
                angular.forEach(response.data.docs,function(user){
                    if(!angular.isUndefined(user.account)){

                        filteredData.push(user);
                    }
                });
                records = {
                    'draw': draw,
                    'recordsTotal': response.data.total_pages,
                    'recordsFiltered':response.data.total_pages,
                    'data':filteredData
                };
                }
                $scope.pageData.total= response.data.total_pages;

                fnCallback(records);

            },function(error){
                debugger
                console.log("error",error);
            });
        };

        function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            // console.log(aData);
            return nRow;
        }

        ////////////////
        function activate() {
           vm.dtInstance = {};
           vm.dtOptions = DTOptionsBuilder.newOptions()
               .withFnServerData(getUsersData) // method name server call
               .withDataProp('data')// parameter name of list use in getLeads Fuction
               .withOption('processing', true) // required,
               .withOption('serverSide', true)// required
               .withPaginationType('full_numbers')
               .withOption('order', [0, 'asc']);

            vm.dtColumns = [
                DTColumnBuilder.newColumn(null).withTitle('No.').renderWith(renderIndex),
                DTColumnBuilder.newColumn('account.first_name').withTitle('First name').withOption('searchable', true),
                DTColumnBuilder.newColumn('account.last_name').withTitle('Last name'),
                DTColumnBuilder.newColumn('account.role.name').withTitle('Role'),
                DTColumnBuilder.newColumn('account.default_branch.name').withTitle('Branch'),
                DTColumnBuilder.newColumn('username').withTitle('username'),
                DTColumnBuilder.newColumn('status').withTitle('status').notSortable().renderWith(renderStatusCol),
                DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().renderWith(actionButtons)
            ];

            function renderStatusCol(data, type, full, meta) {
                console.log("renderStatusCol",data);
                 return '<small class="label label-default" </small>';
                // return '<span ng-class="vm.statusStyle(\'' + data.status + '\')"</span>';
            }
            function renderIndex(data, type, full, meta) {
                var rowNo = meta.row + 1;
                return '<p>' + rowNo + '</p>';
            }
            // Action buttons added to the last column: to edit and change status
            function actionButtons(data, type, full, meta) {
                var selectedUSer = data;
                return '<button class="btn btn-success btn-xs" ng-click="vm.addUser(\'' + data._id + '\')">' +
                    '   <i class="fa fa-edit"></i>' +
                    '</button>&nbsp;' +
                    '<button class="btn btn-xs btn-default" ng-click="vm.addUser(\'' + data._id + '\')">' +
                    '   <i class="fa fa-eye"></i>' +
                    '</button>';
            }

            function createdRow(row, data, dataIndex) {
                debugger
                $compile(angular.element(row).contents())($scope);
            }

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
            debugger
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
            console.log("status",status);
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

