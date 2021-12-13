<!--#include virtual="/wwwconf/function/db/DBConnection.asp"-->
<!--#include virtual = "/common/common.asp"-->
<%
'--------------------------------------------------------------------
'   Comment		: 개인/기업회원 가입
' 	History		: 2020-05-11, 이샛별 
'---------------------------------------------------------------------
Session.CodePage  = 949			'한글
Response.CharSet  = "euc-kr"	'한글
Response.AddHeader "Pragma","no-cache"
Response.AddHeader "cache-control", "no-staff"
Response.Expires  = -1

user_phone = Request("user_phone")

ConnectDB DBCon, Application("DBInfo_FAIR")


' 휴대폰번호 중복 체크
strSql = "SELECT 휴대폰 FROM 개인회원정보 WITH(NOLOCK) WHERE 휴대폰 = ? "
Dim param(0)
param(0)		= makeParam("@휴대폰", adVarchar, adParamInput, 40, user_phone)
ArrRsDefault	= arrGetRsParam(DBCon, strSql, param, "", "")
If isArray(ArrRsDefault) Then
	rtn_value = "X"	
Else
	rtn_value = "O"
End If


DisconnectDB DBCon


Response.write rtn_value
%>