/**
 * Created by Yoni on 3/30/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.loan_management").controller("ScreeningController", ScreeningController);

    ScreeningController.$inject = ['LoanManagementService'];

    function ScreeningController(LoanManagementService) {
        var vm = this;
        vm.screeningDetail = _screeningDetail;
        vm.visibility = {
            showScreeningDetail:false,
            showClientDetail:false,
            showLoanApplicationDetail:false,
            showACATDetail:false
        };

        function _screeningDetail(screening) {
            var client = screening.client;
            LoanManagementService.GetClientScreening(client._id).then(function (response) {
                vm.client = response.data;
                vm.visibility.showScreeningDetail = true;
                console.log("vm.client",vm.client);
            });
        }

        LoanManagementService.GetScreenings().then(function (response) {
            console.log("client info",response);
            vm.screenings = response.data.docs;
        });

        vm.saveForm = saveForm;
        vm.questionValueChanged = questionValueChanged;

        function saveForm() {
            console.log(" vm.client", vm.client);
        }

        function questionValueChanged(question) {

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
            var questions = vm.client.has_sections ?
                _.reduce(vm.client.sections, function(m, q) {
                    return m.concat(q.questions);
                }, []) :
                vm.client.questions;

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