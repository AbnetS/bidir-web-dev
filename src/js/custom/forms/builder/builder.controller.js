/**
 * Created by Yoni on 1/29/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.forms").controller("FormBuilderController", FormBuilderController);

    FormBuilderController.$inject = ['FormService','$mdDialog','RouteHelpers','$stateParams'];

    function FormBuilderController(FormService,$mdDialog,RouteHelpers,$stateParams) {
        var vm = this;
        vm.addQuestion = _addQuestion;
        vm.saveForm = _saveForm;

        vm.formTypes = FormService.FormTypes;
        vm.isEdit = $stateParams.id !== "0";
        vm.formId = $stateParams.id;

        initialize();

        function _saveForm() {
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
                    vm.formData = response.data;
                },function (error) {
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
                    vm.formData = response.data;
                },function (error) {
                    console.log("error",error);
                });

            }

        }

        function _addQuestion(ev) {
            $mdDialog.show({
                locals: {data: vm.formData},
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
            if(vm.isEdit){
                FormService.GetForm(vm.formId).then(function (response) {
                    vm.formData = response.data;
                    vm.formData.selected_formType = getFormTypeObj(vm.formData.type);
                },function (error) {
                    console.log("error",error);
                });
            }else{
                vm.formData = {
                    has_sections:0,
                    layout:'TWO_COLUMNS'
                };
            }
        }

        function getFormTypeObj(code) {
            return _.first(_.filter(vm.formTypes,function (type) {
                return type.code === code;
            }));
        }



    }


})(window.angular);