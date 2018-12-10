(function(angular) {
    "use strict";


    angular
        .module('app.report')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['ReportService', 'SharedService','AlertService'];

    function DashboardController( ReportService,SharedService,AlertService )
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
            vm.count = {
                branch: 0,
                client: 0,
                user: 0};

            SharedService.GetBranches().then(function (value) {
                vm.count.branch = value.data.docs.length;
            });
            SharedService.GetUsers().then(function (value) {
                vm.count.user = value.data.docs.length;
            });
            SharedService.GetClients().then(function (value) {
                vm.count.client = value.data.docs.length;
            });

        }

    }

})(window.angular);