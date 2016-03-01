<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<base href="<%=basePath%>" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="js/jquery-1.9.1.min.js"></script>
<title>userInfo</title>
</head>
<body>
	用户信息 昵称： ${userInfo.nickName} 用户id：${userInfo.id} 用户电话:${userInfo.telephone } 注册时间：
	<fmt:formatDate value="${userInfo.registerTime }" pattern="yyyy-MM-dd HH:mm:ss" />

	<div id="show_all_user"></div>
	
	<form action="test/addInfos" method="post">
		昵称：<input type="text" name="nickName"/>
		id：<input type="text" name="id"/>
		电话：<input type="text" name="telephone"/>
		<input type="submit" value="提交"/>
	</form>
</body>
</html>