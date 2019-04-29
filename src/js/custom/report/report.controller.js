(function(angular) {
    "use strict";
    angular
        .module('app.report')
        .controller('ReportController', ReportController);

    ReportController.$inject = ['ReportService', 'blockUI','PrintPreviewService','$sce'];

    function ReportController( ReportService,blockUI,PrintPreviewService,$sce )
    {
        var vm = this;
        vm.onSelectedReport = _onSelectedReport;
        vm.printReport = _printReport;

        init();

        function _onSelectedReport() {
            SetReportTemplateUrl();
            blockUI.start('reportBlockUI');
            vm.report.isLoading = true;
            vm.report.reportPromise = ReportService.GetReportById(vm.report._id).then(function (report) {
               vm.report.isLoading = false;
               blockUI.stop();
               vm.reportData = report.data;
            },function (reason) {
               vm.report.isLoading = false;
                blockUI.stop();
                console.log("error ",reason)
            });
        }

        function SetReportTemplateUrl() {
            if(!_.isUndefined(vm.report)){
                vm.report.templateUrl =  'app/views/report/templates/' + vm.report.type.toLowerCase() +'_template.html';
            }
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
                vm.reportsList = response.data;
            });
        }
        vm.convertPdf = _convertPdf;
        function _convertPdf() {
            vm.report = {
                pdfLoading:true
            };
            ReportService.GetReportPDF().then(function (response) {
                vm.pdfFile = openPDF(response.data);
                vm.report.pdfLoading = false;
            });
        }

        function openPDF(data, fileName) {
            // {type: 'application/pdf'}
            var file = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
            var fileURL = URL.createObjectURL(file);
            return $sce.trustAsResourceUrl(fileURL);
        }

    }

})(window.angular);