
// APP START
// ----------------------------------- 

(function() {
    'use strict';

    angular
        .module('angle', [
            'app.core',
            'app.routes',
            'app.sidebar',
            'app.preloader',
            'app.loadingbar',
            'app.settings',
            'app.utils',
            'app.material'
        ]).run(function appRun(){});


        
})();

