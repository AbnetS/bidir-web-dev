/**
 * Created by Yoni on 3/5/2018.
 */

(function(angular) {
    "use strict";

    angular.module("app.acat").controller("LoanProductsController", LoanProductsController);

    LoanProductsController.$inject = ['$mdDialog','RouteHelpers','blockUI','AlertService','ACATService'];

    function LoanProductsController($mdDialog,RouteHelpers,blockUI,AlertService,ACATService) {
        var vm = this;
        vm.addLoanProduct = _addLoanProduct;
        vm.editLoanProduct = _editLoanProduct;
        callAPI();



        function callAPI() {
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
                callAPI();
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
                callAPI();
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
            vm.cancelEdit = _cancelEdit;

            vm.saveLoanProduct = _saveLoanProduct;

            initialize();

            function initialize() {
                vm.isEdit = data.loan_product !== null;
                vm.isEditCostOfLoan = false;
                vm.isEditDeductible = false;

                if(vm.isEdit){
                    vm.loan_product = data.loan_product;
                    LoadDeductibleAndCostOfLoanTypes(vm.loan_product);

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
            }


            function LoadDeductibleAndCostOfLoanTypes(loanProd) {
                _.each(loanProd.cost_of_loan,function (cLoan) {
                     cLoan.type = _.isNumber(cLoan.fixed_amount) && cLoan.fixed_amount  > 0 ? 'fixed_amount':'percent';
                });

                _.each(loanProd.deductibles,function (deduct) {
                    deduct.type = _.isNumber(deduct.fixed_amount) && deduct.fixed_amount > 0 ? 'fixed_amount':'percent';
                });
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
                var type = vm.loan_product.deductible.type;
                vm.loan_product.deductible = item;
                vm.loan_product.deductible.type = type;
                vm.isEditDeductible = true;
            }
            function _addToCostOfLoanList(item) {
                vm.loan_product.cost_of_loan.push(item);
                vm.loan_product.costOfLoan = {
                    type : 'fixed_amount'
                };
            }
            function _editCostOfLoanItem(item) {
                var type = vm.loan_product.costOfLoan.type;
                vm.loan_product.cost_of_loan = item;
                vm.loan_product.costOfLoan.type = type;
                vm.isEditCostOfLoan = true;
            }

            function _cancelEdit(type) {
                if(type === 'deductible'){
                    vm.loan_product.deductible = {
                        type : 'fixed_amount'
                    };
                    vm.isEditDeductible = false;
                }else {
                    vm.loan_product.costOfLoan = {
                        type : 'fixed_amount'
                    };
                    vm.isEditCostOfLoan = false;
                }
            }

            function _saveLoanProduct() {
                var myBlockUI = blockUI.instances.get('LoanProductBlockUI');
                myBlockUI.start();

                if(!vm.isEdit){
                    ACATService.CreateLoanProduct(vm.loan_product).then(function (response) {
                        console.log("created loan product",response.data);
                        AlertService.showSuccess("LOAN PRODUCT","Loan Product Created successfully");
                        $mdDialog.hide();
                        myBlockUI.stop();
                    },function (error) {
                        myBlockUI.stop();
                        AlertService.showError("LOAN PRODUCT","Failed to create Loan Product");
                        console.log("error",error);
                    });
                }else{
                    ACATService.UpdateLoanProduct(vm.loan_product).then(function (response) {
                        console.log("Updated loan product",response.data);
                        AlertService.showSuccess("LOAN PRODUCT","Loan Product Updated successfully");
                        myBlockUI.stop();
                        $mdDialog.hide();
                    },function (error) {
                        AlertService.showError("LOAN PRODUCT","Failed to update Loan Product");
                        myBlockUI.stop();
                        console.log("error",error);
                    });
                }

            }

        }
    }



})(window.angular);