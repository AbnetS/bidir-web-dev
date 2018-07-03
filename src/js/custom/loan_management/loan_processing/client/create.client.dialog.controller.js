/**
 * Created by Yonas on 5/7/2018.
 */

(function(angular) {
    'use strict';

    angular.module('app.processing')
        .controller('ClientDialogController', ClientDialogController);

    ClientDialogController.$inject = ['$mdDialog','items','AlertService','CommonService','MainService','blockUI'];

    function ClientDialogController($mdDialog, items,AlertService,CommonService,MainService,blockUI) {
        var vm = this;
        vm.cancel = _cancel;
        vm.isEdit = items !== null;

        init();

        function _cancel() {
            $mdDialog.cancel();
        }

        function init(){

        }
    }



})(window.angular);