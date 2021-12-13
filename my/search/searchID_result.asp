<!--#include virtual = "/common/common.asp"-->
<!--#include virtual = "/include/header/header.asp"-->
<%
	Dim result_id, result_date
	result_id = request("result_id")
	result_date = request("result_date")

	If result_id = "" Then
		Response.write "<script>" &_
		"	alert('잘못된 접근입니다.');" &_
		"	history.back();" &_
		"</script>"
		Response.End 
	End If
%>
</head>
<body>
<!-- 상단 -->
<!--#include virtual = "/include/gnb/topMenu.asp"-->
<!-- 상단 -->

<!-- 컨텐츠 -->
<div id="contents" class="util">
	<div class="content">
		<div class="input_area">
			<div class="tit">
				<h3>아이디 찾기 결과</h3>
			</div>
			<div class="sch_area">
				<table class="tb">
					<colgroup>
						<col style="width:100%;" />
						<col />
					</colgroup>
					<tbody>
						<tr>
							<td class="result">
								<p>
									<span><%=result_id%></span> (가입일 : <%=result_date%>)
								</p>
							</td>
						</tr>
					</tbody>
				</table>
				<p class="tb_ment">개인정보 보호를 위해 아이디 일부분을 *로 표시합니다.</p>
				<div class="btn_area">
					<a href="/my/login.asp" class="btn blue">로그인 하기</a>
					<a href="/my/search/searchPW.asp" class="btn gray">비밀번호 찾기</a>
				</div>
			</div><!-- sch_area -->
		</div>
	</div><!-- //content -->
</div><!-- //contents -->
<!--// 컨텐츠 -->

<!-- 하단 -->
<!--#include virtual = "/include/footer/footer.asp"-->
<!-- 하단 -->

</body>
</html>