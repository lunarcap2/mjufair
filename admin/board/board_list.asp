<!--#include virtual="/wwwconf/function/db/DBConnection.asp"-->
<!--#include virtual="/common/common.asp"--> 
<!--#include virtual="/inc/function/paging.asp"-->
<%
'--------------------------------------------------------------------
'   Comment		: 게시판 관리 - 리스트
' 	History		: 2020-07-17, 이샛별 
'--------------------------------------------------------------------
Session.CodePage  = 949			'한글
Response.CharSet  = "euc-kr"	'한글
Response.AddHeader "Pragma","no-cache"
Response.AddHeader "cache-control", "no-staff"
Response.Expires  = -1

If Request.ServerVariables("HTTPS") = "off" Then 
	Response.redirect "https://"& Request.ServerVariables("HTTP_HOST") & Request.ServerVariables("URL") 
End If

' 관리자 계정일 경우에만 접근 허용   
If Request.Cookies(site_code & "WKADMIN")("admin_id")="" Then 
	Response.Write "<script language=javascript>"&_
		"alert('해당 메뉴에 대한 접근 권한이 없습니다.');"&_
		"location.href='/';"&_
		"</script>"
	response.End 
End If


Dim gubun		: gubun			= Request("gubun")		' 게시판 구분
Dim target		: target		= Request("target")		' 검색구분(제목:1, 내용:2)
Dim schKeyword	: schKeyword	= Request("schKeyword") ' 검색어(제목/내용)  
Dim page		: page			= Request("page")
Dim pageSize	: pageSize		= 5

If page="" Then page=1
page = CInt(page)

If gubun	= "" Then gubun		= ""
If target	= "" Then target	= "1"

ConnectDB DBCon, Application("DBInfo_FAIR")

Dim Param(6)
Param(0) = makeparam("@gubun",adChar,adParamInput,1,gubun)
Param(1) = makeparam("@target",adChar,adParamInput,1,target)
Param(2) = makeparam("@kw",adVarChar,adParamInput,100,schKeyword)
Param(3) = makeparam("@page",adInteger,adParamInput,4,page)
Param(4) = makeparam("@pagesize",adInteger,adParamInput,4,pagesize)
Param(5) = makeparam("@totalcnt",adInteger,adParamOutput,4,"")

Dim arrayList(2)
arrayList(0) = arrGetRsSP(DBcon,"usp_board_list",Param,"","")
arrayList(1) = getParamOutputValue(Param,"@totalcnt")

Dim arrRs		: arrRs		= arrayList(0)
Dim Tcnt		: Tcnt		= arrayList(1)
Dim pageCount	: pageCount = Fix(((Tcnt-1)/PageSize) +1) 'int(Tcnt / pagesize) + 1


DisconnectDB DBCon


Dim stropt
stropt = "gubun="&gubun&"&schKeyword="&schKeyword
%>
<!--#include virtual = "/include/header/header.asp"-->
<script type="text/javascript">
	<!--
	function fn_board_add() {
		var url = "board_form.asp";
		location.href = url;	
	}

	// 키워드 검색
	function fn_search() {
		var obj = document.frm_list;
		obj.action	= "board_list.asp";
		obj.submit();
	}

	// 검색 초기화
	function fn_reset() {
		var obj = document.frm_list;
		obj.schKeyword.value	= "";
		obj.action				= "board_list.asp";
		obj.submit();
	}
	//-->
</script>
</head>
<body>

	<!-- 상단 -->
	<!--#include virtual = "/include/gnb/topMenu.asp"-->
	<!-- 상단 -->


	<!-- 본문 -->
	<div id="contents" class="admin">
		<div class="content">
			<div class="navi">
				<ul>
					<li><a href="#none;">홈</a></li>
					<li><a href="#none;">공지사항</a></li>
				</ul>
			</div>
			<div class="list_area">
				<div class="tit">
					<h3>공지사항</h3>
				</div>

				<!-- 탭메뉴 -->
				<br>
				<div class="s2_tab_tit">
					<!-- 전반기 참여기업 -->			
					<a href="/admin/board/board_list.asp" class="on">공지사항</a>
					<a href="/admin/mentoring/user_list.asp">참가신청 현황</a>
					<a href="/admin/mentoring/apply_list.asp">직무상담 신청자</a>
					<a href="/admin/mentoring/lcture_apply_list.asp">특강 신청자</a>
					<a href="/admin/mentoring/question_list.asp">사전질문</a>
					<a href="/admin/mentoring/send_sms_list.asp">직무상담 문자발송</a>
					<a href="/admin/mentoring/lcture_send_sms_list.asp">특강 문자발송</a>
					<a href="/admin/mentoring/mentor_list.asp">직무상담 정보관리</a>
					<a href="/admin/mentoring/lcture_list.asp">특강 배너 관리</a>
				</div>
				<br>
				<!-- //탭메뉴 -->

				<form method="post" id="frm_list" name="frm_list">
				<div class="right_box">
					<div class="sch_box">
						<input type="text" class="txt" id="schKeyword" name="schKeyword" placeholder="검색어를 입력해 주세요." value="<%=schKeyword%>">
						<button type="button" class="btn" onclick="fn_search();">검색</button>
					</div>
				</div>
				</form>

				<table class="tb">
					<colgroup>
						<col style="width:100px">
						<col>
						<col style="width:200px">
					</colgroup>
					<thead>
						<tr>
							<th>No</th>
							<th>제목</th>
							<th>등록일</th>
						</tr>
					</thead>
					<tbody>
						<%
						Dim No : No = Tcnt - (PageSize * (page -1)) + 1
						Dim i, rs_seq, rs_gubun, rs_gubun_str, rs_title, rs_content, rs_regNm, rs_viewCnt, rs_regDt
						If IsArray(arrRs) Then
							For i=0 To UBound(arrRs,2)
								rs_seq		= Trim(arrRs(0,i))	' 등록번호
								rs_gubun	= Trim(arrRs(1,i))	' 게시판구분
								rs_title	= Trim(arrRs(5,i))	' 제목
								rs_content	= Trim(arrRs(6,i))	' 내용
								rs_regNm	= Trim(arrRs(3,i))	' 등록자명
								rs_viewCnt	= Trim(arrRs(7,i))	' 조회수
								rs_regDt	= Left(Trim(arrRs(9,i)),10)	' 등록일자

								Select Case rs_gubun
									Case 1 : rs_gubun_str = "공지사항"
									Case 2 : rs_gubun_str = "자주묻는질문(FAQ)"
									Case 3 : rs_gubun_str = "이벤트"
								End Select

								No = No - 1
						%>
						<tr>
							<td><%=No%></td>
							<td class="subject">
								<a href="./board_form.asp?seq=<%=rs_seq%>&<%=stropt%>&page=<%=page%>"><%=rs_title%></a>
							</td>
							<td><%=rs_regDt%></td>
						</tr>
						<%
							Next
						Else
						%>
						<tr>
							<td colspan="3" class="non_data">
								검색결과가 없습니다.
							</td>
						</tr>
						<%
						End If
						%>
					</tbody>
				</table>
				<div class="btn_area right">
					<a href="javascript:" class="btn blue" onclick="fn_board_add();">글쓰기</a>
				</div><!--btn_area -->

				<%Call putPage(page, stropt, pageCount)%>
				
			</div><!-- list_area -->
		</div><!-- //content -->
	</div>
	<!-- //본문 -->


	<!-- 하단 -->
	<!--#include virtual = "/include/footer/footer.asp"-->
	<!-- 하단 -->

</body>
</html>