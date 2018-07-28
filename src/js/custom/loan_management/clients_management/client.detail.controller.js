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
        vm.visibility = {
            showCropPanel:false,
            showSummaryPanel:false
        };
        vm.query = {
            search:'',
            page:1,
            per_page:10
        };

        vm.onTabSelected = _onTabSelected;
        vm.printLaonProcess = _print;

        vm.ACATGroupOnClick = _aCATGroupOnClick;
        vm.onLoanProposalClick = _onLoanProposalClick;

        initialize();

        function _print(type) {
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
            }else if(type === 'ACAT_CROP'){
                preview = [{
                    Name: "ACAT Summary",
                    TemplateUrl: "app/views/loan_management/client_management/printables/client.acat.summary.html",
                    IsCommon: false,
                    IsSelected: false,
                    Data: angular.extend({ Title: "ACAT Summary for " +
                    vm.clientACATs.client.first_name + " " +
                    vm.clientACATs.client.last_name + " " +
                    vm.clientACATs.client.grandfather_name}, vm.selectedClientACAT)
                }];
                PrintPreviewService.show(preview);
            }else if(type === 'ACAT_TOTAL'){
                preview = [{
                    Name: "ACAT Summary",
                    TemplateUrl: "app/views/loan_management/client_management/printables/client.acat.total.html",
                    IsCommon: false,
                    IsSelected: false,
                    Data: angular.extend({ Title: "ACAT Summary for " +
                    vm.clientACATs.client.first_name + " " +
                    vm.clientACATs.client.last_name + " " +
                    vm.clientACATs.client.grandfather_name}, vm.clientACATs)
                }];
                PrintPreviewService.show(preview);
            } else{
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

        function _aCATGroupOnClick(selectedClientACAT,index) {
            vm.selectedClientACAT = selectedClientACAT;
            ShowCropPanel();
            console.log("vm.selectedClientACAT",vm.selectedClientACAT);
        }
        function _onLoanProposalClick(loanProduct) {
            ShowSummaryPanel();
            vm.selectedLoanProduct = loanProduct;
            console.log("vm.selectedClientACAT",vm.selectedLoanProduct );
            vm.list = { settingActive: 10 };
        }

        function ShowCropPanel() {
            vm.visibility.showCropPanel = true;
            vm.visibility.showSummaryPanel = false;
        }
        function ShowSummaryPanel() {
            vm.visibility.showCropPanel = false;
            vm.visibility.showSummaryPanel = true;
        }
    }


})(window.angular);