/**
 * Created by Yoni on 1/29/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.forms").controller("FormsController", FormsController);

    FormsController.$inject = ['FormService','blockUI'];

    function FormsController(FormService,blockUI) {
        var vm = this;
        vm.forms = [];
        vm.buildForm = _buildForm;
        vm.editForm = _editForm;
        initialize();


        function initialize() {
            FormService.GetForms().then(function(response){
                console.log(response);
                vm.forms = response.data.docs;
                vm.totalCount =  response.data.total_docs_count;
            },function (error) {
                console.log(error);
            })
        }


        function _buildForm() {

        }
        function _editForm(form, ev) {
            console.log("edit Form",form);
        }
    }


})(window.angular);