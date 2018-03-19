/**
 * Created by Yoni on 3/19/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.acat").controller("ACATListController", ACATListController);

    ACATListController.$inject = ['ACATService','$state'];

    function ACATListController(ACATService,$state) {
        var vm = this;
        vm.editACAT = _editACAT;


        function _editACAT(acat) {
            $state.go('app.acatbuilder',{id:acat._id});
        }

        initialize();

        function initialize() {
            ACATService.GetAllACATList().then(function (response) {
                vm.acat_list = response.data.docs;
                console.log("vm.acat_list",response);
            })

        }



    }



})(window.angular);