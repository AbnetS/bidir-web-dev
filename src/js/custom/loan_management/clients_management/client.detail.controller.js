/**
 * Created by Yoni on 1/9/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.clients").controller("ClientDetailController", ClientDetailController);

    ClientDetailController.$inject = ['LoanManagementService','$stateParams','blockUI'];

    function ClientDetailController(LoanManagementService,$stateParams,blockUI) {
        var vm = this;
        vm.clientId =  $stateParams.id;

        var myBlockUI = blockUI.instances.get('ClientBlockUI');
        myBlockUI.start();
        LoanManagementService.GetClientDetail(vm.clientId)
            .then(function(response){

                vm.client = response.data;
                console.log("client detail",response);
                LoanManagementService.GetClientScreening(vm.client._id).then(function (response) {
                    myBlockUI.stop();
                    vm.client.screening = response.data;
                    console.log("vm.client",vm.client);
                },function (error) {
                    myBlockUI.stop();
                });
            },function(error){
                myBlockUI.stop();
                console.log("error getting client detail",error);
            })

    }


})(window.angular);