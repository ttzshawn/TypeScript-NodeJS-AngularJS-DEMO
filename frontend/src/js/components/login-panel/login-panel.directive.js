(() => {
    angular
        .module('app.components')
        .directive('loginPanel', loginPanel);

    loginPanel.$inject = ['$compile'];
    /* @ngInject */
    function loginPanel($compile) {
        return {
            restrict: 'E',
            scope: '@',
            templateUrl: 'js/components/login-panel/login-panel.html',
            link(scope) {
                // scope.name = "hel"
            }
        };
    }
})();
