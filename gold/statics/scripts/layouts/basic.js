$(function() {
    function k(g) {
        var c = parseInt(g / 1E3),
            e = c % 1E3,
            c = parseInt(c / 1E3);
        g = c % 1E3;
        c = parseInt(c / 1E3);
        c %= 1E3;
        e = '<span class="number">' + e + "</span><span>\u514b</span>";
        0 < g && (e = '<span class="number">' + g + "</span><span>\u5343\u514b</span>" + e);
        0 < c && (e = '<span class="number">' + c + "</span><span>\u5428</span>" + e);
        return e
    }
    setTimeout(function() {
        $(".home-bannar .account-bg").animate({
            top: 420
        }, 800).animate({
            top: 410
        }, 800);
        $(".home-bannar .account-info").animate({
            top: 420
        }, 800).animate({
            top: 410
        }, 800)
    }, 800);
    var l = $(".bannar_bg li").length;
    if (1 < l) {
        for (var f = [], c = 0; c < l; c++) f[f.length] = '<li class="sliderBtn">' + (c + 1) + "</li>";
        $(".bannar_button ul").html(f.join(""));
        $.focus($(".home-bannar"), {
            direction: "left"
        })
    } else $(".bannar_button2").hide();
    // $.ajax({
    //     type: "POST",
    //     url: "/news/query",
    //     data: {
    //         start: 0,
    //         size: 50
    //     },
    //     dataType: "json",
    //     success: function(c, f) {
    //         var e = c.newsList,
    //             a = [],
    //             h = 0;
    //         if (void 0 != e && 0 < e.length)
    //             for (var b = 0; b < e.length; b++) {
    //                 var d = e[b].webUrl;
    //                 if ("http://tech.sina.com.cn/i/2015-09-25/doc-ifxieyms4080115.shtml?ref=myread" == d || "http://nb.people.com.cn/n/2015/0916/c200877-26406100.html" ==
    //                     d || "http://economy.gmw.cn/2015-07/03/content_16173216.htm" == d || "http://click.cnfol.com/xuanchuanxinxi/20150929/21527459.shtml" == d) {
    //                     a[a.length] = '<a href="';
    //                     void 0 != e[b].webUrl && 0 > e[b].webUrl.indexOf("http") && (e[b].webUrl = "http://" + e[b].webUrl);
    //                     a[a.length] = e[b].webUrl;
    //                     a[a.length] = '" class="news ';
    //                     0 == h % 2 && (a[a.length] = "news-odd");
    //                     h++;
    //                     a[a.length] = '" target="_blank">';
    //                     a[a.length] = '<div class="news-left">';
    //                     a[a.length] = '<div class="news-title">' + e[b].title + "</div>";
    //                     a[a.length] = '<div class="news-footer">' +
    //                         e[b].source + " " + e[b].date.substring(0, 10) + "</div>";
    //                     a[a.length] = "</div>";
    //                     d = "";
    //                     switch (e[b].source) {
    //                         case "\u4eac\u534e\u65f6\u62a5":
    //                             d = "jinghua";
    //                             break;
    //                         case "\u5317\u4eac\u6668\u62a5":
    //                             d = "beichen";
    //                             break;
    //                         case "36Kr":
    //                             d = "Kr";
    //                             break;
    //                         case "\u8d22\u65b0\u7f51":
    //                             d = "caixin";
    //                             break;
    //                         case "\u4e2d\u56fd\u65b0\u95fb\u7f51":
    //                             d = "xinwen";
    //                             break;
    //                         case "\u548c\u8baf":
    //                             d = "hexun";
    //                             break;
    //                         case "\u51e4\u51f0\u8d22\u7ecf":
    //                             d = "fenghuang";
    //                             break;
    //                         case "\u65b0\u6d6a\u7f51":
    //                             d = "xinlang";
    //                             break;
    //                         case "\u65b0\u534e\u7f51":
    //                             d = "xinhua";
    //                             break;
    //                         case "\u4eba\u6c11\u7f51":
    //                             d =
    //                                 "renmin";
    //                             break;
    //                         case "\u7f51\u6613\u8d22\u7ecf":
    //                             d = "wangyi";
    //                             break;
    //                         case "\u817e\u8baf\u8d22\u7ecf":
    //                             d = "tengxun";
    //                             break;
    //                         case "\u4e1c\u65b9\u8d22\u5bcc\u7f51":
    //                             d = "caifu";
    //                             break;
    //                         case "\u91d1\u878d\u754c":
    //                             d = "jinrong";
    //                             break;
    //                         case "\u521b\u4e1a\u90a6":
    //                             d = "chuangye";
    //                             break;
    //                         case "\u7b2c\u4e00\u8d22\u7ecf":
    //                             d = "dicai";
    //                             break;
    //                         case "\u8bc1\u5238\u65f6\u62a5":
    //                             d = "zhengquan";
    //                             break;
    //                         case "\u754c\u9762\u65b0\u95fb":
    //                             d = "jiemian";
    //                             break;
    //                         case "\u8d22\u7ecf\u7f51":
    //                             d = "caijing";
    //                             break;
    //                         case "\u5317\u9752\u7f51":
    //                             d = "beiqing";
    //                             break;
    //                         case "\u4e2d\u91d1\u5728\u7ebf":
    //                             d =
    //                                 "zhongjin";
    //                             break;
    //                         case "21CN":
    //                             d = "CN";
    //                             break;
    //                         case "\u5149\u660e\u7f51":
    //                             d = "guangming";
    //                             break;
    //                         case "\u6bcf\u65e5\u8d22\u7ecf\u7f51":
    //                             d = "mrcjw";
    //                             break;
    //                         case "\u4e2d\u56fd\u4f01\u4e1a\u7f51":
    //                             d = "zgqyw";
    //                             break;
    //                         case "\u798f\u5e03\u65af":
    //                             d = "fbs";
    //                             break;
    //                         case "\u4e2d\u534e\u7f51":
    //                             d = "zhonghua";
    //                             break;
    //                         case "\u73af\u7403\u7f51":
    //                             d = "huanqiu";
    //                             break;
    //                         case "i\u9ed1\u9a6c\u7f51":
    //                             d = "iheima"
    //                     }
    //                     a[a.length] = '<div class="logo-div">';
    //                     a[a.length] = '<div class="logo ' + d + '">';
    //                     a[a.length] = "</div></div>";
    //                     a[a.length] = "</a>"
    //                 }
    //             }
    //         $(".news-list").html(a.join(""))
    //     }
    // });
    $(".news-more").bind("click", function() {
        location.href = "about/news"
    });
    // $.ajax({
    //     type: "GET",
    //     url: "deposit/getDepositInfoList",
    //     dataType: "json",
    //     success: function(c, f) {
    //         var e = c.depositList;
    //         if (void 0 != e && 0 < e.length) {
    //             for (var a = [], h = 3, b = 0; b < e.length && b < h; b++) 0 == e[b].depositType ? h = 4 : (a[a.length] = '<div class="product">', a[a.length] = '<div class="name">' + e[b].depositName + "</div>", a[a.length] = '<div class="desc">' + e[b].depositFeature + "</div>", a[a.length] = '<div class="rate">', a[a.length] = '<span class="number">' + e[b].rate /
    //                 100 + "</span>", a[a.length] = '<div class="specs">', a[a.length] = '<span class="annual">\u5e74\u5316</span>', a[a.length] = '<span class="percent">%</span>', a[a.length] = "</div></div>", a[a.length] = null != e[b].webUrl ? '<a class="actions" href="' + e[b].webUrl + '">\u7acb\u5373\u6295\u8d44</a>' : '<a class="actions" href="/trade/gold/detail?depositType=' + e[b].depositType + '">\u7acb\u5373\u6295\u8d44</a>', a[a.length] = "</div>");
    //             $(".product-list").html(a.join(""));
    //             2 < $(".product-list .product").length && $(".product-list .product:last-child").addClass("product-last")
    //         }
    //     }
    // });
    // $.ajax({
    //     type: "GET",
    //     url: "info/getMarketPriceAndTotal",
    //     dataType: "json",
    //     success: function(c, f) {
    //         1 == c.success && (void 0 != c.totalUser && $("#userNum").html((c.totalUser + "").replace(/(\d)(?=(\d{3})+$)/g, "$1,")), void 0 != c.totalGoldWeight && $("#goldWeight").html(k(c.totalGoldWeight)), $("#marketPrice").html((c.marketPrice / 100).toFixed(2)))
    //     }
    // });
    $(window).scroll(function() {
        45 < $(window).scrollTop() ? $(".gbanker-fixedbar").show() : $(".gbanker-fixedbar").hide()
    })
});
(function(k) {
    k.extend({
        focus: function(l, f) {
            var c = l.find(".bannar_bg li"),
                g = l.find("li.sliderBtn"),
                n = f && f.interval || 5E3,
                e = f && f.animateTime || 400,
                a = f && "right" === f.direction,
                h = c.length,
                b = 0,
                d = function(a) {
                    c.eq(b).animate({
                        opacity: "0"
                    }, e);
                    g.removeClass("active");
                    b = a ? 0 > b - 1 ? h + b - 1 : b - 1 : b + 1 >= h ? b + 1 - h : b + 1;
                    c.eq(b).css("opacity", "1");
                    setTimeout(function() {
                        c.css("z-index", "1");
                        c.eq(b).css("z-index", "8")
                    }, e);
                    g.eq(b).addClass("active")
                },
                m = setInterval(function() {
                    d(a)
                }, n);
            c.css("opacity", "0");
            c.css("z-index", "1");
            c.eq(b).css("opacity",
                "1");
            c.eq(b).css("z-index", "8");
            g.eq(b).addClass("active");
            g.hover(function() {
                var a = g.parent().find(".active").index();
                b = k(this).index();
                clearInterval(m);
                0 === k(":animated").length && a != b && (c.eq(a).animate({
                    opacity: "0"
                }, e), g.removeClass("active"), k(this).addClass("active"), c.eq(b).css("opacity", "1"), setTimeout(function() {
                    c.css("z-index", "1");
                    c.eq(b).css("z-index", "8")
                }, e))
            }, function() {
                m = setInterval(function() {
                    d(a)
                }, n)
            });
            c.hover(function() {
                clearInterval(m)
            }, function() {
                m = setInterval(function() {
                        d(a)
                    },
                    n)
            })
        }
    })
})(jQuery);
