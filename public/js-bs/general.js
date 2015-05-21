// var $ = require('jquery');
// /**
//  * index等多个页面图片切换
//  */
// $(function() {
//     var z_index = 10;
//     var index = 0;
//     var picTimer = 0;
//     // 为小按钮添加鼠标滑入事件，以显示相应的内容

//     $("#index_btn div").mouseover(function() {
//         if (!$("#index_focus ul li").is(":animated")) {
//             index = $("#index_btn div").index(this);
//             showPics(index);
//         }
//     }).eq(0).trigger("mouseover");

//     // 鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
//     $("#index_btn").hover(function() {
//         clearInterval(picTimer);
//     }, function() {
//         picTimer = setInterval(function() {
//             index++;
//             if (index == 3) {
//                 index = 0;
//             }
//             showPics(index);
//         }, 6000);
//     }).trigger("mouseleave");

//     // 显示图片，根据接收的index值显示相应的内容
//     function showPics(ind) {
//         z_index = z_index + 1;
//         $("#index_focus ul li").eq(ind).css("left", "-1200px");
//         $("#index_focus ul li").eq(ind).css("z-index", z_index);
//         $("#index_focus ul li").eq(ind).stop(true, true).animate({
//             "left": 0
//         }, 1500);
//         // 按钮背景图片根据index改变,不是IE6的时候才执行
//         if (!((window.ActiveXObject) && (navigator.userAgent.match(/MSIE 6./i) == "MSIE 6."))) {
//             $("#index_btn div").stop(true, true).css("background-image", "url(images/home/on.png").eq(ind).stop(true, true).css("background-image", "url(images/home/in.png)");
//         }
//     }
// });

// /**
//  * Scroll to top button
//  */
// $(function() {
//     $(window).scroll(function() {
//         var top = $(this).scrollTop();
//         if (top > 150) {
//             $('#scrolltotop').addClass('showmetop');
//         } else {
//             $('#scrolltotop').removeClass('showmetop');
//         }
//     });
//     $('#scrolltotop').click(function() {
//         $('html,body').animate({
//             scrollTop: 0
//         });
//     });
// });

// /**
//  * triangle-transform
//  */
// $(function() {
//     $('.trans-b').hover(function() {
//         $(this).addClass('trans-hoverb');
//     }, function() {
//         $(this).removeClass('trans-hoverb');
//     });
// });

// /**
//  * mask
//  */
// function maskShow() {
//     var a = $(document).scrollTop() + 40 + "px";
//     $("#fade").css('min-height', '1800px');
//     $('#fade').show();
//     $('#light').css('top', a);
//     $('#light').show(0);
//     $('#light').addClass('showmelight');
//     /* $('#light').css('top', a); */
// }

// function maskClose() {
//     $('#light').removeClass('showmelight');
//     setTimeout("$('#light').hide()", 200);
//     $('#fade').fadeOut(200);
// }

// $(function() {
//     $(document).keyup(function(event) {
//         var keycode = (event.keyCode ? event.keyCode : event.which);
//         if (keycode == 27) {
//             maskClose();
//         }
//     });
// })

// /**
//  * collapse
//  */
// $(function() {
//     var name = window.location.href;
//     if (!(name.indexOf('#') < 0)) {
//         var sub = name.substring(name.indexOf('#'), name.length);
//         $(sub).find('a').addClass('collapsed');
//         $(sub).find('.collapse').slideDown();
//     }
//     $(".panel-heading").click(function() {
//         // collapsed类的添加和移除
//         $(this).find('a').toggleClass('collapsed');
//         $(this).parent().siblings('.panel').find('a').removeClass('collapsed');
//         // collapse的展开和关闭
//         $(this).siblings('.collapse').slideToggle().parent().siblings('.panel').find('.collapse').slideUp();
//     });
// });

// /**
//  * 处理URL
//  */
// function parseURL(url) {
//     var a = document.createElement('a');
//     a.href = url;
//     return {
//         source: url,
//         protocol: a.protocol.replace(':', ''),
//         host: a.hostname,
//         port: a.port,
//         query: a.search,
//         params: (function() {
//             var ret = {},
//                 seg = a.search.replace(/^\?/, '').split('&'),
//                 len = seg.length,
//                 i = 0,
//                 s;
//             for (; i < len; i++) {
//                 if (!seg[i]) {
//                     continue;
//                 }
//                 s = seg[i].split('=');
//                 ret[s[0]] = s[1];
//             }
//             return ret;
//         })(),
//         file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
//         hash: a.hash.replace('#', ''),
//         path: a.pathname.replace(/^([^\/])/, '/$1'),
//         relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
//         segments: a.pathname.replace(/^\//, '').split('/')
//     };
// }
