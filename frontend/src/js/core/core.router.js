/**
 * @author Shawn
 * @desc router of app.core
 */
(() => {
    angular.module('app.core')

        .config(
        ($stateProvider, $httpProvider, $urlRouterProvider, $locationProvider) => {

            // Interceptor of Requests
            $httpProvider.interceptors.push([
                '$injector',
                $injector => $injector.get('AuthInterceptor')
            ]);

            $locationProvider.html5Mode({
                enabled: false,
                requireBase: false
            });

            // For any unmatched url, redirect to /
            $urlRouterProvider.otherwise('/login');


            // loginregister
            $stateProvider

                // main page
                .state('dashboard', {
                    url: '/',
                    templateUrl: 'html/dashboard.html'
                })

                .state("dashboard.order", {
                    url: "order",
                    templateUrl: "js/components/client-order-list/client-order-list.html"
                }).state("dashboard.addClientOrder", {
                    url: "orderadd",
                    templateUrl: "js/components/client-order-add/client-order-add.html"
                }).state("dashboard.demo", {
                    url: "demo",
                    templateUrl: "html/demo.html"
                })

                .state('login', {
                    url: '/login',
                    templateUrl: 'html/login.html'
                }).state('register', {
                    url: '/register',
                    templateUrl: 'html/register.html'
                })

                // User Account
                .state('account', {
                    url: '/account',
                    templateUrl: 'html/account/account.html'
                }).state('account.me', {
                    url: '/me',
                    templateUrl: 'html/account/account.me.html'
                })

                // for test
                .state('test', {
                    url: '/test',
                    templateUrl: 'html/test-angular-ui-bootstrap.html',
                    controller: 'testCtrl'
                })
        }
        );
})();
