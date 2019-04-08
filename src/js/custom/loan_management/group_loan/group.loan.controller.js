/**
 * Created by Yonas on 20/2/2019.
 */
(function(angular) {
    "use strict";

    angular.module("app.processing")
        .controller("GroupLoanController", GroupLoanController);

    GroupLoanController.$inject = ['LoanManagementService','$scope','$state','AuthService'];

    function GroupLoanController(LoanManagementService,$scope,$state,AuthService) {
        var vm = this;
        vm.StyleLabelByStatus = LoanManagementService.StyleLabelByStatus;
        vm.loanCycles = LoanManagementService.loanCycles;

        vm.paginate = _paginate;
        vm.groupDetail = _groupDetail;

        vm.onSelectedLoanCycle = _onSelectedLoanCycle;
        vm.clearSearch = _clearSearch;

        initialize();

        function _clearSearch(){
            vm.query.search = "";
            vm.filter.show = false;
            // callApi();
        }

        function initialize() {
            vm.visibility = { showClientDetail: false };
            vm.currentUser = {selected_access_branch:undefined};
            vm.options =   MD_TABLE_GLOBAL_SETTINGS.OPTIONS;
            vm.filter = {show : false};
            vm.pageSizes = MD_TABLE_GLOBAL_SETTINGS.PAGE_SIZES;
            vm.query = { search:'',   page:1,  per_page:10 };
            callAPI();
            GetBranchFilter();
        }

        function GetBranchFilter() {
            if(AuthService.IsSuperuser()){
                LoanManagementService.GetBranches().then(function(response){
                    vm.currentUser.user_access_branches = response.data.docs;
                },function(error){
                    vm.currentUser.user_access_branches = [];
                    console.log("error on GetBranchFilter",error);
                });
            }
            else {
                vm.currentUser.user_access_branches = AuthService.GetAccessBranches();
            }
        }

        function _onSelectedLoanCycle(){

        }

        function callAPI() {
            vm.groupLoansPromise = LoanManagementService.GetGroupLoans(vm.query).then(function (response) {
                vm.groupLoans = response.data.docs;
                vm.groupLoansCopy = angular.copy(vm.groupLoans);
                vm.query.total_docs_count =  response.data.total_docs_count;
            },function (error) {  })
        }

        function _paginate(page, pageSize) {
            vm.query.page = page;
            vm.query.per_page = pageSize;
            callAPI();
        }

        $scope.$watch(angular.bind(vm, function () {
            return vm.query.search;
        }), function (newValue, oldValue) {
            if (newValue !== oldValue) {
                console.log("searching clients for ",newValue);
            }
        });

        function _groupDetail(group) {
            $state.go('app.group_loan_detail.members',{id: group._id});
        }

        $scope.$watch(angular.bind(vm, function () {
            return vm.query.search;
        }), function (newValue, oldValue) {
            if (newValue !== oldValue) {
                //make sure at least two characters are entered
                if(newValue.length > 2){
                    // SearchApi(newValue);
                }else{
                    // vm.clients = vm.clientsCopy;
                }

            }
        });

    }

})(window.angular);