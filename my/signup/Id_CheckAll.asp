<!--#include virtual="/wwwconf/function/db/DBConnection.asp"-->
<!--#include virtual = "/common/common.asp"-->
<!--#include virtual = "/inc/function/code_function.asp"-->
<%
'--------------------------------------------------------------------
'   Comment		: 개인/기업회원 가입
' 	History		: 2020-04-20, 이샛별 
'---------------------------------------------------------------------
Session.CodePage  = 949			'한글
Response.CharSet  = "euc-kr"	'한글
Response.AddHeader "Pragma","no-cache"
Response.AddHeader "cache-control", "no-staff"
Response.Expires  = -1

user_id = Request("user_id")

ConnectDB DBCon, Application("DBInfo_FAIR")

' 입력 아이디 중복 체크
SpName="usp_ID_CheckAll"
	Dim param(1)
	param(0)=makeParam("@user_id", adVarChar, adParamInput, 20, user_id)
	param(1)=makeParam("@rtn", adChar, adParamOutput, 1, "")

	Call execSP(DBCon, SpName, param, "", "")

	sp_rtn = getParamOutputValue(param, "@rtn")

DisconnectDB DBCon


Response.write sp_rtn
%>