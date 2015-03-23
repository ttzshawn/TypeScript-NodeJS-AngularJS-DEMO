// 所有模块都通过 define 来定义
define(function(require) {

	// 通过 require 引入依赖
	var $ = require('jquery');
	/*var index = require('./index');*/

	function Main(container) {
		this.container = $(container);
	}

	Main.prototype.render = function() {
		this.container.css("background", "green");
	}

	var s = new Main("#div1");
	s.render();
});