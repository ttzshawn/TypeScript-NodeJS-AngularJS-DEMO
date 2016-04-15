(() => {
    angular
        .module('app.components')
        .controller('coPieCtrl', coPieCtrl);

    coPieCtrl.$inject = ['$scope', '$rootScope', '$location', '$http', '$window', '$cookies', '$state', '$interval', 'AUTH_EVENTS', 'CommonService', 'AuthService', 'marketOrder'];

    /* @ngInject */
    function coPieCtrl(
        $scope,
        $rootScope,
        $location,
        $http,
        $window,
        $cookies,
        $state,
        $interval,
        AUTH_EVENTS,
        CommonService,
        AuthService,
        marketOrder) {


        const option = {
            title: {
                text: 'Market Order Pie',
                subtext: '',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['NYSE', 'NASDAQ', 'SSE', 'HKSE', 'SGSE']
            },
            series: [
                {
                    name: 'Exchange',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        { value: 335, name: 'NYSE' },
                        { value: 310, name: 'NASDAQ' },
                        { value: 234, name: 'SSE' },
                        { value: 135, name: 'HKSE' },
                        { value: 1548, name: 'SGSE' }
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        const myChart = echarts.init(document.getElementById('main'));
        myChart.setOption(option);

    }
})();
