/**
 * 全局控制器
 */
var ctrls = angular.module('ctrls', [])

.controller('mainCtrl', function($rootScope, $scope, $location, AuthService, AUTH_EVENTS) {
    $scope.setCurrentUser = function(user) {
        $rootScope.currentUser = user;
    };

    $scope.logout = function() {
        AuthService.logout();
        $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
    };

    $scope.$on(AUTH_EVENTS.loginSuccess, function(event, data) {
        $location.path("/project/list");
    });

    $scope.$on(AUTH_EVENTS.logoutSuccess, function(event, data) {
        $location.path("login");
    });

    $scope.$on(AUTH_EVENTS.notAuthenticated, function(event, data) {
        $location.path("login");
    });

    $scope.$on(AUTH_EVENTS.pageNotFound, function(event, data) {
        console.log('404没有此页面');
    });

    $scope.$on(AUTH_EVENTS.serverError, function(event, data) {
        console.log('500服务器出现了个问题');
    });
})

// 登陆控制器
.controller('loginCtrl', ['$scope', '$rootScope', '$location', 'AUTH_EVENTS', 'AuthService', function($scope, $rootScope, $location, AUTH_EVENTS, AuthService) {

    if (AuthService.isAuthenticated()) {
        $location.path("/project/list");
    }

    // 登陆、广播、设置用户名、返回上一级
    $scope.login = function(user) {
        AuthService.login(user).then(function(res) {
            console.log(res);
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            $scope.setCurrentUser(res);
        }, function() {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        });
    }
}])

.controller('projectCtrl',['$scope', function($scope) {
    $scope.projects =  [{
        'id' : '1',
        'itemname' : '1',
        'classification' : '1',
        'financingtarget' : '1',
        'sellshares' : '1',
        'itemimages' : '1',
        'ordermoney' : '1',
        'collectmoney' : '1',
        'collectratio' : '1'
    },{
        'id' : '1',
        'itemname' : '1',
        'classification' : '1',
        'financingtarget' : '1',
        'sellshares' : '1',
        'itemimages' : '1',
        'ordermoney' : '1',
        'collectmoney' : '1',
        'collectratio' : '1'
    },{
        'id' : '1',
        'itemname' : '1',
        'classification' : '1',
        'financingtarget' : '1',
        'sellshares' : '1',
        'itemimages' : '1',
        'ordermoney' : '1',
        'collectmoney' : '1',
        'collectratio' : '1'
    }]
}])
