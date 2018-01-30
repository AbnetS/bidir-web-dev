/**
 * Created by Yoni on 1/29/2018.
 */
(function(angular) {
    'use strict';
    angular.module('app.forms')

        .service('FormService', FormService);

    FormService.$inject = ['$http','CommonService'];

    function FormService($http, CommonService) {
        return {
            GetFormsPerPage: _getFormsPerPage
        };
        function _getFormsPerPage(parameters) {
            return $http.get(CommonService.buildPerPageUrl(API.Service.FORM, API.Methods.Form.All, parameters));
        }
    }


})(window.angular);