/**
 * @author Shawn
 * @desc Services of the mainAPP
 */

// For test
const commonTest = true;

(() => {
    angular
        .module('app.core')
        .factory('AuthInterceptor', AuthInterceptor)
        .factory('CommonService', CommonService)
        .factory('AuthService', AuthService)
        .factory('registerService', registerService)
        .factory('userService', userService);

    AuthInterceptor.$inject = ['$rootScope', '$q', '$window', 'AUTH_EVENTS'];
    AuthService.$inject = ['$http', '$rootScope', 'AUTH_EVENTS', '$window', 'CommonService'];
    CommonService.$inject = ['$http'];
    registerService.$inject = ['$http', '$rootScope', 'CommonService'];
    userService.$inject = ['$http', '$rootScope', 'CommonService'];


    // Interceptor
    function AuthInterceptor($rootScope, $q, $window, AUTH_EVENTS) {
        const service = {
            request: requestHandler,
            response: responseHandler,
            responseError: responseErrorHandler
        };
        return service;

        function requestHandler(config) {
            config.headers = config.headers || {};
            if ($window.localStorage.token) {
                config.headers['X-AuthToken'] = $window.localStorage.token;
            }
            return config;
        }

        function responseHandler(response) {
            // console.log(response)
            if (response.status === 401) {
                // handle the case where the user is not authenticated
            }
            return response || $q.when(response);
        }

        function responseErrorHandler(response) {
            // console.log(response);
            $rootScope.$broadcast({
                401: AUTH_EVENTS.notAuthenticated,
                403: AUTH_EVENTS.notAuthorized,
                405: 'method-not-allow',
                419: AUTH_EVENTS.sessionTimeout,
                440: AUTH_EVENTS.sessionTimeout,
                404: AUTH_EVENTS.pageNotFound,
                500: AUTH_EVENTS.serverError
            }[response.status], response);
            return $q.reject(response);
        }
    }

    function AuthService($http, $rootScope, AUTH_EVENTS, $window, CommonService) {

        const service = {};

        let storageTokenTitle = 'token',
            storageUserTitle = 'username';

        // forn user infomation (include token)
        service.createUserInfo = (username, token) => {
            $window.localStorage.setItem(storageUserTitle, username);
            $window.localStorage.setItem(storageTokenTitle, token);
        }
        service.destroy = () => {
            $window.localStorage.removeItem(storageUserTitle);
            $window.localStorage.removeItem(storageTokenTitle);
        }

        // only for Token
        service.createToken = (token) => {
            $window.localStorage.setItem(storageTokenTitle, token);
        };

        service.getToken = () => $window.localStorage.getItem(storageTokenTitle);

        service.removeToken = () => {
            $window.localStorage.removeItem(storageTokenTitle);
        }

        // only for username
        service.getUsername = () => {
            $window.localStorage.getItem(storageUserTitle)
        };

        service.login = user => CommonService.post("login", user);

        service.logout = () => CommonService.post("logout");

        // is session avalid
        service.isAuthenticated = () => {
            console.log(`isAuthenticated: ${!!$window.localStorage.token}`);
            return !!$window.localStorage.token;
        };

        return service;
    }


    function registerService($http, $rootScope, CommonService) {
        const service = {};

        service.register = user => CommonService.post("register", user);

        return service;
    }

    function userService($http, $rootScope, CommonService) {
        const service = {};

        return service;
    }


    // Global Services
    function CommonService($http) {
        // Set Content-Type to form-data which back-end can accept
        // $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        const urlBackEnd = 'http://lofewfcalhost:8080/ws/';
        // var urlBackEnd = 'http://10.22.16.124:8088/ws/marketorder/getByClientOrderId/';
        const urlMiddleEnd = 'https://ExampleURL.92/';

        // requests status handle
        this.isReqSuccess = res => {
            console.log(res);
            return res.data.errCode == 0 ? true : false;
        };

        // handle Http error
        this.handleHttpErr = res => {
            console.log('Req Error', res);
        };

        // handle response error (base on API)
        this.handleResErr = res => {
            console.log(res);
            if (res.data.errDesc == undefined) {
                console.log('Error without discription');
                console.log(`msg: ${res.errDesc}`);
            } else {
                alert(res.data.errDesc);
                console.log(res.data);
            }
        };

        // post single command to back-end server
        this.post = (command, data) => commonTest ? $http({
            url: `test-data/ws/${command}`,
            method: 'GET'
        }) : $http({
            url: urlBackEnd + command,
            method: 'POST',
            data
        });

        // post multi commands to server
        this.postMulti = () => {

        };

        return this;
    }



})();
