<!--#include virtual = "/common/common.asp"-->
<!--#include virtual = "/include/header/header.asp"-->
<%
	Dim result_id, result_auth_type, result_auth_value
	result_id			= request("result_id")
	result_auth_type	= request("result_auth_type")
	result_auth_value	= request("result_auth_value")
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
				<h3>비밀번호 재설정<span>새로운 비밀번호를 입력해 주세요.</span></h3>
			</div>
			<div class="sch_area">
				<form id="frm" name="frm">
				<input type="hidden" id="user_id" name="user_id" value="<%=result_id%>">
				<input type="hidden" id="authType" name="authType" value="<%=result_auth_type%>">
				<input type="hidden" id="authValue" name="authValue" value="<%=result_auth_value%>">
				
				<table class="tb">
					<colgroup>
						<col style="width:140px" />
						<col />
					</colgroup>
					<tbody>
						<tr>
							<th><span class="pil">필수</span>비밀번호</th>
							<td>
								<input type="password" class="txt" id="new_pw1" name="new_pw1" maxlength="32" placeholder="비밀번호 (8~32자 영문, 숫자, 특수문자 입력)" value="">
								<span class="ment" id="capslockMsg" style="display:none;">CapsLock is on</span>
								<p class="ment" id="ment_new_pw1" style="display:none;">비밀번호를 입력해 주세요.</p>
							</td>
						</tr>
						<tr>
							<th><span class="pil">필수</span>비밀번호 확인</th>
							<td>
								<input type="password" class="txt" id="new_pw2" name="new_pw2" maxlength="32" placeholder="비밀번호 확인" value="">
								<span class="ment" id="capslockMsg2" style="display:none;">CapsLock is on</span>
								<p class="ment" id="ment_new_pw2" style="display:none;">비밀번호 확인을 입력해 주세요.</p>
							</td>
						</tr>
					</tbody>
				</table>
				</form>
				<p class="tb_ment">영문, 숫자, 특수기호를 포함하여 8자 이상 등록해 주세요.</p>
				<div class="btn_area">
					<a href="javascript:" class="btn blue" onclick="PW_Modify('USER');">비밀번호 저장</a>
					<a href="javaScript:fn_reset();" class="btn gray">취소하기</a>
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
<script type="text/javascript">
<!--
	// 캡스락 체크
	var txtPass		= document.getElementById("new_pw1");
	var txtPassChk	= document.getElementById("new_pw2");
	var capslockMsg	= document.getElementById("capslockMsg");	// capslock state return
	var capslockMsg2= document.getElementById("capslockMsg2");	// capslock state return

	txtPass.addEventListener("keyup", function(event) {
		if (event.getModifierState("CapsLock")) {
			capslockMsg.style.display	= "block";
		} else {
			capslockMsg.style.display	= "none";
		}		
	});

	txtPassChk.addEventListener("keyup", function(event) {
		if (event.getModifierState("CapsLock")) {
			capslockMsg2.style.display	= "block";
		} else {
			capslockMsg2.style.display	= "none";
		}
	});
	
	// 입력정보 초기화
	function fn_reset(){
		if ($("#new_pw1").val()!=""){
			if(confirm('비밀번호 재설정을 취소 하시겠습니까?')) {	
				location.href = "/";	
			}	
		}else{
			location.href = "/";		
		}	
	}
//-->
</script>