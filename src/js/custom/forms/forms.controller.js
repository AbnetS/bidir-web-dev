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
        vm.editForm = _editForm;


        function _editForm(form, ev) {

        }
    }


})(window.angular);