var realPrice;
$(function() {
    var a = null;
    $(".icon-weixin").bind("mouseover", function(b) {
        clearTimeout(a);
        $(".ceil-weixin").show();
        return !1
    }).bind("mouseout", function() {
        clearTimeout(a);
        a = setTimeout(function() {
            $(".ceil-weixin").hide()
        }, 500)
    });
    $(".ceil-weixin").bind("mouseover", function(b) {
        clearTimeout(a);
        $(".ceil-weixin").show()
    }).bind("mouseout", function() {
        clearTimeout(a);
        a = setTimeout(function() {
            $(".ceil-weixin").hide()
        }, 500)
    });
    $(".footer_wx,.ceil-weixin-bottom").bind("mouseover", function(b) {
        clearTimeout(a);
        $(".ceil-weixin-bottom").show()
    }).bind("mouseout",
        function() {
            clearTimeout(a);
            a = setTimeout(function() {
                $(".ceil-weixin-bottom").hide()
            }, 500)
        });
    $(".ceil-weixin-bottom").bind("mouseover", function(b) {
        clearTimeout(a);
        $(".ceil-weixin-bottom").show()
    }).bind("mouseout", function() {
        clearTimeout(a);
        a = setTimeout(function() {
            $(".ceil-weixin-bottom").hide()
        }, 500)
    });
    var c = null;
    $("#span1").bind("mouseover", function(b) {
        clearTimeout(c);
        $(".gw-code-win2").show();
        return !1
    }).bind("mouseout", function() {
        clearTimeout(c);
        c = setTimeout(function() {
                $(".gw-code-win2").hide()
            },
            500)
    });
    $(".gw-code-win2").bind("mouseover", function(b) {
        clearTimeout(c);
        $(".gw-code-win2").show()
    }).bind("mouseout", function() {
        clearTimeout(c);
        c = setTimeout(function() {
            $(".gw-code-win2").hide()
        }, 500)
    });
    var d = null;
    $(".login #span2").bind("mouseover", function(b) {
        clearTimeout(d);
        $(".gw-code-win3").css("left", $(this).offset().left + "px");
        $(".gw-code-win3").show();
        return !1
    }).bind("mouseout", function() {
        clearTimeout(d);
        d = setTimeout(function() {
            $(".gw-code-win3").hide()
        }, 500)
    });
    $(".gw-code-win3").bind("mouseover",
        function(b) {
            clearTimeout(d);
            $(".gw-code-win3").show()
        }).bind("mouseout", function() {
        clearTimeout(d);
        d = setTimeout(function() {
            $(".gw-code-win3").hide()
        }, 500)
    });
    var e = null;
    $(".qr-code").bind("mouseover", function(b) {
        clearTimeout(e);
        $(".qr-code .gw-code-win").show();
        return !1
    }).bind("mouseout", function() {
        clearTimeout(e);
        e = setTimeout(function() {
            $(".qr-code .gw-code-win").hide()
        }, 500)
    });
    $(".qr-code .gw-code-win").bind("mouseover", function(b) {
        clearTimeout(e);
        $(".qr-code .gw-code-win").show()
    }).bind("mouseout",
        function() {
            clearTimeout(e);
            e = setTimeout(function() {
                $(".qr-code .gw-code-win").hide()
            }, 500)
        });
    var f = null;
    $(".service").bind("mouseover", function(b) {
        clearTimeout(f);
        $(".service .gw-code-win").show();
        return !1
    }).bind("mouseout", function() {
        clearTimeout(f);
        f = setTimeout(function() {
            $(".service .gw-code-win").hide()
        }, 500)
    });
    $(".service .gw-code-win").bind("mouseover", function(b) {
        clearTimeout(f);
        $(".service .gw-code-win").show()
    }).bind("mouseout", function() {
        clearTimeout(f);
        f = setTimeout(function() {
                $(".service .gw-code-win").hide()
            },
            500)
    });
    // 定时获取价格
    // $.ajax({
    //     type: "POST",
    //     url: "/info/price",
    //     dataType: "json",
    //     success: function(b, a) {
    //         "ok" == b.status && (realPrice = b.price, $(".price-update #first").html(parseInt(realPrice / 100)), 10 > parseInt(realPrice % 100) ? $(".price-update #second").html("0" + parseInt(realPrice % 100)) : $(".price-update #second").html(parseInt(realPrice % 100)), $("#price").html((realPrice / 100).toFixed(2)), $("#fixedPrice").html((realPrice / 100).toFixed(2)))
    //     }
    // });
    // setInterval(function() {
    //     $.ajax({
    //         type: "POST",
    //         url: "/info/price",
    //         dataType: "json",
    //         success: function(b,
    //             a) {
    //             "ok" == b.status && (realPrice = b.price, $(".price-update #first").html(parseInt(realPrice / 100)), 10 > parseInt(realPrice % 100) ? $(".price-update #second").html("0" + parseInt(realPrice % 100)) : $(".price-update #second").html(parseInt(realPrice % 100)), $("#price").html((realPrice / 100).toFixed(2)), $("#fixedPrice").html((realPrice / 100).toFixed(2)))
    //         }
    //     })
    // }, 6E4);
    $(document).ajaxSuccess(function(b, a) {
        a.responseJSON && "0002" === a.responseJSON.code ? location.href = "/user/login" : a.responseJSON && "0110" === a.responseJSON.code &&
            alert("\u60a8\u7684\u64cd\u4f5c\u8fc7\u4e8e\u9891\u7e41\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5")
    });
    $(".button-1").bind("mousedown", function() {
        $(this).css("background", "url(/statics/images/account_button1_press.png) no-repeat")
    }).bind("mouseup", function() {
        $(this).css("background", "url(/statics/images/account_button1.png) no-repeat")
    });
    setInterval(function() {
        var b = document.documentElement.clientHeight || document.body.clientHeight,
            a = document.body.scrollTop || document.documentElement.scrollTop,
            c = $(".footer_wx").offset().top;
        223 > b - (c - a) ? $(".ceil-weixin-bottom").addClass("footer_wxUp") : $(".ceil-weixin-bottom").removeClass("footer_wxUp")
    }, 30)
});
