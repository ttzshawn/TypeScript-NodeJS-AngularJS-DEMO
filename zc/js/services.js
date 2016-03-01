/**
 * @author Shawn
 * @desc Services of the mainAPP
 */

// 前端测试开关，打开之后所有请求由模拟json数据返回
var commonTest = true;
var services = angular.module('services', [])

// 广播拦截器结果
.factory('AuthInterceptor', function($rootScope, $q, AUTH_EVENTS) {
    return {
        responseError: function(response) {
            // console.log(response);
            $rootScope.$broadcast({
                401: AUTH_EVENTS.notAuthenticated,
                403: AUTH_EVENTS.notAuthorized,
                419: AUTH_EVENTS.sessionTimeout,
                440: AUTH_EVENTS.sessionTimeout,
                404: AUTH_EVENTS.pageNotFound,
                500: AUTH_EVENTS.serverError
            }[response.status], response);
            return $q.reject(response);
        }
    };
})

// 身份验证
.factory('Session', function() {
    this.create = function(sessionId, userId) {
        document.cookie = "USERID=" + userId;
        document.cookie = "SID=" + sessionId;
        this.id = sessionId;
        this.userId = userId;
    };
    this.get = function(name) {
        if (document.cookie.length > 0) {
            var start = document.cookie.indexOf(name + "=");
            if (start != -1) {
                start = start + name.length + 1;
                var end = document.cookie.indexOf(";", start);
                if (end == -1) end = document.cookie.length;
                return unescape(document.cookie.substring(start, end));
            }
        }
        return "";
    };
    this.getObj = function() {
        return {
            'accountname': this.get('USERID'),
            'sessionid': this.get('SID')
        }
    };
    this.destroy = function() {
        document.cookie = "USERID=";
        document.cookie = "SID=";
        this.id = null;
        this.userId = null;
    };
    return this;
})


// 广播拦截器结果
.factory('AuthInterceptor', function($rootScope, $q, AUTH_EVENTS) {
    return {
        responseError: function(response) {
            // console.log(response);
            $rootScope.$broadcast({
                401: AUTH_EVENTS.notAuthenticated,
                403: AUTH_EVENTS.notAuthorized,
                419: AUTH_EVENTS.sessionTimeout,
                440: AUTH_EVENTS.sessionTimeout,
                404: AUTH_EVENTS.pageNotFound,
                500: AUTH_EVENTS.serverError
            }[response.status], response);
            return $q.reject(response);
        }
    };
})

// 通用服务，用于纯前端测试等
.factory('Common', function($http, Session) {
    this.post = function(url, req) {
        var data = serializeData($.extend(Session.getObj(), req));
        if (commonTest == true) {
            return $http({
                url: "data/" + url,
                method: "GET",
                data: data
            });
        } else {
            return $http({
                url: url,
                method: "POST",
                data: data
            });
        }
    };
    return this;
})

.factory('AuthService', function($http, $rootScope, AUTH_EVENTS, Session, Common) {
    // 设置默认Content-Type为后台可接收的form-data格式
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    var authService = {};
    authService.login = function(user) {
        Common.post("user/login.do", user).then(function(res) {
            if (res.data.status == 1) {
                // alert('登陆成功');
                console.log('登陆成功');
                Session.create(res.data.sessionid, user.accountname);
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                $rootScope.setCurrentUser(user.accountname);
            } else {
                alert(res.data.msg);
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            }
        }, function(res) {
            console.log('请求无效');
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        });
    };

    authService.logout = function() {
        Session.destroy();
        $rootScope.currentUser = null;
    }

    // 查询session是否可用
    authService.isAuthenticated = function() {
        console.log('isAuthenticated: ' + !!Session.get('USERID'));
        return !!Session.get('USERID');
    };

    return authService;
})

.factory('registerService', function($http, $rootScope, Common) {
    // 设置默认Content-Type为后台可接收的form-data格式
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    var service = {};

    service.register = function(user) {
        return Common.post("user/register.do", user);
    };

    return service;
})

.factory('projectService', function($http, $rootScope, Session, Common) {
    // 设置默认Content-Type为后台可接收的form-data格式
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    var service = {};

    service.queryprojectlist = function(search) { // 查询项目列表
        return Common.post("queryprojectlist.do", search);
    };

    service.queryproject = function(req) { // 查询单个项目详情
        return Common.post("queryproject.do", req);
    };

    service.followinvest = function(req) { // 跟投
        return Common.post("followinvest.do", req);
    };
    service.leaderinvest = function(req) { // 领投
        return Common.post("leaderinvest.do", req);
    };

    service.payremain = function(req) { // 支付余款
        return Common.post("payremain.do", req);
    };

    service.launch = function(req) { // 发起项目
        return Common.post("addproject.do", req);
    };

    return service;
})
