/**
 * Created by Yoni on 2/9/2018.
 */

(function(angular) {
    "use strict";

    angular.module("app.forms").controller("QuestionBuilderController", QuestionBuilderController);

    QuestionBuilderController.$inject = ['FormService','$mdDialog','data','AlertService','blockUI'];

    function QuestionBuilderController(FormService,$mdDialog,data,AlertService,blockUI) {
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
            var preparedQn = {
                question_text:vm.question.question_text,
                remark:vm.question.remark,
                required:vm.question.required,
                show:vm.question.show,
                form:vm.form._id
            };
            if(vm.question.selected_type.code === QUESTION_TYPE.FILL_IN_BLANK){
                preparedQn.validation_factor = vm.question.selected_validation.name;
            }
            if(!_.isUndefined(vm.question.options) && vm.question.options.length > 0 ){
                preparedQn.options = vm.question.options;
            }
            if(!vm.isEdit){
                FormService.CreateQuestion(preparedQn,vm.question.selected_type.url).then(function (response) {
                    console.log("qn created",response);
                    $mdDialog.hide();
                    AlertService.showSuccess("Question Created","Question Created successfully");
                },function (error) {
                    console.log("qn create error",error);
                    var message = error.data.error.message;
                    AlertService.showError("Failed to Save Question",message);

                });

            }else
                {
                preparedQn._id = vm.question._id;

                FormService.UpdateQuestion(preparedQn).then(function (response) {
                    $mdDialog.hide();
                    AlertService.showSuccess("Question Updated","Question Updated successfully");
                },function (error) {
                    console.log("qn update error",error);
                    var message = error.data.error.message;
                    AlertService.showError("Failed to Update Question",message);

                });

            }
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
                SetValidationObj();
                console.log("Edit QN",vm.question);
            }else {
                vm.question = {
                    show: 1,
                    required:0,
                    options:[]
                };
            }

        }

        function getQuestionTypeObj(typeName) {
            return _.first(_.filter(vm.questionTypes,function (type) {
                return type.name === typeName || type.code === typeName;
            }));
        }
        function SetValidationObj() {
            console.log("vm.question.selected_type",vm.question.type);
            if(!_.isUndefined(vm.question.selected_type) && vm.question.selected_type.code === QUESTION_TYPE.FILL_IN_BLANK){
                vm.question.selected_validation = _.first(_.filter(vm.fibvalidation,function (val) {
                    return val.name === vm.question.validation_factor;
                }));
            }
        }


        vm.addRadio = function(newValue) {
            // If value is undefined, cancel.
            if (newValue === undefined || newValue === '') {
                return;
            }
            // Push it to radioOptions
            var index =  vm.question.options.indexOf(newValue);
            if(index === -1) {
                vm.question.options.push(newValue);
            }
            console.log("question",vm.question.options);
            // Clear input contents
            vm.newRadioValue = '';
        };


        vm.editorEnabledForElement = '';

        vm.openTextEditor = function(element) {
            vm.text = vm.question.options[element];
            vm.editorEnabledForElement = element;
        };

        vm.saveOption = function(element, newValue) {
            vm.question.options[element] = newValue;
            vm.editorEnabledForElement = '';

        };



    }


})(window.angular);