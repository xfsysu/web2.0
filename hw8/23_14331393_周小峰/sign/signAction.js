$('document').ready(function() {
	$('form:first').submit(function() {
		var isValid = true;

	if (!$(".username").val().match(/^[a-zA-Z](\w){5,17}$/)) {
		isValid = false;
		$("#errorType").html("你的用户名出现错误");
	}
	else if (!$(".idNumber").val().html(/^[1-9][0-9]{7}$/)) {
		isValid = false;
		$("#errorType").html("你的学号出现错误");
	} 
	else if (!$(".telephone").val().match(/^[1-9][0-9]{10}$/)) {
		isValid = false;
		$("#errorType").html("你的电话号码出现错误");
	} 
	else if (!$(".email").val().match(/^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/)) {
		isValid = false;
		$("#errorType").html("你的电子邮件出现错误");
	}

	return isValid;
	});
});
