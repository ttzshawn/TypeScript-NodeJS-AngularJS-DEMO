(function() {
    'use strict';


    angular
        .module('app.widgets')
        .directive('rdWidget', rdWidget);

    function rdWidget() {
        var directive = {
            transclude: true,
            template: '<div class="widget" ng-transclude></div>',
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            /* */
        }
    };

})();
