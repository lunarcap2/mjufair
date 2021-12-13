<% Option Explicit %>
<!--#include virtual="/wwwconf/function/db/DBConnection.asp"-->
<!--#include virtual="/common/common.asp"--> 
<!--#include virtual="/inc/function/paging.asp"-->
<%
	' 관리자 계정일 경우에만 접근 허용   
	If Request.Cookies(site_code & "WKADMIN")("admin_id")="" Then 
		Response.Write "<script language=javascript>"&_
			"alert('해당 메뉴에 대한 접근 권한이 없습니다.');"&_
			"location.href='/';"&_
			"</script>"
		response.End 
	End If

	If Request.ServerVariables("HTTPS") = "off" Then 
		Response.redirect "https://"& Request.ServerVariables("HTTP_HOST") & Request.ServerVariables("URL") 
	End If


	Dim schKeyword	: schKeyword	= Request("schKeyword") ' 검색어(제목/내용)  
	Dim page		: page			= Request("page")
	Dim pageSize	: pageSize		= 20

	If page = "" Then page=1
	page = CInt(page)

	Dim stropt, i, ii
	stropt = "schKeyword="&schKeyword

	ConnectDB DBCon, Application("DBInfo_FAIR")

		Dim Param(3)
		Param(0) = makeparam("@kw",adVarChar,adParamInput,100,schKeyword)
		Param(1) = makeparam("@PAGE",adInteger,adParamInput,4,page)
		Param(2) = makeparam("@PAGE_SIZE",adInteger,adParamInput,4,pagesize)
		Param(3) = makeparam("@TOTAL_CNT",adInteger,adParamOutput,4,"")

		Dim arrRs, totalCnt, pageCount
		arrRs		= arrGetRsSP(DBcon, "asp_관리자_특강배너관리_리스트", Param, "", "")
		totalCnt	= getParamOutputValue(Param, "@TOTAL_CNT")
		pageCount	= Fix(((totalCnt-1)/PageSize) +1) 'int(totalCnt / pagesize) + 1

	DisconnectDB DBCon

%>
<!--#include virtual = "/include/header/header.asp"-->
<script type="text/javascript">
	
	// 검색
	function fn_search() {
		var obj = document.frm_list;
		if ($("#schKeyword").val() == "") {
			alert("검색어를 입력해 주세요.");
			$("#schKeyword").focus();
			return false;
		}
		obj.action = "lcture_list.asp";
		obj.submit();
	}

	// 검색 초기화
	function fn_reset() {
		var obj = document.frm_list;
		obj.schKeyword.value	= "";
		obj.action				= "lcture_list.asp";
		obj.submit();
	}

</script>
</head>

<body id="loginWrap">
<!-- 상단 -->
<!--#include virtual = "/include/gnb/topMenu.asp"-->
<!-- 상단 -->

<!-- 본문 -->
<div id="contents" class="admin">
	<div class="content">
		<div class="navi">
			<ul>
				<li><a href="#none;">홈</a></li>
				<li><a href="#none;">특강 배너 관리</a></li>
			</ul>
		</div>

		<div class="list_area">
			<div class="tit">
				<h3>특강 배너 관리</h3>
			</div>

			<!-- 탭메뉴 -->
			<br>
			<div class="s2_tab_tit">
				<!-- 전반기 참여기업 -->			
				<a style="width:16.7%;" href="/admin/board/board_list.asp">공지사항</a>
				<a style="width:16.7%;" href="/admin/mentoring/user_list.asp">참가신청 현황</a>
				<a style="width:16.7%;" href="/admin/mentoring/apply_list.asp">직무상담 신청자</a>
				<a style="width:16.7%;" href="/admin/mentoring/lcture_apply_list.asp">특강 신청자</a>
				<a style="width:16.7%;" href="/admin/mentoring/question_list.asp">사전질문</a>
				<a style="width:16.7%;" href="/admin/mentoring/send_sms_list.asp">직무상담 문자발송</a>
				<a style="width:16.7%;" href="/admin/mentoring/lcture_send_sms_list.asp">특강 문자발송</a>
				<a style="width:16.7%;" href="/admin/mentoring/mentor_list.asp">직무상담 정보관리</a>
				<a style="width:16.7%;" href="/admin/mentoring/lcture_list.asp" class="on">특강 배너 관리</a>
			</div>
			<br>
			<!-- //탭메뉴 -->
			
			<!--
			<div class="right_box">
				<form method="post" id="frm_list" name="frm_list">
				<div class="sch_box">
					<input type="text" class="txt" id="schKeyword" name="schKeyword" placeholder="검색어를 입력해 주세요." value="<%=schKeyword%>">
					<button type="button" class="btn" onclick="fn_search();">검색</button>
					<button type="button" class="reset" onclick="fn_reset();">초기화</button>
				</div>
				</form>
			</div>
			-->

			<table class="tb">
				<colgroup>
					<col style="width:150px">
					<col>
					<col style="width:260px">
					<col style="width:300px">
				</colgroup>
				<thead>
					<tr>
						<th>No</th>
						<th>특강</th>
						<th>특강일시</th>
						<th>신청자 수</th>
					</tr>
				</thead>
				<tbody>
					<%
						If isArray(arrRs) Then
							For i=0 To UBound(arrRs, 2)
							Dim lcture_rownum, lcture_no, lcture_tit, lcture_day, lcture_applyCnt
							lcture_rownum	= arrRs(1,i)	' No
							lcture_no		= arrRs(2,i)	' 강의번호
							lcture_tit		= arrRs(3,i)	' 특강명
							lcture_day		= arrRs(4,i)	' 특강일시
							lcture_applyCnt	= arrRs(5,i)	' 신청자수
					%>
					<tr>
						<td><%=lcture_rownum%></td>
						<td><a href="./lcture_reg.asp?lcture_no=<%=lcture_no%>"><%=lcture_tit%></a></td>
						<td><%=lcture_day%></td>
						<td>신청자 : <%=lcture_applyCnt%></td>
					</tr>
					<%
							Next
						Else
					%>
					<tr>
						<td colspan="4" class="non_data">
							등록된 특강이 없습니다.
						</td>
					</tr>
					<% End If %>
				</tbody>
			</table>
			<div class="btn_area right">
				<a href="./lcture_reg.asp" class="btn blue">특강 배너 등록</a>
			</div><!--btn_area -->

			<% Call putPage(page, stropt, pageCount) %>
			
		</div><!-- list_area -->
	</div><!-- //content -->
</div>
<!-- //본문 -->

<!-- 하단 -->
<!--#include virtual = "/include/footer/footer.asp"-->
<!-- 하단 -->
</body>	
</html>