/**
 * Created by Yoni on 11/30/2017.
 */

(function(angular) {
    "use strict";

    angular
        .module('app.manage_roles')
        .controller('ManageRolesController', ManageRolesController);

    ManageRolesController.$inject = ['ManageUserService',
        '$scope',
        '$state',
        '$rootScope',
        'APP_CONSTANTS'
    ];

    function ManageRolesController(
        ManageUserService,
        $scope,
        $state,
        $rootScope,
        APP_CONSTANTS
    ) {
        var vm = this;

        ManageUserService.GetRoles().then(function(response){
            vm.roles = response.data.docs;
            console.log("vm.roles",vm.roles);
        },function(error){
            console.log("error",error);
        });
    }
})(window.angular);

