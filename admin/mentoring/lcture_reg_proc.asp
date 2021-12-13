<!--#include virtual="/common/common.asp"-->
<!--#include virtual="/wwwconf/function/db/DBConnection.asp"-->

<%
	ConnectDB DBCon, Application("DBInfo_FAIR")

		' input 값 가져오기
		Dim lcture_no, lcture_tit, lcture_sday, lcture_shour, lcture_smin, lcture_eday, lcture_ehour, lcture_emin, lcture_zoomurl, proc_gubun
		lcture_no		= Request("lcture_no")		'특강번호
		lcture_tit		= Request("lcture_tit")		'특강명
		lcture_sday		= Request("lcture_sday")	'특강_시작일
		lcture_shour	= Request("lcture_shour")	'특강_시작시
		lcture_smin		= "00"						'특강_시작분
		lcture_eday		= Request("lcture_eday")	'특강_종료일
		lcture_ehour	= Request("lcture_ehour")	'특강_종료시
		lcture_emin		= "00"						'특강_종료분
		lcture_zoomurl	= Request("lcture_zoomurl")	'특강zoom주소

		proc_gubun		= Request("proc_gubun")		' 등록/수정-submit || 삭제-delete

		' zoom 주소 다시셋팅
		Dim set_lcture_zoomurl
		If InStr(lcture_zoomurl, "http") > 0 Then 
			set_lcture_zoomurl = lcture_zoomurl
		Else 
			set_lcture_zoomurl = "http://" & lcture_zoomurl
		End If
		


		' 공백제거
		lcture_no			= Trim(lcture_no)	
		lcture_tit			= Trim(lcture_tit)	
		lcture_sday			= Trim(lcture_sday)	
		lcture_shour		= Trim(lcture_shour)
		lcture_smin			= Trim(lcture_smin)	
		lcture_eday			= Trim(lcture_eday)	
		lcture_ehour		= Trim(lcture_ehour)
		lcture_emin			= Trim(lcture_emin)	
		set_lcture_zoomurl	= Trim(set_lcture_zoomurl)

		

		' 강의시작일시, 종료일시 날짜형식으로 변환
		Dim set_lcture_sday, set_lcture_eday
		set_lcture_sday = lcture_sday & " " & lcture_shour & ":" & lcture_smin
		set_lcture_eday = lcture_eday & " " & lcture_ehour & ":" & lcture_emin	
		
		set_lcture_sday	= LTrim(RTrim(set_lcture_sday))
		set_lcture_eday	= LTrim(RTrim(set_lcture_eday))



		Dim regKey : regKey = 0
		Dim spName, alert_msg

		If proc_gubun = "submit" Then
			alert_msg = "저장 되었습니다."

			spName = "asp_관리자_특강배너관리_등록"

			ReDim parameter(5)
			parameter(0)    = makeParam("@lcture_no", adInteger, adParamInput, 4, lcture_no)
			parameter(1)    = makeParam("@lcture_tit", adVarWChar, adParamInput, 400, lcture_tit)
			parameter(2)    = makeParam("@lcture_sday", adVarWChar, adParamInput, 100, set_lcture_sday)
			parameter(3)    = makeParam("@lcture_eday", adVarWChar, adParamInput, 100, set_lcture_eday)
			parameter(4)    = makeParam("@lcture_zoomurl", adVarWChar, adParamInput, 400, set_lcture_zoomurl)
			parameter(5)    = makeParam("@RTN", adInteger, adParamOutput, 4, "")			
		
		Else			
			alert_msg = "삭제 되었습니다."

			spName = "asp_관리자_특강배너관리_삭제"

			ReDim parameter(1)
			parameter(0)    = makeParam("@lcture_no", adInteger, adParamInput, 4, lcture_no)
			parameter(1)    = makeParam("@RTN", adInteger, adParamOutput, 4, "")

		End If

		Call execSP(DBCon,spName,parameter, "", "")
		regKey = getParamOutputValue(parameter, "@RTN")

	DisconnectDB DBCon


	
	Response.Write "<script language=javascript>"&_
		"alert('" & alert_msg & "');"&_
		"location.href='lcture_list.asp';"&_
		"</script>"
	Response.End 
%>