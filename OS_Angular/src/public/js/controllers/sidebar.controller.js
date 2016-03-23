(function() {
    'use strict';

    angular.module('ctrls')
        // dashboard Sidebar
        .controller("MasterCtrl", ["$scope", "$cookies", function($scope, $cookies) {
            /**
             * Sidebar Toggle & Cookies Control
             */
            var mobileView = 992;
            $scope.getWidth = function() {
                return window.innerWidth;
            };
            $scope.$watch($scope.getWidth, function(newValue, oldValue) {
                if (newValue >= mobileView) {
                    if (angular.isDefined($cookies.get('toggle'))) {
                        $scope.toggle = !$cookies.get('toggle') ? true : false;
                    } else {
                        $scope.toggle = false;
                    }
                } else {
                    $scope.toggle = true;
                }
            });
            $scope.toggleSidebar = function() {
                $scope.toggle = !$scope.toggle;
                $cookies.put('toggle', $scope.toggle);
            };
            window.onresize = function() {
                $scope.$apply();
            };
        }])
        
        
})();