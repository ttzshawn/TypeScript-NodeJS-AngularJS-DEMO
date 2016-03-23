/**
 * @author Shawn
 * @desc Controllers of the mainAPP
 */
(function() {
    'use strict';

    angular.module('ctrls', [])

        // Parent/Main Controller
        .controller('mainCtrl', ['$rootScope', '$scope', '$location', 'AuthService', 'AUTH_EVENTS', 'CommonService', 'Session', 'goldService',
            function($rootScope, $scope, $location, AuthService, AUTH_EVENTS, CommonService, Session, goldService) {

                // for test
                $scope.toggleMO = function() {
                    $(this).addClass("al")
                    console.log(this)
                    $('.mo-list').animate({ width: 'toggle' }, 350);
                }
                $scope.orderItems = [];
                for (var i = 0; i < 30; i++) {
                    $scope.orderItems[i] = i;
                }

                $rootScope.setCurrentUser = function(user) {
                    $rootScope.currentUser = user;
                };

                // Log out
                $scope.logout = function() {
                    Session.destroy();
                    $rootScope.currentUser = null;
                    AuthService.logout().then(function(res) {
                        if (CommonService.isReqSuccess(res)) {
                            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
                            console.log('登出成功');
                        } else {
                            CommonService.handleResErr(res);
                        }
                    }, function(res) {
                        CommonService.handleHttpErr(res);
                    });
                }

                // Listening
                $scope.$on(AUTH_EVENTS.loginSuccess, function(event, data) {
                    console.log("login success");
                    $location.path('/');
                });

                $scope.$on(AUTH_EVENTS.pageNotFound, function(event, data) {
                    console.log('404 error');
                });

                $scope.$on(AUTH_EVENTS.serverError, function(event, data) {
                    console.log('500 error');
                });

            }
        ])

        // Login Controller
        .controller('LoginCtrl', ['$scope', '$rootScope', '$location', '$http', '$cookies', '$state', 'AUTH_EVENTS', 'CommonService', 'Session', 'AuthService',
            function($scope, $rootScope, $location, $http, $cookies, $state, AUTH_EVENTS, CommonService, Session, AuthService) {

                // if (!!$rootScope.currentUser) {
                //     $state.go('home');
                // }

                $scope.user = {};
                $scope.login = function(user) {

                    AuthService.login(user).then(function(res) {

                      console.log(res);
                        if (CommonService.isReqSuccess(res)) {
                            console.log('login success');
                            // $cookies.put(res.data.sessionid, user.accountname);
                            Session.create(res.data.sessionid, user.accountname);
                            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                            $state.go('home.order');
                            $rootScope.setCurrentUser(user.accountname);
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

        // Register Controller
        .controller('registerCtrl', ['$scope', '$location', 'registerService', function($scope, $location, registerService) {
            // If success jump to Login page
            $scope.register = function(user) {
                registerService.register(user).then(function(res) {
                    if (CommonService.isReqSuccess(res)) {
                        console.log(res);
                        alert('register成功');
                        $location.path("/login");
                    } else {
                        CommonService.handleResErr(res);
                    }
                }, function(res) {
                    alert('register失败');
                    CommonService.handleHttpErr(res);
                })
            }
        }])


        // User Controller
        .controller('userCtrl', ['$scope', '$rootScope', '$location', 'Session', 'AUTH_EVENTS', 'AuthService', function($scope, $rootScope, $location, Session, AUTH_EVENTS, AuthService) {
            $scope.$on(AUTH_EVENTS.logoutSuccess, function(event, data) {
                $location.path("/");
            });

            if (!AuthService.isAuthenticated()) {
                console.log("user need login");
                $location.path("/login");
            }

        }])



        // For test
        .controller('testCtrl', ['$scope', '$rootScope', '$location', '$http', 'AUTH_EVENTS', 'AuthService',
            function($scope, $rootScope, $location, $http, AUTH_EVENTS, AuthService) {
                $scope.obj = {
                    url: "user/login.do",
                    method: "POST",
                    data: ""
                };
                $scope.test = function(obj) {
                    var aa = (JSON.parse(obj.data));
                    $scope.result = {
                        result: "",
                        status: "",
                        msg: "",
                        content: ""
                    };
                    $http({
                        url: obj.url,
                        method: obj.method,
                        data: serializeData(aa)
                    }).then(function(res) {
                        console.log(res);
                        $scope.result.result = "Req Success";
                        $scope.result = res;
                    }, function(res) {
                        console.log(res);
                        $scope.result = res;
                        $scope.result.result = "Req Fail";
                    });
                }
            }
        ])

})();
