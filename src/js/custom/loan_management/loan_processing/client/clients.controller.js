/**
 * Created by Yonas on 7/2/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.processing")
        .controller("ClientsController", ClientsController);

    ClientsController.$inject = ['LoanManagementService','$scope','blockUI','SharedService'];

    function ClientsController(LoanManagementService,$scope,blockUI,SharedService) {
        var vm = this;
        vm.clientDetail = _clientDetail;
        vm.civilStatuses = ["Single","Married","Widowed","Other"];
        vm.paginate = _paginate;
        vm.clearSearchText = _clearSearchText;

        initialize();

        function initialize() {
            initializeDatePicker();
            vm.visibility = {
                showClientDetail: false
            };

            vm.options =   MD_TABLE_GLOBAL_SETTINGS.OPTIONS;
            vm.filter = {show : false};
            vm.pageSizes = MD_TABLE_GLOBAL_SETTINGS.PAGE_SIZES;

            vm.query = { search:'',   page:1,  per_page:10 };
            vm.months = MONTHS_CONST;
            callAPI();
        }

        function callAPI() {
            var myBlockUI = blockUI.instances.get('clientsBlockUI');
            myBlockUI.start();

            vm.clientsPromise = LoanManagementService.GetClients(vm.query).then(function (response) {
                vm.clients = response.data.docs;
                vm.query.total_pages = response.data.total_pages;
                vm.query.total_docs_count = response.data.total_docs_count;
                myBlockUI.stop();
                console.log("clients",vm.clients);
            });
        }

        function _clientDetail(client,ev) {
            getBranches();
            console.log("client detail",client);
            vm.visibility.showClientDetail = true;
        }
        function getBranches() {
            SharedService.GetBranches().then(function(response){
                vm.branches = response.data.docs;
                console.log("vm.branches",vm.branches);
            },function(error){
                console.log("error",error);
            });
        }






        function _paginate(page, pageSize) {
            vm.query.page = page;
            vm.query.per_page = pageSize;
            callAPI();
        }
        function _clearSearchText() {
            vm.query.search = '';
            vm.filter.show = false;
        }

        $scope.$watch(angular.bind(vm, function () {
            return vm.query.search;
        }), function (newValue, oldValue) {
            if (newValue !== oldValue) {
                console.log("searching clients for ",newValue);
            }
        });


        function initializeDatePicker() {
            vm.clear = function() {
                vm.dt = null;
            };

            vm.dateOptions = {
                dateDisabled: false,
                formatYear: "yy",
                maxDate: new Date(2020, 5, 22),
                startingDay: 1
            };

            vm.openPopup = function() {
                vm.popup1.opened = true;
            };

            vm.dateFormat = "dd-MMMM-yyyy";
            vm.altInputFormats = ["M!/d!/yyyy"];

            vm.popup1 = {
                opened: false
            };
        }

    }



})(window.angular);