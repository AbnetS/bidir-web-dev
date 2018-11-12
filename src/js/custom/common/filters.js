/**
 * Created by Yoni on 12/14/2017.
 */
(function (angular) {
    'use strict';
    angular.module('app.common')
        .filter('ReplaceUnderscore', function () {
            return function (input) {
                return typeof input === "string" ? input.replace(/_/g, ' ') : input;
            };
        })
        .filter('trusted', ['$sce', function ($sce) {
            return function(url) {
                return $sce.trustAsResourceUrl(url);
            };
        }])
        .filter('titleCase', function () {
        return function (input) {
            input = input || '';
            return input.replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        };
    });

})(window.angular);