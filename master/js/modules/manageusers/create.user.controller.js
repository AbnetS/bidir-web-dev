/**
 * Created by Yoni on 12/2/2017.
 */
/**
 * Created by Yoni on 11/30/2017.
 */

(function(angular) {
    "use strict";

    angular
        .module('app.manage_users')
        .controller('CreateUserController', CreateUserController);

    CreateUserController.$inject = ['$scope','ManageUserService'];
    function CreateUserController($scope, ManageUserService) {
        var vm = this;

        vm.branches = [
            { _id:1, name: 'Head Office',  location: 'Addis Ababa',branch_type:'Rural' },
            { _id:2, name: 'Meki Branch',  location: 'Meki',branch_type:'Urban' },
            { _id:3, name: 'Third Branch', location: 'somewhere',branch_type:'Satellite' }
        ];

        vm.clear = function() {
            vm.dt = null;
        };
        vm.dateOptions = {
            dateDisabled: false,
            formatYear: "yy",
            maxDate: new Date(2020, 5, 22),
            startingDay: 1
        };
        vm.openDatePicker = function() {
            vm.popup1.opened = true;
        };
        vm.format = "dd-MMMM-yyyy";
        vm.altInputFormats = ["d!/M!/yyyy"];
        vm.popup1 = {
            opened: false
        };
    }
})(window.angular);

