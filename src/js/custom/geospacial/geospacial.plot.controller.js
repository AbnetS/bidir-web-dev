(function(angular) {
    "use strict";


    angular
        .module('app.geospatial')
        .controller('PlotReportController', PlotReportController);

    PlotReportController.$inject = [ '$scope','SharedService','CommonService'];

    function PlotReportController( $scope,SharedService,CommonService )
    {
        var vm = this;

        angular.extend($scope, {
            center: {
                lat: 8.9895,
                lng: 38.6878,
                zoom: 8
            },
            markers: {}
        });

        $scope.addMarkers = function() {
            angular.extend($scope, {
                markers: {
                    m1: {
                        lat: 8.526,
                        lng: 39.714889,
                        message: "static marker"
                    },
                    m2: {
                        lat:9.080,
                        lng: 38.847,
                        focus: true,
                        message: "Hey, drag me if you want",
                        draggable: true
                    }
                }
            });
        };

        $scope.removeMarkers = function() {
            $scope.markers = {};
        }

        $scope.addMarkers();


    }

})(window.angular);