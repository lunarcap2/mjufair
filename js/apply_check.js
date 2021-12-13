/* =================================================================
*
*	입사지원 개편 (201201 : HJ Yoon,aragorn@career.co.kr)
*
================================================================= */
var _injectStr = [
	"select ",
	" union ",
	"execute xp_",
	"execute sp_",
	"exec xp_",
	"exec sp_",
	" openrowset",
	"drop ",
	"truncate ",
	"insert ",
	"update ",
	" cast ",
	"declare ",
	"convert ",
	"<script",
	"<iframe"
];

String.prototype.trim = function () {
    return this.replace(/^\s*|\s*$/g, '');
}

String.prototype.getbytes = function () {
    var str = this;
    // 입력받은 문자열을 escape() 를 이용하여 변환한다.
    // 변환한 문자열 중 유니코드(한글 등)는 공통적으로 %uxxxx로 변환된다.
    var temp_estr = escape(str);
    var s_index = 0;
    var e_index = 0;
    var temp_str = "";
    var cnt = 0;

    // 문자열 중에서 유니코드를 찾아 제거하면서 갯수를 센다.
    while ((e_index = temp_estr.indexOf("%u", s_index)) >= 0)  // 제거할 문자열이 존재한다면
    {
        temp_str += temp_estr.substring(s_index, e_index);
        s_index = e_index + 6;
        cnt++;
    }

    temp_str += temp_estr.substring(s_index);
    temp_str = unescape(temp_str);  // 원래 문자열로 바꾼다.

    // 유니코드는 2바이트 씩 계산하고 나머지는 1바이트씩 계산한다.
    return ((cnt * 2) + temp_str.length) + "";
}

String.prototype.cutbytes = function (len) {
    var str = this;
    var l = 0;
    for (var i = 0; i < str.length; i++) {
        l += (str.charCodeAt(i) > 128) ? 2 : 1;
        if (l > len) return str.substring(0, i);
    }
    return str;
}

String.prototype.chkinjection = function () {
    var str = this;
    var bool = false;
    var chkstr = '';
    for (i = 0; i < _injectStr.length; i++) {
        bool = (str.indexOf(_injectStr[i]) != -1);
        if (bool) {
            chkstr = _injectStr[i];
            break;
        }
    }
    return chkstr;
}

var StringBuffer = function () {
    var buffer = [];

    this.append = function (string) {
        buffer.push(string);
        return this;
    };

    this.toString = function () {
        return buffer.join('');
    };
}

$.fn.clearForm = function () {
    return this.each(function () {
        var type = this.type, tag = this.tagName.toLowerCase();
        if (tag == 'form')
            return $(':input', this).clearForm();
        if (type == 'text' || type == 'password' || tag == 'textarea')
            this.value = '';
        else if (type == 'checkbox' || type == 'radio')
            this.checked = false;
        else if (tag == 'select')
            this.selectedIndex = -1;
    });
};

/*
*	숫자만 입력되도록
*/
function fn_chk_numeric(obj) {
    var str = $(obj).val();
    var var_normalize = /[^\d$]/gi;

    if (var_normalize.test(str)) {
        alert("숫자만 입력하실 수 있습니다.");
        $(obj).val(str.replace(var_normalize, ""));
        return false;
    } else {
        return true;
    }
}

/*
*	영문만 입력되도록
*/
function fn_chk_english(obj) {
    var str = $(obj).val();
    var var_normalize = /[^A-Za-z*(\s?A-Za-z)$]/gi;

    if (var_normalize.test(str)) {
        alert("영문 및 공백만 입력하실 수 있습니다.");
        $(obj).val(str.replace(var_normalize, ""));
        return false;
    } else {
        return true;
    }
}

/*
*	숫자 및 소수점만 입력되도록
*/
function fn_chk_numeric_point(obj) {
    var str = $(obj).val();
    var var_normalize = /[^\d*(\.?\d*)$]/gi;

    if (var_normalize.test(str)) {
        alert("숫자와 소수점만 입력하실 수 있습니다.");
        $(obj).val(str.replace(var_normalize, ""));
        return false;
    } else {
        return true;
    }
}

/*
*	보안문자열 입력 체크
*/
function fn_chk_injection(obj) {
    var chkstr = $(obj).val().chkinjection();
    if (chkstr != '') {
        alert('보안 문자열 [' + chkstr + ']을 포함하였습니다.\n해당 문자열을 수정하여 주시기 바랍니다.');
        $(obj).val($(obj).val().substring(0, $(obj).val().length - 1));
    }
}

/*
*	textarea 입력 바이트 체크
*/
function fn_chk_bytes(obj, limit) {
    obj = obj || null;
    limit = limit || 200;

    if (obj == null) return;

    if ($(obj).val().getbytes() > limit) {
        alert('최대 ' + limit + 'byte까지 입력할 수 있습니다.');
        obj.value = obj.value.cutbytes(limit);
        obj.focus();
        return false;
    }
}

/*
*	채용공고제목 플래시
*/
function flashTitleWrite(url, w, h, vars, win, alt) {
    var id = url.split("/")[url.split("/").length - 1].split(".")[0];
    if (vars == null) vars = '';
    if (win == null) win = 'opaque';

    if (w.indexOf('%') == -1) w += 'px';
    if (h.indexOf('%') == -1) h += 'px';

    var objStr = "<object ";

    if (navigator.appName.match("Internet Explorer")) {
        objStr += "classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0'";
    } else {
        objStr += "type='application/x-shockwave-flash' data='" + url + "' ";
    }
    objStr += " id='" + id + "' style='width:" + w + "; height:" + h + ";'>\n"
			+ "	<param name='base' value='.' />\n"
			+ "	<param name='showLiveConnect' value='true' />\n"
			+ "	<param name='allowScriptAccess' value='always' />\n"
			+ "	<param name='wmode' value='transparent' />\n"
			+ "	<param name='movie' value='" + url + "' />\n"
			+ "	<param name='FlashVars' value='" + vars + "' />\n"
			+ "	<param name='wmode' value='" + win + "' />\n"
			+ "	<param name='menu' value='false' />\n"
			+ "	<param name='quality' value='high' />\n"
			+ "	<p>" + alt + "</p>\n"
			+ "</object>\n";

    // return objStr;
    document.write(objStr);
}

function setSalaryAmt(obj) {
    obj = obj || null;
    if (obj == null) return;
    if (obj.value == '') return;

    _frm1.salary_amt.length = 1;
    var selBox = (obj.value == '1') ? _frm1.salary1 : _frm1.salary2;

    for (var i = 1; i < selBox.length; i++)
        _frm1.salary_amt.options.add(new Option(selBox.options[i].text, selBox.options[i].value));
}

function setSalary(cancel) {
    if (cancel) {
        _frm1.salary_sel[0].selected = true;
        _frm1.salary_amt[0].selected = true;
        setSalaryAmt(_frm1.salary_sel);
        _frm1.salary_type[0].checked = false;
        _frm1.salary_type[1].checked = false;
        _frm1.salary_sel.disabled = false;
        _frm1.salary_amt.disabled = false;
    } else {
        _frm1.salary_sel.disabled = true;
        _frm1.salary_amt.disabled = true;
    }
}

function setSalaryVal(val) {
    val = val || '';
    _frm1.new_salary.value = val;
}

/*
*	경력여부 체크
*/
function setExperience(bool) {
    if (bool) {
        _frm1.experience_year.disabled = false;
        _frm1.experience_month.disabled = false;
    } else {
        _frm1.experience_year.value = '';
        _frm1.experience_month.value = '';
        _frm1.experience_year.disabled = true;
        _frm1.experience_month.disabled = true;
    }
}

/*
*	파일 체크박스
*/
function fn_chk_all(bool) {
    $('tbody#fileListBody').find('input:checkbox[name=regFile]').attr('checked', bool);
}

/*
*	파일명 노출
*/
function fn_setFile(obj) {
    obj = obj || null;
    if (obj == null) return;

    var filepath = obj.value;
    var arr = filepath.split('\\');

    if (arr.length > 0) {
        document.fileSendForm.file_name.value = arr[arr.length - 1];
    } else {
        document.fileSendForm.file_name.value = obj.value;
    }
}

function fn_setFile2(obj) {
    obj = obj || null;
    if (obj == null) return;

    var filepath = obj.value;
    var arr = filepath.split('\\');

    if (arr.length > 0) {
        document.fileSendForm2.file_name.value = arr[arr.length - 1];
    } else {
        document.fileSendForm2.file_name.value = obj.value;
    }
    fn_upload2();
}

/*
*	파일 업로드
*/
function fn_upload() {
    var formobj = document.fileSendForm;
    if (formobj.file_type.value == '') {
        alert('[구분]을 선택해 주십시오.');
        formobj.file_type.focus();
        return;
    }
    if (formobj.file_name.value.trim() == '') {
        alert('[파일]을 등록해 주십시오.');
        return;
    }
    formobj.submit();
}

// 자유양식 업로드
function fn_upload2() {
    var formobj = document.fileSendForm2;
    if (formobj.file_type.value == '') {
        alert('[구분]을 선택해 주십시오.');
        formobj.file_type.focus();
        return;
    }
    if (formobj.file_name.value.trim() == '') {
        alert('[파일]을 등록해 주십시오.');
        return;
    }
    formobj.submit();
}

/*
*	파일 리스트 삭제
*/
function fn_file_delete(btnobj) {
    btnobj = btnobj || null;
    if (btnobj == null) return;

    if (!confirm('삭제하시겠습니까?')) return;

    $(btnobj).parents('table').find('#fileListFoot').css('display', ($('tbody#fileListBody').find('tr').length <= 1 ? '' : 'none'));
    $(btnobj).parents('tr').remove();
}

/*
*	form validate
*/

function fn_chkForm_init(formobj) {
    formobj = formobj || _frm1;

    if (formobj.id == 'appSendForm') 
	{
        var vappmethod = formobj.appmethod.value; // 입사지원방식 (C:온라인,D:이메일)
        var vappformtype = formobj.appformtype.value; // 입사지원양식
        var vappnomem = eval(formobj.appnomem.value.toLowerCase()); // 비회원

        with (formobj) 
		{
            if (typeof (mojip_sel) != 'undefined')
			{
                if ($("#mojip_sel").val() == "") {
                    /*
                    alert('[지원 부문]을 선택해 주십시오.');
                    $("#mojip_sel").focus();
                    return false;
                    */
                }
            }

            if ($('div.selects').length > 0) {	// 레이어 모집
                if (mojip.value == '') {
                    alert('[지원 부문]을 선택해 주십시오._1');
                    return false;
                }
            }

            return true;
        }
    }
}

function fn_chkForm(formobj) {
    formobj = formobj || _frm1;

    if (formobj.id == 'appSendForm') {
        var vappmethod = formobj.appmethod.value; // 입사지원방식 (C:온라인,D:이메일)
        var vappformtype = formobj.appformtype.value; // 입사지원양식
        var vappnomem = eval(formobj.appnomem.value.toLowerCase()); // 비회원

        with (formobj) {
            

            if (typeof (mojip_sel) != 'undefined') {
                if ($("#mojip_sel").val() == "") {
                    alert('[지원 부문]을 선택해 주십시오.');
                    $("#mojip_sel").focus();
                    return false;
                }
            }

            if ($('div.selects').length > 0) {	// 레이어 모집
                if (mojip.value == '') {
                    alert('[지원 부문]을 선택해 주십시오.');
                    return false;
                }
            }

            

            if (!(vappformtype == 'A' || vappformtype == 'D')) 
			{	// 커리어 양식이 아닐 경우
                

                if ($('input:checkbox[name=regFile]:checked').length == 0) 
				{
                    alert('지원할 이력서를 첨부해 주세요.');
                    if (vappformtype == 'C' || vappformtype == 'F') 
					{
                        $("#uploadFile2").focus();
                    } else if (vappformtype == 'B' || vappformtype == 'E') {
                        $("#uploadFile1").focus();
                    }
                    return false;
                } else {
                    var chkcnt = 0;
                    $('input:checkbox[name=regFile]:checked').each(function (idx, item) {
                        var filetypeval = $(this).parents('tr').find('select[name=regFileType] option:selected').val();
                        if (filetypeval == '') {
                            chkcnt++;
                            alert('파일의 [구분]을 선택해 주십시오.');
                            $(this).parents('tr').find('select[name=regFileType]').focus();
                            return false;
                        }
                    });
                    if (chkcnt > 0) return false;
                }

                if($.trim($("#l_title").val()) == "")
				{
                    alert('입사지원 제목을 입력해 주십시오.');
                    $("#l_title").focus();
                    return false;
                }
				
				if($.trim($("#l_title").val()) != "")
				{
					$("#input_title").val($("#l_title").val()); // 2014-12-15 남승미 추가
				}
                
            } 
			else 
			{
                var ridval = rid.value;
                if (ridval == '' || ridval == '0') {
					alert("이력서를 선택해 주십시오.");
                    return false;
                }
                if ($('input:checkbox[name=regFile]:checked').length > 0) {
                    var chkcnt = 0;
                    $('input:checkbox[name=regFile]:checked').each(function (idx, item) {
                        var filetypeval = $(this).parents('tr').find('select[name=regFileType] option:selected').val();
                        if (filetypeval == '') {
                            chkcnt++;
                            alert('파일의 [구분]을 선택해 주십시오.');
                            $(this).parents('tr').find('select[name=regFileType]').focus();
                            return false;
                        }
                    });
                    if (chkcnt > 0) return false;
                }
            }


            if (l_name.value.trim() == '') {
                if (l_name.type == 'text') {
                    alert('이름을 입력해 주십시오.');
                    l_name.focus();
                    return false;
                } else {
                    alert('회원 정보가 정확하지 않습니다.'); // 로그인 한 회원이름을 못 가져올 경우 (어떻게 할지??)
                    return false;
                }
            }
            if (vappnomem) {
                if (l_sex.value == '') {
                    alert('성별을 선택해 주십시오.');
                    l_sex.focus();
                    return false;
                }
                gender.value = l_sex.value;
                if (birth_year.value == '') {
                    alert('출생년도를 선택해 주십시오.');
                    birth_year.focus();
                    return false;
                }
            }



            /*
            if(user_cell1.value=='') {
            alert('휴대폰 번호를 입력해 주십시오.');
            user_cell1.focus();
            return false;
            }
            if(user_cell2.value.trim()=='') {
            alert('휴대폰 번호를 입력해 주십시오.');
            user_cell2.focus();
            return false;
            }
            if(user_cell3.value.trim()=='') {
            alert('휴대폰 번호를 입력해 주십시오.');
            user_cell3.focus();
            return false;
            }
            */

            l_hp.value = user_cell1.value + '-' + user_cell2.value.trim() + '-' + user_cell3.value.trim();

            if (email1.value.trim() == '') {
                alert('e-메일을 입력해 주십시오.');
                email1.focus();
                return false;
            }
            if (email2.value.trim() == '') {
                alert('e-메일 계정을 입력해 주십시오.');
                email2.focus();
                return false;
            }
            l_email.value = email1.value.trim() + '@' + email2.value.trim();


			if (user_cell_flag.checked && email_flag.checked) {
				alert('휴대폰, e-메일 중 한개는 공개로 설정하셔야 합니다.');
				return false;
			}

            /* 기획 추가할때까지 주석
            if (vappformtype != 'A' && vappformtype != 'D') {	// 커리어 양식이 아닐 경우
                if ($('input:radio[name=final_school]:checked').length == 0) {
                    alert('최종학력을 선택해 주십시오.');
                    final_school[0].focus();
                    return false;
                }
                if ($('input:radio[name=experience_flag]:checked').length == 0) {
                    alert('총 경력을 선택해 주십시오.');
                    experience_flag[0].focus();
                    return false;
                } else {
                    if (experience_flag[1].checked) {
                        if (experience_year.value == '') {
                            alert('총 경력을 선택해 주십시오.');
                            experience_year.focus();
                            return false;
                        }
                        if (experience_month.value == '') {
                            alert('총 경력을 선택해 주십시오.');
                            experience_month.focus();
                            return false;
                        }
                    }
                }
                var salarySelCnt = 0;
                if (salary_sel.disabled) {
                    salarySelCnt = checkCnt(salary_type, true);
                } else {
                    if (trim(salary_sel.value) && trim(salary_amt.value))
                        salarySelCnt = 1;
                }
                if (salarySelCnt == 0) {
                    alert('[희망급여]를 선택해 주세요.');
                    return false;
                }
            }
            */

            if (vappnomem) {
                if (info_agree.checked == false) {
                    alert('개인정보 수집 및 이용에 대한 동의를 해주시기 바랍니다.');
                    info_agree.focus();
                    return false;
                }
            }
            
        }

        // 선택한 파일 정보
        var fileval = '';
        $('input:checkbox[name=regFile]:checked').each(function (idx, item) 
		{
            var parentobj = $(this).parent();
            fileval += (fileval == '' ? '' : ':');
            
			parentobj.find('input:hidden').each(function (iidx, iitem) 
			{
                if (iidx != 0) fileval += (fileval == '' || fileval.substr(fileval.length - 1) == ':' ? '' : '|') + iitem.value;
            });

            fileval += '|' + parentobj.find('select[name=regFileType] option:selected').val();
        });


        formobj.filelist.value = fileval;

		console.log(fileval);


    } else if (formobj.id == 'fileSendForm') {
        return false;
    }

    return true;
}
