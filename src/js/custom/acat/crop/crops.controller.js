/**
 * Created by Yoni on 3/5/2018.
 */

(function(angular) {
    "use strict";

    angular.module("app.acat").controller("CropsController", CropsController);

    CropsController.$inject = ['$state'];

    function CropsController($state) {

    console.log("CROP CONTROLLER");
    }



})(window.angular);