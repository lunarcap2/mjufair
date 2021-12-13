<%Option Explicit%>

<!--#include virtual = "/common/common.asp"-->
<!--#include virtual = "/wwwconf/function/db/DBConnection.asp"-->
<!--#include virtual = "/inc/function/code_function.asp"-->

<%
	Response.CharSet = "euc-kr"
	Response.ContentType = "application/x-msexcel"
	Response.CacheControl  = "public"
	Response.AddHeader  "Content-Disposition", "attachment;filename=명지대_직무상담신청자.xls"	

	Dim gubun		: gubun			= Request("gubun")
	Dim schKeyword	: schKeyword	= Request("schKeyword") ' 검색어(제목/내용)
	Dim sDate		: sDate			= Request("sDate")
	Dim eDate		: eDate			= Request("eDate")
	Dim mentorNo	: mentorNo		= Request("mentorNo")
	Dim page		: page			= Request("page")
	Dim pageSize	: pageSize		= 10000
	Dim mentoring_date : mentoring_date = Request("mentoring_date")

	If page = "" Then page=1
	page = CInt(page)

	If sDate = "" Then sDate = ""
	If eDate = "" Then eDate = ""
	If mentorNo = "" Then mentorNo = ""
	If mentoring_date = "" Then mentoring_date = ""

	Dim stropt, i, ii
	stropt = "gubun="& gubun &"&schKeyword="&schKeyword &"&mentorNo="&mentorNo &"&sDate="&sDate &"&eDate="&eDate &"&mentoring_date="&mentoring_date

	ConnectDB DBCon, Application("DBInfo_FAIR")

		ReDim Param(10)
		Param(0) = makeparam("@KW_GUBUN",adVarChar,adParamInput,100,gubun)
		Param(1) = makeparam("@KW",adVarChar,adParamInput,100,schKeyword)
		Param(2) = makeparam("@MENTORING_NO",adInteger,adParamInput,4,mentorNo)
		Param(3) = makeparam("@S_DATE",adVarChar,adParamInput,10,sDate)
		Param(4) = makeparam("@E_DATE",adVarChar,adParamInput,10,eDate)
		Param(5) = makeparam("@USER_ID",adVarChar,adParamInput,20,"")
		Param(6) = makeparam("@PAGE",adInteger,adParamInput,4,page)
		Param(7) = makeparam("@PAGE_SIZE",adInteger,adParamInput,4,pagesize)
		Param(8) = makeparam("@TOTAL_CNT",adInteger,adParamOutput,4,"")
		Param(9) = makeparam("@MENTORING_DATE",adVarChar,adParamInput,10,mentoring_date)
		Param(10) = makeparam("@MENTORING_TIME",adVarChar,adParamInput,2,"")

		Dim arrRs, totalCnt, pageCount
		arrRs = arrGetRsSP(DBcon, "asp_관리자_상담정보_신청_리스트", Param, "", "")
		totalCnt = getParamOutputValue(Param, "@TOTAL_CNT")
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
			<col style="width:220px" />
			<col style="width:200px" />
			<col style="width:200px" />
			<col />
		</colgroup>

		<thead>
			<tr height="50">
				<th style="background-color:#dfdfdf;">No</th>
				<th style="background-color:#dfdfdf;">직무</th>
				<th style="background-color:#dfdfdf;">신청자 이름(ID)</th>
				<th style="background-color:#dfdfdf;">신청자 휴대폰번호</th>
				<th style="background-color:#dfdfdf;">상담일시</th>
				<th style="background-color:#dfdfdf;">신청일(등록일)</th>
			</tr>
		</thead>

		<tbody>
			<%
				If isArray(arrRs) Then
					For i=0 To UBound(arrRs, 2)
			%>
			<tr align="center">
				<td><%=arrRs(1, i)%></td>
				<td><%=arrRs(8, i)%></td>
				<td><%=arrRs(3, i)%>(<%=Replace(arrRs(2, i), "_wk", "")%>)</td>
				<td><%=arrRs(4, i)%></td>
				<td><%=arrRs(9, i)%>&nbsp;<%=getInterviewTime(arrRs(12, i))%></td>
				<td><%=arrRs(6, i)%></td>
			</tr>
			<% 
					Next
				End If
			%>
		</tbody>
	</table>
</body>
</html>
