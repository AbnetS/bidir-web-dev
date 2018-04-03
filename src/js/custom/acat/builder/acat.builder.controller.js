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
        vm.editGroupCostItem = _editGroupCostItem;
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
                    list_type : 'linear'
                },
                input:{
                    seedCostList:[]
                },
                labour_cost:{
                    list_type : 'linear'
                },
                other_cost:{
                    list_type : 'linear'
                },
                // fertilizer_costs:[],
                // chemicals_costs:[],
                // labour_costs:[],
                // other_costs:[]
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
                console.log("response",response);
                vm.acat.selected_crop = response.data.crop;
                var subSections = response.data.sections[0].sub_sections;
                setSubSectionCostFromResponse(subSections);

                myBlockUIOnStart.stop();

            },function (error) {
                myBlockUIOnStart.stop();
                console.log("error",error);
            });
        }
        function setSubSectionCostFromResponse(subSections) {
            vm.acat.input = subSections[0];
            vm.acat.labour_costs = subSections[1].cost_list;
            vm.acat.other_costs =  subSections[2].cost_list;

            vm.acat.input.seedCostList = vm.acat.input.sub_sections[0].cost_list.linear;
            vm.acat.input.seed_costs = vm.acat.input.sub_sections[0].cost_list;

            vm.acat.fertilizer_costs = vm.acat.input.sub_sections[1].cost_list;

            // // vm.acat.input.chemicalsCostList = vm.acat.input.sub_sections[2].cost_list.grouped;
            // vm.acat.chemicals_costs = vm.acat.input.sub_sections[2].cost_list;
            SetListType();

            console.log("vm.acat", vm.acat);
        }
        function SetListType() {

            vm.acat.fertilizer.list_type = vm.acat.fertilizer_costs.grouped.length > 0 ?
                ACAT_COST_LIST_TYPE.GROUPED :vm.acat.fertilizer_costs.linear.length >= 0 ? ACAT_COST_LIST_TYPE.LINEAR:'NA';

            // vm.acat.chemicals.list_type = vm.acat.chemicals_costs.grouped.length > 0 ?
            //     ACAT_COST_LIST_TYPE.GROUPED :  vm.acat.chemicals_costs.linear.length >= 0 ? ACAT_COST_LIST_TYPE.LINEAR:'NA';
            //
            // vm.acat.labour_cost.list_type = vm.acat.labour_costs.grouped.length > 0 ?
            //     ACAT_COST_LIST_TYPE.GROUPED : vm.acat.labour_costs.grouped.length >= 0 ? ACAT_COST_LIST_TYPE.LINEAR:'NA';
            //
            // vm.acat.other_cost.list_type = vm.acat.other_costs.grouped.length > 0 ?
            //     ACAT_COST_LIST_TYPE.GROUPED :vm.acat.other_costs.grouped.length >= 0 ? ACAT_COST_LIST_TYPE.LINEAR:'NA';

        }

        function callApiForCrops(){
            ACATService.GetCrops().then(function (response) {
                vm.crops = response.data.docs;
                // console.log("crop list",vm.crops);
            });
        }

        function _addToCostList(cost,type) {

                if(!_.isUndefined(cost) && !_.isUndefined(cost.item) && !_.isUndefined(cost.unit)){
                    var items = [];
                    switch (type){
                        case ACAT_GROUP_CONSTANT.SEED:
                            items = vm.acat.input.seedCostList;
                            var costItem = {
                                type: ACAT_COST_LIST_TYPE.LINEAR,
                                parent_cost_list: vm.acat.input.sub_sections[0].cost_list._id,
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
                            items = vm.acat.fertilizer.list_type === ACAT_COST_LIST_TYPE.GROUPED ?
                                vm.acat.fertilizer_costs.grouped : vm.acat.fertilizer_costs.linear;

                            if(vm.isEditFertilizerCost){
                                updateCostListAPI(cost,type);
                            }else{
                                if(!DoesItemExistInCostList(cost,items)){
                                   var itemUnit = {
                                        parent_cost_list: vm.acat.fertilizer_costs._id,//Fertilizer cost list
                                        item:cost.item,
                                        unit:cost.unit
                                    };
                                    AddCostListAPI(itemUnit,type);
                                }
                            }
                            var resetFertilizerObj = _.pick(vm.acat.fertilizer, 'list_type');
                            vm.acat.fertilizer = resetFertilizerObj;//reset cost item
                            break;
                        case ACAT_GROUP_CONSTANT.CHEMICALS:
                            items = vm.acat.chemicals.list_type === ACAT_COST_LIST_TYPE.GROUPED ?
                                vm.acat.chemicals_costs.grouped : vm.acat.chemicals_costs.linear;
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


                        if(!_.isUndefined(groupInfo._id)){
                            var costItem = {
                                parent_grouped_list:groupInfo.selected_group._id,
                                item: groupInfo.item,
                                unit: groupInfo.unit,
                                _id:groupInfo._id
                            };

                            updateCostListAPI(costItem,type);
                        }else{

                            AddCostItemToGroup({
                                parent_grouped_list:groupInfo.selected_group._id,
                                item: groupInfo.item,
                                unit: groupInfo.unit
                            },type);
                        }


                    }else{
                        var groupCost = PrepareGroupCostListForAdd(groupInfo, type);

                        //ADD THE NEW GROUP TO COST LIST PARENT
                        ACATService.AddCostList(groupCost).then(function (response) {
                            console.log("group created",response.data);
                            var groupItem = response.data; //Group Information captured

                            AddCostItemToGroup({
                                parent_grouped_list:groupItem._id,
                                item: groupInfo.item,
                                unit: groupInfo.unit
                            },type);

                        },function (error) {
                            console.log("error on group creation",error);
                        });
                    }

            }
        }
        function PrepareGroupCostListForAdd(groupInfo,type) {
            switch (type){
                case ACAT_GROUP_CONSTANT.FERTILIZER:
                    return  {
                        type: 'grouped',
                        parent_cost_list: vm.acat.fertilizer_costs._id,
                        title:groupInfo.title
                    };
                    break;
                case ACAT_GROUP_CONSTANT.CHEMICALS:
                    return  {
                        type: 'grouped',
                        parent_cost_list: vm.acat.chemicals_costs._id,
                        title:groupInfo.title
                    };
                    break;
                case ACAT_GROUP_CONSTANT.LABOUR_COST:
                    return  {
                        type: 'grouped',
                        parent_cost_list: vm.acat.labour_costs._id,
                        title:groupInfo.title
                    };
                    break;
                case ACAT_GROUP_CONSTANT.OTHER_COST:
                    return  {
                        type: 'grouped',
                        parent_cost_list: vm.acat.other_costs._id,
                        title:groupInfo.title
                    };
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

        function AddCostListAPI(cost,type) {

            ACATService.AddCostList(cost).then(function (response) {
                console.log("COST LIST ADDED FOR " + type,response);
                var newCost = response.data;
                switch (type){
                    case ACAT_GROUP_CONSTANT.SEED:
                        vm.acat.input.seedCostList.push(newCost);
                        break;
                    case ACAT_GROUP_CONSTANT.FERTILIZER:
                        if(vm.acat.fertilizer.list_type === ACAT_COST_LIST_TYPE.GROUPED){
                            vm.acat.fertilizer_costs.grouped.push(newCost);
                        }else
                            {
                            vm.acat.fertilizer_costs.linear.push(newCost);
                        }
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
                    case ACAT_GROUP_CONSTANT.SEED:
                        vm.acat.input.seedCostList = _.filter(vm.acat.input.seedCostList,
                            function (itemCost) {
                                return itemCost._id !== cost._id;
                            });
                        vm.acat.input.seedCostList.push(newCost);
                        vm.isEditSeedCost = false;
                        break;
                    case ACAT_GROUP_CONSTANT.FERTILIZER:
                        if(vm.acat.fertilizer.list_type === ACAT_COST_LIST_TYPE.GROUPED){
                            _.filter(vm.acat.fertilizer_costs.grouped,
                                function (group) {
                                    if(group._id === cost.parent_grouped_list){
                                        group.items = _.filter(group.items, function (itemCost) {
                                                return itemCost._id !== newCost._id;
                                            });
                                        group.items.push(newCost);
                                    }
                                });
                            resetCostItem(type);
                        }else{
                            vm.acat.fertilizer_costs.linear = _.filter(vm.acat.fertilizer_costs.linear,
                                function (itemCost) {
                                    return itemCost._id !== cost._id;
                                });
                            vm.acat.fertilizer_costs.linear.push(newCost);
                        }

                        vm.isEditFertilizerCost = false;
                        break;
                    case ACAT_GROUP_CONSTANT.CHEMICALS:
                        if(vm.acat.chemicals.list_type === ACAT_COST_LIST_TYPE.GROUPED){
                            vm.acat.chemicals_costs.grouped = _.filter(vm.acat.chemicals_costs.grouped,
                                function (itemCost) {
                                    return itemCost._id !== cost._id;
                                });
                            vm.acat.chemicals_costs.grouped.push(newCost);
                        }else{
                            vm.acat.chemicals_costs.linear = _.filter(vm.acat.chemicals_costs.linear,
                                function (itemCost) {
                                    return itemCost._id !== cost._id;
                                });
                            vm.acat.chemicals_costs.linear.push(newCost);
                        }
                        vm.isEditChemicalsCost = false;
                        break;
                    case ACAT_GROUP_CONSTANT.LABOUR_COST:
                        if(vm.acat.labour_cost.list_type === ACAT_COST_LIST_TYPE.GROUPED){
                            vm.acat.labour_costs.grouped = _.filter(vm.acat.labour_costs.grouped,
                                function (itemCost) {
                                    return itemCost._id !== cost._id;
                                });
                            vm.acat.labour_costs.grouped.push(newCost);
                        }else{
                            vm.acat.labour_costs.linear = _.filter(vm.acat.labour_costs.linear,
                                function (itemCost) {
                                    return itemCost._id !== cost._id;
                                });
                            vm.acat.labour_costs.linear.push(newCost);
                        }
                        vm.isEditLabourCost = false;
                        break;
                    case ACAT_GROUP_CONSTANT.OTHER_COST:
                        if(vm.acat.other_cost.list_type === ACAT_COST_LIST_TYPE.GROUPED){
                            vm.acat.other_cost.grouped = _.filter(vm.acat.other_cost.grouped,
                                function (itemCost) {
                                    return itemCost._id !== cost._id;
                                });
                            vm.acat.other_cost.grouped.push(newCost);
                        }else{
                            vm.acat.other_cost.linear = _.filter(vm.acat.other_cost.linear,
                                function (itemCost) {
                                    return itemCost._id !== cost._id;
                                });
                            vm.acat.other_cost.linear.push(newCost);
                        }
                        vm.isEditOtherCost = false;
                        break;
                    default:
                        break;
                }

            },function (error) {
                console.log("error updating cost list",error);
            });
        }
        function _editCostItem(cost,type) {
            switch (type){
                case ACAT_GROUP_CONSTANT.SEED:
                    vm.isEditSeedCost =  true;
                    vm.acat.input.seed = cost;
                    break;
                case ACAT_GROUP_CONSTANT.FERTILIZER:
                    vm.isEditFertilizerCost =  true;
                    angular.extend(vm.acat.fertilizer,cost);
                    break;
                case ACAT_GROUP_CONSTANT.CHEMICALS:
                    vm.isEditChemicalsCost = true;
                    angular.extend(vm.acat.chemicals,cost);
                    break;
                case ACAT_GROUP_CONSTANT.LABOUR_COST:
                    vm.isEditLabourCost = true;
                    angular.extend(vm.acat.labour_cost,cost);
                    break;
                case ACAT_GROUP_CONSTANT.OTHER_COST:
                    vm.isEditOtherCost = true;
                    angular.extend(vm.acat.other_cost,cost);
                    break;
                default:
                    break;
            }

        }

        function _editGroupCostItem(cost,type,group) {
            switch (type){
                case ACAT_GROUP_CONSTANT.FERTILIZER:
                    vm.isEditFertilizerCost =  true;
                    vm.acat.fertilizer.selected_group = group;
                    vm.acat.fertilizer.existing_group = true;
                    angular.extend(vm.acat.fertilizer,cost);
                    break;
                case ACAT_GROUP_CONSTANT.CHEMICALS:
                    vm.isEditChemicalsCost = true;
                    vm.acat.chemicals = cost;
                    break;
                case ACAT_GROUP_CONSTANT.LABOUR_COST:
                    vm.isEditLabourCost = true;
                    vm.acat.labour_cost = cost;
                    break;
                case ACAT_GROUP_CONSTANT.OTHER_COST:
                    vm.isEditOtherCost = true;
                    vm.acat.other_cost = cost;
                    break;
                default:
                    break;
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
                    vm.acat.fertilizer.selected_group = undefined;
                    vm.acat.fertilizer.existing_group = false;
                    break;
                case ACAT_GROUP_CONSTANT.CHEMICALS:
                    vm.acat.chemicals.item = undefined;
                    vm.acat.chemicals.unit = undefined;
                    vm.acat.chemicals.title = undefined;
                    break;
                case ACAT_GROUP_CONSTANT.LABOUR_COST:
                    vm.acat.labour_cost.item = undefined;
                    vm.acat.labour_cost.unit = undefined;
                    vm.acat.labour_cost.title = undefined;
                    break;
                case ACAT_GROUP_CONSTANT.OTHER_COST:
                    vm.acat.other_cost.item = undefined;
                    vm.acat.other_cost.unit = undefined;
                    vm.acat.other_cost.title = undefined;
                    break;
                default:
                    break;
            }
        }
        function _cancelCostItem(type) {
            switch (type){
                case ACAT_GROUP_CONSTANT.SEED:
                    vm.isEditSeedCost = false;
                    vm.acat.input.seed = {};
                    break;
                case ACAT_GROUP_CONSTANT.FERTILIZER:
                    vm.isEditFertilizerCost =  false;
                    vm.acat.fertilizer = {};
                    break;
                case ACAT_GROUP_CONSTANT.CHEMICALS:
                    vm.isEditChemicalsCost = false;
                    vm.acat.chemicals = {};
                    break;
                default:
                    break;
            }

        }

        function _removeCostItem(cost,type) {
            // console.log("Remove Cost Item",cost);
            AlertService.showConfirmForDelete("You are about to DELETE COST LIST",
                "Are you sure?", "Yes, Remove It!", "warning", true,function (isConfirm) {

                    if(isConfirm){
                        var removableCost = {};
                        if(type===ACAT_GROUP_CONSTANT.SEED){
                            //
                            removableCost = {
                                _id:vm.acat.input.seed_costs._id,
                                list_type:ACAT_COST_LIST_TYPE.LINEAR,
                                item_id:cost._id
                            }
                        }

                        ACATService.RemoveCostList(removableCost,removableCost.list_type).then(function (response) {
                            console.log("Removed Cost Item.........",response);
                            if(type===ACAT_GROUP_CONSTANT.SEED){
                                vm.acat.input.seedCostList = _.filter(vm.acat.input.seedCostList,function(seedItem){
                                    return seedItem._id !== removableCost.item_id;
                                })
                            }

                        },function (error) {
                            console.log("error when removing cost list",error);
                        });
                    }

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
            AlertService.showConfirmForDelete("You are about to change Cost List type " +
                "Which will clear the previous type data",
                "Are you sure?", "Yes, Change It!", "warning", true,function (isConfirm) {

                if(isConfirm){
                        //TODO reset both grouped list & linear list
                    console.log("based on the type reset both grouped & linear list");
                    }else{
                        switch (type){
                            case ACAT_GROUP_CONSTANT.FERTILIZER:

                                if(vm.acat.fertilizer.list_type === ACAT_COST_LIST_TYPE.GROUPED){
                                    vm.acat.fertilizer.list_type = ACAT_COST_LIST_TYPE.LINEAR;
                                } else{
                                    vm.acat.fertilizer.list_type = ACAT_COST_LIST_TYPE.GROUPED;
                                }
                                break;
                            case ACAT_GROUP_CONSTANT.CHEMICALS:
                                if(vm.acat.chemicals.list_type === ACAT_COST_LIST_TYPE.GROUPED){
                                    vm.acat.chemicals.list_type = ACAT_COST_LIST_TYPE.LINEAR;
                                } else{
                                    vm.acat.chemicals.list_type = ACAT_COST_LIST_TYPE.GROUPED;
                                }
                                break;
                            default:
                                break;
                        }
                    }
                });
        }

    }



})(window.angular);