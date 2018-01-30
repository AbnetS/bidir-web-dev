/**
 * Created by Yoni on 1/29/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.forms").controller("FormBuilderController", FormBuilderController);

    FormBuilderController.$inject = ['FormService','blockUI'];

    function FormBuilderController(FormService,blockUI) {
        var vm = this;



        initialize();


        function initialize() {

        }



    }


})(window.angular);