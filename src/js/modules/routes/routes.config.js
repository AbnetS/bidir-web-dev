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

