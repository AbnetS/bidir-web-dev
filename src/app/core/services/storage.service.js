(function(angular) {
    'use strict';

    angular.module('core')
        .service('StorageService', StorageService);

    /**@ngInject */
    function StorageService($localStorage) {
        var servce = {
            Get: get,
            Set: set,
            Remove: remove,
            Reset: reset
        };

        return servce;

        function get(key) {
            var val = $localStorage[key];

            if (!_.isUndefined(val)) {
                return JSON.parse(val);
            } else return null;

        }

        function set(key, value) {
            $localStorage[key] = JSON.stringify(value);
        }

        function remove(key) {
            delete $localStorage[key];
        }

        function reset() {
            $localStorage.$reset();
        }
    }

})(window.angular);
