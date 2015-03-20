// 所有模块都通过 define 来定义
alert('fwefw'); define(function(require, exports, module) {

	// 通过 require 引入依赖
	var $ = require('jquery');
	/*var Spinning = require('./spinning');*/
	var obj = {
		myString: "Hello world!",
		myFunc: function() {
			return this.myString;
		}
	};

	/*module.exports = new obj;*/
	/*	function heee() {
			$('#d1').css('background', 'black');
		}
		module.exports = {
			name: 'hello',
			method: function() {
				alert('method on ');
			}
		};*/

	/*exports.doSomething = function s() {
		alert('fe');
	}*/

	/*	try {
			var obj = document.getElementById('d1');
			var set = {
				changeColor: function() {
					obj.style.color = 'green';
				},
				changeWidth: function() {
					obj.style.width = '323px;'
				}
			}

			function init() {
				set.changeColor();
				alert('fwe');
			}
		} catch (err) {
			alert(err);
		}*/

	/*
		exports.ttt = test();*/
	/*  // 通过 exports 对外提供接口
	  exports.doSomething = ...

	  // 或者通过 module.exports 提供整个接口
	  module.exports = ...*/


});