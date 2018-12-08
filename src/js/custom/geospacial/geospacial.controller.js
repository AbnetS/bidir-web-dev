(function (angular) {
    "use strict";
    angular
        .module('app.geospatial')
        .controller('GeospatialController', GeoSpatialController);

    GeoSpatialController.$inject = ['GeoSpatialService', 'blockUI', 'SharedService', 'CommonService', 'AlertService','$sce','$templateCache'];

    function GeoSpatialController(GeoSpatialService, blockUI, SharedService, CommonService, AlertService,$sce,$templateCache) {
        var vm = this;

        vm.generateSeasonalReport = _generateSeasonalReport;
        vm.currentUser = GeoSpatialService.CurrentUser();
        vm.config = {};
        vm.visibility = {
            showSmiley: false,
            showInfoText: true,
            isEditConfig: false
        };
        // var template = $templateCache.get('http://seasmon.wenr.wur.nl/html/info_00000011_VI_latest.html');

        vm.seasonalFilterForm = {
            IsfromDateValid: true,
            IstoDateValid: true,
            IsnameValid: true
        };

        vm.resetConfig = _resetConfig;

        init();
        vm.trustSrc = function(src) {
            return $sce.trustAsHtml("http://seasmon.wenr.wur.nl/html/info_00000011_VI_latest.html");
        }
        function _resetConfig() {
            vm.config = undefined;
        }


        function getGeoSpatialData() {

            GeoSpatialService.getIndicatorsData({
                indicator: 'VI',
                start_date: vm.config.from_date,
                end_date:  vm.config.to_date,
                regions: '10212:10213:10301'
            })
                .then(function (response) {
                    console.log("getIndicatorsData VI", response);
                }, function (error) {
                    console.log("error", error);
                });

            GeoSpatialService.getIndicatorsData({
                indicator: 'PRECIP',
                start_date: vm.config.from_date,
                end_date:  vm.config.to_date,
                regions: '10212:10213:10301'
            })
                .then(function (response) {
                    console.log("getIndicatorsData rainfall" , response);
                }, function (error) {
                    console.log("error", error);
                });
        }

        function _generateSeasonalReport() {

            vm.IsValidData = CommonService.Validation.ValidateForm(vm.seasonalFilterForm, vm.config);

            if (vm.IsValidData) {
                vm.config.user = vm.currentUser._id;
                vm.config.from_date = vm.config.fromDate;
                vm.config.to_date = vm.config.toDate;

                vm.visibility.showSmiley = true;
                vm.visibility.showInfoText = false;
                vm.visibility.showWarning = false;


                GeoSpatialService.SaveConfig(vm.config).then(function (response) {
                        AlertService.showSuccess('Configuration Saved Successfully', response);
                        console.log("response", response);
                        vm.config = response.data;
                    }
                    , function (error) {
                        console.log('error', error);
                        var message = error.data.error.message;
                        AlertService.showError('Oops... Something went wrong', message);
                    });
            } else {
                vm.visibility.showWarning = true;
                vm.visibility.showInfoText = false;
            }

        }

        function init() {
            vm.dtOption = {};
            vm.dtOption.dateOptions = {
                dateDisabled: false, formatYear: "yy",
                maxDate: new Date(2020, 5, 22), startingDay: 1
            };
            vm.dtOption.format = "shortDate";
            vm.dtOption.altInputFormats = ["M!/d!/yyyy"];
            vm.dtOption.popup = {opened: false};
            vm.dtOption.fromPopup = {opened: false};
            vm.dtOption.open = function () {
                vm.dtOption.popup.opened = true;
            };
            vm.dtOption.fromOpen = function () {
                vm.dtOption.fromPopup.opened = true;
            };
            vm.dtOption.clear = function () {
                vm.dtOption.dt = null;
            };

            SharedService.GetBranches().then(
                function (response) {
                    vm.branches = response.data.docs;
                },
                function (error) {
                    console.log("error fetching branches", error);
                }
            );

            GeoSpatialService.GetUserConfig().then(function (response) {
                if (response.data.length > 0) {
                    vm.config = response.data[0];
                    vm.config.fromDate = new Date(vm.config.from_date);
                    vm.config.toDate = new Date(vm.config.to_date);
                    setVisibility();
                    getGeoSpatialData();
                }else {
                    vm.visibility.isEditConfig = false;
                }
                console.log(" vm.config", vm.config);
            }, function (reason) {
                console.log(reason)
            });

        function setVisibility() {
            vm.visibility.isEditConfig = true;
            vm.visibility.showSmiley = true;
        }

        }
    }

})(window.angular);