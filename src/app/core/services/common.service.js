(function(angular) {

    'use strict';

    angular.module('bidirApp.core')
        .factory('CommonService', CommonService);

    /**@ngInject */
    function CommonService(API_CONFIG) {

        var factory = {
            buildUrl: _buildUrl,
            buildUrlWithParam: _buildUrlWithParam
        };

        return factory;

        function _buildUrl(url) {
            return API_CONFIG.Config.BaseUrl + url;
        }

        function _buildUrlWithParam(url, id) {
            return API_CONFIG.Config.BaseUrl + url + '/' + id;
        }
    }
})(window.angular);
