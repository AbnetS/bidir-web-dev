/**
 * Created by Yoni on 1/8/2018.
 */


(function(angular) {
    "use strict";

    angular.module("app.clients").controller("ClientsController", ClientsController);

    ClientsController.$inject = ['ClientService'];

    function ClientsController(ClientService) {
        var vm = this;
        vm.clientDetail = _clientDetail;

        ClientService.GetClients().then(function(response){
           console.log("Clients list",response);
        },function (error) {
            console.log("error",error);
        });
        
        
        function _clientDetail() {
            
        }
    }


})(window.angular);
