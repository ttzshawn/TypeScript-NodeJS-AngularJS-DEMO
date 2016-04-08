(function() {
    'use strict';

    angular
        .module('app.components')
        .directive('coPie', coPie);

    function coPie() {
        return {
            scope: {
                icon: "@"
            },
            templateUrl: 'js/components/co-pie/co-pie.html',
            restrict: "E"
        };
    }


})();
