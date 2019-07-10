(function (angular) {
    "use strict";

    angular
        .module('app.common')
        .constant("_", window._)
        .constant("APP_CONSTANTS", {
            USER_ROLES: {
                ALL: "*",
                ADMIN: "admin"
            },
            StorageKey: {
                TOKEN: "token",
                SESSION: "SESSION",
                PERMISSIONS: "PERMISSIONS",
                ACCESS_BRANCHES: "ACCESS_BRANCHES"
            },
            AUTH_EVENTS: {
                loginSuccess: "auth-login-success",
                loginFailed: "auth-login-failed",
                logoutSuccess: "auth-logout-success",
                logoutUser: "auth-logout-user",
                sessionTimeout: "auth-session-timeout",
                notAuthenticated: "auth-not-authenticated",
                notAuthorized: "auth-not-authorized"
            },
            REDIRECT_TO_URL: "redirectToUrlAfterLogin",
            FILE_TYPE: {
                PDF: {type: 'application/pdf'},
                DOC: {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'},
                EXCEL: {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}
            }
        });
})(window.angular);
