/**
 * Created by Yoni on 3/5/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.acat").controller("ACATController", ACATController);

    ACATController.$inject = ['ACATService'];

    function ACATController(ACATService) {
        var vm = this;
        vm.acat = {};
        vm.addToSeedCostList = _addToSeedCostList;
        vm.editSeedCost = _editSeedCost;
        vm.addToFertilizerCostList = _addToFertilizerCostList;
        vm.addToChemicalsCostList = _addToChemicalsCostList;


        initialize();
        function initialize() {
            callApiForCrops();
            vm.acat.fertilizer = {
                list_type :'linear'
            };
            vm.acat.chemicals = {
                list_type : 'grouped'
            };
            vm.acat.input = {
                seedCostList:[],
                fertilizerCostList:[],
                chemicalsCostList:[]
            };

            ACATService.GetACATById("5a9e4940a2e254000137ab14").then(function (response) {
                var subSections = response.data.sections[0].sub_sections;
                vm.acat.input = subSections[0];
                vm.acat.labour_costs = subSections[1];
                vm.acat.other_costs = subSections[2];

                vm.acat.input.seedCostList = vm.acat.input.sub_sections[0].cost_list.linear;
                vm.acat.input.fertilizerCostList = vm.acat.input.sub_sections[1].cost_list.linear;
                vm.acat.input.chemicalsCostList = vm.acat.input.sub_sections[2].cost_list.grouped;

                console.log("response",subSections);

            },function (error) {
                console.log("error",error);
            });
        }



        function callApiForCrops(){
        ACATService.GetCrops().then(function (response) {
            vm.crops = response.data.docs;
        });

    }

        function _addToSeedCostList(cost) {
            console.log(cost);
            var items = vm.acat.input.seedCostList;
            if(!_.isUndefined(cost) && !_.isUndefined(cost.item) && !_.isUndefined(cost.unit)){
                var item_exist = _.some(items,function (costItem) {
                   return costItem.item === cost.item && costItem.unit === cost.unit;
                });
                if(!item_exist){
                    //TODO: CALL API AND ADD COST LIST
                    vm.acat.input.seedCostList.push(cost);
                    vm.acat.input.seed = {};
                }
            }

        }
        function _editSeedCost(cost) {
            vm.acat.input.seed = cost;
        }

        function _addToFertilizerCostList(cost) {
            console.log(cost);
            var items = vm.acat.input.fertilizerCostList;
            if(!_.isUndefined(cost) && !_.isUndefined(cost.item) && !_.isUndefined(cost.unit)){
                var item_exist = _.some(items,function (costItem) {
                    return costItem.item === cost.item && costItem.unit === cost.unit;
                });
                if(!item_exist){
                    //TODO: CALL API AND ADD COST LIST
                    vm.acat.input.fertilizerCostList.push(cost);
                    vm.acat.input.fertilizer = {};
                }
            }
        }
        function _addToChemicalsCostList() {

        }

    }



})(window.angular);