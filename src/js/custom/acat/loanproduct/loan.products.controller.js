/**
 * Created by Yoni on 3/5/2018.
 */

(function(angular) {
    "use strict";

    angular.module("app.acat").controller("LoanProductsController", LoanProductsController);

    LoanProductsController.$inject = ['$mdDialog','RouteHelpers','CommonService','AlertService','blockUI'];

    function LoanProductsController($mdDialog,RouteHelpers,CommonService,AlertService,blockUI) {
        var vm = this;
        vm.addLoanProduct = _addLoanProduct;
        vm.editLoanProduct = _editLoanProduct;


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
        function _editLoanProduct(item,ev) {

        }


        function LoanProductDialogController($mdDialog,data,CommonService,AlertService,blockUI) {
            var vm = this;
            vm.cancel = _cancel;
            vm.addToDeductibleList = _addToDeductibleList;
            vm.addToCostOfLoan = _addToCostOfLoan;
            vm.editDeductibleItem = _editDeductibleItem;
            vm.editCostOfLoanItem = _editCostOfLoanItem;


            vm.isEdit = data.loan_product !== null;

            if(vm.isEdit){
                vm.loan_product = data.loan_product;
            }else{
                vm.loan_product = {
                    deductibles:[],
                    cost_of_loans:[]
                };
            }

            function _cancel() {
                $mdDialog.cancel();
            }

            function _addToDeductibleList(item) {
                console.log("deductible",item);
                vm.loan_product.deductibles.push(item);
            }
            function _editDeductibleItem(item) {
                console.log("edit deductible",item);
            }
            function _addToCostOfLoan(item) {
                console.log("Cost of loan",item);
                vm.loan_product.cost_of_loans.push(item);

            }
            function _editCostOfLoanItem(item) {
                console.log("EDIT Cost of loan",item);
            }

        }
    }



})(window.angular);