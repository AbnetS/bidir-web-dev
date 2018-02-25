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
        vm.removeOption = _removeOption;

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
                measurement_unit: !_.isUndefined(vm.question.measurement_unit)? vm.question.measurement_unit:null,
                form:vm.form._id,
                number:GetNextQuestionOrderNumber()
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

            vm.isEdit = data.question !== null;
            vm.form = data.form;
            vm.maxOrderNumber = data.number;

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
        function _removeOption(option) {
            var index = vm.question.options.indexOf(option);
            if(index !== -1){
                vm.question.options.splice(index,1);
            }
        }

        function _addSubQuestion() {
            vm.showSubQuestion = true;
        }

        function _saveSubQuestion() {

            var myBlockUI = blockUI.instances.get('SubQuestionBuilderBlockUI');
            myBlockUI.start();

            var subQuestion = {
                question_text:vm.sub_question.question_text,
                parent_question:vm.question._id,
                remark:vm.question.remark,
                required:vm.question.required,
                show:vm.question.show,
                form:vm.form._id,
                measurement_unit: !_.isUndefined(vm.sub_question.measurement_unit)? vm.sub_question.measurement_unit:null,
                validation_factor: _.isUndefined(vm.sub_question.selected_validation)?'NONE':vm.sub_question.selected_validation.name,
                sub_question_type: 'fib',
                number:setSubQuestionOrderNumber()
            };




            FormService.CreateQuestion(subQuestion,subQuestion.sub_question_type).then(function (response) {
                console.log("sub question created",response);
                myBlockUI.stop();
                vm.question.sub_questions.push(response.data);
                vm.showSubQuestion = false;
                vm.sub_question = {};
            },function (error) {
                myBlockUI.stop();
                vm.showSubQuestion = false;
                console.log("sub question error create",error);
            });


        }

        function _questionTypeChanged() {
            // if(vm.question.selected_type.code === QUESTION_TYPE.GROUPED && !vm.isEdit){
            //     vm.showSubQuestion = true;
            // }
        }

        function setSubQuestionOrderNumber() {
            var maxNo = _.max(vm.question.sub_questions,function(sub){
                return sub.number;
            });

            var number =  _.isEmpty(maxNo)? 0 :  parseInt(maxNo.number) + 1;
            return _.isUndefined(number)? 0 : number;
        }

        /**
         * @return {number}
         */
        function GetNextQuestionOrderNumber() {
            var number =  _.isEmpty(vm.maxOrderNumber)? 0 :  parseInt(vm.maxOrderNumber) + 1;
            return _.isUndefined(number)? 0 : number;
        }
    }


})(window.angular);