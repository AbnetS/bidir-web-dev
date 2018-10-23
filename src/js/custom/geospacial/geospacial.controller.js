(function(angular) {
    "use strict";


    angular
        .module('app.geospatial')
        .controller('GeospatialController', GeoSpatialController);

    GeoSpatialController.$inject = ['GeoSpatialService', 'blockUI','AlertService'];

    function GeoSpatialController( GeoSpatialService,blockUI,AlertService )
    {
        console.log("GeoSpatialController controller");
    }

})(window.angular);