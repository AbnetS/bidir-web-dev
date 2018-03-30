/**
 * Created by Yoni on 3/30/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.screening").controller("ClientScreeningController", ClientScreeningController);

    ClientScreeningController.$inject = ['ScreeningService'];

    function ClientScreeningController(ScreeningService) {
        var vm = this;
        ScreeningService.GetScreeningByClientId();
    }


})(window.angular);