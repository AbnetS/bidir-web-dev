/**
 * Created by Yoni on 3/5/2018.
 */

(function(angular) {
    "use strict";

    angular.module("app.acat").controller("LoanProductsController", LoanProductsController);

    LoanProductsController.$inject = ['$mdDialog','RouteHelpers'];

    function LoanProductsController($mdDialog,RouteHelpers) {
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


        function LoanProductDialogController() {

        }
    }



})(window.angular);