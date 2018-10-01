/**
 * Created by Yonas on 4/27/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.processing")
        .controller("ACATProcessorController", ACATProcessorController);

    ACATProcessorController.$inject = ['LoanManagementService','$scope'];

    function ACATProcessorController(LoanManagementService,$scope ) {
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
        vm.onAccordionClick = _onAccordionClick;

        initialize();

        function initialize() {
            vm.isEditAcat = false;
            vm.visibility = {
                showClientACAT:false,
                showCropACAT:false
            };
            vm.options =   MD_TABLE_GLOBAL_SETTINGS.OPTIONS;
            vm.filter = {show : false};
            vm.pageSizes = MD_TABLE_GLOBAL_SETTINGS.PAGE_SIZES;

            vm.query = { search:'',   page:1,  per_page:10 };
            vm.months = MONTHS_CONST;
            fetchCropsList();//Fetch Crops first
            callAPI();

        }

        function callAPI() {
            vm.acatCollectionPromise = LoanManagementService
                .GetACATCollections(vm.query).then(
                function (response) {
                    vm.acatCollection = response.data.docs;
                    vm.query.total_docs_count = response.data.total_docs_count;
                },function (error) {
                        console.log("error",error);
                    });
        }



        function _onSubsectionClick(subsection) {
            vm.toggle[subsection._id] = !vm.toggle[subsection._id];
            if (subsection.sub_sections.length === 0) {
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
            vm.acats.crops = [];
            // set client acat crops for UI purpose
            _.each(acat.ACATs,function (acat) {
                debugger
                _.each(vm.crops,function (crp) {
                    if(acat.crop._id === crp._id){
                        vm.acats.crops.push(crp);
                    }
                })
            })
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
            console.log("Client ACAT Detail Clicked",clientAcat);
            vm.clientAcat = clientAcat;
            // vm.clientAcat.loan_product = vm.acats.loan_product;

            vm.selectedSubsection = vm.clientAcat.sections[0].sub_sections[0].sub_sections[1];

        }


        function fetchCropsList() {
            LoanManagementService.GetCrops().then(
                function (response) {
                    vm.crops = response.data.docs;
                }
            )
        }




    }



})(window.angular);