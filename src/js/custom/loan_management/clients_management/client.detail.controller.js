/**
 * Created by Yoni on 1/9/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.clients").controller("ClientDetailController", ClientDetailController);

    ClientDetailController.$inject = ['LoanManagementService','$stateParams','blockUI','PrintPreviewService'];

    function ClientDetailController(LoanManagementService,$stateParams,blockUI,PrintPreviewService) {
        var vm = this;
        vm.clientId =  $stateParams.id;
        vm.visibility = {showMoreClientDetail: false};
        vm.labelBasedOnStatusStyle = LoanManagementService.StyleLabelByStatus;

        vm.query = {
            search:'',
            page:1,
            per_page:10
        };

        vm.onTabSelected = _onTabSelected;
        vm.printLaonProcess = _print;

        initialize();

        function _print(type) {
            console.log("type",vm.clientScreening)
            var preview = [];
            if(type === 'SCREENING'){
                preview = [{
                    Name: "Screening",
                    TemplateUrl: "app/views/loan_management/client_management/printables/client.screening.html",
                    IsCommon: false,
                    IsSelected: false,
                    Data: angular.extend({ Title: "Screening Form Result for " +
                                                    vm.clientScreening.client.first_name + " " +
                                                    vm.clientScreening.client.last_name + " " +
                                                    vm.clientScreening.client.grandfather_name}, vm.clientScreening)
                }];
                PrintPreviewService.show(preview);
            }else{
                preview = [{
                    Name: "Loan Application",
                    TemplateUrl: "app/views/loan_management/client_management/printables/client.screening.html",
                    IsCommon: false,
                    IsSelected: false,
                    Data: angular.extend({ Title: "Loan Application Formm Result for " +
                    vm.client.loan_application.client.first_name + " " +
                    vm.client.loan_application.client.last_name + " " +
                    vm.client.loan_application.client.grandfather_name}, vm.client.loan_application)
                }];
                PrintPreviewService.show(preview);
            }


        }

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
                vm.clientScreening = response.data;
                console.log("screening",vm.clientScreening);

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

        function CallClientACAT() {

            var myBlockUI = blockUI.instances.get('ClientACATBlockUI');
            myBlockUI.start();
            LoanManagementService.GetClientACAT(vm.clientId)
                .then(function(response){
                    myBlockUI.stop();
                    vm.clientACATs = response.data;
                    console.log("vm.clientACATs ",vm.clientACATs);
                },function(error){
                    myBlockUI.stop();
                    console.log("error getting client acat ",error);
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
                    break;
                case 'LOAN_APPLICATION':
                    CallClientLoanApplicationAPI();
                    break;
                case 'ACAT':
                    CallClientACAT();
                    break;
                default:
                    console.log("tab name clicked",type);
            }
        }
    }


})(window.angular);