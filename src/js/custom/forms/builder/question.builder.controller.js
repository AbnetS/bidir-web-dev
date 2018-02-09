/**
 * Created by Yoni on 2/9/2018.
 */

(function(angular) {
    "use strict";

    angular.module("app.forms").controller("QuestionBuilderController", QuestionBuilderController);

    QuestionBuilderController.$inject = ['FormService','$mdDialog'];

    function QuestionBuilderController(FormService,$mdDialog) {
        var vm = this;
        vm.saveQuestion = _save;
        vm.cancel = _cancel;
        vm.addAnother = _addAnother;
        vm.questionTypeChanged = _questionTypeChanged;
        vm.questionForm = {
            preview:{
                text:'type text',
                number: '0'
            }
        };
        vm.id =1;
        vm.formSubmitted=false;
        vm.readOnly = false;

        vm.fibvalidation = [{name:'NONE',code:'text'},{name:'ALPHANUMERIC',code:'text'},{name:'NUMERIC',code:'number'}, 'ALPHABETIC'];

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