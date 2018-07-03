/**
 * Created by Yonas on 7/3/2018.
 */
(function(angular) {
    'use strict';
    var loanApplications = {
        bindings: { },
        templateUrl: 'app/views/loan_management/loan_processing/tabs/loan_applications.html',
        controller: 'LoanApplicationProcessorController',
        controllerAs:'vm'
    };

    angular.module('app.processing')
        .component('loanApplications', loanApplications);
})(window.angular);