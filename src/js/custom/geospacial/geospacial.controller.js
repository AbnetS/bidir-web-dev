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
        var vm = this;
        vm.dtOption = {};
        vm.dtOption.dateOptions = {
            dateDisabled: false, formatYear: "yy",
            maxDate: new Date(2020, 5, 22),  startingDay: 1 };
        vm.dtOption.format = "shortDate";
        vm.dtOption.altInputFormats = ["M!/d!/yyyy"];
        vm.dtOption.popup = { opened: false };
        vm.dtOption.fromPopup = { opened: false };
        vm.dtOption.open = function()  { vm.dtOption.popup.opened = true; };
        vm.dtOption.fromOpen = function()  { vm.dtOption.fromPopup.opened = true; };
        vm.dtOption.clear = function() { vm.dtOption.dt = null; };
    }

})(window.angular);