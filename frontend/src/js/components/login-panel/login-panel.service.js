(() => {
    angular
        .module('app.components')
        .factory('Login', Login);

    /* @ngInject */
    Login.$inject = ['$resource'];

    function Login($resource) {
        return $resource('ws/login', {}, {
            login: {
                method: 'POST',
                params: {},
                isArray: false
            }
        });
    }
})();
