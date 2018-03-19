/**
 * Created by Yoni on 3/5/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.acat").controller("ACATController", ACATController);

    ACATController.$inject = ['ACATService','$stateParams'];

    function ACATController(ACATService,$stateParams) {
        var vm = this;
        vm.isEdit = $stateParams.id !== "0";
        vm.ACATId = $stateParams.id;


        vm.addToSeedCostList = _addToSeedCostList;
        vm.editSeedCost = _editSeedCost;
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


            if(vm.isEdit){
                callAPI();
            }else{

            }
            function callAPI() {

                ACATService.GetACATById(vm.ACATId).then(function (response) {
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



        }



        function callApiForCrops(){
        ACATService.GetCrops().then(function (response) {
            vm.crops = response.data.docs;
        });

    }

        function _addToSeedCostList(cost) {
            var items = vm.acat.input.seedCostList;
            if(!_.isUndefined(cost) && !_.isUndefined(cost.item) && !_.isUndefined(cost.unit)){
                var item_exist = _.some(items,function (costItem) {
                   return costItem.item === cost.item && costItem.unit === cost.unit;
                });
                if(!item_exist){
                    //TODO: CALL API AND ADD COST LIST
                    addCostListAPI(cost);
                    vm.acat.input.seedCostList.push(cost);
                    vm.acat.input.seed = {};
                }
            }

        }
        function addCostListAPI(cost) {
          var prepareCost =   {
              type:"linear",
              parent_cost_list: vm.acat.input.sub_sections[0].cost_list._id,//seed cost list
              item:cost.item,
              unit:cost.unit
            };

          ACATService.AddCostList(prepareCost).
                    then(function (response) {
              console.log("response",response);
          },function (error) {
              console.log("error",error);
          });
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