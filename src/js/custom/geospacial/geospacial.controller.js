(function(angular) {
    "use strict";


    angular
        .module('app.geospatial')
        .controller('GeospatialController', GeoSpatialController);

    GeoSpatialController.$inject = ['GeoSpatialService', 'blockUI','SharedService','CommonService','$http'];

    function GeoSpatialController( GeoSpatialService,blockUI,SharedService,CommonService ,$http)
    {
        var vm = this;
        vm.filter = {};
        vm.generateSeasonalReport = _generateSeasonalReport;
        vm.visibility = {
           showSmiley: false,
           showInfoText: true
        };

        vm.seasonalFilterForm = {
            IsfromDateValid: true,
            IstoDateValid: true,
            IsnameValid: true
        };

        vm.resetConfig = _resetConfig;
        function _resetConfig(){
          vm.filter = undefined;
        }

        init();

        function _generateSeasonalReport() {

            vm.IsValidData = CommonService.Validation.ValidateForm(vm.seasonalFilterForm, vm.filter);

           if(vm.IsValidData)
           {
               vm.filter.fromDateString = GeoSpatialService.formatDateForRequest(vm.filter.fromDate);
               vm.filter.toDateString = GeoSpatialService.formatDateForRequest(vm.filter.toDate);

               vm.visibility.showSmiley = true;
               vm.visibility.showInfoText = false;
               vm.visibility.showWarning = false;
           }else
               {
               vm.visibility.showWarning = true;
               vm.visibility.showInfoText = false;
               }

            console.log("date picked", vm.filter);
        }

        function init(){
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

            SharedService.GetBranches().then(
                function(response) {
                    vm.branches = response.data.docs;
                },
                function(error) {
                    console.log("error fetching branches", error);
                }
            );
            $http.get("https://seasmon.wenr.wur.nl/cgi-bin/register.py?indicator=VI&start_date=2018-07-01&end_date=2018-12-05&regions=10212:10213:10301").then(
                function (response) {
                console.log("data",response);
            });
        }
    }

})(window.angular);