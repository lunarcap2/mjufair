<!--#include virtual="/common/common.asp"-->
<!--#include virtual="/wwwconf/function/db/DBConnection.asp"-->
<%
'--------------------------------------------------------------------
'   Comment		: 게시판 관리 - 등록/수정
' 	History		: 2020-07-21, 이샛별 
'--------------------------------------------------------------------
Session.CodePage  = 949			'한글
Response.CacheControl = "no-cache"
Response.AddHeader "Pragma", "no-cache"
Response.Expires = -1
Response.Charset = "euc-kr"

ConnectDB DBCon, Application("DBInfo_FAIR")


Dim temppath, sourcepath
temppath	= "D:\solution\"& site_title &"\files\temp\"
sourcepath	= "D:\solution\"& site_title &"\files\notice\"	' 공지사항 첨부파일 저장 위치


Dim targetpath, datepath
datepath	= Left(Replace(FormatDateTime(Now(), 2),"-",""), 6)	' 첨부파일 월단위 폴더 분리 저장
targetpath	= sourcepath & datepath & "\"


Dim objFS
Set objFS = CreateObject("Scripting.FileSystemObject")


Dim Post, UploadedFile
Dim fileExtension, fileSize, oriFileName
Dim AllowExtension, intIndex
Dim maxFileSize


'-- 첨부파일 업로드
If InStr(Request.ServerVariables("CONTENT_TYPE"), "multipart/form-data") > 0 Then 
	
	' Perform the upload
	Set Post = Server.CreateObject("ActiveFile.Post")
	On Error Resume Next

	ReDim arrNewFile(5)
	ReDim arrOriFile(5)
	
	For i = 1 To 5 ' 첨부파일 등록 가능 수 만큼 유효성 검증
		
		Post.Upload temppath ' 첨부파일 임시 폴더에 저장
	
		fileExtension	= ""
		fileSize		= 0
		oriFileName		= ""

		Set UploadedFile = Post("file"&i).File			' 임시 저장 폴더 포함 전체 파일 저장 경로
		fileExtension	= UploadedFile.FileExtension	' 파일 확장자
		fileSize		= UploadedFile.Size		' 파일 크기
		oriFileName		= UploadedFile.FileName	' 파일명

		' 첨부파일 확장자 체크
		Dim blnAllowExtension	: blnAllowExtension = True 
		AllowExtension = Array("asp", "php", "jsp", "aspx", "js", "vbs", "htm", "html", "txt", "sql", "com", "bat", "cgi", "dll", "exe")
		For intIndex=0 To Ubound(AllowExtension)
			If LCase(fileExtension) = AllowExtension(intIndex) Then 
				blnAllowExtension = False 
				Exit For
			End If
		Next

		maxFileSize = 1024 * 1024 * 5	' 최대 저장 가능 파일 용량(20971520)


		' 1) 등록가능 확장자가 아닐 경우 리턴
		If blnAllowExtension = False Then 
			UploadedFile.Delete
			Set UploadedFile = Nothing 
			
			Post.Flush
			Set Post = Nothing 

			Response.Write "<script language=javascript>"&_
				"alert('첨부파일 업로드 실패\n- 등록할 수 없는 파일 형식 입니다. 파일 확장자를 다시 확인하시고 업로드해 주세요.');"&_
				"location.href=history.go(-1);"&_
				"</script>"
			Response.End 
		End If


		' 2) 파일 사이즈 초과 시 리턴
		If CLng(fileSize) > maxFileSize Then 			
			UploadedFile.Delete
			Set UploadedFile = Nothing
			
			Post.Flush
			Set Post = Nothing
		
			Response.Write "<script language=javascript>"&_
				"alert('첨부파일 업로드 실패\n- 파일 크기가 초과되었습니다. 파일 사이즈를 조정한 후 업로드해 주세요.\n- 최대 5MB 까지만 등록 가능');"&_
				"location.href=history.go(-1);"&_
				"</script>"
			Response.End 
		End If

		
		' 3) 첨부 파일 저장
		Randomize()
		Dim randomno	: randomno = Int(10000* Rnd())
		randomno = Right("0000"&randomno,5)

		' 파일명 등록일시분초+랜덤 숫자 형태로 교체
		Dim newFileName : newFileName = Replace(FormatDateTime(Now(), 2),"-","") & Replace(FormatDateTime(Now(), 4),":","") & Right(now(),2) & randomno 

		' 3-1) 저장 폴더가 없을 경우 생성
		If objFs.FolderExists(targetpath) = False Then
			objFs.CreateFolder(targetpath)
		End If
		
		' 3-2) 공지사항 폴더 경로에 파일 저장
		UploadedFile.Copy targetpath & newFileName & "." & fileExtension

		' 3-3) 기존 파일 삭제
'			If pre_file_name <> "" Then
'				objFs.DeleteFile sourcepath & pre_file_name
'			End If
		

		' 3-4) 파일 정보 DB 저장
		If Len(oriFileName)>0 Then
			'sql2 = "SET NOCOUNT ON;"
			'sql2 = sql2 &" INSERT INTO 게시판_첨부파일 ("
			'sql2 = sql2 &" 게시판번호, 첨부파일명, 원본파일명, 저장폴더 "
			'sql2 = sql2 &" ) VALUES ("
			'sql2 = sql2 &" '"&regKey&"', '"&newFileName&"', '"&oriFileName&"', 'notice'"
			'sql2 = sql2 &" );"
			'DBCon.Execute(sql2)

			arrNewFile(i) = newFileName & "." & fileExtension
			arrOriFile(i) = oriFileName

		End If 

	Next
	'Response.write "file1 : " & arrOriFile(1) & "<br>"
	'Response.write "file2 : " & arrOriFile(2) & "<br>"
	'Response.write "file3 : " & arrOriFile(3) & "<br>"
	'Response.write "file4 : " & arrOriFile(4) & "<br>"
	'Response.write "file5 : " & arrOriFile(5) & "<br>"

	
	
	
	' input 값 가져오기
	'Dim str_title, txtContent, chkTop, rdoOpenYn
	'str_title	= Post.FormInputs("str_title").Value	' 제목
	'txtContent	= Post.FormInputs("txtContent").Value	' 내용
	'chkTop		= Post.FormInputs("chkTop").Value		' 최상위 노출 여부(Y/N)
	'rdoOpenYn	= Post.FormInputs("rdoOpenYn").Value	' 화면 노출 여부(Y/N)

	Dim gubun, seq, title, txtContent, jobs_id, mode
	gubun		= Post.FormInputs("gubun").Value		'게시판구분
	seq			= Post.FormInputs("seq").Value			'게시판번호
	title		= Post.FormInputs("title").Value		'제목
	txtContent	= Post.FormInputs("txtContent").Value	'내용
	jobs_id		= Post.FormInputs("jobs_id").Value		'?
	mode		= Post.FormInputs("mode").Value			'등록/수정
	
	If gubun = "" Then 
		gubun = "1"
	Else 
		gubun = gubun
	End If  
	'Response.write "gubun : " & gubun & "<br>"
	'Response.write "seq : " & seq & "<br>"
	'Response.write "title : " & title & "<br>"
	'Response.write "txtContent : " & txtContent & "<br>"
	'Response.write "jobs_id : " & jobs_id & "<br>"
	'Response.write "mode : " & mode & "<br>"

If seq = "" Then	' 신규 등록 시
	Dim regKey : regKey = 0
	Dim spName
	spName = "usp_board_Insert"
	
	ReDim parameter(6)
	parameter(0)    = makeParam("@Gubun", adVarChar, adParamInput, 2, gubun)		
	parameter(1)    = makeParam("@jobs_id", adChar, adParamInput, 10, jobs_id)
	parameter(2)    = makeParam("@UserName", adVarChar, adParamInput, 100, admin_id)
	parameter(3)    = makeParam("@BizName", adVarChar, adParamInput, 100, "")
	parameter(4)    = makeParam("@Title", adVarChar, adParamInput, 500, title)		
	parameter(5)    = makeParam("@Content", adLongVarWChar, adParamInput, LenB(txtContent), txtContent)
	parameter(6)    = makeParam("@Rtn", adInteger, adParamOutput, 4, "")	
	
	Call execSP(DBCon,spName,parameter, "", "")
	regKey = getParamOutputValue(parameter, "@Rtn")

Else	' 수정 시
	regKey = seq
	spName = "usp_board_modify"

	ReDim parameter(6)
	parameter(0)    = makeParam("@Idx", adInteger, adParamInput, 4, regKey)
	parameter(1)    = makeParam("@jobs_id", adInteger, adParamInput, 4, "")
	parameter(2)    = makeParam("@UserName", adVarChar, adParamInput, 30, admin_id)
	parameter(3)    = makeParam("@BizName", adVarChar, adParamInput, 200, "")
	parameter(4)    = makeParam("@Title", adVarChar, adParamInput, 500, title)	
	parameter(5)    = makeParam("@Content", adLongVarWChar, adParamInput, LenB(txtContent), txtContent)
	parameter(6)    = makeParam("@Rtn", adInteger, adParamOutput, 4, "")	

	Call execSP(DBCon,spName,parameter,"","")
	rtnValue = getParamOutputValue(parameter, "@Rtn")

End If 
	
	'첨부파일 저장
	For i = 1 To 5
		If arrNewFile(i) <> "" Then

			ReDim parameter(4)
			spName = "usp_board_files_insert"

			parameter(0)    = makeParam("@seq", adInteger, adParamInput, 4, regKey)
			parameter(1)    = makeParam("@gubun", adChar, adParamInput, 1, "1")
			parameter(2)    = makeParam("@upFile", adVarChar, adParamInput, 100, arrNewFile(i))
			parameter(3)    = makeParam("@realFile", adVarChar, adParamInput, 100, arrOriFile(i))
			parameter(4)    = makeParam("@strFolder", adChar, adParamInput, 6, datepath)

			Call execSP(DBCon,spName,parameter,"","")

		End If
	Next


	Post.Flush
	Set UploadedFile = Nothing
	Set Post = Nothing	

End If 

DisconnectDB DBCon

If seq = "" Then 
	Response.Write "<script language=javascript>"&_
		"alert('저장 되었습니다.');"&_
		"location.href='board_list.asp';"&_
		"</script>"
	Response.End 
Else 
	If rtnValue="1" Then 
		Response.Write "<script language=javascript>"&_
			"alert('수정 되었습니다.');"&_
			"location.href='board_list.asp';"&_
			"</script>"
		Response.End 		
	Else
		Response.Write "<script language=javascript>"&_
			"alert('수정 중 오류 발생! 관리자에게 문의하세요.');"&_
			"location.href='board_list.asp';"&_
			"</script>"
		Response.End 		
	End If 
End If 
%>