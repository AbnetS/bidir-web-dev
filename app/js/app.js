/*!
 * 
 * Angle - Bootstrap Admin App + AngularJS Material
 * 
 * Version: 3.8.1
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 * 
 */

// APP START
// ----------------------------------- 

(function() {
    'use strict';

    appRun.$inject = ["$rootScope", "AuthService", "$http", "$location"];
    angular
        .module('angle', [
            'app.core',
            'app.routes',
            'app.sidebar',
            'app.navsearch',
            'app.preloader',
            'app.loadingbar',
            'app.translate',
            'app.settings',
            'app.maps',
            'app.utils',
            'app.material',
            'app.common',
            'app.auth',
            'app.manage_users',
            'app.manage_roles',
            'app.welcomePage',
            'app.mfi'
        ]).run(appRun);

    function appRun($rootScope, AuthService, $http,$location){
            //TODO: redirect them to an access denied state if they do not have authorization to access it.
            console.log("angle app run");
            $rootScope.currentUser = AuthService.GetCurrentUser();
           

        //Angular UI router state changes
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
            
            if ($rootScope.currentUser !== null) {
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + AuthService.GetToken();
            }
            else{
                // console.log("tostate",toState);
                //Clear storage and redirect
                $location.path('/page/login');
            }
        });
    }
        
})();


(function() {
    'use strict';

    angular
        .module('app.auth', [])
        .run(runBlock)
        .config(routeConfig);

    function runBlock() { console.log("auth run"); }

    function routeConfig() {console.log("auth config");}


})();
(function() {
    'use strict';

    angular
        .module('app.colors', []);
})();
(function(angular) {
  "use strict";

  angular
    .module("app.common", [])
      .config(routeConfig)
      .run(runBlock);

  function runBlock() {
    console.log("common run");
  }

  function routeConfig() {console.log("common config");}
})(window.angular);

(function() {
    'use strict';

    angular
        .module('app.core', [
            'ngRoute',
            'ngAnimate',
            'ngStorage',
            'ngCookies',
            'pascalprecht.translate',
            'ui.bootstrap',
            'ngSanitize',
            'ui.router',
            'oc.lazyLoad',
            'cfp.loadingBar',
            'ngResource',
            'ui.utils',
            'ngAria',
            'ngMessages'
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.lazyload', []);
})();
(function() {
    'use strict';

    angular
        .module('app.loadingbar', []);
})();
/**
 * Created by Yoni on 11/30/2017.
 */
(function() {
    'use strict';

    angular
        .module('app.manage_roles', [])
        .run(runBlock)
        .config(routeConfig);

    function runBlock() { console.log("RM run"); }

    function routeConfig() {console.log("RM config");}

})();
/**
 * Created by Yoni on 11/30/2017.
 */
(function() {
    'use strict';

    angular
        .module('app.manage_users', []).config(configUM).run(runUM);

    function runUM() {
        console.log("UM run");
    }
    function configUM() {
        console.log("UM config");
    }



})();
(function() {
    'use strict';

    angular
        .module('app.maps', []);
})();
(function() {
    'use strict';

    angular
        .module('app.material', [
            'ngMaterial'
          ]);
})();
(function() {
    'use strict';

    angular
        .module('app.navsearch', []);
})();
(function() {
    'use strict';

    angular
        .module('app.preloader', []);
})();


(function() {
    'use strict';

    angular
        .module('app.routes', [
            'app.lazyload'
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.settings', []);
})();
(function() {
    'use strict';

    angular
        .module('app.sidebar', []);
})();
(function() {
    'use strict';

    angular
        .module('app.utils', [
          'app.colors'
          ]);
})();

(function() {
    'use strict';

    angular
        .module('app.translate', []);
})();
/**
 * Created by Yoni on 12/3/2017.
 */

(function() {
    'use strict';

    angular
        .module('app.welcomePage', []);

})();
(function(angular) {
    'use strict';
    angular.module('app.auth')

    .service('AuthService', AuthService);

     AuthService.$inject = ['$http', 'StorageService', 'CommonService', 'APP_CONSTANTS', '$rootScope', '$state'];

    function AuthService($http, StorageService, CommonService, APP_CONSTANTS, $rootScope, $state) {

        return {
            login: _login,
            Logout: logout,
            GetCredentials: getCredentials,
            SetCredentials: setCredentials,
            GetToken: getToken,
            GetCurrentUser:_getCurrentUser,
            GetAccessBranches:_getAccessBranches,
            IsSuperuser:isSuper
        };



        function getCredentials() {
            return !angular.isUndefined(StorageService.Get(APP_CONSTANTS.StorageKey.SESSION)) ? StorageService.Get(APP_CONSTANTS.StorageKey.SESSION) : null;
        }

        function setCredentials(session) {
            StorageService.Set(APP_CONSTANTS.StorageKey.SESSION, session);
        }

        function getToken() {
            return StorageService.Get(APP_CONSTANTS.StorageKey.SESSION).token;
        }


        function _getCurrentUser(){
          var credential = getCredentials();
          return credential !== null? credential.user: null;
        }
        function _getAccessBranches() {
            var credential = getCredentials();
            return credential !== null ?  !isSuper()? credential.user.account.access_branches : [] :null;
        }

        function isSuper() {
            var credential = getCredentials();
            return credential.user.username === 'super@bidir.com';
        }

        function _login(user) {
          return $http.post(CommonService.buildUrl(API.Service.Auth,API.Methods.Auth.Login), user);
        }

        function logout() {
            StorageService.Reset();
            $rootScope.currentUser = null;
            $rootScope.$broadcast(APP_CONSTANTS.AUTH_EVENTS.logoutSuccess);
            $state.go('page.login');
        }

    }

})(window.angular);

/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

(function(angular) {
    "use strict";

    angular
        .module('app.auth')
        .controller('LoginFormController', LoginFormController);

    LoginFormController.$inject = ['AuthService', '$state',  '$rootScope',  'APP_CONSTANTS',  'blockUI', 'AlertService'];

    function LoginFormController( AuthService,  $state, $rootScope,  APP_CONSTANTS, blockUI,AlertService
    ) {
        var vm = this;
        vm.userValidator = {
            usernameMin: 4,
            usernameMax: 20,
            passwordMin: 6
        };
        vm.user = {};

        vm.login = function() {
            var myBlockUI = blockUI.instances.get('loginFormBlockUI');
            myBlockUI.start("Logging in");
            AuthService.login(vm.user).then(
                function(response) {
                    var result = response.data;
                    vm.user = result.user;
                    $rootScope.currentUser = vm.user;
                    $rootScope.$broadcast(APP_CONSTANTS.AUTH_EVENTS.loginSuccess);
                    AuthService.SetCredentials(result);
                    myBlockUI.stop();
                    console.log('logged in user',vm.user);

                    $state.go("app.welcome");
                    //TODO: if no mfi redirect to mfi registration page
                    // CheckMFIAndRedirect();
                },
                function(error) {
                    myBlockUI.stop();
                    console.log("error", error);
                    AlertService.showError("Error on Login", "The username or password is incorrect! Please try again.");
                    $rootScope.$broadcast(APP_CONSTANTS.AUTH_EVENTS.loginFailed);
                }
            );

            function CheckMFIAndRedirect(){
                MainService.GetMFI().then(
                    function(response) {
                        debugger
                        if (response.data.length > 0) {
                            $state.go("index.branch");
                            toastr.success(
                                "Welcome Back " +
                                vm.user.admin.first_name ,
                                "Success"
                            );
                        }else{
                            $state.go("home.mfi");
                            toastr.success(
                                "Welcome " +
                                vm.user.admin.first_name +
                                " " +
                                vm.user.admin.last_name +
                                " to Bidir Web App",
                                "Success"
                            );
                        }
                    },
                    function(error) {
                        console.log("error", error);
                        toastr.error(
                            "Error occured while trying to connect! Please try again.",
                            "ERROR!"
                        );
                    }
                );
            }

        };
    }
})(window.angular);


(function() {
    'use strict';

    angular
        .module('app.colors')
        .constant('APP_COLORS', {
          'primary':                '#3F51B5',
          'success':                '#4CAF50',
          'info':                   '#2196F3',
          'warning':                '#FF9800',
          'danger':                 '#F44336',
          'inverse':                '#607D8B',
          'green':                  '#009688',
          'pink':                   '#E91E63',
          'purple':                 '#673AB7',
          'dark':                   '#263238',
          'yellow':                 '#FFEB3B',
          'gray-darker':            '#232735',
          'gray-dark':              '#3a3f51',
          'gray':                   '#dde6e9',
          'gray-light':             '#e4eaec',
          'gray-lighter':           '#edf1f2'
        })
        ;
})();
/**=========================================================
 * Module: colors.js
 * Services to retrieve global colors
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.colors')
        .service('Colors', Colors);

    Colors.$inject = ['APP_COLORS'];
    function Colors(APP_COLORS) {
        this.byName = byName;

        ////////////////

        function byName(name) {
          return (APP_COLORS[name] || '#fff');
        }
    }

})();

(function(angular) {
  "use strict";

  angular
    .module('app.common')
    .constant("_", window._)
    .constant("APP_CONSTANTS", {
      USER_ROLES: {
        ALL: "*",
        ADMIN: "admin",
      },
      StorageKey: {
        TOKEN: "token",
        SESSION: "SESSION",
        PERMISSIONS:"PERMISSIONS",
        ACCESS_BRANCHES:"ACCESS_BRANCHES"
      },
      AUTH_EVENTS: {
        loginSuccess: "auth-login-success",
        loginFailed: "auth-login-failed",
        logoutSuccess: "auth-logout-success",
        logoutUser: "auth-logout-user",
        sessionTimeout: "auth-session-timeout",
        notAuthenticated: "auth-not-authenticated",
        notAuthorized: "auth-not-authorized"
      }
    });
})(window.angular);

/**
 * Created by Yoni on 12/30/2017.
 */
//Directive

(function(angular) {

    'use strict';

    angular.module('app.common')
        .directive('userpermission', ["PermissionService", function(PermissionService) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                scope.$watch(attrs.userpermission, function(value) {
                    var permission = value;
                    var hasPermission = false;
                    if (_.isString(permission)) {
                        hasPermission = PermissionService.hasThisPermission(permission);
                    } else if (_.isArray(permission)) {
                        hasPermission = PermissionService.hasThesePermissions(permission); //multiple permissions
                    }

                    toggleVisibility(hasPermission);
                });

                function toggleVisibility(hasPermission) {
                    if (hasPermission) {
                        element.show();
                    } else {
                        element.hide();
                    }
                }
            }
        };
    }]);



})(window.angular);



/**
 * Created by Yoni on 12/14/2017.
 */
(function(angular) {
    'use strict';
    angular.module('app.common').filter('ReplaceUnderscore', function () {
    return function (input) {
        return input.replace(/_/g, ' ');
    };
});

})(window.angular);
var API = {
    Config: {
        BaseUrl: 'http://api.terrafina.bidir.gebeya.io/' //REMOTE API
    },
    Service: {
        NONE:'',
        MFI: 'MFI',
        Auth: 'auth',
        Users: 'users',
        SCREENING:'screenings'
    },
    Methods: {
        Auth: {
            Login: 'login'
        },
        MFI: {
            MFIUpdate:'',
            MFI:'create',
            GetAll:'all',
            Branches: 'branches',
            CreateBranch: 'branches/create'

        },
        Users: {
            Account:'accounts',
            UserUpdate:'',
            User:'create',
            GetAll: '',
            Roles: 'roles',
            Role: 'roles/create'
        },
        Roles:{
            GetAll: 'roles',
            Create: 'roles/create',
            Permissions: 'permissions',
            PermissionByGroup: 'permissions/groups'
        },
        Tasks: {
            Task:'tasks',
            GetAll: 'tasks/paginate?page=1&per_page=100'
        },
        Clients:{
            All:'clients/paginate?source=web',
            Client:'clients',
            SearchClient:''
        }
    }
};



(function() {
    'use strict';

    angular
        .module('app.core')
        .config(coreConfig);

    coreConfig.$inject = ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$animateProvider'];
    function coreConfig($controllerProvider, $compileProvider, $filterProvider, $provide, $animateProvider){

      var core = angular.module('app.core');
      // registering components after bootstrap
      core.controller = $controllerProvider.register;
      core.directive  = $compileProvider.directive;
      core.filter     = $filterProvider.register;
      core.factory    = $provide.factory;
      core.service    = $provide.service;
      core.constant   = $provide.constant;
      core.value      = $provide.value;

      // Disables animation on items with class .ng-no-animation
      $animateProvider.classNameFilter(/^((?!(ng-no-animation)).)*$/);

      // Improve performance disabling debugging features
      // $compileProvider.debugInfoEnabled(false);

    }

})();
/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('APP_MEDIAQUERY', {
          'desktopLG':             1200,
          'desktop':                992,
          'tablet':                 768,
          'mobile':                 480
        })
      ;

})();
(function() {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    appRun.$inject = ['$rootScope', '$state', '$stateParams',  '$window', '$templateCache', 'Colors'];
    
    function appRun($rootScope, $state, $stateParams, $window, $templateCache, Colors) {
      
      // Set reference to access them from any scope
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      $rootScope.$storage = $window.localStorage;

      // Uncomment this to disable template cache
      /*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
          if (typeof(toState) !== 'undefined'){
            $templateCache.remove(toState.templateUrl);
          }
      });*/

      // Allows to use branding color with interpolation
      // {{ colorByName('primary') }}
      $rootScope.colorByName = Colors.byName;

      // cancel click event easily
      $rootScope.cancel = function($event) {
        $event.stopPropagation();
      };

      // Hooks Example
      // ----------------------------------- 

      // Hook not found
      $rootScope.$on('$stateNotFound',
        function(event, unfoundState/*, fromState, fromParams*/) {
            console.log(unfoundState.to); // "lazy.state"
            console.log(unfoundState.toParams); // {a:1, b:2}
            console.log(unfoundState.options); // {inherit:false} + default options
        });
      // Hook error
      $rootScope.$on('$stateChangeError',
        function(event, toState, toParams, fromState, fromParams, error){
          console.log(error);
        });
      // Hook success
      $rootScope.$on('$stateChangeSuccess',
        function(/*event, toState, toParams, fromState, fromParams*/) {
          // display new view from top
          $window.scrollTo(0, 0);
          // Save the route title
          $rootScope.currTitle = $state.current.title;
        });

      // Load a title dynamically
      $rootScope.currTitle = $state.current.title;
      $rootScope.pageTitle = function() {
        var title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
        document.title = title;
        return title;
      };      

    }

})();


(function() {
    'use strict';

    angular
        .module('app.lazyload')
        .config(lazyloadConfig);

    lazyloadConfig.$inject = ['$ocLazyLoadProvider', 'APP_REQUIRES'];
    function lazyloadConfig($ocLazyLoadProvider, APP_REQUIRES){

      // Lazy Load modules configuration
      $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: APP_REQUIRES.modules
      });

    }
})();
(function() {
    'use strict';

    angular
        .module('app.lazyload')
        .constant('APP_REQUIRES', {
          // jQuery based and standalone scripts
          scripts: {
            'whirl':              ['vendor/whirl/dist/whirl.css'],
            'animo':              ['vendor/animo.js/animo.js'],
            'fastclick':          ['vendor/fastclick/lib/fastclick.js'],
            'modernizr':          ['vendor/modernizr/modernizr.custom.js'],
            'animate':            ['vendor/animate.css/animate.min.css'],
            'skycons':            ['vendor/skycons/skycons.js'],
            'icons':              ['vendor/fontawesome/css/font-awesome.min.css',
                                   'vendor/simple-line-icons/css/simple-line-icons.css'],
            'weather-icons':      ['vendor/weather-icons/css/weather-icons.min.css',
                                   'vendor/weather-icons/css/weather-icons-wind.min.css'],
            'sparklines':         ['vendor/sparkline/index.js'],
            'wysiwyg':            ['vendor/bootstrap-wysiwyg/bootstrap-wysiwyg.js',
                                   'vendor/bootstrap-wysiwyg/external/jquery.hotkeys.js'],
            'slimscroll':         ['vendor/slimScroll/jquery.slimscroll.min.js'],
            'screenfull':         ['vendor/screenfull/dist/screenfull.js'],
            'vector-map':         ['vendor/ika.jvectormap/jquery-jvectormap-1.2.2.min.js',
                                   'vendor/ika.jvectormap/jquery-jvectormap-1.2.2.css'],
            'vector-map-maps':    ['vendor/ika.jvectormap/jquery-jvectormap-world-mill-en.js',
                                   'vendor/ika.jvectormap/jquery-jvectormap-us-mill-en.js'],
            'loadGoogleMapsJS':   ['vendor/load-google-maps/load-google-maps.js'],
            'flot-chart':         ['vendor/flot/jquery.flot.js'],
            'flot-chart-plugins': ['vendor/flot.tooltip/js/jquery.flot.tooltip.min.js',
                                   'vendor/flot/jquery.flot.resize.js',
                                   'vendor/flot/jquery.flot.pie.js',
                                   'vendor/flot/jquery.flot.time.js',
                                   'vendor/flot/jquery.flot.categories.js',
                                   'vendor/flot-spline/js/jquery.flot.spline.min.js'],
            'moment' :            ['vendor/moment/min/moment-with-locales.min.js'],
            'inputmask':          ['vendor/jquery.inputmask/dist/jquery.inputmask.bundle.js'],
            'flatdoc':            ['vendor/flatdoc/flatdoc.js'],
            'codemirror':         ['vendor/codemirror/lib/codemirror.js',
                                   'vendor/codemirror/lib/codemirror.css'],
            // modes for common web files
            'codemirror-modes-web': ['vendor/codemirror/mode/javascript/javascript.js',
                                     'vendor/codemirror/mode/xml/xml.js',
                                     'vendor/codemirror/mode/htmlmixed/htmlmixed.js',
                                     'vendor/codemirror/mode/css/css.js'],
            'taginput' :          ['vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.css',
                                   'vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js'],
            'filestyle':          ['vendor/bootstrap-filestyle/src/bootstrap-filestyle.js'],
            'morris':             ['vendor/raphael/raphael.js',
                                   'vendor/morris.js/morris.js',
                                   'vendor/morris.js/morris.css'],
            'loaders.css':          ['vendor/loaders.css/loaders.css'],
            'spinkit':              ['vendor/spinkit/css/spinkit.css'],
            'underscore':           ['vendor/underscore/underscore.js'],
            'selectize':           ['vendor/selectize/dist/css/selectize.default.css']
          },
          // Angular based script (use the right module name)
          modules: [

            {name: 'md.data.table',
                                                files: ['vendor/angular-material-data-table/dist/md-data-table.min.css',
                                                        'vendor/angular-material-data-table/dist/md-data-table.min.js'] },
              {name: 'blockUI',
                  files: ["vendor/angular-block-ui/dist/angular-block-ui.css",
                      "vendor/angular-block-ui/dist/angular-block-ui.js"] },
            {name: 'ngFileUpload',
                  files: ['vendor/ng-file-upload-shim/ng-file-upload-shim.min.js'] },
            {name: 'toaster',                   files: ['vendor/ng-file-upload/ng-file-upload.min.js',
                                                       'vendor/angularjs-toaster/toaster.css']},
            {name: 'localytics.directives',     files: ['vendor/chosen_v1.2.0/chosen.jquery.min.js',
                                                       'vendor/chosen_v1.2.0/chosen.min.css',
                                                       'vendor/angular-chosen-localytics/dist/angular-chosen.js'],
                                                        serie: true},
            {name: 'ngDialog',                  files: ['vendor/ngDialog/js/ngDialog.min.js',
                                                       'vendor/ngDialog/css/ngDialog.min.css',
                                                       'vendor/ngDialog/css/ngDialog-theme-default.min.css'] },
            {name: 'ngWig',                     files: ['vendor/ngWig/dist/ng-wig.min.js'] },
            {name: 'ngTable',                   files: ['vendor/ng-table/dist/ng-table.min.js',
                                                        'vendor/ng-table/dist/ng-table.min.css']},
            {name: 'ngTableExport',             files: ['vendor/ng-table-export/ng-table-export.js']},
            {name: 'angularBootstrapNavTree',   files: ['vendor/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
                                                        'vendor/angular-bootstrap-nav-tree/dist/abn_tree.css']},
            {name: 'xeditable',                 files: ['vendor/angular-xeditable/dist/js/xeditable.js',
                                                        'vendor/angular-xeditable/dist/css/xeditable.css']},
            {name: 'angularFileUpload',         files: ['vendor/angular-file-upload/dist/angular-file-upload.js']},
            {name: 'ngImgCrop',                 files: ['vendor/ng-img-crop/compile/unminified/ng-img-crop.js',
                                                        'vendor/ng-img-crop/compile/unminified/ng-img-crop.css']},
            {name: 'ui.select',                 files: ['vendor/angular-ui-select/dist/select.js',
                                                        'vendor/angular-ui-select/dist/select.css']},
            {name: 'ui.codemirror',             files: ['vendor/angular-ui-codemirror/ui-codemirror.js']},
            {name: 'angular-carousel',          files: ['vendor/angular-carousel/dist/angular-carousel.css',
                                                        'vendor/angular-carousel/dist/angular-carousel.js']},
            {name: 'infinite-scroll',           files: ['vendor/ngInfiniteScroll/build/ng-infinite-scroll.js']},
            {name: 'ui.bootstrap-slider',       files: ['vendor/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js',
                                                        'vendor/seiyria-bootstrap-slider/dist/css/bootstrap-slider.min.css',
                                                        'vendor/angular-bootstrap-slider/slider.js'], serie: true},
            {name: 'ui.grid',                   files: ['vendor/angular-ui-grid/ui-grid.min.css',
                                                        'vendor/angular-ui-grid/ui-grid.min.js']},
            {name: 'summernote',                files: ['vendor/bootstrap/js/modal.js',
                                                        'vendor/bootstrap/js/dropdown.js',
                                                        'vendor/bootstrap/js/tooltip.js',
                                                        'vendor/summernote/dist/summernote.css',
                                                        'vendor/summernote/dist/summernote.js',
                                                        'vendor/angular-summernote/dist/angular-summernote.js'
                                                        ], serie: true},
            {name: 'angular-rickshaw',          files: ['vendor/d3/d3.min.js',
                                                        'vendor/rickshaw/rickshaw.js',
                                                        'vendor/rickshaw/rickshaw.min.css',
                                                        'vendor/angular-rickshaw/rickshaw.js'], serie: true},
            {name: 'angular-chartist',          files: ['vendor/chartist/dist/chartist.min.css',
                                                        'vendor/chartist/dist/chartist.js',
                                                        'vendor/angular-chartist.js/dist/angular-chartist.js'], serie: true},
            {name: 'ui.map',                    files: ['vendor/angular-ui-map/ui-map.js']},
            {name: 'datatables',                files: ['vendor/datatables/media/css/jquery.dataTables.css',
                                                        'vendor/datatables/media/js/jquery.dataTables.js',
                                                        'vendor/datatables-buttons/js/dataTables.buttons.js',
                                                        //'vendor/datatables-buttons/css/buttons.bootstrap.css',
                                                        'vendor/datatables-buttons/js/buttons.bootstrap.js',
                                                        'vendor/datatables-buttons/js/buttons.colVis.js',
                                                        'vendor/datatables-buttons/js/buttons.flash.js',
                                                        'vendor/datatables-buttons/js/buttons.html5.js',
                                                        'vendor/datatables-buttons/js/buttons.print.js',
                                                        'vendor/angular-datatables/dist/angular-datatables.js',
                                                        'vendor/angular-datatables/dist/plugins/buttons/angular-datatables.buttons.js'],
                                                        serie: true},
            {name: 'angular-jqcloud',           files: ['vendor/jqcloud2/dist/jqcloud.css',
                                                        'vendor/jqcloud2/dist/jqcloud.js',
                                                        'vendor/angular-jqcloud/angular-jqcloud.js']},
            {name: 'angularGrid',               files: ['vendor/ag-grid/dist/styles/ag-grid.css',
                                                        'vendor/ag-grid/dist/ag-grid.js',
                                                        'vendor/ag-grid/dist/styles/theme-dark.css',
                                                        'vendor/ag-grid/dist/styles/theme-fresh.css']},
            {name: 'ng-nestable',               files: ['vendor/ng-nestable/src/angular-nestable.js',
                                                        'vendor/nestable/jquery.nestable.js']},
            {name: 'akoenig.deckgrid',          files: ['vendor/angular-deckgrid/angular-deckgrid.js']},
            {name: 'oitozero.ngSweetAlert',     files: ['vendor/sweetalert/dist/sweetalert.css',
                                                        'vendor/sweetalert/dist/sweetalert.min.js',
                                                        'vendor/angular-sweetalert/SweetAlert.js'], serie: true},
            {name: 'bm.bsTour',                 files: ['vendor/bootstrap-tour/build/css/bootstrap-tour.css',
                                                        'vendor/bootstrap-tour/build/js/bootstrap-tour-standalone.js',
                                                        'vendor/angular-bootstrap-tour/dist/angular-bootstrap-tour.js'], serie: true},
            {name: 'ui.knob',                   files: ['vendor/angular-knob/src/angular-knob.js',
                                                        'vendor/jquery-knob/dist/jquery.knob.min.js']},
            {name: 'easypiechart',              files: ['vendor/jquery.easy-pie-chart/dist/angular.easypiechart.min.js']},
            {name: 'colorpicker.module',        files: ['vendor/angular-bootstrap-colorpicker/css/colorpicker.css',
                                                        'vendor/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js']},
            {name: 'ui.sortable',               files: ['vendor/jquery-ui/jquery-ui.min.js',
                                                        'vendor/angular-ui-sortable/sortable.js'], serie: true},
            {name: 'ui.calendar',               files: ['vendor/jquery-ui/jquery-ui.min.js',
                                                        'vendor/jqueryui-touch-punch/jquery.ui.touch-punch.min.js',
                                                        'vendor/fullcalendar/dist/fullcalendar.min.js',
                                                        'vendor/fullcalendar/dist/gcal.js',
                                                        'vendor/fullcalendar/dist/fullcalendar.css',
                                                        'vendor/angular-ui-calendar/src/calendar.js'], serie: true},
            {name: 'chart.js',                   files: ['vendor/chart.js/dist/Chart.js',
                                                         'vendor/angular-chart.js/dist/angular-chart.js'], serie: true},
          ]
        })
        ;

})();

(function() {
    'use strict';

    angular
        .module('app.loadingbar')
        .config(loadingbarConfig)
        ;
    loadingbarConfig.$inject = ['cfpLoadingBarProvider'];
    function loadingbarConfig(cfpLoadingBarProvider){
      cfpLoadingBarProvider.includeBar = true;
      cfpLoadingBarProvider.includeSpinner = false;
      cfpLoadingBarProvider.latencyThreshold = 500;
      cfpLoadingBarProvider.parentSelector = '.wrapper > section';
    }
})();
(function() {
    'use strict';

    angular
        .module('app.loadingbar')
        .run(loadingbarRun)
        ;
    loadingbarRun.$inject = ['$rootScope', '$timeout', 'cfpLoadingBar'];
    function loadingbarRun($rootScope, $timeout, cfpLoadingBar){

      // Loading bar transition
      // ----------------------------------- 
      var thBar;
      $rootScope.$on('$stateChangeStart', function() {
          if($('.wrapper > section').length) // check if bar container exists
            thBar = $timeout(function() {
              cfpLoadingBar.start();
            }, 0); // sets a latency Threshold
      });
      $rootScope.$on('$stateChangeSuccess', function(event) {
          event.targetScope.$watch('$viewContentLoaded', function () {
            $timeout.cancel(thBar);
            cfpLoadingBar.complete();
          });
      });

    }

})();
/**
 * Created by Yoni on 12/10/2017.
 */

(function(angular) {
    "use strict";

    angular
        .module('app.manage_roles')
        .controller('CreateRoleController', CreateRoleController);

    CreateRoleController.$inject = ['$mdDialog','ManageRoleService','items','AlertService','blockUI','$mdPanel'];
    function CreateRoleController($mdDialog, ManageRoleService,items,AlertService,blockUI,$mdPanel) {
        var vm = this;
        vm.cancel = _cancel;
        vm.saveRole = _saveRole;
        vm.changeModuleStyle = _modulesStyle;
        vm.showFilterDialog = _showFilterDialog;
        vm.showFilter = false;
        vm.isEdit = items !== null;
        vm.role = items !== null?items:null;



        initialize();

        function setPermissions() {
            _.each(vm.role.permissions, function(oldPermission){
                _.each(vm.permissions, function(permission) {
                    if(permission.name === oldPermission.name && !permission.checked){
                        permission.checked = permission.name === oldPermission.name;
                    }
                });
            });
        }

        function preparePermissions() {
            vm.role.permissions = _.filter(vm.permissions,function(permission){
                return permission.checked? permission._id : null;
            });
        }

        function initialize(){
           if(vm.isEdit){
               var myLoadingBlockUI = blockUI.instances.get('RoleLoadingBlockUI');
               myLoadingBlockUI.start("Loading Role and Permissions");
           }
            var permissionFromStore = ManageRoleService.GetPermissionsFromStore();
            if(permissionFromStore !== null){
                vm.permissions = permissionFromStore;
                if(vm.isEdit){
                    setPermissions();
                    myLoadingBlockUI.stop();
                }

            }else {
                ManageRoleService.GetPermissions().then(function(response){
                    vm.permissions = response.data.docs;
                    ManageRoleService.StorePermissions(vm.permissions);
                    console.log("permissions from api",vm.permissions);
                    if(vm.isEdit){
                        setPermissions();
                        myLoadingBlockUI.stop();
                    }
                },function(error){
                    if(vm.isEdit){
                        myLoadingBlockUI.stop();
                    }
                    console.log("error permissions",error);
                });

            }

        }

        function _saveRole() {
            var myBlockUI = blockUI.instances.get('RoleBlockUI');
            myBlockUI.start();
            preparePermissions();
            if(vm.isEdit){
                ManageRoleService.UpdateRole(vm.role ).then(function (data) {
                        myBlockUI.stop();
                        $mdDialog.hide();
                        AlertService.showSuccess("updated successfully","Role and Permissions updated successfully");
                    },
                    function (error) {
                        myBlockUI.stop();
                    var message = error.data.error.message;
                        AlertService.showError("Failed to update Role",message);
                        console.log("could not be saved", error);
                    });
            }else {

                ManageRoleService.SaveRole( vm.role).then(function (data) {
                        myBlockUI.stop();
                        AlertService.showSuccess("Saved successfully","Role and Permissions saved successfully");
                        $mdDialog.hide();
                    },
                    function (error) {
                        myBlockUI.stop();
                        var message = error.data.error.message;
                        AlertService.showError("Failed to Save Role",message);
                        console.log("could not be saved", error);
                    });
            }
        }

        function _showFilterDialog(show) {

        }



        function _modulesStyle(module){
            var style = '';
            switch (module){
                case 'SCREENING':
                    style =  'label label-primary';
                    break;
                case 'SCREENING_MODULE':
                    style =  'label label-primary';
                    break;
                case 'FORM_BUILDER':
                    style =  'label label-danger';
                    break;
                case 'USER_MANAGEMENT':
                    style =  'label label-green';
                    break;
                case 'CLIENT_MANAGEMENT':
                    style =  'label label-warning';
                    break;
                case 'LOAN_MODULE':
                    style =  'label label-purple';
                    break;
                default:
                    style =  'label label-default';
            }
            return style;
        }

        function _cancel() {
            $mdDialog.cancel();
        }
    }
})(window.angular);


/**
 * Created by Yoni on 11/30/2017.
 */

(function(angular) {
    "use strict";

    angular
        .module('app.manage_roles')
        .controller('ManageRoleController', ManageRoleController);

    ManageRoleController.$inject = ['ManageRoleService', '$mdDialog', 'RouteHelpers'];

    function ManageRoleController( ManageRoleService, $mdDialog, RouteHelpers)
    {
        var vm = this;
        vm.addRole = _addRole;
        vm.editRole = _editRole;

        fetchRoles();

       function fetchRoles() {
           ManageRoleService.GetRoles().then(function(response){
               vm.roles = response.data.docs;
               // console.log("vm.roles on RM",vm.roles);
           },function(error){
               console.log("error role",error);
           });
       }

        function _addRole(ev){

            $mdDialog.show({
                locals: {
                    items: null
                },
                templateUrl: RouteHelpers.basepath('manageroles/create.role.dialog.html'),
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                hasBackdrop: false,
                escapeToClose: true,
                controller: 'CreateRoleController',
                controllerAs: 'vm'
            })
                .then(function (answer) {
                    fetchRoles();
                }, function () {
                });
        }

        function _editRole(role,ev) {
            $mdDialog.show({
                locals: {
                    items: role
                },
                templateUrl: RouteHelpers.basepath('manageroles/create.role.dialog.html'),
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                hasBackdrop: false,
                escapeToClose: true,
                controller: 'CreateRoleController',
                controllerAs: 'vm'
            }).then(function (answer) {
                    fetchRoles();
                }, function () {
                });
        }



    }
})(window.angular);


/**
 * Created by Yoni on 12/11/2017.
 */
(function(angular) {
    'use strict';
    angular.module('app.manage_roles')

        .service('ManageRoleService', ManageRoleService);
    ManageRoleService.$inject = ['$http', 'CommonService','AuthService','StorageService','APP_CONSTANTS'];

    function ManageRoleService($http, CommonService,AuthService,StorageService,APP_CONSTANTS) {
        return {
            GetRoles: _getRoles,
            GetPermissions: _getPermissions,
            GetPermissionsbyGroup:_getPermissionsbyGroup,
            SaveRole: _saveRole,
            UpdateRole:_updateRole,
            StorePermissions:_storePermissions,
            GetPermissionsFromStore:_getPermissionsFromStorage
        };

        function _getRoles(){
            return $http.get(CommonService.buildPaginatedUrl(API.Service.Users,API.Methods.Users.Roles));
        }

        function _getPermissions(){
            return $http.get(CommonService.buildPaginatedUrl(API.Service.Users,API.Methods.Roles.Permissions));
        }
        function _getPermissionsbyGroup(){
            return $http.get(CommonService.buildUrl(API.Service.Users,API.Methods.Roles.PermissionByGroup));
        }

        function _saveRole(role) {
            return $http.post(CommonService.buildUrl(API.Service.Users,API.Methods.Roles.Create), role);
        }

        function _updateRole(role) {
            return $http.put(CommonService.buildUrlWithParam(API.Service.Users,API.Methods.Roles.GetAll,role._id), role);
        }

        function _storePermissions(permissions) {
            return StorageService.Set(APP_CONSTANTS.StorageKey.PERMISSIONS, permissions);
        }
        function _getPermissionsFromStorage() {
            return !_.isUndefined(StorageService.Get(APP_CONSTANTS.StorageKey.PERMISSIONS)) ? StorageService.Get(APP_CONSTANTS.StorageKey.PERMISSIONS) : null;
        }

    }

})(window.angular);

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

    CreateUserController.$inject = ['$mdDialog','ManageUserService','items','AlertService','AuthService','blockUI','$scope'];
    function CreateUserController($mdDialog, ManageUserService,items,AlertService,AuthService,blockUI,$scope) {
        var vm = this;
        vm.cancel = _cancel;
        vm.saveUser = _saveUser;
        vm.onSelectedDefaultBranch = _onSelectedDefaultBranch;
        vm.isEdit = items !== null;
        vm.user = items !== null?items:{};
        vm.user.selected_access_branches = [];


        initialize();

        function _saveUser() {

            var myBlockUI = blockUI.instances.get('CreateUserForm');

            if(!_.isUndefined(vm.user.selected_role) &&  !_.isUndefined(vm.user.selected_default_branch)){
                myBlockUI.start("Storing User");
                var userInfo = {
                    first_name: vm.user.first_name,
                    last_name: vm.user.last_name,
                    grandfather_name:vm.user.grandfather_name,
                    title: vm.user.title,
                    role : vm.user.selected_role._id,
                    hired_date:vm.user.hired_date,
                    default_branch : vm.user.selected_default_branch._id,
                    access_branches:[],
                    multi_branches: vm.user.multi_branches
                };
                userInfo.access_branches.push(userInfo.default_branch);

                _.forEach(vm.user.selected_access_branches,function(accessBranch){

                    var found = userInfo.access_branches.some(function (el) {
                        return el._id === accessBranch._id;
                    });

                    if (!found && !userInfo.multi_branches) {
                        userInfo.access_branches.push(accessBranch._id);
                    }
                });

                if(vm.isEdit){

                    userInfo._id = vm.user.account._id;

                    ManageUserService.UpdateUser( userInfo ).then(function (data) {
                            myBlockUI.stop();
                            console.log("updated successfully", data);
                            $mdDialog.hide();
                            AlertService.showSuccess('Updated Successfully!', 'User Information is Updated');
                        },
                        function (error) {
                            myBlockUI.stop();
                            var message = error.data.error.message;
                            AlertService.showError( 'Oops... Something went wrong', message);
                            console.log("could not be saved", error);
                        });

                }else {

                    userInfo.username = vm.user.username;
                    userInfo.password = vm.user.password;

                    ManageUserService.CreateUser(userInfo).then(
                        function (data) {
                            myBlockUI.stop();
                            AlertService.showSuccess('Saved Successfully!', 'User Information is saved successfully');
                            console.log("saved successfully", data);
                            $mdDialog.hide();
                            //TODO: Alert & fetch user collection
                        },
                        function (error) {
                            myBlockUI.stop();
                            var message = error.data.error.message;
                            AlertService.showError( 'Oops... Something went wrong', message);
                            console.log("could not be saved", error);
                        }
                    );
                }
            }
            else {
                AlertService.showError( 'Oops... Something went wrong', "You haven't provided all required fields.");
            }



        }

        function initialize(){
            if(vm.isEdit){
                var myLoadingBlockUI = blockUI.instances.get('UserFormLoader');
                myLoadingBlockUI.start("Loading User Information");
                angular.extend(vm.user, vm.user.account);
                var dt = new Date(vm.user.hired_date);
                vm.user.hired_date = dt;
            }

            GetRolesAndSetSelectedValue();

            if(AuthService.IsSuperuser()){
                ManageUserService.GetBranches().then(function(response){
                    vm.branches = response.data.docs;
                    if(vm.isEdit){
                        setBranchesSelectedValue(vm.branches);
                        myLoadingBlockUI.stop();
                    }
                },function(error){
                    console.log("error",error);
                });
            }else{
                vm.branches =  AuthService.GetAccessBranches();
                if(vm.isEdit){
                    setBranchesSelectedValue(vm.branches);
                    myLoadingBlockUI.stop();
                }
            }

        }

        function GetRolesAndSetSelectedValue() {
            ManageUserService.GetRoles().then(function(response){
                vm.roles = response.data.docs;
                if(vm.isEdit){
                    //LOAD Role select value
                    angular.forEach(vm.roles,function(role){
                        if(!_.isUndefined(vm.user.account)){
                            if(role._id === vm.user.account.role._id){
                                vm.user.selected_role = role;
                            }}

                    });
                }
            },function(error){
                console.log("error",error);
            });
        }

        function setBranchesSelectedValue(branches) {
            angular.forEach(branches,function(branch){
                //LOAD Default Branch select value
                if(!_.isUndefined(vm.user.default_branch._id)){

                    if(branch._id === vm.user.default_branch._id){
                        vm.user.selected_default_branch = branch;
                    }
                }
                //LOAD access branch select values
                if(vm.user.access_branches.length > 0 && !vm.user.multi_branches)
                {
                    var found = vm.user.access_branches.some(function (accBranch) {
                        return accBranch._id === branch._id;
                    });

                    if (found) {
                        vm.user.selected_access_branches.push(branch);
                    }
                }

            });
        }

        function _onSelectedDefaultBranch() {
            var branchExist = vm.user.selected_access_branches.indexOf(vm.user.selected_default_branch);
            if (branchExist === -1 && !vm.user.multi_branches) {
                vm.user.selected_access_branches.push(vm.user.selected_default_branch);
            }
        }

        $scope.$watch(function() {
            return vm.user.multi_branches;
        }, function(current, original) {
            //if multi_branch is on clear access branch list
            if(current){
                vm.user.selected_access_branches = [];
            }
        });

        function _cancel() {
            $mdDialog.cancel();
        }

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


/**
 * Created by Yoni on 11/30/2017.
 */

(function(angular,document) {
    "use strict";

    angular
        .module('app.manage_users')
        .controller('ManageUsersController', ManageUsersController);

    ManageUsersController.$inject = ['RouteHelpers', 'DTOptionsBuilder', 'ManageUserService','$mdDialog','AlertService','AuthService'];
    function ManageUsersController(RouteHelpers, DTOptionsBuilder, ManageUserService,$mdDialog,AlertService,AuthService) {
        var vm = this;
        vm.currentUser = {
            selected_access_branch:undefined
        };
        vm.addUser = _addUser;
        vm.editUser = _editUser;
        vm.changeStatus = _changeStatus;
        vm.statusStyle = _statusStyle;
        vm.onSelectedBranch = _onSelectedBranch;

        activate();


        ////////////////
        function activate() {

            fetchUserData();

            GetBranchFilter();

            vm.dtOptions = DTOptionsBuilder.newOptions()
                .withPaginationType('full_numbers')
                .withDOM('<"html5buttons"B>lTfgitp')
                .withOption('processing', true)
                .withOption('scrollY', 430);

        }

        function fetchUserData() {
            ManageUserService.GetUsers().then(function(response){
                // console.log("users list",response);
                vm.users = response.data.docs;
                vm.usersCopy = angular.copy(vm.users);
            },function(error){
                console.log("error",error);
            });
        }

        function GetBranchFilter() {
            if(AuthService.IsSuperuser()){
                ManageUserService.GetBranches().then(function(response){
                    vm.currentUser.user_access_branches = response.data.docs;
                },function(error){
                    vm.currentUser.user_access_branches = [];
                });
            }
            else {
                vm.currentUser.user_access_branches = AuthService.GetAccessBranches();
            }
        }
        function _changeStatus(user) {
            vm.toaster = {
                type:  'success',
                title: 'Title',
                text:  'Message'
            };

            var userAccount = {};
            userAccount._id = user._id;
            if(user.status === 'active'){
                userAccount.status = 'suspended';
                user.status = 'suspended';
            }else{
                userAccount.status = 'active';
                user.status = 'active';
            }
        
            ManageUserService.UpdateUserStatus(userAccount).then(function(response){
                console.log('updated user',response);
                var message =   userAccount.status==='active'?'activated':userAccount.status;
                AlertService.showSuccess('Updated User Status!', 'User is ' + message  + '.');
                // toaster.pop(vm.toaster.type, vm.toaster.title, vm.toaster.text);
            },function(error){
                console.log('error',error);
                var message = error.data.error.message;
                AlertService.showError( 'Oops... Something went wrong', message);
                // toaster.pop(vm.toaster.type, vm.toaster.title, vm.toaster.text);
            });
        }

        function _addUser(ev){

            $mdDialog.show({
                locals: {
                    items: null
                },
                templateUrl: RouteHelpers.basepath('manageusers/create.user.dialog.html'),
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                hasBackdrop: false,
                escapeToClose: true,
                controller: 'CreateUserController',
                controllerAs: 'vm'
            })
                .then(function (answer) {
                    fetchUserData();
                }, function () {
                });
        }

        function _editUser(user,ev){
            $mdDialog.show({
                locals: {items: user},
                templateUrl: RouteHelpers.basepath('manageusers/create.user.dialog.html'),
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                hasBackdrop: false,
                escapeToClose: true,
                controller: 'CreateUserController',
                controllerAs: 'vm'
            }).then(function (answer) {
                fetchUserData();
                }, function () {
                });
        }

        function _onSelectedBranch(){
         vm.users = vm.usersCopy;

         vm.users = _.filter(vm.users,function(user){
                 if(!_.isUndefined(user.account)){
                     if(user.account.default_branch !== null){
                         return user.account.default_branch._id === vm.currentUser.selected_access_branch._id;
                     }
                 }
            });

        }

        function _statusStyle(status){
            var style = '';
            switch (status){
                case 'active' || 'active ':
                    style =  'label label-success';
                    break;
                case 'inactive':
                    style =  'label label-default';
                    break;
                case 'suspended':
                    style =  'label label-danger';
                    break;
                default:
                    style =  'label label-default';
            }
            return style;
        }
    }
})(window.angular,window.document);


/**
 * Created by Yoni on 11/30/2017.
 */
(function(angular) {
    'use strict';
    angular.module('app.manage_users')

        .service('ManageUserService', ManageUserService);
    ManageUserService.$inject = ['$http', 'CommonService'];

    function ManageUserService($http, CommonService) {
        return {
            GetUsers: _getUsers,
            GetRoles: _getRoles,
            GetBranches: _getBranches,
            CreateUser: _saveUser,
            UpdateUser: _updateUser,
            UpdateUserStatus: _updateUserStatus
        };

        function _getUsers(params){
            return $http.get(CommonService.buildPaginatedUrl(API.Service.Users,API.Methods.Users.GetAll,params));
        }
        function _getRoles(){
            return $http.get(CommonService.buildPaginatedUrl(API.Service.Users,API.Methods.Users.Roles));
        }
        function _getBranches(){
            return $http.get(CommonService.buildPaginatedUrl(API.Service.MFI,API.Methods.MFI.Branches));
        }
        function _saveUser(user) {
            return $http.post(CommonService.buildUrl(API.Service.Users,API.Methods.Users.User), user);
        }
        function _updateUser(account) {
            return $http.put(CommonService.buildUrlWithParam(API.Service.Users,API.Methods.Users.Account,account._id), account);
        }
        function _updateUserStatus(user) {
            return $http.put(CommonService.buildUrlWithParam(API.Service.Users,API.Methods.Users.UserUpdate,user._id), user);
        }
        
    }

})(window.angular);

/**=========================================================
 * Module: modals.js
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.maps')
        .controller('ModalGmapController', ModalGmapController);

    ModalGmapController.$inject = ['$uibModal'];
    function ModalGmapController($uibModal) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          vm.open = function (size) {

            //var modalInstance =
            $uibModal.open({
              templateUrl: '/myModalContent.html',
              controller: ModalInstanceCtrl,
              size: size
            });
          };

          // Please note that $uibModalInstance represents a modal window (instance) dependency.
          // It is not the same as the $uibModal service used above.

          ModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance', '$timeout'];
          function ModalInstanceCtrl($scope, $uibModalInstance, $timeout) {

            $uibModalInstance.opened.then(function () {
              var position = new google.maps.LatLng(33.790807, -117.835734);

              $scope.mapOptionsModal = {
                zoom: 14,
                center: position,
                mapTypeId: google.maps.MapTypeId.ROADMAP
              };

              // we use timeout to wait maps to be ready before add a markers
              $timeout(function(){
                // 1. Add a marker at the position it was initialized
                new google.maps.Marker({
                  map: $scope.myMapModal,
                  position: position
                });
                // 2. Trigger a resize so the map is redrawed
                google.maps.event.trigger($scope.myMapModal, 'resize');
                // 3. Move to the center if it is misaligned
                $scope.myMapModal.panTo(position);
              });

            });

            $scope.ok = function () {
              $uibModalInstance.close('closed');
            };

            $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };

          }

        }
    }

})();


(function() {
    'use strict';

    angular
        .module('app.maps')
        .controller('GMapController', GMapController);

    GMapController.$inject = ['$timeout'];
    function GMapController($timeout) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          var position = [
              new google.maps.LatLng(33.790807, -117.835734),
              new google.maps.LatLng(33.790807, -117.835734),
              new google.maps.LatLng(33.790807, -117.835734),
              new google.maps.LatLng(33.790807, -117.835734),
              new google.maps.LatLng(33.787453, -117.835858)
            ];
          
          vm.addMarker = addMarker;
          // we use timeout to wait maps to be ready before add a markers
          $timeout(function(){
            addMarker(vm.myMap1, position[0]);
            addMarker(vm.myMap2, position[1]);
            addMarker(vm.myMap3, position[2]);
            addMarker(vm.myMap5, position[3]);
          });

          vm.mapOptions1 = {
            zoom: 14,
            center: position[0],
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
          };

          vm.mapOptions2 = {
            zoom: 19,
            center: position[1],
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          vm.mapOptions3 = {
            zoom: 14,
            center: position[2],
            mapTypeId: google.maps.MapTypeId.SATELLITE
          };

          vm.mapOptions4 = {
            zoom: 14,
            center: position[3],
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          // for multiple markers
          $timeout(function(){
            addMarker(vm.myMap4, position[3]);
            addMarker(vm.myMap4, position[4]);
          });

          // custom map style
          var MapStyles = [{'featureType':'water','stylers':[{'visibility':'on'},{'color':'#bdd1f9'}]},{'featureType':'all','elementType':'labels.text.fill','stylers':[{'color':'#334165'}]},{featureType:'landscape',stylers:[{color:'#e9ebf1'}]},{featureType:'road.highway',elementType:'geometry',stylers:[{color:'#c5c6c6'}]},{featureType:'road.arterial',elementType:'geometry',stylers:[{color:'#fff'}]},{featureType:'road.local',elementType:'geometry',stylers:[{color:'#fff'}]},{featureType:'transit',elementType:'geometry',stylers:[{color:'#d8dbe0'}]},{featureType:'poi',elementType:'geometry',stylers:[{color:'#cfd5e0'}]},{featureType:'administrative',stylers:[{visibility:'on'},{lightness:33}]},{featureType:'poi.park',elementType:'labels',stylers:[{visibility:'on'},{lightness:20}]},{featureType:'road',stylers:[{color:'#d8dbe0',lightness:20}]}];
          vm.mapOptions5 = {
            zoom: 14,
            center: position[3],
            styles: MapStyles,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
          };

          ///////////////
          
          function addMarker(map, position) {
            return new google.maps.Marker({
              map: map,
              position: position
            });
          }

        }
    }
})();


(function() {
    'use strict';
    // Used only for the BottomSheetExample
    angular
        .module('app.material')
        .config(materialConfig)
        ;
    materialConfig.$inject = ['$mdIconProvider'];
    function materialConfig($mdIconProvider){
      $mdIconProvider
        .icon('share-arrow', 'app/img/icons/share-arrow.svg', 24)
        .icon('upload', 'app/img/icons/upload.svg', 24)
        .icon('copy', 'app/img/icons/copy.svg', 24)
        .icon('print', 'app/img/icons/print.svg', 24)
        .icon('hangout', 'app/img/icons/hangout.svg', 24)
        .icon('mail', 'app/img/icons/mail.svg', 24)
        .icon('message', 'app/img/icons/message.svg', 24)
        .icon('copy2', 'app/img/icons/copy2.svg', 24)
        .icon('facebook', 'app/img/icons/facebook.svg', 24)
        .icon('twitter', 'app/img/icons/twitter.svg', 24);
    }
})();


(function() {
    'use strict';

    angular
        .module('app.material')
        .controller('MDAutocompleteCtrl', MDAutocompleteCtrl)
        .controller('MDBottomSheetCtrl', MDBottomSheetCtrl)
        .controller('MDListBottomSheetCtrl', MDListBottomSheetCtrl)
        .controller('MDGridBottomSheetCtrl', MDGridBottomSheetCtrl)
        .controller('MDCheckboxCtrl', MDCheckboxCtrl)
        .controller('MDRadioCtrl', MDRadioCtrl)
        .controller('MDSwitchCtrl', MDSwitchCtrl)
        .controller('MDDialogCtrl', MDDialogCtrl)
        .controller('MDSliderCtrl', MDSliderCtrl)
        .controller('MDSelectCtrl', MDSelectCtrl)
        .controller('MDInputCtrl', MDInputCtrl)
        .controller('MDProgressCtrl', MDProgressCtrl)
        .controller('MDSidenavCtrl', MDSidenavCtrl)
        .controller('MDSubheaderCtrl', MDSubheaderCtrl)
        .controller('MDToastCtrl', MDToastCtrl)
          .controller('ToastCtrl', ToastCtrl)
        .controller('MDTooltipCtrl', MDTooltipCtrl)
        .controller('BottomSheetExample', BottomSheetExample)
          .controller('ListBottomSheetCtrl', ListBottomSheetCtrl)
          .controller('GridBottomSheetCtrl', GridBottomSheetCtrl)
        ;

    /*
      MDAutocompleteCtrl
     */
    MDAutocompleteCtrl.$inject = ['$scope', '$timeout', '$q'];
    function MDAutocompleteCtrl($scope, $timeout, $q) {
      var self = this;

      self.states        = loadAll();
      self.selectedItem  = null;
      self.searchText    = null;
      self.querySearch   = querySearch;
      self.simulateQuery = false;
      self.isDisabled    = false;

      // use $timeout to simulate remote dataservice call
      function querySearch (query) {
        var results = query ? self.states.filter( createFilterFor(query) ) : [],
            deferred;
        if (self.simulateQuery) {
          deferred = $q.defer();
          $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
          return deferred.promise;
        } else {
          return results;
        }
      }

      function loadAll() {
        var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware, Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana, Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana, Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina, North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina, South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia, Wisconsin, Wyoming';

        return allStates.split(/, +/g).map( function (state) {
          return {
            value: state.toLowerCase(),
            display: state
          };
        });
      }

          /**
           * Create filter function for a query string
           */
          function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(state) {
              return (state.value.indexOf(lowercaseQuery) === 0);
            };

          }
        }

    /*
    MDBottomSheetCtrl
     */
    MDBottomSheetCtrl.$inject = ['$scope', '$timeout', '$mdBottomSheet'];
    function MDBottomSheetCtrl($scope, $timeout, $mdBottomSheet) {
      $scope.alert = '';

      $scope.showListBottomSheet = function($event) {
        $scope.alert = '';
        $mdBottomSheet.show({
          templateUrl: 'bottom-sheet-list-template.html',
          controller: 'ListBottomSheetCtrl',
          targetEvent: $event,
          disableParentScroll: false
        }).then(function(clickedItem) {
          $scope.alert = clickedItem.name + ' clicked!';
        });
      };

      $scope.showGridBottomSheet = function($event) {
        $scope.alert = '';
        $mdBottomSheet.show({
          templateUrl: 'bottom-sheet-grid-template.html',
          controller: 'GridBottomSheetCtrl',
          targetEvent: $event,
          disableParentScroll: false
        }).then(function(clickedItem) {
          $scope.alert = clickedItem.name + ' clicked!';
        });
      };
    }
    /*
    MDListBottomSheetCtrl
     */
    MDListBottomSheetCtrl.$inject = ['$scope', '$mdBottomSheet'];
    function MDListBottomSheetCtrl($scope, $mdBottomSheet) {

      $scope.items = [
        { name: 'Share', icon: 'share' },
        { name: 'Upload', icon: 'upload' },
        { name: 'Copy', icon: 'copy' },
        { name: 'Print this page', icon: 'print' },
      ];

      $scope.listItemClick = function($index) {
        var clickedItem = $scope.items[$index];
        $mdBottomSheet.hide(clickedItem);
      };
    }
    /*
    MDGridBottomSheetCtrl
     */
    MDGridBottomSheetCtrl.$inject = ['$scope', '$mdBottomSheet'];
    function MDGridBottomSheetCtrl($scope, $mdBottomSheet) {

      $scope.items = [
        { name: 'Hangout', icon: 'hangout' },
        { name: 'Mail', icon: 'mail' },
        { name: 'Message', icon: 'message' },
        { name: 'Copy', icon: 'copy' },
        { name: 'Facebook', icon: 'facebook' },
        { name: 'Twitter', icon: 'twitter' },
      ];

      $scope.listItemClick = function($index) {
        var clickedItem = $scope.items[$index];
        $mdBottomSheet.hide(clickedItem);
      };
    }
    /*
    MDCheckboxCtrl
     */
    MDCheckboxCtrl.$inject = ['$scope'];
    function MDCheckboxCtrl($scope) {

      $scope.data = {};
      $scope.data.cb1 = true;
      $scope.data.cb2 = false;
      $scope.data.cb3 = false;
      $scope.data.cb4 = false;
      $scope.data.cb5 = false;
    }
    /*
    MDRadioCtrl
     */
    MDRadioCtrl.$inject = ['$scope'];
    function MDRadioCtrl($scope) {

        $scope.data = {
          group1 : 'Banana',
          group2 : '2',
          group3 : 'avatar-1'
        };

        $scope.avatarData = [{
            id: 'svg-1',
            title: 'avatar 1',
            value: 'avatar-1'
          },{
            id: 'svg-2',
            title: 'avatar 2',
            value: 'avatar-2'
          },{
            id: 'svg-3',
            title: 'avatar 3',
            value: 'avatar-3'
        }];

        $scope.radioData = [
          { label: 'Apple', value: 1 },
          { label: 'Banana', value: 2 },
          { label: 'Mango', value: '3', isDisabled: true }
        ];


        $scope.submit = function() {
          alert('submit');
        };

        var vals = ['Apple', 'Banana', 'Mango', 'Grape', 'Melon', 'Strawberry', 'Kiwi'];
        $scope.addItem = function() {
          var rval = vals[Math.floor(Math.random() * vals.length)];
          $scope.radioData.push({ label: rval, value: rval });
        };

        $scope.removeItem = function() {
          $scope.radioData.pop();
        };
    }
    /*
    MDSwitchCtrl
     */
    MDSwitchCtrl.$inject = ['$scope'];
    function MDSwitchCtrl($scope) {
      $scope.data = {
        cb1: true,
        cb4: true
      };
      
      $scope.onChange = function(cbState){
         $scope.message = 'The switch is now: ' + cbState;
      };
    }
    /*
    MDDialogCtrl
     */
    MDDialogCtrl.$inject = ['$scope', '$mdDialog'];
    function MDDialogCtrl($scope, $mdDialog) {
      $scope.alert = '';

      $scope.showAlert = function(ev) {
        $mdDialog.show(
          $mdDialog.alert()
            .title('This is an alert title')
            .content('You can specify some description text in here.')
            .ariaLabel('Password notification')
            .ok('Got it!')
            .targetEvent(ev)
        );
      };

      $scope.showConfirm = function(ev) {
        var confirm = $mdDialog.confirm()
          .title('Would you like to delete your debt?')
          .content('All of the banks have agreed to forgive you your debts.')
          .ariaLabel('Lucky day')
          .ok('Please do it!')
          .cancel('Sounds like a scam')
          .targetEvent(ev);

        $mdDialog.show(confirm).then(function() {
          $scope.alert = 'You decided to get rid of your debt.';
        }, function() {
          $scope.alert = 'You decided to keep your debt.';
        });
      };

      $scope.showAdvanced = function(ev) {
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'dialog1.tmpl.html',
          targetEvent: ev,
        })
        .then(function(answer) {
          $scope.alert = 'You said the information was \'' + answer + '\'.';
        }, function() {
          $scope.alert = 'You cancelled the dialog.';
        });
      };
      DialogController.$inject = ['$scope', '$mdDialog'];
      function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
          $mdDialog.hide();
        };

        $scope.cancel = function() {
          $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
          $mdDialog.hide(answer);
        };
      }
    }
    /*
    MDSliderCtrl
     */
    MDSliderCtrl.$inject = ['$scope'];
    function MDSliderCtrl($scope) {

      $scope.color = {
        red: Math.floor(Math.random() * 255),
        green: Math.floor(Math.random() * 255),
        blue: Math.floor(Math.random() * 255)
      };

      $scope.rating1 = 3;
      $scope.rating2 = 2;
      $scope.rating3 = 4;

      $scope.disabled1 = 0;
      $scope.disabled2 = 70;
    }
    /*
    MDSelectCtrl
     */
    function MDSelectCtrl() {
      
      var vm = this;
      
      vm.userState = '';
      vm.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
          'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
          'WY').split(' ').map(function (state) { return { abbrev: state }; });

      vm.sizes = [
          'small (12-inch)',
          'medium (14-inch)',
          'large (16-inch)',
          'insane (42-inch)'
      ];
      vm.toppings = [
        { category: 'meat', name: 'Pepperoni' },
        { category: 'meat', name: 'Sausage' },
        { category: 'meat', name: 'Ground Beef' },
        { category: 'meat', name: 'Bacon' },
        { category: 'veg', name: 'Mushrooms' },
        { category: 'veg', name: 'Onion' },
        { category: 'veg', name: 'Green Pepper' },
        { category: 'veg', name: 'Green Olives' }
      ];
    }
    /*
    MDInputCtrl
     */
    MDInputCtrl.$inject = ['$scope'];
    function MDInputCtrl($scope) {
      $scope.user = {
        title: 'Developer',
        email: 'ipsum@lorem.com',
        firstName: '',
        lastName: '' ,
        company: 'Google' ,
        address: '1600 Amphitheatre Pkwy' ,
        city: 'Mountain View' ,
        state: 'CA' ,
        biography: 'Loves kittens, snowboarding, and can type at 130 WPM.\n\nAnd rumor has it she bouldered up Castle Craig!',
        postalCode : '94043'
      };
      $scope.project = {
        description: 'Nuclear Missile Defense System',
        clientName: 'Bill Clinton',
        rate: 500
      };
    }
    /*
    MDProgressCtrl
     */
    MDProgressCtrl.$inject = ['$scope', '$interval'];
    function MDProgressCtrl($scope, $interval) {
        $scope.mode = 'query';
        $scope.determinateValue = 30;
        $scope.determinateValue2 = 30;

        $interval(function() {
          $scope.determinateValue += 1;
          $scope.determinateValue2 += 1.5;
          if ($scope.determinateValue > 100) {
            $scope.determinateValue = 30;
            $scope.determinateValue2 = 30;
          }
        }, 100, 0, true);

        $interval(function() {
          $scope.mode = ($scope.mode === 'query' ? 'determinate' : 'query');
        }, 7200, 0, true);
    }
    /*
    MDSidenavCtrl
     */
    MDSidenavCtrl.$inject = ['$scope', '$timeout', '$mdSidenav', '$log'];
    function MDSidenavCtrl($scope, $timeout, $mdSidenav, $log) {
      $scope.toggleLeft = function() {
        $mdSidenav('left').toggle()
                          .then(function(){
                              $log.debug('toggle left is done');
                          });
      };
      $scope.toggleRight = function() {
        $mdSidenav('right').toggle()
                            .then(function(){
                              $log.debug('toggle RIGHT is done');
                            });
      };
      $scope.closeLeft = function() {
        $mdSidenav('left').close()
                          .then(function(){
                            $log.debug('close LEFT is done');
                          });

      };
      $scope.closeRight = function() {
        $mdSidenav('right').close()
                            .then(function(){
                              $log.debug('close RIGHT is done');
                            });
      };
    }
    /*
    MDSubheaderCtrl
     */
    MDSubheaderCtrl.$inject = ['$scope'];
    function MDSubheaderCtrl($scope) {
        $scope.messages = [
          {
            face : 'app/img/user/10.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/01.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/02.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/03.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/04.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/05.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/06.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/07.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/08.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/09.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/11.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
        ];
    }
    /*
    MDToastCtrl
     */
    MDToastCtrl.$inject = ['$scope', '$mdToast'];
    function MDToastCtrl($scope, $mdToast) {

      $scope.toastPosition = {
        bottom: false,
        top: true,
        left: false,
        right: true
      };

      $scope.getToastPosition = function() {
        return Object.keys($scope.toastPosition)
          .filter(function(pos) { return $scope.toastPosition[pos]; })
          .join(' ');
      };

      $scope.showCustomToast = function() {
        $mdToast.show({
          controller: 'ToastCtrl',
          templateUrl: 'toast-template.html',
          hideDelay: 60000,
          parent:'#toastcontainer',
          position: $scope.getToastPosition()
        });
      };

      $scope.showSimpleToast = function() {
        $mdToast.show(
          $mdToast.simple()
            .content('Simple Toast!')
            .position($scope.getToastPosition())
            .hideDelay(30000)
        );
      };

      $scope.showActionToast = function() {
        var toast = $mdToast.simple()
              .content('Action Toast!')
              .action('OK')
              .highlightAction(false)
              .position($scope.getToastPosition());

        $mdToast.show(toast).then(function() {
          alert('You clicked \'OK\'.');
        });
      };
    }
    /*
    ToastCtrl
     */
    ToastCtrl.$inject = ['$scope', '$mdToast'];
    function ToastCtrl($scope, $mdToast) {
      $scope.closeToast = function() {
        $mdToast.hide();
      };
    }
    /*
    MDTooltipCtrl
     */
    MDTooltipCtrl.$inject = ['$scope'];
    function MDTooltipCtrl($scope) {
      $scope.demo = {};
    }
    /*
    BottomSheetExample
     */
    BottomSheetExample.$inject = ['$scope', '$timeout', '$mdBottomSheet'];
    function BottomSheetExample($scope, $timeout, $mdBottomSheet) {
      $scope.alert = '';

      $scope.showListBottomSheet = function($event) {
        $scope.alert = '';
        $mdBottomSheet.show({
          templateUrl: 'bottom-sheet-list-template.html',
          controller: 'ListBottomSheetCtrl',
          targetEvent: $event,
          parent: '#bottomsheetcontainer',
          disableParentScroll: false
        }).then(function(clickedItem) {
          $scope.alert = clickedItem.name + ' clicked!';
        });
      };

      $scope.showGridBottomSheet = function($event) {
        $scope.alert = '';
        $mdBottomSheet.show({
          templateUrl: 'bottom-sheet-grid-template.html',
          controller: 'GridBottomSheetCtrl',
          targetEvent: $event,
          parent: '#bottomsheetcontainer',
          disableParentScroll: false
        }).then(function(clickedItem) {
          $scope.alert = clickedItem.name + ' clicked!';
        });
      };
    }
    /*
    ListBottomSheetCtrl
     */
    ListBottomSheetCtrl.$inject = ['$scope', '$mdBottomSheet'];
    function ListBottomSheetCtrl($scope, $mdBottomSheet) {

      $scope.items = [
        { name: 'Share', icon: 'share-arrow' },
        { name: 'Upload', icon: 'upload' },
        { name: 'Copy', icon: 'copy' },
        { name: 'Print this page', icon: 'print' },
      ];

      $scope.listItemClick = function($index) {
        var clickedItem = $scope.items[$index];
        $mdBottomSheet.hide(clickedItem);
      };
    }
    /*
    GridBottomSheetCtrl
     */
    GridBottomSheetCtrl.$inject = ['$scope', '$mdBottomSheet'];
    function GridBottomSheetCtrl($scope, $mdBottomSheet) {
      $scope.items = [
        { name: 'Hangout', icon: 'hangout' },
        { name: 'Mail', icon: 'mail' },
        { name: 'Message', icon: 'message' },
        { name: 'Copy', icon: 'copy2' },
        { name: 'Facebook', icon: 'facebook' },
        { name: 'Twitter', icon: 'twitter' },
      ];

      $scope.listItemClick = function($index) {
        var clickedItem = $scope.items[$index];
        $mdBottomSheet.hide(clickedItem);
      };
    }


})();

(function() {
    'use strict';
    // Used only for the BottomSheetExample
    angular
        .module('app.material')
        .run(materialRun)
        ;
    materialRun.$inject = ['$http', '$templateCache'];
    function materialRun($http, $templateCache){
      var urls = [
        'app/img/icons/share-arrow.svg',
        'app/img/icons/upload.svg',
        'app/img/icons/copy.svg',
        'app/img/icons/print.svg',
        'app/img/icons/hangout.svg',
        'app/img/icons/mail.svg',
        'app/img/icons/message.svg',
        'app/img/icons/copy2.svg',
        'app/img/icons/facebook.svg',
        'app/img/icons/twitter.svg'
      ];

      angular.forEach(urls, function(url) {
        $http.get(url, {cache: $templateCache});
      });

    }

})();

(function() {
    'use strict';

    angular
        .module('app.material')
        .controller('MaterialWidgetsController', MaterialWidgetsController);

    MaterialWidgetsController.$inject = ['Colors'];
    function MaterialWidgetsController(Colors) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          vm.sparkOption1 = {
            type : 'line',
            width : '100%',
            height : '140px',
            tooltipOffsetX : -20,
            tooltipOffsetY : 20,
            lineColor : Colors.byName('success'),
            fillColor : Colors.byName('success'),
            spotColor : 'rgba(0,0,0,.26)',
            minSpotColor : 'rgba(0,0,0,.26)',
            maxSpotColor : 'rgba(0,0,0,.26)',
            highlightSpotColor : 'rgba(0,0,0,.26)',
            highlightLineColor : 'rgba(0,0,0,.26)',
            spotRadius : 2,
            tooltipPrefix : '',
            tooltipSuffix : ' Visits',
            tooltipFormat : '{{prefix}}{{y}}{{suffix}}',
            chartRangeMin: 0,
            resize: true
          };

          vm.sparkOptionPie = {
            type: 'pie',
            width : '2em',
            height : '2em',
            sliceColors: [ Colors.byName('success'), Colors.byName('gray-light')]
          };
        
        }
    }
})();
/**=========================================================
 * Module: navbar-search.js
 * Navbar search toggler * Auto dismiss on ESC key
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.navsearch')
        .directive('searchOpen', searchOpen)
        .directive('searchDismiss', searchDismiss);

    //
    // directives definition
    // 
    
    function searchOpen () {
        var directive = {
            controller: searchOpenController,
            restrict: 'A'
        };
        return directive;

    }

    function searchDismiss () {
        var directive = {
            controller: searchDismissController,
            restrict: 'A'
        };
        return directive;
        
    }

    //
    // Contrller definition
    // 
    
    searchOpenController.$inject = ['$scope', '$element', 'NavSearch'];
    function searchOpenController ($scope, $element, NavSearch) {
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', NavSearch.toggle);
    }

    searchDismissController.$inject = ['$scope', '$element', 'NavSearch'];
    function searchDismissController ($scope, $element, NavSearch) {
      
      var inputSelector = '.navbar-form input[type="text"]';

      $(inputSelector)
        .on('click', function (e) { e.stopPropagation(); })
        .on('keyup', function(e) {
          if (e.keyCode === 27) // ESC
            NavSearch.dismiss();
        });
        
      // click anywhere closes the search
      $(document).on('click', NavSearch.dismiss);
      // dismissable options
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', NavSearch.dismiss);
    }

})();


/**=========================================================
 * Module: nav-search.js
 * Services to share navbar search functions
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.navsearch')
        .service('NavSearch', NavSearch);

    function NavSearch() {
        this.toggle = toggle;
        this.dismiss = dismiss;

        ////////////////

        var navbarFormSelector = 'form.navbar-form';

        function toggle() {
          var navbarForm = $(navbarFormSelector);

          navbarForm.toggleClass('open');

          var isOpen = navbarForm.hasClass('open');

          navbarForm.find('input')[isOpen ? 'focus' : 'blur']();
        }

        function dismiss() {
          $(navbarFormSelector)
            .removeClass('open') // Close control
            .find('input[type="text"]').blur() // remove focus
            // .val('') // Empty input
            ;
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app.preloader')
        .directive('preloader', preloader);

    preloader.$inject = ['$animate', '$timeout', '$q'];
    function preloader ($animate, $timeout, $q) {

        var directive = {
            restrict: 'EAC',
            template: 
              '<div class="preloader-progress">' +
                  '<div class="preloader-progress-bar" ' +
                       'ng-style="{width: loadCounter + \'%\'}"></div>' +
              '</div>'
            ,
            link: link
        };
        return directive;

        ///////

        function link(scope, el) {

          scope.loadCounter = 0;

          var counter  = 0,
              timeout;

          // disables scrollbar
          angular.element('body').css('overflow', 'hidden');
          // ensure class is present for styling
          el.addClass('preloader');

          appReady().then(endCounter);

          timeout = $timeout(startCounter);

          ///////

          function startCounter() {

            var remaining = 100 - counter;
            counter = counter + (0.015 * Math.pow(1 - Math.sqrt(remaining), 2));

            scope.loadCounter = parseInt(counter, 10);

            timeout = $timeout(startCounter, 20);
          }

          function endCounter() {

            $timeout.cancel(timeout);

            scope.loadCounter = 100;

            $timeout(function(){
              // animate preloader hiding
              $animate.addClass(el, 'preloader-hidden');
              // retore scrollbar
              angular.element('body').css('overflow', '');
            }, 300);
          }

          function appReady() {
            var deferred = $q.defer();
            var viewsLoaded = 0;
            // if this doesn't sync with the real app ready
            // a custom event must be used instead
            var off = scope.$on('$viewContentLoaded', function () {
              viewsLoaded ++;
              // we know there are at least two views to be loaded 
              // before the app is ready (1-index.html 2-app*.html)
              if ( viewsLoaded === 2) {
                // with resolve this fires only once
                $timeout(function(){
                  deferred.resolve();
                }, 3000);

                off();
              }

            });

            return deferred.promise;
          }

        } //link
    }

})();
/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.routes')
        .provider('RouteHelpers', RouteHelpersProvider)
        ;

    RouteHelpersProvider.$inject = ['APP_REQUIRES'];
    function RouteHelpersProvider(APP_REQUIRES) {

      /* jshint validthis:true */
      return {
        // provider access level
        basepath: basepath,
        resolveFor: resolveFor,
        // controller access level
        $get: function() {
          return {
            basepath: basepath,
            resolveFor: resolveFor
          };
        }
      };

      // Set here the base of the relative path
      // for all app views
      function basepath(uri) {
        return 'app/views/' + uri;
      }

      // Generates a resolve object by passing script names
      // previously configured in constant.APP_REQUIRES
      function resolveFor() {
        var _args = arguments;
        return {
          deps: ['$ocLazyLoad','$q', function ($ocLL, $q) {
            // Creates a promise chain for each argument
            var promise = $q.when(1); // empty promise
            for(var i=0, len=_args.length; i < len; i ++){
              promise = andThen(_args[i]);
            }
            return promise;

            // creates promise to chain dynamically
            function andThen(_arg) {
              // also support a function that returns a promise
              if(typeof _arg === 'function')
                  return promise.then(_arg);
              else
                  return promise.then(function() {
                    // if is a module, pass the name. If not, pass the array
                    var whatToLoad = getRequired(_arg);
                    // simple error check
                    if(!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                    // finally, return a promise
                    return $ocLL.load( whatToLoad );
                  });
            }
            // check and returns required data
            // analyze module items with the form [name: '', files: []]
            // and also simple array of script files (for not angular js)
            function getRequired(name) {
              if (APP_REQUIRES.modules)
                  for(var m in APP_REQUIRES.modules)
                      if(APP_REQUIRES.modules[m].name && APP_REQUIRES.modules[m].name === name)
                          return APP_REQUIRES.modules[m];
              return APP_REQUIRES.scripts && APP_REQUIRES.scripts[name];
            }

          }]};
      } // resolveFor

    }


})();


/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/


(function() {
    'use strict';

    angular
        .module('app.routes')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, helper){
        
        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(false);

        // defaults to login
        $urlRouterProvider.otherwise('/page/login');

        // 
        // Application Routes
        // -----------------------------------   
        $stateProvider
          .state('app', {
              url: '/app',
              abstract: true,
              templateUrl: helper.basepath('app.html'),
              resolve: helper.resolveFor('fastclick','modernizr','sparklines', 'icons','animo','underscore',
                        'sparklines','slimscroll','oitozero.ngSweetAlert','toaster','blockUI')
          })
          .state('app.welcome', {
              url: '/welcome',
              title: 'Welcome',
              templateUrl: helper.basepath('welcome.html'),
              controller: 'WelcomeController',
              controllerAs: 'vm'
          })
           .state('app.manage_user', {
                url: '/manage_user',
                title: 'manage users',
                templateUrl: helper.basepath('manageusers/manage.users.html'),
               resolve: angular.extend(helper.resolveFor('datatables','ngDialog','ui.select'),{}),
               controller: 'ManageUsersController',
               controllerAs: 'vm'
            })
            .state('app.manage_role', {
                url: '/manage_role',
                title: 'manage roles',
                templateUrl: helper.basepath('manageroles/manage.roles.html'),
                resolve:helper.resolveFor('datatables','ngDialog','ui.select'),
                controller: 'ManageRoleController',
                controllerAs: 'vm'
            })
            .state('app.mfi_setting', {
                url: '/mfi_setup',
                title: 'MFI Setting',
                templateUrl:helper.basepath('mfisetup/mfi.html'),
                resolve:helper.resolveFor('datatables','ngDialog','ui.select','moment','inputmask','ngFileUpload'),
                controller: 'MFIController',
                controllerAs: 'vm'
            })

            .state("app.manage_branch", {
                url: "/branches",
                title: "branches",
                templateUrl:helper.basepath('mfisetup/branches/branches.html'),
                controller: "BranchController",
                controllerAs: 'vm'
            })
            .state("app.manage_clients", {
                url: "/clients",
                title: "clients",
                templateUrl:helper.basepath('manage_clients/manage.clients.html'),
                resolve:helper.resolveFor('md.data.table','ui.select'),
                controller: "ClientsController",
                controllerAs: 'vm'
            })
            .state("app.client_detail", {
                url: "/clients/:id",
                title: "clients detail",
                templateUrl:helper.basepath('manage_clients/client.detail.html'),
                controller: "ClientDetailController",
                controllerAs: 'vm'
            })


          // CUSTOM RESOLVES
          //   Add your own resolves properties
          //   following this object extend
          //   method
          // -----------------------------------
            .state('page', {
                url: '/page',
                templateUrl: 'app/pages/page.html',
                resolve: helper.resolveFor('modernizr', 'icons','oitozero.ngSweetAlert','toaster','blockUI'),
                controller: ['$rootScope', function($rootScope) {
                    $rootScope.app.layout.isBoxed = false;
                }]
            })
            .state('page.login', {
                url: '/login',
                title: 'Login',
                templateUrl: 'app/pages/login.html',
                controller: 'LoginFormController',
                controllerAs: 'login'
            })
            .state('page.404', {
                url: '/404',
                title: 'Not Found',
                templateUrl: 'app/pages/404.html'
            })
            .state('page.500', {
                url: '/500',
                title: 'Server error',
                templateUrl: 'app/pages/500.html'
            })
            .state('page.maintenance', {
                url: '/maintenance',
                title: 'Maintenance',
                templateUrl: 'app/pages/maintenance.html'
            })
          ;

    } // routesConfig

})();


(function() {
    'use strict';

    angular
        .module('app.settings')
        .run(settingsRun);

    settingsRun.$inject = ['$rootScope', 'AuthService'];

    function settingsRun($rootScope, AuthService){


      // User Settings
      // -----------------------------------
      $rootScope.user = {
        name:     'Yonas',
        job:      'System Admin',
        picture:  'app/img/user/02.jpg'
      };

      // Hides/show user avatar on sidebar from any element
      $rootScope.toggleUserBlock = function(){
        $rootScope.$broadcast('toggleUserBlock');
      };
      $rootScope.logoutUser = function (){
            AuthService.Logout();
      };

      // Global Settings
      // -----------------------------------
      $rootScope.app = {
        name: 'Bidir Web',
        description: 'Bidir Web Application',
        year: ((new Date()).getFullYear()),
        layout: {
          isFixed: true,
          isCollapsed: false,
          isBoxed: false,
          isRTL: false,
          horizontal: false,
          isFloat: false,
          asideHover: false,
          theme: 'app/css/theme-d.css',
          asideScrollbar: false,
          isCollapsedText: false
        },
        useFullLayout: false,
        hiddenFooter: false,
        offsidebarOpen: false,
        asideToggled: false,
        viewAnimation: 'ng-fadeInUp'
      };

      // Setup the layout mode
      $rootScope.app.layout.horizontal = ( $rootScope.$stateParams.layout === 'app-h') ;

      // Restore layout settings [*** UNCOMMENT TO ENABLE ***]
      // if( angular.isDefined($localStorage.layout) )
      //   $rootScope.app.layout = $localStorage.layout;
      // else
      //   $localStorage.layout = $rootScope.app.layout;
      //
      // $rootScope.$watch('app.layout', function () {
      //   $localStorage.layout = $rootScope.app.layout;
      // }, true);

      // Close submenu when sidebar change from collapsed to normal
      $rootScope.$watch('app.layout.isCollapsed', function(newValue) {
        if( newValue === false )
          $rootScope.$broadcast('closeSidebarMenu');
      });

    }

})();

/**=========================================================
 * Module: sidebar-menu.js
 * Handle sidebar collapsible elements
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$rootScope', '$scope', '$state', 'SidebarLoader', 'Utils','PermissionService'];
    function SidebarController($rootScope, $scope, $state, SidebarLoader,  Utils,PermissionService) {

        activate();

        ////////////////

        function activate() {
          var collapseList = [];

          // demo: when switch from collapse to hover, close all items
          var watchOff1 = $rootScope.$watch('app.layout.asideHover', function(oldVal, newVal){
            if ( newVal === false && oldVal === true) {
              closeAllBut(-1);
            }
          });


          // Load menu from json file
          // -----------------------------------

          SidebarLoader.getMenu(sidebarReady);

          function sidebarReady(items) {
              $scope.menuItems = items.data;
              SetMenuItemsVisibility($scope.menuItems);
          }

          function SetMenuItemsVisibility(menuItems){
              var isSuper = false;
              if(!_.isUndefined($rootScope.currentUser)){
                  isSuper = $rootScope.currentUser.username === 'super@bidir.com';
              }
              _.each(menuItems, function(menuItem) {
                  if(isSuper){
                      menuItem.showMenuItem = true;
                      validateSubMenus(menuItem);
                  }
                  else {
                      menuItem.showMenuItem = PermissionService.hasThisModule(menuItem.module);
                      validateSubMenus(menuItem);
                  }

              });
          }

          function validateSubMenus(menuItem){
              var permissions = PermissionService.validateSubModules();
              if(!_.isUndefined(menuItem.submenu)){
                  _.each(menuItem.submenu,function(sub){
                      var isSuper = false;
                      if(!_.isUndefined($rootScope.currentUser)){
                          isSuper = $rootScope.currentUser.username === 'super@bidir.com';
                          if(isSuper){
                              sub.showsubmenu = true;
                          }else{
                              if(!_.isUndefined(sub.permission)){
                                  sub.showsubmenu = _.contains(permissions,sub.permission);
                              }else {
                                  sub.showsubmenu = false;
                              }
                          }
                      }else {
                          sub.showsubmenu = false;
                      }

                  });
              }
          }


          // Handle sidebar and collapse items
          // ----------------------------------
          $scope.getMenuItemPropClasses = function(item) {
            return (item.heading ? 'nav-heading' : '') +
                   (isActive(item) ? ' active' : '') ;
          };

          $scope.addCollapse = function($index, item) {
            collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
          };

          $scope.isCollapse = function($index) {
            return (collapseList[$index]);
          };

          $scope.toggleCollapse = function($index, isParentItem) {

            // collapsed sidebar doesn't toggle drodopwn
            if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) return true;

            // make sure the item index exists
            if( angular.isDefined( collapseList[$index] ) ) {
              if ( ! $scope.lastEventFromChild ) {
                collapseList[$index] = !collapseList[$index];
                closeAllBut($index);
              }
            }
            else if ( isParentItem ) {
              closeAllBut(-1);
            }

            $scope.lastEventFromChild = isChild($index);

            return true;

          };

          // Controller helpers
          // -----------------------------------

            // Check item and children active state
            function isActive(item) {
              if(!item) return;

              if( !item.sref || item.sref === '#') {
                var foundActive = false;
                angular.forEach(item.submenu, function(value) {
                  if(isActive(value)) foundActive = true;
                });
                return foundActive;
              }
              else
                return $state.is(item.sref) || $state.includes(item.sref);
            }

            function closeAllBut(index) {
              index += '';
              for(var i in collapseList) {
                if(index < 0 || index.indexOf(i) < 0)
                  collapseList[i] = true;
              }
            }

            function isChild($index) {
              /*jshint -W018*/
              return (typeof $index === 'string') && !($index.indexOf('-') < 0);
            }

            $scope.$on('$destroy', function() {
                watchOff1();
            });

        } // activate
    }

})();

/**=========================================================
 * Module: sidebar.js
 * Wraps the sidebar and handles collapsed state
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .directive('sidebar', sidebar);

    sidebar.$inject = ['$rootScope', '$timeout', '$window', 'Utils'];
    function sidebar ($rootScope, $timeout, $window, Utils) {
        var $win = angular.element($window);
        var directive = {
            // bindToController: true,
            // controller: Controller,
            // controllerAs: 'vm',
            link: link,
            restrict: 'EA',
            template: '<nav class="sidebar" ng-transclude></nav>',
            transclude: true,
            replace: true
            // scope: {}
        };
        return directive;

        function link(scope, element, attrs) {

          var currentState = $rootScope.$state.current.name;
          var $sidebar = element;

          var eventName = Utils.isTouch() ? 'click' : 'mouseenter' ;
          var subNav = $();

          $sidebar.on( eventName, '.nav > li', function() {

            if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) {

              subNav.trigger('mouseleave');
              subNav = toggleMenuItem( $(this), $sidebar);

              // Used to detect click and touch events outside the sidebar
              sidebarAddBackdrop();

            }

          });

          var eventOff1 = scope.$on('closeSidebarMenu', function() {
            removeFloatingNav();
          });

          // Normalize state when resize to mobile
          $win.on('resize.sidebar', function() {
            if( ! Utils.isMobile() )
          	asideToggleOff();
          });

          // Adjustment on route changes
          var eventOff2 = $rootScope.$on('$stateChangeStart', function(event, toState) {
            currentState = toState.name;
            // Hide sidebar automatically on mobile
            asideToggleOff();

            $rootScope.$broadcast('closeSidebarMenu');
          });

      	  // Autoclose when click outside the sidebar
          if ( angular.isDefined(attrs.sidebarAnyclickClose) ) {

            var wrapper = $('.wrapper');
            var sbclickEvent = 'click.sidebar';

            var watchOff1 = $rootScope.$watch('app.asideToggled', watchExternalClicks);

          }

          //////

          function watchExternalClicks(newVal) {
            // if sidebar becomes visible
            if ( newVal === true ) {
              $timeout(function(){ // render after current digest cycle
                wrapper.on(sbclickEvent, function(e){
                  // if not child of sidebar
                  if( ! $(e.target).parents('.aside').length ) {
                    asideToggleOff();
                  }
                });
              });
            }
            else {
              // dettach event
              wrapper.off(sbclickEvent);
            }
          }

          function asideToggleOff() {
            $rootScope.app.asideToggled = false;
            if(!scope.$$phase) scope.$apply(); // anti-pattern but sometimes necessary
      	  }

          scope.$on('$destroy', function() {
            // detach scope events
            eventOff1();
            eventOff2();
            watchOff1();
            // detach dom events
            $sidebar.off(eventName);
            $win.off('resize.sidebar');
            wrapper.off(sbclickEvent);
          });

        }

        ///////

        function sidebarAddBackdrop() {
          var $backdrop = $('<div/>', { 'class': 'dropdown-backdrop'} );
          $backdrop.insertAfter('.aside-inner').on('click mouseenter', function () {
            removeFloatingNav();
          });
        }

        // Open the collapse sidebar submenu items when on touch devices
        // - desktop only opens on hover
        function toggleTouchItem($element){
          $element
            .siblings('li')
            .removeClass('open')
            .end()
            .toggleClass('open');
        }

        // Handles hover to open items under collapsed menu
        // -----------------------------------
        function toggleMenuItem($listItem, $sidebar) {

          removeFloatingNav();

          var ul = $listItem.children('ul');

          if( !ul.length ) return $();
          if( $listItem.hasClass('open') ) {
            toggleTouchItem($listItem);
            return $();
          }

          var $aside = $('.aside');
          var $asideInner = $('.aside-inner'); // for top offset calculation
          // float aside uses extra padding on aside
          var mar = parseInt( $asideInner.css('padding-top'), 0) + parseInt( $aside.css('padding-top'), 0);
          var subNav = ul.clone().appendTo( $aside );

          toggleTouchItem($listItem);

          var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
          var vwHeight = $win.height();

          subNav
            .addClass('nav-floating')
            .css({
              position: $rootScope.app.layout.isFixed ? 'fixed' : 'absolute',
              top:      itemTop,
              bottom:   (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
            });

          subNav.on('mouseleave', function() {
            toggleTouchItem($listItem);
            subNav.remove();
          });

          return subNav;
        }

        function removeFloatingNav() {
          $('.dropdown-backdrop').remove();
          $('.sidebar-subnav.nav-floating').remove();
          $('.sidebar li.open').removeClass('open');
        }
    }


})();


(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .service('SidebarLoader', SidebarLoader);

    SidebarLoader.$inject = ['$http'];
    function SidebarLoader($http) {
        this.getMenu = getMenu;

        ////////////////

        function getMenu(onReady, onError) {
          var menuJson = 'server/sidebar-menu.json',
              menuURL  = menuJson + '?v=' + (new Date().getTime()); // jumps cache

          onError = onError || function() { alert('Failure loading menu'); };

          $http
            .get(menuURL)
            .then(onReady, onError);
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('UserBlockController', UserBlockController);

    UserBlockController.$inject = ['$scope','AuthService'];
    function UserBlockController($scope,AuthService) {
        var vm = this;
        activate();

        vm.user = AuthService.GetCurrentUser();

        ////////////////
        function activate() {

          $scope.userBlockVisible = false;

          var detach = $scope.$on('toggleUserBlock', function(/*event, args*/) {

            $scope.userBlockVisible = ! $scope.userBlockVisible;

          });

          $scope.$on('$destroy', detach);
        }
    }
})();

/**=========================================================
 * Module: animate-enabled.js
 * Enable or disables ngAnimate for element with directive
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('animateEnabled', animateEnabled);

    animateEnabled.$inject = ['$animate'];
    function animateEnabled ($animate) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          scope.$watch(function () {
            return scope.$eval(attrs.animateEnabled, scope);
          }, function (newValue) {
            $animate.enabled(!!newValue, element);
          });
        }
    }

})();

/**=========================================================
 * Module: browser.js
 * Browser detection
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .service('Browser', Browser);

    Browser.$inject = ['$window'];
    function Browser($window) {
      return $window.jQBrowser;
    }

})();

/**=========================================================
 * Module: clear-storage.js
 * Removes a key from the browser storage via element click
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('resetKey', resetKey);

    resetKey.$inject = ['$state', '$localStorage'];
    function resetKey ($state, $localStorage) {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
              resetKey: '@'
            }
        };
        return directive;

        function link(scope, element) {
          element.on('click', function (e) {
              e.preventDefault();

              if(scope.resetKey) {
                delete $localStorage[scope.resetKey];
                $state.go($state.current, {}, {reload: true});
              }
              else {
                $.error('No storage key specified for reset.');
              }
          });
        }
    }

})();

/**=========================================================
 * Module: fullscreen.js
 * Toggle the fullscreen mode on/off
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('toggleFullscreen', toggleFullscreen);

    toggleFullscreen.$inject = ['Browser'];
    function toggleFullscreen (Browser) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          // Not supported under IE
          if( Browser.msie ) {
            element.addClass('hide');
          }
          else {
            element.on('click', function (e) {
                e.preventDefault();

                if (screenfull.enabled) {
                  
                  screenfull.toggle();
                  
                  // Switch icon indicator
                  if(screenfull.isFullscreen)
                    $(this).children('em').removeClass('fa-expand').addClass('fa-compress');
                  else
                    $(this).children('em').removeClass('fa-compress').addClass('fa-expand');

                } else {
                  $.error('Fullscreen not enabled');
                }

            });
          }
        }
    }


})();

/**=========================================================
 * Module: load-css.js
 * Request and load into the current page a css file
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('loadCss', loadCss);

    function loadCss () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          element.on('click', function (e) {
              if(element.is('a')) e.preventDefault();
              var uri = attrs.loadCss,
                  link;

              if(uri) {
                link = createLink(uri);
                if ( !link ) {
                  $.error('Error creating stylesheet link element.');
                }
              }
              else {
                $.error('No stylesheet location defined.');
              }

          });
        }
        
        function createLink(uri) {
          var linkId = 'autoloaded-stylesheet',
              oldLink = $('#'+linkId).attr('id', linkId + '-old');

          $('head').append($('<link/>').attr({
            'id':   linkId,
            'rel':  'stylesheet',
            'href': uri
          }));

          if( oldLink.length ) {
            oldLink.remove();
          }

          return $('#'+linkId);
        }
    }

})();

/**=========================================================
 * Module: now.js
 * Provides a simple way to display the current time formatted
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('now', now);

    now.$inject = ['dateFilter', '$interval'];
    function now (dateFilter, $interval) {
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
          var format = attrs.format;

          function updateTime() {
            var dt = dateFilter(new Date(), format);
            element.text(dt);
          }

          updateTime();
          var intervalPromise = $interval(updateTime, 1000);

          scope.$on('$destroy', function(){
            $interval.cancel(intervalPromise);
          });

        }
    }

})();

/**=========================================================
 * Module: table-checkall.js
 * Tables check all checkbox
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('checkAll', checkAll);

    function checkAll () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          element.on('change', function() {
            var $this = $(this),
                index= $this.index() + 1,
                checkbox = $this.find('input[type="checkbox"]'),
                table = $this.parents('table');
            // Make sure to affect only the correct checkbox column
            table.find('tbody > tr > td:nth-child('+index+') input[type="checkbox"]')
              .prop('checked', checkbox[0].checked);

          });
        }
    }

})();

/**=========================================================
 * Module: trigger-resize.js
 * Triggers a window resize event from any element
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('triggerResize', triggerResize);

    triggerResize.$inject = ['$window', '$timeout'];
    function triggerResize ($window, $timeout) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attributes) {
          element.on('click', function(){
            $timeout(function(){
              // all IE friendly dispatchEvent
              var evt = document.createEvent('UIEvents');
              evt.initUIEvent('resize', true, false, $window, 0);
              $window.dispatchEvent(evt);
              // modern dispatchEvent way
              // $window.dispatchEvent(new Event('resize'));
            }, attributes.triggerResize || 300);
          });
        }
    }

})();

/**=========================================================
 * Module: utils.js
 * Utility library to use across the theme
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .service('Utils', Utils);

    Utils.$inject = ['$window', 'APP_MEDIAQUERY'];
    function Utils($window, APP_MEDIAQUERY) {

        var $html = angular.element('html'),
            $win  = angular.element($window),
            $body = angular.element('body');

        return {
          // DETECTION
          support: {
            transition: (function() {
                    var transitionEnd = (function() {

                        var element = document.body || document.documentElement,
                            transEndEventNames = {
                                WebkitTransition: 'webkitTransitionEnd',
                                MozTransition: 'transitionend',
                                OTransition: 'oTransitionEnd otransitionend',
                                transition: 'transitionend'
                            }, name;

                        for (name in transEndEventNames) {
                            if (element.style[name] !== undefined) return transEndEventNames[name];
                        }
                    }());

                    return transitionEnd && { end: transitionEnd };
                })(),
            animation: (function() {

                var animationEnd = (function() {

                    var element = document.body || document.documentElement,
                        animEndEventNames = {
                            WebkitAnimation: 'webkitAnimationEnd',
                            MozAnimation: 'animationend',
                            OAnimation: 'oAnimationEnd oanimationend',
                            animation: 'animationend'
                        }, name;

                    for (name in animEndEventNames) {
                        if (element.style[name] !== undefined) return animEndEventNames[name];
                    }
                }());

                return animationEnd && { end: animationEnd };
            })(),
            requestAnimationFrame: window.requestAnimationFrame ||
                                   window.webkitRequestAnimationFrame ||
                                   window.mozRequestAnimationFrame ||
                                   window.msRequestAnimationFrame ||
                                   window.oRequestAnimationFrame ||
                                   function(callback){ window.setTimeout(callback, 1000/60); },
            /*jshint -W069*/
            touch: (
                ('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
                (window.DocumentTouch && document instanceof window.DocumentTouch)  ||
                (window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0) || //IE 10
                (window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0) || //IE >=11
                false
            ),
            mutationobserver: (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null)
          },
          // UTILITIES
          isInView: function(element, options) {
              /*jshint -W106*/
              var $element = $(element);

              if (!$element.is(':visible')) {
                  return false;
              }

              var window_left = $win.scrollLeft(),
                  window_top  = $win.scrollTop(),
                  offset      = $element.offset(),
                  left        = offset.left,
                  top         = offset.top;

              options = $.extend({topoffset:0, leftoffset:0}, options);

              if (top + $element.height() >= window_top && top - options.topoffset <= window_top + $win.height() &&
                  left + $element.width() >= window_left && left - options.leftoffset <= window_left + $win.width()) {
                return true;
              } else {
                return false;
              }
          },

          langdirection: $html.attr('dir') === 'rtl' ? 'right' : 'left',

          isTouch: function () {
            return $html.hasClass('touch');
          },

          isSidebarCollapsed: function () {
            return $body.hasClass('aside-collapsed') || $body.hasClass('aside-collapsed-text');
          },

          isSidebarToggled: function () {
            return $body.hasClass('aside-toggled');
          },

          isMobile: function () {
            return $win.width() < APP_MEDIAQUERY.tablet;
          }

        };
    }
})();

(function() {
    'use strict';

    angular
        .module('app.translate')
        .config(translateConfig)
        ;
    translateConfig.$inject = ['$translateProvider'];
    function translateConfig($translateProvider){

      $translateProvider.useStaticFilesLoader({
          prefix : 'app/i18n/',
          suffix : '.json'
      });

      $translateProvider.preferredLanguage('en');
      $translateProvider.useLocalStorage();
      $translateProvider.usePostCompiling(true);
      $translateProvider.useSanitizeValueStrategy('sanitizeParameters');

    }
})();
(function() {
    'use strict';

    angular
        .module('app.translate')
        .run(translateRun)
        ;
    translateRun.$inject = ['$rootScope', '$translate'];
    
    function translateRun($rootScope, $translate){

      // Internationalization
      // ----------------------

      $rootScope.language = {
        // Handles language dropdown
        listIsOpen: false,
        // list of available languages
        available: {
          'en':       'English',
          'es_AR':    'Español'
        },
        // display always the current ui language
        init: function () {
          var proposedLanguage = $translate.proposedLanguage() || $translate.use();
          var preferredLanguage = $translate.preferredLanguage(); // we know we have set a preferred one in app.config
          $rootScope.language.selected = $rootScope.language.available[ (proposedLanguage || preferredLanguage) ];
        },
        set: function (localeId) {
          // Set the new idiom
          $translate.use(localeId);
          // save a reference for the current language
          $rootScope.language.selected = $rootScope.language.available[localeId];
          // finally toggle dropdown
          $rootScope.language.listIsOpen = ! $rootScope.language.listIsOpen;
        }
      };

      $rootScope.language.init();

    }
})();
/**
 * Created by Yoni on 12/3/2017.
 */
(function(angular) {
    "use strict";

    angular
        .module('app.welcomePage')
        .controller('TaskDetailController', TaskDetailController);

    TaskDetailController.$inject = ['$mdDialog', 'WelcomeService','items','SweetAlert'];

    function TaskDetailController($mdDialog, WelcomeService ,items,SweetAlert) {
        var vm = this
        vm.cancel = _cancel;
        vm.approveUser = _approveUser;
        vm.declineUser = _declineUser;
        vm.task = items.taskInfo;
        console.log("task ",vm.task);
        WelcomeService.GetUserAccount(vm.task.entity_ref).then(function(response){
            // console.log("task related user",response);
            vm.userInfo = response.data;

        },function(error){
            console.log("error",error);
        });

        function _approveUser() {
            var task = {
                taskId:vm.task._id ,
                status: "approved",
                comment: angular.isUndefined(vm.task.comment)?"no comment":vm.task.comment
            };
            updateStatus(task);
        }

        function _declineUser() {
            var task = {
                taskId:vm.task._id ,
                status: "declined",
                comment: angular.isUndefined(vm.task.comment)?"no comment":vm.task.comment
            };
            updateStatus(task);
        }

        function updateStatus(task){
            WelcomeService.ChangeTaskStatus(task).then(
                function(response) {
                    SweetAlert.swal('Task Status Changed!',
                        'Task '+ task.status + ' Successfully!',
                        'success');
                    console.log("task updated",response);
                    $mdDialog.hide();
                },
                function(error) {
                    SweetAlert.swal( 'Oops...',
                        'Something went wrong!',
                        'error');
                    console.log("could not be updated", error);
                }
            );
        }
        function _cancel() {
            $mdDialog.cancel();
        }
    }

}(window.angular));
/**
 * Created by Yoni on 12/3/2017.
 */
(function(angular) {
    "use strict";

    angular
        .module('app.welcomePage')
        .controller('WelcomeController', WelcomeController);

    WelcomeController.$inject = ['$mdDialog', 'WelcomeService','AuthService'];

    function WelcomeController($mdDialog, WelcomeService ,AuthService) {
        var vm = this;

    }

}(window.angular));
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
/**
 * Created by Yoni on 12/3/2017.
 */
(function () {
    'use strict';
    angular.module('app.core').factory('AlertService', AlertService);

    AlertService.$inject = ['SweetAlert']
    function AlertService(SweetAlert) {
        // init();
        return {
            showError: error,
            showInfo: info,
            showWarning: warning,
            showSuccess: success,
            errorHandler: errorHandler,
            showConfirm: showConfirm,
            showConfirmForDelete: showConfirmForDelete
        };
        function error(title,message) {
            SweetAlert.swal(title,message, "error");
        }
        function info(title,message) {
            SweetAlert.swal(title,message, "info");
        }
        function warning(title,message) {
            SweetAlert.swal({title: title, text: message, type: "warning", confirmButtonText: "Ok"});
        }
        function showConfirm(message, title, confirmText, confirmationType, closeOnConfirm) {
            closeOnConfirm = typeof closeOnConfirm === "undefined" || typeof closeOnConfirm !== "boolean" ? true : closeOnConfirm;
            confirmationType = typeof confirmationType === "undefined" || typeof confirmationType !== "string" ? "warning" : confirmationType;
            return SweetAlert.swal({
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
            return SweetAlert.swal({
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
        function success(title,message) {
            SweetAlert.swal(title,message, "success");
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
            SweetAlert.setDefaults({confirmButtonColor: '#0096884'});
        }
    }
})();
(function(angular) {

    'use strict';

    angular.module('app.common')
        .factory('CommonService', CommonService);

    function CommonService() {
        var factory = {
            buildUrl: _buildUrl,
            buildPaginatedUrl:_buildPaginatedUrl,
            buildUrlWithParam: _buildUrlWithParam,
            buildUrlForSearch: _buildUrlForSearch,
            Validation: {
              ComputeValidation: function (validationObject) {
                  var isValid = true;
                  var properties = _.allKeys(validationObject);
                  _.each(properties, function (property) {
                      isValid = isValid && validationObject[property];
                  });
                  return isValid;
              },
              ResetValidationObject: function (validationObject) {
                  var properties = _.allKeys(validationObject);
                  _.each(properties, function (property) {
                      validationObject[property] = true;
                  });
              },
              ValidateForm: function (validationObject, referenceObject) {
                  var isValid = true;
                  var properties = _.allKeys(validationObject);
                  var validateSingleObject= function (objValue) {
                      if(_.isString(objValue)){
                          return !_.isUndefined(objValue) && !_.isNull(objValue) && objValue.length > 0;
                      }

                      if(_.isNumber(objValue)){
                          return !_.isUndefined(objValue) && !_.isNull(objValue) && !_.isNaN(objValue);
                      }

                      if(_.isDate(objValue)){
                          return !_.isUndefined(objValue) && !_.isNull(objValue);
                      }

                      if(_.isObject(objValue)){

                          return !_.isUndefined(objValue) && !_.isNull(objValue)&& !_.isEmpty(objValue);
                      }

                      return !_.isUndefined(objValue) && !_.isNull(objValue);
                  };

                  _.each(properties, function (property) {
                      var index = property.indexOf('Valid');
                      if(index != -1) {
                          var objProperty = property.substring(2, index);
                      }
                      if (_.has(referenceObject, objProperty)) {
                          var objValue = referenceObject[objProperty];
                          validationObject[property] = validateSingleObject(objValue);
                      }else{
                          // console.log('Validation failed for: ',objProperty);
                          validationObject[property] = false;
                          isValid = false;
                      }
                      isValid = isValid && validationObject[property];
                  });
                  return isValid;
              }
          }
        };

        return factory;


        function _buildUrl(service,url) {
          return API.Config.BaseUrl + service +'/' + url;
        }
        function _buildPaginatedUrl(service,url,params) {
            // return url===''?API.Config.BaseUrl + service + '/paginate':
            //     API.Config.BaseUrl + service +'/' + url + '/paginate';
            var parameters = {start:1,limit:500};
            return url===''?API.Config.BaseUrl + service + '/paginate?page='+parameters.start+'&per_page=' + parameters.limit:
                API.Config.BaseUrl + service +'/' + url + '/paginate?page='+parameters.start+'&per_page=' + parameters.limit;
        }

        function _buildUrlWithParam(service,url, id) {
            return url===''?API.Config.BaseUrl + service + '/' + id : API.Config.BaseUrl + service +'/'+ url + '/' + id;
        }
        function _buildUrlForSearch(service,url, searchText) {
            return API.Config.BaseUrl + service +'/'+ url + '/search?search=' + searchText;
        }
    }

})(window.angular);

/**
 * Created by Yoni on 12/30/2017.
 */


(function(angular) {

    'use strict';

    angular.module('app.auth')
        .factory('PermissionService', PermissionService);

    PermissionService.$inject = ['StorageService','$rootScope','AuthService'];

    function PermissionService(StorageService,$rootScope,AuthService) {
        var factory = {
            hasThisPermission:_hasThisPermission,
            hasThesePermissions:_hasThesePermissions,
            permissions:_permissions,
            permittedModules:_permittedModules,
            hasThisModule:_hasThisModule,
            validateSubModules:_validateSubModules
        };

        return factory;


        function _permissions() {
            var user =  AuthService.GetCurrentUser();
            var response = {
                isSuper: false,
                permissions:[]
            };

            if(!_.isUndefined(user) && user !== null){
                if(!_.isUndefined(user.account)){
                    response.isSuper = false;
                    response.permissions =  user.account.role.permissions;
                    return response;
                }
                else if (!_.isUndefined(user.admin)) {
                    response  = {
                        isSuper: true,//superadmin
                        permissions:[]
                    };
                    return response;
                } else {
                    return response;
                }
            }else{
                return null;
            }

        }

        function _permittedModules(){

            var permissions = _permissions().permissions;
            var moduleObj = _.uniq(permissions,function(permi){
                return permi.module;
            });

            return _.pluck(moduleObj, 'module');
        }

        function _validateSubModules(){
            var permissions = _permissions().permissions;
            var moduleObj = _.uniq(permissions,function(permi){
                permi.entityPermission =_.isUndefined(permi.entity)? '': permi.module + '_' + permi.entity;
                return permi.entityPermission;
            });
            return _.pluck(moduleObj, 'entityPermission');
        }

        function _hasThisPermission(permission) {
            var allPermissions = _permissions();
            var hasPermission = false;
            
            if(allPermissions.isSuper){
                hasPermission = true;
            }else{
                var permissions = _.map(allPermissions.permissions, function(perm) {
                    return perm.module + '_' + perm.entity + '_'+ perm.operation;
                });
            hasPermission = _.contains(permissions, permission);
            }
            return hasPermission;
        }

        function _hasThisModule(module) {
            var allModules = _permittedModules();
            var hasModule = module === 'all'? true:_.contains(allModules, module);
            return hasModule;
        }

        function _hasThesePermissions(permissions) {
            var hasPermission = false;
            _.each(permissions, function(permission) {
                //return true if user has access to one of the permissions
                hasPermission = hasPermission || _hasThisPermission(permission);
            });
            return hasPermission;
        }



    }

})(window.angular);
(function(angular) {
    'use strict';

    angular.module('app.common')
        .service('StorageService', StorageService);

    StorageService.$inject = ['$localStorage'];

    function StorageService($localStorage) {
        var servce = {
            Get: get,
            Set: set,
            Remove: remove,
            Reset: reset
        };

        return servce;

        function get(key) {
            var val = $localStorage[key];

            if (!angular.isUndefined(val)) {
                return JSON.parse(val);
            } else return null;

        }

        function set(key, value) {
            $localStorage[key] = JSON.stringify(value);
        }

        function remove(key) {
            delete $localStorage[key];
        }

        function reset() {
            $localStorage.$reset();
        }
    }

})(window.angular);

(function() {
    'use strict';

    angular
        .module('custom', [
            // request the the entire framework
            'angle',
            // or just modules
            'app.mfi',
            'app.clients'
            /*...*/
        ]).run(customRun);

    function customRun() {
        console.log("custom app run");
    }
})();
/**
 * Created by Yoni on 1/8/2018.
 */
(function() {
    "use strict";

    angular.module("app.clients", [
    ]).run(runBlock);

    function runBlock() {
        console.log("client app run");
    }


})();

(function() {
  "use strict";

  angular.module("app.mfi", [
  ]).run(runBlock);

function runBlock() {
}


})();


// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('custom')
        .controller('Controller', Controller);

    Controller.$inject = ['$log'];
    function Controller($log) {
        // for controllerAs syntax
        // var vm = this;

        activate();

        ////////////////

        function activate() {
          $log.log('I\'m a line from custom.js');
        }
    }
})();

/**
 * Created by Yoni on 1/9/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.clients").controller("ClientDetailController", ClientDetailController);

    ClientDetailController.$inject = ['ClientService','$stateParams','blockUI'];

    function ClientDetailController(ClientService,$stateParams,blockUI) {
        var vm = this;
        vm.clientId =  $stateParams.id;

        var myBlockUI = blockUI.instances.get('ClientBlockUI');
        myBlockUI.start();
        ClientService.GetClientDetail(vm.clientId)
            .then(function(response){
                myBlockUI.stop();
                vm.client = response.data;
                console.log("client detail",response);
            },function(error){
                myBlockUI.stop();
                console.log("error getting client detail",error);
            })

    }


})(window.angular);
/**
 * Created by Yoni on 1/8/2018.
 */

(function(angular) {
    'use strict';
    angular.module('app.mfi')

        .service('ClientService', ClientService);

    ClientService.$inject = ['$http','CommonService'];

    function ClientService($http, CommonService) {
        return {
            GetClients: _getClients,
            GetClientDetail:_getClientDetail,
            SearchClient:_searchClient,
            GetBranches: _getBranches
        };
        function _searchClient(searchText) {
            return $http.get(CommonService.buildUrlForSearch(API.Service.SCREENING,API.Methods.Clients.Client,searchText));
        }
        function _getClients(){
            return $http.get(CommonService.buildUrl(API.Service.SCREENING,API.Methods.Clients.All));
        }
        function _getClientDetail(id){
            return $http.get(CommonService.buildUrlWithParam(API.Service.SCREENING,API.Methods.Clients.Client,id));
        }
        function _getBranches(){
            return $http.get(CommonService.buildPaginatedUrl(API.Service.MFI,API.Methods.MFI.Branches));
        }
    }


})(window.angular);
/**
 * Created by Yoni on 1/8/2018.
 */


(function(angular) {
    "use strict";

    angular.module("app.clients").controller("ClientsController", ClientsController);

    ClientsController.$inject = ['ClientService','$state','$scope','AuthService'];

    function ClientsController(ClientService,$state,$scope,AuthService) {
        var vm = this;
        vm.currentUser = {
            selected_access_branch:undefined
        };
        vm.pageSizes = [10, 25, 50, 100, 250, 500];
        vm.filter = {show : true};
        vm.request = {
            Start: 1,
            limit:100,
            PageSize: 10,
            Search:''
        };

        vm.clientDetail = _clientDetail;
        vm.onSelectedBranch = _onSelectedBranch;

        vm.clearSearch = function(){
            vm.request.Search = "";
            vm.filter.show = false;
            callApi();
        };



        callApi();
        GetBranchFilter();


        function GetBranchFilter() {
            if(AuthService.IsSuperuser()){
                ClientService.GetBranches().then(function(response){
                    vm.currentUser.user_access_branches = response.data.docs;
                },function(error){
                    vm.currentUser.user_access_branches = [];
                });
            }
            else {
                vm.currentUser.user_access_branches = AuthService.GetAccessBranches();
            }
        }

        function callApi(){
            $scope.promise = ClientService.GetClients().then(function(response){
                vm.clients = response.data.docs;
                vm.clientsCopy = angular.copy(vm.clients);
            },function (error) {
                console.log("error",error);
            });

        }

        function SearchApi(SearchText){
            $scope.promise = ClientService.SearchClient(SearchText)
                .then(function(response){
                vm.clients = response.data.docs;
                vm.clientsCount = response.data.total_docs_count;
                console.log(response);
            },function (error) {
                vm.clients = vm.clientsCopy;
                console.log("error",error);
            });
        }

        function _clientDetail(client,ev) {
            $state.go('app.client_detail',{id:client._id});
        }

        function _onSelectedBranch(){
            vm.clients = vm.clientsCopy;

            vm.clients = _.filter(vm.clients,function(client){
                if(!_.isUndefined(client.branch)){
                        return client.branch._id === vm.currentUser.selected_access_branch._id;
                }
            });

        }

        $scope.$watch(angular.bind(vm, function () {
            return vm.request.Search;
        }), function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if(newValue.length > 2){
                    SearchApi(newValue);
                }else{
                    vm.clients = vm.clientsCopy;
                }

            }
        });
    }


})(window.angular);

(function(angular) {
  'use strict';
  angular.module('app.mfi')

  .service('MainService', MainService);

  MainService.$inject = ['$http','CommonService','AuthService'];

  function MainService($http, CommonService,AuthService) {

      return {
        GetMFI: _getMFI,
        UpdateMFI: _updateMFI,
        CreateMFI:_createMFI,
        UpdateBranch: _updateBranch,
        GetBranches: _getBranches,
        CreateBranch:_createBranch
      };

      function _getBranches(){
          return $http.get(CommonService.buildPaginatedUrl(API.Service.MFI,API.Methods.MFI.Branches));
      }
      function _createBranch(branch){
        return $http.post(CommonService.buildUrl(API.Service.MFI,API.Methods.MFI.CreateBranch), branch);
      }
      function _updateBranch(updated_branch){
          return $http.put(CommonService.buildUrlWithParam(API.Service.MFI,API.Methods.MFI.Branches,updated_branch._id), updated_branch);
      }

      function _getMFI(){
        return $http.get(CommonService.buildUrl(API.Service.MFI,API.Methods.MFI.GetAll));
      }
      function _updateMFI(data,logo){
        var updatedMFI = setAttribute(data,logo);

        return $http({
          url: CommonService.buildUrlWithParam(API.Service.MFI,API.Methods.MFI.MFIUpdate,data._id),
          method: 'PUT',
          data: updatedMFI,
          //assigning content-type as undefined,let the browser
          //assign the correct boundary for us
          headers: {
                  'Content-Type': undefined},
          //prevents serializing payload.  don't do it.
          transformRequest: angular.identity
      });
      }

      function _createMFI(data,logo){
        var mfiData = setAttribute(data,logo);

        return $http({
          url: CommonService.buildUrl(API.Service.MFI,API.Methods.MFIUpdate),
          method: 'POST',
          data: mfiData,
          //assigning content-type as undefined,let the browser handle it
          headers: {
            'Authorization': 'Bearer ' + AuthService.GetToken(),
            'Content-Type': undefined},
          //prevents serializing data.  don't do it.
          transformRequest: angular.identity
      });

      }

      function setAttribute(mfi,picFile){
          var mfiData = new FormData();
          mfiData.append("name", mfi.name);
          mfiData.append("location", mfi.location);
          mfiData.append("establishment_year", mfi.establishment_year);
          mfiData.append("contact_person", _.isUndefined(mfi.contact_person)?'':mfi.contact_person);
          mfiData.append("phone", _.isUndefined(mfi.phone)?'':mfi.phone);
          mfiData.append("email", _.isUndefined(mfi.email)?'':mfi.email);
          mfiData.append("website_link", _.isUndefined(mfi.website_link)?'':mfi.website_link);
          if(!_.isUndefined(picFile)){
              mfiData.append("logo", picFile);
          }

          return mfiData;
      }
  }

})(window.angular);

(function(angular) {
  "use strict";

    angular.module("app.mfi").controller("BranchController", BranchController);

    BranchController.$inject = ['RouteHelpers','$mdDialog','MainService','AlertService','blockUI'];

  function BranchController(RouteHelpers, $mdDialog, MainService,AlertService,blockUI) {
    var vm = this;

    vm.addBranch = addBranch;
    vm.editBranch = _editBranch;
    vm.changeStatus = _changeStatus;

     getBranches();

    function getBranches() {
      MainService.GetBranches().then(
        function(response) {
          vm.branches = response.data.docs;
        },
        function(error) {
          console.log("error", error);
        }
      );

    }

    function addBranch(ev) {
        $mdDialog.show({
            locals: {items: null},
            templateUrl: RouteHelpers.basepath('mfisetup/branches/create.branch.dialog.html'),
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false,
            hasBackdrop: false,
            escapeToClose: true,
            controller: 'CreateBranchController',
            controllerAs: 'vm'
        }).then(function (answer) {
            getBranches();
        }, function () {
        });

    }

    function _editBranch(selectedBranch,ev) {
        $mdDialog.show({
            locals: {items: selectedBranch},
            templateUrl: RouteHelpers.basepath('mfisetup/branches/create.branch.dialog.html'),
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false,
            hasBackdrop: false,
            escapeToClose: true,
            controller: 'CreateBranchController',
            controllerAs: 'vm'
        }).then(function (answer) {
            getBranches();
        }, function () {
        });
    }

    function _changeStatus(ChangeStatus) {
      ChangeStatus.status = ChangeStatus.status === "active" ? "inactive" : "active";
      MainService.UpdateBranch(ChangeStatus).then(
        function(response) {

          AlertService.showSuccess(
              "Updated branch status",
              "Updated Status successfully."
          );
          // console.log("updated successfully", response);

        },
        function(error) {
          // console.log("could not be updated", error);
          AlertService.showError(
            "Status not changed. Please try again.",
            "ERROR"
          );
        }
      );

    }

  }
})(window.angular);

(function(angular) {
  "use strict";

  angular.module("app.mfi").controller("MFIController", MFIController);

  MFIController.$inject = ['AlertService', '$scope','MainService','CommonService','blockUI'];

  function MFIController(AlertService,$scope,MainService,CommonService,blockUI)

  {
    var vm = this;
    vm.saveChanges = saveChanges;

    vm.MFISetupForm = {
      IsnameValid: true,
      IslocationValid: true,
      IslogoValid: true,
      Isestablishment_yearValid: true
  };

    init();

    function saveChanges() {

      vm.IsValidData = CommonService.Validation.ValidateForm(vm.MFISetupForm, vm.MFI);

      if (vm.IsValidData) {
          var myBlockUI = blockUI.instances.get('MFIFormBlockUI');
          myBlockUI.start();
        if (_.isUndefined(vm.MFI._id)) {
          MainService.CreateMFI(vm.MFI, vm.picFile).then(function(response) {
              myBlockUI.stop();
              AlertService.showSuccess("Created MFI successfully","MFI Information created successfully");
              console.log("Create MFI", response);
            }, function(error) {
              myBlockUI.stop();
              console.log("Create MFI Error", error);
              var message = error.data.error.message;
            AlertService.showError("Failed to create MFI!", message);

            });
        } else {
          
          MainService.UpdateMFI(vm.MFI, vm.picFile).then(function(response) {
              myBlockUI.stop();
              AlertService.showSuccess("MFI Info updated successfully","MFI Information updated successfully");
              console.log("Update MFI", response);
            }, function(error) {
              myBlockUI.stop();
              console.log("UpdateMFI Error", error);
              var message = error.data.error.message;
              AlertService.showError("MFI Information update failed",message);
            });
        }
      } else {
          AlertService.showWarning("Warning","Please fill the required fields and try again.");
      }
    }

    function init() {
        var myBlockUI = blockUI.instances.get('MFIFormBlockUI');
        myBlockUI.start();
      MainService.GetMFI().then(
        function(response) {
            myBlockUI.stop();
          if (response.data.length > 0) {
            vm.MFI = response.data[0];
            var dt = new Date(vm.MFI.establishment_year);
            vm.MFI.establishment_year = dt;
          }
          console.log("Get MFI", response);
        },
        function(error) {
            myBlockUI.stop();
          console.log("Get MFI Error", error);
        }
      );

      $scope.clear = function() {
        $scope.dt = null;
      };

      $scope.dateOptions = {
        dateDisabled: false,
        formatYear: "yy",
        maxDate: new Date(2020, 5, 22),
        startingDay: 1
      };

      $scope.open1 = function() {
        $scope.popup1.opened = true;
      };

      $scope.format = "dd-MMMM-yyyy";
      $scope.altInputFormats = ["M!/d!/yyyy"];

      $scope.popup1 = {
        opened: false
      };
    }
  }
})(window.angular);

(function(angular) {
  'use strict';

    angular.module('app.mfi')
        .controller('CreateBranchController', CreateBranchController);

    CreateBranchController.$inject = ['$mdDialog','items','AlertService','CommonService','MainService','blockUI'];

  function CreateBranchController($mdDialog, items,AlertService,CommonService,MainService,blockUI) {
      var vm = this;
      vm.cancel = _cancel;
      vm.saveBranch = _saveBranch;
      vm.isEdit = items !== null;
      vm.branch = items !== null?items:null;
      vm.MFIBranchForm = {
          IsnameValid: true,
          IslocationValid: true
      };

      init();

      function _saveBranch() {
          vm.IsValidData = CommonService.Validation.ValidateForm(vm.MFIBranchForm, vm.branch);

          if(vm.branchForm.inputEmail.$error.email){
              AlertService.showWarning("Branch validation failed","Please provide valid email address");
          }else if(vm.IsValidData){
              var myBlockUI = blockUI.instances.get('CreateBranchBlockUI')
              myBlockUI.start();
              if(!vm.isEdit){
                  //Save new branch API
                  MainService.CreateBranch(vm.branch).then(
                      function(data) {
                          myBlockUI.stop();
                          $mdDialog.hide();
                          AlertService.showSuccess(
                              "success",
                              "Saved! Branch saved successfully."
                          );
                      },
                      function(response) {
                          myBlockUI.stop();
                          var message = response.data.error.message;
                          console.log("could not be saved", response.data);
                          AlertService.showError(
                              "ERROR",
                              "Could not be saved!, " + message
                          );
                      }
                  )
              }else {

                  var upBranch = {
                      _id: vm.branch._id,
                      name: vm.branch.name,
                      location: vm.branch.location,
                      branch_type: vm.branch.branch_type,
                      opening_date: vm.branch.opening_date
                  };

                      if(!_.isUndefined(vm.branch.email)){
                        upBranch.email =vm.branch.email;
                      }
                      if(_.isString(vm.branch.phone) && vm.branch.phone !== ""){
                        upBranch.phone =vm.branch.phone;
                      }
                      //Update branch api
                      MainService.UpdateBranch(upBranch).then(
                        function(response) {
                            myBlockUI.stop();
                          AlertService.showSuccess(
                            "Branch Updated",
                            "Branch updated successfully."
                          );
                          $mdDialog.hide();
                        },
                        function(response) {
                            myBlockUI.stop();
                            var message = response.data.error.message;
                          console.log("could not be updated", response.data);
                          AlertService.showError(
                              "Could not update Branch",
                              message
                          );
                        }
                      );

              }

          } else {
              AlertService.showError("Failed to create branch","Please fill the required fields and try again.");
          }
      }

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

      function _cancel() {
          $mdDialog.cancel();
      }

      function init(){
          vm.branchTypes =['Select Branch Type','Satellite office','Rural Service','Regional office','Urban office'];

          if(vm.isEdit)
          {
              var dt =_.isUndefined(vm.branch.opening_date)?undefined: new Date(vm.branch.opening_date);
              vm.branch.opening_date = dt;
          }else{
              vm.branch = { branch_type : vm.branchTypes[0] }; //SET DEFAULT SELECT OPTION FOR BRANCH TYPE
          }
      }
  }



})(window.angular);
