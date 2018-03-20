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


        vm.addToCostList = _addToCostList;
        vm.editCostItem = _editCostItem;
        vm.cancelCostItem = _cancelCostItem;


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


        function _addToCostList(cost,type) {

                if(!_.isUndefined(cost) && !_.isUndefined(cost.item) && !_.isUndefined(cost.unit)){
                    var items = [];
                    switch (type){
                        case 'SEED':
                            items = vm.acat.input.seedCostList;
                            var costItem = {
                                type: 'linear',
                                parent_cost_list: vm.acat.input.sub_sections[0].cost_list._id,//Fertilizer cost list
                                item:cost.item,
                                unit:cost.unit
                            };
                            if(vm.isEditSeedCost){
                                costItem._id = cost._id;
                                updateCostListAPI(costItem,type);
                            }else{
                                if(!DoesItemExistInCostList(cost,items)){
                                    addCostListAPI(costItem,type);
                                }
                            }
                            vm.acat.input.seed = {};//reset cost item
                            break;
                        case 'FERTILIZER':
                            items = vm.acat.input.fertilizerCostList;
                            if(vm.isEditSeedCost){
                                updateCostListAPI(cost,type);
                            }else{
                                var item_unit_exist = DoesItemExistInCostList(cost,items);
                                if(!item_unit_exist){
                                    addCostListAPI({
                                        type: vm.acat.fertilizer.list_type,
                                        parent_cost_list: vm.acat.input.sub_sections[1].cost_list._id,//Fertilizer cost list
                                        item:cost.item,
                                        unit:cost.unit
                                    },type);
                                }
                            }
                            vm.acat.fertilizer = {};//reset cost item
                            break;
                        case 'CHEMICALS':
                            items = vm.acat.input.chemicalsCostList;
                            if(vm.isEditSeedCost){
                                updateCostListAPI(cost,type);
                            }else{
                                var item_exist = DoesItemExistInCostList(cost,items);
                                if(!item_exist){
                                    var prepareCost =   {
                                        type: vm.acat.chemicals.list_type,
                                        parent_cost_list: vm.acat.input.sub_sections[2].cost_list._id,//Fertilizer cost list
                                        item:cost.item,
                                        unit:cost.unit
                                    };
                                    addCostListAPI(prepareCost,type);
                                }
                            }
                            vm.acat.chemicals = {};
                            break;
                        default:
                            items = [];
                            break;
                    }

                }

        }

        function DoesItemExistInCostList(item, items) {
            return _.some(items,function (costItem) {
                return costItem.item === item.item && costItem.unit === item.unit;
            });
        }


        function _cancelCostItem(type) {
            switch (type){
                case 'SEED':
                    vm.isEditSeedCost = false;
                    vm.acat.input.seed = {};
                    break;
                case 'FERTILIZER':
                    vm.isEditFertilizerCost =  false;
                    vm.acat.fertilizer = {};
                    break;
                case 'CHEMICALS':
                    vm.isEditChemicalsCost = false;
                    vm.acat.chemicals = {};
                    break;
                default:
                    break;
            }

        }

        function _editCostItem(cost,type) {
            switch (type){
                case 'SEED':
                    vm.isEditSeedCost =  true;
                    vm.acat.input.seed = cost;
                    break;
                case 'FERTILIZER':
                    vm.isEditFertilizerCost =  true;
                    vm.acat.fertilizer = cost;
                    break;
                case 'CHEMICALS':
                    vm.isEditChemicalsCost = true;
                    vm.acat.chemicals = cost;
                    break;
                default:
                    break;
            }

        }

        function addCostListAPI(cost,type) {

            ACATService.AddCostList(cost).then(function (response) {
                console.log("COST LIST ADDED",response);
                var newCost = response.data;
                switch (type){
                    case 'SEED':
                        vm.acat.input.seedCostList.push(newCost);
                        break;
                    case 'FERTILIZER':
                        vm.acat.input.fertilizerCostList.push(newCost);
                        break;
                    case 'CHEMICALS':
                        vm.acat.input.chemicalsCostList.push(newCost);
                        break;
                    default:
                            break;
                }

            },function (error) {
                console.log("error while adding cost item for " + type,error);
            });
        }

        function updateCostListAPI(cost,type) {

            var prepareCost = {
                _id: cost._id,
                item:cost.item,
                unit:cost.unit
            };

            ACATService.UpdateCostList(prepareCost).then(function (response) {
                var newCost = response.data;
                switch (type){
                    case 'SEED':
                        vm.acat.input.seedCostList = _.filter(vm.acat.input.seedCostList,
                            function (itemCost) {
                                return itemCost._id !== cost._id;
                            });
                        vm.acat.input.seedCostList.push(newCost);
                        vm.isEditSeedCost = false;
                        break;
                    case 'FERTILIZER':
                        vm.acat.input.fertilizerCostList = _.filter(vm.acat.input.fertilizerCostList,
                            function (itemCost) {
                                return itemCost._id !== cost._id;
                            });
                        vm.acat.input.fertilizerCostList.push(newCost);
                        vm.isEditFertilizerCost = false;
                        break;
                    case 'CHEMICALS':
                        vm.acat.input.chemicalsCostList = _.filter(vm.acat.input.chemicalsCostList,
                            function (itemCost) {
                                return itemCost._id !== cost._id;
                            });
                        vm.acat.input.chemicalsCostList.push(newCost);
                        vm.isEditChemicalsCost = false;
                        break;
                    default:
                        break;
                }

            },function (error) {
                console.log("error updating cost list",error);
            });
        }

    }



})(window.angular);