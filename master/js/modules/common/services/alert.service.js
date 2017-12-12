/**
 * Created by Yoni on 12/3/2017.
 */
(function () {
    'use strict';
    angular.module('app.core').factory('AlertService', AlertService);


    function AlertService(SweetAlert) {
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
            SweetAlert(title,message, "error");
        }
        function info(message, title) {
            SweetAlert(title,message, "info");
        }
        function warning(message, title) {
            SweetAlert({title: title, text: message, type: "warning", confirmButtonText: "Ok"});
        }
        function showConfirm(message, title, confirmText, confirmationType, closeOnConfirm) {
            closeOnConfirm = typeof closeOnConfirm === "undefined" || typeof closeOnConfirm !== "boolean" ? true : closeOnConfirm;
            confirmationType = typeof confirmationType === "undefined" || typeof confirmationType !== "string" ? "warning" : confirmationType;
            return SweetAlert({
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
            return SweetAlert({
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
            SweetAlert(title,message, "success");
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
            // SweetAlert.setDefaults({confirmButtonColor: '#0096884'});
        }
    }
})();