(() => {
    angular
        .module('app.components')
        .directive('clientOrderUpload', clientOrderUpload);

    function clientOrderUpload() {
        return {
            scope: {
                icon: "@"
            },
            templateUrl: 'js/components/client-order-add/client-order-upload.html',
            restrict: "E"
        };
    }
})();
