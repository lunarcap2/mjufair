<% Option Explicit %>
<!--#include virtual = "/wwwconf/function/db/DBConnection.asp"-->
<!--#include virtual = "/common/common.asp"--> 
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
	
	Dim i, mode
	Dim mentor_no : mentor_no = request("mentor_no")
	Dim title, explain, mentoring_day, mentoring_time, img_logo, link_url, s_date, s_time, e_date, e_time, limit_cnt
	limit_cnt = 4

	If mentor_no <> "" Then
	ConnectDB DBCon, Application("DBInfo_FAIR")
		
		mode = "edit"

		Dim Param(0)
		Param(0) = makeparam("@MENTOR_NO",adInteger,adParamInput,4,mentor_no)

		Dim arrRs
		arrRs = arrGetRsSP(DBcon, "asp_관리자_상담정보_상세뷰", Param, "", "")

		If isArray(arrRs) Then
			title			= arrRs(1, 0)
			explain			= arrRs(2, 0)
			mentoring_day	= arrRs(3, 0)
			mentoring_time	= arrRs(4, 0)
			img_logo		= arrRs(5, 0)
			link_url		= arrRs(6, 0)
			s_date			= arrRs(7, 0)
			s_time			= arrRs(8, 0)
			e_date			= arrRs(9, 0)
			e_time			= arrRs(10, 0)
			limit_cnt		= arrRs(11, 0)
		End If

	DisconnectDB DBCon

	End If
%>
<!--#include virtual = "/include/header/header.asp"-->
<script type="text/javascript">
	$(document).ready(function () {
		// 직무상담 시간선택
		var mentoring_time = "<%=mentoring_time%>";

		var arr	= new Array();
		arr		= mentoring_time.split(",");
		for (i = 0; i < arr.length; i++) {
			 $("input:checkbox[name=mentoring_time][value='"+arr[i]+"']").prop("checked",true);
		}	

	});
	
	function fn_submit() {

		if ($('#title').val() == '') {
			alert('직무를 입력해 주세요.');
			$('#title').focus();
			return;
		}
		
		/*
		if ($('#explain').val() == '') {
			alert('소속을 입력해 주세요.');
			$('#explain').focus();
			return;
		}
		*/

		if ($('#mentoring_day').val() == '') {
			alert('직무상담 일자를 입력해 주세요.');
			$('#mentoring_day').focus();
			return;
		}

		if ($("input:checkbox[name='mentoring_time']").is(":checked") == false) {
			alert("직무상담 시간을 선택해 주세요.");
			$("[name='mentoring_time']").focus();
			return;
		}

		if ($('#link_url').val() == '') {
			alert('Zoom 주소를 입력해 주세요.');
			$('#link_url').focus();
			return;
		}

		if ($('#searchStartDate').val() == '') {
			alert('상담신청 기간을 입력해 주세요.');
			$('#searchStartDate').focus();
			return;
		}

		if ($('#searchEndDate').val() == '') {
			alert('상담신청 기간을 입력해 주세요.');
			$('#searchEndDate').focus();
			return;
		}

		if ($('#limit_cnt').val() == '') {
			alert('신청제한 인원을 선택해 주세요.');
			$('#limit_cnt').focus();
			return;
		}		

		if ($("#mode").val() == "" && $('#img_logo').val() == '') {
			alert('로고 이미지를 첨부해주세요');
			$('#img_logo').focus();
			return;
		}


		/*
		if ($('#mentoring_day').val() == '' || $('#mentoring_hour').val() == '' || $('#mentoring_min').val() == '') {
			alert('멘토링 일시를 모두 입력해 주세요.');
			return;
		}
		
		if ($("#mode").val() == "" && $('#file_com_logo').val() == '') {
			alert('회사로고 이미지를 첨부해주세요');
			$('#file_com_logo').focus();
			return;
		}
		*/

		document.frm.action = "./mentor_reg_proc.asp";
		document.frm.submit();
	}


	//파일 첨부 미리보기
	function fn_load_img(obj) {
		var file_name = $(obj).val();
		$('#upload_name').val(file_name);
	}
	
	// 링크테스트
	function fn_chkUrl() {
		var link_url = $("#link_url").val().replace("http://","").replace("https://","");

		window.open("http://" + link_url);
	}


</script>
</head>

<body id="loginWrap">
<!-- 상단 -->
<!--#include virtual = "/include/gnb/topMenu.asp"-->
<!-- 상단 -->

<!-- 컨텐츠 -->
<form method="post" id="frm" name="frm" enctype="multipart/form-data">
<input type="hidden" id="mentor_no" name="mentor_no" value="<%=mentor_no%>">
<input type="hidden" id="mode" name="mode" value="<%=mode%>">

<div id="contents" class="admin">
	<div class="content">
		<div class="navi">
			<ul>
				<li><a href="#none;">홈</a></li>
				<% If mode = "edit" Then %>
				<li><a href="#none;">직무상담 정보 관리 수정</a></li>
				<% Else %>
				<li><a href="#none;">직무상담 정보 관리 등록</a></li>
				<% End If %>
			</ul>
		</div>
		<div class="list_area view">
			<div class="tit">
				<% If mode = "edit" Then %>
				<h3>직무상담 정보 관리 수정</h3>
				<% Else %>
				<h3>직무상담 정보 관리 등록</h3>
				<% End If %>
			</div>
			<table class="tb">
				<colgroup>
					<col style="width:20%;">
					<col style="width:30%;">
					<col style="width:20%;">
					<col>
				</colgroup>
				<tbody>
					<tr>
						<th>직무</th>
						<td colspan="3">
							<input type="text" class="txt" id="title" name="title" value="<%=title%>" placeholder="직무를 입력해 주세요." style="width:100%;">
						</td>
					</tr>
					<tr>
						<th>소속</th>
						<td colspan="3">
							<input type="text" class="txt" id="explain" name="explain" value="<%=explain%>" placeholder="소속을 입력해 주세요." style="width:100%;">
						</td>
					</tr>
					<tr>
						<th>직무상담 일자</th>
						<td colspan="3">
							<div class="datePick">
								<span>
									<input type="text" class="datepicker only" id="mentoring_day" name="mentoring_day" value="<%=mentoring_day%>" style="width:210px;">
									<button type="button" class="btncalendar dateclick">날짜선택</button>
								</span>
							</div>
						</td>
					</tr>
					<tr>
						<th>직무상담 시간선택</th>
						<td colspan="3" class="input_add">
							<div class="input_add_box">
								<% For i=7 To 14 %>
								<label class="checkbox" for="for<%=i%>">
									<input type="checkbox" class="chk" id="for<%=i%>" name="mentoring_time" value="<%=i%>" onclick="chkWorkStyleCnt(this);" <%If mentor_no="" Then%>checked<%End If%>>
									<span><%=getInterviewTime(i)%></span>
								</label>
								<% Next %>
							</div>
						</td>
					</tr>
					<tr>
						<th>Zoom 주소</th>
						<td colspan="3" class="input_add">
							<input type="text" class="txt" id="link_url" name="link_url" value="<%=link_url%>" placeholder="Zoom주소를 입력해 주세요." style="width:80%;">
							&nbsp;
							<a href="javascript:;" type="_blank" class="btn blue" onclick="fn_chkUrl(); return false;">링크 테스트</a>
						</td>
					</tr>
					<tr>
						<th>상담신청 기간</th>
						<td  colspan="3">
							<div class="time_box">
								
								<div class="datePick">
									<span>
										<input type="text" class="datepicker two" id="searchStartDate" name="s_date" value="<%=s_date%>" style="width:210px;">
										<button type="button" class="btncalendar dateclick">날짜선택</button>
									</span>
									<em>~</em>
									<span>
										<input type="text" class="datepicker two" id="searchEndDate" name="e_date" value="<%=e_date%>" style="width:210px;">
										<button type="button" class="btncalendar dateclick">날짜선택</button>
									</span>
								</div>

								<span class="selectbox" style="width:210px;">
									<span class="">선택</span>
									<select id="e_time" name="e_time" title="시간선택">
										<option value="">선택</option>
										<% For i=0 To 23 %>
										<option value="<%=i%>" <%If e_time = CStr(i) Then%>selected="selected"<%End If%>><%=i%>시</option>
										<% Next %>
									</select>
								</span>
								
							</div>
						</td>
					</tr>
					<tr>
						<th>신청제한인원</th>
						<td  colspan="3">
							<span class="selectbox" style="width:210px;">
								<span class="">선택</span>
								<select id="limit_cnt" name="limit_cnt" title="제한인원선택">
									<option value="">선택</option>
									<% For i=1 To 4 %>
									<option value="<%=i%>" <%If limit_cnt = i Then%>selected="selected"<%End If%>><%=i%>명</option>
									<% Next %>
								</select>
							</span>
						</td>
					</tr>
					<tr>
						<th>로고등록</th>
						<td colspan="3">
							<div class="file_box">
								<input type="hidden" name="str_img_logo" value="<%=img_logo%>">
								<input type="text" class="upload_name" id="upload_name" placeholder="로고를 등록해 주세요." disabled="disabled" style="width:430px;" value="<%=img_logo%>">
								<label for="img_logo">파일찾기</label>
								<span>5 MB이하의 jpg파일로 등록해 주세요. (image size 300 X 100)</span>
								<input type="file" id="img_logo" name="img_logo" onchange="fn_load_img(this);">
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="btn_area right">
				<a href="mentor_list.asp" class="btn list">목록</button>
				<a href="javascript:" class="btn blue" onclick="fn_submit();">정보 저장</button>
				<a href="javascript:history.back();" class="btn gray">취소</button>
			</div>
		</div><!-- list_area view -->
	</div><!-- //content -->
</div><!-- //contents -->
</form>
<!--// 컨텐츠 -->

<!-- 하단 -->
<!--#include virtual = "/include/footer/footer.asp"-->
<!-- 하단 -->
</body>	
</html>