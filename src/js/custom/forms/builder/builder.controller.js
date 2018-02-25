/**
 * Created by Yoni on 1/29/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.forms").controller("FormBuilderController", FormBuilderController);

    FormBuilderController.$inject = ['FormService','$mdDialog','RouteHelpers','$stateParams','AlertService','blockUI'];

    function FormBuilderController(FormService,$mdDialog,RouteHelpers,$stateParams,AlertService,blockUI) {
        var vm = this;
        vm.isEdit = $stateParams.id !== "0";
        vm.formId = $stateParams.id;
        vm.formTypes = FormService.FormTypes;

        vm.addQuestion = _addQuestion;
        vm.editQuestion = _editQuestion;
        vm.saveForm = _saveForm;
        vm.typeStyle = _typeStyle;

        initialize();

        function _saveForm() {
            var myBlockUI = blockUI.instances.get('formBuilderBlockUI');
            myBlockUI.start();

            if(vm.isEdit){

                var editForm = {
                    _id:vm.formData._id,
                    title:vm.formData.title,
                    subtitle:vm.formData.subtitle,
                    purpose:vm.formData.purpose,
                    layout:vm.formData.layout,
                    has_sections:vm.formData.has_sections
                };

                FormService.UpdateForm(editForm).then(function (response) {
                    myBlockUI.stop();
                    vm.formData = response.data;
                    vm.formData.selected_formType = getFormTypeObj(vm.formData.type);
                    AlertService.showSuccess("Form Updated","Form updated successfully");
                },function (error) {
                    myBlockUI.stop();
                    var message = error.data.error.message;
                    AlertService.showError("Failed to Save Form",message);
                    console.log("error",error);
                });

            }else
                {

                var preparedForm = {
                    title:vm.formData.title,
                    subtitle:vm.formData.subtitle,
                    purpose:vm.formData.purpose,
                    layout:vm.formData.layout,
                    has_sections:vm.formData.has_sections,
                    type: vm.formData.selected_formType.code,
                    questions: []
                };

                FormService.CreateForm(preparedForm).then(function (response) {
                    myBlockUI.stop();
                    vm.formData = response.data;
                    vm.formData.selected_formType = getFormTypeObj(vm.formData.type);
                    AlertService.showSuccess("Form Saved","Form saved successfully");
                },function (error) {
                    myBlockUI.stop();
                    var message = error.data.error.message;
                    AlertService.showError("Failed to Save Form",message);
                    console.log("error",error);
                });

            }

        }

        function _editQuestion(question,ev) {
            $mdDialog.show({
                locals: {data: {question:question,form: {_id: vm.formData._id},number:vm.maxOrderNumber}},
                templateUrl: RouteHelpers.basepath('forms/question.builder.html'),
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                hasBackdrop: false,
                escapeToClose: true,
                controller: 'QuestionBuilderController',
                controllerAs: 'vm'
            }).then(function (answer) {
                callAPI();
            }, function () {
            });
        }

        function _addQuestion(ev) {

            $mdDialog.show({
                locals: {data: {question:null,form: {_id: vm.formData._id},number:vm.maxOrderNumber}},
                templateUrl: RouteHelpers.basepath('forms/question.builder.html'),
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                hasBackdrop: false,
                escapeToClose: true,
                controller: 'QuestionBuilderController',
                controllerAs: 'vm'
            }).then(function (answer) {
                callAPI();
            }, function () {
            });

        }

        function initialize() {

            if(vm.isEdit){
                callAPI();
            }else{
                vm.formData = {
                    has_sections:0,
                    layout:'TWO_COLUMNS'
                };
            }
        }

        function callAPI() {
            var myBlockUIOnStart = blockUI.instances.get('formBuilderBlockUI');
            myBlockUIOnStart.start();
            FormService.GetForm(vm.formId).then(function (response) {
                vm.formData = response.data;
                vm.maxOrderNumber = _.max(vm.formData.questions,function (qn) {
                    return qn.number;
                }).number;
                vm.formData.selected_formType = getFormTypeObj(vm.formData.type);
                console.log("sections",vm.formData);
                // if(vm.formData.has_sections){
                //
                // }
                myBlockUIOnStart.stop();
            },function (error) {
                myBlockUIOnStart.stop();
                console.log("error",error);
            });
        }

        function getFormTypeObj(code) {
            return _.first(_.filter(vm.formTypes,function (type) {
                return type.code === code;
            }));
        }

        function _typeStyle(type){
            var style = '';
            switch (type.trim()){
                case 'Fill In Blank':
                case 'FILL_IN_BLANK':
                    style =  'label bg-green';
                    break;
                case 'Yes/No':
                case 'YES_NO':
                    style =  'label bg-info';
                    break;
                case 'GROUPED':
                    style =  'label bg-purple';
                    break;
                case 'SINGLE_CHOICE':
                    style =  'label bg-primary';
                    break;
                case 'MULTIPLE_CHOICE':
                    style =  'label bg-pink';
                    break;
                default:
                    style =  'label bg-inverse';
            }
            return style;
        }

    }


})(window.angular);