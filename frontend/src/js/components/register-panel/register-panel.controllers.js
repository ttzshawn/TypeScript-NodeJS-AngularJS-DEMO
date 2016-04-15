/**
 * @author Shawn
 * @desc Controllers of the mainAPP
 */
(() => {
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
        $scope.test = obj => {
            const aa = (JSON.parse(obj.data));
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
            }).then(res => {
                console.log(res);
                $scope.result.result = "Req Success";
                $scope.result = res;
            }, res => {
                console.log(res);
                $scope.result = res;
                $scope.result.result = "Req Fail";
            });
        }
    }
})();
