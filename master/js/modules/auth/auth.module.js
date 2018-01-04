(function() {
    'use strict';

    angular
        .module('app.auth', [])
        .run(runBlock)
        .config(routeConfig);

    function runBlock() { console.log("auth run"); }

    function routeConfig() {console.log("auth config");}


})();