/**
 * Created by Yonas on 7/2/2018.
 */
(function(angular) {
    'use strict';
    var clients = {
        bindings: { },
        templateUrl: 'app/views/loan_management/loan_processing/clients.html',
        controller: 'ClientsController',
        controllerAs:'vm'
    };

    angular.module('app.processing')
        .component('clients', clients);
})(window.angular);