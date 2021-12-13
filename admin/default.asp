<%
option Explicit
%>
<!--#include virtual = "/common/common.asp"-->
<!--#include virtual = "/include/header/header.asp"-->

<!--#include virtual = "/wwwconf/function/db/DBConnection.asp"-->
<!--#include virtual = "/wwwconf/function/library/AES256.asp"-->
<%
' 관리자 계정일 경우에만 접근 허용   
If Request.Cookies(site_code & "WKADMIN")("admin_id")="" Then 
	Response.Write "<script language=javascript>"&_
		"alert('해당 메뉴에 대한 접근 권한이 없습니다.');"&_
		"location.href='/';"&_
		"</script>"
	response.End 
End If
%>
<script type="text/javascript">

</script>
</head>

<body>

<!-- 상단 -->
<!--#include virtual = "/include/gnb/topMenu.asp"-->

<!-- 컨텐츠 -->
<div id="contents" class="admin">
	<div class="content">
		<div class="home_area">
			<div class="tit">
				<h3>통합 관리자 시스템</h3>
			</div>

			<ul>
				<li>
					<div class="menu">
						<a href="/admin/board/board_list.asp">공지사항</a>
					</div>
				</li>
				<li>
					<div class="menu">
						<a href="/admin/mentoring/user_list.asp">참가신청 현황</a>
					</div>
				</li>
				<li>
					<div class="menu">
						<a href="/admin/mentoring/apply_list.asp">직무상담 신청자</a>
					</div>
				</li>
				<li>
					<div class="menu">
						<a href="/admin/mentoring/lcture_apply_list.asp">특강 신청자</a>
					</div>
				</li>
				<li>
					<div class="menu">
						<a href="/admin/mentoring/question_list.asp">사전질문</a>
					</div>
				</li>
				<li>
					<div class="menu">
						<a href="/admin/mentoring/send_sms_list.asp">직무상담 문자발송</a>
					</div>
				</li>
				<li>
					<div class="menu">
						<a href="/admin/mentoring/lcture_send_sms_list.asp">특강 문자발송</a>
					</div>
				</li>
				<li>
					<div class="menu">
						<a href="/admin/mentoring/mentor_list.asp">직무상담 정보관리</a>
					</div>
				</li>
				<li>
					<div class="menu">
						<a href="/admin/mentoring/lcture_list.asp">특강 배너 관리</a>
					</div>
				</li>
			</ul>
		</div>
	</div><!-- //content -->
</div>
<!--// 컨텐츠 -->

<!-- 하단 -->
<!--#include virtual = "/include/footer/footer.asp"-->
<!-- 하단 -->

</body>
</html>
