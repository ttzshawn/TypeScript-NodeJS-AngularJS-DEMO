(function() {
    'use strict';

    angular
        .module('app.components')
        .controller('MoListCtrl', MoListCtrl);

    MoListCtrl.$inject = ['$scope', '$rootScope', '$location', '$http', '$window', '$cookies', '$state', '$interval', 'AUTH_EVENTS', 'CommonService', 'Session', 'AuthService', 'marketOrder'];

    /* @ngInject */
    function MoListCtrl($scope, $rootScope, $location, $http, $window, $cookies, $state, $interval, AUTH_EVENTS, CommonService, Session, AuthService, marketOrder) {

        // console.log($rootScope.moList)
        // $scope.moList = [];
        $interval(function() {
            if ($rootScope.selectedClientOrderId != '' && $rootScope.selectedClientOrderId != undefined && AuthService.isAuthenticated()) {
                marketOrder.query({ coId: $rootScope.selectedClientOrderId }, function(res) {
                    $scope.moList = res;
                    console.log(res)
                });
            }
        }, 1000);

    }

})();
