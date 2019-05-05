(function(angular) {
    "use strict";
    angular
        .module('app.report')
        .controller('ReportController', ReportController);

    ReportController.$inject = ['ReportService', 'blockUI','PrintPreviewService','$sce'];

    function ReportController( ReportService,blockUI,PrintPreviewService,$sce )
    {
        var vm = this;
        vm.FILE_TYPE ={
            PDF: {type: 'application/pdf'},
            DOC: { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
        };
        vm.onSelectedReport = _onSelectedReport;
        vm.printReport = _printReport;
        vm.downloadDocument = _downloadDocument;

        init();

        function _onSelectedReport() {
            vm.downloadDocument();
        }

        function _downloadDocument() {
            vm.report.isLoading = true;
            vm.report.reportPromise =  ReportService.GetReportPDF(vm.report._id,'docx').then(function (response) {
                vm.pdfFile = openPDF(response.data);
                vm.report.isLoading = false;

                // window.open(vm.pdfFile, '_self', '');
            });
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

        function openPDF(data) {
            var file = new Blob([data], vm.FILE_TYPE.DOC);
            var fileURL = URL.createObjectURL(file);
            return $sce.trustAsResourceUrl(fileURL);
        }

    }

})(window.angular);