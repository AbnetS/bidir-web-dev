/**
 * Created by Yonas on 4/27/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.loan_management")
        .controller("LoanProcessingController", LoanProcessingController);

    LoanProcessingController.$inject = ['$state','$scope'];

    function LoanProcessingController($state,$scope) {
        var vm = this;
        callApi();

        function callApi(){
            console.log("LoanProcessing Controller");
        }


    }


})(window.angular);