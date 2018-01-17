/**
 * Created by Yoni on 1/8/2018.
 */


(function(angular) {
    "use strict";

    angular.module("app.clients").controller("ClientsController", ClientsController);

    ClientsController.$inject = ['ClientService','$state','$scope','AuthService'];

    function ClientsController(ClientService,$state,$scope,AuthService) {
        var vm = this;
        vm.currentUser = {
            selected_access_branch:undefined
        };
        vm.pageSizes = [10, 25, 50, 100, 250, 500];
        vm.filter = {show : true};
        vm.request = {
            Start: 1,
            limit:100,
            PageSize: 10,
            Search:''
        };

        vm.clientDetail = _clientDetail;
        vm.onSelectedBranch = _onSelectedBranch;

        vm.clearSearch = function(){
            vm.request.Search = "";
            vm.filter.show = false;
            callApi();
        };



        callApi();
        GetBranchFilter();


        function GetBranchFilter() {
            if(AuthService.IsSuperuser()){
                ClientService.GetBranches().then(function(response){
                    vm.currentUser.user_access_branches = response.data.docs;
                },function(error){
                    vm.currentUser.user_access_branches = [];
                });
            }
            else {
                vm.currentUser.user_access_branches = AuthService.GetAccessBranches();
            }
        }

        function callApi(){
            $scope.promise = ClientService.GetClients().then(function(response){
                vm.clients = response.data.docs;
                vm.clientsCopy = angular.copy(vm.clients);
            },function (error) {
                console.log("error",error);
            });

        }

        function SearchApi(SearchText){
            $scope.promise = ClientService.SearchClient(SearchText)
                .then(function(response){
                vm.clients = response.data.docs;
                vm.clientsCount = response.data.total_docs_count;
                console.log(response);
            },function (error) {
                vm.clients = vm.clientsCopy;
                console.log("error",error);
            });
        }

        function _clientDetail(client,ev) {
            $state.go('app.client_detail',{id:client._id});
        }

        function _onSelectedBranch(){
            vm.clients = vm.clientsCopy;

            vm.clients = _.filter(vm.clients,function(client){
                if(!_.isUndefined(client.branch)){
                        return client.branch._id === vm.currentUser.selected_access_branch._id;
                }
            });

        }

        $scope.$watch(angular.bind(vm, function () {
            return vm.request.Search;
        }), function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if(newValue.length > 2){
                    SearchApi(newValue);
                }else{
                    vm.clients = vm.clientsCopy;
                }

            }
        });
    }


})(window.angular);
