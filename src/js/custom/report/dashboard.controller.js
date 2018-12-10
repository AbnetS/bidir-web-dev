(function(angular) {
    "use strict";


    angular
        .module('app.report')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['ReportService', 'Colors','AlertService'];

    function DashboardController( ReportService,Colors,AlertService )
    {
        var vm = this;

        ReportService.GetLineChartReport().then(function (report) {
              var chartData = report.data;
              var no_of_clients = _.pluck(chartData,'no_of_clients');
              var total_loan_amount = _.pluck(chartData,'total_loan_amount');

            vm.barLabels = _.pluck(chartData,'crop');
            vm.barSeries = ['Number of Clients', 'Total Loan Amount'];
            vm.barData = [ no_of_clients, total_loan_amount ];

            vm.barColors = ReportService.barColors;

        });


        init();

        function init() {

        }

    }

})(window.angular);