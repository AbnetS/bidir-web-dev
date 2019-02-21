/**
 * Created by Yonas on 20/2/2019.
 */
(function(angular) {
    "use strict";

    angular.module("app.processing")
        .controller("GroupLoanController", GroupLoanController);

    GroupLoanController.$inject = ['LoanManagementService','$scope','blockUI','SharedService','AlertService'];

    function GroupLoanController(LoanManagementService,$scope,blockUI,SharedService,AlertService) {
        var vm = this;
        vm.paginate = _paginate;
        vm.clearSearchText = _clearSearchText;

        initialize();

        function initialize() {
            vm.visibility = { showClientDetail: false };
            vm.civilStatuses = CIVIL_STATUSES;
            vm.options =   MD_TABLE_GLOBAL_SETTINGS.OPTIONS;
            vm.filter = {show : false};
            vm.pageSizes = MD_TABLE_GLOBAL_SETTINGS.PAGE_SIZES;
            vm.query = { search:'',   page:1,  per_page:10 };
            vm.months = MONTHS_CONST;
            callAPI();
        }

        function callAPI() {

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

    }

})(window.angular);