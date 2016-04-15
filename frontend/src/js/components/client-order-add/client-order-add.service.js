(() => {
    angular
        .module('app.components')
        .factory('clientOrder', clientOrder);

    /* @ngInject */
    clientOrder.$inject = ['$resource'];

    function clientOrder($resource) {
        return $resource('ws/clientorder/list', {}, {
            query: {
                method: 'GET',
                params: {},
                isArray: true
            }
        });
    }
})();
