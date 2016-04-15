/**
 * @author Shawn
 * @desc mainAPP
 */
(() => {
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
    const filters = angular.module('app.core')

    .filter('switch', () => param => {
        if (param == 1 || param == '1') {
            return 'OPEN';
        } else {
            return 'CLOSED';
        }
    })

    // 78 ===> 0.78
    .filter('percent', () => param => {
        if (param != undefined && isNaN(param) == false) {
            return param * 1000 / 100000;
        } else {
            return '';
        }
    })

    .filter('category', () => {
        const obj = CATEGORY;
        return param => obj[param] != undefined ? obj[param] : ""
    })

    .filter('buildcompany', () => {
        const obj = BUILDCOMPANY;
        return param => obj[param] != undefined ? obj[param] : ""
    })

    .filter('projectstatus', () => {
        const obj = PROJECTSTATUS;
        return param => obj[param] != undefined ? obj[param] : ""
    });
})();