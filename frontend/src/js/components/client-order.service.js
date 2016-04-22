(() => {
    angular
        .module('app.components')
        .factory('clientOrder', clientOrder);

    /* @ngInject */
    clientOrder.$inject = ['$resource'];

    function clientOrder($resource) {
        let service = {};

        service.strategy = $resource('ws/clientorder/list/strategy');

        service.list = $resource('ws/clientorder/list');

        // private String ric;
        // private int shares;
        // private double totalAmount;
        // private String strategy;
        service.saveInputCO = $resource('ws/clientorder/saveInputCO', null, {});

        return service;
    }
})();
