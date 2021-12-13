 <!--#include virtual="/wwwconf/function/db/DBConnection.asp"-->
<!--#include virtual="/common/common.asp"-->
<!--#include virtual="/wwwconf/function/library/KISA_SHA256.asp"-->
<%
'--------------------------------------------------------------------
'   Comment		: 개인회원 가입
' 	History		: 2020-04-20, 이샛별 
'---------------------------------------------------------------------
Session.CodePage  = 949			'한글
Response.CharSet  = "euc-kr"	'한글
Response.AddHeader "Pragma","no-cache"
Response.AddHeader "cache-control", "no-staff"
Response.Expires  = -1


Response.AddHeader "P3P", "CP='ALL CURa ADMa DEVa TAIa OUR BUS IND PHY ONL UNI PUR FIN COM NAV INT DEM CNT STA POL HEA PRE LOC OTC'"

Dim txtId, txtPass, txtName, txtBirth, txtEmail, chkAgrMail, txtPhone, chkAgrSms, compId, encPass

txtId		= RTrim(LTrim(Replace(Request("txtId"), "'", "''")))	' 아이디
txtPass		= Replace(Request("txtPass"), "'", "''")				' 비밀번호	
txtPhone	= Request("txtPhone")	' 휴대폰번호
selGrad		= Request("selGrad")	' 졸업 및 재학여부
txtName		= RTrim(LTrim(Replace(Replace(Request("txtName"), "'", "''"), " ", "")))	' 이름
txtMajor	= RTrim(LTrim(Replace(Replace(Request("txtMajor"), "'", "''"), " ", "")))	' 학과


rdoStudent	= Request("rdoStudent")	' 재학생/타대생 구분
txtStuNo	= RTrim(LTrim(Replace(Request("txtStuNo"), "'", "''")))	' 아이디
txtUnivNm	= RTrim(LTrim(Replace(Replace(Request("txtUnivNm"), "'", "''"), " ", "")))	' 학교
rdoGender	= Request("rdoGender")	' 성별


'------------ 미사용 항목 ------------ 
txtBirth	= RTrim(LTrim(Replace(Replace(Request("txtBirth"), "'", "''"), " ", "")))	' 생년월일
txtEmail	= RTrim(LTrim(LCase(Replace(Request("txtEmail"), " ", ""))))	' 이메일
chkAgrMail	= Request("chkAgrMail")		' 홍보성 메일 수신 동의
chkAgrSms	= Request("chkAgrSms")		' 홍보성 문자 수신 동의


' 재학생/타대생 구분에 따라 사용 아이디 값 설정
If rdoStudent="1" Then 
	txtId = txtStuNo
Else 
	txtId = txtId
End If 

' 성별 설정
If rdoGender="1" Then 
	rdoGender = "M"
Else 
	rdoGender = "F"
End If 

' 연락처에 하이픈 누락된 경우 강제 설정
Dim len_txtPhone, strPhone
If InStr(txtPhone,"-")=0 Then 
	len_txtPhone	= Len(txtPhone)
	strPhone		= Left(txtPhone,3)&"-"&Mid(txtPhone,4,len_txtPhone-7)&"-"&Right(txtPhone,4)
Else 
	strPhone		= txtPhone
End If 


' 정상적인 경로로 이동하지 않은 경우 회원가입 화면으로 리턴
If Len(txtId) = 0 Or Len(txtPass) = 0 Then Response.Write "<meta http-equiv='refresh' content='0; url=http://" & Request.ServerVariables("SERVER_NAME") & "/my/signup/join.asp'>"


compId	= txtId&"_wk"				' 개인회원아이디+"_wk" 조합		
encPass = SHA256_Encrypt(txtPass)	' 비번 암호화(sha256 방식)


ConnectDB DBCon, Application("DBInfo_FAIR")


' 입력 아이디 중복 체크
SpName="usp_ID_CheckAll"
	Dim chkparam(1)
	chkparam(0)=makeParam("@user_id", adVarChar, adParamInput, 20, compId)
	chkparam(1)=makeParam("@rtn", adChar, adParamOutput, 1, "")

	Call execSP(DBCon, SpName, chkparam, "", "")

	rsltCmt = getParamOutputValue(chkparam, "@rtn")


If rsltCmt = "O" Then ' 입력한 아이디로 기존 가입된 정보가 없으면 회원 가입
		
	SpName="usp_회원가입_개인_암호화"
		Dim param(14)
		param(0)=makeParam("@개인아이디", adVarChar, adParamInput, 20, compId)
		param(1)=makeParam("@암호화_비밀번호", adVarChar, adParamInput, 100, encPass)
		param(2)=makeParam("@성명", adVarChar, adParamInput, 30, txtName)
		param(3)=makeParam("@생년월일", adVarChar, adParamInput, 10, txtBirth)
		param(4)=makeParam("@전자우편", adVarChar, adParamInput, 100, txtEmail)
		param(5)=makeParam("@휴대폰", adVarChar, adParamInput, 20, strPhone)
		param(6)=makeParam("@메일수신여부", adChar, adParamInput, 1, chkAgrMail)
		param(7)=makeParam("@SMS수신", adChar, adParamInput, 1, chkAgrSms)
		param(8)=makeParam("@학과", adVarChar, adParamInput, 50, txtMajor)
		param(9)=makeParam("@졸업구분", adChar, adParamInput, 1, selGrad)		

		param(10)=makeParam("@성별", adChar, adParamInput, 1, rdoGender)		
		param(11)=makeParam("@학교", adVarChar, adParamInput, 50, txtUnivNm)

		param(12)=makeParam("@사이트구분", adChar, adParamInput, 2, "W")
		param(13)=makeParam("@가입사이트구분코드", adChar, adParamInput, 2, "1")
		param(14)=makeParam("@rtn", adChar, adParamOutput, 1, "")
	
		Call execSP(DBCon, SpName, param, "", "")

		sp_rtn = getParamOutputValue(param, "@rtn")	

	
	If sp_rtn = "O" Then	' 정상 가입 완료 시 자동로그인 처리

		'#### 유입 경로 저장
		Dim strSql, strRemoteAddr, strUserAgent
		strRemoteAddr	= Request.ServerVariables("REMOTE_ADDR")
        strUserAgent	= Request.ServerVariables("HTTP_USER_AGENT")	
		strSql = "INSERT INTO 회원가입환경정보(회원아이디, 가입아이피, 가입환경) VALUES('"&compId&"', '"&strRemoteAddr&"', '"&strUserAgent&"')"
		DBCon.Execute(strSql)


		'#### 회원정보 쿠키 할당
		Response.Cookies(site_code & "WKP_F")("id")			= Replace(compId, "_wk", "")
		Response.Cookies(site_code & "WKP_F")("name")		= txtName
'		Response.Cookies(site_code & "WKP_F")("email")		= txtEmail
		Response.Cookies(site_code & "WKP_F")("cellphone")	= strPhone
		Response.Cookies(site_code & "WKP_F").Domain		= "career.co.kr"
		'Response.Cookies("WKP_F").Domain	= Request.ServerVariables("SERVER_NAME")	' 도메인 설정

		Response.Write "<script language=javascript>"&_
		 "alert('참가신청 완료되었습니다.');"&_
		"location.href='/';"&_
		"</script>"
		response.End 

	Else ' 회원 정보 저장 중 오류 발생 리턴
		Response.Write "<script language=javascript>"&_
		 "alert('참가신청 중 오류가 발생했습니다.\n다시 시도해 주세요.');"&_
		"location.href='/my/signup/join.asp';"&_
		"</script>"
		response.End 
	End If 
Else	' 입력한 아이디로 가입된 정보가 존재할 경우 회원 가입 페이지 리턴
	Response.Write "<script language=javascript>"&_
	 "alert('입력하신 아이디로 참가신청된 정보가 존재합니다.\n다른 아이디로 다시 시도해 주세요.');"&_
	"location.href='/my/signup/join.asp';"&_
	"</script>"
	response.End 
End If 

DisconnectDB DBCon
%>