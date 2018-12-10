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
            var total_loan_amount = _.map(chartData, function(data){ return data.total_loan_amount; });  // _.pluck(chartData,'total_loan_amount');

            vm.barLabels = _.pluck(chartData,'crop');
            vm.barSeries_byClient = ['Number of Clients'];
            vm.barSeries_byAmount = ['Total Loan Amount'];
            vm.barData_byClient = [ no_of_clients ];
            vm.barData_byAmount = [ total_loan_amount ];
            vm.barColors_byClient = ReportService.barColors;
            vm.barColors_byAmount = [{backgroundColor: Colors.byName('info'),  borderColor: Colors.byName('info') },{backgroundColor: Colors.byName('primary'), borderColor: Colors.byName('primary')}];

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