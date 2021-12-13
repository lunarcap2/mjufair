<% option Explicit %>
<!--#include virtual = "/common/common.asp"-->
<!--#include virtual = "/include/header/header.asp"-->
<!--#include virtual = "/wwwconf/function/db/DBConnection.asp"-->
<!--#include virtual = "/inc/function/paging.asp"-->
<!--#include virtual = "/inc/function/code_function.asp"-->
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
		arrRs		= arrGetRsSP(DBcon, "asp_관리자_상담정보_신청_리스트", Param, "", "")
		totalCnt	= getParamOutputValue(Param, "@TOTAL_CNT")
		pageCount	= Fix(((totalCnt-1)/PageSize) +1) 'int(totalCnt / pagesize) + 1



		ReDim Param(7)
		Param(0) = makeparam("@kw",adVarChar,adParamInput,100,"")
		Param(1) = makeparam("@S_DATE",adVarChar,adParamInput,10,"")
		Param(2) = makeparam("@E_DATE",adVarChar,adParamInput,10,"")
		Param(3) = makeparam("@MENTOR_NO",adInteger,adParamInput,4,"")
		Param(4) = makeparam("@USER_ID",adVarChar,adParamInput,20,"")
		Param(5) = makeparam("@PAGE",adInteger,adParamInput,4,1)
		Param(6) = makeparam("@PAGE_SIZE",adInteger,adParamInput,4,1000)
		Param(7) = makeparam("@TOTAL_CNT",adInteger,adParamOutput,4,"")

		Dim arrRsMentor
		arrRsMentor = arrGetRsSP(DBcon, "asp_관리자_상담정보_현황", Param, "", "")



		Dim strQuery, arrRsCnt
		strQuery = ""
		strQuery = strQuery & "SELECT COUNT(IDX) AS CNT FROM 상담_신청정보 WITH(NOLOCK) UNION ALL "
		strQuery = strQuery & "SELECT COUNT(CNT) FROM (SELECT COUNT(IDX) AS CNT FROM 상담_신청정보 WITH(NOLOCK) GROUP BY 개인아이디) AS T"
		arrRsCnt = arrGetRsSql(DBcon, strQuery, "", "")

	DisconnectDB DBCon
%>
<script type="text/javascript">

	$(document).ready(function () {
		var gubun = '<%=gubun%>';
		if (gubun != "") {
			$('#gubun').val(gubun);
		}

		var mentoring_date = '<%=mentoring_date%>';
		if (mentoring_date != "") {
			$('#mentoring_date').val(mentoring_date);
			fn_set_mentorNo(mentoring_date);
		}
	});
	
	// 검색
	function fn_search() {
		var obj = document.frm_list;
		obj.action = "apply_list.asp";
		obj.submit();
	}

	// 검색 초기화
	function fn_reset() {
		var obj = document.frm_list;
		
		obj.gubun.value				= "";
		obj.schKeyword.value		= "";
		obj.mentoring_date.value	= "";
		$("#mentorNo").children("option:not(:first)").remove();

		obj.action					= "apply_list.asp";
		obj.submit();
	}

	function fn_set_mentorNo() {
		$("#mentorNo").children("option:not(:first)").remove();

		$.ajax({
			url: "./ajax_set_mentorNo.asp",
			type: "POST",
			dataType: "html",
			data: ({
				"sel_mentoring_date": $("#mentoring_date").val()
			}),
			success: function (data) {
				$("#mentorNo").append(data);

				var mentorNo = '<%=mentorNo%>';
				if (mentorNo != "") {
					$("#mentorNo").each(function() {
						$(this).find("option[value='" + mentorNo + "']").prop("selected",true);
						selectboxFnc(); //셀렉박스
					});
				}
			},
			error: function (req, status, err) {
				alert("처리 도중 오류가 발생하였습니다.\n" + err);
			}
		});
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
			<h3>직무상담 신청자</h3>
		</div>
		<div class="navi">
			<ul>
				<li><a href="#none;">홈</a></li>
				<li><a href="#none;">직무상담 신청자</a></li>
			</ul>
		</div>

		<!-- 탭메뉴 -->
		<br>
		<div class="s2_tab_tit">
			<!-- 전반기 참여기업 -->			
			<a style="width:16.7%;" href="/admin/board/board_list.asp">공지사항</a>
			<a style="width:16.7%;" href="/admin/mentoring/user_list.asp">참가신청 현황</a>
			<a style="width:16.7%;" href="/admin/mentoring/apply_list.asp" class="on">직무상담 신청자</a>
			<a style="width:16.7%;" href="/admin/mentoring/lcture_apply_list.asp">특강 신청자</a>
			<a style="width:16.7%;" href="/admin/mentoring/question_list.asp">사전질문</a>
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
									</select>
								</span>
								<input type="text" class="txt" id="schKeyword" name="schKeyword" placeholder="검색어를 입력해 주세요." value="<%=schKeyword%>" style="width:760px;">
							</div>
						</td>
					</tr>
					<tr>
						<th>일자</th>
						<td class="tb_sch">
							<span class="selectbox" style="width:206px;">
								<span class="">선택</span>
								<select id="mentoring_date" name="mentoring_date" title="일자" onchange="fn_set_mentorNo();">
									<option value="">선택</option>
									<% For i=0 To p_schedule_len %>
									<option value="<%=p_scheduleDate(i, 0)%>"><%=p_scheduleDate(i, 1)%></option>
									<% Next %>
								</select>
							</span>
						</td>
					</tr>
					<tr>
						<th>직무명</th>
						<td class="tb_sch">
							<span class="selectbox" style="width:434px;">
								<span class="">선택</span>
								<select id="mentorNo" name="mentorNo" title="기업명">
									<option value="">선택</option>
								</select>
							</span>
						</td>
					</tr>
					<!--
					<tr>
						<th>일자</th>
						<td class="tb_sch">
							<div class="datePick">
								<span>
									<input type="text" class="datepicker" name="sDate" id="searchStartDate1" value="<%=sDate%>" style="width:206px;">
									<button type="button" class="btncalendar dateclick">날짜선택</button>
								</span>
								<span class="hyphen">~</span>
								<span>
									<input type="text" class="datepicker" name="eDate" id="searchEndDate1" value="<%=eDate%>" style="width:206px;">
									<button type="button" class="btncalendar dateclick">날짜선택</button>
								</span>
							</div>
						</td>
					</tr>
					-->
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
					(직무상담 신청자 : <span><%=arrRsCnt(0, 0)%></span> 명(중복제외), <span><%=arrRsCnt(0, 1)%></span> 명 (중복포함) / <%=Date()%> 현재)
					<button type="button" class="btn down" onclick="location.href='/admin/excel_download/apply_list.asp?<%=stropt%>'">EXCEL Down</button>
				</p>
			</div>
			<table class="tb">
				<colgroup>
					<col style="width:100px" />
					<col />
					<col />
					<col />

					<!--
					<col style="width:100px" />
					<col style="width:300px" />
					<col />
					<col style="width:280px" />
					<col style="width:280px" />
					-->
				</colgroup>
				<thead>
					<tr>
						<th rowspan="4">No</th>
						<th rowspan="4">직무</th>
						<th colspan="4">신청자 정보</th>
					</tr>
					<tr>
						<th>이름 (ID)</th>
						<th>휴대폰번호</th>
						<th>상담 일시</th>
						<th>신청일(등록일)</th>
					</tr>
				</thead>
				<tbody>
					<%
					If isArray(arrRs) Then
					For i=0 To UBound(arrRs, 2)
					%>
					<tr>
						<td><%=arrRs(1, i)%></td>
						<td><%=arrRs(8, i)%></td>
						<td><%=arrRs(3, i)%>(<%=Replace(arrRs(2, i), "_wk", "")%>)</td>
						<td><%=arrRs(4, i)%></td>
						<td><%=arrRs(9, i)%><br><%=getInterviewTime(arrRs(12, i))%></td>
						<td><%=arrRs(6, i)%></td>
					</tr>
					<%
					Next
					Else
					%>
					<tr>
						<td colspan="6" class="non_data">
							검색결과가 없습니다.
						</td>
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

</body>
</html>
