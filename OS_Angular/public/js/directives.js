(function() {
    'use strict';

    angular.module('directives', [])

        .directive('login', function($compile) {
            return {
                restrict: 'E',
                scope: '@',
                templateUrl: '/partials/login.html',
                link: function(scope) {
                    // scope.name = "hel"
                }
            };
        })

        .directive('tplauditselect', function($compile) {
            return {
                restrict: 'E',
                scope: '@',
                templateUrl: '/manage/system/tpl/tpl_audit_select.action',
                link: function() {
                }
            };
        })



})();
