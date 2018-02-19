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

        //SC & MC related
        vm.addRadio = _addRadio;

        vm.saveQuestion = _save;
        vm.cancel = _cancel;
        vm.addAnother = _addAnother;
        vm.showQuestionOn = _showQuestionOn;
        vm.questionTypeChanged = _questionTypeChanged;

        //Sub Question related
        vm.showSubQuestion = false;//used for grouped questions
        vm.addSubQuestion = _addSubQuestion;
        vm.saveSubQuestion = _saveSubQuestion;

        vm.fibvalidation = [{name:'NONE',code:'text'},{name:'ALPHANUMERIC',code:'text'},{name:'NUMERIC',code:'number'},{name:'ALPHABETIC',code:'text'}];

        initialize();

        function _showQuestionOn() {
            console.log("Question show",vm.question.show);
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
            if(!_.isUndefined(vm.question.selected_type) && vm.question.selected_type.code === QUESTION_TYPE.FILL_IN_BLANK){
                vm.question.selected_validation = _.first(_.filter(vm.fibvalidation,function (val) {
                    return val.name === vm.question.validation_factor;
                }));
            }
        }

        function _addRadio(newValue) {
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
        }

        function _addSubQuestion() {
            vm.showSubQuestion = true;
        }

        function _saveSubQuestion() {
            var myBlockUI = blockUI.instances.get('SubQuestionBuilderBlockUI');
            myBlockUI.start();

            var subQuestion = {
                question_text:vm.sub_question.question_text,
                remark:vm.question.remark,
                required:vm.question.required,
                show:vm.question.show,
                form:vm.form._id,
                validation_factor: 'NONE',
                sub_question_type: 'fib'
            };

            FormService.CreateQuestion(subQuestion,subQuestion.sub_question_type).then(function (response) {
                console.log("qn created",response);
                myBlockUI.stop();
                saveAsSubQuestion(response.data);


                vm.showSubQuestion = false;
            },function (error) {
                myBlockUI.stop();
                vm.showSubQuestion = false;
                console.log("qn create error",error);
            });


        }

        function saveAsSubQuestion(data) {
            vm.question.sub_questions.push(data._id);
            FormService.UpdateQuestion(vm.question).then(function (response) {
                vm.question = response.data;
            },function (error) {
                console.log("qn update error",error);
            });
        }

        function _questionTypeChanged() {
            if(vm.question.selected_type.code === QUESTION_TYPE.GROUPED && !vm.isEdit){
                vm.showSubQuestion = true;
            }
        }

    }


})(window.angular);