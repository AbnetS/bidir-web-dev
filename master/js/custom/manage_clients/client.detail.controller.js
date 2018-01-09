/**
 * Created by Yoni on 1/9/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.clients").controller("ClientDetailController", ClientDetailController);

    ClientDetailController.$inject = ['ClientService','$stateParams','blockUI'];

    function ClientDetailController(ClientService,$stateParams,blockUI) {
        var vm = this;
        vm.clientId =  $stateParams.id;

        var myBlockUI = blockUI.instances.get('ClientBlockUI');
        myBlockUI.start();
        ClientService.GetClientDetail(vm.clientId)
            .then(function(response){
                myBlockUI.stop();
                vm.client = response.data;
                console.log("client detail",response);
            },function(error){
                myBlockUI.stop();
                console.log("error getting client detail",error);
            })

    }


})(window.angular);