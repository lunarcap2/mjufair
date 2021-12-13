<%
	 Response.CharSet="euc-kr"
     Session.codepage="949"
     Response.codepage="949"
     Response.ContentType="text/html;charset=euc-kr"
%>

<!--#include virtual="/common/common.asp"-->
<!--#include virtual="/wwwconf/function/db/DBConnection.asp"-->

<%
	Dim sel_lctureDay : sel_lctureDay = Request("sel_lctureDay")

	ConnectDB DBCon, Application("DBInfo_FAIR")

		Dim strQuery, arrRs
		strQuery = ""
		strQuery = strQuery & " SELECT 강의명, 강의번호												 "
		strQuery = strQuery & "   FROM 멘토링_강의_기본정보 WITH(NOLOCK)							 "
		strQuery = strQuery & "  WHERE CONVERT(CHAR(10), 강의시작일시, 23) = '" & sel_lctureDay & "' "

		arrRs = arrGetRsSql(DBcon, strQuery, "", "")

	DisconnectDB DBCon

	If isArray(arrRs) Then
		For i=0 To UBound(arrRs,2)
			Response.write "<option value='" & arrRs(1,i) & "'>" & arrRs(0,i) & "</option>"
		Next
	End If
%>