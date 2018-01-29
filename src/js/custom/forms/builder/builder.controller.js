/**
 * Created by Yoni on 1/29/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.forms").controller("FormBuilderController", FormBuilderController);

    FormBuilderController.$inject = ['FormService','blockUI'];

    function FormBuilderController(FormService,blockUI) {
        var vm = this;
        vm.pageSizes = [10, 25, 50, 100, 250, 500];

        vm.options = {
            rowSelection: true,
            multiSelect: true,
            autoSelect: true,
            decapitate: false,
            largeEditDialog: false,
            boundaryLinks: true,
            limitSelect: true,
            pageSelect: false
        };

        vm.request = {
            Draw: 1,
            Start: 0,
            PageSize: 10,
            Search: ""
        };


        initialize();


        function initialize() {

        }

        vm.logPagination = function (page, pageSize) {
            vm.request.Draw = page;
            vm.request.PageSize = pageSize;
            vm.request.Start = page - 1;
            // callApi();
        };


    }


})(window.angular);