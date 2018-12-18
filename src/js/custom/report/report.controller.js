(function(angular) {
    "use strict";


    angular
        .module('app.report')
        .controller('ReportController', ReportController);

    ReportController.$inject = ['ReportService', 'blockUI','PrintPreviewService'];

    function ReportController( ReportService,blockUI,PrintPreviewService )
    {
        var vm = this;
        vm.onSelectedReport = _onSelectedReport;
        vm.getReportTemplate = _getReportTemplate;
        vm.printReport = _printReport;

        init();

        function _onSelectedReport() {

            vm.report.templateUrl =  vm.getReportTemplate();
            blockUI.start('reportBlockUI');
            vm.report.isLoading = true;
           vm.report.reportPromise = ReportService.GetReportById(vm.report._id).then(function (report) {
               vm.report.isLoading = false;
               blockUI.stop();
                if(vm.report._id === '5c0de708d836a80001357602'){
                    vm.reportData = report.data.data;
                }else{
                    vm.reportData = report.data;
                }
            },function (reason) {
               vm.report.isLoading = false;
                blockUI.stop();
                console.log("error ",reason)
            });
        }

        function _getReportTemplate() {
            var report = vm.report;
            if(_.isUndefined(vm.report)) return '';
            var viewPath = 'app/views/report/templates/' + report.code +'_template.html';
            var templatePath = '';
            switch (report.code) {
                case 'client_loan_history':
                    templatePath = viewPath + 'report/templates/client_loan_history_template.html';
                    break;
                case 'client_loan_cycle_stats':
                    templatePath = viewPath + 'report/templates/client_loan_cycle_stats_template.html';
                    break;
                default:
                        templatePath = '';
            }
            return templatePath;
        }

        function _printReport(report) {
            var preview = [{
                Name: report.title,
                TemplateUrl: report.templateUrl,//.replace("template.html","printable.html"),
                IsCommon: false,
                IsSelected: false,
                Data: angular.extend({ Title: report.title}, {report: vm.report,reportData: vm.reportData} )
            }];
            PrintPreviewService.show(preview);
        }


        function init() {
            ReportService.GetAllReports().then(function (response) {
                vm.reportsList = _.filter(response.data,function (report) {
                    return report._id === '5c0de708d836a80001357602' || report._id === '5c0e852ed836a8000135774f';
                });

            });
        }

    }

})(window.angular);