(function(angular) {
    "use strict";


    angular
        .module('app.report')
        .controller('ReportController', ReportController);

    ReportController.$inject = ['ReportService', 'blockUI','AlertService'];

    function ReportController( ReportService,blockUI,AlertService )
    {
        var vm = this;
        vm.onSelectedReport = _onSelectedReport;
        vm.reports = [
            {
                name: 'report 1',
                data: []
            },
            {
                name: 'report 2',
                data: []
            },
            {
                name: 'report 3',
                data: []
            }
        ];

        init();

        function _onSelectedReport() {
            console.log("report ",vm.report);
        }


        function init() {
            ReportService.GetClientHistoryReport().then(function (report) {
                vm.reportData = report.data;
            });


            ReportService.GetReportById('5c0e852ed836a8000135774f').then(function (report) {
                vm.client_loan_cycle_stats = report.data;

            });
        }

    }

})(window.angular);