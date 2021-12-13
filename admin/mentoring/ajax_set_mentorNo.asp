<%
	 Response.CharSet="euc-kr"
     Session.codepage="949"
     Response.codepage="949"
     Response.ContentType="text/html;charset=euc-kr"
%>

<!--#include virtual="/common/common.asp"-->
<!--#include virtual="/wwwconf/function/db/DBConnection.asp"-->

<%
	Dim sel_mentoring_date : sel_mentoring_date = Request("sel_mentoring_date")

	ConnectDB DBCon, Application("DBInfo_FAIR")

		Dim strQuery, arrRs
		strQuery = ""
		strQuery = strQuery & " SELECT 상담제목,등록번호 FROM 상담_정보 WITH(NOLOCK)	WHERE 상담일자 = '" & sel_mentoring_date & "' "

		arrRs = arrGetRsSql(DBcon, strQuery, "", "")

	DisconnectDB DBCon

	If isArray(arrRs) Then
		For i=0 To UBound(arrRs,2)
			Response.write "<option value='" & arrRs(1,i) & "'>" & arrRs(0,i) & "</option>"
		Next
	End If
%>