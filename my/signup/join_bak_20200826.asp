<%@codepage="949" language="VBScript"%>
<%
'--------------------------------------------------------------------
'   Comment		: 개인회원 가입
' 	History		: 2020-04-20, 이샛별 
'---------------------------------------------------------------------
Session.CodePage  = 949			'한글
Response.CharSet  = "euc-kr"	'한글
Response.AddHeader "Pragma","no-cache"
Response.AddHeader "cache-control", "no-staff"
Response.Expires  = -1
%>

<!--#include virtual = "/common/common.asp"-->

<%
'If Request.ServerVariables("HTTPS") = "off" Then 
'	Response.redirect "https://"& Request.ServerVariables("HTTP_HOST") & Request.ServerVariables("URL") 
'End If


If request.Cookies(site_code & "WKC_F")("comid")<>"" Or request.Cookies(site_code & "WKP_F")("id")<>"" Then 
	Response.Write "<script language=javascript>"&_
		"alert('로그인 상태에서는 해당 페이지에 접근할 수 없습니다.\n로그아웃 후 이용 바랍니다.');"&_
		"location.href='/';"&_
		"</script>"
	response.End 
End If
%>

<!--#include virtual = "/include/header/header.asp"-->
<script type="text/javascript">
	// SMS 인증 번호 전송
	/* start */
	function fnAuthSms() {		
		if ($("#mobileAuthNumChk").val() == "4") {
			alert("인증이 완료되었습니다.");
			return;
		}

		$("#hd_idx").val("");

		var strEmail;
		var contact = $("#txtPhone").val();

		if (Authchk_ing) {
			alert("처리중 입니다. 잠시만 기다려 주세요.");
		} else {
			if(contact=="“-” 생략하고 숫자만 입력해 주세요."){
				contact="";
			}

			if(contact==""){
				alert("연락처를 입력해 주세요.");
				$("#txtPhone").focus();
				return;
			}

			if(contact.length<10){
				alert("정확한 연락처를 입력해 주세요.");
				$("#txtPhone").focus();
				return;
			}	
			else {
				Authchk_ing = true;

				var strUrl = "https://app.career.co.kr/sms/career/Authentication";

				var parm = {};

				parm.authCode	= "1";		// sms:1 | email:2
				parm.authvalue	= $("#txtPhone").val();		// 핸드폰 no( - 는 입력 해도 되고 안해도 됩니다.)
				parm.sitename	= "<%=site_short_name%>";	// sms 발송시 해당 내용으로 입력 됩니다.
				parm.sitecode	= "37";		// sitecode(꼭 해당 사이트 코드를 입력하세요) 발송 log 및 email 발송시 구분합니다. => 코드 정의(커리어 : 2, 박람회 : 37)
				parm.memkind	= "개인";
				parm.ip			= "";		// 개인 IP
				parm.callback	= "jsonp_sms_callback";

				$("#aMobile").text("인증번호 재전송");
				$.ajax({
					url: strUrl
					, dataType: "jsonp"
					, type: "post"
					, data: parm
					, success: function (data) {
						//alert("sccess : " + data.length);
					}
					, error: function (jqXHR, textStatus, errorThrown) {
						//alert(textStatus + ", " + errorThrown);
					}
				});
			}
		}
	}

	// Result 처리는 이곳에서 합니다.
	function jsonp_sms_callback(data) {
		Authchk_ing = false;
		if ($.trim(data.result) == "true") {
			$("#mobileAuthNumChk").val("1");

			$("#timeCntdown").show();
			fnDpFirst();
			fncDpTm(); //카운트

			$("#hd_idx").val(data.result_idx);
			alert("인증번호가 발송되었습니다.");
			$("#rsltAuthArea").show();
			$("#mobileAuthNumber").val("");
			$("#mobileAuthNumber").focus();
			$("#hd_kind").val("1");
		} else {
			$("#timeCntdown").hide();
			$("#rsltAuthArea").hide();
			$("#emailAuthNumChk").val("0");
			alert("인증번호 발송이 실패하였습니다.");
		}
	}
	/* end */

	// 인증번호 확인
	/* start */
	function fnAuth() {
		if ($("#hd_kind").val() == "1" && $("#mobileAuthNumChk").val() == "4") {
			$("#ment_txtPhone").hide();
			alert("인증이 완료되었습니다.");
			return;

		} else if ($.trim($("#hd_idx").val()) == "") {
			alert("인증번호가 맞지 않습니다. 인증번호를 확인해 주세요.");
			return;
		}

		$("#mobileAuthNumber").val($.trim($("#mobileAuthNumber").val()));
		if  ($("#hd_kind").val() == "1") {
			if ($.trim($("#mobileAuthNumber").val()) == "") {
				alert("인증번호를 입력해 주세요.");
				$("#mobileAuthNumber").focus();
				return;
			}
		}

		var strUrl	= "https://app.career.co.kr/sms/career/AuthenticationResult";
		var parms	= {};

		var strAuthKey = "";
		if ($("#hd_kind").val() == "2") {
			strAuthKey = $("#emailAuthNumber").val();
		} else if ($("#hd_kind").val() == "1") {
			strAuthKey = $("#mobileAuthNumber").val();
		} else {
			return;
		}

		if ($.trim($("#hd_idx").val()) == "" || ($.trim($("#emailAuthNumber").val()) == "" && $.trim($("#mobileAuthNumber").val()) == "")) {
			return;
		}

		parms.authCode	= $("#hd_kind").val();	// sms:1 | email:2

		parms.authvalue	= strAuthKey;			// 발송된 인증 KEY Value

		parms.idx		= $("#hd_idx").val();	// 발송된 인증 번호
		parms.callback	= "jsonp_result_callback";
		$.ajax({
			url: strUrl
				, dataType: "jsonp"
				, type: "post"
				, data: parms
				, success: function (data) {
					alert("sccess : " + data);
				}
				, error: function (jqXHR, textStatus, errorThrown) {
					//alert(textStatus + ", " + errorThrown);
				}
		});
	}

	//Result 처리는 이곳에서 합니다.
	function jsonp_result_callback(data) {
		if ($("#hd_kind").val() == "1") {
			if ($.trim(data.result_idx) == "Y") {
				alert("인증이 완료되었습니다.");
				$("#mobileAuthNumChk").val("4");
				$("#authproc").val("1");
				$("#timeCntdown").hide();
				$("#rsltMsg2").hide();
			} else {
				alert("입력한 인증번호가 다릅니다.");
				$("#mobileAuthNumChk").val("3");
				$("#rsltMsg1").hide();
				$("#timeCntdown").show();
			}
		}
	}
	/* end */

	var emailchk_ing	= false;
	var Authchk_ing		= false;

	var min = 60;
	var sec = 60;
	var ctm;			// 표시 시간
	var inputtime = 3;	// 입력분
	var tstop;			// 타이머 정지

	Number.prototype.dptm = function () { return this < 10 ? '0' + this : this; } //분에 "0" 넣기

	function fnDpFirst() {
		clearTimeout(tstop);
		ctm = sec * inputtime;
	}

	function fncDpTm() {
		var cmi = Math.floor((ctm % (min * sec)) / sec).dptm();
		var csc = Math.floor(ctm % sec).dptm();

		//document.getElementById("ctm1").innerText = cmi + ' : ' + csc; //값 보여줌
		//document.getElementById("").innerText = '남은시간 ' + cmi + ' : ' + csc; //값 보여줌
		$("#timeCntdown").text('(' + cmi + ' : ' + csc + ")");

		if ((ctm--) <= 0) {
			ctm = sec * inputtime;
			clearTimeout(tstop);
			//재전송버튼
			//인증시간 초과 meassage
		}
		else {
			tstop = setTimeout("fncDpTm()", 1000);
		}
	}
	
	// 인증번호 검증 함수 호출
	function fnAuthNoChk(){
		fnAuth();
	}	

	// 휴대폰번호 중복 가입 검증
	function fn_chkJoin(){
		if($("#txtPhone").val()=="“-” 생략하고 숫자만 입력해 주세요."){
			$("#txtPhone").val("");
		}

		if($("#txtPhone").val()==""){
			alert("연락처를 입력해 주세요.");
			$("#txtPhone").focus();
			return;
		}

		if($("#txtPhone").val().length<10){
			alert("정확한 연락처를 입력해 주세요.");
			$("#txtPhone").focus();
			return;
		} else {
			$.ajax({
				type: "POST"
				, url: "phone_CheckAll.asp"
				, data: { user_phone: $("#txtPhone").val() }
				, dataType: "text"					
				, async: true
				, success: function (data) {
					// 기존 등록된 휴대폰번호가 존재하면 X, 없으면 O
					if (data.trim() == "X") {
						alert("입력하신 휴대폰번호로 회원 가입된 내역이 존재합니다.\n아이디 찾기를 이용하여 기존 가입하신 계정을 확인해 주세요.\n(우측 최상단 구직자 로그인 클릭> ID/PW찾기 이동)");
						return;
					} else {
						fnAuthSms();
					}
				}
				, error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert(XMLHttpRequest.responseText);
				}

			});
		}	
	}

	// 입력 값 체크
	function fn_sumbit(){
		var txtId		= $("#txtId").val();				// 아이디
		var txtPass		= $("#txtPass").val();				// 비번
		var txtPassChk	= $("#txtPassChk").val();			// 비번확인
		var	txtName		= $("#txtName").val();				// 이름
		var txtEmail	= $("#txtEmail").val();				// 이메일
		var txtPhone	= $("#txtPhone").val();				// 휴대폰
		var chkAgrPrv	= $("#agreeallPer").is(":checked");	// 이용약관 및 개인정보 수집 동의

		if(txtId==""){
			$("#ment_txtId").text("아이디를 입력해 주세요.");
			$("#ment_txtId").show();
			$("#txtId").focus();
			return;
		} else {
			$("#ment_txtId").hide();
		}

		if($("#id_check").val() != "1"){
			alert("아이디를 다시 확인해 주세요.");
			$("#txtId").focus();
			return;
		}

		if(txtPass==""){
			$("#ment_txtPass").text("비밀번호를 입력해 주세요.");
			$("#ment_txtPass").show();
			$("#txtPass").focus();
			return;
		} else {
			$("#ment_txtPass").hide();
		}

		if($("#pw_box").text()!=""){
			$("#ment_txtPass").text("입력하신 비밀번호가 보안상 매우 취약합니다.\n8~32자까지 영문, 숫자, 특수문자 등의 조합으로\n아이디와 무관한 문자열을 입력해 주세요.");
			$("#ment_txtPass").show();
			$("#txtPass").focus();
			return;
		} else {
			$("#ment_txtPass").hide();
		}

		if(txtPassChk==""){
			$("#ment_txtPassChk").text("비밀번호 확인란을 입력해 주세요.");
			$("#ment_txtPassChk").show();
			$("#txtPassChk").focus();
			return;
		} else {
			$("#ment_txtPassChk").hide();
		}

		if(txtPassChk!=txtPass){
			$("#ment_txtPassChk").text("비밀번호와 비밀번호 확인란에 입력한 정보가\n일치하지 않습니다. 다시 확인해 주세요.");
			$("#ment_txtPassChk").show();
			$("#txtPassChk").focus();
			return;
		} else {
			$("#ment_txtPassChk").hide();
		}

		if(txtName==""){
			$("#ment_txtName").text("이름을 입력해 주세요.");
			$("#ment_txtName").show();
			$("#txtName").focus();
			return;
		} else {
			$("#ment_txtName").hide();
		}

		if($("#txtEmail").val() == "") {
			$("#ment_txtEmail").text("이메일을 입력해 주세요.");
			$("#ment_txtEmail").show();
			$("#txtEmail").focus();
			return;
		} else {
			$("#ment_txtEmail").hide();
		}


		if(! email_check(txtEmail) ) {
			$("#ment_txtEmail").text("잘못된 이메일 형식입니다.");
			$("#ment_txtEmail").show();
			return;
		}
		else {
			$("#ment_txtEmail").hide();
		}

		if(txtPhone==""){
			$("#ment_txtPhone").text("휴대폰번호를 입력해 주세요.");
			$("#ment_txtPhone").show();
			$("#txtPhone").focus();
			return;
		} else {
			$("#ment_txtPhone").hide();
		}

		if ($("#mobileAuthNumChk").val() != "4") {
			$("#ment_txtPhone").text("휴대폰번호를 인증해주세요.");
			$("#ment_txtPhone").show();
			$("#txtPhone").focus();
			return;
		} else {
			$("#ment_txtPhone").hide();
		}

		if (!chkAgrPrv) {
			alert("개인정보 수집에 동의해 주세요.");
			return;
		}

		var obj=document.frm1;
		if(confirm('입력하신 정보로 회원 가입 하시겠습니까?')) {
			obj.method = "post";
			obj.action = "join_individual_proc.asp";
			obj.submit();
		}

	}

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

	/*아이디 중복 체크 시작*/
	function fn_checkID() {
		$("#txtId").val($("#txtId").val().toLowerCase());

		$("#id_box").text("");
		$("#id_check").val("0");

		var checkNumber		= $("#txtId").val().search(/[0-9]/g);	// 숫자 입력 체크
		var checkEnglish	= $("#txtId").val().search(/[a-z]/ig);	// 영문 입력 체크

		if($("#txtId").val() == "") {
			$("#ment_txtId").text("아이디를 입력해 주세요.");
			$("#ment_txtId").show();
			$("#txtId").focus();
			return;
		}else if(!Validchar($("#txtId").val(), num + alpha)){
			$("#ment_txtId").text("아이디는 한글 및 특수문자를 지원하지 않습니다. 다시 입력해 주세요.");
			$("#ment_txtId").show();
			$("#txtId").focus();
			return;
		}else if($("#txtId").val().length < 5){
			$("#ment_txtId").text("아이디는 최소 5자 이상이어야 합니다.");
			$("#ment_txtId").show();
			return;
		}else if(checkNumber <0 || checkEnglish <0){
			$("#ment_txtId").text("영문과 숫자를 혼용하여 입력해 주세요.");
			$("#ment_txtId").show();
			return;
		}else{
			if (/(\w)\1\1\1/.test($("#txtId").val())){	// 같은형식 문자 4글자 이상 사용 금지
				$("#ment_txtId").text("동일한 문자 연속 4글자 이상은 사용 금지합니다.");
				$("#ment_txtId").show();
				return;
			} else {
				$.ajax({
					type: "POST"
					, url: "Id_CheckAll.asp"
					, data: { user_id: $("#txtId").val() }
					, dataType: "text"					
					, async: true
					, success: function (data) {
						// 기존 등록된 아이디가 존재하면 X, 없으면 O
						if (data.trim() == "X") {
							//$("#id_box").addClass('bad').removeClass('good');
							$("#ment_txtId").text("탈퇴한 아이디 또는 이미 사용중인 아이디로, 이용하실 수 없습니다.");
							$("#ment_txtId").show();
							return;
						} else {
							$("#id_check").val("1");
							$("#chk_id").val($("#txtId").val());
							//$("#id_box").addClass('good').removeClass('bad');
							//$("#ment_txtId").text("사용 가능한 아이디입니다.");
							$("#ment_txtId").hide();
							return;
						}
					}
					, error: function (XMLHttpRequest, textStatus, errorThrown) {
						alert(XMLHttpRequest.responseText);
					}

				});
			}
		}
	}
	/*아이디 중복 체크 끝*/
	
	/*비밀번호 체크 시작*/
	function fn_checkPW() {
		var chk = false;
		var id	= $("#txtId").val();
		if ($('#txtPass').val().length == 0 ) {
			return;
		} else {
			if ($('#txtPass').val().length < 8 || $('#txtPass').val().length > 32) {
				$("#ment_txtPass").text("비밀번호는 8~32자 까지만 허용됩니다.");
				$("#ment_txtPass").show();
				return false;
			}
			
			if (id != "" && $('#txtPass').val().search(id) > -1) {
				$("#ment_txtPass").text("비밀번호에 아이디가 포함되어 있습니다.");
				$("#ment_txtPass").show();
				return false;
			}
				
			var pattern1 = /[0-9]/;		// 숫자 
			var pattern2 = /[a-zA-Z]/;	// 문자 
			var pattern3 = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
								
			//if (!$('#txtPass').val().match(/([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~])|([!,@,#,$,%,^,&,*,?,_,~].*[a-zA-Z0-9])/)) {
			//if (!$('#txtPass').val().match(/^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/)) {
			//if (!/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/.test($('#txtPass').val())) {
			if(!pattern1.test($('#txtPass').val()) || !pattern2.test($('#txtPass').val()) || !pattern3.test($('#txtPass').val())) {
				$("#ment_txtPass").text("비밀번호는 영문, 숫자 및 특수문자의 조합으로 생성해야 합니다");
				$("#ment_txtPass").show();
				return;
			}else{
				if($('#txtPass').val().search(id) > -1) {
					$("#ment_txtPass").text("비밀번호에 아이디가 포함되어 있습니다.");
					$("#ment_txtPass").show();
					return false;
				}else{
					$("#ment_txtPass").hide("");
				}
			}
		}

		if ($('#txtPassChk').val().split(" ").join("") == "") {
			$("#ment_txtPassChk").text("비밀번호 확인을 입력해 주세요.");
			$("#ment_txtPassChk").show();
			return;
		} 

		if ($('#txtPass').val() != $('#txtPassChk').val()) {
			$("#ment_txtPassChk").text("비밀번호가 일치하지 않습니다.");
			$("#ment_txtPassChk").show();
			return;
		} else {
			$("#ment_txtPass").hide();
			$("#ment_txtPassChk").hide();
		}
		return chk;
	}
	/*비밀번호 체크 끝*/

	/*이메일 체크 시작*/
	function email_check( email ) {    
		var regex=/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
		return (email != '' && email != 'undefined' && regex.test(email)); 
	}

	// check when email input lost foucus
	function fn_checkMail() {
	  var email = $("#txtEmail").val();

	  // if value is empty then exit
	  if( email == '' || email == 'undefined') return;

	  // valid check
	  if(! email_check(email) ) {
		$("#ment_txtEmail").text("잘못된 이메일 형식입니다.");
		$("#ment_txtEmail").show();
		return false;
	  }
	  else {
		$("#ment_txtEmail").hide();
		return false;
	  }
	}
	/*이메일 체크 끝*/

	// 입력값 체크
	$(document).ready(function () {
		//$("#txtPass").val("");
		//$("#frm1")[0].reset();

		//아이디 중복 체크
		$("#txtId").bind("keyup keydown", function () {
			fn_checkID();
		});

		// 비번 유효성 체크
		$("#txtPass").bind("keyup keydown", function () {
			$(this).attr('type', 'password'); 
			fn_checkPW();
		});

		// 비번 재확인 유효성 체크
		$("#txtPassChk").bind("keyup keydown", function () {
			fn_checkPW();
		});

		// 이메일 주소 유효성 체크
		$("#txtEmail").bind("keyup keydown", function () {
			fn_checkMail();
		});
	});
</script>
</head>

<body id="membersWrap">
<!-- 상단 -->
<!--#include virtual = "/include/gnb/topMenu.asp"-->
<!-- 상단 -->


<!-- 컨텐츠 -->
<div id="contents" class="util">
	<div class="content sign_up">
		<div class="input_area">
			<div class="tit">
				<h3>회원가입</h3>
			</div>
			<div class="sign_up">

				<form method="post" name="frm1" autocomplete="off">
				<input type="hidden" name="id_check" id="id_check" value="" /><!-- 아이디 검증 여부(0/1) -->
				<input type="hidden" name="chk_id" id="chk_id" value=""><!-- 사용(입력) 아이디 -->
				<input type="hidden" name="hd_idx" id="hd_idx" value="" /><!-- 번호인증 idx -->
				<input type="hidden" name="mobileAuthNumChk" id="mobileAuthNumChk" value="0" />
				<input type="hidden" name="hd_kind" id="hd_kind" value="2" />
				<input type="hidden" name="authproc" id="authproc" value="" />

				<table class="tb">
					<colgroup>
						<col style="width:140px" />
						<col />
					</colgroup>
					<tbody>
						<tr>
							<th>아이디</th>
							<td>
								<input type="text" class="txt" id="txtId" name="txtId" maxlength="12" placeholder="아이디 (5~12자 영문, 숫자 입력)">
								<p class="ment" id="ment_txtId" style="display:none;"></p>
							</td>
						</tr>
						<tr>
							<th>비밀번호</th>
							<td>
								<input type="password" class="txt" id="txtPass" name="txtPass" maxlength="32" placeholder="비밀번호 (8~32자 영문, 숫자, 특수문자 입력)">
								<p class="ment" id="ment_txtPass" style="display:none;"></p>
							</td>
						</tr>
						<tr>
							<th>비밀번호(확인)</th>
							<td>
								<input type="password" class="txt" id="txtPassChk" name="txtPassChk" maxlength="32" placeholder="비밀번호 확인">
								<p class="ment" id="ment_txtPassChk" style="display:none;"></p>
							</td>
						</tr>
						<tr>
							<th>이름(실명)</th>
							<td>
								<input type="text" class="txt" id="txtName" name="txtName" maxlength="10" placeholder="이름 (실명입력)">
								<p class="ment" id="ment_txtName" style="display:none;"></p>
							</td>
						</tr>
						<tr>
							<th>E-mail</th>
							<td>
								<input type="text" class="txt" id="txtEmail" name="txtEmail" maxlength="100" placeholder="이메일 주소">
								<p class="ment" id="ment_txtEmail" style="display:none;"></p>
							</td>
						</tr>
						<tr>
							<th rowspan="2">휴대폰번호</th>
							<td class="call">
								<div class="number_box">
									<input type="text" class="txt" id="txtPhone" name="txtPhone" maxlength="13" placeholder="휴대폰 번호" onkeyup="removeChar(event); changePhoneType(this);" onkeydown="return onlyNumber(event)">
									<button type="button" id="aMobile" onclick="fn_chkJoin(); return false;">인증번호 전송</button>
									<p class="ment" id="ment_txtPhone" style="display:none;"></p>
								</div>
								<div class="number_box">
									<input type="text" class="txt" id="mobileAuthNumber" name="mobileAuthNumber" maxlength="6" onkeyup="removeChar(event)" onkeydown="return onlyNumber(event)" placeholder="인증번호">
									<span class="time" id="timeCntdown">(03:00)</span>
									<button type="button" onclick="fnAuthNoChk(); return false;">인증하기</button>
									<span class="cite">인증/인증실패</span>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
				<dl class="agree_dl">
					<dt>개인정보 수집동의</dt>
					<dd>
						개인정보 수집목적 : 본인여부 확인<br>
						개인정보 수집항목 : 이름, E-mail, 휴대폰 번호<br>
						개인정보 파기 : 박람회 종료 시 즉시 파기
					</dd>
				</dl>
				<div class="chk_area">
					<label class="checkbox off" for="agreeallPer">
						<input class="chk" id="agreeallPer" name="agreeallPer" type="checkbox">
						<span>보훈청 언택트 멘토링 온라인 박람회 개인정보 수집에 동의합니다.</span>
					</label>	
				</div>
				<div class="btn_area">
					<a href="javascript:" onclick="fn_sumbit();" class="btn blue">가입</a>
					<a href="/" class="btn gray">취소</a>
				</div>

				</form>

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