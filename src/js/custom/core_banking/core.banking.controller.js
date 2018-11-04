(function(angular) {
    "use strict";


    angular
        .module('app.banking')
        .controller('CoreBankingController', CoreBankingController);

    CoreBankingController.$inject = ['CoreBankingService','$scope','$rootScope','AlertService','$state'];

    function CoreBankingController(CoreBankingService,$scope,$rootScope,AlertService,$state) {
        var vm = this;
        vm.titles = ["Obo","Ato","W/rt","W/ro","Mr","Mrs","Miss","Dr."];
        $rootScope.app.layout.isCollapsed = true;

        vm.paginate = _paginate;
        vm.clearSearch = _clearSearch;
        vm.saveSingleClient = _saveSingleClient;
        vm.saveAllClients = _saveSingleClient;
        vm.cbs_clientDetail = _clientDetail;

        function _clientDetail(client){
            CoreBankingService.setClientInfo(client);
            $state.go('app.cbs_detail',{id:client._id});
        }

        vm.refreshResults = refreshResults;
        vm.clear = clear;
        vm.statusStyle = _statusStyle;

        function _statusStyle(status){
            var style = '';
            switch (status){
                case 'accepted':
                    style =  'label label-success';
                    break;
                case 'denied':
                    style =  'label label-danger';
                    break;
                case 'draft':
                    style =  'label label-default';
                    break;
                default:
                    style =  'label label-warning';
            }
            return style;
        }

        function _saveSingleClient(client){

            console.log("client info to send",client);

            var clientFormatted = {
                branchId: client.branchId,
                title : client.title,
                client: client._id };

            CoreBankingService.PostClientToCBS(clientFormatted).then(
                 function (response) {
                     AlertService.showSuccess('Client Info sent to CBS!',response);
                     console.log("response",response);
                 }
                ,function (error) {
                    console.log('error',error);
                    var message = error.data.error.message;
                    AlertService.showError( 'Oops... Something went wrong', message);
                });
        }

        initialize();

        function initialize() {
            vm.pageSizes = [10, 25, 50, 100, 250, 500];
            vm.filter = {show : false};
            vm.options = {
                rowSelection: true,
                multiSelect: true,
                autoSelect: false,
                decapitate: true,
                largeEditDialog: false,
                boundaryLinks: false,
                limitSelect: false,
                pageSelect: false
            };
            vm.query = {
                search:'',
                page:1,
                per_page:500
            };

            callApi();
        }

        function _clearSearch(){
            vm.query.search = "";
            vm.filter.show = false;
            callApi();
        }
        function _paginate (page, pageSize) {
            console.log('current Page: ' + vm.query.page + ' page size: ' + vm.query.per_page);
            vm.query.page = page;
            vm.query.per_page = pageSize;
            callApi();
        }
        function callApi(){
            vm.clientPromise = CoreBankingService.GetClients(vm.query).then(function(response){
                console.log(" callApi vm.clients",response);
                vm.clients = response.data.docs;
                vm.clientsCopy = angular.copy(vm.clients);
                vm.query.total_docs_count =  response.data.total_docs_count;
            },function (error) {
                console.log("error callApi vm.clients",error);
            });
        }
        function SearchApi(SearchText){
            $scope.promise = CoreBankingService.SearchClient(SearchText)
                .then(function(response){
                    vm.clients = response.data.docs;
                    vm.clientsCount = response.data.total_docs_count;
                    console.log(response);
                },function (error) {
                    vm.clients = vm.clientsCopy;
                    console.log("error",error);
                });
        }


        function refreshResults($select){
            var search = $select.search,
                list = angular.copy($select.items),
                FLAG = -1;
            //remove last user input
            list = list.filter(function(item) {
                return item.id !== FLAG;
            });

            if (!search) {
                //use the predefined list
                $select.items = list;
            }
            else {
                //manually add user input and set selection
                var userInputItem = search;
                $select.items = [userInputItem].concat(list);
                $select.selected = userInputItem;
            }
        }
        function clear($event, $select){
            $event.stopPropagation();
            //to allow empty field, in order to force a selection remove the following line
            $select.selected = undefined;
            //reset search query
            $select.search = undefined;
            //focus and open dropdown
            $select.activate();
        }

        $scope.$watch(angular.bind(vm, function () {
            return vm.query.search;
        }), function (newValue, oldValue) {
            if (newValue !== oldValue) {
                //make sure at least two characters are entered
                if(newValue.length > 2){
                    SearchApi(newValue);
                }else{
                    vm.clients = vm.clientsCopy;
                }

            }
        });

    }

})(window.angular);