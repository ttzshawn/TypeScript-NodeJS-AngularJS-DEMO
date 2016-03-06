$(function() {
    function g(b) {
        $.post("/info / getGoldPrice", {
            queryFlag: b
        }, function(a) {
            if (a.success) {
                var c = 1,
                    d = [],
                    e = a.priceArray;
                2 == b ? c = 4 : 0 == b && (c = 5);
                for (a = 0; a < e.length; a++) d[a] = parseFloat(e[a].y);
                $("#graph1").highcharts({
                    chart: {
                        type: "spline"
                    },
                    title: {
                        text: ""
                    },
                    yAxis: {
                        title: null
                    },
                    colors: ["#ff9f10"],
                    exporting: !1,
                    xAxis: {
                        labels: {
                            formatter: function() {
                                var a = (new Date(e[this.value].x)).format("yyyy-MM-dd hh:mm");
                                return "2" == b ? a.substring(11, 13) : a.substring(8, 10)
                            }
                        },
                        title: {
                            enabled: !0
                        },
                        tickWidth: 0,
                        tickInterval: c
                    },
                    tooltip: {
                        formatter: function() {
                            var a = '<b style="font-family:Helvetica;font-size:14px;color:' + this.series.color + '">' + this.y + "\u5143/\u514b</b><br/>";
                            return a += '<span style="font-size: 14px;color:#a3a3a3;font-family:Helvetica;">' + (new Date(e[this.x].x)).format("yyyy-MM-dd hh:mm") + "</span>"
                        }
                    },
                    series: [{
                        name: "\u91d1\u4ef7",
                        data: d
                    }],
                    legend: !1,
                    plotOptions: {
                        spline: {
                            marker: {
                                enabled: !1
                            }
                        }
                    },
                    credits: !1
                })
            }
        })
    }
    var b = $("._float"),
        a = $(".float1"),
        c = $(".float2"),
        e = $("#priceDetail");
    $(".float_gold_phone");
    var f = $(".qr_code"),
        d = null;
    $(".float1").bind("mouseover", function(h) {
        clearTimeout(d);
        f.hide();
        c.removeClass("gold_after");
        c.addClass("gold_before");
        e.show();
        b.hasClass("_float2") || (b.removeClass("_float3"), b.addClass("_float2"));
        0 < $("#graph1").length && g("0");
        a.hasClass("gold_after") || (a.removeClass("gold_before"), a.addClass("gold_after"));
        $("#priceDetail .graphs-tab1 li").click(function() {
            var a = $(this);
            $(this).parent().find("li").removeClass("active");
            a.addClass("active");
            g(a.attr("name"))
        })
    });
    $("#priceDetail").bind("mouseover",
        function() {
            clearTimeout(d);
            e.show();
            b.hasClass("_float2") || (b.removeClass("_float3"), b.addClass("_float2"));
            a.hasClass("gold_after") || (a.removeClass("gold_before"), a.addClass("gold_after"))
        });
    $("#priceDetail,.float1").bind("mouseout", function() {
        clearTimeout(d);
        d = setTimeout(function() {
            e.hide();
            b.removeClass("_float2");
            a.removeClass("gold_after");
            a.addClass("gold_before")
        }, 500)
    });
    $(".qr_code,.float2").bind("mouseover", function() {
        clearTimeout(d);
        e.hide();
        a.removeClass("gold_after");
        a.addClass("gold_before");
        f.show();
        b.hasClass("_float2") || (b.removeClass("_float3"), b.addClass("_float2"));
        c.hasClass("gold_after") || (c.removeClass("gold_before"), c.addClass("gold_after"))
    }).bind("mouseout", function() {
        clearTimeout(d);
        d = setTimeout(function() {
            f.hide();
            b.removeClass("_float2");
            c.removeClass("gold_after");
            c.addClass("gold_before")
        }, 500)
    });
    $(".float2").bind("click", function() {
        location.href = "/download"
    })
});
$(window).scroll(function() {
    45 < $(window).scrollTop() ? $(".gbanker-fixedbar").show() : $(".gbanker-fixedbar").hide()
});
