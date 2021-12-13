<!--#include virtual = "/common/common.asp"-->
<!--#include virtual = "/include/header/header.asp"-->
</head>
<body>
<!-- 상단 -->
<!--#include virtual = "/include/gnb/topMenu.asp"-->
<!-- 상단 -->

<script type="text/javascript">
<!--
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
//-->
</script>

<form id="frm" name="frm" method="post">
	<input type="hidden" id="result_id" name="result_id" value="" />
	<input type="hidden" id="result_auth_type" name="result_auth_type" value="" />
	<input type="hidden" id="result_auth_value" name="result_auth_value" value="" />
</form>

<!-- 컨텐츠 -->
<div id="contents" class="util">
	<div class="content">
		<div class="sch_info">
			<a href="/my/search/searchID.asp">아이디 찾기</a> | <a href="/my/search/searchPW.asp">비밀번호 찾기</a>
		</div>
		<div class="input_area">
			<div class="tit">
				<h3>비밀번호 찾기<span>참가신청 시 입력한 본인 정보를 정확히 입력해 주세요.</span></h3>
			</div>
			<div class="sch_area">
				<input type="hidden" id="emailAuthNumChk" value="0">
				<input type="hidden" id="mobileAuthNumChk" value="0">
				<input type="hidden" id="AuthChk" value="0">
				<input type="hidden" id="hd_kind" value="1">
				<input type="hidden" id="hd_idx" value="">
				<input type="hidden" id="userIP" value="<%=Request.ServerVariables("REMOTE_ADDR")%>">
				<input type="hidden" id="site_short_name" value="<%=site_short_name%>">

				<table class="tb">
					<colgroup>
						<col style="width:140px" />
						<col />
					</colgroup>
					<tbody>
						<tr>
							<th><span class="pil">필수</span>아이디</th>
							<td>
								<input type="text" class="txt" id="user_id" name="user_id" placeholder="아이디를 입력해 주세요.">
								<p class="ment" id="ment_user_id" style="display:none;">아이디를 입력해 주세요.</p>
							</td>
						</tr>
						<tr>
							<th><span class="pil">필수</span>이름</th>
							<td>
								<input type="text" class="txt" id="user_nm" name="user_nm" placeholder="이름을 입력해 주세요.">
								<p class="ment" id="ment_user_nm" style="display:none;">이름을 입력해 주세요.</p>
							</td>
						</tr>
						<tr>
							<th><span class="pil">필수</span>휴대폰번호</th>
							<td class="call">
								<div class="number_box">
									<input type="text" class="txt" id="hp_num" name="hp_num" maxlength="13" onkeyup="removeChar(event); changePhoneType(this);" onkeydown="return onlyNumber(event)" placeholder="휴대폰 번호를 입력해 주세요.">
									<button type="button" onclick="fnAuthSms(); return false;" style="cursor:pointer">인증번호 전송</button>
									<p class="ment" id="ment_hp_num" style="display:none;">휴대폰 번호를 입력해 주세요.</p>
								</div>
								<div class="number_box" id="rsltAuthArea" style="display:none;">
									<input type="text" class="txt" id="mobileAuthNumber" name="mobileAuthNumber" maxlength="6" onkeyup="removeChar(event)" onkeydown="return onlyNumber(event)" placeholder="인증번호를 입력해 주세요.">
									<span class="time" id="hp_count">(03:00)</span>
									<button type="button" onclick="fnAuth(); return false;" style="cursor:pointer">인증하기</button>
									<!-- <span class="cite">인증/인증실패</span> -->
									<p class="ment" id="alertBox_sms" style="display:none;">인증번호를 입력해 주세요.</p>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
				<div class="btn_area">
					<a href="javascript:" class="btn blue" onclick="onSubmit_PW('USER');">비밀번호 재설정</a>
				</div>
			</div><!-- sign_up -->
		</div>
	</div><!-- //content -->
</div><!-- //contents -->
<!--// 컨텐츠 -->

<!-- 하단 -->
<!--#include virtual = "/include/footer/footer.asp"-->
<!-- 하단 -->

</body>
</html>