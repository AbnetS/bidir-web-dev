(function(angular) {
    'use strict';
    angular.module('app.geospatial')

        .service('GeoSpatialService', GeoSpatialService);

    GeoSpatialService.$inject = ['$http','CommonService','AuthService'];

    function GeoSpatialService($http, CommonService, AuthService) {

    }

})(window.angular);