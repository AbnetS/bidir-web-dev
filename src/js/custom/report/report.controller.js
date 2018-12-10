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

        function _onSelectedReport() {
            console.log("report ",vm.report);
        }
        ReportService.GetLineChartReport().then(function (report) { console.log("report ",report); })

    }

})(window.angular);