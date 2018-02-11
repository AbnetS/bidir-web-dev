/**
 * Created by Yoni on 1/29/2018.
 */
(function(angular) {
    'use strict';
    angular.module('app.forms')

        .service('FormService', FormService);

    FormService.$inject = ['$http','CommonService','MW_QUESTION_TYPES'];

    function FormService($http, CommonService,MW_QUESTION_TYPES) {
        return {
            GetFormsPerPage: _getFormsPerPage,
            CreateForm:_createForm,
            GetForm:_getForm,
            UpdateForm:_updateForm,
            QuestionTypes: MW_QUESTION_TYPES,
            FormTypes: [{name:'ACAT',code:'ACAT'},{name:'LOAN APPLICATION',code:'LOAN_APPLICATION'},{name:'SCREENING',code:'SCREENING'},{name:'Group Application',code:'GROUP_APPLICATION'}]
        };
        function _getFormsPerPage(parameters) {
            return $http.get(CommonService.buildPerPageUrl(API.Service.FORM, API.Methods.Form.All, parameters));
        }
        function _getForm(id) {
            return $http.get(CommonService.buildUrlWithParam(API.Service.FORM, API.Methods.Form.All, id));
        }
        function _updateForm(form) {
            return $http.put(CommonService.buildUrlWithParam(API.Service.FORM,API.Methods.Form.All,form._id), form);
        }
        function _createForm(form){
            return $http.post(CommonService.buildUrl(API.Service.FORM,API.Methods.Form.Create), form);
        }
    }


})(window.angular);