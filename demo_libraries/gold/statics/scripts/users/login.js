// $(function() {
//     $("#passwordInput").bind("focus", function() {
//         $(".error").hide()
//     });
//     $("#telInput").bind("keyup", function() {
//         1 == /\D/g.test(this.value) && (this.value = this.value.replace(/\D/g, ""));
//         11 < this.value.length && (this.value = this.value.substring(0, 11))
//     }).bind("focus", function() {
//         $(".error").hide()
//     });
//     $("#submit").bind("click", function() {
//         var a = $("#telInput").val(),
//             b = $("#passwordInput").val(),
//             c = $("#depositType").val();
//         if ("" == a) return $(".error").html("*\u624b\u673a\u53f7\u4e0d\u80fd\u4e3a\u7a7a"), $(".error").show(), !1;
//         if ("" == b) return $(".error").html("*\u5bc6\u7801\u4e0d\u80fd\u4e3a\u7a7a"), $(".error").show(), !1;
//         $.ajax({
//             type: "POST",
//             url: "/user/updateUserLogin",
//             data: {
//                 telephone: a,
//                 password: b
//             },
//             success: function(a, b) {
//                 var d = a.msg;
//                 "0000" == a.code ? location.href = c ? "/invitationPrivilege?depositType=" + c : "/account/me" : ($(".error").html(d), $(".error").show())
//             }
//         });
//         return !1
//     });
//     $(".before").bind("click", function() {
//         var a = $(".intro .image").children().length,
//             a = ($(".intro .image").find(".active").index() + a - 1) % a;
//         $(".intro .image").children().removeClass("active");
//         $(".intro .image").children().eq(a).addClass("active")
//     });
//     $(".after").bind("click", function() {
//         var a = $(".intro .image").children().length,
//             a = ($(".intro .image").find(".active").index() + a + 1) % a;
//         $(".intro .image").children().removeClass("active");
//         $(".intro .image").children().eq(a).addClass("active")
//     });
//     $(document).keyup(function(a) {
//         13 == a.keyCode && $("#submit").trigger("click")
//     })
// });
