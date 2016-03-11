$(function() {
    function c(a) {
        $.post("/info/getGoldPrice", {
            queryFlag: a
        }, function(b) {
            if (b.success) {
                var e = 1,
                    c = [],
                    d = b.priceArray;
                2 == a ? e = 4 : 0 == a && (e = 5);
                for (b = 0; b < d.length; b++) c[b] = parseFloat(d[b].y);
                $("#graph").highcharts({
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
                                var b = (new Date(d[this.value].x)).format("yyyy-MM-dd hh:mm");
                                return "2" == a ? b.substring(11, 13) : b.substring(8, 10)
                            }
                        },
                        title: {
                            enabled: !0
                        },
                        tickWidth: 0,
                        tickInterval: e
                    },
                    tooltip: {
                        formatter: function() {
                            var a =
                                '<b style="font-family:Helvetica;font-size:14px;color:' + this.series.color + '">' + this.y + "\u5143/\u514b</b><br/>";
                            return a += '<span style="font-size: 14px;color:#a3a3a3;font-family:Helvetica;">' + (new Date(d[this.x].x)).format("yyyy-MM-dd hh:mm") + "</span>"
                        }
                    },
                    series: [{
                        name: "\u91d1\u4ef7",
                        data: c
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
    0 < $("#graph").length && c("0");
    $(".graphs-tab li").click(function() {
        var a = $(this);
        $(this).parent().find("li").removeClass("active");
        a.addClass("active");
        c(a.attr("name"));
        "2" == a.attr("name") ? $(".graphs-tab-up1").css("left", "63px") : "1" == a.attr("name") ? $(".graphs-tab-up1").css("left", "211px") : "0" == a.attr("name") && $(".graphs-tab-up1").css("left", "359px")
    })
});
