<!--#include virtual="/common/common.asp"-->
<!--#include virtual="/wwwconf/function/db/DBConnection.asp"-->
<%
Dim gubun	: gubun	= request("gubun")
Dim seq		: seq	= request("seq")
Dim idx		: idx	= request("idx")

If gubun = "" Then 
	gubun = "1"
Else 
	gubun = gubun
End If 

If seq = "" And idx = "" Then
	response.write "<script>"
	response.write "alert('삭제 대상 파일 정보가 없습니다.');"
	response.write "history.go(-1);"
	response.write "</script>"
	response.end
End If


dbCon.Open Application("DBInfo_FAIR")

sql = "SELECT upFile, realFile, strFolder FROM tbl_board_files WHERE seq='"&seq&"' AND idx='"&idx&"' AND gubun='"&gubun&"' "
Rs.Open sql, dbCon
If Not (Rs.BOF Or Rs.EOF) Then
	upFile		= Rs("upFile")
	realFile	= Rs("realFile")
	strFolder	= Rs("strFolder")

	Dim fs
	Set fs = Server.CreateObject("Scripting.FileSystemObject")	

	Dim sourcepath
	sourcepath	= "D:\solution\"& site_title &"\files\notice\"& strFolder &"\"	' 공지사항 첨부파일 저장 위치

	Dim objFS, file_name
	set objFS = CreateObject("Scripting.FileSystemObject")

	'1) 파일 삭제
	If upFile <> "" Then
		If objFs.FileExists(sourcepath & upFile) Then objFs.DeleteFile sourcepath & upFile
	End If

	'2) DB 정보 삭제
	dbCon.BeginTrans 
	strSql = "DELETE FROM tbl_board_files WHERE seq='"&seq&"' AND idx='"&idx&"' AND gubun='"&gubun&"' "
	dbCon.Execute(strSql)
End If
Rs.close


If dbCon.Errors.Count = 0 Then
	dbCon.CommitTrans

	Response.Write "<script>" & vbCrLf &_
					"alert(""삭제 되었습니다."");" & vbCrLf &_
					"location.href='board_form.asp?seq="& seq &"';" & vbCrLf &_
					"</script>"
Else
	dbCon.RollbackTrans

	Response.Write "<script>" & vbCrLf &_
					"alert(""확인 후 다시 삭제해 주세요."");" & vbCrLf &_
					"history.go(-1);" &_
					"</script>"
End if

Set fs = Nothing


DisconnectDB DBCon
%>
<OBJECT RUNAT="SERVER" PROGID="ADODB.RecordSet" ID="Rs"></OBJECT>