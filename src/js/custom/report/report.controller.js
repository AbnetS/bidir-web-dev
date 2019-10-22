(function(angular) {
    "use strict";
    angular
        .module('app.report')
        .controller('ReportController', ReportController);

    ReportController.$inject = ['ReportService', 'blockUI','PrintPreviewService','$sce','$scope','$filter'];

    function ReportController( ReportService,blockUI,PrintPreviewService,$sce,$scope,$filter)
    {
        var vm = this;
        vm.FILE_TYPE ={
            PDF: {type: 'application/pdf'},
            DOC: { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
        };
        vm.onSelectedReport = _onSelectedReport;
        vm.printReport = _printReport;
        // vm.downloadDocument = _downloadDocument;
        vm.generateReport = _generateReport;

        init();

        function _generateReport() {
            vm.report.isLoading = true;
            var myBlockUI = blockUI.instances.get('reportDownload');
            let filters = {};
                vm.report.parameters.map(
                (parameter)=> {
                    if(_.isEmpty(parameter.selected) && _.isUndefined(parameter.selected)) return;

                    if (parameter.type === 'DATE') {
                        filters[parameter.code] =  { send: $filter('date')( parameter.selected, 'dd-MM-yyyy'),display: $filter('date')( parameter.selected, 'longDate')};
                    }else if (parameter.type === 'TEXT') {
                        filters[parameter.code] =  { send: parameter.selected,display: $filter('ordinal')( parameter.selected)};
                    } else {
                        filters[parameter.code]  = parameter.selected;
                    }

                }
            );

            myBlockUI.start('Downloading...');
            vm.report.reportPromise =  ReportService.FilterReport(vm.report._id,'docx',filters).then(function (response) {
                vm.pdfFile = openPDF(response.data);
                vm.report.isLoading = false;
                window.open(vm.pdfFile, '_self', '');
                myBlockUI.stop();
            },function () { myBlockUI.stop(); });

        }

        function _onSelectedReport() {
            if (angular.isUndefined(vm.report.has_parameters) || vm.report.has_parameters === false) return;

            _.each(vm.report.parameters,function (param) {

               if(!param.is_constant && param.get_from ){
                   ReportService.GetReportParameter(param.get_from).then(function (response) {
                       param.values = response.data;
                   });
               }
               else{
                   param.values = param.constants;
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

            dateSettings();
            ReportService.GetAllReports().then(function (response) {
                vm.reportsList = response.data;
            });
        }

        function dateSettings() {

            vm.startDateConfig = {
                // open: false,
                minDate: new Date(Date.now())
            };
            vm.endDateConfig = {
                // open: false,
                minDate: new Date(vm.dateStart)
            };
            //watching to see what date is set in the start date
            //field and setting that date as the minimum for end date
            $scope.$watch("vm.dateStart", function(newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }
                vm.endDateConfig.minDate = newValue;
            });

        }

        function openPDF(data) {
            var file = new Blob([data], vm.FILE_TYPE.DOC);
            var fileURL = URL.createObjectURL(file);
            return $sce.trustAsResourceUrl(fileURL);
        }

    }

})(window.angular);