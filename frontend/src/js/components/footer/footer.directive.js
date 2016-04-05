(function() {
    'use strict';

    angular
        .module('app.components')
        .directive('footer', footer);

    function footer() {
        return {
            scope: {
                icon: "@"
            },
            templateUrl: 'js/components/footer/footer.html',
            restrict: "AE"
        };
    }

})();
