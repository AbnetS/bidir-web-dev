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
            GetForms: _getForms
        };
        function _getForms() {
            return $http.get(CommonService.buildPaginatedUrl(API.Service.FORM,API.Methods.Form.All));
        }
    }


})(window.angular);