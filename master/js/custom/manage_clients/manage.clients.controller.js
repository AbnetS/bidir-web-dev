/**
 * Created by Yoni on 1/8/2018.
 */


(function(angular) {
    "use strict";

    angular.module("app.clients").controller("ClientsController", ClientsController);

    ClientsController.$inject = ['ClientService','$state'];

    function ClientsController(ClientService,$state) {
        var vm = this;
        vm.pageSizes = [10, 25, 50, 100, 250, 500];

        vm.request = {
            Start: 1,
            limit:100,
            PageSize: 10
        };
        vm.clientDetail = _clientDetail;
        vm.setClientProfile = _setClientProfile;

        ClientService.GetClients().then(function(response){
           vm.clients = response.data.docs;
            console.log("Clients list",response);
        },function (error) {
            console.log("error",error);
        });
        
        
        function _clientDetail(client,ev) {
            $state.go('app.client_detail',{id:client._id});
        }
        function _setClientProfile(picture) {
            return picture? picture: 'app/img/user/02.png';
        }
    }


})(window.angular);
