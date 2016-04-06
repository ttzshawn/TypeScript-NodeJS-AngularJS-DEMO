(function() {
    'use strict';

    angular
        .module('app.components')
        .factory('marketOrder', marketOrder);

    /* @ngInject */
    marketOrder.$inject = ['$resource'];

    function marketOrder($resource) {
        return $resource('ws/marketOrder', {}, {});
    }

})();
