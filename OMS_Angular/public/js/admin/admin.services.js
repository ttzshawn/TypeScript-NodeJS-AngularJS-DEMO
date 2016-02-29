/**
 * @author Shawn
 * @desc Services of the mainAPP
 */

// 前端测试开关(true: 所有请求返回的是本地模拟json数据; false: 请求到服务器API)
var commonTest = false;

var services = angular.module('services', [])


// 广播拦截器结果
.factory('AuthInterceptor', function($rootScope, $q, AUTH_EVENTS) {
    return {
        responseError: function(response) {
            console.log(response);
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

// session操作(获取到的session存在cookie中)
.factory('Session', function() {
    var aName = "ADMINID";
    var bName = "ASID";
    this.create = function(sessionId, userId) {
        document.cookie = aName + '=' + userId;
        document.cookie = bName + '=' + sessionId;
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
    this.getUserName = function() {
        return this.get(aName);
    };
    this.getSessionId = function() {
        return this.get(bName);
    };
    this.getObj = function() {
        return {
            'accountname': this.get(aName),
            'sessionid': this.get(bName)
        }
    };
    this.destroy = function() {
        document.cookie = aName + '=';
        document.cookie = bName + '=';
        this.id = null;
        this.userId = null;
    };
    return this;
})

// 通用服务，请求预处理、响应预处理
.factory('CommonService', function($http, Session) {
    // 设置默认Content-Type为后台可接收的form-data格式
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    var url = 'https://ExampleURL.92/client/client!post.action';

    // 接口调用是否成功 (API约定)
    this.isReqSuccess = function(res) {
        console.log(res);
        return res.data.errcode == 0 ? true : false;
    };

    // handle Http error
    this.handleHttpErr = function(res) {
        console.log('请求出错', res);
    };

    // handle response error (API约定)
    // errcode: 错误码，成功为0，失败则为具体的非0错误码
    // errdesc: 错误描述
    this.handleResErr = function(res) {
        console.log(res);
        if (res.data.errdesc == undefined) {
            console.log('返回错误但是没有写明什么错');
            console.log('msg: ' + res.errdesc);
        } else {
            alert(res.data.errdesc);
            console.log(res.data);
        }
    };

    // post single command to server
    this.post = function(command, req) {
        // 封装请求 (指令command, 用户信息session, 参数req)
        var data = {
            "1": $.extend({
                "command": command
            }, Session.getObj(), req)
        };
        // console.log(angular.toJson(data));
        return commonTest ? $http({
            url: 'data/' + command,
            method: 'GET'
        }) : $http({
            url: url,
            method: 'POST',
            data: "JsonStr=" + angular.toJson(data)
        })
    };

    // post multi commands to server
    this.postMulti = function() {

    };

    return this;
})

// 身份权限服务(登录、登出、判断session是否可用)
.factory('AuthService', function($http, $rootScope, AUTH_EVENTS, Session, CommonService) {

    var authService = {};

    authService.login = function(user) {
        return CommonService.post("admin/login", user);
    };

    authService.logout = function() {
        return CommonService.post("admin/logout");
    };

    // 查询session是否可用
    authService.isAuthenticated = function() {
        console.log('isAuthenticated: ' + !!Session.get('ADMINID'));
        return !!Session.get('ADMINID');
    };

    return authService;
})

// 管理API
.factory('goldService', function($http, $rootScope, Session, CommonService) {
    // 设置默认Content-Type为后台可接收的form-data格式 (CommonService已设置)
    // $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    var service = {};

    // 1 查询实时金价
    service.querygoldprice = function() {
        return CommonService.post("gold/querygoldprice");
    };
    // 2 查询项目列表
    service.queryprojectlist = function() {
        return CommonService.post("gold/queryprojectlist");
    };
    // 3 查询项目详情
    service.queryprojectdetail = function(req) {
        return CommonService.post("gold/queryprojectdetail", req);
    };
    // 4 查询项目投资记录
    service.queryprojectinvestrecord = function(req) {
        return CommonService.post("gold/queryprojectinvestrecord", req);
    };
    // 5 投资项目
    service.invest = function(req) {
        return CommonService.post("gold/invest", req);
    };
    // 6 卖出
    service.sell = function(req) {
        return CommonService.post("gold/sell", req);
    };
    // 7 转定期
    service.moveinvesttofixed = function(req) {
        return CommonService.post("gold/moveinvesttofixed", req);
    };
    // 8 查询店铺列表
    service.querystorelist = function(req) {
        return CommonService.post("gold/querystorelist", req);
    };
    // 9 查询我的账户
    service.querymyaccount = function() {
        return CommonService.post("gold/myaccount/querymyaccount");
    };
    // 10 查询利息明细
    service.interestdetail = function(req) {
        return CommonService.post("gold/myaccount/interestdetail", req);
    };

    // 11 查询我的
    service.querymygold = function() {
        return CommonService.post("gold/myaccount/querymygold");
    };
    // 12 查询我的交易明细
    service.querymygoldtransaction = function(req) {
        return CommonService.post("gold/myaccount/querymygoldtransaction", req);
    };
    // 13 查询我的资金交易明细
    service.querymycapitaltransaction = function(req) {
        return CommonService.post("gold/myaccount/querymycapitaltransaction", req);
    };
    // 14 查询我的箱底金
    service.querymyfixedgold = function(req) {
        return CommonService.post("gold/myaccount/querymyfixedgold", req);
    };
    // 15 查询我的箱底金详情
    service.querymyfixedgolddetail = function(req) {
        return CommonService.post("gold/myaccount/querymyfixedgolddetail", req);
    };
    // 16 查一下我的箱底金利息详情
    service.querymyfixedgoldinterestdetail = function(req) {
        return CommonService.post("gold/myaccount/querymyfixedgoldinterestdetail", req);
    };

    // 1 添加项目
    service.addproject = function(req) {
        return CommonService.post("gold/admin/addproject", req);
    };

    // 2 添加店铺
    service.addstore = function(req) {
        return CommonService.post("gold/admin/addstore", req);
    };

    return service;
})
