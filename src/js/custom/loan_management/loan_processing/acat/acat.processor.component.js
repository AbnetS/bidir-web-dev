(function(angular) {
    'use strict';
    var acatProcessor = {
        bindings: { },
        templateUrl: 'app/views/loan_management/loan_processing/acat.processor.html',
        controller: 'ACATProcessorController',
        controllerAs:'vm'
    };

    angular.module('app.processing')
        .component('acatProcessor', acatProcessor);
})(window.angular);