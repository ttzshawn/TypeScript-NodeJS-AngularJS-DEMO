/**
 * @author Shawn
 * @desc Controllers of the mainAPP
 */
(function() {
    'use strict';

    angular.module('ctrls', [])

        .controller("AlertsCtrl", ["$scope", function(e) {
            e.alerts = [{
                type: "success",
                msg: "Thanks for visiting! Feel free to create pull requests to improve the dashboard!"
            }, {
                    type: "danger",
                    msg: "Found a bug? Create an issue with as many details as you can."
                }], e.addAlert = function() {
                    e.alerts.push({
                        msg: "Another alert!"
                    })
                }, e.closeAlert = function(t) {
                    e.alerts.splice(t, 1)
                }
        }])

        // dashboard Sidebar
        .controller("MasterCtrl", ["$scope", "$cookies", function($scope, $cookies) {
            /**
             * Sidebar Toggle & Cookies Control
             */
            var mobileView = 992;
            $scope.getWidth = function() {
                return window.innerWidth;
            };
            $scope.$watch($scope.getWidth, function(newValue, oldValue) {
                if (newValue >= mobileView) {
                    if (angular.isDefined($cookies.get('toggle'))) {
                        $scope.toggle = !$cookies.get('toggle') ? true : false;
                    } else {
                        $scope.toggle = false;
                    }
                } else {
                    $scope.toggle = true;
                }
            });
            $scope.toggleSidebar = function() {
                $scope.toggle = !$scope.toggle;
                $cookies.put('toggle', $scope.toggle);
            };
            window.onresize = function() {
                $scope.$apply();
            };
        }])

        // angular-ui progressBar
        .controller('ProgressDemoCtrl', function($scope) {
            $scope.max = 200;

            $scope.random = function() {
                var value = Math.floor(Math.random() * 100 + 1);
                var type;

                if (value < 25) {
                    type = 'warning';
                } else if (value < 50) {
                    type = 'info';
                } else if (value < 75) {
                    type = 'success';
                } else {
                    type = 'success';
                }

                $scope.showWarning = type === 'danger' || type === 'warning';

                $scope.dynamic = value;
                $scope.type = type;
            };

            $scope.random();

            $scope.randomStacked = function() {
                $scope.stacked = [];
                var types = ['success', 'info', 'warning', 'danger'];

                for (var i = 0, n = Math.floor(Math.random() * 4 + 1); i < n; i++) {
                    var index = Math.floor(Math.random() * 4);
                    $scope.stacked.push({
                        value: Math.floor(Math.random() * 30 + 1),
                        type: types[index]
                    });
                }
            };

            $scope.randomStacked();
        })


        // angular-ui Modal
        .controller('ModalDemoCtrl', function($scope, $uibModal, $log) {
            $scope.items = ['item1', 'item2', 'item3'];
            $scope.animationsEnabled = true;
            $scope.open = function(size) {
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'myModalContent.html',
                    controller: 'ModalInstanceCtrl',
                    size: size,
                    resolve: {
                        items: function() {
                            return $scope.items;
                        }
                    }
                });

                modalInstance.result.then(function(selectedItem) {
                    $scope.selected = selectedItem;
                }, function() {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };
            $scope.toggleAnimation = function() {
                $scope.animationsEnabled = !$scope.animationsEnabled;
            };

        })

        // Please note that $uibModalInstance represents a modal window (instance) dependency.
        // It is not the same as the $uibModal service used above.
        // angular-ui Modal
        .controller('ModalInstanceCtrl', function($scope, $uibModalInstance, items) {
            $scope.items = items;
            $scope.selected = {
                item: $scope.items[0]
            };

            $scope.ok = function() {
                $uibModalInstance.close($scope.selected.item);
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        })


        // Parent/Main Controller
        .controller('mainCtrl', ['$rootScope', '$scope', '$location', 'AuthService', 'AUTH_EVENTS', 'CommonService', 'Session', 'goldService',
            function($rootScope, $scope, $location, AuthService, AUTH_EVENTS, CommonService, Session, goldService) {

                // for test
                $scope.toggleMO = function() {
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
        .controller('loginCtrl', ['$scope', '$rootScope', '$location', '$http', '$state', 'AUTH_EVENTS', 'CommonService', 'Session', 'AuthService',
            function($scope, $rootScope, $location, $http, $state, AUTH_EVENTS, CommonService, Session, AuthService) {

                // if (!!$rootScope.currentUser) {
                //     $state.go('home');
                // }

                $scope.user = {};
                $scope.login = function(user) {

                    $state.go('home.order');
                    // AuthService.login(user).then(function(res) {
                    //     if (CommonService.isReqSuccess(res)) {
                    //         console.log('login success');
                    //         Session.create(res.data.sessionid, user.accountname);
                    //         $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    //         // $rootScope.setCurrentUser(user.accountname);
                    //     } else {
                    //         CommonService.handleResErr(res);
                    //         $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                    //     }
                    // }, function(res) {
                    //     CommonService.handleHttpErr(res);
                    //     $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                    // });
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

        .controller('indexCtrl', function($rootScope, $scope, $location, AuthService, AUTH_EVENTS, goldService) {

        })


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


        // 项目列表
        .controller('projectsCtrl', ['$scope', '$location', 'AUTH_EVENTS', 'AuthService', 'projectService', function($scope, $location, AUTH_EVENTS, AuthService, projectService) {

            $scope.projects = [];
            // 查询条件，排序条件
            $scope.criteria = {
                itemname: "",
                classification: "",
                projectstatus: "",
                city: "",
                orderby: ""
            };
            // 根据条件查询项目列表
            $scope.search = function(search) {
                projectService.queryprojectlist(search).then(function(res) {
                    if (CommonService.isReqSuccess(res)) {
                        $scope.projects = res.data.content;
                        console.log(res.data.content);
                    } else {
                        CommonService.handleResErr(res);
                    }
                }, function(res) {
                    CommonService.handleHttpErr(res);
                });
            }

            // 页面加载动作
            var load = function() {
                $scope.search($scope.criteria);
            }
            load();
        }])

        // 项目详情
        .controller('projectDetailCtrl', ['$scope', '$location', '$stateParams', 'AUTH_EVENTS', 'CommonService', 'AuthService', 'projectService',
            function($scope, $location, $stateParams, AUTH_EVENTS, CommonService, AuthService, projectService) {
                $scope.project = {};
                projectService.queryproject({
                    // itemid: $stateParams.projectId
                    itemid: 10
                }).then(function(res) {
                    if (res.data.status == 1) {
                        $scope.project = res.data.content;
                        console.log(res.data.content);
                        // alert('提交成功');
                    } else {
                        CommonService.handleResErr(res);
                    }
                }, function(res) {
                    CommonService.handleHttpErr(res);
                });

                $scope.followinvest = function() {
                    // $scope.invest.itemid = $stateParams.projectId;
                    // $scope.invest.itemid = 10;
                    console.log($stateParams.projectId);
                    projectService.followinvest($scope.invest).then(function(res) {
                        if (res.data.status == 1) {
                            // $scope.project = res.data.content;
                            console.log(res.data.content);
                        } else {
                            CommonService.handleResErr(res);
                        }
                    }, function(res) {
                        CommonService.handleHttpErr(res);
                    });
                }

                $scope.leaderinvest = function() {
                    $scope.invest.itemid = $stateParams.projectId;
                    projectService.leaderinvest($scope.invest).then(function(res) {
                        if (res.data.status == 1) {
                            $('#leaderinvest-dialog').modal('toggle');
                            $('#pay-dialog').modal('toggle');
                            console.log(res.data.content);
                        } else {
                            CommonService.handleResErr(res);
                        }
                    }, function(res) {
                        console.log('请求错误');
                    });
                }

                $scope.payremain = function() {
                    var invest = {
                        investid: $stateParams.projectId
                    };
                    projectService.leaderinvest(invest).then(function(res) {
                        if (res.data.status == 1) {
                            $('#pay-dialog').modal('toggle');
                            $('#success-dialog').modal('toggle');
                            console.log(res.data.content);
                        } else {
                            CommonService.handleResErr(res);
                        }
                    }, function(res) {
                        console.log('请求错误');
                    });
                }
            }
        ])

        // 发起项目
        .controller('launchCtrl', ['$scope', '$location', 'AUTH_EVENTS', 'AuthService', 'projectService',
            function($scope, $location, AUTH_EVENTS, AuthService, projectService) {

                $scope.$on(AUTH_EVENTS.logoutSuccess, function(event, data) {
                    console.log("logout.redirect");
                    $location.path("/");
                });

                AuthService.isAuthenticated();

                $scope.$on(AUTH_EVENTS.notAuthenticated, function(event, data) {
                    console.log("notAuth.redirect");
                    $location.path("/login");
                });

                $scope.proj = {};
                $scope.proj.teaminfo = [];
                $scope.addTeamMember = function() {
                    console.log($scope.proj.teaminfo);
                    $scope.proj.teaminfo.push({});
                    console.log($scope.proj.teaminfo);
                }
                $scope.launch = function(project) {
                    var html = um.getContent();
                    console.log(html);
                    project.itemdetails = html;
                    projectService.launch(project).then(function(res) {
                        if (CommonService.isReqSuccess(res)) {
                            alert('提交成功');
                        } else {
                            CommonService.handleResErr(res);
                        }
                    }, function(res) {
                        CommonService.handleHttpErr(res);
                    });
                }
            }
        ])


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
