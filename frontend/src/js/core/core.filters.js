/**
 * @author Shawn
 * @desc mainAPP
 */
(function() {
    'use strict';
const PROJECTSTATUS = {
    0: "te",
    1: "2",
    2: "3",
    3: "r",
    4: "r",
    5: "fewf",
    6: "feaw"
};

/* filters */
var filters = angular.module('app.core')

.filter('switch', function() {
    return function(param) {
        if (param == 1 || param == '1') {
            return 'OPEN';
        } else {
            return 'CLOSED';
        }
    }
})

// 78 ===> 0.78
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

.filter('projectstatus', function() {
    var obj = PROJECTSTATUS;
    return function(param) {
        return obj[param] != undefined ? obj[param] : "";
    }
})
})();