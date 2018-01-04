/**
 * Created by Yoni on 11/30/2017.
 */
(function() {
    'use strict';

    angular
        .module('app.manage_roles', [])
        .run(runBlock)
        .config(routeConfig);

    function runBlock() { console.log("RM run"); }

    function routeConfig() {console.log("RM config");}

})();