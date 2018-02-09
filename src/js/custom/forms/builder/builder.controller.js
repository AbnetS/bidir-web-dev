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


        initialize();

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