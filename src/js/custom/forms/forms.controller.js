/**
 * Created by Yoni on 1/29/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.forms").controller("FormsController", FormsController);

    FormsController.$inject = ['FormService','$state'];

    function FormsController(FormService,$state) {
        var vm = this;
        vm.forms = [];
        vm.logPagination = _logPagination;
        vm.editForm = _editForm;

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
            page: 1,
            per_page: 10,
            Search: ""
        };

        initialize();


        function initialize() {
            callApi();//fetch first page data initially
        }

        function _logPagination(page, pageSize) {
            vm.request.page = page;
            vm.request.per_page = pageSize;
            vm.request.Start = page - 1;
            callApi();
        }

        function callApi() {
            FormService.GetFormsPerPage(vm.request).then(function (response) {
                vm.forms = response.data.docs;
                _.forEach(vm.forms,function (form) {
                    if(form.has_sections){
                        form.sectionCount = form.sections.length;
                        var questionCount = 0;
                        _.forEach(form.sections,function (sec) {
                            questionCount = questionCount + sec.questions.length;
                        });
                        form.questionCount = questionCount;
                    }else{
                        form.questionCount = form.questions.length;
                    }
                })
            },function (error) {
                console.log(error);
            })
        }

        function _editForm(form, ev) {
            $state.go('app.builder',{id:form._id});
            console.log("edit Form",form);
        }
    }


})(window.angular);