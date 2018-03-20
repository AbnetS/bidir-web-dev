/**
 * Created by Yoni on 3/5/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.acat").controller("ACATController", ACATController);

    ACATController.$inject = ['ACATService','$stateParams','blockUI'];

    function ACATController(ACATService,$stateParams,blockUI) {
        var vm = this;
        vm.isEdit = $stateParams.id !== "0";
        vm.ACATId = $stateParams.id;


        vm.addToSeedCostList = _addToSeedCostList;
        vm.editSeedCost = _editSeedCost;
        vm.cancelSeedCostList = _cancelSeedCostList;
        vm.addToFertilizerCostList = _addToFertilizerCostList;
        vm.addToChemicalsCostList = _addToChemicalsCostList;


        initialize();

        function initialize() {
            callApiForCrops();

            vm.acat = {
                fertilizer:{
                    list_type :'linear'
                },
                chemicals:{
                    list_type : 'grouped'
                },
                input:{
                    seedCostList:[],
                    fertilizerCostList:[],
                    chemicalsCostList:[]
                }
            };

            vm.isEditSeedCost = false; //edit seed cost list
            if(vm.isEdit){
                callAPI();
            }else{

            }

        }

        function callAPI() {
            var myBlockUIOnStart = blockUI.instances.get('ACATBuilderBlockUI');
            myBlockUIOnStart.start();
            ACATService.GetACATById(vm.ACATId).then(function (response) {
                var subSections = response.data.sections[0].sub_sections;
                vm.acat.input = subSections[0];
                vm.acat.labour_costs = subSections[1];
                vm.acat.other_costs = subSections[2];

                vm.acat.input.seedCostList = vm.acat.input.sub_sections[0].cost_list.linear;
                vm.acat.input.fertilizerCostList = vm.acat.input.sub_sections[1].cost_list.linear;
                vm.acat.input.chemicalsCostList = vm.acat.input.sub_sections[2].cost_list.grouped;
                myBlockUIOnStart.stop();
                console.log("response",subSections);

            },function (error) {
                myBlockUIOnStart.stop();
                console.log("error",error);
            });
        }

        function callApiForCrops(){
        ACATService.GetCrops().then(function (response) {
            vm.crops = response.data.docs;
        });

    }

        function _addToSeedCostList(cost) {
            var items = vm.acat.input.seedCostList;

                if(!_.isUndefined(cost) && !_.isUndefined(cost.item) && !_.isUndefined(cost.unit)){
                    if(vm.isEditSeedCost){
                        updateCostListAPI(cost);
                    }else{
                        var item_exist = _.some(items,function (costItem) {
                            return costItem.item === cost.item && costItem.unit === cost.unit;
                        });

                        if(!item_exist){
                            addCostListAPI(cost);
                        }
                    }
                    vm.acat.input.seed = {};//reset cost item
                }


        }

        function _cancelSeedCostList() {
            vm.isEditSeedCost = false;
            vm.acat.input.seed = {};
        }



        function _editSeedCost(cost) {
            vm.isEditSeedCost =  true;
            vm.acat.input.seed = cost;
        }

        function _addToFertilizerCostList(cost) {
            var items = vm.acat.input.fertilizerCostList;
            if(!_.isUndefined(cost) && !_.isUndefined(cost.item) && !_.isUndefined(cost.unit)){
                var item_exist = _.some(items,function (costItem) {
                    return costItem.item === cost.item && costItem.unit === cost.unit;
                });
                if(!item_exist){
                    var prepareCost =   {
                        type: vm.acat.fertilizer.list_type,
                        parent_cost_list: vm.acat.input.sub_sections[1].cost_list._id,//Fertilizer cost list
                        item:cost.item,
                        unit:cost.unit
                    };
                    addCostListAPI(prepareCost);
                    vm.acat.input.fertilizerCostList.push(cost);
                    vm.acat.input.fertilizer = {};
                }
            }
        }

        function addCostListAPI(cost) {
            ACATService.AddCostList(cost).then(function (response) {
                console.log("response",response);
                var newCost = response.data;
                vm.acat.input.seedCostList.push(newCost);
            },function (error) {
                console.log("error",error);
            });
        }

        function updateCostListAPI(cost) {
            var prepareCost = {
                _id: cost._id,
                item:cost.item,
                unit:cost.unit
            };
            vm.acat.input.seedCostList = _.filter(vm.acat.input.seedCostList,function (seedCost) {
                    return seedCost._id !== cost._id;
            });

            ACATService.UpdateCostList(prepareCost).then(function (response) {
                console.log("response",response);
                var newCost = response.data;
                vm.acat.input.seedCostList.push(newCost);
                vm.isEditSeedCost = false;
            },function (error) {
                console.log("error",error);
            });
        }

        function _addToChemicalsCostList() {

        }

    }



})(window.angular);