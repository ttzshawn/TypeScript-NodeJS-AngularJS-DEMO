/**
 * 全局控制器
 */
var ctrls = angular.module('ctrls', [])

.controller('mainCtrl', function($rootScope, $scope, $location, Session, CommonService, AuthService, AUTH_EVENTS) {
    // $rootScope.setCurrentUser = function(user) {
    //     $rootScope.currentUser = user;
    // };

    $scope.logout = function() {
        Session.destroy();
        $rootScope.currentUser = null;
        $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
    };

    $scope.$on(AUTH_EVENTS.loginSuccess, function(event, data) {
        console.log(data);
        $rootScope.currentUser = "data";
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
.controller('loginCtrl', ['$scope', '$rootScope', '$location', '$http', 'AUTH_EVENTS', 'CommonService', 'Session', 'AuthService',
    function($scope, $rootScope, $location, $http, AUTH_EVENTS, CommonService, Session, AuthService) {
        $scope.user = {};
        $scope.login = function(user) {

            user.ipaddr = returnCitySN["cip"];
            user.password = SHA1(user.password);

            AuthService.login(user).then(function(res) {
                if (CommonService.isReqSuccess(res)) {
                    console.log('登陆成功');
                    console.log(user.accountname);
                    // $rootScope.setCurrentUser(user.accountname);
                    Session.create(res.data.sessionid, user.accountname);
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, user.accountname);
                } else {
                    CommonService.handleResErr(res);
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                }
            }, function(res) {
                CommonService.handleHttpErr(res);
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });
            console.log(user);
        }
    }
])

// 项目管理
.controller('projectCtrl', ['$scope', 'CommonService', 'goldService', function($scope, CommonService, goldService) {
    // 查询项目列表
    goldService.queryprojectlist().then(function(res) {
        if (CommonService.isReqSuccess(res)) {
            $scope.projects = res.data.queryresult;
        } else {
            CommonService.handleResErr(res);
        }
    }, function(res) {
        CommonService.handleHttpErr(res);
    });

    // 添加项目
    $scope.addProject = function(proj) {
        goldService.addproject(proj).then(function(res) {
            if (CommonService.isReqSuccess(res)) {
                alert('添加项目成功！');
            } else {
                CommonService.handleResErr(res);
            }
        }, function(res) {
            CommonService.handleHttpErr(res);
        });
    }

}])


// 店铺管理
.controller('storeCtrl', ['$scope', 'CommonService', 'goldService', function($scope, CommonService, goldService) {

    // 查询店铺列表
    goldService.querystorelist().then(function(res) {
        if (CommonService.isReqSuccess(res)) {
            $scope.stores = res.data.queryresult;
        } else {
            CommonService.handleResErr(res);
        }
    }, function(res) {
        CommonService.handleHttpErr(res);
    });

    $scope.addstore = function(store) {
    // 添加店铺
        goldService.addstore(store).then(function(res) {
            if (CommonService.isReqSuccess(res)) {
                alert('添加店铺成功！');
            } else {
                CommonService.handleResErr(res);
            }
        }, function(res) {
            CommonService.handleHttpErr(res);
        });
    }

}])
