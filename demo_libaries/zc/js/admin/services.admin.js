/*!
 * mainApp Services
 */

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
    this.destroy = function() {
        document.cookie = "USERID=";
        document.cookie = "SID=";
        this.id = null;
        this.userId = null;
    };
    return this;
})

.factory('AuthService', function($http, $rootScope, Session) {
    // 设置默认Content-Type为后台可接收的form-data格式
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    var authService = {};

    authService.login = function(user) {
        return $http.get('data/login.json', user)
            .then(function(res) {
                if (res.data.errcode == 2000) {
                    Session.create(res.data.sessionid, user.username);
                }
                return user.username;
            });
    };

    authService.logout = function() {
        Session.destroy();
        $rootScope.currentUser = null;
    }

    // 查询session是否可用
    authService.isAuthenticated = function() {
        console.log("isAuthenticated: " + !!Session.get("USERID"));
        return !!Session.get("USERID");
        // return $http({
        //     url: 'data/login.json',
        //     method: "GET",
        //     params: {
        //         "userid": Session.get("USERID"),
        //         "sid": Session.get("SID")
        //     }
        // }).then(function(res) {
        //     if (res.data.errcode == 2000) {
        //         $rootScope.currentUser = Session.get("USERID");
        //         return true;
        //     } else {
        //         return false;
        //     }
        // });
    };

    return authService;
})

.factory('loanSettingService', ['$http', '$httpParamSerializerJQLike', function($http, $httpParamSerializerJQLike) {

    // 设置默认Content-Type为后台可接收的form-data格式
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    var service = {};

    // 借款类型列表
    service.getAudit = function() {
        return $http({
            method: 'GET',
            url: '/manage/system/loanauditsetting!getAudit.action'
        });
    };

    // 查询显示类型
    service.getDisplayType = function() {
        return $http({
            method: 'GET',
            url: '/manage/system/loanauditsetting!getDisplayType.action'
        });
    };

    // 设置审核科目集合
    service.setAudit = function(reqData) {
        return $http({
            method: 'POST',
            url: '/manage/system/loanauditsetting!updateAuditItem.action',
            data: 'entity=' + angular.toJson(reqData)
        })
    };

    // 删除审核科目条目
    service.delAudit = function(id) {
        alert(1)
        return $http({
            method: 'POST',
            url: '/manage/system/loanauditsetting!deleteAuditItem.action',
            data: 'entitys=' + {
                "id": 20
            }
        })
    };
    return service;
}]);
