(() => {
    angular
        .module('app.components')
        .controller('clientOrderUploadCtrl', clientOrderUploadCtrl);

    /* @ngInject */
    clientOrderUploadCtrl.$inject = ['$scope', 'fileUpload'];

    function clientOrderUploadCtrl($scope, fileUpload) {

        $scope.upload = () => {
            var file = $scope.myFile;
            var uploadUrl = 'ws/file/upload';
            fileUpload.uploadFileToUrl(file, uploadUrl);
        };
    }
})();
