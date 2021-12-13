<!--#include virtual="/common/common.asp"-->
<!--#include virtual="/wwwconf/function/db/DBConnection.asp"-->
<!--#include virtual="/inc/function/auth/clearCookie.asp"-->

<%
	Response.AddHeader "P3P", "CP='ALL CURa ADMa DEVa TAIa OUR BUS IND PHY ONL UNI PUR FIN COM NAV INT DEM CNT STA POL HEA PRE LOC OTC'"

	Dim user_nm, hp_num, user_reason, remote_addr, rtn
	
	user_nm		= Request("user_nm")
    hp_num		= Request("hp_num")
    user_reason	= Request("user_reason")

	If user_nm <> user_name Then
		Response.write "<script type='text/javascript'>" &_
					   "alert('입력한 성명이 일치하지 않습니다.');" &_
					   "document.location.href='/my/search/withdraw.asp';" &_
					   "</script>"
		
	End If

	If hp_num <> emobile Then
		Response.write "<script language='javascript'>" &_
					   "alert('입력한 휴대폰번호가 일치하지 않습니다.');" &_
					   "document.location.href='/my/search/withdraw.asp';" &_
					   "</script>"
		Response.end
	End If

	ConnectDB DBCon, Application("DBInfo_FAIR")
	
	SpName="USP_ACCOUNT_DEL"
	
	ReDim param(7)
	param(0) = makeParam("@userId", adVarChar, adParamInput, 20, user_id)
	param(1) = makeParam("@REMOTE_ADDR", adVarChar, adParamInput, 100, remote_addr)
	param(2) = makeParam("@user_name", adVarChar, adParamInput, 50, user_nm)
	param(3) = makeParam("@regnum", adVarChar, adParamInput, 13, "")
    param(4) = makeParam("@iReason", adChar, adParamInput, 1, "5") ' 1:취업성공, 2:컨텐츠 부족, 6:서비스 불편, 3:아이디/이름 수정, 4:개인정보 노출우려, 5:기타
	param(5) = makeParam("@iReason_Content", adVarChar, adParamInput, 5000, user_reason)
	param(6) = makeParam("@rtn", adChar, adParamOutput, 1, rtn)
	param(7) = makeParam("@siteGubunCode", adVarChar, adParamInput, 2, "1")
	
	Call execSP(DBCon, SpName, param, "", "")
	
	rtn = getParamOutputValue(param, "@rtn")
	
	If rtn = "X" Then
		Response.write "<script type='text/javascript'>" &_
					   "alert('처리 도중 오류가 발생하였습니다.\n다시 시도해주시기 바랍니다.');" &_
					   "document.location.href='/my/search/withdraw.asp';" &_
					   "</script>"
		Response.end
	Else
		Call ClearCookieWK

		Response.write "<script language='javascript'>" &_
					   "alert('수시 채용관 회원탈퇴가 완료되었습니다.');" &_
					   "document.location.href='/default.asp';" &_
					   "</script>"
		Response.end
	End If
	
	DisconnectDB DBCon
%>

