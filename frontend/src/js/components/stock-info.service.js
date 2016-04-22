(() => {
    angular
        .module('app.components')
        .factory('stockInfo', stockInfo);

    /* @ngInject */
    stockInfo.$inject = ['$resource'];

    function stockInfo($resource) {
        let service = {};

        // private String marketid;
        // private String uuid;
        // private String ric;
        // private String companyname;
        // List<StockInfo> findBy(@QueryParam("searchParam") String searchParam);
        service.search = $resource('ws/stockInfo/search');

        return service;
    }
})();
