/**
 * Created by Yoni on 1/9/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.clients").controller("ClientDetailController", ClientDetailController);

    ClientDetailController.$inject = ['LoanManagementService','$stateParams','blockUI'];

    function ClientDetailController(LoanManagementService,$stateParams,blockUI) {
        var vm = this;
        vm.clientId =  $stateParams.id;
        vm.visibility = {showMoreClientDetail: false};
        vm.onTabSelected = _onTabSelected;

        initialize();



        function initialize() {
            var myBlockUI = blockUI.instances.get('ClientBlockUI');
            myBlockUI.start();
            LoanManagementService.GetClientDetail(vm.clientId)
                .then(function(response){
                    myBlockUI.stop();
                    vm.client = response.data;
                    CallClientScreeningAPI();
                    console.log("client detail",response);
                },function(error){
                    myBlockUI.stop();
                    console.log("error getting client detail",error);
                });
        }

        function CallClientScreeningAPI() {
            var myBlockUI = blockUI.instances.get('ClientScreeningBlockUI');
            myBlockUI.start();
            LoanManagementService.GetClientScreening(vm.clientId).then(function (response) {
                myBlockUI.stop();
                vm.client.screening = response.data;
                console.log("vm.client.screening",vm.client);

            },function (error) {
                myBlockUI.stop();
                console.log("error fetching screening",error);
            });
        }

        function CallClientLoanApplicationAPI() {
            var myBlockUI = blockUI.instances.get('ClientLoanApplicationBlockUI');
            myBlockUI.start();
            LoanManagementService.GetClientLoanApplication(vm.clientId)
                .then(function (response) {
                    myBlockUI.stop();
                    vm.client.loan_application = response.data;
                    console.log("vm.client.loan_application",vm.client);
                },function (error) {
                    myBlockUI.stop();
                    console.log(" error .loan_application",error);
                });
        }

        function _onTabSelected(type) {
            console.log("tab name clicked",type);
            switch (type){
                case 'CLIENT':
                    console.log("tab name clicked",type);
                    break;
                case 'SCREENING':
                    CallClientScreeningAPI();
                    console.log("tab name clicked",type);
                    break;
                case 'LOAN_APPLICATION':
                    CallClientLoanApplicationAPI();
                    break;
                case 'ACAT':
                    console.log("tab name clicked",type);
                    break;
                default:
                    console.log("tab name clicked",type);
            }
        }
    }


})(window.angular);