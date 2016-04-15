(() => {
    angular
        .module('app.widgets')
        .directive('rdWidget', rdWidget);

    function rdWidget() {
        const directive = {
            transclude: true,
            template: '<div class="widget" ng-transclude></div>',
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            /* */
        }
    }
})();
