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

	Set UploadedFile = Post("img_logo").File	' 임시 저장 폴더 포함 전체 파일 저장 경로
	fileExtension	= UploadedFile.FileExtension	' 파일 확장자
	fileSize		= UploadedFile.Size		' 파일 크기
	oriFileName		= UploadedFile.FileName	' 파일명

	Dim img_logo : img_logo = ""

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
		img_logo		= datepath & "/" & newFileName & "." & fileExtension

	End If
	
	' input 값 가져오기
	Dim mentor_no, title, explain, mentoring_day, mentoring_time, link_url, s_date, s_time, e_date, e_time, limit_cnt

	mentor_no		= Post.FormInputs("mentor_no").Value		' 등록번호
	title			= Post.FormInputs("title").Value			' 제목
	explain			= Post.FormInputs("explain").Value			' 설명(소속)
	mentoring_day	= Post.FormInputs("mentoring_day").Value	' 상담날짜
	mentoring_time	= Post.FormInputs("mentoring_time").Value	' 상담시간
	link_url		= Post.FormInputs("link_url").Value			' 링크주소
	s_date			= Post.FormInputs("s_date").Value			' 신청 시작날짜
	s_time			= Post.FormInputs("s_time").Value			' 신청 종료시간
	e_date			= Post.FormInputs("e_date").Value			' 신청 종료날짜
	e_time			= Post.FormInputs("e_time").Value			' 신청 종료시간
	limit_cnt		= Post.FormInputs("limit_cnt").Value		' 인원제한
	
	mentoring_time = Replace(mentoring_time, " ", "")	' 공백제거
	If s_time = "" Then s_time = "00"					' 기본값 00시
	If limit_cnt = "" Then limit_cnt = "4"				' 기본값 4명

	' zoom 주소 다시셋팅
	Dim set_link_url
	If InStr(link_url, "http") > 0 Then 
		set_link_url = link_url
	Else 
		set_link_url = "http://" & link_url
	End If

	'Response.write "mentor_no		: " & mentor_no			& "<br>"
	'Response.write "title			: " & title				& "<br>"
	'Response.write "mentoring_day	: " & mentoring_day		& "<br>"
	'Response.write "mentoring_time	: " & mentoring_time	& "<br>"
	'Response.write "link_url		: " & link_url			& "<br>"
	'Response.write "s_date			: " & s_date			& "<br>"
	'Response.write "s_time			: " & s_time			& "<br>"
	'Response.write "e_date			: " & e_date			& "<br>"
	'Response.write "e_time			: " & e_time			& "<br>"
	'Response.write "limit_cnt		: " & limit_cnt			& "<br>"

	'Response.write "img_logo		 : " & img_logo	 & "<br>"
	'Response.End
	
	'관리자 수정이면서 첨부파일 새로올리지 않았을경우 기존 파일정보로 업데이트
	If mentor_no <> "" And img_logo = "" Then img_logo = Post.FormInputs("str_img_logo").Value

	Dim regKey : regKey = 0
	Dim spName
	spName = "asp_관리자_상담정보_등록"
	
	ReDim parameter(12)
	parameter(0)	= makeParam("@MENTOR_NO",		adInteger,	adParamInput,	4,		mentor_no)
	parameter(1)	= makeParam("@TITLE",			adVarChar,	adParamInput,	200,	title)
	parameter(2)	= makeParam("@EXPLAIN",			adVarChar,	adParamInput,	200,	explain)
	parameter(3)	= makeParam("@MENTORING_DAY",	adVarChar,	adParamInput,	10,		mentoring_day)
	parameter(4)	= makeParam("@MENTORING_TIME",	adVarChar,	adParamInput,	100,	mentoring_time)
	parameter(5)	= makeParam("@IMG_LOGO",		adVarChar,	adParamInput,	200,	img_logo)
	parameter(6)	= makeParam("@LINK_URL",		adVarChar,	adParamInput,	1000,	set_link_url)
	parameter(7)	= makeParam("@S_DATE",			adVarChar,	adParamInput,	10,		s_date)
	parameter(8)	= makeParam("@S_TIME",			adVarChar,	adParamInput,	2,		s_time)
	parameter(9)	= makeParam("@E_DATE",			adVarChar,	adParamInput,	10,		e_date)
	parameter(10)	= makeParam("@E_TIME",			adVarChar,	adParamInput,	2,		e_time)
	parameter(11)	= makeParam("@LIMIT_CNT",		adInteger,	adParamInput,	4,		limit_cnt)
	parameter(12)	= makeParam("@RTN",				adInteger,	adParamOutput,	4,		"")
	
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