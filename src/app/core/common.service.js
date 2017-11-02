(function(angular) {
    
    'use strict';
    
    angular.module('bidirApp.core')
        .factory('commonService', commonService);

    /**@ngInject */
    function commonService() {

        var factory = {
            buildUrl: _buildUrl,
            buildUrlWithParam: _buildUrlWithParam
        };

        return factory;

        function _buildUrl(url) {
            return API.Config.BaseUrl + url;
        }

        function _buildUrlWithParam(url, id) {
            return API.Config.BaseUrl + url + '/' + id;
        }
    }
})(window.angular);