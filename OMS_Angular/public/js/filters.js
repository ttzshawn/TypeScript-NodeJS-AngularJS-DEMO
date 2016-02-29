/**
 * @author Shawn
 * @desc mainAPP
 */

const PROJECTSTATUS = {
    0: "科技",
    1: "艺术",
    2: "娱乐",
    3: "农业",
    4: "地产",
    5: "公益",
    6: "其他"
};

// 项目审核状态
const AUDITSTATUS = {
    0: "未提交",
    10: "未审核",
    20: "审核未通过",
    30: "预热中",
    40: "中",
    50: "即将结束",
    60: "已成功",
    70: "已失败"
};

// 项目所处阶段
const PROJECTPHASE = {
    0: "研发中",
    1: "已正式发布",
    2: "已有收入",
    3: "已盈利"
}
const BUILDCOMPANY = {
    0: "未成立",
    1: "已成立"
};
const CATEGORY = {
    0: "科技",
    1: "艺术",
    2: "娱乐",
    3: "农业",
    4: "地产",
    5: "公益",
    6: "其他"
};

/* 过滤器 */
var filters = angular.module('filters', [])

// 开关过滤器，0则显示关闭，1则显示开启
.filter('switch', function() {
    return function(param) {
        if (param == 1 || param == '1') {
            return '开启';
        } else {
            return '关闭';
        }
    }
})

// 百分比,页面一般有额外百分号，传入*100的数值，输出小数
.filter('percent', function() {
    return function(param) {
        if (param != undefined && isNaN(param) == false) {
            return param * 1000 / 100000;
        } else {
            return '';
        }
    }
})

.filter('category', function() {
    var obj = CATEGORY;
    return function(param) {
        return obj[param] != undefined ? obj[param] : "";
    }
})

.filter('buildcompany', function() {
    var obj = BUILDCOMPANY;
    return function(param) {
        return obj[param] != undefined ? obj[param] : "";
    }
})

.filter('projectphase', function() {
    var obj = PROJECTPHASE;
    return function(param) {
        return obj[param] != undefined ? obj[param] : "";
    }
})

.filter('auditstatus', function() {
    var obj = AUDITSTATUS;
    return function(param) {
        return obj[param] != undefined ? obj[param] : "";
    }
})

.filter('projectstatus', function() {
    var obj = PROJECTSTATUS;
    return function(param) {
        return obj[param] != undefined ? obj[param] : "";
    }
})
