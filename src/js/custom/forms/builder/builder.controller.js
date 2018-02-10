/**
 * Created by Yoni on 1/29/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.forms").controller("FormBuilderController", FormBuilderController);

    FormBuilderController.$inject = ['FormService','$mdDialog','RouteHelpers'];

    function FormBuilderController(FormService,$mdDialog,RouteHelpers) {
        var vm = this;
        vm.addQuestion = _addQuestion;
        vm.saveForm = _saveForm;
        vm.formData = {
            hasSection:0,
            layout:1
        };
        vm.formTypes = FormService.FormTypes;


        initialize();
        function _saveForm() {
            console.log("Form",vm.formData);
        }

        function _addQuestion(ev) {
            $mdDialog.show({
                locals: {data: {}},
                templateUrl: RouteHelpers.basepath('forms/question.builder.html'),
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                hasBackdrop: false,
                escapeToClose: true,
                controller: 'QuestionBuilderController',
                controllerAs: 'vm'
            }).then(function (answer) {

            }, function () {
            });
        }

        function initialize() {

        }



    }


})(window.angular);