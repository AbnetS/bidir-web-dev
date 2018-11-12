(function(angular) {
    "use strict";


    angular
        .module('app.geospatial')
        .controller('GeospatialController', GeoSpatialController);

    GeoSpatialController.$inject = ['GeoSpatialService', 'blockUI','SharedService','CommonService'];

    function GeoSpatialController( GeoSpatialService,blockUI,SharedService,CommonService )
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
            IsbranchValid: true
        };

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
        }
    }

})(window.angular);