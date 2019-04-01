/**
 * Created by Yonas on 20/2/2019.
 */
(function(angular) {
    "use strict";

    angular.module("app.processing")
        .controller("GroupLoanDetailController", GroupLoanDetailController);

    GroupLoanDetailController.$inject = ['LoanManagementService','$scope','$stateParams','$state'];

    function GroupLoanDetailController(LoanManagementService,$scope,$stateParams,$state) {
        var vm = this;
        vm.StyleLabelByStatus = LoanManagementService.StyleLabelByStatus;
        vm.onTabSelected = _onTabSelected;

        vm.tabsList = [
            {   heading:"Members",  code: 'members', route: 'app.group_loan_detail.members' },
            {   heading:"Screening", code: 'screening', route: 'app.group_loan_detail.screenings' },
            {   heading:"Loan Application", code: 'loan', route: 'app.group_loan_detail.loan' },
            {   heading:"A-CAT", code: 'acat', route: 'app.group_loan_detail.acat'  }
        ];
        vm.selectedTab = 0; //initially screening tab is active

        initialize();

        function initialize() {
            vm.groupLoan = {};
            vm.groupLoanId = $stateParams.id;
            vm.selectedTab = 0;
            callAPI();
        }

        function callAPI() {
            vm.groupPromise = LoanManagementService.GetGroupLoan(vm.groupLoanId).then(function (response) {
                vm.groupLoan.group = response.data;
                GetGroupScreening();
                // GetGroupLoans();
            },function (error) {  })
        }

        function GetGroupScreening() {
            vm.groupScreeningPromise = LoanManagementService.GetGroupScreening('screenings',vm.groupLoanId).then(function (response) {
                vm.groupLoan.screenings = response.data.screenings;
            },function (error) {})
            vm.groupLoanPromise = LoanManagementService.GetGroupScreening('loans',vm.groupLoanId).then(function (response) {
                vm.groupLoan.loans = response.data.loans;
            },function (error) {})
            vm.groupAcatPromise = LoanManagementService.GetGroupScreening('acat',vm.groupLoanId).then(function (response) {
                vm.groupLoan.loans = response.data.acats;
            },function (error) {})
        }


        function _onTabSelected(route,index) {
            vm.selectedTab = index; //SET ACTIVE TAB
            $state.go(route); //REDIRECT TO CHILD VIEW
        }



    }

})(window.angular);