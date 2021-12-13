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

	Dim mentor_no : mentor_no = request("mentor_no")
	Dim mode, com_name, dept_name, mentor_name, mentoring_day, mentoring_hour, mentoring_min, file_com_logo
	If mentor_no <> "" Then
	ConnectDB DBCon, Application("DBInfo_FAIR")
		
		mode = "edit"

		Dim strQuery, arrRs
		strQuery = ""
		strQuery = strQuery & " SELECT 등록번호,이름,기업명,부서명,해시태그,회사로고,멘토링_일,멘토링_시,멘토링_분,등록일"
		strQuery = strQuery & " FROM 멘토정보 WITH(NOLOCK) WHERE 등록번호 = " & mentor_no

		arrRs = arrGetRsSql(DBCon, strQuery, "", "")

		If isArray(arrRs) Then
			mentor_name		= arrRs(1, 0)
			com_name		= arrRs(2, 0)
			dept_name		= arrRs(3, 0)
			mentoring_day	= arrRs(6, 0)
			mentoring_hour	= arrRs(7, 0)
			mentoring_min	= arrRs(8, 0)
			file_com_logo	= arrRs(5, 0)
		End If

	DisconnectDB DBCon
	End If
%>
<!--#include virtual = "/include/header/header.asp"-->
<script type="text/javascript">
	
	function fn_submit() {

		if ($('#com_name').val() == '') {
			alert('소속회사를 입력해 주세요.');
			$('#com_name').focus();
			return;
		}
		
		/*
		if ($('#dept_name').val() == '') {
			alert('부서명을 입력해 주세요.');
			$('#dept_name').focus();
			return;
		}

		if ($('#mentor_name').val() == '') {
			alert('멘토 이름을 입력해 주세요.');
			$('#mentor_name').focus();
			return;
		}
		*/

		if ($('#mentoring_day').val() == '' || $('#mentoring_hour').val() == '' || $('#mentoring_min').val() == '') {
			alert('멘토링 일시를 모두 입력해 주세요.');
			return;
		}
		
		if ($("#mode").val() == "" && $('#file_com_logo').val() == '') {
			alert('회사로고 이미지를 첨부해주세요');
			$('#file_com_logo').focus();
			return;
		}

		document.frm.action = "./mentor_reg_proc.asp";
		document.frm.submit();
	}


	//파일 첨부 미리보기
	function fn_load_img(obj) {
		var file_name = $(obj).val();
		$('#upload_name').val(file_name);
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
				<li><a href="#none;">멘토수정</a></li>
				<% Else %>
				<li><a href="#none;">멘토등록</a></li>
				<% End If %>
			</ul>
		</div>
		<div class="list_area view">
			<div class="tit">
				<% If mode = "edit" Then %>
				<h3>멘토수정</h3>
				<% Else %>
				<h3>멘토등록</h3>
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
						<th>멘토 소속회사</th>
						<td colspan="3">
							<input type="text" class="txt" id="com_name" name="com_name" value="<%=com_name%>" placeholder="" style="width:100%;">
						</td>
						<!--
						<th>부서명</th>
						<td>
							<input type="text" class="txt" id="dept_name" name="dept_name" value="<%=dept_name%>" placeholder="" style="width:100%;">
						</td>
						-->
					</tr>
					<!--
					<tr>
						<th>멘토링 테마 / 직무</th>
						<td colspan="3" class="input_add">
							<div class="input_add_box">
								<input type="text" class="txt" name="" placeholder="">
								<button type="button" class="add_btn">추가</button>
							</div>
							<script>
								$('.add_btn').click(function() {
									$('.input_add_box').append('<input type="text" class="txt" name="" placeholder="">');
								});
							</script>
						</td>
					</tr>
					-->
					<!--
					<tr>
						<th>멘토 이름</th>
						<td colspan="3" class="input_add">
							<input type="text" class="txt" id="mentor_name" name="mentor_name" value="<%=mentor_name%>" placeholder="" style="width:210px;">
						</td>
					</tr>
					-->
					<tr>
						<th>멘토링 일시</th>
						<td  colspan="3">
							<div class="time_box">
								<div class="datePick">
									<span>
										<input type="text" class="datepicker" id="mentoring_day" name="mentoring_day" value="<%=mentoring_day%>" style="width:210px;">
										<button type="button" class="btncalendar dateclick">날짜선택</button>
									</span>
								</div>

								<span class="selectbox" style="width:210px;">
									<span class="">선택</span>
									<select id="mentoring_hour" name="mentoring_hour" title="기업명">
										<option value="">선택</option>
										<option value="09" <%If mentoring_hour = "09" Then%>selected="selected"<%End If%>>09시</option>
										<option value="10" <%If mentoring_hour = "10" Then%>selected="selected"<%End If%>>10시</option>
										<option value="11" <%If mentoring_hour = "11" Then%>selected="selected"<%End If%>>11시</option>
										<option value="12" <%If mentoring_hour = "12" Then%>selected="selected"<%End If%>>12시</option>
										<option value="13" <%If mentoring_hour = "13" Then%>selected="selected"<%End If%>>13시</option>
										<option value="14" <%If mentoring_hour = "14" Then%>selected="selected"<%End If%>>14시</option>
										<option value="15" <%If mentoring_hour = "15" Then%>selected="selected"<%End If%>>15시</option>
										<option value="16" <%If mentoring_hour = "16" Then%>selected="selected"<%End If%>>16시</option>
										<option value="17" <%If mentoring_hour = "17" Then%>selected="selected"<%End If%>>17시</option>
										<option value="18" <%If mentoring_hour = "18" Then%>selected="selected"<%End If%>>18시</option>
									</select>
								</span>
								<em>시</em>
								<span class="selectbox" style="width:210px;">
									<span class="">선택</span>
									<select id="mentoring_min" name="mentoring_min" title="기업명">
										<option value="">선택</option>
										<option value="00" <%If mentoring_min = "00" Then%>selected="selected"<%End If%>>00분</option>
										<option value="30" <%If mentoring_min = "30" Then%>selected="selected"<%End If%>>30분</option>
									</select>
								</span>
								<em>분</em>
							</div>
						</td>
					</tr>
					<!--
					<tr>
						<th>Image (본인사진)</th>
						<td colspan="3">
							<div class="file_box">
								<input type="file" id="file_profile" name="file_profile">
								<span>5 MB이하의 jpg파일로 등록해 주세요. (image size 150 X 450)</span>
							</div>
						</td>
					</tr>
					-->
					<tr>
						<th>Image (회사로고)</th>
						<td colspan="3">
							<div class="file_box">
								<input type="hidden" name="str_file_com_logo" value="<%=file_com_logo%>">
								<input type="text" class="upload_name" id="upload_name" placeholder="로고를 등록해 주세요." disabled="disabled" style="width:430px;" value="<%=file_com_logo%>">
								<label for="file_com_logo">업로드</label>
								<span>5 MB이하의 jpg파일로 등록해 주세요. (image size 300 X 100)</span>
								<input type="file" id="file_com_logo" name="file_com_logo" onchange="fn_load_img(this);">
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="btn_area right">
				<a href="mentor_list.asp" class="btn list">목록</button>
				<a href="javascript:" class="btn blue" onclick="fn_submit();">멘토저장</button>
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