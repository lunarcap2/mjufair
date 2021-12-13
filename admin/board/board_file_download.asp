<%
Option Explicit 
%>
<!--#include virtual = "/common/constant.asp"-->
<%
Dim file
Dim filePolder, fileName, fileOrigin
filePolder	= Request("filePolder")
fileName	= Request("fileName")
fileOrigin	= Request("fileOrigin")


Set file = Server.CreateObject("ActiveFile.File")
file.Name = "D:\solution\"& site_title &"\files\notice\"& filePolder &"\"& fileName
Response.write "D:\solution\"& site_title &"\files\notice\"& filePolder &"\"& fileName


If Not file.Exists() Then 
	response.write "선택하신 파일이 존재하지 않습니다."
	response.End 
End If 


'Response.Clear
Response.ContentType = "application/unknown"    'ContentType 를 선언합니다.
Response.Addheader "Content-Disposition", "attachment;filename=" & fileOrigin
File.Download

Response.End 
%>
