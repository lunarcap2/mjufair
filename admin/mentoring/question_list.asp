<% option Explicit %>
<!--#include virtual = "/common/common.asp"-->
<!--#include virtual = "/include/header/header.asp"-->
<!--#include virtual = "/wwwconf/function/db/DBConnection.asp"-->
<!--#include virtual = "/inc/function/code_function.asp"-->
<!--#include virtual = "/inc/function/paging.asp"-->
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

	Dim gubun		: gubun			= Request("gubun")
	Dim schKeyword	: schKeyword	= Request("schKeyword") ' 검색어(제목/내용)
	Dim sDate		: sDate			= Request("sDate")
	Dim eDate		: eDate			= Request("eDate")
	Dim mentorNo	: mentorNo		= Request("mentorNo")
	Dim page		: page			= Request("page")
	Dim pageSize	: pageSize		= 20

	If page = "" Then page=1
	page = CInt(page)

	If sDate = "" Then sDate = ""
	If eDate = "" Then eDate = ""
	If mentorNo = "" Then mentorNo = ""

	Dim stropt, i, ii
	stropt = "gubun="& gubun &"&schKeyword="&schKeyword &"&mentorNo="&mentorNo &"&sDate="&sDate &"&eDate="&eDate

	ConnectDB DBCon, Application("DBInfo_FAIR")

		ReDim Param(8)
		Param(0) = makeparam("@KW_GUBUN",adVarChar,adParamInput,100,gubun)
		Param(1) = makeparam("@KW",adVarChar,adParamInput,100,schKeyword)
		Param(2) = makeparam("@MENTORING_NO",adInteger,adParamInput,4,mentorNo)
		Param(3) = makeparam("@S_DATE",adVarChar,adParamInput,10,sDate)
		Param(4) = makeparam("@E_DATE",adVarChar,adParamInput,10,eDate)
		Param(5) = makeparam("@USER_ID",adVarChar,adParamInput,20,"")
		Param(6) = makeparam("@PAGE",adInteger,adParamInput,4,page)
		Param(7) = makeparam("@PAGE_SIZE",adInteger,adParamInput,4,pagesize)
		Param(8) = makeparam("@TOTAL_CNT",adInteger,adParamOutput,4,"")

		Dim arrRs, totalCnt, pageCount
		arrRs		= arrGetRsSP(DBcon, "asp_관리자_상담정보_사전질문_리스트", Param, "", "")
		totalCnt	= getParamOutputValue(Param, "@TOTAL_CNT")
		pageCount	= Fix(((totalCnt-1)/PageSize) +1) 'int(totalCnt / pagesize) + 1


		' 상담 직무분야 추출 - 검색박스 출력용
		ReDim Param(8)
		Param(0) = makeparam("@KW",adVarChar,adParamInput,100,"")
		Param(1) = makeparam("@S_DATE",adVarChar,adParamInput,10,"")
		Param(2) = makeparam("@E_DATE",adVarChar,adParamInput,10,"")
		Param(3) = makeparam("@MENTOR_NO",adInteger,adParamInput,4,"")
		Param(4) = makeparam("@USER_ID",adVarChar,adParamInput,20,"")
		Param(5) = makeparam("@PAGE",adInteger,adParamInput,4,1)
		Param(6) = makeparam("@PAGE_SIZE",adInteger,adParamInput,4,1000)
		Param(7) = makeparam("@TOTAL_CNT",adInteger,adParamOutput,4,"")
		Param(8) = makeparam("@MENTORING_DAY",adVarChar,adParamInput,10,"")

		Dim arrRsCounsel
		arrRsCounsel = arrGetRsSP(DBcon, "asp_관리자_상담정보_현황", Param, "", "")



		Dim strQuery, arrRsCnt
		strQuery = ""
		strQuery = strQuery & "SELECT COUNT(IDX) AS CNT FROM 상담_사전질문 WITH(NOLOCK) UNION ALL "
		strQuery = strQuery & "SELECT COUNT(CNT) FROM (SELECT COUNT(IDX) AS CNT FROM 상담_사전질문 WITH(NOLOCK) GROUP BY 개인아이디) AS T"
		arrRsCnt = arrGetRsSql(DBcon, strQuery, "", "")

	DisconnectDB DBCon
%>
<script type="text/javascript">

	$(document).ready(function () {
		var gubun = '<%=gubun%>';
		if (gubun != "") {
			$('#gubun').val(gubun);
		}

		var mentorNo = '<%=mentorNo%>';
		if (mentorNo != "") {
			$('#mentorNo').val(mentorNo);
		}
	});
	
	// 검색
	function fn_search() {
		var obj = document.frm_list;
		obj.action = "question_list.asp";
		obj.submit();
	}

	// 검색 초기화
	function fn_reset() {
		var obj = document.frm_list;
		obj.gubun.value			= "";
		obj.schKeyword.value	= "";
		obj.mentorNo.value		= "";		
		obj.sDate.value	= "";
		obj.eDate.value	= "";
		obj.action	= "question_list.asp";
		obj.submit();
	}
	
	// 질문보기 
	function fn_quest_view(obj) {
		var mento_info, mento_day, quest_cont
		mento_info	= $(obj).parents("tr").find("#mento_biz").text();
		mento_day	= $(obj).parents("tr").find("#mento_day").text();
		quest_cont	= $(obj).parents("tr").find("#quest_cont").val();
		
		$("#pop_mentor_info").text(mento_info);
		$("#pop_mentor_day").text(mento_day);
		$("#pop_quest_cont").text(quest_cont);
	}

</script>
</head>

<body>

<!-- 상단 -->
<!--#include virtual = "/include/gnb/topMenu.asp"-->

<!-- 컨텐츠 -->
<div id="contents" class="admin">
	<div class="content">
		<div class="tit">
			<h3>사전질문</h3>
		</div>
		<div class="navi">
			<ul>
				<li><a href="javascript:">홈</a></li>
				<li><a href="javascript:">사전질문</a></li>
			</ul>
		</div>

		<!-- 탭메뉴 -->
		<br>
		<div class="s2_tab_tit">
			<!-- 전반기 참여기업 -->			
			<a style="width:16.7%;" href="/admin/board/board_list.asp">공지사항</a>
			<a style="width:16.7%;" href="/admin/mentoring/user_list.asp">참가신청 현황</a>
			<a style="width:16.7%;" href="/admin/mentoring/apply_list.asp">직무상담 신청자</a>
			<a style="width:16.7%;" href="/admin/mentoring/lcture_apply_list.asp">특강 신청자</a>
			<a style="width:16.7%;" href="/admin/mentoring/question_list.asp" class="on">사전질문</a>
			<a style="width:16.7%;" href="/admin/mentoring/send_sms_list.asp">직무상담 문자발송</a>
			<a style="width:16.7%;" href="/admin/mentoring/lcture_send_sms_list.asp">특강 문자발송</a>
			<a style="width:16.7%;" href="/admin/mentoring/mentor_list.asp">직무상담 정보관리</a>
			<a style="width:16.7%;" href="/admin/mentoring/lcture_list.asp">특강 배너 관리</a>
		</div>
		<br>
		<!-- //탭메뉴 -->

		<div class="sch_area">
			<form method="post" id="frm_list" name="frm_list">
			<table class="tb">
				<colgroup>
					<col style="width:200px">
					<col>
				</colgroup>
				<tbody>
					<tr>
						<th>회원</th>
						<td>
							<div class="sel_input">
								<span class="selectbox" style="width:206px;">
									<span class="">선택</span>
									<select id="gubun" name="gubun" title="회원">
										<option value="">선택</option>
										<option value="1">이름</option>
										<option value="2">휴대폰</option>
										<!-- <option value="3">E-mail</option> -->
									</select>
								</span>
								<input type="text" class="txt" id="schKeyword" name="schKeyword" placeholder="검색어를 입력해 주세요." value="<%=schKeyword%>" style="width:760px;">
							</div>
						</td>
					</tr>
					<tr>
						<th>직무분야</th>
						<td class="tb_sch">
							<span class="selectbox" style="width:434px;">
								<span class="">선택</span>
								<select id="mentorNo" name="mentorNo" title="직무분야">
									<option value="">선택</option>
									<%
									If isArray(arrRsCounsel) Then
										For i=0 To UBound(arrRsCounsel, 2)
									%>
									<option value="<%=arrRsCounsel(2, i)%>"><%=arrRsCounsel(3, i)%></option>
									<%
										Next
									End If
									%>
								</select>
							</span>
						</td>
					</tr>
					<tr>
						<th>기간</th>
						<td class="tb_sch">
							<div class="datePick">
								<span>
									<input type="text" class="datepicker two" name="sDate" id="searchStartDate1" value="<%=sDate%>" style="width:206px;">
									<button type="button" class="btncalendar dateclick">날짜선택</button>
								</span>
								<span class="hyphen">~</span>
								<span>
									<input type="text" class="datepicker two" name="eDate" id="searchEndDate1" value="<%=eDate%>" style="width:206px;">
									<button type="button" class="btncalendar dateclick">날짜선택</button>
								</span>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="btn_area right">
				<a href="javascript:" class="btn blue" onclick="fn_search()">검색</a>
				<a href="javascript:" class="btn gray" onclick="fn_reset()">초기화</a>
			</div><!--btn_area -->
			</form>
		</div>

		<div class="list_area">
			<div class="left_box">
				<p class="txt">
					(사전질문 신청자 : <span><%=FormatNumber(arrRsCnt(0, 1),0)%></span>명, 사전질문 등록건수 : <span><%=FormatNumber(arrRsCnt(0, 0),0)%></span>건 / <%=Date()%> 현재)
					<button type="button" class="btn down" onclick="location.href='/admin/excel_download/question_list.asp?<%=stropt%>'">EXCEL Down</button>
				</p>
			</div>

			<table class="tb">
				<colgroup>
					<col style="width:100px" />
					<col style="width:180px" />
					<col style="width:200px" />
					<col />
					<col style="width:200px" />
					<col style="width:100px" />
				</colgroup>
				<thead>
					<tr>
						<th>No</th>
						<th>이름(ID)</th>
						<th>질문등록일</th>
						<th>직무분야</th>
						<th>직무설명회 일시</th>
						<th>질문보기</th>
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
						<td><%=arrRs(14, i)%></td>
						<td id="mento_biz"><%=arrRs(7, i)%></td>
						<td id="mento_day"><%=arrRs(9, i)%>&nbsp;<%=getInterviewTime(arrRs(10, i))%></td>
						<td>
							<input type="hidden" id="quest_cont" value="<%=arrRs(13, i)%>">
							<a href="#pop1" class="pop" onclick="fn_quest_view(this);">[질문보기]</a>
						</td>
					</tr>
					<%
						Next
					Else
					%>
					<tr>
						<td colspan="6" class="non_data">검색결과가 없습니다.</td>
					</tr>
					<%
					End If 
					%>
				</tbody>
			</table>

			<% Call putPage(page, stropt, pageCount) %>

		</div><!-- list_area -->
	</div><!-- //content -->
</div><!-- //contents -->
<!--// 컨텐츠 -->

<!-- 하단 -->
<!--#include virtual = "/include/footer/footer.asp"-->
<!-- 하단 -->



<div class="pop_up" id="pop1">
	<div class="pop">
		<div class="pop_wrap">
			<div class="pop_head">
				<h3>사전등록 질문보기</h3>
			</div>
			<div class="pop_body">

				<div class="tb_area">
					<table class="tb tc">
						<colgroup>
							<col style="width:20%">
							<col style="width:30%">
							<col style="width:20%">
							<col>
						</colgroup>
						<tbody>
							<tr>
								<th>멘토기업</th>
								<td><span id="pop_mentor_info"></span></td>
								<th>멘토링 일시</th>
								<td><span id="pop_mentor_day"></span></td>
							</tr>
							<tr>
								<td colspan="4" class="input_txt">
									<textarea id="pop_quest_cont"></textarea>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="pop_footer">
				<div class="btn_area">
					<button type="button" class="btn blue close" onclick="">확인</button>
				</div>
			</div>

			<a href="#none" class="pop_close">닫기</a>
		</div><!--.popWrap-->
	</div><!--.pop-->
	<span class="dim close"></span>
</div>


</body>
</html>
