/**
 * Created by Yonas on 4/27/2018.
 */
(function(angular) {
    'use strict';
    angular.module('app.loan_management')

        .service('LoanManagementService', LoanManagementService);

    LoanManagementService.$inject = ['$http', 'CommonService'];

    function LoanManagementService($http, CommonService) {
        return {
            GetLoanApplications: _getLoanApplications,
            GetClientLoanApplication:_getClientLoanApplication,
            GetScreenings: _getScreenings,

            GetClientScreening:_getClientScreening,
            SaveClientScreening:_saveClientScreening,
            //CLIENT MANAGEMENT RELATED SERVICES DECLARATION
            GetClients: _getClients,
            GetClientDetail:_getClientDetail,
            SearchClient:_searchClient,
            GetBranches: _getBranches,

            GetACATCollections: _getACATCollections,
            GetClientACAT:_getClientACAT,
            GetCrops:_getCrops,

            StyleLabelByStatus: _styleLabelByStatus
        };

        function _getScreenings(parameters) {
            return $http.get(CommonService.buildPerPageUrl(API.Service.SCREENING,API.Methods.SCREENING.Screening,parameters));
        }
        function _saveClientScreening(screening,id) {
            return $http.put(CommonService.buildUrlWithParam(API.Service.SCREENING,API.Methods.SCREENING.Screening,id),screening);
        }


        function _getClientScreening(clientId) {
            return $http.get(CommonService.buildUrlWithParam(API.Service.SCREENING,API.Methods.SCREENING.Clients,clientId) + '/screenings');
        }
        function _getLoanApplications(parameters) {
            return $http.get(CommonService.buildPerPageUrl(API.Service.LOANS,API.Methods.LOANS.Loans,parameters));
        }
        function _getClientLoanApplication(clientId) {
            return $http.get(CommonService.buildUrlWithParam(API.Service.LOANS,API.Methods.LOANS.Clients,clientId));
        }


        //CLIENT MANAGEMENT RELATED SERVICES
        function _searchClient(searchText) {
            return $http.get(CommonService.buildUrlForSearch(API.Service.SCREENING,API.Methods.Clients.Client,searchText));
        }

        function _getClientDetail(id){
            return $http.get(CommonService.buildUrlWithParam(API.Service.SCREENING,API.Methods.Clients.Client,id));
        }
        function _getBranches(){
            return $http.get(CommonService.buildPaginatedUrl(API.Service.MFI,API.Methods.MFI.Branches));
        }
        function _getClients(parameters){
            return $http.get(CommonService.buildPerPageUrl(API.Service.SCREENING,API.Methods.SCREENING.Clients,parameters));
        }

        function _styleLabelByStatus(clientStatus) {
            var style = '';
            switch (clientStatus.toLowerCase()){
                case  'new':
                    style =  'label bg-gray';
                    break;
                case  'submitted':
                    style =  'label bg-primary-dark';
                    break;
                case  'approved':
                    style =  'label bg-green-dark';
                    break;
                case 'screening_inprogress':
                case 'declined_under_review':
                    style =  'label label-warning';
                    break;
                case 'loan_application_accepted':
                    style =  'label bg-info-dark';
                    break;
                case 'eligible':
                    style =  'label label-success';
                    break;
                case 'ineligible':
                case 'declined_final':
                    style =  'label label-danger';
                    break;
                case 'loan_application_new':
                    style =  'label bg-purple-dark';
                    break;
                default:
                    style =  'label label-inverse';
            }
            return style;
        }

        function _getACATCollections(parameters) {
            return $http.get(CommonService.buildPerPageUrl(API.Service.ACAT,API.Methods.ACAT.Clients,parameters));
        }
        function _getClientACAT(clientId) {
            return $http.get(CommonService.buildUrlWithParam(API.Service.ACAT,API.Methods.ACAT.Clients,clientId));
        }
        function _getCrops() {
            return $http.get(CommonService.buildPaginatedUrl(API.Service.ACAT,API.Methods.ACAT.Crop));
        }

    }


})(window.angular);