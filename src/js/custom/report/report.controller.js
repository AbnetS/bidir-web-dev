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
        vm.generateReport = _generateReport;

        init();

        function _generateReport() {  }

        function _onSelectedReport() {
            if (angular.isUndefined(vm.report.has_parameters) || vm.report.has_parameters === false) return;

            _.each(vm.report.parameters,function (param) {
               if(!param.is_constant && angular.isDefined(param.get_from)){
                   ReportService.GetReportParameter(param.get_from).then(function (response) {
                       param.values = response.data;
                   });
               }else{
                   param.values = _.map(param.constants,function (value) {
                        return {send: value,display: value};
                   });
               }
            });
        }

        function _downloadDocument() {
            vm.report.isLoading = true;
            var myBlockUI = blockUI.instances.get('reportDownload');
            myBlockUI.start('Downloading...');
            vm.report.reportPromise =  ReportService.GetReportPDF(vm.report._id,'docx').then(function (response) {
                vm.pdfFile = openPDF(response.data);
                vm.report.isLoading = false;
                window.open(vm.pdfFile, '_self', '');
                myBlockUI.stop();
            },function () { myBlockUI.stop(); });
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