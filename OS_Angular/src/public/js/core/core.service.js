/**
 * @author Shawn
 * @desc Services of the mainAPP
 */

// For test
var commonTest = true;

(function() {
    'use strict';

    angular.module('app.core')

        // Broadcast the result of User status
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

        // Session manipulate
        .factory('Session', function($cookies) {
            var aName = "USERID";
            var bName = "SID";

            this.create = function(sessionId, userId) {
                $cookies.put(aName, userId);
                $cookies.put(bName, sessionId);
            }
            // this.create = function(sessionId, userId) {
            //     document.cookie = aName + '=' + userId;
            //     document.cookie = bName + '=' + sessionId;
            //     this.id = sessionId;
            //     this.userId = userId;
            // };

            this.get = function(name) {
                return $cookies.getObject(name);
                // if (document.cookie.length > 0) {
                //     var start = document.cookie.indexOf(name + "=");
                //     if (start != -1) {
                //         start = start + name.length + 1;
                //         var end = document.cookie.indexOf(";", start);
                //         if (end == -1) end = document.cookie.length;
                //         return unescape(document.cookie.substring(start, end));
                //     }
                // }
                // return "";
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

        // Global Services
        .factory('CommonService', function($http, Session) {
            // Set Content-Type to form-data which back-end can accept
            // $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

            var urlBackEnd = 'http://localhost:8080/';
            var urlMiddleEnd = 'https://ExampleURL.92/';

            // requests status handle
            this.isReqSuccess = function(res) {
                console.log(res);
                return res.data.errCode == 0 ? true : false;
            };

            // handle Http error
            this.handleHttpErr = function(res) {
                console.log('Req Error', res);
            };

            // handle response error (base on API)
            this.handleResErr = function(res) {
                console.log(res);
                if (res.data.errDesc == undefined) {
                    console.log('Error without discription');
                    console.log('msg: ' + res.errDesc);
                } else {
                    alert(res.data.errDesc);
                    console.log(res.data);
                }
            };

            // post single command to back-end server
            this.post = function(command, req) {
                // Request parameters structure
                var data = $.extend({
                    "command": command
                }, Session.getObj(), req);

                // console.log(angular.toJson(data));
                return commonTest ? $http({
                    url: 'test-data/' + command,
                    method: 'GET'
                }) : $http({
                    url: urlBackEnd + command,
                    method: 'POST',
                    data: "JsonStr=" + angular.toJson(data)
                })
            };

            // post multi commands to server
            this.postMulti = function() {

            };

            return this;
        })

        // Auth
        .factory('AuthService', function($http, $rootScope, AUTH_EVENTS, Session, CommonService) {

            var authService = {};

            authService.login = function(user) {
                return CommonService.post("login", user);
            };

            authService.logout = function() {
                return CommonService.post("logout");
            };

            // is session avalid
            authService.isAuthenticated = function() {
                console.log('isAuthenticated: ' + !!Session.get('USERID'));
                return !!Session.get('USERID');
            };

            return authService;
        })

        // register
        .factory('registerService', function($http, $rootScope, CommonService) {
            var service = {};

            service.register = function(user) {
                return CommonService.post("user/register.do", user);
            };

            return service;
        })

        // User
        .factory('userService', function($http, $rootScope, Session, CommonService) {
            var service = {};

            return service;
        })

})();
