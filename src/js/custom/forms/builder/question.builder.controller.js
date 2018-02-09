/**
 * Created by Yoni on 2/9/2018.
 */

(function(angular) {
    "use strict";

    angular.module("app.forms").controller("QuestionBuilderController", QuestionBuilderController);

    QuestionBuilderController.$inject = ['FormService','$mdDialog'];

    function QuestionBuilderController(FormService,$mdDialog) {
        var vm = this;
        vm.save = _save;
        vm.cancel = _cancel;
        vm.addAnother = _addAnother;
        vm.questionTypeChanged = _questionTypeChanged;

        vm.id =1;
        vm.formSubmitted=false;
        vm.readOnly = false;

        vm.questionTypes = FormService.QuestionTypes;


        initialize();
        function _questionTypeChanged() {

        }
        function _save() {

        }
        function _addAnother() {
            
        }
        function _cancel() {
            $mdDialog.cancel();
        }

        function initialize() {

        }



    }


})(window.angular);