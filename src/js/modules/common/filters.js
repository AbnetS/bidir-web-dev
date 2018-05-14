/**
 * Created by Yoni on 12/14/2017.
 */
(function(angular) {
    'use strict';
    angular.module('app.common')
        .filter('ReplaceUnderscore', function () {
        return function (input) {
            return typeof input === "string" ? input.replace(/_/g, ' '):input;
        };
});

})(window.angular);