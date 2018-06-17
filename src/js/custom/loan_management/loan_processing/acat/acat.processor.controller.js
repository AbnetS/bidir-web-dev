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
        vm.cropOptions = [ "Tomato","Onion","Cabbage",'Bean','Crop 1'];
        vm.paginate = _paginate;
        vm.clearSearchText = _clearSearchText;
        //CLIENT ACAT
        vm.onClientACATClick = _onClientACATClick;

        initialize();

        function initialize() {
            vm.visibility = { showClientACAT:false };
            vm.options =   MD_TABLE_GLOBAL_SETTINGS.OPTIONS;
            vm.filter = {show : false};
            vm.pageSizes = MD_TABLE_GLOBAL_SETTINGS.PAGE_SIZES;

            vm.query = { search:'',   page:1,  per_page:10 };
            fetchCropsList();
            callAPI();
        }

        function fetchCropsList() {
            LoanManagementService.GetCrops().then(
                function (response) {
                    console.log("response.data",response);
                    vm.crops = response.data.docs;
                }
            )
        }

        function callAPI() {
            vm.acatCollectionPromise = LoanManagementService.GetACATCollections(vm.query).then(
                function (response) {
                    vm.acatCollection = response.data.docs;
                    vm.query.total_docs_count = response.data.total_docs_count;
                }
            )
        }



        function _onClientACATClick(acat, ev) {
            vm.visibility.showClientACAT = true;//show client acat
            vm.acats = acat;
            console.log("loan product",acat);
            vm.acat = vm.acats.ACATs[0].sections[0];
            vm.selectedSubsection = vm.acat.sub_sections[0].sub_sections[1];
            vm.acats.crops = [];
            _.each(vm.acats.ACATs,function (acat_crop) {
                vm.acats.crops.push(acat_crop.crop);
            });
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




        vm.onSubsectionClick = function(subsection) {
            vm.toggle[subsection._id] = !vm.toggle[subsection._id];
            if (subsection.sub_sections.length == 0) {
                vm.selectedSubsection = subsection;
            }
        };

        vm.onAccordionClick = function(acc) {
            vm.toggle[acc._id] = !vm.toggle[acc._id];
        };




    }



})(window.angular);