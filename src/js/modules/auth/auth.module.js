(function() {
    'use strict';

    angular
        .module('app.auth', [])
        .run(runBlock)
        .config(routeConfig);

    function runBlock() { }

    function routeConfig() {}


})();