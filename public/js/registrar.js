function emailValidator(){
		var regExp =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if($("#email").val() == null || $("#email").val() == ""){
			$("#emailTip").text("邮箱地址不能为空.").css("color","pink");
			return false;
		}else if(!regExp.test($("#email").val())){
			$("#emailTip").text("邮箱地址输入错误.").css("color","pink");
			return false;
		}else{
			$("#emailTip").text("邮箱地址输入正确.").css("color","green");
			return true;
		}
	}


function userValidator(){
		var regExp = /^[a-zA-Z0-9]{6,12}$/;
		if($("#user").val() == null || $("#user").val() == ""){
			$("#userTip").text("用户名不能为空.").css("color","pink");
			return false;
		}else if(!regExp.test($("#user").val())){
			$("#userTip").text("用户名输入错误.").css("color","pink");
			return false;
		}else{
			$("#userTip").text("您输入的用户名已存在.").css("color","green");
			return true;
		}
	}

function pwdValidator(){
		var regExp = /^[a-zA-Z]{6}$/;
		if($("#pwd").val() == null || $("#pwd").val() == ""){
			$("#pwdTip").text("密码不能为空.").css("color","pink");
			return false;
		}else if(!regExp.test($("#pwd").val())){
			$("#pwdTip").text("密码输入错误.").css("color","pink");
			return false;
		}else{
			$("#pwdTip").text("密码输入正确.").css("color","green");
			return true;
		}
	}

	function repwdValidator(){
		var regExp = /^[a-zA-Z]{6}$/;
		if($("#repwd").val() == null || $("#repwd").val() == ""){
			$("#repwdTip").text("确认密码不能为空.").css("color","pink");
			return false;
		}else if(!regExp.test($("#repwd").val())){
			$("#repwdTip").text("确认密码输入错误.").css("color","pink");
			return false;
		}else if($("#repwd").val() != $("#pwd").val()){
			$("#repwdTip").text("两次密码输入不一致.").css("color","pink");
			return false;
		}else{
			$("#repwdTip").text("确认密码输入正确.").css("color","green");
			return true;
		}
	}




$("#email").blur(emailValidator);

$("#user").blur(userValidator);

$("#pwd").blur(pwdValidator);
	
$("#repwd").blur(repwdValidator);
	


function formValidator(){
	if (userValidator()&&emailValidator()&&pwdValidator()&&repwdValidator()){
		return ture;
	}else{
		return false;
	}
}

function clearVal(){
	if ($(".tr")  ) {
            $(".tr").val("");
        
        }
    }