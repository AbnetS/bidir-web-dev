(function (angular) {
    "use strict";

    angular.module("app.processing")
        .controller("GeoLocationController", GeoLocationController);

    GeoLocationController.$inject = ['$mdDialog','data'];

    function GeoLocationController($mdDialog,data) {
        var vm = this;
        vm.gps_location.polygon = [];
        vm.gps_location.single_point = {};
        console.log("data",data);

        vm.cancel = _cancel;
        vm.updateGeoLocation = _updateGeoLocation;


        function _cancel() {
            $mdDialog.cancel();
        }

        function _updateGeoLocation() {
            $mdDialog.hide("hello");
        }
    }
})(window.angular);