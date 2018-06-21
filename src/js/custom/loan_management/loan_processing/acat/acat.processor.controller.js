/**
 * Created by Yonas on 4/27/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.processing")
        .controller("ACATProcessorController", ACATProcessorController);

    ACATProcessorController.$inject = ['LoanManagementService','AlertService','$scope','$mdDialog','RouteHelpers'];

    function ACATProcessorController(LoanManagementService,AlertService,$scope,$mdDialog,RouteHelpers ) {
        var vm = this;
        vm.selectedSubsection = {};
        vm.toggle = {};
        vm.accordionToggle = {};

        vm.paginate = _paginate;
        vm.clearSearchText = _clearSearchText;

        vm.addEditClientACAT = _addEditClientACAT;
        //CLIENT ACAT
        vm.onClientACATClick = _onClientACATClick;
        vm.onSubsectionClick = _onSubsectionClick;
        initialize();

        function initialize() {
            vm.visibility = {
                showClientACAT:false,
                showCropACAT:false
            };
            vm.options =   MD_TABLE_GLOBAL_SETTINGS.OPTIONS;
            vm.filter = {show : false};
            vm.pageSizes = MD_TABLE_GLOBAL_SETTINGS.PAGE_SIZES;

            vm.query = { search:'',   page:1,  per_page:10 };
            vm.months = MONTHS_CONST;
            callAPI();
            fetchCropsList();
        }

        function callAPI() {
            vm.acatCollectionPromise = LoanManagementService.GetACATCollections(vm.query).then(
                function (response) {
                    vm.acatCollection = response.data.docs;
                    vm.query.total_docs_count = response.data.total_docs_count;
                }
            )
        }

        vm.onSubsectionClick = _onSubsectionClick;
        vm.onAccordionClick = _onAccordionClick;

            function _onSubsectionClick(subsection) {
            vm.toggle[subsection._id] = !vm.toggle[subsection._id];
            if (subsection.sub_sections.length == 0) {
                vm.selectedSubsection = subsection;
            }
        }


            function _onAccordionClick(acc) {
            vm.toggle[acc._id] = !vm.toggle[acc._id];
        }


        function _onClientACATClick(acat, ev) {
            vm.visibility.showClientACAT = true;//show client acat
            vm.visibility.showCropACAT = false;
            vm.acats = acat;
        }


        function _paginate(page, pageSize) {
            vm.query.page = page;
            vm.query.per_page = pageSize;
            callAPI();
        }
        function _clearSearchText() {
            vm.query.search = '';
            vm.filter.show = false;
        }

        $scope.$watch(angular.bind(vm, function () {
            return vm.query.search;
        }), function (newValue, oldValue) {
            if (newValue !== oldValue) {
                console.log("search for ",newValue);
            }
        });

        function _addEditClientACAT(clientAcat) {
            vm.visibility.showCropACAT = true;//show client acat
            console.log("Client ACAT Detail",clientAcat);
            vm.clientAcat = clientAcat;
            vm.clientAcat.loan_product = vm.acats.loan_product;
            // console.log("vm.clientAcat",vm.clientAcat);
            // vm.acat = clientAcat.sections[0];
            vm.selectedSubsection = vm.clientAcat.sections[0].sub_sections[0].sub_sections[1];

        }


        function fetchCropsList() {
            LoanManagementService.GetCrops().then(
                function (response) {
                    console.log("response.data",response);
                    vm.crops = response.data.docs;
                }
            )
        }




    }



})(window.angular);