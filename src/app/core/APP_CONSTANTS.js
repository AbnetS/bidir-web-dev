(function(angular) {
  "use strict";

  angular
    .module("bidirApp.core")
    .constant("_", window._)
    .constant("API_CONFIG", {
      Config: {
        BaseUrl: "http://35.185.118.191:18199" //REMOTE API
      },
      Methods: {
        Auth: {
          Login: "users/login",
        },
        MFI: "/MFIs/"
      }
    })
    .constant("APP_CONSTANTS", {
      USER_ROLES: {
        ALL: "*",
        ADMIN: "admin",
        BACKOFFICEUSER: "bkOffUser"
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
