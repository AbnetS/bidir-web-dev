(function (angular) {
    "use strict";


    angular
        .module('app.geospatial')
        .controller('PlotReportController', PlotReportController);

    PlotReportController.$inject = ['$scope', 'GeoSpatialService', 'SharedService','blockUI'];

    function PlotReportController($scope, GeoSpatialService, SharedService,blockUI) {
        var vm = this;
        vm.onSelectedBranch = _onSelectedBranch;

        init();

        function init() {
            angular.extend($scope, {
                center: {
                    autoDiscover: true
                }
            });
            GetBranches();
        }

        function callAPI() {
            var myBlockUI = blockUI.instances.get('BlockUIMap');
            myBlockUI.start('looking up geo locations on branch [' + vm.selectedBranch.name + ']' );
            GeoSpatialService.GetPlotAreaData(vm.selectedBranch._id).then(function (response) {
                console.log('GetPlotAreaData', response);
                myBlockUI.stop();
                var allData = response.data.docs;
                var markers = {};
                //dynamically set markers
                for (var index = 0; index < allData.length; index++) {
                    var data = allData[index];
                    markers['m' + index] = {
                        lat: data.gps_location.single_point.latitude,
                        lng: data.gps_location.single_point.longitude,
                        message: data.crop.name
                    };
                    // TESTING GEO LOCATION
                    // markers['m' + index] = {
                    //     lat: 9.1274179 + index / 1000,
                    //     lng: 41.046243 + index / 120,
                    //     message: data.crop.name
                    // };
                }


                angular.extend($scope, {
                    markers: markers,
                    center: {
                        //autoDiscover: true
                        lat: 9.1274179,
                        lng: 41.0462439,
                        zoom: 6
                    }
                });

            }, function (error) {
                myBlockUI.stop();
                console.log('error', error);
            });
        }

        function _onSelectedBranch() {
            callAPI();
        }

        function GetBranches() {
            SharedService.GetBranches()
                .then(function (response) {
                        vm.branches = response.data.docs;
                        vm.selectedBranch = vm.branches[0];
                        callAPI();
                    },
                    function (error) {
                        console.log("error fetching branches", error);
                    });
        }

    }

})(window.angular);