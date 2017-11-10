(function(angular) {
  "use strict";

  angular
    .module("bidirApp.core")
    .constant("_", window._)
    .constant("APP_CONSTANTS", {
      USER_ROLES: {
        ALL: "*",
        ADMIN: "admin",
      },
      StorageKey: {
        TOKEN: "token",
        SESSION: "SESSION"
      },
      AUTH_EVENTS: {
        loginSuccess: "auth-login-success",
        loginFailed: "auth-login-failed",
        logoutSuccess: "auth-logout-success",
        sessionTimeout: "auth-session-timeout",
        notAuthenticated: "auth-not-authenticated",
        notAuthorized: "auth-not-authorized"
      }
    });
})(window.angular);
