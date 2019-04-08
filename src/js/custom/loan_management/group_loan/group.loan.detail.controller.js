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
        vm.styleLabelByStatus = LoanManagementService.StyleLabelByStatus;
        vm.onTabSelected = _onTabSelected;
        vm.loanProcessDetail = _loanProcessDetail;
        vm.backToList = _backToList;
        vm.tabsList = [
            { id:0,  heading:"Members",  code: 'members', route: 'app.group_loan_detail.members' },
            { id:1,  heading:"Screening", code: 'screening', route: 'app.group_loan_detail.screenings' ,
                    detailTemplateUrl:"app/views/loan_management/group_loan/tabs/screening.detail.partial.html" },
            { id:2,  heading:"Loan Application", code: 'loan', route: 'app.group_loan_detail.loan' },
            { id:3,  heading:"A-CAT", code: 'acat', route: 'app.group_loan_detail.acat'  }
        ];

        initialize();

        function initialize() {
            vm.visibility = {
                showScreeningDetail: false,
                showLoanDetail: false,
                showAcatDetail: false
            };
            vm.groupLoan = {};
            vm.groupLoanId = $stateParams.id;
            _.each(vm.tabsList,function (selectedTab) {
                if($state.current.name === selectedTab.route){
                    vm.selectedTab = selectedTab.id;
                    vm.selectedTabObj = selectedTab;
                }
            });

            callAPI();
        }

        function callAPI() {
            vm.groupPromise = LoanManagementService.GetGroupLoan(vm.groupLoanId).then(function (response) {
                vm.groupLoan.group = response.data;
                GetData(vm.selectedTabObj.code);
            },function (error) {  })
        }

        function GetData(tabCode) {
            switch (tabCode) {
                case 'screening':
                    vm.groupScreeningPromise = LoanManagementService.GetGroupScreening('screenings',vm.groupLoanId).then(function (response) {
                        vm.groupLoan.screenings = response.data.screenings;
                    },function (error) {});
                    break;
                case 'loan':
                    vm.groupLoanPromise = LoanManagementService.GetGroupScreening('loans',vm.groupLoanId).then(function (response) {
                        vm.groupLoan.loans = response.data.loans;
                    },function (error) {});
                    break;
                case 'acat':
                    vm.groupAcatPromise = LoanManagementService.GetGroupScreening('acat',vm.groupLoanId).then(function (response) {
                        vm.groupLoan.acats = response.data.acats;
                    },function (error) {});
                    break;
                default:
                    break;
            }
        }


        function _onTabSelected(tab,index) {
            vm.selectedTab = index; //SET ACTIVE TAB
            vm.selectedTabObj = tab;
            GetData(tab.code); // get data for selected tab
            $state.go(tab.route); //REDIRECT TO CHILD VIEW

        }

        function _loanProcessDetail(stageData,tabCode,event) {
            switch (tabCode) {
                case 'screening':
                    vm.clientScreening = stageData;
                    vm.visibility.showScreeningDetail = true;
                    break;
                case 'loan':
                    vm.clientLoan = stageData;
                    vm.visibility.showLoanDetail = true;
                    break;
                default:
                    break;
            }
        }

        function _backToList(tabCode) {
            switch(tabCode){
                case 'screening':
                    vm.visibility.showScreeningDetail = false;
                    break;
                case 'loan':
                    vm.visibility.showLoanDetail = false;
                    break;
            }
        }

    }



})(window.angular);