/**
 * Created by Yoni on 3/5/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.acat").controller("ACATController", ACATController);

    ACATController.$inject = ['ACATService','$stateParams','blockUI','$state','AlertService'];

    function ACATController(ACATService,$stateParams,blockUI,$state,AlertService) {
        var vm = this;
        vm.isEdit = $stateParams.id !== "0";
        vm.ACATId = $stateParams.id;


        vm.addToCostList = _addToCostList;
        vm.addGroupedCostList = _addGroupedCostList;
        vm.editCostItem = _editCostItem;
        vm.removeCostItem = _removeCostItem;
        vm.cancelCostItem = _cancelCostItem;
        vm.cropSelectChanged = _cropSelectChanged;
        vm.onCostListTypeChange = _onCostListTypeChange;



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
                },
                labour_cost:{
                    list_type : 'linear'
                },
                other_cost:{
                    list_type : 'linear'
                }
            };

            vm.isEditSeedCost = false; //edit seed cost list
            if(vm.isEdit){
                callAPI();
            }else{

            }

        }
        function SetListType(type) {
            switch (type){
                case ACAT_GROUP_CONSTANT.FERTILIZER:
                    vm.acat.fertilizer.list_type = vm.acat.fertilizer_costs.linear.length>0?
                        ACAT_COST_LIST_TYPE.LINEAR : ACAT_COST_LIST_TYPE.GROUPED;
                    break;
                case ACAT_GROUP_CONSTANT.CHEMICALS:
                    vm.acat.chemicals.list_type = vm.acat.chemicals_costs.linear.length>0?
                        ACAT_COST_LIST_TYPE.LINEAR : ACAT_COST_LIST_TYPE.GROUPED;
                    break;
                case ACAT_GROUP_CONSTANT.LABOUR_COST:
                    vm.acat.labour_cost.list_type = vm.acat.labour_costs.linear.length>0?
                        ACAT_COST_LIST_TYPE.LINEAR : ACAT_COST_LIST_TYPE.GROUPED;
                    break;
                case ACAT_GROUP_CONSTANT.OTHER_COST:
                    vm.acat.other_cost.list_type = vm.acat.seed_costs.linear.length>0?
                        ACAT_COST_LIST_TYPE.LINEAR : ACAT_COST_LIST_TYPE.GROUPED;
                    break;
                default:
                    break;
            }
        }

        function setSubSectionCostFromResponse(subSections) {
            vm.acat.input = subSections[0];
            vm.acat.labour_costs = subSections[1].cost_list;
            vm.acat.other_costs =  subSections[2].cost_list;

            vm.acat.input.seedCostList = vm.acat.input.sub_sections[0].cost_list.linear;
            vm.acat.input.seed_costs = vm.acat.input.sub_sections[0].cost_list;
            vm.acat.input.fertilizerCostList = vm.acat.input.sub_sections[1].cost_list.linear;
            vm.acat.input.fertilizer_costs = vm.acat.input.sub_sections[1].cost_list;
            vm.acat.input.chemicalsCostList = vm.acat.input.sub_sections[2].cost_list.grouped;
            vm.acat.input.chemicals_costs = vm.acat.input.sub_sections[2].cost_list;
            SetListType();
        }
        function callAPI() {
            var myBlockUIOnStart = blockUI.instances.get('ACATBuilderBlockUI');
            myBlockUIOnStart.start();
            ACATService.GetACATById(vm.ACATId).then(function (response) {
                console.log("GetACATById",response.data);
                vm.acat.selected_crop = response.data.crop;
                var subSections = response.data.sections[0].sub_sections;
                setSubSectionCostFromResponse(subSections);

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
                        case ACAT_GROUP_CONSTANT.SEED:
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
                                    AddCostListAPI(costItem,type);
                                }
                            }
                            vm.acat.input.seed = {};//reset cost item
                            break;
                        case ACAT_GROUP_CONSTANT.FERTILIZER:
                            items = vm.acat.input.fertilizerCostList;
                            if(vm.isEditSeedCost){
                                updateCostListAPI(cost,type);
                            }else{
                                var item_unit_exist = DoesItemExistInCostList(cost,items);
                                if(!item_unit_exist){
                                    AddCostListAPI({
                                        type: vm.acat.fertilizer.list_type,
                                        parent_cost_list: vm.acat.input.sub_sections[1].cost_list._id,//Fertilizer cost list
                                        item:cost.item,
                                        unit:cost.unit
                                    },type);
                                }
                            }
                            vm.acat.fertilizer = {};//reset cost item
                            break;
                        case ACAT_GROUP_CONSTANT.CHEMICALS:
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
                                    AddCostListAPI(prepareCost,type);
                                }
                            }
                            vm.acat.chemicals = {};
                            break;
                        case ACAT_GROUP_CONSTANT.LABOUR_COST:
                            items = vm.acat.labour_costs;
                            if(vm.isEditLabourCost){
                                // updateCostListAPI(cost,type);
                            }else{

                                if(!DoesItemExistInCostList(cost,items)){
                                    AddCostListAPI({
                                        type: vm.acat.labour_cost.list_type,
                                        parent_cost_list: vm.acat.labour_costs._id,//Fertilizer cost list
                                        item:cost.item,
                                        unit:cost.unit
                                    },type);
                                }
                            }
                            vm.acat.labour_cost = {};
                            break;
                        case ACAT_GROUP_CONSTANT.OTHER_COST:
                            items = vm.acat.other_costs;
                            if(vm.isEditOtherCost){
                                // updateCostListAPI(cost,type);
                            }else{

                                if(!DoesItemExistInCostList(cost,items)){
                                    AddCostListAPI({
                                        type: vm.acat.other_cost.list_type,
                                        parent_cost_list: vm.acat.other_costs._id,//Fertilizer cost list
                                        item:cost.item,
                                        unit:cost.unit
                                    },type);
                                }
                            }
                            vm.acat.other_cost = {};
                            break;
                        default:
                            items = [];
                            break;
                    }

                }

        }

        function _addGroupedCostList(groupInfo, type) {

            if(!_.isUndefined(groupInfo)){
                    if(groupInfo.existing_group){
                        var costItem = {
                            parent_grouped_list:groupInfo.selected_group._id, //"5ab12ecea682310001a24401"
                            item: groupInfo.item,
                            unit: groupInfo.unit
                        };
                        AddCostItemToGroup(costItem,type);
                    }else{
                        var groupCost = {
                            type: 'grouped',
                            parent_cost_list:vm.acat.input.sub_sections[2].cost_list._id,
                            title:groupInfo.title
                        };

                        //ADD THE NEW GROUP TO COST LIST PARENT
                        ACATService.AddCostList(groupCost).then(function (response) {
                            console.log("group created",response.data);
                            var groupItem = response.data; //Group Information captured
                            //    TODO:create item unit here
                            var costItem = {
                                parent_grouped_list:groupItem._id,
                                item: groupInfo.item,
                                unit: groupInfo.unit
                            };
                            AddCostItemToGroup(costItem,type);

                        },function (error) {
                            console.log("error on group creation",error);
                        });
                    }

            }
        }
        function resetCostItem(type) {
            switch (type){
                case ACAT_GROUP_CONSTANT.SEED:
                    vm.isEditSeedCost =  true;
                    vm.acat.input.seed = undefined;
                    break;
                case ACAT_GROUP_CONSTANT.FERTILIZER:
                    vm.acat.fertilizer.item = undefined;
                    vm.acat.fertilizer.unit = undefined;
                    break;
                case ACAT_GROUP_CONSTANT.CHEMICALS:
                    vm.acat.chemicals.item = undefined;
                    vm.acat.chemicals.unit = undefined;
                    vm.acat.chemicals.title = undefined;
                    break;
                default:
                    break;
            }
        }
        function AddCostItemToGroup(costItem,type) {
            ACATService.AddCostList(costItem).then(function (response) {
                console.log("adding cost item on group",response);
                resetCostItem(type);
                callAPI();
            },function (error) {
                console.log("error while adding cost item on group",error);
            });
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

        function _editCostItem(cost,type,group) {
            console.log("CHEMICALS cost",group);
            switch (type){
                case ACAT_GROUP_CONSTANT.SEED:
                    vm.isEditSeedCost =  true;
                    vm.acat.input.seed = cost;
                    break;
                case ACAT_GROUP_CONSTANT.FERTILIZER:
                    vm.isEditFertilizerCost =  true;
                    vm.acat.fertilizer = cost;
                    break;
                case ACAT_GROUP_CONSTANT.CHEMICALS:
                    vm.isEditChemicalsCost = true;
                    vm.acat.chemicals = cost;
                    break;
                case ACAT_GROUP_CONSTANT.LABOUR_COST:
                    vm.isEditLabourCost = true;
                    vm.acat.labour_cost = cost;
                    break;
                default:
                    break;
            }

        }
        function _removeCostItem(cost,type) {
            console.log("Remove Cost Item",cost);
        }

        function AddCostListAPI(cost,type) {

            ACATService.AddCostList(cost).then(function (response) {
                console.log("COST LIST ADDED FOR " + type,response);
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

        //UPDATE CROP FOR CROP OR CREATE NEW ACAT FOR A CROP
        function _cropSelectChanged() {
            if(vm.isEdit){
                //    UPDATE ACAT CROP
            }else {
                // Initialize ACAT with this crop
                // vm.acat.selected_crop
                var acatCrop =   {
                    title: vm.acat.selected_crop.name +  '-CAT',
                    description: vm.acat.selected_crop.name +  '-CAT desc',
                    crop: vm.acat.selected_crop._id
                };
                ACATService.CreateACAT(acatCrop).then(function (response) {
                    console.log("ACAT ",response);
                    var acatData = response.data;
                    $state.go('app.acatbuilder',{id:acatData._id},{inherit:true});
                },function (error) {
                    console.log("error on initializeing acat",error);
                })
            }
        }

        function _onCostListTypeChange(type) {

            AlertService.showConfirm("You are about to change Cost List type, " +
                "Which will clear the previous type data",
                "Are you sure?", "Yes, Change It!", "warning", true,function (isConfirm) {
                    if(isConfirm){

                    }
                });
        }

    }



})(window.angular);