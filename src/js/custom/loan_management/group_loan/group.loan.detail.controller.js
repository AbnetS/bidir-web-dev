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
            callAPI();
        }

        function callAPI() {
            vm.groupPromise = LoanManagementService.GetGroupLoan(vm.groupLoanId).then(function (response) {
                vm.groupLoan.group = response.data;
                // $state.go(vm.tabsList[0].route);
                GetGroupScreening();

            },function (error) {  })
        }

        function GetGroupScreening() {
            vm.groupScreeningPromise = LoanManagementService.GetGroupScreening(vm.groupLoanId).then(function (response) {
                vm.groupLoan.screenings = response.data.screenings;
            },function (error) {})
        }

        function _onTabSelected(route,index) {
            vm.selectedTab = index; //SET ACTIVE TAB
            $state.go(route); //REDIRECT TO CHILD VIEW
        }



    }

})(window.angular);