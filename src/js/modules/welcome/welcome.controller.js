/**
 * Created by Yoni on 12/3/2017.
 */
(function(angular) {
    "use strict";

    angular
        .module('app.welcomePage')
        .controller('WelcomeController', WelcomeController);

    WelcomeController.$inject = ['$mdDialog', 'WelcomeService','AuthService'];

    function WelcomeController($mdDialog, WelcomeService ,AuthService) {
        var vm = this;

    }

}(window.angular));