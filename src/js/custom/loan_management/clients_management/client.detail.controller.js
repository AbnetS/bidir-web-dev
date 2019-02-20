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
        vm.labelBasedOnStatus = LoanManagementService.StyleLabelByStatus;

        vm.tabsList = [
            { index: 1, heading:"Screening", code: 'screening', templateUrl:"app/views/loan_management/client_management/tabs/screening.partial.html" },
            { index: 2, heading:"Loan Application", code: 'loan', templateUrl:"app/views/loan_management/client_management/tabs/loan.partial.html" },
            { index: 3, heading:"ACAT", code: 'acat', templateUrl:"app/views/loan_management/client_management/tabs/acat.partial.html" }
        ];
        vm.activeTab = vm.tabsList[0]; //initially screening tab is active
        vm.activeTabIndex = vm.activeTab.index;

        vm.onSelectedLoanCycle = _onSelectedLoanCycle;

        vm.onTabSelected = _onTabSelected;
        vm.printLaonProcess = _print;

        vm.ACATGroupOnClick = _aCATGroupOnClick;
        vm.onLoanProposalClick = _onLoanProposalClick;

        function _onSelectedLoanCycle(){
             _onTabSelected();
        }

        function getLoanCycles(){
            //filter loan cycles by max loan cycle number
            vm.loanCycles = [];
            _.each(LoanManagementService.loanCycles,function (cycle) {
                if(cycle.id <= vm.client.loan_cycle_number){
                    vm.loanCycles.push(cycle);
                }
                vm.loanCycle = cycle.id === vm.client.loan_cycle_number?cycle.id.toString():"1";
            });
        }

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
                    Data: angular.extend({ Title: "ACAT And Loan Proposal Summary for " +
                    vm.clientACATs.client.first_name + " " +
                    vm.clientACATs.client.last_name + " " +
                    vm.clientACATs.client.grandfather_name}, vm.clientACATs,{loanProposals: vm.clientLoanProposals})
                }];
                PrintPreviewService.show(preview);
            } else{
                preview = [{
                    Name: "Loan Application",
                    TemplateUrl: "app/views/loan_management/client_management/printables/client.screening.html",
                    IsCommon: false,
                    IsSelected: false,
                    Data: angular.extend({ Title: "Loan Application Form Result for " +
                    vm.client.loan_application.client.first_name + " " +
                    vm.client.loan_application.client.last_name + " " +
                    vm.client.loan_application.client.grandfather_name}, vm.client.loan_application)
                }];
                PrintPreviewService.show(preview);
            }


        }

        function initialize() {
            vm.visibility = {
                showCropPanel:false,
                showSummaryPanel:false,
                showWarningForLoanCycle: false
            };
            vm.query = {
                search:'',
                page:1,
                per_page:10
            };

            var myBlockUI = blockUI.instances.get('ClientBlockUI');
            myBlockUI.start();

            LoanManagementService.GetClientDetail(vm.clientId)
                .then(function(response){
                    myBlockUI.stop();
                    vm.client = response.data;
                    vm.loanCycle =  vm.client.loan_cycle_number;
                    getLoanCycles();
                    _onTabSelected(vm.activeTab);


                    console.log("client detail",response);
                },function(error){
                    myBlockUI.stop();
                    console.log("error getting client detail",error);
                });
        }


        function CallClientScreeningAPI() {
            var blockUIName =  'screeningTabBlockUI';
            var myBlockUI = blockUI.instances.get(blockUIName);
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

        function GetClientApplicationByLoanCycle(application) {
            var blockUIName =  application + 'TabBlockUI';
            var myBlockUI = blockUI.instances.get(blockUIName);
            myBlockUI.start();
            vm.clientScreening = undefined; // reset on every load
            vm.client.loan_application = undefined;// reset on every load
            vm.clientACATs = undefined;// reset on every load
            LoanManagementService.GetClientApplicationByLoanCycle(vm.clientId,application,vm.loanCycle).then(function (response) {
                myBlockUI.stop();
                console.log("response.data after filtered by loan cycle",response.data);
                if(application ==='screening'){
                    vm.clientScreening = response.data;
                } else if(application ==='loan'){
                    vm.client.loan_application = response.data;
                } else if(application ==='acat'){
                    vm.clientACATs = response.data;
                }

                vm.visibility.showWarningForLoanCycle = response.data.client.loan_cycle_number !== vm.loanCycle;

            },function (error) {
                myBlockUI.stop();
                console.log("error fetching data by loan cycle",error);
            });
        }

        function CallClientLoanApplicationAPI() {
            var blockUIName =  'loanTabBlockUI';
            var myBlockUI = blockUI.instances.get(blockUIName);
            myBlockUI.start();
            vm.client.loan_application = undefined; // reset on every load
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
            var blockUIName =  'acatTabBlockUI';
            var myBlockUI = blockUI.instances.get(blockUIName);
            myBlockUI.start();
            vm.clientACATs = undefined; // reset on every load
            LoanManagementService.GetClientACAT(vm.clientId)
                .then(function(response){
                    myBlockUI.stop();
                    vm.clientACATs = response.data;
                    if(vm.clientACATs.ACATs.length>0) vm.ACATGroupOnClick(vm.clientACATs.ACATs[0]); //select the first crop
                    console.log("vm.clientACATs ",vm.clientACATs);
                },function(error){
                    myBlockUI.stop();
                    console.log("error getting client acat ",error);
                });

            LoanManagementService.GetClientLoanProposals(vm.clientId)
                .then(function(response){
                    vm.clientLoanProposals = response.data;
                    console.log("clientLoanProposals",vm.clientLoanProposals);
                },function(error){
                    console.log("error getting  clientLoanProposals ",error);
                });

        }


        function setActiveTabObj() {
            vm.activeTab = {};
            vm.activeTab = _.find(vm.tabsList,function (tab) {
                return tab.index === vm.activeTabIndex;
                });
        }
        function _onTabSelected() {
            console.log('active tab',vm.activeTabIndex);
            setActiveTabObj();
            switch (vm.activeTab.code){
                case 'screening':
                    if(_.isUndefined(vm.loanCycle)){
                        CallClientScreeningAPI();
                    }else{
                        GetClientApplicationByLoanCycle(vm.activeTab.code);
                    }
                    break;
                case 'loan':
                    if(_.isUndefined(vm.loanCycle)){
                        CallClientLoanApplicationAPI();
                    }else{
                        GetClientApplicationByLoanCycle(vm.activeTab.code);
                    }
                    break;
                case 'acat':
                    if(_.isUndefined(vm.loanCycle)){
                        CallClientACAT();
                    }else{
                        GetClientApplicationByLoanCycle(vm.activeTab.code);
                    }
                    break;
                default:
                    break;
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