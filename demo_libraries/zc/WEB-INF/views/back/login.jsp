<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>后台管理--登录页面</title>
<script language="javascript" src="<%=request.getContextPath()%>/script/jquery.min.js"></script>
</head>
<body>
<form method="post" action="<%=request.getContextPath() %>/back/login">
<table>
	<tr><td>姓名</td><td><input id="user" name="user.name" type="text" /></td></tr>
	<tr><td>密码</td><td><input id="psw" name="user.password"  type="text" /></td></tr>
	<tr><td>地址</td><td><input id="psw" name="user.address"  type="text" /></td></tr>
	<tr><td colSpan="2" align="center"><input type="submit" value="提交"/><input type="button" onclick="turnback()" value="返回" /> </td></tr>
</table>
</form>
<!-- 
<script type="text/javascript">  
    $(document).ready(function(){  
        var saveDataAry=[];  
        var data1={"userName":"test","address":"gz"};  
        var data2={"userName":"ququ","address":"gr"};  
        saveDataAry.push(data1);  
        saveDataAry.push(data2);         
        $.ajax({ 
            type:"POST", 
            url:"user/saveUser", 
            dataType:"json",      
            contentType:"application/json",               
            data:JSON.stringify(saveData), 
            success:function(data){ 
                                       
            } 
         }); 
    });  
</script>  -->
</body>
</html>