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
            SaveClientLoanApplication:_saveClientLoanApplication,

            GetScreenings: _getScreenings,
            GetClientScreening:_getClientScreening,
            GetClientApplicationByLoanCycle:_getClientApplicationByLoanCycle,

            SaveClientScreening:_saveClientScreening,
            //CLIENT MANAGEMENT RELATED SERVICES DECLARATION
            GetClients: _getClients,
            SaveClient: _saveClient,
            UpdateClient: _updateClient,
            GetClientDetail:_getClientDetail,
            SearchClient:_searchClient,
            GetClientByLoanCycle:_getClientByLoanCycle,
            GetBranches: _getBranches,

            GetACATCollections: _getACATCollections,
            GetClientACAT:_getClientACAT,
            GetClientLoanProposals:_getClientLoanProposals,
            GetCrops:_getCrops,

            StyleLabelByStatus: _styleLabelByStatus,
            loanCycles: [{id:1,name:'1st Loan Cycle'},{id:2,name:'2nd Loan Cycle'},{id:3,name:'3rd Loan Cycle'},{id:4,name:'4th Loan Cycle'},{id:5,name:'5th Loan Cycle'},{id:6,name:'6th Loan Cycle'},{id:7,name:'7th Loan Cycle'},{id:8,name:'8th Loan Cycle'},{id:9,name:'9th Loan Cycle'},{id:10,name:'10th Loan Cycle'}],
            //GROUP LOAN
            GetGroupLoans:_getGroupLoans,
            GetGroupLoan:_getGroupLoan
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
        function _getClientApplicationByLoanCycle(clientId,application,loanCycle) {
            return $http.get(CommonService.buildUrl(API.Service.SCREENING,API.Methods.SCREENING.Histories) + 'application='+application+'&client='+clientId+'&loanCycle='+loanCycle);
        }
        function _getLoanApplications(parameters) {
            return $http.get(CommonService.buildPerPageUrl(API.Service.LOANS,API.Methods.LOANS.Loans,parameters));
        }
        function _getClientLoanApplication(clientId) {
            return $http.get(CommonService.buildUrlWithParam(API.Service.LOANS,API.Methods.LOANS.Clients,clientId));
        }
        function _saveClientLoanApplication(loan_application,id) {
            return $http.put(CommonService.buildUrlWithParam(API.Service.LOANS,API.Methods.LOANS.Loans,id),loan_application);
        }



        //CLIENT MANAGEMENT RELATED SERVICES
        function _searchClient(searchText) {
            return $http.get(CommonService.buildUrlForSearch(API.Service.SCREENING,API.Methods.Clients.Client,searchText));
        }
        function _getClientByLoanCycle(loanCycle) {
            return $http.get(CommonService.buildUrl(API.Service.SCREENING,API.Methods.Clients.Client) + '/search?loan_cycle_number=' + loanCycle);
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
        function _saveClient(client) {
            return $http.post(CommonService.buildUrl(API.Service.SCREENING,API.Methods.SCREENING.Clients + '/create'),client);
        }
        function _updateClient(client) {
            return $http.put(CommonService.buildUrlWithParam(API.Service.SCREENING,API.Methods.SCREENING.Clients,client._id),client);
        }


        function _styleLabelByStatus(clientStatus) {
            var style = '';
            if(_.isUndefined(clientStatus))
                return '';
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
        function _getClientLoanProposals(clientId) {
            return $http.get(CommonService.buildUrlWithParam(API.Service.ACAT,API.Methods.ACAT.LoanProposals,clientId));
        }

        function _getCrops() {
            return $http.get(CommonService.buildPaginatedUrl(API.Service.ACAT,API.Methods.ACAT.Crop));
        }



        function _getGroupLoans(parameters) {
            return $http.get(CommonService.buildPerPageUrl(API.Service.GROUPS,API.Methods.Group.Group,parameters));
        }

        function _getGroupLoan(id) {
            return $http.get(CommonService.buildUrlWithParam(API.Service.GROUPS,API.Methods.Group.Group,id));
        }

    }


})(window.angular);