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

	Dim lcture_no : lcture_no = request("lcture_no")
	Dim mode, lcture_tit, searchStartDate, lcture_shour, lcture_smin, searchEndDate, lcture_ehour, lcture_emin, lcture_zoomurl
	Dim i, set_hour
	
	If lcture_no <> "" Then
		ConnectDB DBCon, Application("DBInfo_FAIR")
			
			mode = "edit"

			Dim strQuery, arrRs
			strQuery = ""
			strQuery = strQuery & " SELECT 강의명, CONVERT(CHAR(19), 강의시작일시, 20) AS 강의시작일시, CONVERT(CHAR(19), 강의종료일시, 20) AS 강의종료일시, 강의URL"
			strQuery = strQuery & " FROM 멘토링_강의_기본정보 WITH(NOLOCK) WHERE 강의번호 = " & lcture_no

			arrRs = arrGetRsSql(DBCon, strQuery, "", "")

			If isArray(arrRs) Then
				lcture_tit		= arrRs(0,0)
				searchStartDate	= Left(arrRs(1,0),10)					'특강_시작일
				lcture_shour	= Split(Mid(arrRs(1,0),12,13),":")(0)	'특강_시작시
				lcture_smin		= Split(Mid(arrRs(1,0),12,13),":")(1)	'특강_시작분
				searchEndDate	= Left(arrRs(2,0),10)					'특강_종료일
				lcture_ehour	= Split(Mid(arrRs(2,0),12,13),":")(0)	'특강_종료시
				lcture_emin		= Split(Mid(arrRs(2,0),12,13),":")(1)	'특강_종료분
				lcture_zoomurl	= arrRs(3,0)
			End If

		DisconnectDB DBCon
	End If
%>
<!--#include virtual = "/include/header/header.asp"-->
<script type="text/javascript">
	
	// 저장
	function fn_submit() {

		if ($('#lcture_tit').val() == '') {
			alert('특강명을 입력해 주세요.');
			$('#lcture_name').focus();
			return;
		}

		if ($('#searchStartDate').val() == '' || $('#searchEndDate').val() == '' || $('#lcture_shour').val() == '' || $('#lcture_ehour').val() == '') {
			alert('특강 일시를 모두 입력해 주세요.');
			return;
		}
		
		if ($('#lcture_zoomurl').val() == '') {
			alert('Zoom주소를 입력해 주세요.');
			$('#lcture_zoomurl').focus();
			return;
		}
		
		$("#proc_gubun").val("submit");

		document.frm.action = "./lcture_reg_proc.asp";
		document.frm.submit();
	}
	
	// 링크테스트
	function fn_chkUrl() {
		var lcture_zoomurl = $("#lcture_zoomurl").val();

		if (lcture_zoomurl.indexOf("http") < 0) {
			lcture_zoomurl = "http://" + lcture_zoomurl;
		}

		window.open(lcture_zoomurl);
	}

	$(document).ready(function () {

		var lcture_shour = '<%=lcture_shour%>';
		if (lcture_shour != "") {
			$('#lcture_shour').val(lcture_shour);
		}

		var lcture_ehour = '<%=lcture_ehour%>';
		if (lcture_ehour != "") {
			$('#lcture_ehour').val(lcture_ehour);
		}
	});

	//삭제
	function fn_delete() {
		if (confirm("삭제시 해당 특강에 신청한 인원들도 삭제 됩니다. 삭제하시겠습니까?")) {
			$("#proc_gubun").val("delete");

			document.frm.action = "./lcture_reg_proc.asp";
			document.frm.submit();
		}
	}

</script>
</head>

<body id="loginWrap">
<!-- 상단 -->
<!--#include virtual = "/include/gnb/topMenu.asp"-->
<!-- 상단 -->

<!-- 컨텐츠 -->
<form method="post" id="frm" name="frm">
<input type="hidden" id="proc_gubun" name="proc_gubun" value="">
<input type="hidden" id="lcture_no" name="lcture_no" value="<%=lcture_no%>">
<input type="hidden" id="mode" name="mode" value="<%=mode%>">

<div id="contents" class="admin">
	<div class="content">
		<div class="navi">
			<ul>
				<li><a href="#none;">홈</a></li>
				<% If mode = "edit" Then %>
				<li><a href="#none;">특강 배너 수정</a></li>
				<% Else %>
				<li><a href="#none;">특강 배너 등록</a></li>
				<% End If %>
			</ul>
		</div>
		<div class="list_area view">
			<div class="tit">
				<% If mode = "edit" Then %>
				<h3>특강 배너 수정</h3>
				<% Else %>
				<h3>특강 배너 등록</h3>
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
						<th>특강명</th>
						<td colspan="3">
							<input type="text" class="txt" id="lcture_tit" name="lcture_tit" value="<%=lcture_tit%>" placeholder="특강명을 입력해 주세요." style="width:100%;">
						</td>
					</tr>
					<tr>
						<th>특강 일시</th>
						<td  colspan="3">
							<div class="time_box">
								<div class="datePick">
									<span>
										<input type="text" class="datepicker two" id="searchStartDate" name="lcture_sday" value="<%=searchStartDate%>" style="width:210px;">
										<button type="button" class="btncalendar dateclick">날짜선택</button>
									</span>
								</div>

								<span class="selectbox" style="width:210px;">
									<span class="">선택</span>
									<select id="lcture_shour" name="lcture_shour" title="기업명">
										<option value="">선택</option>
										<% 
											For i=0 To 24
											If Len(i) = 1 Then set_hour = "0" & i Else set_hour = i End If												
										%>
										<option value="<%=set_hour%>"><%=set_hour%>시</option>
										<% Next %>
									</select>
								</span>
								<em>시</em>
								<div class="datePick">
									<span>
										<input type="text" class="datepicker two" id="searchEndDate" name="lcture_eday" value="<%=searchEndDate%>" style="width:210px;">
										<button type="button" class="btncalendar dateclick">날짜선택</button>
									</span>
								</div>

								<span class="selectbox" style="width:210px;">
									<span class="">선택</span>
									<select id="lcture_ehour" name="lcture_ehour" title="기업명">
										<option value="">선택</option>
										<% 
											For i=0 To 24
											If Len(i) = 1 Then set_hour = "0" & i Else set_hour = i End If												
										%>
										<option value="<%=set_hour%>"><%=set_hour%>시</option>
										<% Next %>
									</select>
								</span>
								<em>시</em>
							</div>
						</td>
					</tr>
					<tr>
						<th>Zoom주소</th>
						<td colspan="3">
							<input type="text" class="txt" id="lcture_zoomurl" name="lcture_zoomurl" value="<%=lcture_zoomurl%>" placeholder="Zoom 주소를 입력해 주세요." style="width:80%;">
							&nbsp;
							<a href="javascript:;" type="_blank" class="btn blue" onclick="fn_chkUrl(); return false;">링크 테스트</a>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="btn_area right">
				<a href="lcture_list.asp" class="btn list">목록</button>
				<a href="javascript:;" class="btn blue" onclick="fn_submit();">정보 저장</button>
				<% If mode = "edit" Then %>
				<a href="javascript:;" class="btn gray" onclick="fn_delete();">삭제</button>
				<% End If %>
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