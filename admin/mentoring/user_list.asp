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
	Dim sDate		: sDate			= Request("sDate")
	Dim eDate		: eDate			= Request("eDate")
	Dim page		: page			= Request("page")
	Dim pageSize	: pageSize		= 20

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
		totalCnt	= getParamOutputValue(Param, "@totalcnt")
		pageCount	= Fix(((totalCnt-1)/PageSize) +1) 'int(totalCnt / pagesize) + 1

	DisconnectDB DBCon
%>
<script type="text/javascript">

	$(document).ready(function () {
		var gubun = '<%=gubun%>';
		if (gubun != "") {
			$('#gubun').val(gubun);
		}
	});
	
	// 검색
	function fn_search() {
		var obj = document.frm_list;
		obj.action = "user_list.asp";
		obj.submit();
	}

	// 검색 초기화
	function fn_reset() {
		var obj = document.frm_list;
		obj.gubun.value	= "";
		obj.schKeyword.value	= "";
		obj.sDate.value	= "";
		obj.eDate.value	= "";
		obj.action				= "user_list.asp";
		obj.submit();
	}

	function fn_pop_user_info(obj, _val) {
		var user_id = _val;
		var user_name = $(obj).parents("tr").find("td").eq(1).text();
		var user_hp = $(obj).parents("tr").find("td").eq(3).text();
		var user_email = $(obj).parents("tr").find("td").eq(2).text();

		$("#pop_user_id").val(user_id);
		$("#pop_user_name").text(user_name);
		$("#pop_user_hp").val(user_hp);
		$("#pop_user_email").val(user_email);
	}

	function fn_user_edit() {
		if (confirm("회원정보를 수정하시겠습니까?")) {
			$("#frm_user_info").attr("action", "./proc_user_edit.asp");
			$("#frm_user_info").submit();
		}
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
			<h3>참가신청 현황</h3>
		</div>
		<div class="navi">
			<ul>
				<li><a href="#none;">홈</a></li>
				<li><a href="#none;">참가신청 현황</a></li>
			</ul>
		</div>
		
		<!-- 탭메뉴 -->
		<br>
		<div class="s2_tab_tit">
			<!-- 전반기 참여기업 -->			
			<a style="width:16.7%;" href="/admin/board/board_list.asp">공지사항</a>
			<a style="width:16.7%;" href="/admin/mentoring/user_list.asp" class="on">참가신청 현황</a>
			<a style="width:16.7%;" href="/admin/mentoring/apply_list.asp">직무상담 신청자</a>
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
						<th>기간검색</th>
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
				<p class="txt">(참가신청 수 : <span><%=totalCnt%></span> 명, <%=Date()%> 현재)</p>
				<button type="button" class="btn down" onclick="location.href='/admin/excel_download/user_list.asp?<%=stropt%>'">EXCEL Down</button>
			</div>

			<table class="tb">
				<colgroup>
					<col style="width:100px" />
					<col style="width:220px" />
					<col style="width:210px" />
					<col style="width:200px" />
					<col style="width:150px" />
					<col style="width:120px" />
					<col style="width:120px" />
					<col />
				</colgroup>
				<thead>
					<tr>
						<th>No</th>
						<th>이름(ID)</th>
						<th>학과(졸업 및 재학여부)</th>
						<th>휴대폰번호</th>
						<th>가입일</th>
						<th>직무상담 신청</th>
						<th>사전질문 등록</th>
						<th>정보수정</th>
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
					<tr>
						<td><%=arrRs(1, i)%></td>
						<td><%=arrRs(3, i)%>(<%=Replace(arrRs(2, i), "_wk", "")%>)</td>
						<td><%=arrRs(9, i)%><br><%=graduated_state%></td>
						<td><%=arrRs(4, i)%></td>
						<td><%=arrRs(8, i)%></td>
						<td><%=arrRs(6, i)%></td>
						<td><%=arrRs(7, i)%></td>
						<td><a href="#pop1" class="pop" onclick="fn_pop_user_info(this, '<%=arrRs(2, i)%>')">[정보수정]</a></td>
					</tr>
					<%
							Next
						Else
					%>
					<tr>
						<td colspan="8" class="non_data">
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


<form method="post" id="frm_user_info" name="frm_user_info">
<div class="pop_up" id="pop1">
	<div class="pop">
		<div class="pop_wrap">
			<div class="pop_head">
				<h3>회원정보 수정</h3>
			</div>
			<div class="pop_body">
				<div class="tb_area">
					<table class="tb">
						<colgroup>
							<col style="width:200px">
							<col>
						</colgroup>
						<tbody>
							<tr>
								<th>이름(ID)</th>
								<input type="hidden" id="pop_user_id" name="pop_user_id" value="">
								<td id="pop_user_name">홍길동 (Takdi78)</td>
							</tr>
							<tr>
								<th><span class="pil">필수</span>휴대폰</th>
								<td><input type="text" class="txt" id="pop_user_hp" name="pop_user_hp" style="width:100%;" onkeyup="removeChar(event); changePhoneType(this);" onkeydown="return onlyNumber(event)"></td>
							</tr>

							<script type="text/javascript">
								function onlyNumber(event){
									event = event || window.event;
									var keyID = (event.which) ? event.which : event.keyCode;
									if ( (keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 ) 
										return;
									else
										return false;
								}

								function removeChar(event) {
									event = event || window.event;
									var keyID = (event.which) ? event.which : event.keyCode;
									if ( keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 ) 
										return;
									else
										event.target.value = event.target.value.replace(/[^0-9]/g, "");
								}
							</script>
							<!--
							<tr>
								<th><span class="pil">필수</span>이메일</th>
								<td><input type="text" class="txt" id="pop_user_email" name="pop_user_email" style="width:100%;"></td>
							</tr>
							-->
						</tbody>
					</table>
				</div>
			</div>
			<div class="pop_footer">
				<div class="btn_area">
					<button type="button" class="btn blue" onclick="fn_user_edit()">수정</button>
					<button type="button" class="btn gray close">취소</button>
				</div>
			</div>
			<a href="#none" class="pop_close">닫기</a>
		</div><!--.popWrap-->
	</div><!--.pop-->
	<span class="dim close"></span>
</div>
</form>


</body>
</html>
