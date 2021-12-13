<%Option Explicit%>

<!--#include virtual = "/common/common.asp"-->
<!--#include virtual = "/wwwconf/function/db/DBConnection.asp"-->

<%
	Response.CharSet = "euc-kr"
	Response.ContentType = "application/x-msexcel"
	Response.CacheControl  = "public"
	Response.AddHeader  "Content-Disposition", "attachment;filename=명지대_회원가입현황.xls"

	Dim gubun		: gubun			= Request("gubun")
	Dim schKeyword	: schKeyword	= Request("schKeyword") ' 검색어(제목/내용)
	Dim sDate		: sDate			= Request("sDate")
	Dim eDate		: eDate			= Request("eDate")
	Dim page		: page			= Request("page")
	Dim pageSize	: pageSize		= 10000

	If page = "" Then page=1
	page = CInt(page)

	If sDate = "" Then sDate = ""
	If eDate = "" Then eDate = ""

	Dim stropt, i, ii
	stropt = "gubun="& gubun &"&schKeyword="&schKeyword &"&sDate="&sDate &"&eDate="&eDate

	ConnectDB DBCon, Application("DBInfo_FAIR")

		Dim Param(7)
		Param(0) = makeparam("@KW_GUBUN",adVarChar,adParamInput,100,gubun)
		Param(1) = makeparam("@KW",adVarChar,adParamInput,100,schKeyword)
		Param(2) = makeparam("@MENTORING_NO",adInteger,adParamInput,4,"")
		Param(3) = makeparam("@S_DATE",adVarChar,adParamInput,10,sDate)
		Param(4) = makeparam("@E_DATE",adVarChar,adParamInput,10,eDate)
		Param(5) = makeparam("@page",adInteger,adParamInput,4,page)
		Param(6) = makeparam("@pagesize",adInteger,adParamInput,4,pagesize)
		Param(7) = makeparam("@totalcnt",adInteger,adParamOutput,4,"")

		Dim arrRs, totalCnt, pageCount
		arrRs = arrGetRsSP(DBcon, "asp_관리자_회원가입_현황", Param, "", "")
		totalCnt = getParamOutputValue(Param, "@totalcnt")
		pageCount = int(totalCnt / pagesize) + 1

	DisconnectDB DBCon
%>

<!DOCTYPE html>
<html lang="ko">
<meta http-equiv="Content-Type" content="text/html; charset=euc-kr">
<head>
</head>

<body>
	<table border="1" cellpadding="0" cellspacing="0" summary="">
		<colgroup>
			<col style="width:50px" />
			<col style="width:200px" />
			<col style="width:250px" />
			<col style="width:200px" />
			<col style="width:200px" />
			<col />
		</colgroup>

		<thead>
			<tr height="50">
				<th style="background-color:#dfdfdf;">No</th>
				<th style="background-color:#dfdfdf;">이름(ID)</th>
				<th style="background-color:#dfdfdf;">학과</th>
				<th style="background-color:#dfdfdf;">졸업 및 재학여부</th>
				<th style="background-color:#dfdfdf;">휴대폰번호</th>
				<th style="background-color:#dfdfdf;">가입일</th>
			</tr>
		</thead>

		<tbody>
			<%
				If isArray(arrRs) Then
					For i=0 To UBound(arrRs, 2)
						Dim graduated_state
						If arrRs(10, i) = "1" Then
							graduated_state = "졸업"
						ElseIf arrRs(10, i) = "2" Then
							graduated_state = "졸업예정(4학년)"
						ElseIf arrRs(10, i) = "3" Then
							graduated_state = "재학중"
						ElseIf arrRs(10, i) = "4" Then
							graduated_state = "중퇴"
						ElseIf arrRs(10, i) = "5" Then
							graduated_state = "자퇴"
						ElseIf arrRs(10, i) = "6" Then
							graduated_state = "기타"
						Else
							graduated_state = ""
						End If
			%>
			<tr align="center">
				<td><%=arrRs(1, i)%></td>                                      
				<td><%=arrRs(3, i)%>(<%=Replace(arrRs(2, i), "_wk", "")%>)</td>
				<td><%=arrRs(9, i)%></td>
				<td><%=graduated_state%></td>
				<td><%=arrRs(4, i)%></td>
				<td><%=arrRs(8, i)%></td>
			</tr>
			<%
					Next
				End If
			%>
		</tbody>
	</table>
</body>
</html>
