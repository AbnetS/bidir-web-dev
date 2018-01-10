(function() {
    'use strict';

    angular
        .module('custom', [
            // request the the entire framework
            'angle',
            // or just modules
            'app.mfi',
            'app.clients'
            /*...*/
        ]).run(customRun);

    function customRun() {
        console.log("custom app run");
    }
})();