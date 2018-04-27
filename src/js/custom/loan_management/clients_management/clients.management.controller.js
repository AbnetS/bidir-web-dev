/**
 * Created by Yonas on 4/27/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.loan_management")
        .controller("ClientManagementController", ClientManagementController);

    ClientManagementController.$inject = ['$state','$scope'];

    function ClientManagementController($state,$scope) {
        var vm = this;
        callApi();

        function callApi(){
                console.log("ClientManagement Controller");
        }


    }


})(window.angular);