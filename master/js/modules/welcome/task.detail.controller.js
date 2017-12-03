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

        WelcomeService.GetUserAccount(vm.task.entity_ref).then(function(response){
            console.log("task related user",response);
            vm.userInfo = response.data;

        },function(error){
            console.log("error",error);
        });

        function _approveUser(task) {

        }
        function _declineUser(task) {

        }
        function _cancel() {
            $mdDialog.cancel();
        }
    }

}(window.angular));