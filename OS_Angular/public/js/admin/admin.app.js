/*!
 * adminApp
 */
var adminApp = angular.module('adminApp', ['ui.router', 'ctrls', 'services', 'filters', 'directives'])

// 全局变量
.constant('WEB_INFO', {
    title: 'Example'
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
            $rootScope.currentUser = Session.getUserName();
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
    $urlRouterProvider.otherwise('/login');

    // Now set up the states
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'login.html',
        controller: 'loginCtrl'
    })

    // 项目管理
    .state('project', {
        url: '/project',
        templateUrl: 'partials/project/project.html',
        controller: 'projectCtrl'
    }).state('project.list', {
        url: '/list',
        templateUrl: 'partials/project/project.list.html'
    }).state('project.add', {
        url: '/add',
        templateUrl: 'partials/project/project.add.html'
    }).state('project.modify', {
        url: '/list',
        templateUrl: 'partials/project/project.list.html'
    })

    // 店铺管理
    .state('store', {
        url: '/store',
        templateUrl: 'partials/store/store.html',
        controller: 'storeCtrl'
    }).state('store.list', {
        url: '/list',
        templateUrl: 'partials/store/store.list.html'
    }).state('store.add', {
        url: '/add',
        templateUrl: 'partials/store/store.add.html'
    })
});
