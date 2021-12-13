<!--#include virtual="/common/common.asp"-->
<!--#include virtual="/wwwconf/function/db/DBConnection.asp"-->
<%
	Dim apply_gubun, apply_no
	apply_gubun = request("apply_gubun")
	apply_no	= request("apply_no")

	'apply_gubun = 1:직무설명회(멘토링), 2:특강, 3:AI 화상면접

	ConnectDB DBCon, Application("DBInfo_FAIR")
		Dim strQuery, strTitle

		If apply_gubun = "1" Then 
			strTitle = "직무상담"
			strQuery = ""

			strQuery = strQuery & " DELETE 상담_사전질문"
			strQuery = strQuery & " WHERE 상담_등록번호 = (SELECT 상담_등록번호 FROM 상담_신청정보 WHERE IDX = "& apply_no &")"
			strQuery = strQuery & " AND 개인아이디 = (SELECT 개인아이디 FROM 상담_신청정보 WHERE IDX = "& apply_no &")"

			strQuery = strQuery & " DELETE 상담_신청정보 WHERE IDX = " & apply_no
			Call execSQL(DBCon, strQuery, "", "")

		ElseIf apply_gubun = "2" Then 
			strTitle = "특강"
			strQuery = "DELETE 멘토링_강의_신청정보 WHERE IDX = " & apply_no
			Call execSQL(DBCon, strQuery, "", "")

		ElseIf apply_gubun = "3" Then 
			strTitle = "AI 화상면접"
			strQuery = "DELETE 멘토링_AI_화상면접 WHERE IDX = " & apply_no
			Call execSQL(DBCon, strQuery, "", "")

		End If

	DisconnectDB DBCon

	Response.Write "<script language=javascript>"&_
		"alert('"& strTitle &" 신청취소가 완료되었습니다.');"&_
		"location.href='/my/default.asp';"&_
		"</script>"
	response.End
%>