/**
 * @author Shawn
 * @desc mainAPP
 */
(function() {
    'use strict';

    angular.module('mainApp', ['ui.router', 'ui.bootstrap', 'ngAnimate','router', 'ctrls', 'services', 'filters', 'directives'])

    // Global
    .constant('WEB_INFO', {
        title: 'Order Management System'
    })

    .constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        pageNotFound: 'page-not-found',
        serverError: 'server-error'
    })

    // Do auth when state/url change
    .run(function($rootScope, AUTH_EVENTS, AuthService, Session) {
        $rootScope.$on('$stateChangeStart', function(event, next) {
            if (!AuthService.isAuthenticated()) {
                $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            } else {
                $rootScope.currentUser = Session.getUserName();
            }
        });
    })


    function rdLoading() {
        var d = {
            restrict: "AE",
            template: '<div class="loading"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>'
        };
        return d
    }
    angular.module("mainApp").directive("rdLoading", rdLoading);

    function rdWidgetBody() {
        var d = {
            requires: "^rdWidget",
            scope: {
                loading: "@?",
                classes: "@?"
            },
            transclude: !0,
            template: '<div class="widget-body" ng-class="classes"><rd-loading ng-show="loading"></rd-loading><div ng-hide="loading" class="widget-content" ng-transclude></div></div>',
            restrict: "E"
        };
        return d
    }
    angular.module("mainApp").directive("rdWidgetBody", rdWidgetBody);

    function rdWidgetFooter() {
        var e = {
            requires: "^rdWidget",
            transclude: !0,
            template: '<div class="widget-footer" ng-transclude></div>',
            restrict: "E"
        };
        return e
    }
    angular.module("mainApp").directive("rdWidgetFooter", rdWidgetFooter);

    function rdWidgetTitle() {
        var e = {
            requires: "^rdWidget",
            scope: {
                title: "@",
                icon: "@"
            },
            transclude: !0,
            template: '<div class="widget-header"><i class="fa" ng-class="icon"></i> {{title}} <div class="pull-right" ng-transclude></div></div>',
            restrict: "E"
        };
        return e
    }
    angular.module("mainApp").directive("rdWidgetHeader", rdWidgetTitle);

    function rdWidget() {
        var d = {
            transclude: !0,
            template: '<div class="widget" ng-transclude></div>',
            restrict: "EA"
        };
        return d
    }
    angular.module("mainApp").directive("rdWidget", rdWidget);



})();
