(function() {
    'use strict';


    angular
        .module('app.components')
        .directive('loginPanel', loginPanel);

    loginPanel.$inject = ['$compile'];
    /* @ngInject */
    function loginPanel($compile) {
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
