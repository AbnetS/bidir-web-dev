/**
 * Created by Yoni on 3/5/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.acat").controller("ACATController", ACATController);

    ACATController.$inject = ['$state'];

    function ACATController($state) {
        console.log("ACAT CONTROLLER");

    }



})(window.angular);