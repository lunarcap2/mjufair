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
	
	Dim i
	Dim mentor_day	: mentor_day		= Request("mentor_day")

	If mentor_day = "" Then mentor_day = "2020-11-16"
	

	ConnectDB DBCon, Application("DBInfo_FAIR")

		ReDim Param(1)
		Param(0) = makeparam("@consultDay",adVarChar,adParamInput,10,mentor_day)
		Param(1) = makeparam("@consultNo",adInteger,adParamInput,4,"")

		Dim arrRsMentor
		arrRsMentor = arrGetRsSP(DBcon, "asp_관리자_특강문자발송_리스트", Param, "", "")

	DisconnectDB DBCon
%>
<script type="text/javascript">
	
	//날짜클릭 (검색)
	function fn_sch_mentor_day(_val) {
		var obj = document.frm_list;

		obj.mentor_day.value	= _val;
		obj.action = "lcture_send_sms_list.asp";
		obj.submit();
	}

	//명단 보기
	function fn_pop_sms_view(_consult_day, _consult_no) {
		$("#lcture_set_day").val(_consult_day);
		$("#lcture_set_no").val(_consult_no);

		$.ajax({
			url: "./lcture_send_sms_view_pop.asp",
			type: "POST",
			dataType: "html",
			data: ({
				"montoring_date": _consult_day,
				"montoring_no": _consult_no
			}),
			success: function (data) {
				$('#pop_sms_view').html(data);
			},
			error: function (req, status, err) {
				alert("처리 도중 오류가 발생하였습니다.\n" + err);
			}
		});
	}
	
	//명단보기 페이징
	function fn_pop_sms_pageingView(_page) {	
		$.ajax({
			url: "./lcture_send_sms_view_pop.asp",
			type: "POST",
			dataType: "html",
			data: ({
				"page": _page,
				"montoring_date": $("#lcture_set_day").val(),
				"montoring_no": $("#lcture_set_no").val()
			}),
			success: function (data) {
				$('#pop_sms_view').html(data);
			},
			error: function (req, status, err) {
				alert("처리 도중 오류가 발생하였습니다.\n" + err);
			}
		});
	}

	function fn_sms_apply(obj, _val, _montoring_date) {

		$('#mentor_no').val(_val);
		$('#user_hp').val("");
		$("#montoring_date").val(_montoring_date);
		$("#montoring_time").val("");
		
		var mentor_day = "<%=mentor_day%>";
		var mentor_time = $(obj).parents('tr').find('td').eq(0).text();
		
		var mentor_com = $(obj).parents('tr').find('td').eq(1).text();
		var mentor_name = $(obj).parents('tr').find('td').eq(3).text();
		var apply_cnt = $(obj).parents('tr').find('td').eq(4).text();
		var mentor_info = mentor_com;
		var mentor_day_data = mentor_day.split('-')[1] + "월 " + mentor_day.split('-')[2] + "일"

		var send_list = "";
		send_list = mentor_info + " " + mentor_day + " / " + mentor_time + " 신청자 " + apply_cnt;
		$('#sms_send_list').text(send_list);

		var str_sms = "";
		str_sms += "안녕하세요. \n";
		str_sms += "<%=site_short_name%> 운영사무국 입니다.\n";
		str_sms += "신청하신 특강 일시와\n";
		str_sms += "화상미팅 주소를 보내드립니다.\n";
		str_sms += "\n";
		str_sms += "특강 일시 : " + mentor_day_data + " / " + mentor_time + "\n";
		str_sms += "특강명 : " + mentor_info + "\n";
		str_sms += "화상미팅 주소 : \n";
		str_sms += "\n";
		str_sms += "늦지 않게 입장해 주세요.";
		
		$('#sms_cont').val("");
		$('#sms_cont').val(str_sms);
	}
	
	//문자 전송
	function fn_sms_send() {

		if ($('#mentor_no').val() == "" && $('#user_hp').val() == "") {
			alert("문자발송 대상자를 선택(메세지 적용)해주세요.");
			return
		}

		if(confirm("문자를 발송 하시겠습니까?")) {
			$('#frm_sms').attr('action', 'proc_lcture_send_sms.asp');
			$('#frm_sms').submit();
		}

	}

	function fn_sch_consultTit() {
		var obj = document.frm_list;

		obj.mentor_titNo.value	= $("#mentor_tit").val();
		obj.action = "send_sms_list.asp";
		obj.submit();
	}

</script>
</head>

<body>

<!-- 상단 -->
<!--#include virtual = "/include/gnb/topMenu.asp"-->

<form method="post" id="frm_list" name="frm_list">
	<input type="hidden" id="mentor_day" name="mentor_day" value="<%=mentor_day%>">
</form>

<!-- 컨텐츠 -->
<div id="contents" class="admin">
	<div class="content">
		<div class="navi">
			<ul>
				<li><a href="#none;">홈</a></li>
				<li><a href="#none;">특강 문자발송</a></li>
			</ul>
		</div>
		<div class="send_area">
			<div class="tit">
				<h3>특강 문자발송</h3>
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
			<a style="width:16.7%;" href="/admin/mentoring/lcture_send_sms_list.asp" class="on">특강 문자발송</a>
			<a style="width:16.7%;" href="/admin/mentoring/mentor_list.asp">직무상담 정보관리</a>
			<a style="width:16.7%;" href="/admin/mentoring/lcture_list.asp">특강 배너 관리</a>
		</div>
		<br>
		<!-- //탭메뉴 -->

			<div class="left_box">
				<h4>문자발송 단체 보내기</h4>
				<ul class="lb_date">
					<% For i=0 To p_schedule_len %>
					<li><button type="button" <%If mentor_day = p_scheduleDate(i, 0) Then%>class="on"<%End If%> onclick="fn_sch_mentor_day('<%=p_scheduleDate(i, 0)%>')"><%=p_scheduleDate(i, 1)%></button></li>
					<% Next %>
				</ul>
				<script>
					$(".lb_date li button").click(function() {
						$(".lb_date button").removeClass("on");
						$(this).addClass("on"); 
						return false;
					});
				</script>

				<table class="tb tc">
					<colgroup>
						<col />
						<col />
						<col />
						<col />
						<col />
					</colgroup>
					<thead>
						<tr>
							<th>시간</th>
							<th>직무</th>
							<th>신청자수</th>
							<th>명단</th>
							<th>메세지</th>
						</tr>
					</thead>
					<tbody>
						<%
							If isArray(arrRsMentor) Then 
								For i=0 To UBound(arrRsMentor, 2)
								Dim lcture_no, lcture_tit, lcture_day, lcture_stime, lcture_etime, lcture_applyCnt
								lcture_no		= arrRsMentor(0,i)	' 강의번호
								lcture_tit		= arrRsMentor(1,i)	' 강의명
								lcture_day		= arrRsMentor(2,i)	' 강의시작일
								lcture_stime	= arrRsMentor(3,i)	' 강의시작시간
								lcture_etime	= arrRsMentor(4,i)	' 강의종료시간
								lcture_applyCnt	= arrRsMentor(5,i)	' 신청자수
								
						%>
						<tr>
							<td><%=lcture_stime%>~<%=lcture_etime%></td>
							<td><%=lcture_tit%></td>
							<td><%=lcture_applyCnt%>명</td>
							<% If lcture_applyCnt > 0 Then %>
							<td>
								<a href="#pop1" class="btn gray pop" onclick="fn_pop_sms_view('<%=lcture_day%>', '<%=lcture_no%>');">보기</a>
								<input type="hidden" id="lcture_set_day" name="lcture_set_day" value=""/>
								<input type="hidden" id="lcture_set_no" name="lcture_set_no" value=""/>
							</td>
							<td><a href="javascript:" class="btn blue" onclick="fn_sms_apply(this, '<%=lcture_no%>', '<%=lcture_day%>')">적용</a></td>
							<% Else %>
							<td></td>
							<td></td>
							<% End If %>
						</tr>
						<%
								Next
							Else
						%>
						<tr>
							<td colspan="5">해당일에 등록된 특강이 없습니다.</td>
						</tr>
						<% End If %>
					</tbody>
				</table>
			</div>
			<div class="right_box">
			<form method="post" id="frm_sms" name="frm_sms">
				<input type="hidden" id="mentor_no" name="mentor_no" value="">
				<input type="hidden" id="user_hp" name="user_hp" value="">
				<input type="hidden" id="montoring_date" name="montoring_date" value="">
				<input type="hidden" id="montoring_time" name="montoring_time" value="">

				<textarea id="sms_cont" name="sms_cont"></textarea>
				<span>발송대상 : </span><span id="sms_send_list"></span>
				<br>
				<button type="button" onclick="fn_sms_send()">보내기</button>
			</form>
			</div>
		</div>
		
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
				<h3>명단보기</h3>
			</div>
			<div class="pop_body" id="pop_sms_view">
				
			</div>

			<div class="pop_footer">
				<div class="btn_area">
					<button type="button" class="btn blue" onclick="$(this).parents('.pop_up').hide().find('.dim').hide();">확인</button>
				</div>
			</div>

			<a href="#none" class="pop_close">닫기</a>
		</div><!--.popWrap-->
	</div><!--.pop-->
	<span class="dim close"></span>
</div>

</body>
</html>
