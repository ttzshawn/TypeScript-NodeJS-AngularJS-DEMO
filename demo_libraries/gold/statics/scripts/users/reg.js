$(function(){function b(){if(0==$("#telInput").val().length)return $(".warn_tel .warn_border").html("\u8bf7\u8f93\u5165\u624b\u673a\u53f7\u7801"),$(".warn_tel").show(),!1;if(0==$("#picture_code").val().length)return $(".warn_yzm .warn_border").html("\u8bf7\u8f93\u5165\u56fe\u7247\u9a8c\u8bc1\u7801"),$(".warn_yzm").show(),!1;if("block"==$(".warn_tel").css("display")||"block"==$(".warn_yzm").css("display"))return!1;c=60;$.ajax({type:"POST",url:"/user/piccode",data:{telephone:$("#telInput").val(),type:"0",
authCodeType:"2",pictureCode:$("#picture_code").val()},success:function(a){if("0000"==a.code)$("#_yz").hide(),$("#busy").hide(),$("#yuYinCode").unbind("click"),$("#yuYinCode").html("("+c+"\u79d2)"),$("#yuyinText").html("\u8bf7\u7559\u610f\u6765\u7535400-652-1111"),$("#yuYinCode").css("color","#a3a3a3"),$("#yuYinCode").css("text-decoration","none"),0==g&&null!=$("#telInput").val&&($("#_yz").hide(),$("#telInput").attr("disabled",!0)),e=window.setInterval(function(){0==c?(window.clearInterval(e),$("#yuYinCode").bind("click",
b),$("#yuYinCode").css("color","#bc6a00"),$("#yuYinCode").css("text-decoration","underline"),$("#yuYinCode").html("\u8bed\u97f3\u9a8c\u8bc1\u7801")):(c--,$("#yuYinCode").html("("+c+"\u79d2)"),$("#yuyinText").html("\u8bf7\u7559\u610f\u6765\u7535400-652-1111"),$("#yuYinCode").css("color","#a3a3a3"),$("#yuYinCode").css("text-decoration","none"))},1E3);else{if("0021"==a.code)return $("#telIcon").show(),$("#telIcon").removeClass("success"),$("#telIcon").addClass("warn"),$(".warn_tel").show(),$(".warn_tel .warn_border").html("\u8bf7\u8f93\u5165\u624b\u673a\u53f7\u7801"),
!1;if("0044"==a.code)return $("#yzmIcon").removeClass("success"),$("#yzmIcon").addClass("warn"),$(".warn_yzm .warn_border").html("\u56fe\u7247\u9a8c\u8bc1\u7801\u8f93\u5165\u6709\u8bef"),$(".warn_yzm").show(),$("#picCodeSpan").html('<img src="/user/createCode?t='+Math.random()+'" id="codeImg"/>'),$("#picture_code").val(""),!1;"0043"==a.code&&$("#busy").show()}}});return!1}$(":input").val("");$("#telInput").attr("disabled",!1);$(":input").bind("keypress",function(a){if(13==a.keyCode)return!1});var g;
$("#telInput").bind("keyup",function(){1==/\D/g.test(this.value)&&(this.value=this.value.replace(/\D/g,""));11<this.value.length&&(this.value=this.value.substring(0,11))}).bind("focus",function(){$("#telIcon").hide();$(".warn_tel").hide()}).bind("blur",function(){if(0==$("#telInput").val().length)return $(".warn_tel").show(),$(".warn_tel .warn_border").html("\u8bf7\u8f93\u5165\u624b\u673a\u53f7\u7801"),!1;if(11!=$("#telInput").val().length)return $("#telIcon").show(),$("#telIcon").removeClass("success"),
$("#telIcon").addClass("warn"),$(".warn_tel").show(),$(".warn_tel .warn_border").html("\u624b\u673a\u53f7\u7801\u8f93\u5165\u6709\u8bef"),!1;$.ajax({type:"post",url:"/user/checkphonenum",data:{telephone:$("#telInput").val()},success:function(a){"0000"==a.code||"0030"==a.code?($("#telIcon").show(),$("#telIcon").removeClass("success"),$("#telIcon").addClass("warn"),$(".warn_tel .warn_border").html('\u624b\u673a\u53f7\u5df2\u6ce8\u518c,<a class="re_login" style="color:#0033FF" href="/user/login">\u7acb\u5373\u767b\u5f55</a>'),
$(".warn_tel").show()):"0021"==a.code?($("#telIcon").show(),$("#telIcon").removeClass("success"),$("#telIcon").addClass("warn"),$(".warn_tel .warn_border").html("\u624b\u673a\u53f7\u7801\u8f93\u5165\u6709\u8bef"),$(".warn_tel").show()):"0023"==a.code&&($(".warn_tel").hide(),$("#telIcon").show(),$("#telIcon").addClass("success"))}})});$("#picture_code").bind("keyup",function(){1==/\D/g.test(this.value)&&(this.value=this.value.replace(/\D/g,""));4<this.value.length&&(this.value=this.value.substring(0,
4))}).bind("focus",function(){$("#yzmIcon").hide();$(".warn_yzm").hide()}).bind("blur",function(){0==$("#picture_code").val().length&&($(".warn_yzm .warn_border").html("\u8bf7\u8f93\u5165\u56fe\u7247\u9a8c\u8bc1\u7801"),$(".warn_yzm").show())});$("#getPicCode").bind("click",function(){$("#picCodeSpan").html('<img src="/user/createCode?t='+Math.random()+'" id="codeImg"/>');$("#yzmIcon").hide();$(".warn_yzm").hide();$("#picture_code").val("");return!1});$("#passwordInput").bind("keyup",function(){20<
this.value.length&&(this.value=this.value.substring(0,20))}).bind("focus",function(){$(".warn_pwd").hide();$("#pswIcon").hide()}).bind("blur",function(){var a=$(this).val().length;0==a?($(".warn_pwd .warn_border").html("\u8bf7\u8f93\u5165\u5bc6\u7801"),$(".warn_pwd").show()):20<a||8>a&&0!=a?($("#pswIcon").show(),$("#pswIcon").removeClass("success"),$("#pswIcon").addClass("warn"),$(".warn_pwd .warn_border").html("\u957f\u5ea6\u4e3a8-20\u4e2a\u5b57\u7b26\u4e4b\u95f4"),$(".warn_pwd").show()):$(".warn_pwd").hide()});
$("#repeatPassword").bind("keyup",function(){20<this.value.length&&(this.value=this.value.substring(0,20))}).bind("focus",function(){$(".warn_confirm").hide();$("#confarmIcon").hide()}).bind("blur",function(){var a=$("#passwordInput").val(),b=$(this).val();0==b.length&&8<=a.length&&20>=a.length?($("#pwdtips2 .warn_border").html("\u8bf7\u8f93\u5165\u786e\u8ba4\u5bc6\u7801"),$("#pwdtips2").show()):a!=b&&""!=b?($("#confarmIcon").show(),$("#confarmIcon").removeClass("warn"),$("#confarmIcon").addClass("warn"),
$(".warn_confirm .warn_border").html("\u4e24\u6b21\u5bc6\u7801\u4e0d\u4e00\u81f4"),$(".warn_confirm").show()):a==b&&""!=b&&$(".warn_confirm").hide()});$("#codeInput").bind("focus",function(){$("#jymIcon").hide();$(".warn_jym").hide()}).bind("keyup",function(){1==/\D/g.test(this.value)&&(this.value=this.value.replace(/\D/g,""));6<this.value.length&&(this.value=this.value.substring(0,6))}).bind("blur",function(){var a=$(this).val().length;0==a?($(".warn_jym .warn_border").html("\u8bf7\u8f93\u5165\u77ed\u4fe1\u9a8c\u8bc1\u7801"),
$(".warn_jym").show()):6!=a&&($("#jymIcon").show(),$("#jymIcon").removeClass("success"),$("#jymIcon").addClass("warn"),$(".warn_jym .warn_border").html("\u77ed\u4fe1\u9a8c\u8bc1\u7801\u8f93\u5165\u6709\u8bef"),$(".warn_jym").show())});var f,d=0;$("#getCode").bind("click",function(){$("#getCode").addClass("code_get_click");if(0==$("#telInput").val().length)return $(".warn_tel .warn_border").html("\u8bf7\u8f93\u5165\u624b\u673a\u53f7\u7801"),$(".warn_tel").show(),!1;if(0==$("#picture_code").val().length)return $(".warn_yzm .warn_border").html("\u8bf7\u8f93\u5165\u56fe\u7247\u9a8c\u8bc1\u7801"),
$(".warn_yzm").show(),!1;if("block"==$(".warn_tel").css("display"))return!1;d=60;$.ajax({type:"POST",url:"/user/piccode",data:{telephone:$("#telInput").val(),type:"0",authCodeType:"1",pictureCode:$("#picture_code").val()},success:function(a){if("0000"==a.code)$("#_yz").hide(),$("#busy").hide(),$("#getCode").attr("disabled","true"),$("#getCode").html(d+"s\u540e\u91cd\u65b0\u53d1\u9001"),$("#getCode").css("background","#f7f1e9"),$("#getCode").css("color","#867a6a"),null!=$("#telInput").val&&$("#telInput").attr("disabled",
!0),f=window.setInterval(function(){0==d?(window.clearInterval(f),$("#getCode").removeAttr("disabled"),$("#getCode").css("background","#fe9711"),$("#getCode").css("color","#fff"),$("#getCode").html("\u91cd\u65b0\u53d1\u9001")):(d--,$("#getCode").html("\u91cd\u65b0\u53d1\u9001("+d+")"),$("#getCode").css("background","#f7f1e9"),$("#getCode").css("color","#867a6a"))},1E3);else{if("0021"==a.code)return $("#telIcon").show(),$("#telIcon").removeClass("success"),$("#telIcon").addClass("warn"),$(".warn_tel").show(),
$(".warn_tel .warn_border").html("\u8bf7\u8f93\u5165\u624b\u673a\u53f7\u7801"),!1;if("0044"==a.code)return $("#yzmIcon").removeClass("success"),$("#yzmIcon").addClass("warn"),$("#yzmIcon").show(),$(".warn_yzm .warn_border").html("\u56fe\u7247\u9a8c\u8bc1\u7801\u8f93\u5165\u6709\u8bef"),$(".warn_yzm").show(),$("#picCodeSpan").html('<img src="/user/createCode?t='+Math.random()+'" id="codeImg"/>'),$("#picture_code").val(""),!1;"0043"==a.code&&$("#busy").show()}}});return!1});var e,c=0;$("#yuYinCode").bind("click",
b)});
$("#submitButton").bind("click",function(){$("#submitButton").addClass("submit_click");if(!$("#agreeCheckbox").is(":checked"))return $("#agreeWarn").show(),!1;if(""==$("#passwordInput").val()||20<$("#passwordInput").val().length||8>$("#passwordInput").val().length)return $("#pswIcon").show(),$("#pswIcon").removeClass("success"),$("#pswIcon").addClass("warn"),$(".warn_pwd .warn_border").html("\u957f\u5ea6\u4e3a8-20\u4e2a\u5b57\u7b26\u4e4b\u95f4"),$(".warn_pwd").show(),!1;$.ajax({type:"POST",url:"/user/register",data:{telephone:$("#telInput").val(),
authCode:$("#codeInput").val(),password:$("#passwordInput").val(),rePassword:$("#repeatPassword").val()},success:function(b){"0000"==b.code?location.href="/user/reg_3":"0041"==b.code||"0021"==b.code?($("#jymIcon").show(),$("#jymIcon").removeClass("success"),$("#jymIcon").addClass("warn"),$(".warn_jym .warn_border").html("\u9a8c\u8bc1\u7801\u8f93\u5165\u6709\u8bef"),$(".warn_jym").show()):"0042"==b.code&&($("#confarmIcon").show(),$("#confarmIcon").removeClass("success"),$("#confarmIcon").addClass("warn"),
$(".warn_confirm .warn_border").html("\u4e24\u6b21\u5bc6\u7801\u4e0d\u4e00\u81f4"),$(".warn_confirm").show())}});return!1});