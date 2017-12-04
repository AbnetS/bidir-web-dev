/**
 * Created by Yoni on 12/3/2017.
 */
(function(angular) {
    "use strict";

    angular
        .module('app.welcomePage')
        .controller('TaskDetailController', TaskDetailController);

    TaskDetailController.$inject = ['$mdDialog', 'WelcomeService','items'];

    function TaskDetailController($mdDialog, WelcomeService ,items) {
        var vm = this
        vm.cancel = _cancel;
        vm.approveUser = _approveUser;
        vm.declineUser = _declineUser;
        vm.task = items.taskInfo;
        console.log("task ",vm.task);
        WelcomeService.GetUserAccount(vm.task.entity_ref).then(function(response){
            // console.log("task related user",response);
            vm.userInfo = response.data;

        },function(error){
            console.log("error",error);
        });

        function _approveUser() {
            var task = {
                taskId:vm.task._id ,
                status: "approved",
                comment: angular.isUndefined(vm.task.comment)?"no comment":vm.task.comment
            };
            updateStatus(task);
        }

        function _declineUser() {
            var task = {
                taskId:vm.task._id ,
                status: "declined",
                comment: angular.isUndefined(vm.task.comment)?"no comment":vm.task.comment
            };
            updateStatus(task);
        }

        function updateStatus(task){
            WelcomeService.ChangeTaskStatus(task).then(
                function(response) {
                    console.log("task updated",response);
                    $mdDialog.hide();
                },
                function(error) {
                    console.log("could not be updated", error);
                }
            );
        }
        function _cancel() {
            $mdDialog.cancel();
        }
    }

}(window.angular));