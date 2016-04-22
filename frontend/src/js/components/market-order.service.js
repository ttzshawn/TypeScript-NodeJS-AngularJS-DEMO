(() => {
    angular
        .module('app.components')
        .factory('marketOrder', marketOrder);

    /* @ngInject */
    marketOrder.$inject = ['$resource'];

    function marketOrder($resource) {
        var s = {};

        s.getById = $resource('ws/marketorder/:id', { id: '@id' });

        s.list = $resource('ws/marketorder/list/:coId');

        // private String market_order_id;
        // private String clientOrderId;
        // private String exchange;
        // private long shares;
        // private double amount;
        // private int fills;
        // private int totalShares;
        // private double totalAmount;
        // private String status;
        s.save = $resource('ws/marketorder/save');

        return s;
    }
})();
