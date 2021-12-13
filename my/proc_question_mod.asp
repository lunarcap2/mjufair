<!--#include virtual="/common/common.asp"-->
<!--#include virtual="/wwwconf/function/db/DBConnection.asp"-->
<%
ConnectDB DBCon, Application("DBInfo_FAIR")

Dim temppath, sourcepath
temppath	= "D:\solution\"& site_title &"\files\temp\"
sourcepath	= "D:\solution\"& site_title &"\files\quest\"

Dim targetpath, datepath
datepath	= Left(Replace(FormatDateTime(Now(), 2),"-",""), 6)	' 첨부파일 월단위 폴더 분리 저장
targetpath	= sourcepath & datepath & "\"

Dim objFS
Set objFS = CreateObject("Scripting.FileSystemObject")

Dim Post, UploadedFile
Dim fileExtension, fileSize, oriFileName
Dim AllowExtension, intIndex
Dim maxFileSize


Dim file_yn : file_yn = "N"

'-- 첨부파일 업로드
If InStr(Request.ServerVariables("CONTENT_TYPE"), "multipart/form-data") > 0 Then 
	
	' Perform the upload
	Set Post = Server.CreateObject("ActiveFile.Post")
	On Error Resume Next

	ReDim arrNewFile(2)
	ReDim arrOriFile(2)

	For i = 1 To 2 ' 첨부파일 등록 가능 수 만큼 유효성 검증

		Post.Upload temppath ' 첨부파일 임시 폴더에 저장
		fileExtension	= ""
		fileSize		= 0
		oriFileName		= ""

		Set UploadedFile = Post("ex_file"&i).File	' 임시 저장 폴더 포함 전체 파일 저장 경로
		fileExtension	= UploadedFile.FileExtension	' 파일 확장자
		fileSize		= UploadedFile.Size		' 파일 크기
		oriFileName		= UploadedFile.FileName	' 파일명
		

		'첨부파일 있을경우만 파일업로드관련 실행
		If fileExtension <> "" Then

			file_yn = "Y"

			' 첨부파일 확장자 체크
			Dim blnAllowExtension	: blnAllowExtension = True 
			AllowExtension = Array("asp", "php", "jsp", "aspx", "js", "vbs", "htm", "html", "txt", "sql", "com", "bat", "cgi", "dll", "exe")
			For intIndex=0 To Ubound(AllowExtension)
				If LCase(fileExtension) = AllowExtension(intIndex) Then 
					blnAllowExtension = False 
					Exit For
				End If
			Next

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
			maxFileSize = 1024 * 1024 * 4	' 최대 저장 가능 파일 용량(20971520)
			If CLng(fileSize) > maxFileSize Then 			
				UploadedFile.Delete
				Set UploadedFile = Nothing
				
				Post.Flush
				Set Post = Nothing
			
				Response.Write "<script language=javascript>"&_
					"alert('첨부파일 업로드 실패\n- 파일 크기가 초과되었습니다. 파일 사이즈를 조정한 후 업로드해 주세요.\n- 최대 4MB 까지만 등록 가능');"&_
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

			' 3-4) 복수의 파일정보 변수설정
			If Len(oriFileName) > 0 Then
				arrNewFile(i) = datepath & "/" & newFileName & "." & fileExtension
				arrOriFile(i) = oriFileName
			End If 

		End If
	
	Next



	Dim pop_question_idx, pop_question_cont
	pop_question_idx	= Post.FormInputs("pop_question_idx").Value
	pop_question_cont	= Post.FormInputs("pop_question_cont").Value

	Dim strQuery
	strQuery = "UPDATE 상담_사전질문 SET 내용 = ? WHERE IDX = ?"

	ReDim param(1)
	Param(0) = makeparam("@cont",adVarChar,adParamInput,2000,pop_question_cont)
	Param(1) = makeparam("@idx",adInteger,adParamInput,4,pop_question_idx)
	Call execSqlParam(DBCon, strQuery, Param, "", "")

	'첨부파일 저장
	If file_yn = "Y" Then 		
		strQuery = "DELETE 멘토링_사전질문_첨부파일 WHERE 사전질문번호 = ?"
		ReDim param(0)
		Param(0) = makeparam("@사전질문번호",adInteger,adParamInput,4,pop_question_idx)
		Call execSqlParam(DBCon, strQuery, Param, "", "")
		
		For i = 1 To 2
			If arrNewFile(i) <> "" Then
				ReDim parameter(4)
				spName = "usp_개인_멘토링_사전질문_첨부파일_등록"
				parameter(0)    = makeParam("@QUESTION_NO", adInteger, adParamInput, 4, pop_question_idx)
				parameter(1)    = makeParam("@UP_FILE", adVarChar, adParamInput, 2000, arrNewFile(i))
				parameter(2)    = makeParam("@REAL_FILE", adVarChar, adParamInput, 2000, arrOriFile(i))
				parameter(3)    = makeParam("@RTN", adInteger, adParamOutput, 4, "")
				Call execSP(DBCon,spName,parameter,"","")
			End If
		Next
	End If 


	Post.Flush
	Set UploadedFile = Nothing
	Set Post = Nothing

End If 

DisconnectDB DBCon


Response.Write "<script language=javascript>"&_
	"alert('사전질문 수정이 완료되었습니다.');"&_
	"location.href='/my/default.asp';"&_
	"</script>"
response.End
%>