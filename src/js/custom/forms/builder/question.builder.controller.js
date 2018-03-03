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
        vm.sortableOptions = {
            placeholder: 'box-placeholder m0'
        };
        vm.sub_question_list = [];

        //SC & MC related
        vm.addRadio = _addRadio;
        vm.radioOptionClicked = _radioOptionClicked;

        vm.saveQuestion = _saveQuestion;
        vm.cancel = _cancel;
        vm.addAnother = _addAnother;
        vm.showQuestionOn = _showQuestionOn;
        vm.removeQuestion = _removeQuestion;

        vm.questionTypeChanged = _questionTypeChanged;


        //Sub Question related
        vm.showSubQuestion = false;//used for grouped questions
        vm.toggleAddSubQuestion = _toggleAddSubQuestion;
        vm.addToSubQuestion = _addToSubQuestion;
        vm.editSubQuestion = _editSubQuestion;
        vm.removeOption = _removeOption;

        initialize();

        function initialize() {
            vm.fibvalidation = [{name:'NONE',code:'text'},{name:'ALPHANUMERIC',code:'text'},{name:'NUMERIC',code:'number'},{name:'ALPHABETIC',code:'text'}];
            vm.isEdit = data.question !== null;
            vm.form = data.form;
            vm.maxOrderNumber = data.number;
            vm.isSubEdit = false;
            vm.sub_question = {};
            vm.sub_question.selected_validation = _.first(_.filter(vm.fibvalidation,function(val){
                return val.name === 'NONE'; //set sub question validation default to NONE
            }));


            if(vm.isEdit){
                vm.question = data.question;
                if(!_.isUndefined(vm.question.sub_questions)){
                    vm.sub_question_list = vm.question.sub_questions;
                }
                vm.question.form = data.form._id;
                vm.question.selected_type = getQuestionTypeObj(vm.question.type);
                SetValidationObj(false);
            }else {
                vm.question = {
                    show: 1,
                    required:0,
                    options:[]
                };

                if(data.section.has_section){
                    vm.question.section = data.section.sectionId;
                }

            }
        }
        function _saveQuestion() {
            var preparedQn = {
                question_text:vm.question.question_text,
                remark:vm.question.remark,
                required:vm.question.required,
                show:vm.question.show,
                measurement_unit: !_.isUndefined(vm.question.measurement_unit)? vm.question.measurement_unit:null,
                form:vm.form._id
            };
            if(vm.question.selected_type.code === QUESTION_TYPE.FILL_IN_BLANK){
                preparedQn.validation_factor = vm.question.selected_validation.name;
            }
            if(!_.isUndefined(vm.question.options) && vm.question.options.length > 0 ){
                preparedQn.options = vm.question.options;
            }
            if(!vm.isEdit){
                preparedQn.section = vm.question.section;
                preparedQn.number = GetNextQuestionOrderNumber();
                FormService.CreateQuestion(preparedQn,vm.question.selected_type.url).then(function (response) {
                    console.log("Question created",response);
                    vm.maxOrderNumber = preparedQn.number;
                    vm.question = response.data;
                    vm.showSubQuestion = true;
                    if(vm.question.type === QUESTION_TYPE.GROUPED){
                        saveSubQuestionList();
                    }
                    $mdDialog.hide();
                    AlertService.showSuccess("Question Created","Question Created successfully");
                },function (error) {
                    console.log("Question create error",error);
                    var message = error.data.error.message;
                    AlertService.showError("Failed to Save Question",message);
                });

            }else
                {
                preparedQn._id = vm.question._id;

                FormService.UpdateQuestion(preparedQn).then(function (response) {
                    if(vm.question.selected_type.code === QUESTION_TYPE.GROUPED){
                        saveSubQuestionList();
                    }
                    $mdDialog.hide();
                    AlertService.showSuccess("Question Updated","Question Updated successfully");
                },function (error) {
                    console.log("qn update error",error);
                    var message = error.data.error.message;
                    AlertService.showError("Failed to Update Question",message);

                });
            }
        }
        function _removeQuestion() {
            AlertService.showConfirmForDelete("You are about to DELETE this Question?",
                "Are you sure?", "Yes, Delete it!", "warning", true,function () {
                    FormService.DeleteQuestion(vm.question).then(function(response){
                        AlertService.showSuccess("Question","Question Deleted successfully");
                        $mdDialog.hide();
                    },function(error){
                        console.log("qn deleting error",error);
                        var message = error.data.error.message;
                        AlertService.showError("Failed to DELETE Question",message);
                    })
                });

        }

        //SC AND MC OPTIONS RELATED
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
        function _removeOption(option) {
            var index = vm.question.options.indexOf(option);
            if(index !== -1){
                vm.question.options.splice(index,1);
            }
        }
        function _radioOptionClicked(option) {
            console.log("radio button clicked used for editing",option);
        }

        //SUB QUESTIONS RELATED
        function _toggleAddSubQuestion() {
            vm.showSubQuestion = true;
            if(vm.isSubEdit){
                vm.sub_question = {};
                vm.isSubEdit = false
            }
        }
        function _editSubQuestion(question,ev) {
            vm.isSubEdit = true;
            vm.showSubQuestion = true;
            vm.sub_question = question;
            SetValidationObj(true);
        }
        function _addToSubQuestion() {

            var subQuestion = {
                question_text:vm.sub_question.question_text,
                parent_question:vm.question._id,
                required:vm.question.required,
                show:vm.question.show,
                measurement_unit: !_.isUndefined(vm.sub_question.measurement_unit)? vm.sub_question.measurement_unit:null,
                validation_factor: vm.sub_question.selected_validation.name,
                sub_question_type: 'fib',
                form:vm.form._id
            };
            //TODO check obj b4 adding
            vm.sub_question_list.push(subQuestion);
            var vallidationCopy = vm.sub_question.selected_validation;
            vm.sub_question = {};
            vm.sub_question.selected_validation = vallidationCopy;
            vm.showSubQuestion = false;
        }

        function saveSubQuestionList() {
            _.forEach(vm.sub_question_list,function (subQn) {
                if(!_.isUndefined(subQn._id)){
                    FormService.UpdateQuestion(subQn).then(function (response) {
                        // console.log(subQn.question_text + "Updated",response);
                    },function (error) {
                        var message = error.data.error.message;
                        AlertService.showError("Failed to Save Sub Question",message);
                    });
                }else {
                    subQn.number = setSubQuestionOrderNumber();
                    subQn.parent_question = vm.question._id;
                    vm.maxSubOrderNumber = subQn.number;
                    FormService.CreateQuestion(subQn,subQn.sub_question_type).then(function (response) {
                        // console.log(subQn.question_text + "sub question created",response);
                    },function (error) {
                        console.log("sub question error create",error);
                    });
                }
            });
        }

        function _addAnother() {
            console.log("question",vm.question);
        }
        function _showQuestionOn() {
            console.log("Question show",vm.question.show);
        }
        function _cancel() {
            $mdDialog.cancel();
        }
        function _questionTypeChanged() {
            // if(vm.question.selected_type.code === QUESTION_TYPE.GROUPED && !vm.isEdit){
            //     vm.showSubQuestion = true;
            // }
        }


        function getQuestionTypeObj(typeName) {
            return _.first(_.filter(vm.questionTypes,function (type) {
                return type.name === typeName || type.code === typeName;
            }));
        }
        function SetValidationObj(isSubQuestion) {
            if(isSubQuestion){
                vm.sub_question.selected_validation = _.first(_.filter(vm.fibvalidation,function (val) {
                    return val.name === vm.sub_question.validation_factor;
                }));
            }else{
                if(vm.question.selected_type.code === QUESTION_TYPE.FILL_IN_BLANK){
                    vm.question.selected_validation = _.first(_.filter(vm.fibvalidation,function (val) {
                        return val.name === vm.question.validation_factor;
                    }));
                }
            }

        }
        function setSubQuestionOrderNumber() {
            var maxNo = _.max(vm.question.sub_questions,function(sub){
                return sub.number;
            });
            vm.maxSubOrderNumber = _.isUndefined(vm.maxSubOrderNumber)?maxNo.number: vm.maxSubOrderNumber;
            var number =  _.isEmpty(vm.maxSubOrderNumber)? 0 :  parseInt(vm.maxSubOrderNumber) + 1;
            return _.isUndefined(number)? 0 : number;
        }
        function GetNextQuestionOrderNumber() {
            var number =  _.isEmpty(vm.maxOrderNumber)? 0 :  parseInt(vm.maxOrderNumber) + 1;
            return _.isUndefined(number)? 0 : number;
        }

    }


})(window.angular);