(function() {
    'use strict';

    angular
        .module('app.components')
        .factory('clientOrder', clientOrder);

    /* @ngInject */
    clientOrder.$inject = ['$resource'];

    function clientOrder($resource) {
        return $resource('ws/clientOrder', {}, {
            clientOrder: {
                method: 'POST',
                params: {},
                isArray: false
            }
        });
    }

})();
