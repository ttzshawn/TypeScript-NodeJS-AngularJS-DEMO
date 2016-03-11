"use strict";
var db = require("../db");
function index(req, res) {
    db.getUsers(function (users) {
        console.dir(users);
        res.render('index', { title: 'ImageBoard', users: users });
    });
}
exports.index = index;
;
//# sourceMappingURL=index.js.map