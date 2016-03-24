(function() {
    'use strict';

    function rdLoading() {
        var d = {
            restrict: "AE",
            template: '<div class="loading"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>'
        };
        return d
    }

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

    function rdWidget() {
        var d = {
            transclude: !0,
            template: '<div class="widget" ng-transclude></div>',
            restrict: "EA"
        };
        return d
    }

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


    function rdWidgetFooter() {
        var e = {
            requires: "^rdWidget",
            transclude: !0,
            template: '<div class="widget-footer" ng-transclude></div>',
            restrict: "E"
        };
        return e
    }




    angular.module('directives', [])

    .directive("rdLoading", rdLoading)

    .directive("rdWidgetBody", rdWidgetBody)

    .directive("rdWidgetFooter", rdWidgetFooter)

    .directive("rdWidgetHeader", rdWidgetTitle)

    .directive("rdWidget", rdWidget)



})();
