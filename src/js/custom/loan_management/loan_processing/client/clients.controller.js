/**
 * Created by Yonas on 7/2/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.processing")
        .controller("ClientsController", ClientsController);

    ClientsController.$inject = ['LoanManagementService','$scope'];

    function ClientsController(LoanManagementService,$scope ) {
        var vm = this;
        vm.paginate = _paginate;
        vm.clearSearchText = _clearSearchText;
        console.log("CLIENTS CONTROLLER");

        initialize();

        function initialize() {
            vm.options =   MD_TABLE_GLOBAL_SETTINGS.OPTIONS;
            vm.filter = {show : false};
            vm.pageSizes = MD_TABLE_GLOBAL_SETTINGS.PAGE_SIZES;

            vm.query = { search:'',   page:1,  per_page:10 };
            vm.months = MONTHS_CONST;
            callAPI();
        }

        function callAPI() {
            vm.clientsPromise = LoanManagementService.GetClients(vm.query).then(function (response) {
                vm.clients = response.data.docs;
                vm.query.total_pages = response.data.total_pages;
                vm.query.total_docs_count = response.data.total_docs_count;
                console.log("clients list from clients",vm.clients);
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
                console.log("search for ",newValue);
            }
        });




    }



})(window.angular);