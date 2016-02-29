var directives = angular.module('directives', []);

directives.directive('tplauditselect', function ($compile) {
    return {
        restrict: 'E',
        scope: '@',
        templateUrl: _ctx + '/manage/system/tpl/tpl_audit_select.action',
        link: function() {

        }
    };
});

/*directives.directive('hello', function ($compile) {
    return {
        restrict: 'E',
        scope: {
            sampleData: '=sampleData'
        },
        template: "<h1>我了个擦</h1>"
    };
});*/
