(() => {
    angular
        .module('app.components')
        .factory('mo', mo);

    /* @ngInject */
    mo.$inject = ['$resource'];

    function mo($resource) {
        var service = {};

        service.marketOrderList = [];

        service.get = () => {
            return this.marketOrderList;
        };

        service.set = (data) => {
            this.marketOrderList = data;
        }

        service.rm = () => {
            this.marketOrderList = '';
        }

        return service;
    }
})();
