(function() {
    'use strict';

    angular.module('mainApp', [
        'app.core',
        'app.layout',
        'app.components',
        'app.widgets'
    ]);

    angular.module('app.core', [
        'ui.router',
        'ui.bootstrap',
        'ngCookies',
        'ngAnimate'
    ]);

    angular.module('app.components', [
        'app.core'
    ]);
    
})();
