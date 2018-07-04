/**
 * Created by Yonas on 7/4/2018.
 */
(function(angular) {
    'use strict';
    var clientDetail = {
        templateUrl: 'app/views/loan_management/loan_processing/tabs/client.detail.html',
        controller: 'ClientsController',
        controllerAs:'vm'
    };

    angular.module('app.processing')
        .component('clientDetail', clientDetail);
})(window.angular);