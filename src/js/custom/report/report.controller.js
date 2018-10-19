(function(angular) {
    "use strict";


    angular
        .module('app.report')
        .controller('ReportController', ReportController);

    ReportController.$inject = ['ReportService', 'blockUI','AlertService'];

    function ReportController( ReportService,blockUI,AlertService )
    {
        console.log("Report controller");
    }

})(window.angular);