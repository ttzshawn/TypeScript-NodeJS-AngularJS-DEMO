<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>后台管理--登录页面</title>
</head>
<body>
<form method="post" action="<%=request.getContextPath() %>/admin/login.do">
<table>
	<tr><td>姓名</td><td><input id="user" name="name" type="text" /></td></tr>
	<tr><td>密码</td><td><input id="psw" name="password"  type="text" /></td></tr>
	<tr><td>验证码</td><td><input id="psw" name="code"  type="text" /></td></tr>
	<tr><td colSpan="2" align="center"><input type="submit" value="提交"/><input type="button" onclick="turnback()" value="返回" /> </td></tr>
</table>
</form>
</body>
</html>