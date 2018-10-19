(function(angular) {
    'use strict';
    angular.module('app.report')

        .service('ReportService', ReportService);

    ReportService.$inject = ['$http','CommonService','AuthService'];

    function ReportService($http, CommonService, AuthService) {

    }

})(window.angular);