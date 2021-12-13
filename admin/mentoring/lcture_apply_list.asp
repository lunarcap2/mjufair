<% option Explicit %>

<!--#include virtual = "/common/common.asp"-->
<!--#include virtual = "/include/header/header.asp"-->
<!--#include virtual = "/wwwconf/function/db/DBConnection.asp"-->
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
	Dim lctureDay	: lctureDay		= Request("lctureDay")
	Dim lctureTit	: lctureTit		= Request("lctureTit")
	Dim page		: page			= Request("page")
	Dim pageSize	: pageSize		= 20

	If page = "" Then page=1
	page = CInt(page)

	If lctureDay = "" Then lctureDay = ""
	If lctureTit = "" Then lctureTit = ""

	Dim stropt, i, ii
	stropt = "gubun=" & gubun & "&schKeyword=" & schKeyword & "&lctureDay=" & lctureDay & "&lctureTit=" & lctureTit

	ConnectDB DBCon, Application("DBInfo_FAIR")

		ReDim Param(6)
		Param(0) = makeparam("@KW_GUBUN",adVarChar,adParamInput,100,gubun)
		Param(1) = makeparam("@KW",adVarChar,adParamInput,100,schKeyword)
		Param(2) = makeparam("@S_DATE",adVarChar,adParamInput,10,lctureDay)
		Param(3) = makeparam("@LCTURE_TIT",adVarChar,adParamInput,100,lctureTit)
		Param(4) = makeparam("@PAGE",adInteger,adParamInput,4,page)
		Param(5) = makeparam("@PAGE_SIZE",adInteger,adParamInput,4,pagesize)
		Param(6) = makeparam("@TOTAL_CNT",adInteger,adParamOutput,4,"")

		Dim arrRs, totalCnt, pageCount
		arrRs		= arrGetRsSP(DBcon, "asp_관리자_특강신청자_리스트", Param, "", "")
		totalCnt	= getParamOutputValue(Param, "@TOTAL_CNT")
		pageCount	= Fix(((totalCnt-1)/PageSize) +1) 'int(totalCnt / pagesize) + 1

		Dim strQuery, arrRsCnt
		strQuery = ""
		strQuery = strQuery & "SELECT COUNT(IDX) AS CNT FROM 멘토링_강의_신청정보 WITH(NOLOCK) UNION ALL "
		strQuery = strQuery & "SELECT COUNT(CNT) FROM (SELECT COUNT(IDX) AS CNT FROM 멘토링_강의_신청정보 WITH(NOLOCK) GROUP BY 개인아이디) AS T"
		arrRsCnt = arrGetRsSql(DBcon, strQuery, "", "")

	DisconnectDB DBCon
%>

<script type="text/javascript">
	$(document).ready(function () {
		var gubun = '<%=gubun%>';
		if (gubun != "") {
			$('#gubun').val(gubun);
		}

		var lctureDay = '<%=lctureDay%>';
		if (lctureDay != "") {
			$('#lctureDay').val(lctureDay);
			fn_set_lctureTit(lctureDay);
		}
	});

	// 검색
	function fn_search() {
		var obj = document.frm_list;
		obj.action = "lcture_apply_list.asp";
		obj.submit();
	}

	// 검색 초기화
	function fn_reset() {
		var obj = document.frm_list;
		
		obj.gubun.value			= "";
		obj.schKeyword.value	= "";
		obj.lctureDay.value		= "";
		$("#lctureTit").children("option:not(:first)").remove();
		
		obj.action				= "lcture_apply_list.asp";
		obj.submit();
	}

	//일자선택에 따른 특강셋팅
	function fn_set_lctureTit() {
		$("#lctureTit").children("option:not(:first)").remove();

		$.ajax({
			url: "./ajax_set_lctureTit.asp",
			type: "POST",
			dataType: "html",
			data: ({
				"sel_lctureDay": $("#lctureDay").val()
			}),
			success: function (data) {
				$("#lctureTit").append(data);

				var lctureTit = '<%=lctureTit%>';
				if (lctureTit != "") {
					$("#lctureTit").each(function() {
						$(this).find("option[value='" + lctureTit + "']").prop("selected",true);
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

<div id="contents" class="admin">
	<div class="content">
		<div class="tit">
			<h3>특강 신청자</h3>
		</div>

		<div class="navi">
			<ul>
				<li><a href="#none;">홈</a></li>
				<li><a href="#none;">특강 신청자</a></li>
			</ul>
		</div>

		<!-- 탭메뉴 -->
		<br>
		<div class="s2_tab_tit">
			<!-- 전반기 참여기업 -->			
			<a style="width:16.7%;" href="/admin/board/board_list.asp">공지사항</a>
			<a style="width:16.7%;" href="/admin/mentoring/user_list.asp">참가신청 현황</a>
			<a style="width:16.7%;" href="/admin/mentoring/apply_list.asp">직무상담 신청자</a>
			<a style="width:16.7%;" href="/admin/mentoring/lcture_apply_list.asp" class="on">특강 신청자</a>
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
								<span class="selectbox" style="width:434px;">
									<span class="">선택</span>
									<select id="lctureDay" name="lctureDay" title="특강일자" onchange="fn_set_lctureTit();">
										<option value="">선택</option>
										<% For i=0 To p_schedule_len %>
										<option value="<%=p_scheduleDate(i, 0)%>"><%=p_scheduleDate(i, 1)%></option>
										<% Next %>
									</select>
								</span>
							</td>
						</tr>
						<tr>
							<th>특강선택</th>
							<td class="tb_sch">
								<span class="selectbox" style="width:434px;">
									<span class="">선택</span>
									<select id="lctureTit" name="lctureTit" title="특강명">
										<option value="">선택</option>
									</select>
								</span>
							</td>
						</tr>
					</tbody>
				</table>

				<div class="btn_area right">
					<a href="javascript:" class="btn blue" onclick="fn_search();">검색</a>
					<a href="javascript:" class="btn gray" onclick="fn_reset();">초기화</a>
				</div><!--btn_area -->
			</form>
		</div>

		<div class="list_area">
			<div class="left_box">
				<p class="txt">
					(특강 신청자 : <span><%=arrRsCnt(0, 0)%></span> 명(중복제외), <span><%=arrRsCnt(0, 1)%></span> 명 (중복포함) / <%=Date()%> 현재)
					<button type="button" class="btn down" onclick="location.href='/admin/excel_download/lcture_apply_list.asp?<%=stropt%>'">EXCEL Down</button>
				</p>
			</div>

			<table class="tb">
				<colgroup>
					<col style="width:100px" />
					<col style="width:300px" />
					<col style="width:300px" />
					<col />
					<col />
					<col />
				</colgroup>

				<thead>
					<tr>
						<th rowspan="2">No</th>
						<th rowspan="2">특강</th>
						<th rowspan="2">일시</th>
						<th colspan="3">신청자 정보</th>
					</tr>
					<tr>
						<th>이름 (ID)</th>
						<th>휴대폰 번호</th>
						<th>특강 신청일</th>
					</tr>
				</thead>

				<tbody>
					<%
						If isArray(arrRs) Then
							For i=0 To UBound(arrRs,2)
							Dim lcture_no, lcture_tit, lcture_day, lcture_applyName, lcture_applyId, lcture_applyHp, lcture_applyDay
							lcture_no			= arrRs(1,i)	' No
							lcture_tit			= arrRs(2,i)	' 강의명
							lcture_day			= arrRs(3,i)	' 강의시작일시
							lcture_applyName	= arrRs(4,i)	' 특강신청자_성명
							lcture_applyId		= arrRs(5,i)	' 특강신청자_아이디
							lcture_applyHp		= arrRs(6,i)	' 특강신청자_휴대폰
							lcture_applyDay		= arrRs(7,i)	' 특강신청자_등록일
					%>
					<tr>
						<td><%=lcture_no%></td>
						<td><%=lcture_tit%></td>
						<td><%=lcture_day%></td>
						<td><%=lcture_applyName%>(<%=Replace(lcture_applyId,"_wk","")%>)</td>
						<td><%=lcture_applyHp%></td>
						<td><%=lcture_applyDay%></td>
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
		</div>
	</div>
</div>


<!-- 하단 -->
<!--#include virtual = "/include/footer/footer.asp"-->
<!-- 하단 -->

</body>
</html>
