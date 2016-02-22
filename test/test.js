var session = {
    aName : "USERID",
    bName : "SID",
    get: function () {
        if (document.cookie.length > 0) {
            var start = document.cookie.indexOf(name + "=");
            if (start != -1) {
                start = start + name.length + 1;
                var end = document.cookie.indexOf(";", start);
                if (end == -1) end = document.cookie.length;
                return unescape(document.cookie.substring(start, end));
            }
        }
        return "";
    },
    getObj : function() {
        return {
            'accountname': this.get(this.aName),
            'sessionid': this.get(this.bName)
        }
    }
}

console.log(session.getObj());
