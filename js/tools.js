var $_isDaum = (document.domain.indexOf("daum.net") > 0);
//var $_cropDomain = ($_isDaum ? 'http://job2.careernet.co.kr' : 'http://hkpartner.career.co.kr');
var $_cropDomain = ($_isDaum ? 'http://job2.careernet.co.kr' : window.location.protocol + "//" + window.location.hostname);
var $_isPopup = (document.location.toString().indexOf('/my/resume/photo_write.asp')>0);

String.prototype.trim = function() {
	return this.replace(/^\s*|\s*$/g, '');
}

String.prototype.getbytes = function () {
	var str = this;
	// 입력받은 문자열을 escape() 를 이용하여 변환한다.
	// 변환한 문자열 중 유니코드(한글 등)는 공통적으로 %uxxxx로 변환된다.
	var temp_estr = escape(str);
	var s_index   = 0;
	var e_index   = 0;
	var temp_str  = "";
	var cnt       = 0;

	// 문자열 중에서 유니코드를 찾아 제거하면서 갯수를 센다.
	while ((e_index = temp_estr.indexOf("%u", s_index)) >= 0)  // 제거할 문자열이 존재한다면
	{
		temp_str += temp_estr.substring(s_index, e_index);
		s_index = e_index + 6;
		cnt ++;
	}

	temp_str += temp_estr.substring(s_index);
	temp_str = unescape(temp_str);  // 원래 문자열로 바꾼다.

	// 유니코드는 2바이트 씩 계산하고 나머지는 1바이트씩 계산한다.
	return ((cnt * 2) + temp_str.length) + "";
}


/*
*	다음 취업센터 개인정보제공동의여부 체크
*/
function fn_agree_chk_daum() {
	$.get("/wwwconf/include/tools/ajax_daum_agree_chk.asp?dummy=" + Math.random()*99999, function(data) {
		var json = eval( "(" + data + ")" );
		if(json.ret_val==1) {
		} else if (json.ret_val==-1) {
			// alert('본 서비스를 이용하기 위해서는 개인회원 로그인이 필요합니다.\n로그인 후 이용해 주시기 바랍니다.');
		} else {
			// alert('먼저 개인정보 제공동의를 해주시기 바랍니다.');
		}
		$("#daum_agree").val(json.ret_val);
	});
}


/*
*	로그인 이동
*/
function fn_login_daum() {
	if($_isDaum) {
		location.href = "http://login.daum.net/accounts/loginform.do?url=" + encodeURIComponent(document.location);
	}
}

function fn_login_redirect() {
	if($_isPopup) {
		if(opener!=null && typeof(opener)!='unknown') {
			opener.location.href = "/my/";
		} else {
			var newWin = window.open("/my/");
			if(newWin==null) {
				alert('팝업이 차단되었습니다.\n팝업차단을 해제하고 다시 시도해주시기 바랍니다.');
			}
		}
		self.close();
	} else {
		if($_isDaum) {
			location.href = "http://login.daum.net/accounts/loginform.do?url=" + encodeURIComponent(document.location);
		} else {
			location.href = "/my/login.asp?redir=" + encodeURIComponent(document.location);
		}
	}
}


/*
*	로그인 validate
*/
function fn_login_validate(formobj){

    formobj = formobj || document.toolsLoginForm;
	formobj.logtype.value = "1";
	
	if(formobj.id.value.split(" ").join("") == "") {
		alert('아이디를 입력해 주세요.');
		formobj.id.focus();
		return false;
	}
	if(formobj.pw.value.split(" ").join("") == "") {
		alert('비밀번호를 입력해 주세요.');
		formobj.pw.focus();
		return false;
	}
	
	if(formobj.loginchk.value != "0") {
		alert("본 서비스는 개인회원 로그인이 필요한 서비스입니다.");
	}
	
    if(formobj.logtype.value=="1") {
        //보안접속
        if (formobj.ssl.checked)	{
            saveSSL('p_ssl');
            formobj.action ="https://login.career.co.kr/career/my/login_check.asp";
        }
        else {
            unSaveSSL('p_ssl');
            formobj.action ="http://login.career.co.kr/career/my/login_check.asp";
        }
        //아이디저장
        if (formobj.save_id.checked)	{
            saveID('save_id', formobj.id.value);
			saveID("save_grade", formobj.logtype.value);
        }
        else {
            unSaveID('save_id', formobj.id.value);
			unSaveID("save_grade", formobj.logtype.value);
        }
    }

}

function setType(logtype) {
    document.toolsLoginForm.logtype.value=logtype;
}

/*
*	초기 호출 함수 (로그인,메뉴관련)
*/
var $_menu_num = "1";
function fn_load() {
	if(document.toolsLoginForm) {
	    if (document.domain.indexOf("career.co.kr") > 0) {
			SaveIdCheck_new2(document.toolsLoginForm.save_id, document.toolsLoginForm.id, 'save_id', 'save_comid');
			sslSaveCheck_new(document.toolsLoginForm.ssl, 'p_ssl');
        }

        // 아이디 저장시 아이디랑 글자 아이디 중복으로 보이는 부분 처리
        if (document.toolsLoginForm.save_id.value == "on") {
            $("#toolsLoginForm input[type=text]").removeClass("idoff").addClass("ion");
        }
		
		if($("#toolsLoginForm input[type=text]").val()!="") {
			$("#toolsLoginForm input[type=text]").removeClass("inputOn").addClass("ion");
		}
		
		$("#toolsLoginForm input[type=text]").bind("focus",function() {
			$(this).removeClass("idoff").addClass("ion");
		}).bind("blur",function() {
			if($(this).val()=="") {
				$(this).removeClass("ion").addClass("idoff");
			}
		});
		
		$("#toolsLoginForm input[type=password]").bind("focus",function() {
			$(this).removeClass("pwoff").addClass("ion");
		}).bind("blur",function() {
			if($(this).val()=="") {
				$(this).removeClass("ion").addClass("pwoff");
			}
		});
	}
	
	$("#tools_gnb ul li a img").each(function() {
		var imgsrc = $(this).attr("src");
		var menunum = $(this).attr("menunum");
		$(this).attr("src", (menunum == $_menu_num) ? imgsrc.replace("_off.gif","_on.gif") : imgsrc.replace("_on.gif","_off.gif"));
	});
}
