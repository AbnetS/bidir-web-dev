/**
 * Created by Yoni on 12/3/2017.
 */
(function(angular) {
    'use strict';
    angular.module('app.welcomePage')

        .service('WelcomeService', WelcomeService);
    WelcomeService.$inject = ['$http', 'CommonService','AuthService'];

    function WelcomeService($http, CommonService,AuthService) {
        return {
            GetTasks: _getTasks,
            GetUserAccount:_getUserAccount,
            ChangeTaskStatus:_changeTaskStatus
        };

        function _getUserAccount(id){
            var httpConfig = {
                headers: {
                    'Authorization': 'Bearer ' + AuthService.GetToken(),
                    'Accept': 'application/json'
                }
            };
            return $http.get(CommonService.buildUrl(API.Service.Users,API.Methods.Users.Account) + '/' + id,httpConfig);
        }
        function _getTasks(){
            var httpConfig = {
                headers: {
                    'Authorization': 'Bearer ' + AuthService.GetToken(),
                    'Accept': 'application/json'
                }
            };
            return $http.get(CommonService.buildUrl(API.Service.Users,API.Methods.Tasks.GetAll),httpConfig);
        }
        function _changeTaskStatus(taskObj) {
            var httpConfig = {
                headers: {
                    'Authorization': 'Bearer ' + AuthService.GetToken(),
                    'Accept': 'application/json'
                }
            };
            return $http.put(CommonService.buildUrlWithParam(API.Service.Users,API.Methods.Tasks.Task,taskObj.taskId) + '/status',taskObj,httpConfig);
        }
    }

})(window.angular);