(function(angular) {

    'use strict';

    angular.module('bidirApp.core')
        .factory('CommonService', CommonService);

    /**@ngInject */
    function CommonService() {

        var factory = {
            buildUrl: _buildUrl,
            buildUrlWithParam: _buildUrlWithParam
        };

        return factory;

        function _buildUrl(service,url) {
            return API.Config.BaseUrl + service +'/' + url;
        }

        function _buildUrlWithParam(url,service, id) {
            return API.Config.BaseUrl + service +'/'+ url + '/' + id;
        }
    }
})(window.angular);
