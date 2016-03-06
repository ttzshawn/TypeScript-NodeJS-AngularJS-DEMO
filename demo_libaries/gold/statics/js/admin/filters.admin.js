/* 过滤器 */

var filters = angular.module('filters', []);

// 开关过滤器，0则显示关闭，1则显示开启
filters.filter('onOff', function() {
	return function(status) {
		if (status == 1 || status == '1') {
			return '开启';
		} else {
			return '关闭';
		}
	}
});