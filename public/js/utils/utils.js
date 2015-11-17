// Get system time & countdown
function setDatetime() {
	var d = new Array('一', '二', '三', '四', '五', '六', '日');
	var weekday = '星期' + d[moment().format('e') - 1];
	var date = moment().format('YYYY年M月D日');
	$('.day .date').html(date);
	$('.day .weekday').html(weekday);
	$('.time').html(moment().format('HH:mm:ss'));
}
setDatetime();
window.setInterval("setDatetime()", 1000);