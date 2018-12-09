(function (angular) {
    "use strict";
    angular
        .module('app.geospatial')
        .controller('GeospatialController', GeoSpatialController);

    GeoSpatialController.$inject = ['GeoSpatialService', 'blockUI', 'SharedService', 'CommonService', 'AlertService','$scope','$templateCache'];

    function GeoSpatialController(GeoSpatialService, blockUI, SharedService, CommonService, AlertService,$scope,$templateCache) {
        var vm = this;
        vm.INDICATOR = INDICATOR;
        vm.currentUser = GeoSpatialService.CurrentUser;
        vm.saveUserConfig = _saveUserConfig;
        vm.resetConfig = _resetConfig;

        init();

        // We can use panel id name for the boolean flag to [un]collapse the panel
        $scope.$watch('panelDemo1',function(newVal){

            console.log('panelDemo1 collapsed: ' + newVal);

        });





        function _resetConfig() {
            vm.config = undefined;
        }

        function getGeoSpatialData() {

            vm.regions = '10501:10503';
            //GET VI DATA
            GeoSpatialService.getSeasonalMonitorData({
                indicator: vm.INDICATOR.VI,
                start_date: GeoSpatialService.formatDateForRequest(vm.config.from_date),
                end_date:  GeoSpatialService.formatDateForRequest(vm.config.to_date),
                regions: vm.regions
            })
                .then(function (response) {
                    console.log("VI Data", response);
                    setVisibility();
                    vm.vegitationIndex = response.data;
                }, function (error) {
                    console.log("error", error);
                });
            //GET RAINFALL DATA
            GeoSpatialService.getSeasonalMonitorData({
                indicator: vm.INDICATOR.RAINFALL,
                start_date: GeoSpatialService.formatDateForRequest(vm.config.from_date),
                end_date:  GeoSpatialService.formatDateForRequest(vm.config.to_date),
                regions: vm.regions
            })
                .then(function (response) {
                    console.log("Rainfall data" , response);
                    vm.rainfall = response.data;
                }, function (error) {
                    console.log("error", error);
                });
        }

        function _saveUserConfig() {

            vm.IsValidData = CommonService.Validation.ValidateForm(vm.seasonalFilterForm, vm.config);

            if (vm.IsValidData) {
                vm.config.user = vm.currentUser._id;
                vm.config.from_date = vm.config.fromDate;
                vm.config.to_date = vm.config.toDate;

                vm.visibility.showSmiley = true;
                vm.visibility.showInfoText = false;
                vm.visibility.showWarning = false;

                if(vm.config._id){
                    GeoSpatialService.UpdateConfig(vm.config).then(function (response) {
                            AlertService.showSuccess('Configuration Information', "User Configuration Updated Successfully");
                            console.log("response", response);
                            vm.config = response.data;
                        }
                        , function (error) {
                            console.log('error', error);
                            var message = error.data.error.message;
                            AlertService.showError('Oops... Something went wrong', message);
                        });
                }else{
                    GeoSpatialService.SaveConfig(vm.config).then(function (response) {
                            AlertService.showSuccess('Configuration Information', "User Configuration Updated Successfully");
                            console.log("response", response);
                            vm.config = response.data;
                        }
                        , function (error) {
                            console.log('error', error);
                            var message = error.data.error.message;
                            AlertService.showError('Oops... Something went wrong', message);
                        });
                }

            } else {
                vm.visibility.showWarning = true;
                vm.visibility.showInfoText = false;
            }

        }

        function init() {

            vm.config = {};
            vm.visibility = {
                showSmiley: false,
                showInfoText: true,
                isEditConfig: false };
            // var template = $templateCache.get('http://seasmon.wenr.wur.nl/html/info_00000011_VI_latest.html');

            vm.seasonalFilterForm = {
                IsfromDateValid: true,
                IstoDateValid: true,
                IsnameValid: true
            };
            //DATE OPTION
            vm.dtOption = GeoSpatialService.DateOptionDefault();

            SharedService.GetBranches()
                .then( function (response) {
                    vm.branches = response.data.docs;
                    console.log("vm.branches", vm.branches);
                },
                    function (error) {
                    console.log("error fetching branches", error);
                });

            GetUserConfig();

        }

        function GetUserConfig() {
            GeoSpatialService.GetUserConfig().then(function (response) {
                if (response.data.length > 0) {
                    vm.config = response.data[0];
                    vm.config.fromDate = new Date(vm.config.from_date);
                    vm.config.toDate = new Date(vm.config.to_date);
                    getGeoSpatialData();
                }else {
                    vm.visibility.isEditConfig = false;
                }
                console.log(" vm.config", vm.config);
            }, function (reason) {
                console.log(reason)
            });
        }

        function setVisibility() {
            vm.visibility.isEditConfig = true;
            vm.visibility.showSmiley = true;
        }
    }

})(window.angular);