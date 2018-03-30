/**
 * Created by Yoni on 3/30/2018.
 */

(function(angular) {
    "use strict";

    angular.module("app.screening").controller("ScreeningController", ScreeningController);

    ScreeningController.$inject = ['ScreeningService'];

    function ScreeningController(ScreeningService) {
        var vm = this;
        ScreeningService.GetScreenings();
    }


})(window.angular);
