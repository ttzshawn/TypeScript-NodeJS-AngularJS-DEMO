/**
 * @author Shawn
 * @desc Controllers of the mainAPP
 */

(function() {
    'use strict';

    angular
        .module('app.components')
        .controller('testCtrl', testCtrl);

    testCtrl.$inject = ['$scope', '$rootScope', '$location', '$http', 'AUTH_EVENTS', 'AuthService'];

    function testCtrl($scope, $rootScope, $location, $http, AUTH_EVENTS, AuthService) {
        $scope.obj = {
            url: "user/login.do",
            method: "POST",
            data: ""
        };
        $scope.test = function(obj) {
            var aa = (JSON.parse(obj.data));
            $scope.result = {
                result: "",
                status: "",
                msg: "",
                content: ""
            };
            $http({
                url: obj.url,
                method: obj.method,
                data: serializeData(aa)
            }).then(function(res) {
                console.log(res);
                $scope.result.result = "Req Success";
                $scope.result = res;
            }, function(res) {
                console.log(res);
                $scope.result = res;
                $scope.result.result = "Req Fail";
            });
        }
    }
})();
