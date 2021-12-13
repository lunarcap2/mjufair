<!--#include virtual="/common/common.asp"-->
<!--#include virtual="/wwwconf/function/db/DBConnection.asp"-->
<%
ConnectDB DBCon, Application("DBInfo_FAIR")

Dim temppath, sourcepath
temppath	= "D:\solution\"& site_title &"\files\temp\"
sourcepath	= "D:\solution\"& site_title &"\files\mentor\"

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

	Post.Upload temppath ' 첨부파일 임시 폴더에 저장
	fileExtension	= ""
	fileSize		= 0
	oriFileName		= ""

	Set UploadedFile = Post("file_com_logo").File	' 임시 저장 폴더 포함 전체 파일 저장 경로
	fileExtension	= UploadedFile.FileExtension	' 파일 확장자
	fileSize		= UploadedFile.Size		' 파일 크기
	oriFileName		= UploadedFile.FileName	' 파일명

	Dim com_logo : com_logo = ""

	'첨부파일 있을경우만 파일업로드관련 실행
	If fileExtension <> "" Then

		' 첨부파일 확장자 체크
		dim blnAllowExtension : blnAllowExtension = false
		AllowExtension = Array("gif", "jpg", "jpeg", "png")
		For intIndex=0 To Ubound(AllowExtension)
			If LCase(fileExtension) = AllowExtension(intIndex) Then 
				blnAllowExtension = true 
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
		maxFileSize = 1024 * 1024 * 5	' 최대 저장 가능 파일 용량(20971520)
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

		com_logo		= datepath & "/" & newFileName & "." & fileExtension

	End If
	
	' input 값 가져오기
	Dim mentor_no, mentor_name, com_name, dept_name, mentoring_day, mentoring_hour, mentoring_min
	mentor_no		= Post.FormInputs("mentor_no").Value		'멘토번호
	mentor_name		= Post.FormInputs("mentor_name").Value		'멘토이름
	com_name		= Post.FormInputs("com_name").Value			'소속회사
	dept_name		= Post.FormInputs("dept_name").Value		'부서명
	mentoring_day	= Post.FormInputs("mentoring_day").Value	'멘토링_일
	mentoring_hour	= Post.FormInputs("mentoring_hour").Value	'멘토링_시
	mentoring_min	= Post.FormInputs("mentoring_min").Value	'멘토링_분

	'Response.write "mentor_name		 : " & mentor_name		 & "<br>"
	'Response.write "com_name		 : " & com_name			 & "<br>"
	'Response.write "dept_name		 : " & dept_name		 & "<br>"
	'Response.write "mentoring_day	 : " & mentoring_day	 & "<br>"
	'Response.write "mentoring_hour	 : " & mentoring_hour	 & "<br>"
	'Response.write "mentoring_min	 : " & mentoring_min	 & "<br>"
	'
	'Response.write "com_logo		 : " & com_logo	 & "<br>"
	'Response.End
	
	'관리자 수정이면서 첨부파일 새로올리지 않았을경우 기존 파일정보로 업데이트
	If mentor_no <> "" And com_logo = "" Then com_logo = Post.FormInputs("str_file_com_logo").Value	

	Dim regKey : regKey = 0
	Dim spName
	spName = "asp_관리자_멘토정보_등록"
	
	ReDim parameter(9)
	parameter(0)    = makeParam("@MENTOR_NO", adInteger, adParamInput, 4, mentor_no)
	parameter(1)    = makeParam("@MENTOR_NAME", adVarChar, adParamInput, 20, mentor_name)
	parameter(2)    = makeParam("@COM_NAME", adVarChar, adParamInput, 100, com_name)
	parameter(3)    = makeParam("@DEPT_NAME", adVarChar, adParamInput, 100, dept_name)
	parameter(4)    = makeParam("@COM_LOGO", adVarChar, adParamInput, 200, com_logo)
	parameter(5)    = makeParam("@TAG", adVarChar, adParamInput, 2000, "")
	parameter(6)    = makeParam("@MENTORING_DAY", adChar, adParamInput, 10, mentoring_day)
	parameter(7)    = makeParam("@MENTORING_HOUR", adChar, adParamInput, 2, mentoring_hour)
	parameter(8)    = makeParam("@MENTORING_MIN", adChar, adParamInput, 2, mentoring_min)
	parameter(9)    = makeParam("@RTN", adInteger, adParamOutput, 4, "")
	
	Call execSP(DBCon,spName,parameter, "", "")
	regKey = getParamOutputValue(parameter, "@RTN")

	Post.Flush
	Set UploadedFile = Nothing
	Set Post = Nothing

End If 

DisconnectDB DBCon


Response.Write "<script language=javascript>"&_
	"alert('저장 되었습니다.');"&_
	"location.href='mentor_list.asp';"&_
	"</script>"
Response.End 
%>