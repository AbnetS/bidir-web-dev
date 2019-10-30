(function(angular) {
    'use strict';
    angular.module('app.report')

        .service('ReportService', ReportService);

    ReportService.$inject = ['$http','CommonService','Colors','API_DEFINITION'];

    function ReportService($http, CommonService, Colors,API_DEFINITION) {
        var API = API_DEFINITION;
        return {
            barColors: barColors(),
            GetLineChartReport:_getLineChartReport,
            GetReportById:_getReportById,
            GetAllReports:_getAllReports,
            GetReportParameter:_getReportParameter,
            FilterReport:_filterReport,
            GetReportPDF:_getReportPDF,
            SearchReportParameter: _searchReportParameter
        };

        function barColors() {
            return [{backgroundColor: Colors.byName('success'), borderColor: Colors.byName('success')}, {backgroundColor: Colors.byName('info'),  borderColor: Colors.byName('info') }];
        }

        function _getReportById(id){
            return $http.get(CommonService.buildUrlWithParam(API.Service.REPORT,API.Methods.Report.Report,id));
        }
        function _getLineChartReport(){
            return $http.get(CommonService.buildUrl(API.Service.REPORT,API.Methods.Report.Report) + '5c1917476070e615a1f2a18f');
        }

        function _getAllReports(){
            return $http.get(CommonService.buildUrl(API.Service.REPORT,API.Methods.Report.AllReport));
        }
        function _getReportPDF(id,format){
            return $http({
                url: CommonService.buildUrlWithParam(API.Service.REPORT,API.Methods.Report.Report,id) + '/' + format,
                method: 'GET',
                responseType: 'arraybuffer'
            });
        }
        function _getReportParameter(getFrom){
            return $http.get(CommonService.buildUrl(API.Service.REPORT,getFrom));
        }

        function _searchReportParameter(getFrom,parameter){
            return $http.post(CommonService.buildUrlWithParam(API.Service.REPORT,getFrom,parameter));
        }
        function _filterReport(id,format,params){
            return $http({
                url: CommonService.buildUrlWithParam(API.Service.REPORT,API.Methods.Report.Report,id) + '/' + format,
                method: 'POST',
                responseType: 'arraybuffer',
                data: params
            });
        }
    }

})(window.angular);