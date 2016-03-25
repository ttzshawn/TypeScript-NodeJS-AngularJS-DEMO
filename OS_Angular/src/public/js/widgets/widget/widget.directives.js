(function() {
    'use strict';


    angular
        .module('app.widgets')
        .directive("rdWidgetBody", rdWidgetBody);

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

})();
