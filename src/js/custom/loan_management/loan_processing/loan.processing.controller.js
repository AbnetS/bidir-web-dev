/**
 * Created by Yonas on 4/27/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.processing")
        .controller("LoanProcessingController", LoanProcessingController);

    LoanProcessingController.$inject = ['LoanManagementService','AlertService','$scope','ClientService','$mdDialog','RouteHelpers'];

    function LoanProcessingController(LoanManagementService,AlertService,$scope,ClientService,$mdDialog,RouteHelpers ) {
        var vm = this;
        vm.screeningDetail = _screeningDetail;
        vm.backToList = _backToList;
        vm.saveScreeningForm = _saveScreeningForm;
        vm.questionValueChanged = questionValueChanged;

        vm.addClient = _addClient;

        vm.clientDetail = _clientDetail;

        vm.options = {
            rowSelection: true,
            multiSelect: true,
            autoSelect: true,
            decapitate: false,
            largeEditDialog: false,
            boundaryLinks: false,
            limitSelect: true,
            pageSelect: true
        };
        vm.filter = {show : false};
        vm.pageSizes = [10, 25, 50, 100, 250, 500];

        vm.query = {
            search:'',
            page:1,
            per_page:10
        };

        vm.paginate = function(page, pageSize) {
            console.log('Scope Page: ' + vm.query.page + ' Scope Limit: ' + vm.query.per_page);
            vm.query.page = page;
            vm.query.per_page = pageSize;
            callScreeningAPI();

        };
        vm.clearSearchText = function () {
            vm.query.search = '';
            vm.filter.show = false;
        };
        vm.searchScreening = function () {
            console.log("search text",vm.query.search);
        };

        $scope.$watch(angular.bind(vm, function () {
            return vm.query.search;
        }), function (newValue, oldValue) {
            if (newValue !== oldValue) {
                console.log("search for screening ",newValue);
            }
        });

        vm.visibility = {
            showScreeningDetail:false,
            showClientDetail:false,
            showLoanApplicationDetail:false,
            showACATDetail:false
        };

        initialize();

        function _clientDetail(client, ev) {
            console.log("Client detail",client);
        }

        function _addClient(ev) {
            $mdDialog.show({
                locals: {items: null},
                templateUrl: RouteHelpers.basepath('loan_management/client_management/client.dialog.html'),
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                hasBackdrop: false,
                escapeToClose: true,
                controller: 'ClientDialogController',
                controllerAs: 'vm'
            }).then(function (answer) {

            }, function () {
            });

        }

        function _screeningDetail(screening) {
            vm.selectedScreening = screening;
            console.log("screening detail");
            var client = screening.client;
            LoanManagementService.GetClientScreening(client._id).then(function (response) {
                vm.client = response.data;
                vm.visibility.showScreeningDetail = true;
                console.log("vm.client",vm.client);
            });
        }
        function _backToList(type) {
            switch(type){
                case 'SCREENING':
                    vm.visibility.showScreeningDetail = false;
                    break;
            }

        }
        function _saveScreeningForm(client,screening_status) {

            var status = _.find(SCREENING_STATUS,function (stat) {
                return stat.code === screening_status;
            });
            var screening = {
                status: status.code,
                questions: client.questions
            };

            // console.log("save screening status ", screening);

            LoanManagementService.SaveClientScreening(screening,client._id)
                .then(function (response) {
                    AlertService.showSuccess('Screening',"Successfully saved screening information  with status: " + status.name);
                    console.log("saved screening ", screening);
                },function (error) {
                    var message = error.data.error.message;
                    AlertService.showError("Error when saving screening",message);
                    console.log("error on saving screening ", error);
                });

        }

        function initialize() {
            callScreeningAPI();

            // ClientService.GetClients().then(function (response) {
            //     console.log("clients",response);
            //     vm.clients = response.data.docs;
            // });

        }
        function callScreeningAPI() {
            LoanManagementService.GetScreenings(vm.query).then(function (response) {
                console.log("client info",response);
                vm.screenings = response.data.docs;
                vm.query.total_pages = response.data.total_pages;
                vm.query.total_docs_count = response.data.total_docs_count;
                console.log("total_pages info",vm.query);
            });
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