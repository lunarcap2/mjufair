<!--#include virtual = "/common/common.asp"-->
<!--#include virtual = "/include/header/header.asp"-->
<!--#include virtual = "/wwwconf/function/db/DBConnection.asp"-->
<!--#include virtual = "/inc/function/code_function.asp"-->
<!--#include virtual = "/inc/function/paging_ajax.asp"-->

<%
ConnectDB DBCon, Application("DBInfo_FAIR")
	
	Dim montoring_date, montoring_no, montoring_time
	montoring_date	= request("montoring_date")
	montoring_no	= request("montoring_no")
	montoring_time = request("montoring_time")


	ReDim Param(2)
	Param(0) = makeparam("@consultDay",adVarChar,adParamInput,10,montoring_date)
	Param(1) = makeparam("@consultTime",adVarChar,adParamInput,2,montoring_time)
	Param(2) = makeparam("@consultNo",adInteger,adParamInput,4,montoring_no)

	Dim arrRsMentor
	arrRsMentor = arrGetRsSP(DBcon, "asp_관리자_문자발송_리스트", Param, "", "")

	Dim consult_time, consult_tit, consult_logo, consult_day
	consult_time		= arrRsMentor(3, 0)
	consult_tit			= arrRsMentor(4, 0)
	consult_logo		= arrRsMentor(6, 0)
	consult_day			= arrRsMentor(2, 0)

	Dim page, pageSize
	page = request("page")
	pageSize = 50

	If page = "" Then page = 1
	page = CInt(page)


	ReDim Param(10)
	Param(0) = makeparam("@KW_GUBUN",adVarChar,adParamInput,100,"")
	Param(1) = makeparam("@KW",adVarChar,adParamInput,100,"")
	Param(2) = makeparam("@MENTORING_NO",adInteger,adParamInput,4,montoring_no)
	Param(3) = makeparam("@S_DATE",adVarChar,adParamInput,10,"")
	Param(4) = makeparam("@E_DATE",adVarChar,adParamInput,10,"")
	Param(5) = makeparam("@USER_ID",adVarChar,adParamInput,20,"")
	Param(6) = makeparam("@PAGE",adInteger,adParamInput,4,page)
	Param(7) = makeparam("@PAGE_SIZE",adInteger,adParamInput,4,pageSize)
	Param(8) = makeparam("@TOTAL_CNT",adInteger,adParamOutput,4,"")


	Param(9) = makeparam("@MENTORING_DATE",adVarChar,adParamInput,10,montoring_date)
	Param(10) = makeparam("@MENTORING_TIME",adVarChar,adParamInput,2,montoring_time)


	Dim arrRs, totalCnt, pageCount
	arrRs = arrGetRsSP(DBcon, "asp_관리자_상담정보_신청_리스트", Param, "", "")
	totalCnt = getParamOutputValue(Param, "@TOTAL_CNT")
	pageCount = Fix(((totalCnt-1)/pagesize) +1)

DisconnectDB DBCon
%>

<div class="info_box">
	<dl class="ib_dl">
		<dt>
			<span><%=consult_tit%></span>
		</dt>
		<dd>
			<span class="ib_time">직무상담 일시<br><%=consult_day%> / <%=getInterviewTime(consult_time)%></span>
		</dd>
		<dd class="logo">
			<div class="logo_box">
				<img src="/files/mentor/<%=consult_logo%>" alt="회사로고">
			</div>
		</dd>
	</dl>
</div>
<div class="tb_area scroll">
	<div class="th_bg"></div>
	<div class="tb_wrap">
		<table class="tb" summary="명단보기">
			<caption>명단보기</caption>
			<colgroup>
					<col style="width:10%;">
					<col style="width:22%;">
					<col style="width:24%;">
					<col style="width:17%;">
				</colgroup>
				<thead>
					<tr>
						<th class="cell1"><span>No</span></th>
						<th class="cell2"><span>이름 (ID)</span></th>
						<th class="cell4"><span>휴대폰번호</span></th>
						<th class="cell5"><span>신청일</span></th>
					</tr>
				</thead>
			<tbody>
				<%
					If isArray(arrRs) Then
						For i=0 To UBound(arrRs, 2)
				%>
				<tr>
					<td><%=arrRs(1, i)%></td>
					<td><%=arrRs(3, i)%>(<%=Replace(arrRs(2, i), "_wk", "")%>)</td>
					<td><%=arrRs(4, i)%></td>
					<td><%=Left(arrRs(6, i), 10)%></td>
				</tr>
				<%
						Next
					End If 
				%>
			</tbody>
		</table>
	</div>

	<% Call putPage(page, stropt, pageCount, "fn_pop_sms_pageingView") %>
</div>