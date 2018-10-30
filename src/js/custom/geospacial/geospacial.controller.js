(function(angular) {
    "use strict";


    angular
        .module('app.geospatial')
        .controller('GeospatialController', GeoSpatialController);

    GeoSpatialController.$inject = ['GeoSpatialService', 'blockUI','$http'];

    function GeoSpatialController( GeoSpatialService,blockUI,$http )
    {
        //
        // $http({
        //     method: 'POST',
        //     url: 'http://146.148.123.23:8080/geoserver/ows?service=WPS&version=1.0.0&request=GetCapabilities',
        //     data: '<searchKey id="whatever"/>',
        //     headers: { "Content-Type": 'application/xml' }
        // }).success(function(data, status, headers, config) {
        //     console.log(data);  // XML document object
        //
        // }).error(function(data, status, headers, config) {
        //     console.log("error",data)
        // });

    }

})(window.angular);