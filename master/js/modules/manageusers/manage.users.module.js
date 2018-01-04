/**
 * Created by Yoni on 11/30/2017.
 */
(function() {
    'use strict';

    angular
        .module('app.manage_users', []).config(configUM).run(runUM);

    function runUM() {
        console.log("UM run");
    }
    function configUM() {
        console.log("UM config");
    }



})();