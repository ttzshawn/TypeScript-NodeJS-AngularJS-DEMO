/**
 * @author Shawn
 * @desc Controllers of the mainAPP
 */

var ctrls = angular.module('ctrls', [])

.controller('mainCtrl', function($rootScope, $scope, $location, AuthService, AUTH_EVENTS) {
    $rootScope.setCurrentUser = function(user) {
        $rootScope.currentUser = user;
    };

    $scope.logout = function() {
        AuthService.logout();
        $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
    }

    $scope.$on(AUTH_EVENTS.loginSuccess, function(event, data) {
        console.log("登陆成功跳转");
        $location.path('/');
    });

    $scope.$on(AUTH_EVENTS.pageNotFound, function(event, data) {
        console.log('404没有此页面');
    });

    $scope.$on(AUTH_EVENTS.serverError, function(event, data) {
        console.log('500服务器出现了个问题');
    });
})

// 通用控制器, 放置控制器通用代码，如果处理返回错误
.controller('Common', ['$scope', '$rootScope', '$location', 'AUTH_EVENTS', 'AuthService', function($scope, $rootScope, $location, AUTH_EVENTS, AuthService) {
    this.handleResErr = function(res) {
        if (res.msg == undefined) {
            console.log('返回错误但是没有写明什么错');
            console.log('msg: ' + res.msg);
        } else {
            alert(res.msg);
            console.log(res.msg);
        }
    };
    return this;
}])

// 登陆控制器
.controller('loginCtrl', ['$scope', '$rootScope', '$location', 'AUTH_EVENTS', 'AuthService', function($scope, $rootScope, $location, AUTH_EVENTS, AuthService) {
    // 登陆、广播、设置用户名、返回上一级
    $scope.login = function(user) {
        AuthService.login(user);
    }
}])

// 注册控制器
.controller('registerCtrl', ['$scope', '$location', 'registerService', function($scope, $location, registerService) {
    // 注册，成功跳到登陆页面
    $scope.register = function(user) {
        console.log(user);
        console.log(registerService);
        registerService.register(user).then(function(res) {
            console.log(res);
            alert('注册成功');
            $location.path("/login");
        }, function(res) {
            alert('注册失败');
        })
    }
}])

// 用户控制器
.controller('userCtrl', ['$scope', '$rootScope', '$location', 'Session', 'AUTH_EVENTS', 'AuthService', function($scope, $rootScope, $location, Session, AUTH_EVENTS, AuthService) {
    $scope.$on(AUTH_EVENTS.logoutSuccess, function(event, data) {
        $location.path("/");
    });

    if (!AuthService.isAuthenticated()) {
        console.log("user need login");
        $location.path("/login");
    }

    $scope.goPay = function() {
        $('#pay-dialog').modal('toggle');
    };

    $scope.pay = function() {
        $('#pay-dialog').modal('toggle');
        $('#success-dialog').modal('toggle');
    };
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
            if (res.data.status == 1) {
                $scope.projects = res.data.content;
                console.log(res.data.content);
            } else {
                Common.handleResErr(res);
            }
        }, function(res) {
            console.log(res);
        });
    }

    // 页面加载动作
    var load = function() {
        $scope.search($scope.criteria);
    }
    load();
}])

// 项目详情
.controller('projectDetailCtrl', ['$scope', '$location', '$stateParams', 'AUTH_EVENTS', 'Common', 'AuthService', 'projectService',
    function($scope, $location, $stateParams, AUTH_EVENTS, Common, AuthService, projectService) {
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
                Common.handleResErr(res);
            }
        }, function(res) {
            console.log('请求错误');
        });

        $scope.followinvest = function() {
            // $scope.invest.itemid = $stateParams.projectId;
            // $scope.invest.itemid = 10;
            console.log($stateParams.projectId);
            projectService.followinvest($scope.invest).then(function(res) {
                if (res.data.status == 1) {
                    // $scope.project = res.data.content;

                    $('#invest-dialog').modal('toggle');
                    $('#pay-dialog').modal('toggle');

                    console.log(res.data.content);
                } else {
                    Common.handleResErr(res);
                }
            }, function(res) {
                console.log('请求错误');
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
                    Common.handleResErr(res);
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
                    Common.handleResErr(res);
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
                if (res.data.status == 1) {
                    alert('提交成功');
                } else {
                    Common.handleResErr(res);
                }
            }, function(res) {
                alert('提交错误');
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
