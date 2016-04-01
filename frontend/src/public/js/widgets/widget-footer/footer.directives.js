(function() {
    'use strict';
    angular
    .module('app.widgets')
    .directive("rdWidgetFooter", rdWidgetFooter);

    function rdWidgetFooter() {
        var e = {
            requires: "^rdWidget",
            transclude: !0,
            template: '<div class="widget-footer" ng-transclude></div>',
            restrict: "E"
        };
        return e
    }


})();
