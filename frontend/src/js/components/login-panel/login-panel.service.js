(function() {
    'use strict';

    angular
        .module('app.components')
        .factory('Login', Login);

    /* @ngInject */
    Login.$inject = ['$resource'];

    function Login($resource) {
        return $resource('oms/ws/login', {}, {
            login: {
                method: 'POST',
                params: {},
                isArray: false
            }
        });
    }

})();
