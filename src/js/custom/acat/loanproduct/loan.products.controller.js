/**
 * Created by Yoni on 3/5/2018.
 */

(function(angular) {
    "use strict";

    angular.module("app.acat").controller("LoanProductsController", LoanProductsController);

    LoanProductsController.$inject = ['$mdDialog','RouteHelpers','CommonService','AlertService','ACATService'];

    function LoanProductsController($mdDialog,RouteHelpers,CommonService,AlertService,ACATService) {
        var vm = this;
        vm.addLoanProduct = _addLoanProduct;
        vm.editLoanProduct = _editLoanProduct;
        initialize();



        function initialize() {
            ACATService.GetAllLoanProducts().then(function (response) {
                        vm.loanProducts = response.data.docs;
                        console.log("loan p",response);
            });
        }


        function _addLoanProduct(loan_product,ev) {
            $mdDialog.show({
                locals: {data:{loan_product:loan_product}},
                templateUrl: RouteHelpers.basepath('acat/loanproduct/loan.product.dialog.html'),
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                hasBackdrop: false,
                escapeToClose: true,
                controller: LoanProductDialogController,
                controllerAs: 'vm'
            }).then(function (answer) {

            }, function (response) {
                console.log("refresh on response");
            });
        }
        function _editLoanProduct(loan_product,ev) {
            $mdDialog.show({
                locals: {data:{loan_product:loan_product}},
                templateUrl: RouteHelpers.basepath('acat/loanproduct/loan.product.dialog.html'),
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                hasBackdrop: false,
                escapeToClose: true,
                controller: LoanProductDialogController,
                controllerAs: 'vm'
            }).then(function (answer) {

            }, function (response) {
                console.log("refresh on response");
            });
        }


        function LoanProductDialogController($mdDialog,data,CommonService,AlertService,blockUI) {
            var vm = this;
            vm.cancel = _cancel;
            vm.addToDeductibleList = _addToDeductibleList;
            vm.addToCostOfLoanList = _addToCostOfLoanList;
            vm.editDeductibleItem = _editDeductibleItem;
            vm.editCostOfLoanItem = _editCostOfLoanItem;

            vm.saveLoanProduct = _saveLoanProduct;


            vm.isEdit = data.loan_product !== null;

            if(vm.isEdit){
                vm.loan_product = data.loan_product;
                vm.loan_product.deductible = {
                    type : 'fixed_amount'
                };
                vm.loan_product.costOfLoan = {
                    type : 'fixed_amount'
                };
            }else{
                vm.loan_product  = {
                    deductibles :[],
                    cost_of_loan :[],
                    deductible:{
                        type : 'fixed_amount'
                    },
                    costOfLoan:{
                        type : 'fixed_amount'
                    }
                };
            }

            function _cancel() {
                $mdDialog.cancel();
            }

            function _addToDeductibleList(item) {
                console.log("deductible",item);
                vm.loan_product.deductibles.push(item);
                vm.loan_product.deductible = {
                    type : 'fixed_amount'
                };
            }
            function _editDeductibleItem(item) {
                console.log("edit deductible",item);
            }
            function _addToCostOfLoanList(item) {
                console.log("Cost of loan",item);
                vm.loan_product.cost_of_loan.push(item);
                vm.loan_product.costOfLoan = {
                    type : 'fixed_amount'
                };
            }
            function _editCostOfLoanItem(item) {
                console.log("EDIT Cost of loan",item);
            }

            function _saveLoanProduct() {
                // console.log("create loan product",vm.loan_product);
                ACATService.CreateLoanProduct(vm.loan_product).then(function (response) {
                    console.log("created loan product",response.data);
                },function (error) {
                    console.log("error",error);
                });
            }

        }
    }



})(window.angular);