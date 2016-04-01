(function() {
    'use strict';

    angular
        .module('app.widgets')
        .directive("rdWidgetHeader", rdWidgetTitle);


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

})();
