/**
 * Created by Yoni on 1/8/2018.
 */

(function(angular) {
    'use strict';
    angular.module('app.mfi')

        .service('ClientService', ClientService);

    ClientService.$inject = ['$http','CommonService','AuthService'];

    function ClientService($http, CommonService,AuthService) {

    }


})(window.angular);