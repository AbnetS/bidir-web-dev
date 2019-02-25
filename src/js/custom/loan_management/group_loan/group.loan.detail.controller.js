/**
 * Created by Yonas on 20/2/2019.
 */
(function(angular) {
    "use strict";

    angular.module("app.processing")
        .controller("GroupLoanDetailController", GroupLoanDetailController);

    GroupLoanDetailController.$inject = ['LoanManagementService','$scope','$stateParams'];

    function GroupLoanDetailController(LoanManagementService,$scope,$stateParams) {
        var vm = this;
        vm.StyleLabelByStatus = LoanManagementService.StyleLabelByStatus;

        vm.tabsList = [
            { index: 1, heading:"Members", code: 'members', templateUrl:"app/views/loan_management/group_loan/tabs/members.partial.html" },
            { index: 2, heading:"Screening", code: 'screening', templateUrl:"app/views/loan_management/group_loan/tabs/screening.partial.html" },
            { index: 3, heading:"Loan Application", code: 'loan', templateUrl:"app/views/loan_management/group_loan/tabs/loan.partial.html" },
            { index: 4, heading:"ACAT", code: 'acat', templateUrl:"app/views/loan_management/group_loan/tabs/acat.partial.html" }
        ];
        vm.activeTab = vm.tabsList[0]; //initially screening tab is active
        vm.activeTabIndex = vm.activeTab.index;

        initialize();

        function initialize() {
            vm.groupLoanId = $stateParams.id;
            callAPI();
        }

        function callAPI() {
            vm.groupPromise = LoanManagementService.GetGroupLoan(vm.groupLoanId).then(function (response) {
                console.log(response);
                vm.groupLoan = response.data;
            },function (error) {  })
        }

    }

})(window.angular);