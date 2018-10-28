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
        $urlRouterProvider.otherwise('/app/welcome');

        // 
        // Application Routes
        // -----------------------------------   
        $stateProvider
          .state('app', {
              url: '/app',
              abstract: true,
              templateUrl: helper.basepath('app.html'),
              resolve: helper.resolveFor('fastclick','modernizr','sparklines', 'icons','animo','underscore',
                        'sparklines','slimscroll','oitozero.ngSweetAlert','toaster','blockUI'),
              data: {
                  authenticate: true
              }
          })
          .state('app.welcome', {
              url: '/welcome',
              title: 'Welcome',
              templateUrl: helper.basepath('welcome.html'),
              controller: 'WelcomeController',
              controllerAs: 'vm',
              data: {
                  authenticate: true
              }
          })
            .state('app.profile', {
                url: '/profile',
                title: 'Profile',
                templateUrl: helper.basepath('profile.html'),
                controller: 'ProfileController',
                controllerAs: 'vm',
                data: {
                    authenticate: true
                }
            })
           .state('app.manage_user', {
                url: '/manage_user',
                title: 'manage users',
                templateUrl: helper.basepath('manageusers/manage.users.html'),
               resolve: angular.extend(helper.resolveFor('datatables','ui.select'),{}),
               controller: 'ManageUsersController',
               controllerAs: 'vm',
               data: {
                   authenticate: true
               }
            })
            .state('app.manage_role', {
                url: '/manage_role',
                title: 'manage roles',
                templateUrl: helper.basepath('manageroles/manage.roles.html'),
                resolve:helper.resolveFor('datatables','ui.select'),
                controller: 'ManageRoleController',
                controllerAs: 'vm',
                data: {
                    authenticate: true
                }
            })
            .state('app.mfi_setting', {
                url: '/mfi_setup',
                title: 'MFI Setting',
                templateUrl:helper.basepath('mfisetup/mfi.html'),
                resolve:helper.resolveFor('datatables','ui.select','moment','inputmask','ngFileUpload'),
                controller: 'MFIController',
                controllerAs: 'vm',
                data: {
                    authenticate: true
                }
            })

            .state("app.manage_branch", {
                url: "/branches",
                title: "branches",
                templateUrl:helper.basepath('mfisetup/branches/branches.html'),
                controller: "BranchController",
                controllerAs: 'vm',
                data: {
                    authenticate: true
                }
            })
            .state("app.forms", {
                url: "/forms",
                title: "forms",
                templateUrl:helper.basepath('forms/forms.list.html'),
                resolve:helper.resolveFor('md.data.table','ui.select'),
                controller: "FormsController",
                controllerAs: 'vm',
                data: {
                    authenticate: true
                }
            })
            .state("app.builder", {
                url: "/forms/builder/:id",
                title: 'Form Builder',
                templateUrl:helper.basepath('forms/builder.html'),
                resolve:helper.resolveFor('md.data.table','ui.select','ui.sortable'),
                controller: 'FormBuilderController',
                controllerAs: 'vm',
                data: {
                    authenticate: true
                }
            })
            .state("app.acat", {
                url: "/acat",
                title: "acat",
                templateUrl:helper.basepath('acat/builder/acat.list.html'),
                resolve:helper.resolveFor('md.data.table'),
                controller: "ACATListController",
                controllerAs: 'vm',
                data: {
                    authenticate: true
                }
            })
            .state("app.acatbuilder", {
                url: "/acat/builder/:id",
                title: 'ACAT Builder',
                templateUrl:helper.basepath('acat/builder/acat.builder.html'),
                controller: 'ACATController',
                resolve:helper.resolveFor('md.data.table','ui.select'),
                controllerAs: 'vm',
                data: {
                    authenticate: true
                }
            })
            .state("app.crop", {
                url: "/crops",
                title: "crops",
                templateUrl:helper.basepath('acat/crop/crops.html'),
                resolve:helper.resolveFor('md.data.table'),
                controller: "CropsController",
                controllerAs: 'vm',
                data: {
                    authenticate: true
                }
            })
            .state("app.loanproduct", {
                url: "/loanproducts",
                title: "loan product",
                templateUrl:helper.basepath('mfisetup/loanproduct/loan.products.html'),
                resolve:helper.resolveFor('md.data.table','ui.select'),
                controller: "LoanProductsController",
                controllerAs: 'vm',
                data: {
                    authenticate: true
                }
            })
            .state("app.clients", {
                url: "/clients",
                title: "Client Management",
                templateUrl:helper.basepath('loan_management/client_management/client.management.html'),
                resolve:helper.resolveFor('md.data.table','ui.select'),
                controller: "ClientManagementController",
                controllerAs: 'vm',
                data: {
                    authenticate: true
                }
            })
            .state("app.client_detail", {
                url: "/clients/:id",
                title: "clients detail",
                templateUrl:helper.basepath('loan_management/client_management/client.detail.html'),
                controller: "ClientDetailController",
                controllerAs: 'vm',
                data: {
                    authenticate: true
                }
            })

            .state("app.loan_processing", {
                url: "/loan_processing",
                title: "Loan Processing",
                templateUrl:helper.basepath('loan_management/loan_processing/loan.processing.html'),
                resolve:helper.resolveFor('md.data.table','ui.select','moment','filestyle'),
                controller: "LoanProcessingController",
                controllerAs: 'vm',
                abstract: true,
                data: {
                    authenticate: true
                }
            })
            .state("app.loan_processing.clients", {
                url: "/clients",
                views: {
                    "tabContent": {
                        templateUrl: helper.basepath('loan_management/loan_processing/tabs/clients.html'),
                        controller: "ClientsController",
                        controllerAs: "vm"
                    }
                }})
            .state("app.loan_processing.screenings", {
                url: "/screenings",
                 views: {
                     "tabContent": {
                         templateUrl: helper.basepath('loan_management/loan_processing/tabs/screenings.html'),
                         controller: 'ScreeningProcessorController',
                         controllerAs:'vm'
                     }
                 }
                }
                )
            .state("app.loan_processing.loan_applications", {
                url: "/loan_application",
                views: {
                    "tabContent": {
                        templateUrl: helper.basepath('loan_management/loan_processing/tabs/loan_applications.html'),
                        controller: 'LoanApplicationProcessorController',
                        controllerAs:'vm'
                    }
                }

            })
            .state("app.loan_processing.acat", {
                url: "/acat_processor",
                views: {
                    "tabContent": {
                        templateUrl: helper.basepath('loan_management/loan_processing/tabs/acat.processor.html'),
                        controller: 'ACATProcessorController',
                        controllerAs:'vm'
                    }
                }

            })
            .state("app.report", {
                url: "/report",
                title: "Report",
                templateUrl:helper.basepath('report/report.html'),
                resolve:helper.resolveFor('md.data.table','ui.select','moment','filestyle'),
                controller: "ReportController",
                controllerAs: 'vm',
                data: {
                    authenticate: true
                }

            })
            .state("app.geospatial", {
                url: "/geospatial",
                title: "Geospatial",
                templateUrl:helper.basepath('geospatial/geospatial.html'),
                resolve:helper.resolveFor('md.data.table'),
                controller: "GeospatialController",
                controllerAs: 'vm',
                data: {
                    authenticate: true
                }
            })
            .state("app.banking", {
                url: "/core_banking",
                title: "Core Banking",
                templateUrl:helper.basepath('core_banking/core.banking.html'),
                resolve:helper.resolveFor('md.data.table','moment'),
                controller: "CoreBankingController",
                controllerAs: 'vm',
                data: {
                    authenticate: true
                }
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
                }],
                data: {
                    authenticate: false
                }
            })
            .state('page.login', {
                url: '/login',
                title: 'Login',
                templateUrl: 'app/pages/login.html',
                controller: 'LoginFormController',
                controllerAs: 'login',
                data: {
                    authenticate: false
                }
            })
            .state('page.404', {
                url: '/404',
                title: 'Not Found',
                templateUrl: 'app/pages/404.html',
                data: {
                    authenticate: false
                }
            })
            .state('page.500', {
                url: '/500',
                title: 'Server error',
                templateUrl: 'app/pages/500.html',
                data: {
                    authenticate: false
                }
            })
            .state('page.maintenance', {
                url: '/maintenance',
                title: 'Maintenance',
                templateUrl: 'app/pages/maintenance.html',
                data: {
                    authenticate: false
                }
            })
          ;

    } // routesConfig

})();

