/**
 * Created by Yoni on 1/9/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.clients").controller("ClientDetailController", ClientDetailController);

    ClientDetailController.$inject = ['LoanManagementService','$stateParams','blockUI','PrintPreviewService'];

    function ClientDetailController(LoanManagementService,$stateParams,blockUI,PrintPreviewService) {
        var vm = this;
        vm.clientId =  $stateParams.id;
        vm.visibility = {showMoreClientDetail: false};
        vm.labelBasedOnStatusStyle = LoanManagementService.StyleLabelByStatus;

        vm.onTabSelected = _onTabSelected;
        vm.print = _print;
        vm.questionValueChanged = _questionValueChanged;

        initialize();


        function _print() {
            var preview = [{
                Name: "Screening",
                TemplateUrl: "app/views/loan_management/client_management/printables/client.screening.html",
                IsCommon: false,
                IsSelected: false,
                Data: angular.extend({ Title: "Screening" }, vm.client)
            }];
            PrintPreviewService.show(preview);
        }


        function initialize() {
            var myBlockUI = blockUI.instances.get('ClientBlockUI');
            myBlockUI.start();
            LoanManagementService.GetClientDetail(vm.clientId)
                .then(function(response){
                    myBlockUI.stop();
                    vm.client = response.data;
                    CallClientScreeningAPI();
                    console.log("client detail",response);
                },function(error){
                    myBlockUI.stop();
                    console.log("error getting client detail",error);
                });
        }

        function CallClientScreeningAPI() {
            var myBlockUI = blockUI.instances.get('ClientScreeningBlockUI');
            myBlockUI.start();
            LoanManagementService.GetClientScreening(vm.clientId).then(function (response) {
                myBlockUI.stop();
                vm.clientScreening = response.data;
                console.log("screening",vm.clientScreening);

            },function (error) {
                myBlockUI.stop();
                console.log("error fetching screening",error);
            });
        }

        function CallClientLoanApplicationAPI() {
            var myBlockUI = blockUI.instances.get('ClientLoanApplicationBlockUI');
            myBlockUI.start();
            LoanManagementService.GetClientLoanApplication(vm.clientId)
                .then(function (response) {
                    myBlockUI.stop();
                    vm.client.loan_application = response.data;
                    console.log("vm.client.loan_application",vm.client);
                },function (error) {
                    myBlockUI.stop();
                    console.log(" error .loan_application",error);
                });
        }

        function _onTabSelected(type) {
            console.log("tab name clicked",type);
            switch (type){
                case 'CLIENT':
                    console.log("tab name clicked",type);
                    break;
                case 'SCREENING':
                    CallClientScreeningAPI();
                    console.log("tab name clicked",type);
                    break;
                case 'LOAN_APPLICATION':
                    CallClientLoanApplicationAPI();
                    break;
                case 'ACAT':
                    console.log("tab name clicked",type);
                    break;
                default:
                    console.log("tab name clicked",type);
            }
        }

        function _questionValueChanged(question) {

            var prQues = getPrerequisiteQuestion(question._id);
            _.each(prQues, function(prQue) {
                if (prQue) {
                    var prerequisite = prQue.prerequisites[0];
                    //Set question's show based by comparing current value with expected preq. value
                    prQue.show = (prerequisite.answer === question.values[0]);
                }
            });

        }

        function getPrerequisiteQuestion(questionID) {
            //extract outer questions; if section type, get them from sections
            var questions = vm.clientScreening.has_sections ?
                _.reduce(vm.clientScreening.sections, function(m, q) {
                    return m.concat(q.questions);
                }, []) :
                vm.clientScreening.questions;

            //Get all subquestions
            var subQuestions = _.reduce(questions, function(m, q) {
                return m.concat(q.sub_questions);
            }, []);

            //merge questions with subquestions into a singl array
            var mergedQuestions = _.uniq(_.union(questions, subQuestions), false, _.property('_id'));

            //Search in mergedQuestions
            var prQue = _.filter(mergedQuestions, function(obj) {
                return _.some(obj.prerequisites, { question: questionID });
            });

            return prQue;
        }
    }


})(window.angular);