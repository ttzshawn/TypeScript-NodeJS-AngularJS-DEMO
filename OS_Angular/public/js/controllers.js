/**
 * @author Shawn
 * @desc Controllers of the mainAPP
 */

var ctrls = angular.module('ctrls', [])


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


// 主控制器，各个子view共用
.controller('mainCtrl', ['$rootScope', '$scope', '$location', 'AuthService', 'AUTH_EVENTS', 'CommonService', 'Session', 'goldService',
    function($rootScope, $scope, $location, AuthService, AUTH_EVENTS, CommonService, Session, goldService) {
        $rootScope.setCurrentUser = function(user) {
            $rootScope.currentUser = user;
        };

        // 注销
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

        // 接收监听登录成功事件
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

// login控制器
.controller('loginCtrl', ['$scope', '$rootScope', '$location', '$http', '$state', 'AUTH_EVENTS', 'CommonService', 'Session', 'AuthService',
    function($scope, $rootScope, $location, $http, $state, AUTH_EVENTS, CommonService, Session, AuthService) {

        if (!!$rootScope.currentUser) {
            $state.go('account.me');
        }

        $scope.user = {};
        $scope.login = function(user) {

            user.ipaddr = returnCitySN["cip"];
            user.password = SHA1(user.password);

            AuthService.login(user).then(function(res) {
                if (CommonService.isReqSuccess(res)) {
                    console.log('login成功');
                    Session.create(res.data.sessionid, user.accountname);
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    // $rootScope.setCurrentUser(user.accountname);
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

// register控制器
.controller('registerCtrl', ['$scope', '$location', 'registerService', function($scope, $location, registerService) {
    // register，成功跳到login页面
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


// 理财
.controller('financingCtrl', ['$rootScope', '$scope', '$location', 'AuthService', 'AUTH_EVENTS', 'CommonService', 'goldService',
    function($rootScope, $scope, $location, AuthService, AUTH_EVENTS, CommonService, goldService) {
        goldService.queryprojectlist().then(function(res) {
            if (CommonService.isReqSuccess(res)) {
                $scope.projects = res.data.queryresult;
            } else {
                CommonService.handleResErr(res);
            }
        }, function(res) {
            CommonService.handleHttpErr(res);
        })
    }
])

// 用户控制器
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


// 测试器, 页面地址为 /#/test
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
                $scope.result.result = "请求发送成功";
                $scope.result = res;
            }, function(res) {
                console.log(res);
                $scope.result = res;
                $scope.result.result = "请求发送失败";
            });
        }
    }
])


// 账户 -- 充值
.controller('chargeCtrl', ['$scope', '$location', 'AUTH_EVENTS', 'AuthService', 'middleEndService',
    function($scope, $location, AUTH_EVENTS, AuthService, middleEndService) {

        $scope.$on(AUTH_EVENTS.logoutSuccess, function(event, data) {
            console.log("logout.redirect");
            $location.path("/");
        });

        AuthService.isAuthenticated();

        $scope.$on(AUTH_EVENTS.notAuthenticated, function(event, data) {
            console.log("notAuth.redirect");
            $location.path("/login");
        });

        // $scope.proj = {};
        // $scope.proj.teaminfo = [];
        // $scope.addTeamMember = function() {
        //     console.log($scope.proj.teaminfo);
        //     $scope.proj.teaminfo.push({});
        //     console.log($scope.proj.teaminfo);
        // }
        // $scope.launch = function(project) {
        //     var html = um.getContent();
        //     console.log(html);
        //     project.itemdetails = html;
        //     projectService.launch(project).then(function(res) {
        //         if (CommonService.isReqSuccess(res)) {
        //             alert('提交成功');
        //         } else {
        //             CommonService.handleResErr(res);
        //         }
        //     }, function(res) {
        //         CommonService.handleHttpErr(res);
        //     });
        // }

        $scope.req = {
            model: {
                rechargetype: '通联支付'
            },
            reqrechargeamount: 1
        };

        $scope.charge = function(req) {
            middleEndService.charge(req).then(function(res) {
                if (CommonService.isReqSuccess(res)) {
                    alert('充值成功');
                } else {
                    CommonService.handleResErr(res);
                }
            }, function(res) {
                CommonService.handleHttpErr(res);
            });
        }

    }
])
