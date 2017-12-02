/**
 * Created by Yoni on 11/30/2017.
 */

(function(angular) {
    "use strict";

    angular
        .module('app.manage_roles')
        .controller('ManageRolesController', ManageRolesController);

    ManageRolesController.$inject = ['AuthService',
        '$scope',
        '$state',
        '$rootScope',
        'APP_CONSTANTS'
    ];

    function ManageRolesController(
        AuthService,
        $scope,
        $state,
        $rootScope,
        APP_CONSTANTS
    ) {
        var vm = this;
    console.log("manage role controller");
    }
})(window.angular);

