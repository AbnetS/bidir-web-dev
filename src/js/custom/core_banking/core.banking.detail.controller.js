(function(angular) {
    "use strict";


    angular
        .module('app.banking')
        .controller('CoreBankingDetailController', CoreBankingDetailController);

    CoreBankingDetailController.$inject = ['CoreBankingService','$scope','$rootScope','AlertService','$stateParams'];

    function CoreBankingDetailController(CoreBankingService,$scope,$rootScope,AlertService,$stateParams) {
        var vm = this;
        vm.visibility = {
            showCropPanel:false,
            showSummaryPanel:false
        };

        $rootScope.app.layout.isCollapsed = true;

        vm.client = CoreBankingService.getClientInfo();

    }

})(window.angular);