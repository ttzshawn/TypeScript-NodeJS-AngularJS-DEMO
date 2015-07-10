var flag = false; //调试开关 
// env 既是所谓的环境 
// 而inner就是所谓的表达式, name即是所谓的自由变量 
function env() {
        //整个env可以看作是一个c<div></div>losure 
        var name = "zhutao";

        function inner() {
            return name + " is a student.";
        }
        return inner; //返回的是一个内部函数 
    } //closure结束 

// 此处是最神奇的地方, 代码执行在此处, inner函数其实已经出了env的body, 
// 而仍然能够被引用, 这就是所谓形成了一个 closure 
var inner_func_ref = env(); // 这时候inner_func_ref引用的就是inner()函数对象 
alert(inner_func_ref()); // zhutao is a student.

var addHadnlers = function(nodes) {
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].onclick = function() { // 错误的，每次alert都是同一个值
            alert(i);
        }
    };
}
var addHadnlers = function(nodes) {
    var helper = function(i) {
        alert(i);
    }
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].onclick = helper(i);
    };
}


var observer = (function() {
    var observerList = [];
    return {
        add: function(obj) {
            observerList.push(obj);
        },
        empty: function() {
            observerList = [];
        },
        getCount: function() {
            return observerList.length;
        },
        get: function() {
            return observerList;
        }
    }
})();


// 类继承
(function() {
    function ClassA() {}
    ClassA.classMethod = function() {}

    function ClassB() {
        ClassA.apply(this, arguments);
    }
    ClassB.prototype = new ClassA();
    ClassB.prototype.constructor = ClassB; // 以便使用new的时候有正确标识
    ClassB.prototype.api = function() {
        ClassA.prototype.api.apply(this, arguments);
    }
})();

// 原型继承
(function() {
    var proto = {
        action1: function() {
            // TODO
        },
        action2: function() {
            // TODO
        }
    }
    var obj = Object.create(proto);
})();

// create()为ES5标准，不兼容时可考虑一下替代
var clone = (function() {
	var F = function() {};
	return function(proto) {
		F.prototype = proto;
		return new F();
	}
})
