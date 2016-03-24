(function() {
    'use strict';


    angular.module('directives')
        .directive('login', login);

    function login($compile) {
        return {
            restrict: 'E',
            scope: '@',
            templateUrl: 'public/js/components/login-panel/login-panel.html',
            link: function(scope) {
                // scope.name = "hel"
            }
        };
    }

})();
