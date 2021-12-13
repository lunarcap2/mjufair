<% Option Explicit %>

<!--#include virtual = "/common/constant.asp"-->
<!--#include virtual = "/wwwconf/function/library/CryptoHelper.asp"-->
<!--#include virtual = "/wwwconf/function/library/KISA_SHA256.asp"-->

<%
	Response.AddHeader "P3P", "CP='ALL CURa ADMa DEVa TAIa OUR BUS IND PHY ONL UNI PUR FIN COM NAV INT DEM CNT STA POL HEA PRE LOC OTC'"

	Dim hostnm		: hostnm	= "http://" & Request.ServerVariables("SERVER_NAME")
	Dim from		: from		= Request("from")
	Dim msg			: msg		= ""
	Dim logtype		: logtype	= "1"  ' 개인로그인

	redir = Request("redir")

	Dim strSql, idCnt
	Dim ErrURL
	Dim mem_root, mem_root_txt
	Dim pagegb		: pagegb	= Request("pagegb")
	Dim hLog		: hLog		= Request("hLog")  ' 로그인 후 입사지원할때  history.back 할 횟수
	
	Dim fairName	: fairName	= request("fairName")
	If hLog ="" Or IsNumeric(hLog)=false Then
		hLog = 2
	Else
		hLog = hLog + 1
	End If

	If Trim(redir)="" Then redir = hostnm
	If InStr(1,redir,"http") = 0 Then redir = hostnm & redir

	' 개인회원아이디에 "_wk"를 붙인다.
	Dim id		: id	= Replace(Request.Form("id"), "'", "''")
	Dim pw		: pw	= Replace(Request.Form("pw"), "'", "''") 
	Dim sa_no	: sa_no = Request.Form("sa_no")
	Dim get_user_id, get_user_pw, get_user_name, get_user_address, get_user_email, get_user_photo, get_cellphone

	Dim email_str, user_cellphone, mail_flag1, mail_flag2
	Dim jumin1, jumin2, strSql2, birth_year
	Dim motiSql, motiSqlSoldier, gubun, InseedKey

	If Trim(id) = "" Then Response.Write "<meta http-equiv='refresh' content='0; url="& hostnm &"/my/login.asp'>"
	
	'********** 개인회원정보 테이블 등록 체크
	dbCon.Open Application("DBInfo_FAIR")

	strSql = "SELECT 개인아이디, 성명, isnull(전자우편,''), 암호화_비밀번호, 휴대폰, 주소, 사진파일 " &_
		      " FROM 개인회원정보 WITH(NOLOCK)" &_
		      " WHERE 개인아이디='" & id & "_wk' AND 사이트구분 IN ('W','A','U','N','P','M','K','Q','AT','PA','KA') "

	Rs1.Open strSql, dbCon, 0, 1

	If (Rs1.BOF = False And Rs1.EOF = False) Then
		If SHA256_Encrypt(pw) = rs1("암호화_비밀번호") Then
			Call ClearCookieWK  ' 모든 쿠키 reset

			get_user_id			= Rs1.Fields(0).Value
			get_user_name		= Rs1.Fields(1).Value
			get_user_email		= Rs1.Fields(2).Value
			get_cellphone		= Rs1.Fields(4).Value
			get_user_address	= Rs1.Fields(5).Value
			get_user_photo		= Rs1.Fields(6).Value

			Rs1.Close

			ErrURL = redir

			'#### 회원정보 쿠키할당
			Response.Cookies(site_code & "WKP_F")("id")			= Replace(get_user_id, "_wk", "")
			Response.Cookies(site_code & "WKP_F")("name")		= get_user_name
			Response.Cookies(site_code & "WKP_F")("email")		= get_user_email
			Response.Cookies(site_code & "WKP_F")("cellphone")	= get_cellphone
			Response.Cookies(site_code & "WKP_F")("address")	= get_user_address
			Response.Cookies(site_code & "WKP_F")("photo")		= get_user_photo

			'이력서건수(미완료된 이력서는 카운트X)
			strSql = "SELECT COUNT(등록번호), isnull(sum(case 경력코드 when '1' then 1 else 0 end),0), isnull(sum(case 경력코드 when '8' then 1 else 0 end),0) " &_
					 "  FROM 이력서 WITH(NOLOCK) WHERE 개인아이디='" & id & "_wk' and 단계 <> '0' "
			
			Rs1.Open strSql, dbCon, 0, 1

			CK_ResumeCnt1	= Rs1.Fields(0)
			CK_ResumeCnt11	= Rs1.Fields(1)	' 신입이력서
			CK_ResumeCnt12	= Rs1.Fields(2)	' 경력이력서

			Response.Cookies(site_code & "WKP_F")("CK_ResumeCnt")	= CK_ResumeCnt1
			Response.Cookies(site_code & "WKP_F")("CK_ResumeCnt1")	= CK_ResumeCnt11
			Response.Cookies(site_code & "WKP_F")("CK_ResumeCnt2")	= CK_ResumeCnt12
			
			Rs1.Close

			dbCon.Close

			'Response.Cookies("WKP_F").Domain		= Request.ServerVariables("SERVER_NAME")	' 도메인 설정
			Response.Cookies(site_code & "WKP_F").Domain = "career.co.kr"	' 도메인 설정


			ErrURL = redir
		Else ' 비번틀린경우
			MSG = "입력하신 비밀번호가 일치하지 않습니다.\r비밀번호를 다시 확인해 주시기 바랍니다."
			ErrURL = hostnm & "/my/login.asp?redir="&Server.URLEncode(redir)
		End If
	Else ' 개인회원정보 테이블에 없음
		MSG = "입력하신 아이디가 존재하지 않습니다.\r아이디를 다시 확인해 주시기 바랍니다."
		ErrURL = hostnm & "/my/login.asp?redir="&Server.URLEncode(redir)
	End If
%>

<%IF Request.Form("WINTYPE") = "POP" THEN%>
	<script type="text/javascript">
	<%If MSG <> "" then%>
		alert('<%=msg%>');
		history.back();
	<%ELSE%>
	   location.href = "http://<%=Request.Form("HOSTNM")%>/login/ie8msg.asp?redir=<%=redir%>"
	<%END IF%>
	</script>
<%ELSE%>
	<script type="text/javascript">
	<%If MSG <> "" Then%>
		alert('<%=msg%>');
	<%End If%>
	</script>

	<META HTTP-EQUIV="REFRESH" CONTENT="0; URL=<%=ErrURL%>"></head>
	<body>
	</body>
	</html>
<%END IF%>

<OBJECT RUNAT="SERVER" PROGID="ADODB.Connection" ID="dbCon"></OBJECT>
<OBJECT RUNAT="SERVER" PROGID="ADODB.RecordSet" ID="Rs"></OBJECT>
<OBJECT RUNAT="SERVER" PROGID="ADODB.RecordSet" ID="Rs1"></OBJECT>
<OBJECT RUNAT="SERVER" PROGID="ADODB.Connection" ID="dbCon2"></OBJECT>
<OBJECT RUNAT="SERVER" PROGID="ADODB.Connection" ID="dbCon3"></OBJECT>
<OBJECT RUNAT="SERVER" PROGID="ADODB.RecordSet" ID="Rs2"></OBJECT>
<OBJECT RUNAT="SERVER" PROGID="ADODB.RecordSet" ID="Rs3"></OBJECT>
<OBJECT RUNAT="SERVER" PROGID="ADODB.RecordSet" ID="Rs4"></OBJECT>
<OBJECT RUNAT="SERVER" PROGID="ADODB.Connection" ID="dbConSpec"></OBJECT>
<OBJECT RUNAT="SERVER" PROGID="ADODB.Command" ID="Cmd" VIEWASTEXT></OBJECT>