(function(angular) {
    "use strict";


    angular
        .module('app.geospatial')
        .controller('PlotReportController', PlotReportController);

    PlotReportController.$inject = [ '$scope','GeoSpatialService','CommonService'];

    function PlotReportController( $scope,GeoSpatialService,CommonService )
    {
        var vm = this;

        init();



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
        };


        function init() {
            angular.extend($scope, {
                center: {
                    autoDiscover: true
                }
            });

            callAPI();
        }

        function callAPI() {
            GeoSpatialService.GetPlotAreaData('5b926c849fb7f20001f1494c').then(function (response) {
                // console.log('GetPlotAreaData', response);
                var data = response.data.docs[5];
                var data1 = response.data.docs[6];
                var data2 = response.data.docs[7];


                angular.extend($scope, {
                    markers: {
                        m1: {
                            lat: data.gps_location.single_point.latitude,
                            lng: data.gps_location.single_point.longitude,
                            message: data.crop.name
                        },
                        m2: {
                            lat: data1.gps_location.single_point.latitude,
                            lng: data1.gps_location.single_point.longitude,
                            message: data1.crop.name
                        },
                        m3: {
                            lat: data2.gps_location.single_point.latitude,
                            lng: data2.gps_location.single_point.longitude,
                            message: data2.crop.name
                        }
                    },
                    center: {
                        lat: data.gps_location.single_point.latitude,
                        lng: data.gps_location.single_point.longitude,
                        zoom: 8
                    }
                });
            }, function (error) { console.log('error', error); });
        }


    }

})(window.angular);