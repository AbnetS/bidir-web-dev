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
            QuestionTypes: MW_QUESTION_TYPES
        };
        function _getFormsPerPage(parameters) {
            return $http.get(CommonService.buildPerPageUrl(API.Service.FORM, API.Methods.Form.All, parameters));
        }
    }


})(window.angular);