/*!
 * adminApp
 */
var adminApp = angular.module('adminApp', ['ui.router', 'ctrls', 'services', 'filters', 'directives'])

// 全局变量
.constant('WEB', {
    title: ''
})

.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    pageNotFound: 'page-not-found',
    serverError: 'server-error'
})

// 路由改变的时候验证身份
.run(function($rootScope, Session, AUTH_EVENTS, AuthService) {
    $rootScope.$on('$stateChangeStart', function(event, next) {
        if (!AuthService.isAuthenticated()) {
            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        } else {
            $rootScope.currentUser = Session.get('USERID');
        }
    });
})

.config(function($stateProvider, $httpProvider, $urlRouterProvider, $locationProvider) {

    // 请求拦截器
    $httpProvider.interceptors.push([
        '$injector',
        function($injector) {
            return $injector.get('AuthInterceptor');
        }
    ]);

    // $locationProvider.html5Mode({
    //   enabled: true,
    //   requireBase: false
    // });

    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise('/');

    // Now set up the states
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'partials/login.html',
        controller: 'loginCtrl'
    })

    .state('project', {
        url: '/',
        templateUrl: 'partials/project/project.html',
        controller : function($location) {
            $location.path('/project/list');
        }
    }).state('project.list', {
        url: 'project/list',
        templateUrl: 'partials/project/project.list.html',
        controller: 'projectCtrl'
    }).state('project.listwait', {
        url: 'project/listwait',
        templateUrl: 'partials/project/project.list.html',
        controller: 'projectCtrl'
    }).state('project.listsuccess', {
        url: 'project/listsuccess',
        templateUrl: 'partials/project/project.list.html',
        controller: 'projectCtrl'
    }).state('project.detail', {
        url: 'project/detail',
        templateUrl: 'partials/project.detail.html',
        controller: 'projectCtrl'
    }).state('project.detailaudit', {
        url: 'project/detailaudit',
        templateUrl: 'partials/project.detailaudit.html',
        controller: 'projectCtrl'
    }).state('project.detailsuccess', {
        url: 'project.detailsuccess',
        templateUrl: 'partials/project.detailsuccess.html',
        controller: 'projectCtrl'
    })

    .state('fund', {
        url: '/fund.',
        templateUrl: 'partials/project.detailsuccess.html'
    });
});
