/**
 * @author Shawn
 * @desc mainAPP
 */

var mainApp = angular.module('mainApp', ['ui.router', 'ngAnimate', 'ctrls', 'services', 'filters', 'directives'])

// Global
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
.run(function($rootScope, AUTH_EVENTS, AuthService, Session) {
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
    //     enabled: true,
    //     requireBase: false
    // });

    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise('/');

    // loginregister
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'partials/user/login.html',
        controller: 'loginCtrl'
    }).state('register', {
        url: '/register',
        templateUrl: 'partials/user/register.html'
    }).state('pwdRecovery', {
        url: '/pwdRecovery',
        templateUrl: 'partials/user/pwdRecovery.html'
    })

    // 各个主页面
    .state('index', {
        url: '/',
        templateUrl: 'partials/index.html',
        controller: 'indexCtrl'
    })

    // 关于我们
    .state('about', {
        url: '/about',
        templateUrl: 'partials/about.html'
    }).state('about.intro', {
        url: '/intro',
        templateUrl: 'partials/about/intro.html'
    }).state('about.team', {
        url: '/team',
        templateUrl: 'partials/about/team.html'
    }).state('about.expert', {
        url: '/expert',
        templateUrl: 'partials/about/expert.html'
    }).state('about.partner', {
        url: '/partner',
        templateUrl: 'partials/about/partner.html'
    }).state('about.news', {
        url: '/news',
        templateUrl: 'partials/about/news.html'
    }).state('about.deal', {
        url: '/deal',
        templateUrl: 'partials/about/deal.html'
    }).state('about.join', {
        url: '/join',
        templateUrl: 'partials/about/join.html'
    }).state('about.call', {
        url: '/call',
        templateUrl: 'partials/about/call.html'
    })

    //理财
    .state('financing', {
        url: '/financing',
        templateUrl: 'partials/financing.html',
        controller: 'financingCtrl'
    }).state('detail', {
        url: '/detail',
        templateUrl: 'partials/project/detail.html'
    })

    // 资讯
    .state('headline', {
        url: '/headline',
        templateUrl: 'partials/headline.html'
    })

    // Example安全吗
    .state('safe', {
        url: '/safe',
        templateUrl: 'partials/safe.html'
    })

    // 账户体系
    .state('account', {
        url: '/account',
        templateUrl: 'partials/account/account.html'
    }).state('account.me', {
        url: '/me',
        templateUrl: 'partials/account/account.me.html'
    }).state('account.charge', {
        url: '/charge',
        templateUrl: 'partials/account/account.charge.html',
        controller: 'chargeCtrl'
    }).state('account.card', {
        url: '/card',
        templateUrl: 'partials/account/account.card.html'
    }).state('account.coupons', {
        url: '/coupons',
        templateUrl: 'partials/account/account.coupons.html'
    }).state('account.deposit', {
        url: '/deposit',
        templateUrl: 'partials/account/account.deposit.html'
    }).state('account.gold', {
        url: '/gold',
        templateUrl: 'partials/account/account.gold.html'
    }).state('account.reserve', {
        url: '/reserve',
        templateUrl: 'partials/account/account.reserve.html'
    }).state('account.transaction', {
        url: '/transaction',
        templateUrl: 'partials/account/account.transaction.html'
    }).state('account.withdraw', {
        url: '/withdraw',
        templateUrl: 'partials/account/account.withdraw.html'
    })


    // Now set up the states
    // $stateProvider.state('home', {
    //     url: '/',
    //     // templateUrl: 'partials/home.html',
    //     templateUrl: 'partials/project/home.html',
    //     controller: 'projectsCtrl'
    // }).state('login', {
    //     url: '/login',
    //     templateUrl: 'partials/login.html',
    //     controller: 'loginCtrl',
    //     data: {}
    // }).state('register', {
    //     url: '/register',
    //     templateUrl: 'partials/register.html',
    //     controller: 'registerCtrl'
    // })
    //
    // .state('project', {
    //     url: '/project',
    //     templateUrl: 'partials/project/home.html',
    //     controller: 'projectsCtrl'
    // }).state('projectlist', {
    //     url: '/projectlist',
    //     templateUrl: 'partials/project/list.html',
    //     controller: 'projectsCtrl'
    // }).state('detail', {
    //     url: '/detail/:projectId',
    //     templateUrl: 'partials/project/detail.html',
    //     controller: 'projectDetailCtrl'
    // })
    //
    // .state('launch', {
    //     url: '/launch',
    //     templateUrl: 'partials/launch/home.html',
    //     controller: function($location) {
    //         $location.path('launch/launch');
    //     }
    // }).state('launchPro', {
    //     url: '/launch/launch',
    //     templateUrl: 'partials/launch/launch.html',
    //     controller: 'launchCtrl'
    // }).state('investor', {
    //     url: '/investor',
    //     templateUrl: 'partials/investor/home.html'
    // }).state('investor.list', {
    //     url: '/investor/list',
    //     templateUrl: 'partials/investor/list.html'
    // }).state('investor.detail', {
    //     url: '/investor/detail',
    //     templateUrl: 'partials/investor/detail.html'
    // }).state('help', {
    //     url: '/help',
    //     templateUrl: 'partials/help/help.html'
    // }).state('help.item', {
    //     url: '/help/item',
    //     templateUrl: 'partials/help/item.html'
    // })
    //
    // .state('user', {
    //     url: '/user',
    //     templateUrl: 'partials/user/user.html',
    //     controller: function($location) {
    //         // $location.path('/user/info');
    //     }
    // }).state('user.info', {
    //     url: '/info',
    //     templateUrl: 'partials/user/user.info.html',
    //     controller: 'userCtrl'
    // }).state('user.record', {
    //     url: '/record',
    //     templateUrl: 'partials/user/user.record.html',
    //     controller: 'userCtrl'
    // }).state('user.invest', {
    //     url: '/invest',
    //     templateUrl: 'partials/user/user.invest.html',
    //     controller: 'userCtrl'
    // }).state('user.launch', {
    //     url: '/launch',
    //     templateUrl: 'partials/user/user.launch.html',
    //     controller: 'userCtrl'
    // }).state('user.concern', {
    //     url: '/concern',
    //     templateUrl: 'partials/user/user.concern.html',
    //     controller: 'userCtrl'
    // }).state('user.auth', {
    //     url: '/auth',
    //     templateUrl: 'partials/user/user.auth.html',
    //     controller: 'userCtrl'
    // })
    //
    .state('test', {
        url: '/test',
        templateUrl: 'partials/test.html',
        controller: 'testCtrl'
    })
});
