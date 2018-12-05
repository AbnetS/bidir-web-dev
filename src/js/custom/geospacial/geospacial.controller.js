(function (angular) {
    "use strict";
    angular
        .module('app.geospatial')
        .controller('GeospatialController', GeoSpatialController);

    GeoSpatialController.$inject = ['GeoSpatialService', 'blockUI', 'SharedService', 'CommonService', 'AlertService'];

    function GeoSpatialController(GeoSpatialService, blockUI, SharedService, CommonService, AlertService) {
        var vm = this;

        vm.generateSeasonalReport = _generateSeasonalReport;
        vm.currentUser = GeoSpatialService.CurrentUser();
        vm.config = {};
        vm.visibility = {
            showSmiley: false,
            showInfoText: true,
            isEditConfig: false
        };

        vm.seasonalFilterForm = {
            IsfromDateValid: true,
            IstoDateValid: true,
            IsnameValid: true
        };

        vm.resetConfig = _resetConfig;

        init();

        function _resetConfig() {
            vm.config = undefined;
        }


        function getGeoSpatialData() {

            GeoSpatialService.getIndicatorsData({
                indicator: 'VI',
                start_date: '2018-07-01',//vm.config.from_date,//'2018-07-01',
                end_date:  '2018-12-05',//vm.config.to_date,
                regions: '10212:10213:10301'
            })
                .then(function (response) {
                    console.log("response", response);
                }, function (error) {
                    console.log("error", error);
                });
        }

        function _generateSeasonalReport() {

            vm.IsValidData = CommonService.Validation.ValidateForm(vm.seasonalFilterForm, vm.config);

            if (vm.IsValidData) {
                vm.config.user = vm.currentUser._id;
                vm.config.from_date = GeoSpatialService.formatDateForRequest(vm.config.fromDate);
                vm.config.to_date = GeoSpatialService.formatDateForRequest(vm.config.toDate);

                vm.visibility.showSmiley = true;
                vm.visibility.showInfoText = false;
                vm.visibility.showWarning = false;


                GeoSpatialService.SaveConfig({
                    user: "5b925494b1cfc10001d80908",
                    name : "Seasonal Monitoring for Belg",
                    from_date: "2018-07-01",
                    to_date:"2018-12-10"
                }).then(function (response) {
                        AlertService.showSuccess('Configuration Saved Successfully', response);
                        console.log("response", response);
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
                    vm.isEditConfig = true;
                    getGeoSpatialData();
                }
                console.log(" vm.config", vm.config);
            }, function (reason) {
                console.log(reason)
            });


        }
    }

})(window.angular);