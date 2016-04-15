(() => {
    angular
        .module('app.components')
        .directive('footer', footer);

    function footer() {
        return {
            scope: {
                icon: "@"
            },
            templateUrl: 'js/layout/footer/footer.html',
            restrict: "AE"
        };
    }
})();
