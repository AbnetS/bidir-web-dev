/**
 * Created by Yoni on 1/8/2018.
 */


(function(angular) {
    "use strict";

    angular.module("app.clients").controller("ClientsController", ClientsController);

    ClientsController.$inject = ['ClientService'];

    function ClientsController(ClientService) {

    }


})(window.angular);
