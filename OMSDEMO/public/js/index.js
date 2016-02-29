var originArray = [{
    "time": "2016",
    "price": "251"
}, {
    "time": "2016",
    "price": "256"
}];

var changedArray = [];

// 抽象：把对象转换成数组（扔掉key的一维数组）
// {"time": "2016", "price": "251"}  ==>  [2016, 251]
var objToArray = function(obj) {
    var ar = [];
    for (var variable in obj) {
        if (obj.hasOwnProperty(variable)) {
            ar.push(obj[variable]);
        }
    }
    return ar;
}

// 业务逻辑
for (var i = 0; i < originArray.length; i++) {
    changedArray.push(objToArray(originArray[i]));
}


console.log(changedArray)
