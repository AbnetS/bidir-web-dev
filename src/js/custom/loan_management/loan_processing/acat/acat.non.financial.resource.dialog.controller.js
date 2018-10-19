(function (angular) {
    "use strict";

    angular.module("app.processing")
        .controller("ACATNonFinancialResourceController", ACATNonFinancialResourceController);

    ACATNonFinancialResourceController.$inject = ['$mdDialog','data'];

    function ACATNonFinancialResourceController($mdDialog,data) {
        var vm = this;
        vm.resources = [];
        console.log("data",data);
        vm.non_financial_resources = {
            training: false,
            advisory: false,
            technical_support: false,
            access_to_inputs: false
        };
        data = ["training","advisory","technical support","access to inputs"];

        vm.cancel = _cancel;
        vm.onNonFinancialResourcesChange = _onNonFinancialResourcesChange;
        vm.saveNonFinancialResource = _saveNonFinancialResource;

        //SET SELECTED NON FINANCIAL RESOURCES
        setDefaultNonFinancialResource(data);



        function _cancel() {
            $mdDialog.cancel();
        }

        function _saveNonFinancialResource() {
            _onNonFinancialResourcesChange();
            $mdDialog.hide(vm.resources);
        }
        function _onNonFinancialResourcesChange() {
            console.log(vm.non_financial_resources)
            if (vm.non_financial_resources.advisory)
                vm.resources.push("advisory");
            else if (vm.non_financial_resources.training)
                vm.resources.push("training");
            else if (vm.non_financial_resources.technical_support)
                vm.resources.push("technical support");
            else if (vm.non_financial_resources.access_to_inputs)
                vm.resources.push("access to inputs");
        }



        function setDefaultNonFinancialResource(data) {

            _.each(data,function (resource) {
                if (resource === "training")
                    vm.non_financial_resources.training = true;
                else if (resource === "advisory")
                    vm.non_financial_resources.advisory = true;
                else if (resource === "technical support")
                    vm.non_financial_resources.technical_support = true;
                else if (resource === "access to inputs")
                    vm.non_financial_resources.access_to_inputs = true;
            });

        }
    }
})(window.angular);