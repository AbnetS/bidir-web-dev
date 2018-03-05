/**
 * Created by Yoni on 3/5/2018.
 */

(function(angular) {
    "use strict";

    angular.module("app.acat").controller("LoanProductsController", LoanProductsController);

    LoanProductsController.$inject = ['$state'];

    function LoanProductsController($state) {

        console.log("LoanProducts Controller");
    }



})(window.angular);