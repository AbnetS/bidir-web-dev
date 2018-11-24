(function(angular) {
    "use strict";


    angular
        .module('app.geospatial')
        .controller('PlotReportController', PlotReportController);

    PlotReportController.$inject = ['NgMap', 'blockUI','SharedService','CommonService'];

    function PlotReportController( NgMap,blockUI,SharedService,CommonService )
    {
        var vm = this;
        NgMap.getMap().then(function(map) {
            vm.showCustomMarker= function(evt) {
                map.customMarkers.foo.setVisible(true);
                map.customMarkers.foo.setPosition(this.getPosition());
            };
            vm.closeCustomMarker= function(evt) {
                this.style.display = 'none';
            };
        });

    }

})(window.angular);