<%
option Explicit
%>

<!--#include virtual = "/common/common.asp"-->
<!--#include virtual="/wwwconf/function/db/DBConnection.asp"-->
<!--#include virtual = "/include/header/header.asp"-->

<%
	Call FN_LoginLimit("1")    '개인회원만 접근가능
%>
	
<%
	ConnectDB DBCon, Application("DBInfo_FAIR")
	
	' my 카운트
	Dim resume_cnt, apply_cnt, scrap_cnt, att_company_cnt, rtn_value3
	ReDim param(0)

	param(0) = makeParam("@i_user_id", adVarChar, adParamInput, 20, user_id)

	rtn_value3		= arrGetRsSP(DBCon, "USP_MY_RESUME_STAT", param, "", "")
	
	resume_cnt			= rtn_value3(1,0) + rtn_value3(2,0) + rtn_value3(9,0)	' 이력서
	apply_cnt			= rtn_value3(3,0) + rtn_value3(4,0)						' 입사지원 관리
	scrap_cnt			= rtn_value3(5,0) + rtn_value3(6,0)						' 스크랩 공고
	att_company_cnt		= rtn_value3(7,0)										' 관심 협력사
	
	DisconnectDB DBCon
%>

<script type="text/javascript">	
	function fn_keyup() {
		if (event.keyCode == 13) {
			fn_pwchk();
		}
	}

	function fn_pwchk() {
		if($('#user_pw').val() == "") {
			alert("비밀번호를 입력해 주세요");
			$('#user_pw').focus();
            return;	
		}
		else {
			$.ajax({
				type: "POST"
				, url: "/my/search/withdraw_confirm.asp"
				, data: { user_pw: $("#user_pw").val() }
				, dataType: "html"
				, async: true
				, success: function (data) {
					if (data.trim() != '') {
						$('#confirm').css("display","block");	
					}
					else {
						alert("입력한 비밀번호가 일치하지 않습니다.");
						$('#user_pw').focus();
			            return;
					}
				}
				, error: function (XMLHttpRequest, textStatus, errorThrown) {
					//alert(XMLHttpRequest.responseText);
				}
			});
		}
	}

	function fn_submit() {
		if ($('#user_nm').val() == "") {
			alert("필수 입력값을 입력해 주세요");
			$('#user_nm').focus();
			return;
		}
		if ($('#hp_num').val() == "") {
			alert("필수 입력값을 입력해 주세요");
			$('#hp_num').focus();
			return;
		}
		if ($('#user_reason').val() == "") {
			alert("필수 입력값을 입력해 주세요");
			$('#user_reason').focus();
			return;
		}

		$("#frm").attr("action", "/my/search/withdraw_complet.asp");
		$('#frm').submit();
	}
</script>
</head>

<body>
<!-- 상단 -->
<!--#include virtual = "/include/gnb/topMenu.asp"-->
<!-- 상단 -->

<!-- CONTENTS -->
<div id="career_container" class="searchIdWrap">
	
	<!--
	<div style="width:720px;padding-bottom: 10px;text-align: right;margin:0 auto;">
		<a href="/my/search/withdraw.asp">회원탈퇴 찾기</a>
    </div>
	-->

    <div id="career_contents">

        <div class="memberTab">
            <ul class="spl2">
                <li class="on"><a href="#memberPer" onclick="memberTabFnc(this,'.memberInfo.per','.memberInfo.comp');return false;" /><span>회원 탈퇴</span></a></li>
            </ul>
        </div><!-- .memberTab -->

        <div class="layoutBox">

			<div class="titArea">
				<h3>비밀번호 입력</h3>
				<span class="txt">본인 확인을 위해 비밀번호를 다시 한번 입력 부탁드립니다.</span>
			</div><!-- .titArea -->
			
			<div class="inputArea">
				<div class="inp bgNone">
					<label for="user_id">아이디</label>
					<input type="text" id="user_id" class="txt tahoma" name="user_id" value="<%=Replace(user_id, "_wk", "")%>" disabled="">
				</div><!-- .inp -->
				<div class="inp bgNone">
					<label for="user_pw">비밀번호</label>
					<input type="password" id="user_pw" class="txt placehd" name="user_pw" placeholder="비밀번호 입력" onkeyup="FC_ChkTextLen(this,32); fn_keyup();">
					<div class="rt">
						<button type="button" class="btn typeSky" onclick="fn_pwchk();">확인</button>
					</div><!-- .rt -->
				</div><!-- .inp -->
			</div><!-- .inputArea -->
                
			<!-- 개인회원 -->
			<div id="memberPer" class="memberInfo">
				<div class="currentArea">
					<strong class="tit">회원탈퇴 시 <em>다음의 정보가 삭제되어 이용할 수 없게 됩니다.</em></strong>
					<ul class="spl4">
						<li>
							<dl>
								<dt>이력서</dt>
								<dd><a><%=resume_cnt%></a></dd>
							</dl>
						</li>
						<li>
							<dl>
								<dt>입사지원 관리</dt>
								<dd><a><%=apply_cnt%></a></dd>
							</dl>
						</li>
						<li>
							<dl>
								<dt>스크랩 공고</dt>
								<dd><a><%=scrap_cnt%></a></dd>
							</dl>
						</li>
						<li>
							<dl>
								<dt>관심 협력사</dt>
								<dd><a><%=att_company_cnt%></a></dd>
							</dl>
						</li>
					</ul>
				</div><!-- .currentArea -->
				
				
				<form name="frm" id="frm" method="post" action="">
					<input type="hidden" name="sitegubun" value="">
					
					<div id="confirm" style="display:none;">
						<div class="inputArea">
							<div class="inp">
								<label for="user_nm">이름</label>
								<input type="txt" id="user_nm" class="txt placehd" name="user_nm" placeholder="이름 (실명입력)" />
							</div><!-- .inp -->
							<div class="inp">
								<label for="hp_num">휴대폰 번호</label>
								<input type="txt" id="hp_num" class="txt placehd" name="hp_num" placeholder="휴대폰 번호" maxlength="13" />
							</div><!-- .inp -->
							<div class="inp">
								<label for="user_reason">탈퇴사유</label>
								<input type="txt" id="user_reason" class="txt placehd" name="user_reason" placeholder="탈퇴사유" />
							</div><!-- .inp -->
						</div><!-- .inputArea -->

						<div class="btnWrap">
							<button type="button" class="btn typeSky" onclick="fn_submit()">회원탈퇴 신청</button>
						</div>
					</div>
				</form>

				<div class="notiArea">
					<strong class="tit">회원탈퇴 신청에 시 <em>다음의 사항을 반드시 확인하시기 바랍니다.</em></strong>
					<ul>
						<li>· 스타필드 안성 상생 온라인 수시채용관에 로그인을 할 수 없습니다.</li>
						<li>· 추후 재가입하더라도 동일한 아이디로 재가입이 불가능합니다.</li>
						<li>· 박람회 관련 소식을 받을 수 없습니다.</li>
					</ul>
				</div><!-- .notiArea -->
			</div><!-- .memberInfo -->
			<!--// 개인회원 -->

        </div><!-- .layoutBox -->
    </div><!-- #career_contents -->
</div><!-- #career_container -->
<!--// CONTENTS -->

</body>
</html>