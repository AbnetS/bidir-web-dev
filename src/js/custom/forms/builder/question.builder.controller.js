/**
 * Created by Yoni on 2/9/2018.
 */

(function(angular) {
    "use strict";

    angular.module("app.forms").controller("QuestionBuilderController", QuestionBuilderController);

    QuestionBuilderController.$inject = ['FormService','$mdDialog','data'];

    function QuestionBuilderController(FormService,$mdDialog,data) {
        var vm = this;
        vm.questionTypes = FormService.QuestionTypes;
        vm.readOnly = false;

        vm.isEdit = data.question !== null;
        vm.form = data.form;

        vm.saveQuestion = _save;
        vm.cancel = _cancel;
        vm.addAnother = _addAnother;
        vm.questionTypeChanged = _questionTypeChanged;
        vm.showQuestionOn = _showQuestionOn;

        vm.fibvalidation = [{name:'NONE',code:'text'},{name:'ALPHANUMERIC',code:'text'},{name:'NUMERIC',code:'number'},{name:'ALPHABETIC',code:'text'}];

        initialize();
        function _showQuestionOn() {
            console.log("Question show",vm.question.show);
        }

        function _questionTypeChanged() {

        }

        function _save() {
            console.log("question",vm.question);
        }
        function _addAnother() {
            console.log("question",vm.question);
        }
        function _cancel() {
            $mdDialog.cancel();
        }

        function initialize() {
            if(vm.isEdit){
                vm.question = data.question;
                vm.question.selected_type = getQuestionTypeObj(vm.question.type);
                // console.log("vm.question.selected_type",vm.question.selected_type);
            }else {
                console.log("new Qn");
            }

        }

        function getQuestionTypeObj(name) {
            return _.first(_.filter(vm.questionTypes,function (type) {
                return type.name === name;
            }));
        }

    }


})(window.angular);