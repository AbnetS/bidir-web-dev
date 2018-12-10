(function(angular) {
    "use strict";


    angular
        .module('app.report')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['ReportService', 'Colors','AlertService'];

    function DashboardController( ReportService,Colors,AlertService )
    {
        var vm = this;

        ReportService.GetLineChartReport().then(function (report) { console.log("report ",report); })


        init();

        function init() {

            // Bar Chart
            // ------------------
            vm.barLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
            vm.barSeries = ['Series A', 'Series B'];
            vm.barData = [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 19, 86, 27, 90]
            ];
            vm.barColors = [{
                backgroundColor: Colors.byName('dark'),
                borderColor: Colors.byName('dark')
            }, {
                backgroundColor: Colors.byName('green'),
                borderColor: Colors.byName('green')
            }];
        }

    }

})(window.angular);