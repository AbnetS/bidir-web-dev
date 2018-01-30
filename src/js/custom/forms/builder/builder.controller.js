/**
 * Created by Yoni on 1/29/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.forms").controller("FormBuilderController", FormBuilderController);

    FormBuilderController.$inject = ['FormService','blockUI'];

    function FormBuilderController(FormService,blockUI) {
        var vm = this;
        // vm.formData = {};


        initialize();


        function initialize() {

        }



    }


})(window.angular);