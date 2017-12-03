/**
 * Created by Yoni on 12/3/2017.
 */
(function(angular) {
    "use strict";

    angular
        .module('app.welcomePage')
        .controller('WelcomeController', WelcomeController);

    WelcomeController.$inject = ['$mdDialog', 'WelcomeService'];

    function WelcomeController($mdDialog, WelcomeService ) {
        var vm = this;

        WelcomeService.GetTasks().then(function(response){
            console.log("tasks List",response);
            vm.taskList = response.data.docs;
        },function(error){
            console.log("error",error);
        });

    }

}(window.angular));