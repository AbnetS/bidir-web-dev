/**
 * Created by Yoni on 3/5/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.acat").controller("ACATController", ACATController);

    ACATController.$inject = ['ACATService'];

    function ACATController(ACATService) {
            var vm = this;
            callApi();

        function callApi(){
            ACATService.GetCrops().then(function (response) {
                vm.crops = response.data.docs;
            });
        }

    }



})(window.angular);