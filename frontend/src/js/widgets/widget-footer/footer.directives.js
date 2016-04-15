(() => {
    angular
    .module('app.widgets')
    .directive("rdWidgetFooter", rdWidgetFooter);

    function rdWidgetFooter() {
        const e = {
            requires: "^rdWidget",
            transclude: !0,
            template: '<div class="widget-footer" ng-transclude></div>',
            restrict: "E"
        };
        return e
    }
})();
