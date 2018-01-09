/**
 * Created by Yoni on 1/9/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.clients").controller("ClientDetailController", ClientDetailController);

    ClientDetailController.$inject = ['ClientService','$stateParams'];

    function ClientDetailController(ClientService,$stateParams) {
        var vm = this;
        vm.clientId =  $stateParams.id;

        ClientService.GetClientDetail(vm.clientId)
            .then(function(response){
                vm.client = response.data;
                console.log("client detail",response);
            },function(error){
                console.log("error getting client detail",error);
            })

    }


})(window.angular);