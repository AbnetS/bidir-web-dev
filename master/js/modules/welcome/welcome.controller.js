/**
 * Created by Yoni on 12/3/2017.
 */
(function(angular) {
    "use strict";

    angular
        .module('app.welcomePage')
        .controller('WelcomeController', WelcomeController);

    WelcomeController.$inject = ['$mdDialog', 'WelcomeService','RouteHelpers'];

    function WelcomeController($mdDialog, WelcomeService ,RouteHelpers) {
        var vm = this;
        vm.viewTaskDetail = _viewTaskDetail;

        WelcomeService.GetTasks().then(function(response){
            // console.log("tasks List",response);
            vm.taskList = response.data.docs;
        },function(error){
            console.log("error",error);
        });


        function _viewTaskDetail(task,ev){
            WelcomeService.GetUserAccount(task.entity_ref).then(function(response){
                vm.userInfo = response.data.docs;
                $mdDialog.show({
                    locals: {items: {taskInfo:task,user:vm.userInfo}},
                    templateUrl: RouteHelpers.basepath('task.detail.html'),
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    hasBackdrop: false,
                    escapeToClose: true,
                    controller: 'TaskDetailController',
                    controllerAs: 'vm'
                }).then(function (answer) {}, function () {});
            },function(error){
                console.log("error",error);
            });


        }
    }

}(window.angular));