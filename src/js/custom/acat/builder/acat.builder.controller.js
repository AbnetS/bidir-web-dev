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
        vm.removeCostItemGrouped =_removeCostItemGrouped;

        vm.cancelCostItem = _cancelCostItem;
        vm.cropSelectChanged = _cropSelectChanged;
        vm.onCostListTypeChange = _onCostListTypeChange;
        //GROUP RELATED
        vm.addGroupOnSection = _addGroupOnSection;
        vm.editGroupSection = _editGroupSection;
        vm.removeGroupSection = _removeGroupSection;




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
            vm.isEditCostGroup = false;

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
                console.log("GetACATById",response);
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
            
            vm.acat.seed_costs = vm.acat.input.sub_sections[0].cost_list;
            vm.acat.fertilizer_costs = vm.acat.input.sub_sections[1].cost_list;
            // vm.acat.chemicals_costs = vm.acat.input.sub_sections[2].cost_list;

            SetListType();

            console.log("vm.acat", vm.acat);
        }
        function SetListType() {

            vm.acat.fertilizer.list_type = vm.acat.fertilizer_costs.grouped.length > 0 ?
                ACAT_COST_LIST_TYPE.GROUPED :vm.acat.fertilizer_costs.linear.length >= 0 ? ACAT_COST_LIST_TYPE.LINEAR:'NA';

            // vm.acat.chemicals.list_type = vm.acat.chemicals_costs.grouped.length > 0 ?
            //     ACAT_COST_LIST_TYPE.GROUPED :  vm.acat.chemicals_costs.linear.length >= 0 ? ACAT_COST_LIST_TYPE.LINEAR:'NA';

            // vm.acat.labour_cost.list_type = vm.acat.labour_costs.grouped.length > 0 ?
            //     ACAT_COST_LIST_TYPE.GROUPED : vm.acat.labour_costs.grouped.length >= 0 ? ACAT_COST_LIST_TYPE.LINEAR:'NA';
            //
            // vm.acat.other_cost.list_type = vm.acat.other_costs.grouped.length > 0 ?
            //     ACAT_COST_LIST_TYPE.GROUPED :vm.acat.other_costs.grouped.length >= 0 ? ACAT_COST_LIST_TYPE.LINEAR:'NA';

        }

        function callApiForCrops(){
            ACATService.GetCrops().then(function (response) {
                vm.crops = _.filter(response.data.docs,function (crop) {
                    return !crop.has_acat;
                });
                console.log("crop list",vm.crops);
            });
        }

        function _addToCostList(cost,type) {

                if(!_.isUndefined(cost) && !_.isUndefined(cost.item) && !_.isUndefined(cost.unit)){
                    var items = [];
                    switch (type){
                        case ACAT_GROUP_CONSTANT.SEED:
                            items = vm.acat.seed_costs.linear;
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
                                cost.type = vm.acat.fertilizer.list_type;
                            if(vm.isEditFertilizerCost){
                                updateCostListAPI(cost,type);
                            }else{
                                if(!DoesItemExistInCostList(cost,items)){
                                   var itemUnit = {
                                        parent_cost_list: vm.acat.fertilizer_costs._id,//Fertilizer cost list
                                        item:cost.item,
                                        unit:cost.unit,
                                        type:vm.acat.fertilizer.list_type
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
                        // var groupCost = PrepareGroupCostListForAdd(groupInfo, type);
                        //
                        // //ADD THE NEW GROUP TO COST LIST PARENT
                        // ACATService.AddCostList(groupCost).then(function (response) {
                        //     console.log("group created",response.data);
                        //     var groupItem = response.data; //Group Information captured
                        //
                        //     AddCostItemToGroup({
                        //         parent_grouped_list:groupItem._id,
                        //         item: groupInfo.item,
                        //         unit: groupInfo.unit
                        //     },type);
                        //
                        // },function (error) {
                        //     console.log("error on group creation",error);
                        // });
                    }

            }
        }
        function PrepareGroupCostListForAdd(groupInfo,type) {
            switch (type){
                case ACAT_GROUP_CONSTANT.FERTILIZER:
                    return  {
                        _id: vm.acat.fertilizer_costs._id,
                        type: 'grouped',
                        parent_cost_list: vm.acat.fertilizer_costs._id,
                        title:groupInfo.title
                    };
                    break;
                case ACAT_GROUP_CONSTANT.CHEMICALS:
                    return  {
                        _id: vm.acat.chemicals_costs._id,
                        type: 'grouped',
                        parent_cost_list: vm.acat.chemicals_costs._id,
                        title:groupInfo.title
                    };
                    break;
                case ACAT_GROUP_CONSTANT.LABOUR_COST:
                    return  {
                        _id: vm.acat.labour_costs._id,
                        type: 'grouped',
                        parent_cost_list: vm.acat.labour_costs._id,
                        title:groupInfo.title
                    };
                    break;
                case ACAT_GROUP_CONSTANT.OTHER_COST:
                    return  {
                        _id: vm.acat.other_costs._id,
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
                var message = error.data.error.message;
                AlertService.showError("Error on adding cost item",message);
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
                        vm.acat.seed_costs.linear.push(newCost);
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
                var message = error.data.error.message;
                AlertService.showError("Error when adding cost item on " + type,message);
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
                        vm.acat.seed_costs.linear = _.filter(vm.acat.seed_costs.linear,
                            function (itemCost) {
                                return itemCost._id !== cost._id;
                            });
                        vm.acat.seed_costs.linear.push(newCost);
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
                    break;
                case ACAT_GROUP_CONSTANT.CHEMICALS:
                    vm.acat.chemicals.item = undefined;
                    vm.acat.chemicals.unit = undefined;
                    break;
                case ACAT_GROUP_CONSTANT.LABOUR_COST:
                    vm.acat.labour_cost.item = undefined;
                    vm.acat.labour_cost.unit = undefined;
                    break;
                case ACAT_GROUP_CONSTANT.OTHER_COST:
                    vm.acat.other_cost.item = undefined;
                    vm.acat.other_cost.unit = undefined;
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
        function prepareCostListForRemoval(cost,type) {
            switch (type){
                case ACAT_GROUP_CONSTANT.SEED:
                    return {
                        _id:vm.acat.seed_costs._id,
                        list_type:vm.acat.fertilizer.list_type,
                        item_id:cost._id
                    };
                    break;
                case ACAT_GROUP_CONSTANT.FERTILIZER:
                    return {
                        _id:vm.acat.fertilizer_costs._id,
                        list_type:vm.acat.fertilizer.list_type,
                        item_id:cost._id
                    };
                    break;
                case ACAT_GROUP_CONSTANT.CHEMICALS:
                    return {
                        _id:vm.acat.chemicals_costs._id,
                        list_type:vm.acat.chemicals.list_type,
                        item_id:cost._id
                    };
                    break;
                case ACAT_GROUP_CONSTANT.LABOUR_COST:
                    return {
                        _id:vm.acat.labour_costs._id,
                        list_type:vm.acat.chemicals.list_type,
                        item_id:cost._id
                    };
                    break;
                case ACAT_GROUP_CONSTANT.OTHER_COST:
                    return {
                        _id:vm.acat.other_costs._id,
                        list_type:vm.acat.chemicals.list_type,
                        item_id:cost._id
                    };
                    break;
                default:
                    break;
            }
        }

        function _removeCostItem(cost,type) {
            AlertService.showConfirmForDelete("You are about to DELETE COST LIST",
                "Are you sure?", "Yes, Remove It!", "warning", true,function (isConfirm) {

                    if(isConfirm){
                        var removableCost = prepareCostListForRemoval(cost,type);

                        ACATService.RemoveCostListLinear(removableCost,removableCost.list_type).then(function (response) {
                            console.log("Removed Cost Item.........",response);
                            //refresh view
                            RefreshCostList(removableCost,type);

                        },function (error) {
                            console.log("error when removing cost list",error);
                        });
                    }

                });

        }

        function RefreshCostList(removableCost,type) {
            switch (type){
                case ACAT_GROUP_CONSTANT.SEED:
                    vm.acat.seed_costs.linear = _.filter(vm.acat.seed_costs.linear,function(seedItem){
                        return seedItem._id !== removableCost.item_id;
                    });
                    break;
                case ACAT_GROUP_CONSTANT.FERTILIZER:
                    if(vm.acat.fertilizer.list_type === ACAT_COST_LIST_TYPE.GROUPED){
                        removableCost.group.items = _.filter(removableCost.group.items,function(seedItem){
                            return seedItem._id !== removableCost.item_id;
                        });
                    }else{
                        vm.acat.fertilizer_costs.linear = _.filter(vm.acat.fertilizer_costs.linear,function(seedItem){
                            return seedItem._id !== removableCost.item_id;
                        });
                    }
                    break;
                case ACAT_GROUP_CONSTANT.CHEMICALS:

                    break;
                case ACAT_GROUP_CONSTANT.LABOUR_COST:

                    break;
                case ACAT_GROUP_CONSTANT.OTHER_COST:

                    break;
                default:
                    break;
            }
        }

        function _removeCostItemGrouped(cost,type,groupInfo) {
            AlertService.showConfirmForDelete("You are about to DELETE Cost List From Group",
                "Are you sure?", "Yes, Remove It!", "warning", true,function (isConfirm) {

                    if(isConfirm){
                        var removableCost = {
                            _id:groupInfo._id,
                            group:groupInfo,
                            list_type:vm.acat.fertilizer.list_type,
                            item_id:cost._id
                        };

                        ACATService.RemoveCostListGroup(removableCost)
                            .then(function (response) {
                            console.log("Removed Cost group item Item.........",response);
                                RefreshCostList(removableCost,type);
                        },function (error) {
                            console.log("error when removing cost list",error);
                        });
                    }

                });
        }


        //UPDATE CROP FOR CROP OR CREATE NEW ACAT FOR A CROP
        function _cropSelectChanged() {
            if(vm.isEdit){
                AlertService.showConfirmForDelete("You are about to change CROP for the ACAT",
                    "Are you sure?", "Yes, Change It!", "warning", true,function (isConfirm) {
                        if(isConfirm){
                            //    UPDATE ACAT CROP
                            var UpdatedACAT =   {
                                _id:$stateParams.id,
                                title: vm.acat.selected_crop.name +  '-CAT',
                                crop: vm.acat.selected_crop._id
                            };
                            ACATService.UpdateACAT(UpdatedACAT).then(function (response) {
                                console.log("Updated acat ",response);
                                var acatData = response.data;
                                $state.go('app.acatbuilder',{id:acatData._id},{inherit:true});
                            },function (error) {
                                console.log("error on updating acat",error);
                            })
                        }else{
                           callAPI();
                        }
                    });

            }else {
                // Initialize ACAT with this crop
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

        function _onCostListTypeChange(type,cost_list) {
            if(cost_list.linear.length === 0 && cost_list.grouped.length === 0){
                console.log("cost_list is empty",cost_list);
            }else{
                AlertService.showConfirmForDelete("You are about to change Cost List type " +
                    "Which will clear the previous type data",
                    "Are you sure?", "Yes, Change It!", "warning", true,function (isConfirm) {
                        if(isConfirm){
                            ACATService.ResetCostList(cost_list).then(function(response){
                                switch (type){
                                    case ACAT_GROUP_CONSTANT.FERTILIZER:
                                        vm.acat.fertilizer_costs.linear = [];
                                        vm.acat.fertilizer_costs.grouped = [];
                                        break;
                                    case ACAT_GROUP_CONSTANT.CHEMICALS:
                                        break;
                                    default:
                                        break;
                                }
                            },function (error) {
                                console.log("error",error);
                            });
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


        function _addGroupOnSection(groupInfo,type) {
            if (vm.isEditCostGroup) {
                ACATService.UpdateCostGroup(groupInfo).then(function (response) {
                    console.log("group updated successfully",response.data);
                    var newGroup = response.data;
                    callAPI();
                    groupInfo.existing_group = false;
                    groupInfo.selected_group = newGroup;
                    groupInfo.title = '';
                    vm.isEditCostGroup = false;

                },function (error) {
                    console.log("error on group update",error);
                    var message = error.data.error.message;
                    AlertService.showError("Error on updating group title",message);
                    callAPI();
                });
            } else {
                    var groupCost = PrepareGroupCostListForAdd(groupInfo, type);
                    //ADD THE NEW GROUP TO COST LIST PARENT
                    ACATService.AddCostList(groupCost).then(function (response) {
                        console.log("group created", response.data);
                        var newGroup = response.data;
                        callAPI();
                        groupInfo.existing_group = true;
                        groupInfo.selected_group = newGroup;

                    }, function (error) {
                        console.log("error on group creation", error);
                        var message = error.data.error.message;
                        AlertService.showError("Error on creating group",message);

                    });
            }
        }

        function _removeGroupSection(groupInfo, type) {
            AlertService.showConfirmForDelete("Group: " + groupInfo.title + " including " + groupInfo.items.length + " cost items",
                "Are you sure? You are about to DELETE group", "Yes, Change It!", "warning", true,function (isConfirm) {
                    if(isConfirm){
                        var groupCost = PrepareGroupCostListForAdd(groupInfo, type);
                        groupCost.item_id = groupInfo._id;
                        ACATService.RemoveCostGroup(groupCost).then(function (response) {
                            console.log("group removed successfully",response.data);
                            callAPI();
                        },function (error) {
                            console.log("error on group remove",error);
                            var message = error.data.error.message;
                            AlertService.showError("Error on removing group",message);
                        });
                    }
                });

        }

        function _editGroupSection(group, type) {
            vm.isEditCostGroup = true;
            vm.acat.fertilizer.title = group.title;
            vm.acat.fertilizer._id = group._id;
            vm.acat.fertilizer.existing_group = true;
            console.log("edit group",vm.acat.fertilizer);

        }

    }



})(window.angular);