$(document).ready(function () {

    $("#hp_num").bind("keyup keydown", function () {
        phoneFomatter(this);
    });

    $("#hp_num_biz").bind("keyup keydown", function () {
        phoneFomatter(this);
    });

});

function fieldChk_new(msg, f) {
    alert(msg);
    var off = $(f).offset();
    $('html, body').animate({
        scrollTop: off.top
    }, 200);
	$(f).focus();
}

//숫자만 입력
function numkeyCheck(e) {
    var keyValue = event.keyCode;
    if ((keyValue >= 48) && (keyValue <= 57)) {
        return true;
    } else {
        alert('숫자만 입력 가능합니다.');
        return false;
    }
}

// 전화번호 자릿수
function phoneFomatter(obj) {
    var formatNum = $(obj).val();
    formatNum = formatNum.replace(/-/gi, "");

    if (formatNum.length == 11) {
        formatNum = formatNum.replace(/([0-9]{3})([0-9]{4})([0-9]{4})/, "$1-$2-$3");;
    } else if (formatNum.length == 10) {
        if (formatNum.substring(0, 2) == '02') {
            formatNum = formatNum.replace(/(^02)([0-9]{4})([0-9]{4})/, "$1-$2-$3");;
        } else {
            formatNum = formatNum.replace(/([0-9]{3})([0-9]{3})([0-9]{4})/, "$1-$2-$3");;
        }
    } else {
        formatNum = formatNum.replace(/([0-9]{2})([0-9]{3})([0-9]{4})/, "$1-$2-$3");
    }

    $(obj).val(formatNum);
}

// 개인회원 아이디 찾기 =========================================================================================

// Email 인증 번호 전송
function fnAuthemail() {
    if ($("#emailAuthNumChk").val() == "4") {
        alert("인증이 완료되었습니다.");
        return;
    }

    $("#hd_idx").val("");

    var strEmail;
    if (Authchk_ing) {
        alert("처리중 입니다. 잠시만 기다려 주세요.");
    } else {
        $("#email").val($.trim($("#email").val()));
        $("#user_nm").val($.trim($("#user_nm").val()));

        if ($("#user_nm").val() == "") {
            alert("이름을 입력해 주세요.");
            $("#user_nm").focus();
            return;
        }  else {

            if ($("#email").val().length > 0) {
                var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
                if ($("#email").val().match(regExp) != null) {
                    strEmail = $("#email").val();
                } else {
                    alert('이메일을 정확하게 입력해 주세요.');
                    $("#email").focus();
                    return;
                }
            } else {
                alert("이메일을 입력해 주세요.");
                $("#email").focus();
                return;
            }
			
			$.ajax({
				type: "POST"
				, url: "/my/search/infoChk.asp"
				, data: {gubun: "User_E", user_nm: escape($("#user_nm").val()), email: strEmail }
				, dataType: "html"
				, async: true
				, success: function (data) {
					if (data != "1") {
						alert("회원정보가 맞지 않습니다. \n다시 입력해 주세요.");
						return false;
					}
					else {
						Authchk_ing = true;
						var strUrl = "https://app.career.co.kr/sms/career/Authentication";
						var parm = {};
						parm.authCode = "2";//sms:1 /email:2
						parm.authvalue = strEmail;  //email 주소
						parm.username = $.trim($("#user_nm").val()); //발송 고객 이름
						parm.sitename = $.trim($("#site_short_name").val()); //발송 제목(sms 발송시 자동 추가 됩니다.)
						parm.sitecode = "37"; //sitecode(꼭 해당 사이트 코드를 입력하세요) 발송 log 및 email 발송시 구분합니다.
						parm.memkind = "개인";
						parm.ip = $("#userIP").val(); //개인 IP 
						parm.callback = "jsonp_email_callback";
						$("#aEmail").text("인증번호 재전송");
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
				, error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert("code:"+XMLHttpRequest.textStatus+"\n"+"message:"+XMLHttpRequest.responseText+"\n"+"error:"+errorThrown);
				}
			});
        }
    }
}

//Result 처리는 이곳에서 합니다.
function jsonp_email_callback(data) {
    Authchk_ing = false;
    if ($.trim(data.result) == "true") {
        $("#emailAuthNumChk").val("1");

        $("#hd_idx").val(data.result_idx);
        alert("인증번호가 발송되었습니다.");
        $("#emailAuthNumber").val("");
        $("#emailAuthNumber").focus();
        $("#hd_kind").val("2");
    } else {
        $("#emailAuthNumChk").val("0");
        alert("인증번호 발송이 실패하였습니다."); 
    }
}


//SMS 인증 번호 전송
function fnAuthSms() {

    if ($("#mobileAuthNumChk").val() == "4") {
        alert("인증이 완료되었습니다.");
        return;
    }

    $("#hd_idx").val("");

    var strEmail;
    if (Authchk_ing) {
        alert("처리중 입니다. 잠시만 기다려 주세요.");
    } else {
		if ($("#user_nm").val() == "") {
			$("#ment_user_nm").text("이름을 입력해 주세요.");
			$("#ment_user_nm").show();
			$("#user_nm").focus();
            return;
        } else {
			$("#ment_user_nm").hide();
		}

		if ($("#hp_num").val() == "") {
			$("#ment_hp_num").text("휴대폰 번호를 입력해 주세요.");
			$("#ment_hp_num").show();
			$("#hp_num").focus();
			return;
		} else {
			$("#ment_hp_num").hide();
		}

		$.ajax({
			type: "POST"
			, url: "/my/search/infoChk.asp"
			, data: {gubun: "User_S", user_nm: escape($("#user_nm").val()), hp_num: $("#hp_num").val() }
			, dataType: "html"
			, async: true
			, success: function (data) {
				if (data != "1") {
					$("#ment_hp_num").text("회원정보가 맞지 않습니다. 다시 입력해 주세요.");
					$("#ment_hp_num").show();
					//alert("회원정보가 맞지 않습니다. \n다시 입력해주세요.");
					return false;
				} else {
					$("#ment_hp_num").hide();
					Authchk_ing = true;
					var strUrl = "https://app.career.co.kr/sms/career/Authentication";
					var parm = {};
					parm.authCode = "1";//sms:1 /email:2
					parm.authvalue = $("#hp_num").val(); //핸드폰 no( - 는 입력 해도 되고 안해도 됩니다.)
					parm.sitename = $.trim($("#site_short_name").val()); // sms 발송시 해당 내용으로 입력 됩니다.
					parm.sitecode = "37"; //sitecode(꼭 해당 사이트 코드를 입력하세요) 발송 log 및 email 발송시 구분합니다.
					parm.memkind = "개인";
					parm.ip = $("#userIP").val(); //개인 IP
					parm.callback = "jsonp_sms_callback";
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
			, error: function (XMLHttpRequest, textStatus, errorThrown) {
				alert("code:"+XMLHttpRequest.textStatus+"\n"+"message:"+XMLHttpRequest.responseText+"\n"+"error:"+errorThrown);
			}
		});
    }
}

//Result 처리는 이곳에서 합니다.
function jsonp_sms_callback(data) {
    Authchk_ing = false;

    if ($.trim(data.result) == "true") {
        $("#mobileAuthNumChk").val("1");
        $("#hp_count").show();
        fnDpFirst();
        fncDpTm(); //카운트

        $("#hd_idx").val(data.result_idx);
        alert("인증번호가 발송되었습니다.");
		$("#rsltAuthArea").show();	// 인증번호 입력란 활성화(아이디 찾기, 비밀번호 찾기)
        $("#mobileAuthNumber").val("");
        $("#mobileAuthNumber").focus();
        $("#hd_kind").val("1");
    } else {
        $("#hp_count").hide();
        $("#emailAuthNumChk").val("0");
        alert("인증번호 발송이 실패하였습니다."); 
    }
}

//인증번호 확인
function fnAuth() {
    if ($("#hd_kind").val() == "2" && $("#emailAuthNumChk").val() == "4") {
        alert("이미 인증이 완료되었습니다.");
        return;
    } else if ($("#hd_kind").val() == "1" && $("#mobileAuthNumChk").val() == "4") {
        alert("이미 인증이 완료되었습니다.");
        return;
    }
	
	if ($.trim($("#hd_idx").val()) == "") {
        if ($("#hd_kind").val() == "1") {
            $('#alertBox_sms').text("인증번호가 맞지 않습니다. 인증번호를 확인해 주세요.");
			$('#alertBox_sms').show();
        } else {
            $('#alertBox_email').text("인증번호가 맞지 않습니다. 인증번호를 확인해 주세요.");
			$('#alertBox_email').show();
        }
        return;
    } else {
		$('#alertBox_sms').hide();
	}

    $("#emailAuthNumber").val($.trim($("#emailAuthNumber").val()));
    $("#mobileAuthNumber").val($.trim($("#mobileAuthNumber").val()));

    if ($("#hd_kind").val() == "2") {
        if ($.trim($("#emailAuthNumber").val()) == "") {
			$("#alertBox_sms").text("인증번호를 입력해 주세요.");
			$("#alertBox_sms").show();
            $("#emailAuthNumber").focus();
            return;
        } else {
			$("#alertBox_sms").hide();
		}

    }

    var strUrl = "https://app.career.co.kr/sms/career/AuthenticationResult";
    var parms = {};

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
    parms.authCode = $("#hd_kind").val(); //sms:1 /email:2
    parms.authvalue = strAuthKey; //발송된 인증 KEY Value
    parms.idx = $("#hd_idx").val();//발송된 인증 번호
    parms.callback = "jsonp_result_callback";
    $.ajax({
        url: strUrl
			, dataType: "jsonp"
			, type: "post"
			, data: parms
			, success: function (data) {
			    alert("sccess : " + data.length);
			}
			, error: function (jqXHR, textStatus, errorThrown) {
			    //alert(textStatus + ", " + errorThrown);
			}
    });
}

function jsonp_result_callback(data) {
    if ($("#hd_kind").val() == "2") {
        if ($.trim(data.result_idx) == "Y") {
            $("#emailAuthNumChk").val("4");
            $("#alertBox_email").addClass('good').removeClass('bad');
            $('#alertBox_email').text("인증이 완료되었습니다.");
        } else {
            $("#emailAuthNumChk").val("3");
            $("#alertBox_email").addClass('bad').removeClass('good');
            $('#alertBox_email').text("인증번호가 맞지 않습니다. 인증번호를 확인해 주세요.");
        }
    } else if ($("#hd_kind").val() == "1") {
        if ($.trim(data.result_idx) == "Y") {
            $("#mobileAuthNumChk").val("4");
			$("#alertBox_sms").addClass('good').removeClass('bad');
			$('#alertBox_sms').text("인증이 완료되었습니다.");
			$('#alertBox_sms').show();
			$("#hp_count").hide();
			$("#ment_hp_num").hide();
        } else {
            $("#mobileAuthNumChk").val("3");
            $("#alertBox_sms").addClass('bad').removeClass('good');
            $('#alertBox_sms').text("인증번호가 맞지 않습니다. 인증번호를 확인해 주세요.");
			$('#alertBox_sms').show();
        }
    }
}
/* end */

// 기업회원 ======================================================================================


// Email 인증 번호 전송
function fnAuthemail_biz() {
    if ($("#emailAuthNumChk_biz").val() == "4") {
        alert("이미 인증이 완료되었습니다.");
        return;
    }

    $("#hd_idx_biz").val("");

    var strEmail;
    if (Authchk_ing) {
        alert("처리중 입니다. 잠시만 기다려주세요.");
    } else {
        $("#email_biz").val($.trim($("#email_biz").val()));
        $("#comp_nm").val($.trim($("#comp_nm").val()));

        if ($("#comp_num").val() == "") {
            alert("사업자등록번호를 입력해주세요.");
            $("#comp_num").focus();
            return;
        }

        if ($("#comp_nm").val() == "") {
            alert("이름을 입력해주세요.");
            $("#comp_nm").focus();
            return;
        } else {

            if ($("#email_biz").val().length > 0) {
                var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
                if ($("#email_biz").val().match(regExp) != null) {
                    strEmail = $("#email_biz").val();
                } else {
                    alert('이메일을 정확하게 입력해주세요.');
                    $("#email_biz").focus();
                    return;
                }
            } else {
                alert("이메일주소를 입력해주세요.");
                $("#email_biz").focus();
                return;
            }

			$.ajax({
				type: "POST"
				, url: "/my/search/infoChk.asp"
				, data: {gubun: "Biz_E", biz_num: $("#comp_num").val(), biz_nm: escape($("#comp_nm").val()), email: strEmail }
				, dataType: "html"
				, async: true
				, success: function (data) {
					if (data != "1") {
						alert("회원정보가 맞지 않습니다. \n다시 입력해 주세요.");
						return false;
					}
					else {
						Authchk_ing = true;
						var strUrl = "https://app.career.co.kr/sms/career/Authentication";
						var parm = {};
						parm.authCode = "2";//sms:1 /email:2
						parm.authvalue = strEmail;  //email 주소
						parm.username = $.trim($("#comp_nm").val()); //발송 고객 이름
						parm.sitename = "숙명여자대학교 비대면 Dream Festival"; //발송 제목(sms 발송시 자동 추가 됩니다.)
						parm.sitecode = "37"; //sitecode(꼭 해당 사이트 코드를 입력하세요) 발송 log 및 email 발송시 구분합니다.
						parm.memkind = "개인";
						parm.ip = ''; //개인 IP 
						parm.callback = "jsonp_email_biz_callback";
						$("#aEmail_biz").text("인증번호 재전송");
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
				, error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert("code:"+XMLHttpRequest.textStatus+"\n"+"message:"+XMLHttpRequest.responseText+"\n"+"error:"+errorThrown);
				}
			});
        }
    }
}

//Result 처리는 이곳에서 합니다.
function jsonp_email_biz_callback(data) {
    Authchk_ing = false;
    if ($.trim(data.result) == "true") {
        $("#emailAuthNumChk_biz").val("1");
        $("#hd_idx_biz").val(data.result_idx);
        alert("인증번호가 발송되었습니다.");
		$('#aEmail_bizNum').show();
        $("#emailAuthNumber_biz").val("");
        $("#emailAuthNumber_biz").focus();
        $("#hd_kind_biz").val("2");
    } else {
        $("#emailAuthNumChk_biz").val("0");
        alert("인증번호 발송이 실패하였습니다.");
    }
}


//SMS 인증 번호 전송
function fnAuthSms_biz() {
    if ($("#mobileAuthNumChk_biz").val() == "4") {
        alert("인증이 완료되었습니다.");
        return;
    }

    $("#hd_idx_biz").val("");

    var strEmail;
    if (Authchk_ing) {
        alert("처리중 입니다. 잠시만 기다려 주세요.");
    } else {

        if ($("#hp_num_biz").val() == "") {
            alert("휴대폰 번호를 입력해 주세요.");
            $("#hp_num_biz").focus();
            return;
        } else {
			$.ajax({
				type: "POST"
				, url: "/my/search/infoChk.asp"
				, data: {gubun: "Biz_S", biz_num: $("#comp_num").val(), biz_nm: escape($("#comp_nm").val()), hp_num: $("#hp_num_biz").val() }
				, dataType: "html"
				, async: true
				, success: function (data) {
					if (data != "1") {
						alert("회원정보가 맞지 않습니다. \n다시 입력해주세요.");
						return false;
					}
					else {
						Authchk_ing = true;
						var strUrl = "https://app.career.co.kr/sms/career/Authentication";
						var parm = {};
						parm.authCode = "1";//sms:1 /email:2
						parm.authvalue = $("#hp_num_biz").val(); //핸드폰 no( - 는 입력 해도 되고 안해도 됩니다.)
						parm.sitename = "숙명여자대학교 비대면 Dream Festival"; // sms 발송시 해당 내용으로 입력 됩니다.
						parm.sitecode = "37"; //sitecode(꼭 해당 사이트 코드를 입력하세요) 발송 log 및 email 발송시 구분합니다.
						parm.memkind = "개인";
						parm.ip = "" //$("#userIP").val(); //개인 IP
						parm.callback = "jsonp_sms_biz_callback";
						$("#aMobile_biz").text("인증번호 재전송");
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
				, error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert("code:"+XMLHttpRequest.textStatus+"\n"+"message:"+XMLHttpRequest.responseText+"\n"+"error:"+errorThrown);
				}
			});
        }
    }
}

//Result 처리는 이곳에서 합니다.
function jsonp_sms_biz_callback(data) {
    Authchk_ing = false;

    if ($.trim(data.result) == "true") {
        $("#mobileAuthNumChk_biz").val("1");
        $("#hp_count_biz").show();
        fnDpFirst();
        fncDpTm_biz(); //카운트

        $("#hd_idx_biz").val(data.result_idx);
        alert("인증번호가 발송되었습니다.");
        $("#mobileAuthNumber_biz").val("");
        $("#mobileAuthNumber_biz").focus();
        $("#hd_kind_biz").val("1");
    } else {
        $("#hp_count_biz").hide();
        $("#emailAuthNumChk_biz").val("0");
        alert("인증번호 발송이 실패하였습니다.");
    }
}

//인증번호 확인
function fnAuth_biz() {
    if ($("#hd_kind_biz").val() == "2" && $("#emailAuthNumChk_biz").val() == "4") {
        alert("이미 인증이 완료되었습니다.");
        return;

    } else if ($("#hd_kind_biz").val() == "1" && $("#mobileAuthNumChk_biz").val() == "4") {
        alert("이미 인증이 완료되었습니다.");
        return;

    } else if ($.trim($("#hd_idx_biz").val()) == "") {
        if ($("#hd_kind_biz").val() == "1") {
            $('#alertBox_sms_biz').text("인증번호가 맞지 않습니다. 인증번호를 확인해 주세요.");
        } else {
            $('#alertBox_email_biz').text("인증번호가 맞지 않습니다. 인증번호를 확인해 주세요.");
        }
        return;
    }

    $("#emailAuthNumber_biz").val($.trim($("#emailAuthNumber_biz").val()));
    $("#mobileAuthNumber_biz").val($.trim($("#mobileAuthNumber_biz").val()));

    if ($("#hd_kind_biz").val() == "2") {
        if ($.trim($("#emailAuthNumber_biz").val()) == "") {
            alert("인증번호를 입력해 주세요.");
            $("#emailAuthNumber_biz").focus();
            return;
        }
    } else if ($("#hd_kind_biz").val() == "1") {
        if ($.trim($("#mobileAuthNumber_biz").val()) == "") {
            alert("인증번호를 입력해 주세요.");
            $("#mobileAuthNumber_biz").focus();
            return;
        }
    }

    var strUrl = "https://app.career.co.kr/sms/career/AuthenticationResult";
    var parms = {};

    var strAuthKey = "";
    if ($("#hd_kind_biz").val() == "2") {
        strAuthKey = $("#emailAuthNumber_biz").val();
    } else if ($("#hd_kind_biz").val() == "1") {
        strAuthKey = $("#mobileAuthNumber_biz").val();
    } else {
        return;
    }

    if ($.trim($("#hd_idx_biz").val()) == "" || ($.trim($("#emailAuthNumber_biz").val()) == "" && $.trim($("#mobileAuthNumber_biz").val()) == "")) {
        return;
    }
    parms.authCode = $("#hd_kind_biz").val(); //sms:1 /email:2
    parms.authvalue = strAuthKey; //발송된 인증 KEY Value
    parms.idx = $("#hd_idx_biz").val();//발송된 인증 번호
    parms.callback = "jsonp_result_biz_callback";
    $.ajax({
        url: strUrl
			, dataType: "jsonp"
			, type: "post"
			, data: parms
			, success: function (data) {
			    //alert("sccess : " + data.length);
			}
			, error: function (jqXHR, textStatus, errorThrown) {
			    //alert(textStatus + ", " + errorThrown);
			}
    });
}

function jsonp_result_biz_callback(data) {
    if ($("#hd_kind_biz").val() == "2") {
        if ($.trim(data.result_idx) == "Y") {
            $("#emailAuthNumChk_biz").val("4");
            $("#alertBox_email_biz").addClass('good').removeClass('bad');
            $('#alertBox_email_biz').text("인증이 완료되었습니다.");
        } else {
            $("#emailAuthNumChk_biz").val("3");
            $("#alertBox_email_biz").addClass('bad').removeClass('good');
            $('#alertBox_email_biz').text("인증번호가 맞지 않습니다. 인증번호를 확인해 주세요.");
        }
    } else if ($("#hd_kind_biz").val() == "1") {
        if ($.trim(data.result_idx) == "Y") {
            $("#mobileAuthNumChk_biz").val("4");
            $("#alertBox_sms_biz").addClass('good').removeClass('bad');
            $('#alertBox_sms_biz').text("인증이 완료되었습니다.");
            $("#hp_count_biz").hide();
        } else {
            $("#mobileAuthNumChk_biz").val("3");
            $("#alertBox_sms_biz").addClass('bad').removeClass('good');
            $('#alertBox_sms_biz').text("인증번호가 맞지 않습니다. 인증번호를 확인해 주세요.");
        }
    }
}

// ======================================================================================

var emailchk_ing = false;
var Authchk_ing = false;

var min = 60;
var sec = 60;
var ctm; // 표시 시간
var inputtime = 3;//입력분
var tstop;//타이머 정지

Number.prototype.dptm = function () { return this < 10 ? '0' + this : this; } //분에 "0" 넣기

function fnDpFirst() {
    clearTimeout(tstop);
    ctm = sec * inputtime;
}

function fncDpTm() {
    var cmi = Math.floor((ctm % (min * sec)) / sec).dptm();
    var csc = Math.floor(ctm % sec).dptm();
    $("#hp_count").text('(' + cmi + ' : ' + csc + ")");
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

function fncDpTm_biz() {
    var cmi = Math.floor((ctm % (min * sec)) / sec).dptm();
    var csc = Math.floor(ctm % sec).dptm();
    $("#hp_count_biz").text('(' + cmi + ' : ' + csc + ")");
    if ((ctm--) <= 0) {
        ctm = sec * inputtime;
        clearTimeout(tstop);
        //재전송버튼
        //인증시간 초과 meassage
    }
    else {
        tstop = setTimeout("fncDpTm_biz()", 1000);
    }
}

// ====================================================================================

function onSubmit_ID(gubun) {
    var AuthValue = '';

    if (gubun == 'USER') {
		
        if ($('#user_nm').val() == '') {
			$("#ment_user_nm").text("이름을 입력해 주세요.");
			$("#ment_user_nm").show();
			$("#user_nm").focus();
            return;
        } else {
			$("#ment_user_nm").hide();
		}

		AuthValue = $('#hp_num').val();		
		
		if (AuthValue==""){	
			$("#ment_hp_num").text("휴대폰번호를 입력해 주세요.");
			$("#ment_hp_num").show();
			$("#hp_num").focus();
			return;
		} else {
			if ($("#mobileAuthNumChk").val() != "4") {
				alert("휴대폰번호를 인증해 주세요.");
				$("#ment_hp_num").text("휴대폰번호를 인증해 주세요.");
				$("#ment_hp_num").show();
				return;
			} else {
				$("#ment_hp_num").hide();
			}
		}
		
		/*
		if ($("#hd_kind").val() == "1" && $("#mobileAuthNumChk").val() == "4") {
			AuthValue = $('#hp_num').val();
			$("#alertBox_sms").hide();
		} else if ($("#hd_kind").val() == "2" && $("#emailAuthNumChk").val() == "4") {
			AuthValue = $('#email').val();
		} else {
			$("#alertBox_sms").text("인증되지 않았습니다.");
			$("#alertBox_sms").show();
			return;
		}
		*/

        $.ajax({
            type: "POST"
            , url: "/my/search/searchID_find.asp"
            , data: { user_nm: $("#user_nm").val(), authType: $('#hd_kind').val(), AuthValue: AuthValue }
			//, data: { user_nm: $("#user_nm").val(), authType: '2', AuthValue: 'dblee@career.co.kr' }
            , dataType: "html"
            , async: true
            , success: function (data) {
//				console.log(data);
				var result = data.split("|");
				if (result[0] == "1") {
					$("#result_id").val(result[1]);
					$("#result_date").val(result[2]);
					
					$("#frm").attr("action", "/my/search/searchID_result.asp");
					$("#frm").submit();
				} else {
					alert("일치하는 회원이 없습니다.");					
				}
            }
            , error: function (XMLHttpRequest, textStatus, errorThrown) {
               alert("에러가 발생하였습니다.\n" + XMLHttpRequest.responseText);
            }
        });
    } else if (gubun == 'Biz') {

        if ($("#comp_num").val() == "") {
            alert('사업자 등록번호를 입력해 주세요.');
            return;
        }

        if ($('#comp_nm').val() == '') {
            fieldChk_new("이름을 입력해 주세요.", $("#comp_nm"));
            return;
        }

        if ($("#hd_kind_biz").val() == "1" && $("#mobileAuthNumChk_biz").val() == "4") {
            AuthValue = $('#hp_num_biz').val();
        } else if ($("#hd_kind_biz").val() == "2" && $("#emailAuthNumChk_biz").val() == "4") {
            AuthValue = $('#email_biz').val();
        } else {
            alert('인증되지 않았습니다.');
            return;
        }

        $.ajax({
            type: "POST"
            , url: "/company/search/searchID_find.asp"
            , data: { comp_type : $('#comp_type').val(), comp_num: $("#comp_num").val(), comp_nm: $("#comp_nm").val(), authType: $('#hd_kind_biz').val(), AuthValue: AuthValue }
			//, data: { comp_type : $('#comp_type').val(), comp_num: $("#comp_num").val(), comp_nm: $("#comp_nm").val(), authType: '2', AuthValue: 'dblee@career.co.kr' }
            , dataType: "html"
            , async: true
            , success: function (data) {
                //displayFnc('#addInfoComp', 'block');
				fn_pop_show();
                $('#compid_list').html(data);
            }
            , error: function (XMLHttpRequest, textStatus, errorThrown) {
                //console.log(XMLHttpRequest.responseText);
            }
        });
    }
}

function onSubmit_PW(gubun) {
    var AuthValue = '';
    var user_id = '';

    if (gubun == 'USER') {
        if ($('#user_id').val() == '') {
			$("#ment_user_id").text("아이디를 입력해 주세요.");
			$("#ment_user_id").show();
			$("#user_id").focus();
            return;
        } else {
			$("#ment_user_id").hide();
		}

        user_id = $('#user_id').val() + '_wk';

        if ($('#user_nm').val() == '') {
			$("#ment_user_nm").text("이름을 입력해 주세요.");
			$("#ment_user_nm").show();
			$("#user_nm").focus();
            return;
        }

		if ($("#hd_kind").val() == "1" && $("#mobileAuthNumChk").val() == "4") {
			AuthValue = $('#hp_num').val();
		} else if ($("#hd_kind").val() == "2" && $("#emailAuthNumChk").val() == "4") {
			AuthValue = $('#email').val();
		} else {
			alert('휴대폰번호를 인증해 주세요.');
			return;
		}

		$.ajax({
			type: "POST"
			, url: "/my/search/searchPW_find.asp"
			, data: { user_nm: $("#user_nm").val(), authType: $('#hd_kind').val(), AuthValue: AuthValue, user_id: user_id, idxNum: $('#hd_idx').val() }
			, dataType: "html"
			, async: true
			, success: function (data) {
				if (data.trim() != '') {
					$.ajax({
					   type: "POST"
					   , url: "/my/search/searchPW_find_authchk.asp"
					   , data: { authType: $('#hd_kind').val(), AuthNumber: $('#hd_idx').val(), user_id: user_id }
					   , dataType: "html"
					   , async: true
					   , success: function (data) {
							console.log("2차인증 : " + data);
							if (data.trim() != '') {

								$("#result_id").val(user_id);
								$("#result_auth_type").val($('#hd_kind').val());
								$("#result_auth_value").val($('#hd_idx').val());
								
								$("#frm").attr("action", "/my/search/searchPW_setpw.asp");
								$("#frm").submit();

							} else {
								alert('인증되지 않은 정보입니다.');
							}
					   }
					   , error: function (XMLHttpRequest, textStatus, errorThrown) {
						   //console.log(XMLHttpRequest.responseText);
					   }
					});

			   } else {
				   alert('등록된 정보가 없습니다.');
			   }
		   }
		   , error: function (XMLHttpRequest, textStatus, errorThrown) {
			   //console.log(XMLHttpRequest.responseText);
		   }
		});
    } else if (gubun == 'Biz') {
        if ($("#comp_num").val() == "") {
            fieldChk_new('사업자 등록번호를 입력해 주세요.', $("#comp_num"));
            return;
        }

        if ($("#com_id").val() == "") {
            fieldChk_new('아이디를 입력해 주세요.', $("#com_id"));
            return;
        }

        if ($('#comp_nm').val() == '') {
            fieldChk_new("이름을 입력해 주세요.", $("#comp_nm"));
            return;
        }

        if ($("#hd_kind_biz").val() == "1" && $("#mobileAuthNumChk_biz").val() == "4") {
            AuthValue = $('#hp_num_biz').val();
        } else if ($("#hd_kind_biz").val() == "2" && $("#emailAuthNumChk_biz").val() == "4") {
            AuthValue = $('#email_biz').val();
        } else {
            alert('인증되지 않았습니다.');
            return;
        }

        $.ajax({
            type: "POST"
            , url: "/company/search/searchPW_find.asp"
            , data: { com_type: $('#comp_type').val(), comp_num: $("#comp_num").val(), comp_nm: $("#comp_nm").val(), authType: $('#hd_kind_biz').val(), AuthValue: AuthValue, com_id: $('#com_id').val() }
			//, data: { com_type: $('#comp_type').val(), comp_num: $("#comp_num").val(), comp_nm: $("#comp_nm").val(), authType: '2', AuthValue: 'dblee@career.co.kr', com_id: $('#com_id').val() }
            , dataType: "html"
            , async: true
            , success: function (data) {
                //displayFnc('#addInfoComp', 'block');
				fn_pop_show();
                $('#compid_list').html(data);
            }
            , error: function (XMLHttpRequest, textStatus, errorThrown) {
                //console.log(XMLHttpRequest.responseText);
            }
        });
    }
}

function PW_Modify(gubun) {
    var authValue, authType, user_id;

    if (gubun == 'USER') {
		/*
        if ($("#hd_kind").val() == "1" && $("#mobileAuthNumChk").val() == "4") {
            authValue = $('#hp_num').val();
            authType = "1";
        } else if ($("#hd_kind").val() == "2" && $("#emailAuthNumChk").val() == "4") {
            authValue = $('#email').val();
            authType = "0";
        } else {
            alert('인증되지 않았습니다.');
            return;
        }
		*/
		
		user_id		= $('#user_id').val();
		authType	= $('#authType').val();
		authValue	= $('#authValue').val();

        if ($('#new_pw1').val().length == 0) {
			$("#ment_new_pw1").text("비밀번호를 입력해 주세요.");
			$("#ment_new_pw1").show();
			$("#new_pw1").focus();
            return;
        } else {
			$("#ment_new_pw1").hide();
		}
		
		if (!Validchar($('#new_pw1').val(), num + alpha + etc)) {
			$("#ment_new_pw1").text("사용할 수 없는 비밀번호입니다.");
			$("#ment_new_pw1").show();
			$("#new_pw1").focus();
            return;
        } else {
			$("#ment_new_pw1").hide();
        }

		var pwdChk = new PwdChecker();
		if (!pwdChk.mainProgress($("#user_id").val(), $('#new_pw1').val())) {
			return;
		}


		if ($('#new_pw2').val().split(" ").join("") == "") {
			$("#ment_new_pw2").text("비밀번호 확인을 입력해 주세요.");
			$("#ment_new_pw2").show();
			$("#new_pw2").focus();
            return;
        } else {
			$("#ment_new_pw2").hide();
		}	
		
		if ($('#new_pw1').val() != $('#new_pw2').val()) {
			/*$("#ment_new_pw2").text("비밀번호가 일치하지 않습니다.");
			$("#ment_new_pw2").show();*/
			alert("비밀번호가 일치하지 않습니다.");
			$("#new_pw2").focus();
            return;
        } else {
			$("#ment_new_pw2").hide();
		}

        $.ajax({
            type: "POST"
            , url: "/my/search/searchPW_update.asp"
            , data: { authType: authType, authValue: authValue, user_id: user_id, user_pw: $('#new_pw1').val() }
            , dataType: "html"
            , async: true
            , success: function (data) {				
                alert("비밀번호가 변경되었습니다.\n로그인 페이지로 이동합니다.");
                location.href = '/my/login.asp';
            }
            , error: function (XMLHttpRequest, textStatus, errorThrown) {
                //console.log(XMLHttpRequest.responseText);
            }
        });
    } else if (gubun == 'Biz') {

        if ($("#hd_kind_biz").val() == "1" && $("#mobileAuthNumChk_biz").val() == "4") {
            authValue = $('#hp_num_biz').val();
        } else if ($("#hd_kind_biz").val() == "2" && $("#emailAuthNumChk_biz").val() == "4") {
            authValue = $('#email_biz').val();
        } else {
            alert('인증되지 않았습니다.');
            return;
        }

        if ($('#new_pw1_biz').val().length == 0) {
            alert('비밀번호를 입력해 주세요.');
            return;
        } else if (!Validchar($('#new_pw1_biz').val(), num + alpha + etc)) {
            alert("사용할 수 없는 비밀번호입니다.");
            return;
        } else {
            var pwdChk = new PwdChecker();
            if (!pwdChk.mainProgress($("#com_id").val(), $('#new_pw1_biz').val())) {
                return;
            }
        }

        if ($('#new_pw2_biz').val().split(" ").join("") == "") {
            alert("비밀번호 확인을 입력해 주세요.");
            return;
        } else if ($('#new_pw1_biz').val() != $('#new_pw2_biz').val()) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        $.ajax({
            type: "POST"
            , url: "/company/search/searchPW_update.asp"
            , data: { type: $('#comp_type').val(), com_id : $('#com_id').val(), newpw: $('#new_pw1_biz').val() }
            , dataType: "html"
            , async: true
            , success: function (data) {
                if (data.trim() == '1') {
                    alert("비밀번호가 변경되었습니다.\n\n로그인 페이지로 이동합니다.");
                    location.href = '/company/login.asp';
                } 
            }
            , error: function (XMLHttpRequest, textStatus, errorThrown) {
                //console.log(XMLHttpRequest.responseText);
            }
        });
    }
}

// 비밀번호 유효성 검사 ================================================================================================

var pwdMsg = "입력하신 비밀번호가 보안상 매우 취약합니다.\n8~32자까지 영문, 숫자, 특수문자 등의 조합으로\n아이디와 무관한 문자열을 입력해주세요.";
var blockWord = new Array();
blockWord.push("dfdf");
blockWord.push("asdf");
blockWord.push("123123");

PwdChecker = function () {
}

PwdChecker.prototype.mainProgress = function (id, pw) {
    if (pw.length < 8 || pw.length > 32) {
		$("#ment_new_pw1").text("비밀번호는 8~32자 까지만 허용됩니다.");
		$("#ment_new_pw1").show();
		$("#new_pw1").focus();
        return false;
    } else {
		$("#ment_new_pw1").hide();
	}

    if (!pw.match(/([a-zA-Z].*[0-9].*[!,@,#,$,%,^,&,*,?,_,~])|([!,@,#,$,%,^,&,*,?,_,~].*[0-9].*[a-zA-Z])/)) {
		$("#ment_new_pw1").text("비밀번호는 영문,숫자,특수문자의 조합이어야 합니다.");
		$("#ment_new_pw1").show();
		$("#new_pw1").focus();
        return false;
    } else {
		$("#ment_new_pw1").hide();
	}

    if (!this.step1Check(id, pw)
		|| !this.step2Check(pw)
		|| !this.step3Check(pw)
		|| !this.step4Check(id, pw)) {
		$("#ment_new_pw1").text("사용할 수 없는 비밀번호입니다.");
		$("#ment_new_pw1").show();
		$("#new_pw1").focus();
        return false;
    } else {
		$("#ment_new_pw1").hide();
		return true;
    }
}

//ID와 일치성 검사
PwdChecker.prototype.step1Check = function (id, pw) {
    if (id.indexOf(pw) != -1) {
        return false;
    }
    if (pw.indexOf(id) != -1) {
        return false;
    }
    return true;
}

//연속성의 문자 및 금지어 검사
PwdChecker.prototype.step2Check = function (pw) {
	 var cnt = 0;
	 var cnt2 = 0;
	 var tmp = "";
	 var tmp2 = "";
	 var tmp3 = "";

	 for(i=0; i<pw.length; i++) {
		 tmp = pw.charAt(i);
		 tmp2 = pw.charAt(i+1);
		 tmp3 = pw.charAt(i+2);
		 
		 if(tmp.charCodeAt(0) - tmp2.charCodeAt(0) == 1 && tmp2.charCodeAt(0) - tmp3.charCodeAt(0) == 1) {
			 cnt = cnt + 1;
		 }
		 
		 if(tmp.charCodeAt(0) - tmp2.charCodeAt(0) == -1 && tmp2.charCodeAt(0) - tmp3.charCodeAt(0) == -1) {
			 cnt2 = cnt2 + 1;
		 }
	 }

	 if(cnt > 0 || cnt2 > 0) {
		 return false;
	 }else {
		 return true;
	 }

	 for (var i = 0; i < blockWord.length; i++) {
        if (pw.indexOf(blockWord[i]) != -1) {
            return false;
        }
	 }
}

//동일한 앞,뒤 문자가 4개 이상여부 검사
PwdChecker.prototype.step3Check = function (pw) {
    var cnt = 1;
    for (var i = 0; i < pw.length - 1; i++) {
        if (this.compare3(pw, i)) {
            ++cnt;
        } else {
            cnt = 1;
        }
        if (cnt > 3) {
            return false;
        }
    }
    return true;
}

//패스워드가 아이디에 포함 단어여부 검사
PwdChecker.prototype.step4Check = function (id, pw) {
    return this.compare4(pw, 0, id, 0);
}

PwdChecker.prototype.compare3 = function (pw, i) {
    return pw.charAt(i) == pw.charAt(i + 1);
}

PwdChecker.prototype.compare4 = function (pw, i, id, j) {
    if (i >= pw.length) return false;
    var _pw = pw.charAt(i);
    var _id = id.substring(j);
    var k = _id.indexOf(_pw);
    if (k == -1) return true;
    return this.compare4(pw, i + 1, id, k + 1);
}

// 문자 체크
var num = "0123456789";
var alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var etc = "-_.!@#$%^&*?~";

function Validchar(g, str) {
    for (var i = 0; i < g.length; i++) {
        if (str.indexOf(g.charAt(i)) == -1)
            return false;
    }
    return true;
}