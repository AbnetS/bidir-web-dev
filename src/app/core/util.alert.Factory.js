(function () {
    'use strict';

    angular.module('bidirApp.core').factory('AlertService', AlertService);

    /**@ngInject */
    function AlertService($q) {
        init();

        return {
            showError: error,
            showInfo: info,
            showWarning: warning,
            showSuccess: success,
            errorHandler: errorHandler,
            showConfirm: showConfirm,
            showConfirmForDelete: showConfirmForDelete
        };

        function error(message, title) {
            swal({title: title, text: message, type: "error", confirmButtonText: "Ok", showCancelButton: false});
        }

        function info(message, title) {
            swal({title: title, text: message, type: "info", confirmButtonText: "Ok"});
        }

        function warning(message, title) {
            swal({title: title, text: message, type: "warning", confirmButtonText: "Ok"});
        }

        function showConfirm(message, title, confirmText, confirmationType, closeOnConfirm) {
            closeOnConfirm = typeof closeOnConfirm === "undefined" || typeof closeOnConfirm !== "boolean" ? true : closeOnConfirm;
            confirmationType = typeof confirmationType === "undefined" || typeof confirmationType !== "string" ? "warning" : confirmationType;

            return swal({
                    title: title,
                    text: message,
                    type: confirmationType,
                    showCancelButton: true,
                    confirmButtonColor: "#009688",
                    confirmButtonText: confirmText,
                    closeOnConfirm: closeOnConfirm,
                    showLoaderOnConfirm: true
                });
        }

        function showConfirmForDelete(message, title, confirmText, confirmationType, closeOnConfirm) {
            closeOnConfirm = typeof closeOnConfirm === "undefined" || typeof closeOnConfirm !== "boolean" ? true : closeOnConfirm;
            confirmationType = typeof confirmationType === "undefined" || typeof confirmationType !== "string" ? "warning" : confirmationType;

            return swal({
                    title: title,
                    text: message,
                    type: confirmationType,
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: confirmText,
                    closeOnConfirm: closeOnConfirm,
                    showLoaderOnConfirm: true
                });
        }

        function success(message, title) {
            // swal({title: title, text: message, type: "success", confirmButtonText: "Ok", showCancelButton: false});
            swal(title,message, "success");
        }

        function errorHandler(response) {
            var msg = 'Server was unable to process the request';
            var exMsg = '';

            if (response.data && response.data.Message)
                msg = response.data.Message;

            if (response.ExceptionMessage)
                msg = response.ExceptionMessage;

            if (response.data && response.data.ExceptionMessage)
                exMsg = response.data.ExceptionMessage;

            error(msg + ' ' + exMsg, "Error");
        }


        function init() {
            swal.setDefaults({confirmButtonColor: '#0096884'});
        }
    }

})();
