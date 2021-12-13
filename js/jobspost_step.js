//채용제목과 동일
function chk_jobtitleSame() {
    if ($('input[name=jobtitleSame]').prop('checked')) {
        $('#task').val($('#guin_title').val());
    }
}

//연봉, 월급 셀렉트박스
function onSalary(idx) {

    $("select[name=salary_month]").attr("disabled", false);
    $("select[name=salary_annual]").attr("disabled", false);

    if ($('#salary1:checked').val() == idx) {
        $('#vsalary_annual').show();
        $('#vsalary_month').hide();
        $('input[name="salary_annual1"]').removeAttr('checked').parent('label').removeClass('on');

        $("select[name=salary_month]").val(0);
        $("select[name=salary_month]").parent().find('span').html('범위선택');
        //$("select[name=salary_month]").attr("disabled", false);

        $("input[name=salary_txt]").val('');
        $("input[name=salary_txt]").hide();

    } else {
        $('#vsalary_annual').hide();
        $('#vsalary_month').show();
        $('input[name="salary_annual1"]').removeAttr('checked').parent('label').removeClass('on');

        $("select[name=salary_annual]").val(0);
        $("select[name=salary_annual]").parent().find('span').html('범위선택');
        //$("select[name=salary_annual]").attr("disabled", false);

        $("input[name=salary_txt]").val('');
        $("input[name=salary_txt]").hide();
    }
}

//급여 서브 선택시에 연봉, 월급 범위 선택되지 않게
function onSalary_annual1(obj) {
    if ($(obj).attr('checked')) {

        //$('input[name="salary_sel"]').removeAttr('checked').parent('label').removeClass('on');
        $('#vsalary_annual, #vsalary_month').hide();

        $("select[name=salary_annual]").val(0);
        $("select[name=salary_annual]").parent().find('span').html('범위선택');
        //$("select[name=salary_annual]").attr("disabled", true);

        $("select[name=salary_month]").val(0);
        $("select[name=salary_month]").parent().find('span').html('범위선택');
        //$("select[name=salary_month]").attr("disabled", true);

        $("input[name=salary_txt]").val('');
        $("input[name=salary_txt]").hide('');
    }
}

//급여조건 선택 초기화
function reset_salary_annual() {
    $("input[name=salary_sel]").each(function () {
        $(this).prop('checked', false);
        $(this).parent().addClass('off').removeClass('on');
    });

    $("select[name=salary_annual]").val(0);
    $("select[name=salary_annual]").parent().find('span').html('범위선택');
    $("select[name=salary_annual]").attr("disabled", false);
    $('#vsalary_annual').hide();

    $("select[name=salary_month]").val(0);
    $("select[name=salary_month]").parent().find('span').html('범위선택');
    $("select[name=salary_month]").attr("disabled", false);
    $('#vsalary_month').hide();

    $("input[name=salary_txt]").val('');
    $("input[name=salary_txt]").hide();

    $("input[name=salary_annual1]").each(function () {
        $(this).prop('checked', false);
        $(this).parent().addClass('off').removeClass('on');
    });
}

//교대근무 초기화
function reset_sltWorkShift2() {
    $("input[name=sltWorkShift2]").each(function () {
        $(this).prop('checked', false);
        $(this).parent().addClass('off').removeClass('on');
    });
}

// 체크박스 갯수제한
function chk_count(obj, gubun, count) {
    if (gubun == 'Grade') { //직급, 직책
        if ($('input[type=checkbox][name=chk_classlevel]:checked').length + $('input[type=checkbox][name=chk_duty]:checked').length > count) {
            alert(count + '개이상 선택하실 수 없습니다.');
            $(obj).attr("checked", false);
            return;
        }
    } else if (gubun == 'worktype') { //고용형태
        //기존 - 대체인력 채크시에 다른 체크박스 선택 안됨.

        if ($(obj).val() == '15') {
            if ($("input[name=worktype][value=15]:checked").length == 1) {

                //대체인력 이외의 모두 체크 풀기
                $("input[type=checkbox][name=worktype]").each(function () {
                    $(this).attr("disabled", true);
                    $(this).attr("checked", false);
                    $(this).parent().removeClass('on');
                    displayFnc($(this), 'checkId');
                });

                $(obj).attr("disabled", false);
                $(obj).attr("checked", true);
            } else {
                $("input[type=checkbox][name=worktype]").each(function () {
                    $(this).attr("disabled", false);
                });
            }
        }

        if ($('input[type=checkbox][name=' + gubun + ']:checked').length > count) {
            alert(count + '개이상 선택하실 수 없습니다.');
            $(obj).attr("checked", false);
            return;
        } else {
            displayFnc($(obj), 'checkId');
        }
    } else {
        if ($('input[type=checkbox][name=' + gubun + ']:checked').length > count) {
            alert(count + '개이상 선택하실 수 없습니다.');
            $(obj).attr("checked", false);
            return;
        }
    }
}

//레이어 선택
function layer_ok(gubun, name) {
    var list = "", arrcode = "", arrword = "";

    if (gubun == 'grade') { //직급, 직책
        $("input[type=checkbox][name=chk_classlevel]:checked").each(function () {
            list = list + '<li> ' + $(this).next().html();
            list = list + ' <input type="hidden" name="classlevel" value="' + $(this).val() + '">';
            list = list + ' <button type="button" class="btn deleteS" onclick="chk_del(this);">삭제</button>';
            list = list + '</li>';
        });

        $("input[type=checkbox][name=chk_duty]:checked").each(function () {
            list = list + '<li> ' + $(this).next().html();
            list = list + ' <input type="hidden" name="duty" value="' + $(this).val() + '">';
            list = list + ' <button type="button" class="btn deleteS" onclick="chk_del(this);">삭제</button>';
            list = list + '</li>';
        });
    } else if (gubun == 'ct') { //업종
        $("input[name=ctt]").each(function () {
            var arr = $(this).val().split('|');
            list = list + '<li><span>' + arr[0];
            list = list + ' <span class="arr">&gt;</span>' + arr[1];
            list = list + ' <span class="arr">&gt;</span>' + arr[2] + '</span>';
            list = list + ' <input type="hidden" name="ct_code" value="' + arr[3] + '">';
            list = list + ' <input type="hidden" name="ct_name" value="' + arr[2] + '">';
            list = list + ' <input type="hidden" name="ct_list" value="' + $(this).val() + '">';
            list = list + ' <button type="button" class="btn deleteS" onclick="chk_del(this);">삭제</button>';
            list = list + '</li>';

            arrcode = arrcode + arr[3].trim() + ",";
            arrword = arrword + arr[2].trim() + ",";
        });

        if (arrcode.length > 0) {
            arrcode = arrcode.substring(0, arrcode.length - 1);
            arrword = arrword.substring(0, arrword.length - 1);
        }

        list = list + '<input type="hidden" name="ctCode" value="' + arrcode + '">';
        list = list + '<input type="hidden" name="ctKeyword" value="' + arrword + '">';

        /*
        $("input[type=checkbox][name=" + name + "]:checked").each(function () {
            list = list + '<li><span>' + $("input[type=checkbox][name=ct]:checked").next().html();
            list = list + ' <span class="arr">&gt;</span>' + $("input[type=checkbox][name=ct2]:checked").next().html();
            list = list + ' <span class="arr">&gt;</span>' + $(this).next().html() + '</span>';
            list = list + ' <input type="hidden" name="ctCode" value="' + $(this).val() + '">';
            list = list + ' <input type="hidden" name="ctKeyword" value="' + $(this).next().html() + '">';
            list = list + ' <button type="button" class="btn deleteS" onclick="chk_del(this);">삭제</button>';
            list = list + '</li>';
        });*/
    } else if (gubun == 'jc') { //직종
        $("input[name=jcc]").each(function () {
            var arr = $(this).val().split('|');
            list = list + '<li><span>' + arr[0];
            list = list + ' <span class="arr">&gt;</span>' + arr[1];
            list = list + ' <span class="arr">&gt;</span>' + arr[2] + '</span>';
            list = list + ' <input type="hidden" name="jc_code" value="' + arr[3] + '">';
            list = list + ' <input type="hidden" name="jc_name" value="' + arr[2] + '">';
            list = list + ' <input type="hidden" name="jc_list" value="' + $(this).val() + '">';
            list = list + ' <button type="button" class="btn deleteS" onclick="chk_del(this);">삭제</button>';
            list = list + '</li>';

            arrcode = arrcode + arr[3].trim() + ",";
            arrword = arrword + arr[2].trim() + ",";
        });

        if (arrcode.length > 0) {
            arrcode = arrcode.substring(0, arrcode.length - 1);
            arrword = arrword.substring(0, arrword.length - 1);
        }

        list = list + '<input type="hidden" name="jcCode" value="' + arrcode + '">';
        list = list + '<input type="hidden" name="jcKeyword" value="' + arrword + '">';

    } else if (gubun == 'favor') { //우대사항
        $("input[type=checkbox][name=Special]:checked").each(function () {
            list = list + '<li> ' + $(this).next().next().html();
            list = list + ' <input type="hidden" name="Special_Subcode" value="' + $(this).val() + '">';
            list = list + ' <input type="hidden" name="Special_Maincode" value="' + $(this).next().val() + '">';
            list = list + ' <button type="button" class="btn deleteS" onclick="chk_del(this);">삭제</button>';
            list = list + '</li>';

            arrcode = arrcode + $(this).next().val() + "|" + $(this).val() + ",";
        });

        if (arrcode.length > 0) {
            arrcode = arrcode.substring(0, arrcode.length - 1);
        }
        list = list + '<input type="hidden" name="Special_code" value="' + arrcode + '">';

    } else if (gubun == 'welfare') { //복리후생
        $("input[type=checkbox][name=" + name + "]:checked").each(function () {
            list = list + '<li> ' + $(this).next().next().html();
            list = list + ' <input type="hidden" name="' + name + '_Subcode" value="' + $(this).val() + '">';
            list = list + ' <input type="hidden" name="' + name + '_Maincode" value="' + $(this).next().val() + '">';
            list = list + ' <button type="button" class="btn deleteS" onclick="chk_del(this);">삭제</button>';
            list = list + '</li>';

            arrcode = arrcode + $(this).next().val() + "|" + $(this).val() + ",";
        });

        if (arrcode.length > 0) {
            arrcode = arrcode.substring(0, arrcode.length - 1);
        }
        list = list + '<input type="hidden" name="welfare_code" value="' + arrcode + '">';
    }

    // 직접입력이 있는 경우 
    /*
    if (gubun == 'favor' || gubun == 'welfare') {
        if ( $('#direct'+gubun).val() != '') {
            list = list + '<li> ' + $('#direct' + gubun).val()
            list = list + ' <input type="hidden" name="direct' + gubun + '" value="' + $('#direct' + gubun).val() + '">';
            list = list + ' <button type="button" class="btn deleteS" onclick="chk_direct_del(this);">삭제</button>';
            list = list + '</li>';
        }
    }
    */

    $('#' + gubun + '_list').html(list);
    $('#' + gubun + '_div').fadeOut(200);
    $('body').css('overflow', '');
}

//체크 리스트 삭제
function chk_del(obj) {
    var cname = $(obj).parent().find('input[type=hidden]').attr('name');
    var cval = $(obj).parent().find('input[type=hidden]').val();
    var arrcode = "", arrword = "";

    if (cname == 'jc_code') { //직종
        chk_layer('layerDuty2');
        $("input[name=jcc]").each(function () {
            if ($(this).val().indexOf(cval) > -1) {
                $(this).remove();
            } else {
                var arr = $(this).val().split('|');
                arrcode = arrcode + arr[3].trim() + ",";
                arrword = arrword + arr[2].trim() + ",";
            }
        });

        if (arrcode.length > 0) {
            arrcode = arrcode.substring(0, arrcode.length - 1);
            arrword = arrword.substring(0, arrword.length - 1);
        }

        $('input[name=jcCode]').val(arrcode);
        $('input[name=jcKeyword]').val(arrword);

        $("input[type=checkbox][name=jc3]:checked").each(function () {
            if (cval == $(this).val()) {
                $(this).parent().removeClass('on').addClass('off');
                $(this).attr("checked", false);
            }
        });
        $(obj).parent().remove();

    } else if (cname == 'ct_code') { //업종
        chk_layer('layerDuty1');
        $("input[name=ctt]").each(function () {
            if ($(this).val().indexOf(cval) > -1) {
                $(this).remove();
            } else {
                var arr = $(this).val().split('|');
                arrcode = arrcode + arr[3].trim() + ",";
                arrword = arrword + arr[2].trim() + ",";
            }
        });

        if (arrcode.length > 0) {
            arrcode = arrcode.substring(0, arrcode.length - 1);
            arrword = arrword.substring(0, arrword.length - 1);
        }

        $('input[name=ctCode]').val(arrcode);
        $('input[name=ctKeyword]').val(arrword);

        $("input[type=checkbox][name=ct3]:checked").each(function () {
            if (cval == $(this).val()) {
                $(this).parent().removeClass('on').addClass('off');
                $(this).attr("checked", false);
            }
        });
        $(obj).parent().remove();

        /*
        $("input[type=checkbox][name=ct3]:checked").each(function () {
            if (cval == $(this).val()) {
                $(this).parent().removeClass('on').addClass('off');
                $(this).attr("checked", false);               
            }
        });
        $(obj).parent().remove();
        */
    } else if (cname == 'classlevel' || cname == 'duty') { //직급직책
        chk_layer('layerGrade');
        $("input[type=checkbox][name=chk_" + cname + "]:checked").each(function () {
            if (cval == $(this).val()) {
                $(this).parent().removeClass('on').addClass('off');
                $(this).attr("checked", false);
                $(obj).parent().remove();
            }
        });

    } else if (cname == 'Special_Subcode') { //우대사항
        chk_layer('layerFavor');
        $("input[type=checkbox][name=Special]:checked").each(function () {
            if (cval == $(this).val()) {
                $(this).parent().removeClass('on').addClass('off');
                $(this).attr("checked", false);
                $(obj).parent().remove();
            } else { //대분류|코드
                arrcode = arrcode + $(this).next().val() + "|" + $(this).val() + ",";
            }
        });
        if (arrcode.length > 0) {
            arrcode = arrcode.substring(0, arrcode.length - 1);
        }
        $('input[name=Special_code]').val(arrcode);

    } else if (cname == 'welfare_Subcode') { //복리후생
        chk_layer('layerWelfare');

        $("input[type=checkbox][name=welfare]:checked").each(function () {
            if (cval == $(this).val()) {
                $(this).parent().removeClass('on').addClass('off');
                $(this).attr("checked", false);
                $(obj).parent().remove();
            } else { //대분류|코드
                arrcode = arrcode + $(this).next().val() + "|" + $(this).val() + ",";
            }
        });

        if (arrcode.length > 0) {
            arrcode = arrcode.substring(0, arrcode.length - 1);
        }
        $('input[name=welfare_code]').val(arrcode);
    }

    hasListFnc();
}

// 직접입력 삭제
function chk_direct_del(obj) {
    var cname = $(obj).parent().find('input[type=hidden]').attr('name');
    $('#' + cname).val('');
    $(obj).parent().remove();
}

// 어학능력
function ajax_code_langex(obj) {
    var cname = "langex"; //이름
    var CodeName = $(obj).val(); //키워드

    $.ajax({
        type: "POST"
        , url: "ajax_code"
        , data: { CodeName: CodeName, CodeGubun: cname }
        , dataType: "html"
        , async: true
        , success: function (data) {
            $(obj).parent().next().find('select').html(data);
            selectboxFnc();
        }
        , error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.responseText);
        }
    });
}

//코드명 검색
function ajax_code(obj) {
    var cname = $(obj).attr('name'); //이름
    var CodeName = $(obj).val(); //키워드

    if (CodeName.length > 0) {
        $.ajax({
            type: "POST"
            , url: "ajax_code"
            , data: { CodeName: CodeName, CodeGubun: cname }
            , dataType: "html"
            , async: true
            , success: function (data) {
                $(obj).parent().find('.autoHight').html(data);
            }
            , error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.responseText);
            }
        });
    }
}

// 코드 선택 자격증, 우대전공
function sel_code(obj) {
    var code = $(obj).parent().find('input[type=hidden]').val();
    var arr = code.split("|");
    var chk = 'N';

    if (arr[2] == 'license_name') { //자격증
        $('input[name=license_code]').each(function () {
            if ($(this).val() == arr[0]) {
                chk = 'Y';
                return false;
            }
        });

        if (chk == 'N') {
            $(obj).parent().parent().parent().parent().find('input[name=license_code]').val(arr[0]);
            $(obj).parent().parent().parent().parent().find('input[name=license_name]').val(arr[1]);
        } else {
            alert('같은 항목을 입력하실 수 없습니다.');
            return;
        }
    } else if (arr[2] == 'special_subject_text') { //우대전공
        $('input[name=special_subject]').each(function () {
            if ($(this).val() == arr[0]) {
                chk = 'Y';
                return false;
            }
        });

        if (chk == 'N') {
            $(obj).parent().parent().parent().parent().find('input[name=special_subject]').val(arr[0]);
            $(obj).parent().parent().parent().parent().find('input[name=special_subject_text]').val(arr[1]);
        } else {
            alert('같은 항목을 입력하실 수 없습니다.');
            return;
        }
    }
    $(obj).parent().parent().parent().parent().find('.autoHight').hide();
}

//업직종
function ajax_upjcList(obj) {
    var CodeGubun = $(obj).attr('name');
    var CodeName = $(obj).val();
    var jcList = '', ctList = '', arr = '', arr2 = '';

    if (CodeGubun.indexOf("jc") > -1 && $('input[name=jcc]').val() != undefined) { //이전에 선택된 내용 체크하기 위한 작업
        $("input[name=jcc]").each(function () {
            arr = $(this).val().split("|");
            jcList = jcList + arr[3] + ",";
        });
    }

    if (CodeGubun.indexOf("ct") > -1 && $('input[name=ctt]').val() != undefined) { //이전에 선택된 내용 체크하기 위한 작업
        $("input[name=ctt]").each(function () {
            arr = $(this).val().split("|");
            ctList = ctList + arr[3] + ",";
        });
    }

    $.ajax({
        type: "POST"
        , url: "ajax_upjcList"
        , data: { CodeName: CodeName, CodeGubun: CodeGubun }
        , dataType: "html"
        , async: true
        , success: function (data) {
            $('#' + CodeGubun + 'List').html(data);

            if (CodeGubun.indexOf("2") < 0) { // 1차일 경우, 키워드 초기화
                $('#' + CodeGubun + '2List').html('');
            }

            if (jcList != '') { //이전에 입력한 적이 있는 경우 (직종)
                arr2 = jcList.split(',');
                for (var i = 0; i < arr2.length; i++) {
                    $("input[name=jc]").each(function () {
                        if ($(this).val() == arr2[i].substring(0, 2)) {
                            $(this).prop("checked", true);
                            $(this).parent().addClass('on');
                        }
                    });

                    $("input[name=jc2]").each(function () {
                        if ($(this).val() == arr2[i].substring(0, 4)) {
                            $(this).prop("checked", true);
                            $(this).parent().addClass('on');
                        }
                    });

                    $("input[name=jc3]").each(function () {
                        if ($(this).val() == arr2[i]) {
                            $(this).prop("checked", true);
                            $(this).parent().addClass('on');
                        }
                    });
                }
            }

            if (ctList != '') { //이전에 입력한 적이 있는 경우 (직종)
                arr2 = ctList.split(',');
                for (var i = 0; i < arr2.length; i++) {
                    $("input[name=ct]").each(function () {
                        if ($(this).val() == arr2[i].substring(0, 2)) {
                            $(this).prop("checked", true);
                            $(this).parent().addClass('on');
                        }
                    });

                    $("input[name=ct2]").each(function () {
                        if ($(this).val() == arr2[i].substring(0, 4)) {
                            $(this).prop("checked", true);
                            $(this).parent().addClass('on');
                        }
                    });

                    $("input[name=ct3]").each(function () {
                        if ($(this).val() == arr2[i]) {
                            $(this).prop("checked", true);
                            $(this).parent().addClass('on');
                        }
                    });
                }
            }
            checkboxFnc();
        }
        , error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.responseText);
        }
    });
}

//업종 불러오기
/* 2017-12-06 주석
function ajax_upjcListLoad(CodeGubun, CodeName) {
    $.ajax({
        type: "POST"
        , url: "ajax_upjcList"
        , data: { CodeName: CodeName, CodeGubun: CodeGubun }
        , dataType: "html"
        , async: true
        , success: function (data) {
            $('#' + CodeGubun + 'List').html(data);

            if (CodeGubun == 'ct') {
                $("input[name=ct2]").each(function () {
                    $(this).prop("checked", false);
                    $(this).parent().removeClass('on');

                    if ($('input[name=ctCode]').val() != undefined) {
                        if ($(this).val() == $('input[name=ctCode]').val().substring(0, 4)) {
                            $(this).prop("checked", true);
                            $(this).parent().addClass('on');
                        }
                    }
                });
            } else if (CodeGubun == 'ct2') {
                $("input[name=ct3]").each(function () {
                    $(this).prop("checked", false);
                    $(this).parent().removeClass('on');
                    if ($('input[name=ctCode]').val() != undefined) {
                        if ($(this).val() == $('input[name=ctCode]').val()) {
                            $(this).prop("checked", true);
                            $(this).parent().addClass('on');
                        }
                    }
                });
            }
            checkboxFnc();
        }
        , error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.responseText);
        }
    });
}
*/

// 3차 키워드 선택 - 직종
function chk_jc(obj) {
    var list = '';

    if ($(obj).prop('checked')) {
        if ($("input[name=jcc]").length < 10) {
            list = list + '<input type="hidden" name="jcc" value="' + $('input[name=jc][value=' + $(obj).val().substring(0, 2) + ']').next().html() + "|";
            list = list + $('input[name=jc2][value=' + $(obj).val().substring(0, 4) + ']').next().html() + "|";
            list = list + $(obj).next().html() + "|";
            list = list + $(obj).val() + '">';

            $('#jcchkList').append(list);
        } else {
            alert('10개 이상 선택하실 수 없습니다.');
            $(obj).prop('checked', false);
        }
    } else {
        $("input[name=jcc]").each(function () {
            if ($(this).val().indexOf($(obj).val()) > -1) {
                $(this).remove();
            }
        });
    }
}

// 3차 키워드 선택 - 업종 2017-12-06
function chk_ct(obj) {
    var list = '';

    if ($(obj).prop('checked')) {
        if ($("input[name=ctt]").length < 10) {
            list = list + '<input type="hidden" name="ctt" value="' + $('input[name=ct][value=' + $(obj).val().substring(0, 2) + ']').next().html() + "|";
            list = list + $('input[name=ct2][value=' + $(obj).val().substring(0, 4) + ']').next().html() + "|";
            list = list + $(obj).next().html() + "|";
            list = list + $(obj).val() + '">';

            $('#ctchkList').append(list);
        } else {
            alert('10개 이상 선택하실 수 없습니다.');
            $(obj).prop('checked', false);
        }
    } else {
        $("input[name=ctt]").each(function () {
            if ($(this).val().indexOf($(obj).val()) > -1) {
                $(this).remove();
            }
        });
    }
}

// 업직종 초기화
function resetLayer(name) {
    $('#' + name + 'chkList').html('');
    $('#' + name + 'List').html('');
    $('#' + name + '2List').html('');
}

//지역선택
function ajax_acList(obj) {
    $.ajax({
        type: "POST"
        , url: "ajax_acList"
        , data: { val: $(obj).val() }
        , dataType: "html"
        , async: true
        , success: function (data) {
            //alert(data);
            data = '<option value="">구 선택</option>' + data;
            $(obj).parent().next().find('select').html(data);
            $(obj).parent().next().find('select').prev().html('구 선택');
        }
        , error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.responseText);
        }
    });
}

//전철선택
function ajax_sbList(obj) {
    var loc = '';

    if ($(obj).attr('name') != 'sw_a') { //지역 선택이 아닌 경우, 선택된 지역 뽑아오기
        loc = $(obj).parent().prev().find('select').val();
    }

    $.ajax({
        type: "POST"
        , url: "ajax_sbList"
        , data: { gubun: $(obj).attr('name'), val: $(obj).val(), loc: loc }
        , dataType: "html"
        , async: true
        , success: function (data) {
            //alert(data);
            $(obj).parent().next().find('select').html(data);

            if ($(obj).attr('name') == 'sw_a') { // 지역을 변경했을 경우, 하위 초기화
                $(obj).parent().next().find('select').prev().html('노선');
                $(obj).parent().next().next().find('select').prev().html('역명');
                $(obj).parent().next().next().find('select').html('<option value="">역명</option>');
            } else if ($(obj).attr('name') == 'sw_l') { //노선을 변경한 경우
                $(obj).parent().next().find('select').prev().html('역명');
            }
        }
        , error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.responseText);
        }
    });
}

// 셀렉트 중복체크
function chk_sel(obj) {
    var code = $(obj).attr('name');
    var chk = 0;

    $('select[name=' + $(obj).attr('name') + ']').each(function () {
        if ($(this).val() == $(obj).val()) {
            chk = chk + 1;
        }
    });

    if (chk > 1) {
        alert('중복으로 선택하실 수 없습니다.');
        $(obj).val('0');
        return;
    }
}

//접수기간
function chk_seldate(obj) {
    if ($(obj).prop('checked')) { //체크시 다른 내용 비활성화
        $('#closedate').attr("disabled", true);
        $('#closedate').next().attr("disabled", true);
        $('select[name=closetime]').attr("disabled", true);

        $("input[type=checkbox][name=seldate]").each(function () {
            $(this).prop("checked", false);
            $(this).parent().removeClass('on');
        });

        $(obj).prop('checked', true);
        $(this).parent().addClass('on');

    } else { //체크 해제시 활성화
        $('#closedate').attr("disabled", false);
        $('#closedate').next().attr("disabled", true);
        $('select[name=closetime]').attr("disabled", false);
    }
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

//선택초기화를 누른후 취소를 누르면 체크박스 모두 리셋되기 때문에 재체크
function chk_layer(idx) {
    var chk = '';

    if (idx == 'layerGrade') { //직급, 직책
        $('input[type=hidden][name=classlevel]').each(function () {
            chk = $(this).val();
            $("input[type=checkbox][name=chk_classlevel]").each(function () {
                if (chk == $(this).val()) {
                    $(this).parent().removeClass('off').addClass('on');
                    $(this).attr("checked", true);
                }
            });
        });

        $('input[type=hidden][name=duty]').each(function () {
            chk = $(this).val();
            $("input[type=checkbox][name=chk_duty]").each(function () {
                if (chk == $(this).val()) {
                    $(this).parent().removeClass('off').addClass('on');
                    $(this).attr("checked", true);
                }
            });
        });

    } else if (idx == 'layerFavor') { //우대사항
        $('input[type=hidden][name=Special_Subcode]').each(function () {
            chk = $(this).val();
            $("input[type=checkbox][name=Special]").each(function () {
                if (chk == $(this).val()) {
                    $(this).parent().removeClass('off').addClass('on');
                    $(this).attr("checked", true);
                }
            });
        });

        //직적입력의 경우
        if ($('input[name=directfavor]').val() != undefined) {
            $('#directfavor').val($('input[name=directfavor]').val());
        }

    } else if (idx == 'layerWelfare') {// 복리후생
        $('input[type=hidden][name=welfare_Subcode]').each(function () {
            chk = $(this).val();
            $("input[type=checkbox][name=welfare]").each(function () {
                if (chk == $(this).val()) {
                    $(this).parent().removeClass('off').addClass('on');
                    $(this).attr("checked", true);
                }
            });
        });

        //직적입력의 경우
        if ($('input[name=directwelfare]').val() != undefined) {
            $('#directwelfare').val($('input[name=directwelfare]').val());
        }

    } else if (idx == 'layerDuty1') { //업종
        var list = '', ctList = '', arr = '', arr2 = '';

        //입력된 내용 다시 넣어주기
        $("input[name=ct_list]").each(function () {
            list = list + '<input type="hidden" name="ctt" value="' + $(this).val() + '">';
            arr = $(this).val().split("|");
            ctList = ctList + arr[3] + ",";
        });
        $('#ctchkList').html(list);

        // 체크박스 초기화
        $("input[name=ct]").each(function () {
            $(this).prop("checked", false);
            $(this).parent().removeClass('on').addClass('off');
        });

        $("input[name=ct2]").each(function () {
            $(this).prop("checked", false);
            $(this).parent().removeClass('on').addClass('off');
        });

        $("input[name=ct3]").each(function () {
            $(this).prop("checked", false);
            $(this).parent().removeClass('on').addClass('off');
        });

        //값이 있는 경우 체크
        if (ctList != '') {
            arr2 = ctList.split(',');
            for (var i = 0; i < arr2.length; i++) {
                $("input[name=ct]").each(function () {
                    if ($(this).val() == arr2[i].substring(0, 2)) {
                        $(this).prop("checked", true);
                        $(this).parent().addClass('on');
                    }
                });

                $("input[name=ct2]").each(function () {
                    if ($(this).val() == arr2[i].substring(0, 4)) {
                        $(this).prop("checked", true);
                        $(this).parent().addClass('on');
                    }
                });

                $("input[name=ct3]").each(function () {
                    if ($(this).val() == arr2[i]) {
                        $(this).prop("checked", true);
                        $(this).parent().addClass('on');
                    }
                });
            }
        }

        /* 2017-12-06 업종 다중으로 변경하면서 주석
        if ($('input[name=ctCode]').val() != undefined) {
            //1차 업종 체크
            $("input[name=ct]").each(function (){
                $(this).prop("checked", false);
                $(this).parent().removeClass('on');

                if ($(this).val() == $('input[name=ctCode]').val().substring(0, 2)) {
                    $(this).prop("checked", true);
                    $(this).parent().addClass('on');
                }
            });
            
            //2, 3차
            ajax_upjcListLoad('ct', $('input[name=ctCode]').val().substring(0, 2));
            ajax_upjcListLoad('ct2', $('input[name=ctCode]').val().substring(0, 4));
        }
        */
    } else if (idx == 'layerDuty2') { //직종
        var list = '', jcList = '', arr = '', arr2 = '';

        //입력된 내용 다시 넣어주기
        $("input[name=jc_list]").each(function () {
            list = list + '<input type="hidden" name="jcc" value="' + $(this).val() + '">';
            arr = $(this).val().split("|");
            jcList = jcList + arr[3] + ",";
        });
        $('#jcchkList').html(list);


        // 체크박스 초기화
        $("input[name=jc]").each(function () {
            $(this).prop("checked", false);
            $(this).parent().removeClass('on').addClass('off');
        });

        $("input[name=jc2]").each(function () {
            $(this).prop("checked", false);
            $(this).parent().removeClass('on').addClass('off');
        });

        $("input[name=jc3]").each(function () {
            $(this).prop("checked", false);
            $(this).parent().removeClass('on').addClass('off');
        });

        //값이 있는 경우 체크
        if (jcList != '') {
            arr2 = jcList.split(',');
            for (var i = 0; i < arr2.length; i++) {
                $("input[name=jc]").each(function () {
                    if ($(this).val() == arr2[i].substring(0, 2)) {
                        $(this).prop("checked", true);
                        $(this).parent().addClass('on');
                    }
                });

                $("input[name=jc2]").each(function () {
                    if ($(this).val() == arr2[i].substring(0, 4)) {
                        $(this).prop("checked", true);
                        $(this).parent().addClass('on');
                    }
                });

                $("input[name=jc3]").each(function () {
                    if ($(this).val() == arr2[i]) {
                        $(this).prop("checked", true);
                        $(this).parent().addClass('on');
                    }
                });
            }
        }
    }
}

//지역, 직종 중복되지 않은 코드  
function chk_val(gubun) {
    var str = "";

    if (gubun == 'area') {
        $("select[name=areaCode1] option:selected").each(function () {
            if ($(this).val() != "" && str.indexOf($(this).val() + ',') < 0) {
                str += $(this).val() + ",";
            }
        });
        if (str.length > 0) {
            str = str.substring(0, str.length - 1);
        }
        $('input[name=areaList]').val(str);

    } else if (gubun == 'jc') {
        $("input[name=jc_code]").each(function () {
            if (str.indexOf($(this).val().substring(0, 4) + ',') < 0) {
                str += $(this).val().substring(0, 4) + ",";
            }
        });
        if (str.length > 0) {
            str = str.substring(0, str.length - 1);
        }
        $('input[name=jcCodeList]').val(str);
    } else if (gubun == 'ct') {
        $("input[name=ct_code]").each(function () {
            if (str.indexOf($(this).val().substring(0, 4) + ',') < 0) {
                str += $(this).val().substring(0, 4) + ",";
            }
        });
        if (str.length > 0) {
            str = str.substring(0, str.length - 1);
        }
        $('input[name=ctCodeList]').val(str);
    }
}

//폼 전송
function sendit() {

    //템플릿 넣어주기
    var edit = myeditor.outputBodyHTML();
    edit = edit.replace(/</g, "&lt;");
    edit = edit.replace(/>/g, "&gt;");
    $('#txtContents').val(edit);

    var checktxt = $("#guin_title").val() + $("#task").val() + $("#txtContents").val()

    $.ajax({
        type: "POST"
        , url: "/biz/jobpost/get_jobs_Forbidden"
        , data: { content: checktxt.trim() }
        , dataType: "html"
        , async: true
        , success: function (data) {
            if (data.trim() != "") {
                var alertMsg = "금지어:[" + data.trim() + "]가 포함된 내용은 등록 할 수 없습니다.";
                alert(alertMsg);
            } else {
                var chk = 0;

                //중복제거 
                chk_val('area');
                chk_val('jc');

                //템플릿 넣어주기
                var edit = myeditor.outputBodyHTML();
                edit = edit.replace(/</g, "&lt;");
                edit = edit.replace(/>/g, "&gt;");
                $('#txtContents').val(edit);

                //헤드헌팅, 기업설명이 있는 경우
                if ($('textarea[name=h_comtxt]').val() != undefined) {
                    var h_comtxt = $('textarea[name=h_comtxt]').val();
                    h_comtxt = h_comtxt.replace(/<br\/>/ig, "\n");
                    h_comtxt = h_comtxt.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
                    $('textarea[name=h_comtxt]').val(h_comtxt);
                }

                if ($('#guin_title').val() == '') {
                    alert('채용제목을 입력해주세요.');
                    $('#guin_title').focus();
                    return;
                }

                //채용제목과 동일한 경우 
                if ($('input[name=jobtitleSame]').prop('checked')) {
                    $('#task').val($('#guin_title').val());
                }

                if ($('#task').val() == '') {
                    alert('담당업무를 입력해주세요.');
                    $('#task').focus();
                    return;
                }

                if ($("input[name=worktype]:checked").length == 0) {
                    alert('고용형태를 선택해주세요.');
                    $('input[name=worktype]').focus();
                    return;
                }

                //시간선택제 근무시간
                if ($("input[name=worktype][value=14]:checked").prop("checked")) {
                    $('input[name=worktime]').val($('select[name=sltWorkTime1]').val() + ':' + $('select[name=sltWorkTime2]').val() + '~' + $('select[name=sltWorkTime3').val() + ':' + $('select[name=sltWorkTime4]').val());
                }

                if ($("input[name=rnumber_1]:checked").length == 0) {
                    alert('모집인원을 선택해주세요.');
                    $('input[name=rnumber_1]').focus();
                    return;
                } else if ($("input[name=rnumber_1]:checked").val() == '' && $("input[name=rnumber]").val() == '') { //직접입력의 경우
                    alert('모집인원을 입력해주세요.');
                    $('input[name=rnumber]').focus();
                    return;
                }

                //급여조건
                if ($("input[name=salary_sel]:checked").length == 0) { //연봉, 월급 선택되어있지 않을 때 
                    alert('급여조건을 선택해주세요.');
                    $('input[name=salary_sel]').focus();
                    return;
                }

                if ($("input[name=salary_annual1]:checked").length == 0) { //회사내규, 면접후, 직무별 체크가 되어있지 않을 때
                    if ($("input[name=salary_sel]:checked").val() == "1") { ///연봉
                        if ($("select[name=salary_annual]").val() == "0") {
                            alert('급여조건을 선택해주세요.');
                            $("select[name=salary_annual]").focus();
                            return;
                        } else if ($("select[name=salary_annual]").val() == "87" && $('input[name=salary_txt]').val() == '') { //직접입력
                            alert('급여조건을 입력해주세요.');
                            $("input[name=salary_txt]").focus();
                            return;
                        }

                    } else if ($("input[name=salary_sel]:checked").val() == "2") { //월급
                        if ($("select[name=salary_month]").val() == "0") {
                            alert('급여조건을 선택해주세요.');
                            $("select[name=salary_annual]").focus();
                            return;
                        } else if ($("select[name=salary_month]").val() == "87" && $('input[name=salary_txt]').val() == '') { //직접입력
                            alert('급여조건을 입력해주세요.');
                            $("input[name=salary_txt]").focus();
                            return;
                        }
                    }
                }

                if ($('input[name=work_part]').val() == '') {
                    alert('근무부서를 입력해주세요.');
                    $("input[name=work_part]").focus();
                    return;
                }

                if ($('input[name=classlevel]').length == 0 && $('input[name=duty]').length == 0) {
                    alert('직급/직책을 선택해주세요.');
                    var off = $('#step02').offset();
                    $('html, body').animate({
                        scrollTop: off.top
                    }, 200);
                    return;
                }

                if ($('input[name=experience]:checked').val() == '8' && $('select[name=sel_experience]').val() == '') {
                    alert('경력사항을 선택해주세요.');
                    $('select[name=sel_experience]').focus();
                    return;
                }

                if ($("select[name=school]").val() == '') {
                    alert('최종학력을 선택해주세요.');
                    $("select[name=school]").focus();
                    return;
                }

                //접수방법
                chk = 0;
                $('input[name="regwaychk"]').each(function () {
                    if (this.checked) {
                        chk += 1;
                    }
                });

                if (chk == 0) {
                    alert('접수방법을 선택해주세요.');
                    $('input[name=regwaychk]').focus();
                    return;
                }

                if ($('input[name="regwaychk"][value="6"]').prop('checked')) {
                    if ($('input[name=regurl]').val() == 'http://') {
                        alert('홈페이지 주소를 입력해주세요.');
                        $('input[name=regurl]').focus();
                        return;
                    }
                }

                //접수양식
                chk = 0;
                $('input[name="formtypechk"]').each(function () {
                    if (this.checked) {
                        chk += 1;
                    }
                });

                if (chk == 0) {
                    alert('접수양식을 선택해주세요.');
                    $('input[name=formtypechk]').focus();
                    return;
                }

                if ($('input[name="formtypechk"][value=C]').prop('checked')) {
                    if ($('input[name=mtNewFileName]').val() == '' || $('input[name=mtNewFileName]').val() == undefined) {
                        alert('자사 양식을 등록해주세요.');
                        var off = $('#step04').offset();
                        $('html, body').animate({
                            scrollTop: off.top
                        }, 200);
                        return;
                    }
                }

                //전형절차
                $('input[name="choiceprocess"]').each(function () {
                    if (this.value == '전형절차 입력') {
                        this.value = '';
                    }
                });

                //근무지역 
                if ($("select[name=areaCode1] option:selected").val() == "" || $("select[name=areaCode2] option:selected").val() == "") {
                    alert('근무지역을 선택해주세요.');
                    $('select[name=areaCode1]').focus();
                    return;
                }

                //근무요일
                if ($("select[name=weekdays] option:selected").val() == "") {
                    alert('근무요일을 선택해주세요.');
                    $('select[name=weekdays]').focus();
                    return;
                }

                if ($("select[name=weekdays] option:selected").val() == "5" && $('input[name=day_txt]').val() == "예) 주5일 (매주 월요일 휴일), 2일근무 후 2일 휴무 등") {
                    alert('근무요일을 입력해주세요.');
                    $('input[name=day_txt]').focus();
                    return;
                }

                if ($('input[name=day_txt]').val() == "예) 주5일 (매주 월요일 휴일), 2일근무 후 2일 휴무 등") {
                    $('input[name=day_txt]').val('');
                }

                //업직종 필수 
                if ($('input[name=ctCode]').val() == '' || $('input[name=ctCode]').val() == undefined) {
                    alert('산업(업종)을 선택해주세요.');
                    var off = $('#step08').offset();
                    $('html, body').animate({
                        scrollTop: off.top
                    }, 200);
                    return;
                }

                if ($('input[name=jcCode]').val() == '' || $('input[name=jcCode]').val() == undefined) {
                    alert('직무(직종)을 선택해주세요.');
                    var off = $('#step08').offset();
                    $('html, body').animate({
                        scrollTop: off.top
                    }, 200);
                    return;
                }

                if ($('input[name=chargeMan]').val() == "") {
                    alert('담당자 명을 입력해주세요.');
                    $("input[name=chargeMan]").focus();
                    return;
                }

                //담당자 정보 하나로 
                if ($('select[name=tel1] option:selected').val() != '' & $('input[name=tel2]').val() != '' & $('input[name=tel3]').val() != '') {
                    $('input[name=tel]').val($('select[name=tel1] option:selected').val() + '-' + $('input[name=tel2]').val() + '-' + $('input[name=tel3]').val());
                }

                if ($('input[name=tel]').val() == "") {
                    alert('유선전화를 입력해주세요.');
                    $("input[name=tel2]").focus();
                    return;
                }

                if ($('select[name=phone1] option:selected').val() != '' & $('input[name=phone2]').val() != '' & $('input[name=phone3]').val() != '') {
                    $('input[name=phone]').val($('select[name=phone1] option:selected').val() + '-' + $('input[name=phone2]').val() + '-' + $('input[name=phone3]').val());
                }

                if ($('select[name=fax1] option:selected').val() != '' & $('input[name=fax2]').val() != '' & $('input[name=fax3]').val() != '') {
                    $('input[name=fax]').val($('select[name=fax1] option:selected').val() + '-' + $('input[name=fax2]').val() + '-' + $('input[name=fax3]').val());
                }

                if ($('input[name=email1]').val() != '' && $('select[name=email3] option:selected').val() != '') {
                    if ($('select[name=email3] option:selected').val() == 'direct' && $('select[name=email2]').val() != '') {
                        $('input[name=email]').val($('input[name=email1]').val() + '@' + $('input[name=email2]').val());
                    } else if ($('select[name=email3] option:selected').val() != 'direct') {
                        $('input[name=email]').val($('input[name=email1]').val() + '@' + $('select[name=email3] option:selected').val());
                    }
                }

                if ($('input[name=email]').val() == "") {
                    alert('이메일을 입력해주세요.');
                    $("input[name=email1]").focus();
                    return;
                }

                if ($('input[name=user_zipcode]').val() == "") {
                    alert('주소를 입력해주세요.');
                    $("input[name=user_zipcode]").focus();
                    return;
                }

                if ($('input[name=user_address]').val() == "") {
                    alert('주소를 입력해주세요.');
                    $("input[name=user_address]").focus();
                    return;
                }

                //헤드헌팅
                if ($('textarea[name=h_companyinfo]').val() != undefined) {

                    if ($('input[name=h_companyinfo]').val() == "") {
                        alert('기업소개를 입력해주세요.');
                        $("input[name=h_companyinfo]").focus();
                        return;
                    }

                    if ($("input[name=h_comkind1]:checked").length == 0) {
                        alert('기업구분을 선택해주세요.');
                        $('input[name=h_comkind1]').focus();
                        return;
                    }

                    if ($("input[name=h_comkind2]:checked").length == 0) {
                        alert('상장여부를 선택해주세요.');
                        $('input[name=h_comkind2]').focus();
                        return;
                    }

                    if ($('textarea[name=h_comtxt]').val() == "") {
                        alert('기업설명을 입력해주세요.');
                        $("textarea[name=h_comtxt]").focus();
                        return;
                    }
                }

                //채용관련 법률안내 동의
                if ($("input[id=roulcheck1]:checked").length == 0 || $("input[id=roulcheck2]:checked").length == 0 || $("input[id=roulcheck3]:checked").length == 0 || $("input[id=roulcheck4]:checked").length == 0) {
                    alert('채용관련 법률안내에 동의하셔야 공고등록이 가능합니다.');
                    location.href = "#step11";
                    return;
                }

                $("#frm_post").attr("action", "/Biz/jobpost/jobpost_insert");
                $("#frm_post").submit();
            }
        }
        , error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.responseText);
        }
    });
}

//폼 전송 백업
function sendit_bak() {
    var chk = 0;

    //중복제거 
    chk_val('area');
    chk_val('jc');

    //템플릿 넣어주기
    var edit = myeditor.outputBodyHTML();
    edit = edit.replace(/</g, "&lt;");
    edit = edit.replace(/>/g, "&gt;");
    $('#txtContents').val(edit);

    //헤드헌팅, 기업설명이 있는 경우
    if ($('textarea[name=h_comtxt]').val() != undefined) {
        var h_comtxt = $('textarea[name=h_comtxt]').val();
        h_comtxt = h_comtxt.replace(/<br\/>/ig, "\n");
        h_comtxt = h_comtxt.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
        $('textarea[name=h_comtxt]').val(h_comtxt);
    }

    if ($('#guin_title').val() == '') {
        alert('채용제목을 입력해주세요.');
        $('#guin_title').focus();
        return;
    }

    //채용제목과 동일한 경우 
    if ($('input[name=jobtitleSame]').prop('checked')) {
        $('#task').val($('#guin_title').val());
    }

    if ($('#task').val() == '') {
        alert('담당업무를 입력해주세요.');
        $('#task').focus();
        return;
    }

    if ($("input[name=worktype]:checked").length == 0) {
        alert('고용형태를 선택해주세요.');
        $('input[name=worktype]').focus();
        return;
    }

    //시간선택제 근무시간
    if ($("input[name=worktype][value=14]:checked").prop("checked")) {
        $('input[name=worktime]').val($('select[name=sltWorkTime1]').val() + ':' + $('select[name=sltWorkTime2]').val() + '~' + $('select[name=sltWorkTime3').val() + ':' + $('select[name=sltWorkTime4]').val());
    }

    if ($("input[name=rnumber_1]:checked").length == 0) {
        alert('모집인원을 선택해주세요.');
        $('input[name=rnumber_1]').focus();
        return;
    } else if ($("input[name=rnumber_1]:checked").val() == '' && $("input[name=rnumber]").val() == '') { //직접입력의 경우
        alert('모집인원을 입력해주세요.');
        $('input[name=rnumber]').focus();
        return;
    }

    //급여조건
    if ($("input[name=salary_sel]:checked").length == 0) { //연봉, 월급 선택되어있지 않을 때 
        alert('급여조건을 선택해주세요.');
        $('input[name=salary_sel]').focus();
        return;
    }

    if ($("input[name=salary_annual1]:checked").length == 0) { //회사내규, 면접후, 직무별 체크가 되어있지 않을 때
        if ($("input[name=salary_sel]:checked").val() == "1") { ///연봉
            if ($("select[name=salary_annual]").val() == "0") {
                alert('급여조건을 선택해주세요.');
                $("select[name=salary_annual]").focus();
                return;
            } else if ($("select[name=salary_annual]").val() == "87" && $('input[name=salary_txt]').val() == '') { //직접입력
                alert('급여조건을 입력해주세요.');
                $("input[name=salary_txt]").focus();
                return;
            }

        } else if ($("input[name=salary_sel]:checked").val() == "2") { //월급
            if ($("select[name=salary_month]").val() == "0") {
                alert('급여조건을 선택해주세요.');
                $("select[name=salary_annual]").focus();
                return;
            } else if ($("select[name=salary_month]").val() == "87" && $('input[name=salary_txt]').val() == '') { //직접입력
                alert('급여조건을 입력해주세요.');
                $("input[name=salary_txt]").focus();
                return;
            }
        }
    }

    if ($('input[name=work_part]').val() == '') {
        alert('근무부서를 입력해주세요.');
        $("input[name=work_part]").focus();
        return;
    }

    if ($('input[name=classlevel]').length == 0 && $('input[name=duty]').length == 0) {
        alert('직급/직책을 선택해주세요.');
        var off = $('#step02').offset();
        $('html, body').animate({
            scrollTop: off.top
        }, 200);
        return;
    }

    if ($('input[name=experience]:checked').val() == '8' && $('select[name=sel_experience]').val() == '') {
        alert('경력사항을 선택해주세요.');
        $('select[name=sel_experience]').focus();
        return;
    }

    if ($("select[name=school]").val() == '') {
        alert('최종학력을 선택해주세요.');
        $("select[name=school]").focus();
        return;
    }

    //접수방법
    chk = 0;
    $('input[name="regwaychk"]').each(function () {
        if (this.checked) {
            chk += 1;
        }
    });

    if (chk == 0) {
        alert('접수방법을 선택해주세요.');
        $('input[name=regwaychk]').focus();
        return;
    }

    if ($('input[name="regwaychk"][value="6"]').prop('checked')) {
        if ($('input[name=regurl]').val() == 'http://') {
            alert('홈페이지 주소를 입력해주세요.');
            $('input[name=regurl]').focus();
            return;
        }
    }

    //접수양식
    chk = 0;
    $('input[name="formtypechk"]').each(function () {
        if (this.checked) {
            chk += 1;
        }
    });

    if (chk == 0) {
        alert('접수양식을 선택해주세요.');
        $('input[name=formtypechk]').focus();
        return;
    }

    if ($('input[name="formtypechk"][value=C]').prop('checked')) {
        if ($('input[name=mtNewFileName]').val() == '' || $('input[name=mtNewFileName]').val() == undefined) {
            alert('자사 양식을 등록해주세요.');
            var off = $('#step04').offset();
            $('html, body').animate({
                scrollTop: off.top
            }, 200);
            return;
        }
    }

    //전형절차
    $('input[name="choiceprocess"]').each(function () {
        if (this.value == '전형절차 입력') {
            this.value = '';
        }
    });

    //근무지역 
    if ($("select[name=areaCode1] option:selected").val() == "" || $("select[name=areaCode2] option:selected").val() == "") {
        alert('근무지역을 선택해주세요.');
        $('select[name=areaCode1]').focus();
        return;
    }

    //근무요일
    if ($("select[name=weekdays] option:selected").val() == "") {
        alert('근무요일을 선택해주세요.');
        $('select[name=weekdays]').focus();
        return;
    }

    if ($("select[name=weekdays] option:selected").val() == "5" && $('input[name=day_txt]').val() == "예) 주5일 (매주 월요일 휴일), 2일근무 후 2일 휴무 등") {
        alert('근무요일을 입력해주세요.');
        $('input[name=day_txt]').focus();
        return;
    }

    if ($('input[name=day_txt]').val() == "예) 주5일 (매주 월요일 휴일), 2일근무 후 2일 휴무 등") {
        $('input[name=day_txt]').val('');
    }

    //업직종 필수 
    if ($('input[name=ctCode]').val() == '' || $('input[name=ctCode]').val() == undefined) {
        alert('산업(업종)을 선택해주세요.');
        var off = $('#step08').offset();
        $('html, body').animate({
            scrollTop: off.top
        }, 200);
        return;
    }

    if ($('input[name=jcCode]').val() == '' || $('input[name=jcCode]').val() == undefined) {
        alert('직무(직종)을 선택해주세요.');
        var off = $('#step08').offset();
        $('html, body').animate({
            scrollTop: off.top
        }, 200);
        return;
    }

    if ($('input[name=chargeMan]').val() == "") {
        alert('담당자 명을 입력해주세요.');
        $("input[name=chargeMan]").focus();
        return;
    }

    //담당자 정보 하나로 
    if ($('select[name=tel1] option:selected').val() != '' & $('input[name=tel2]').val() != '' & $('input[name=tel3]').val() != '') {
        $('input[name=tel]').val($('select[name=tel1] option:selected').val() + '-' + $('input[name=tel2]').val() + '-' + $('input[name=tel3]').val());
    }

    if ($('input[name=tel]').val() == "") {
        alert('유선전화를 입력해주세요.');
        $("input[name=tel2]").focus();
        return;
    }

    if ($('select[name=phone1] option:selected').val() != '' & $('input[name=phone2]').val() != '' & $('input[name=phone3]').val() != '') {
        $('input[name=phone]').val($('select[name=phone1] option:selected').val() + '-' + $('input[name=phone2]').val() + '-' + $('input[name=phone3]').val());
    }

    if ($('select[name=fax1] option:selected').val() != '' & $('input[name=fax2]').val() != '' & $('input[name=fax3]').val() != '') {
        $('input[name=fax]').val($('select[name=fax1] option:selected').val() + '-' + $('input[name=fax2]').val() + '-' + $('input[name=fax3]').val());
    }

    if ($('input[name=email1]').val() != '' && $('select[name=email3] option:selected').val() != '') {
        if ($('select[name=email3] option:selected').val() == 'direct' && $('select[name=email2]').val() != '') {
            $('input[name=email]').val($('input[name=email1]').val() + '@' + $('input[name=email2]').val());
        } else if ($('select[name=email3] option:selected').val() != 'direct') {
            $('input[name=email]').val($('input[name=email1]').val() + '@' + $('select[name=email3] option:selected').val());
        }
    }

    if ($('input[name=email]').val() == "") {
        alert('이메일을 입력해주세요.');
        $("input[name=email1]").focus();
        return;
    }

    if ($('input[name=user_zipcode]').val() == "") {
        alert('주소를 입력해주세요.');
        $("input[name=user_zipcode]").focus();
        return;
    }

    if ($('input[name=user_address]').val() == "") {
        alert('주소를 입력해주세요.');
        $("input[name=user_address]").focus();
        return;
    }

    //헤드헌팅
    if ($('textarea[name=h_companyinfo]').val() != undefined) {

        if ($('input[name=h_companyinfo]').val() == "") {
            alert('기업소개를 입력해주세요.');
            $("input[name=h_companyinfo]").focus();
            return;
        }

        if ($("input[name=h_comkind1]:checked").length == 0) {
            alert('기업구분을 선택해주세요.');
            $('input[name=h_comkind1]').focus();
            return;
        }

        if ($("input[name=h_comkind2]:checked").length == 0) {
            alert('상장여부를 선택해주세요.');
            $('input[name=h_comkind2]').focus();
            return;
        }

        if ($('textarea[name=h_comtxt]').val() == "") {
            alert('기업설명을 입력해주세요.');
            $("textarea[name=h_comtxt]").focus();
            return;
        }
    }

    $("#frm_post").attr("action", "/Biz/jobpost/jobpost_insert");
    $("#frm_post").submit();
}

//폼 전송 관리자
function sendit_admin() {
    var chk = 0;

    //중복제거 
    chk_val('area');
    chk_val('jc');
    chk_val('ct');

    //템플릿 넣어주기
    var edit = myeditor.outputBodyHTML();
    edit = edit.replace(/</g, "&lt;");
    edit = edit.replace(/>/g, "&gt;");
    $('#txtContents').val(edit);

    if ($('#TopTxt').val() != undefined) {
        var edit2 = myeditor2.outputBodyHTML();
        edit2 = edit2.replace(/</g, "&lt;");
        edit2 = edit2.replace(/>/g, "&gt;");
        $('#TopTxt').val(edit2);
    }

    //헤드헌팅, 기업설명이 있는 경우
    if ($('textarea[name=h_comtxt]').val() != undefined) {
        var h_comtxt = $('textarea[name=h_comtxt]').val();
        h_comtxt = h_comtxt.replace(/<br\/>/ig, "\n");
        h_comtxt = h_comtxt.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
        $('textarea[name=h_comtxt]').val(h_comtxt);
    }

    if ($('#guin_title').val() == '') {
        alert('채용제목을 입력해주세요.');
        $('#guin_title').focus();
        return;
    }

    //채용제목과 동일한 경우 
    if ($('input[name=jobtitleSame]').prop('checked')) {
        $('#task').val($('#guin_title').val());
    }

    if ($('#task').val() == '') {
        alert('담당업무를 입력해주세요.');
        $('#task').focus();
        return;
    }

    if ($("input[name=worktype]:checked").length == 0) {
        alert('고용형태를 선택해주세요.');
        $('input[name=worktype]').focus();
        return;
    }

    //시간선택제 근무시간
    if ($("input[name=worktype][value=14]:checked").prop("checked")) {
        $('input[name=worktime]').val($('select[name=sltWorkTime1]').val() + ':' + $('select[name=sltWorkTime2]').val() + '~' + $('select[name=sltWorkTime3').val() + ':' + $('select[name=sltWorkTime4]').val());
    }

    if ($("input[name=rnumber_1]:checked").length == 0) {
        alert('모집인원을 선택해주세요.');
        $('input[name=rnumber_1]').focus();
        return;
    } else if ($("input[name=rnumber_1]:checked").val() == '' && $("input[name=rnumber]").val() == '') { //직접입력의 경우
        alert('모집인원을 입력해주세요.');
        $('input[name=rnumber]').focus();
        return;
    }

    //급여조건
    if ($("input[name=salary_sel]:checked").length == 0) { //연봉, 월급 선택되어있지 않을 때 
        alert('급여조건을 선택해주세요.');
        $('input[name=salary_sel]').focus();
        return;
    }

    if ($("input[name=salary_annual1]:checked").length == 0) { //회사내규, 면접후, 직무별 체크가 되어있지 않을 때
        if ($("input[name=salary_sel]:checked").val() == "1") { ///연봉
            if ($("select[name=salary_annual]").val() == "0") {
                alert('급여조건을 선택해주세요.');
                $("select[name=salary_annual]").focus();
                return;
            } else if ($("select[name=salary_annual]").val() == "87" && $('input[name=salary_txt]').val() == '') { //직접입력
                alert('급여조건을 입력해주세요.');
                $("input[name=salary_txt]").focus();
                return;
            }

        } else if ($("input[name=salary_sel]:checked").val() == "2") { //월급
            if ($("select[name=salary_month]").val() == "0") {
                alert('급여조건을 선택해주세요.');
                $("select[name=salary_annual]").focus();
                return;
            } else if ($("select[name=salary_month]").val() == "87" && $('input[name=salary_txt]').val() == '') { //직접입력
                alert('급여조건을 입력해주세요.');
                $("input[name=salary_txt]").focus();
                return;
            }
        }
    }

    if ($('input[name=work_part]').val() == '') {
        alert('근무부서를 입력해주세요.');
        $("input[name=work_part]").focus();
        return;
    }

    if ($('input[name=classlevel]').length == 0 && $('input[name=duty]').length == 0) {
        alert('직급/직책을 선택해주세요.');
        var off = $('#step02').offset();
        $('html, body').animate({
            scrollTop: off.top
        }, 200);
        return;
    }

    if ($('input[name=experience]:checked').val() == '8' && $('select[name=sel_experience]').val() == '') {
        alert('경력사항을 선택해주세요.');
        $('select[name=sel_experience]').focus();
        return;
    }

    if ($("select[name=school]").val() == '') {
        alert('최종학력을 선택해주세요.');
        $("select[name=school]").focus();
        return;
    }

    //접수방법
    chk = 0;
    $('input[name="regwaychk"]').each(function () {
        if (this.checked) {
            chk += 1;
        }
    });

    if (chk == 0) {
        alert('접수방법을 선택해주세요.');
        $('input[name=regwaychk]').focus();
        return;
    }

    if ($('input[name="regwaychk"][value="6"]').prop('checked')) {
        if ($('input[name=regurl]').val() == 'http://') {
            alert('홈페이지 주소를 입력해주세요.');
            $('input[name=regurl]').focus();
            return;
        }
    }

    //접수양식
    chk = 0;
    $('input[name="formtypechk"]').each(function () {
        if (this.checked) {
            chk += 1;
        }
    });

    if (chk == 0) {
        alert('접수양식을 선택해주세요.');
        $('input[name=formtypechk]').focus();
        return;
    }

    if ($('input[name="formtypechk"][value=C]').prop('checked')) {
        if ($('input[name=mtNewFileName]').val() == '' || $('input[name=mtNewFileName]').val() == undefined) {
            alert('자사 양식을 등록해주세요.');
            var off = $('#step04').offset();
            $('html, body').animate({
                scrollTop: off.top
            }, 200);
            return;
        }
    }

    //전형절차
    $('input[name="choiceprocess"]').each(function () {
        if (this.value == '전형절차 입력') {
            this.value = '';
        }
    });

    //근무지역 
    if ($("select[name=areaCode1] option:selected").val() == "" || $("select[name=areaCode2] option:selected").val() == "") {
        alert('근무지역을 선택해주세요.');
        $('select[name=areaCode1]').focus();
        return;
    }

    //근무요일
    if ($("select[name=weekdays] option:selected").val() == "") {
        alert('근무요일을 선택해주세요.');
        $('select[name=weekdays]').focus();
        return;
    }

    if ($("select[name=weekdays] option:selected").val() == "5" && $('input[name=day_txt]').val() == "예) 주5일 (매주 월요일 휴일), 2일근무 후 2일 휴무 등") {
        alert('근무요일을 입력해주세요.');
        $('input[name=day_txt]').focus();
        return;
    }

    if ($('input[name=day_txt]').val() == "예) 주5일 (매주 월요일 휴일), 2일근무 후 2일 휴무 등") {
        $('input[name=day_txt]').val('');
    }

    //업직종 필수 
    if ($('input[name=ctCode]').val() == '' || $('input[name=ctCode]').val() == undefined) {
        alert('산업(업종)을 선택해주세요.');
        var off = $('#step08').offset();
        $('html, body').animate({
            scrollTop: off.top
        }, 200);
        return;
    }

    if ($('input[name=jcCode]').val() == '' || $('input[name=jcCode]').val() == undefined) {
        alert('직무(직종)을 선택해주세요.');
        var off = $('#step08').offset();
        $('html, body').animate({
            scrollTop: off.top
        }, 200);
        return;
    }

    if ($('input[name=chargeMan]').val() == "") {
        alert('담당자 명을 입력해주세요.');
        $("input[name=chargeMan]").focus();
        return;
    }

    //담당자 정보 하나로 
    if ($('select[name=tel1] option:selected').val() != '' & $('input[name=tel2]').val() != '' & $('input[name=tel3]').val() != '') {
        $('input[name=tel]').val($('select[name=tel1] option:selected').val() + '-' + $('input[name=tel2]').val() + '-' + $('input[name=tel3]').val());
    }

    if ($('input[name=tel]').val() == "") {
        alert('유선전화를 입력해주세요.');
        $("input[name=tel2]").focus();
        return;
    }

    if ($('select[name=phone1] option:selected').val() != '' & $('input[name=phone2]').val() != '' & $('input[name=phone3]').val() != '') {
        $('input[name=phone]').val($('select[name=phone1] option:selected').val() + '-' + $('input[name=phone2]').val() + '-' + $('input[name=phone3]').val());
    }

    if ($('select[name=fax1] option:selected').val() != '' & $('input[name=fax2]').val() != '' & $('input[name=fax3]').val() != '') {
        $('input[name=fax]').val($('select[name=fax1] option:selected').val() + '-' + $('input[name=fax2]').val() + '-' + $('input[name=fax3]').val());
    }

    if ($('input[name=email1]').val() != '' && $('select[name=email3] option:selected').val() != '') {
        if ($('select[name=email3] option:selected').val() == 'direct' && $('select[name=email2]').val() != '') {
            $('input[name=email]').val($('input[name=email1]').val() + '@' + $('input[name=email2]').val());
        } else if ($('select[name=email3] option:selected').val() != 'direct') {
            $('input[name=email]').val($('input[name=email1]').val() + '@' + $('select[name=email3] option:selected').val());
        }
    }

    if ($('input[name=email]').val() == "") {
        alert('이메일을 입력해주세요.');
        $("input[name=email1]").focus();
        return;
    }

    if ($('input[name=user_zipcode]').val() == "") {
        alert('주소를 입력해주세요.');
        $("input[name=user_zipcode]").focus();
        return;
    }

    if ($('input[name=user_address]').val() == "") {
        alert('주소를 입력해주세요.');
        $("input[name=user_address]").focus();
        return;
    }

    //헤드헌팅
    if ($('textarea[name=h_companyinfo]').val() != undefined) {

        if ($('input[name=h_companyinfo]').val() == "") {
            alert('기업소개를 입력해주세요.');
            $("input[name=h_companyinfo]").focus();
            return;
        }

        if ($("input[name=h_comkind1]:checked").length == 0) {
            alert('기업구분을 선택해주세요.');
            $('input[name=h_comkind1]').focus();
            return;
        }

        if ($("input[name=h_comkind2]:checked").length == 0) {
            alert('상장여부를 선택해주세요.');
            $('input[name=h_comkind2]').focus();
            return;
        }

        if ($('textarea[name=h_comtxt]').val() == "") {
            alert('기업설명을 입력해주세요.');
            $("textarea[name=h_comtxt]").focus();
            return;
        }
    }

    $("#frm_post").attr("action", "/Biz/jobpost/jobpost_insert_admin");
    $("#frm_post").submit();
}

//폼 전송 팝업공고 기업영업팀
function sendit_admin_popup() {
    var chk = 0;

    //중복제거 
    chk_val('area');
    chk_val('jc');
    chk_val('ct');

    //템플릿 넣어주기
    var edit = myeditor.outputBodyHTML();
    edit = edit.replace(/</g, "&lt;");
    edit = edit.replace(/>/g, "&gt;");
    $('#txtContents').val(edit);

    //템플릿 넣어주기
    var edit2 = myeditor2.outputBodyHTML();
    edit2 = edit2.replace(/</g, "&lt;");
    edit2 = edit2.replace(/>/g, "&gt;");
    $('#TopTxt').val(edit2);

    //헤드헌팅, 기업설명이 있는 경우
    if ($('textarea[name=h_comtxt]').val() != undefined) {
        var h_comtxt = $('textarea[name=h_comtxt]').val();
        h_comtxt = h_comtxt.replace(/<br\/>/ig, "\n");
        h_comtxt = h_comtxt.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
        $('textarea[name=h_comtxt]').val(h_comtxt);
    }

    if ($('#guin_title').val() == '') {
        alert('채용제목을 입력해주세요.');
        $('#guin_title').focus();
        return;
    }

    //채용제목과 동일한 경우 
    if ($('input[name=jobtitleSame]').prop('checked')) {
        $('#task').val($('#guin_title').val());
    }

    if ($('#task').val() == '') {
        alert('담당업무를 입력해주세요.');
        $('#task').focus();
        return;
    }

    if ($("input[name=worktype]:checked").length == 0) {
        alert('고용형태를 선택해주세요.');
        $('input[name=worktype]').focus();
        return;
    }

    //시간선택제 근무시간
    if ($("input[name=worktype][value=14]:checked").prop("checked")) {
        $('input[name=worktime]').val($('select[name=sltWorkTime1]').val() + ':' + $('select[name=sltWorkTime2]').val() + '~' + $('select[name=sltWorkTime3').val() + ':' + $('select[name=sltWorkTime4]').val());
    }

    if ($("input[name=rnumber_1]:checked").length == 0) {
        alert('모집인원을 선택해주세요.');
        $('input[name=rnumber_1]').focus();
        return;
    } else if ($("input[name=rnumber_1]:checked").val() == '' && $("input[name=rnumber]").val() == '') { //직접입력의 경우
        alert('모집인원을 입력해주세요.');
        $('input[name=rnumber]').focus();
        return;
    }

    //급여조건
    if ($("input[name=salary_sel]:checked").length == 0) { //연봉, 월급 선택되어있지 않을 때 
        alert('급여조건을 선택해주세요.');
        $('input[name=salary_sel]').focus();
        return;
    }

    if ($("input[name=salary_annual1]:checked").length == 0) { //회사내규, 면접후, 직무별 체크가 되어있지 않을 때
        if ($("input[name=salary_sel]:checked").val() == "1") { ///연봉
            if ($("select[name=salary_annual]").val() == "0") {
                alert('급여조건을 선택해주세요.');
                $("select[name=salary_annual]").focus();
                return;
            } else if ($("select[name=salary_annual]").val() == "87" && $('input[name=salary_txt]').val() == '') { //직접입력
                alert('급여조건을 입력해주세요.');
                $("input[name=salary_txt]").focus();
                return;
            }

        } else if ($("input[name=salary_sel]:checked").val() == "2") { //월급
            if ($("select[name=salary_month]").val() == "0") {
                alert('급여조건을 선택해주세요.');
                $("select[name=salary_annual]").focus();
                return;
            } else if ($("select[name=salary_month]").val() == "87" && $('input[name=salary_txt]').val() == '') { //직접입력
                alert('급여조건을 입력해주세요.');
                $("input[name=salary_txt]").focus();
                return;
            }
        }
    }

    if ($('input[name=work_part]').val() == '') {
        alert('근무부서를 입력해주세요.');
        $("input[name=work_part]").focus();
        return;
    }

    if ($('input[name=classlevel]').length == 0 && $('input[name=duty]').length == 0) {
        alert('직급/직책을 선택해주세요.');
        var off = $('#step02').offset();
        $('html, body').animate({
            scrollTop: off.top
        }, 200);
        return;
    }

    if ($('input[name=experience]:checked').val() == '8' && $('select[name=sel_experience]').val() == '') {
        alert('경력사항을 선택해주세요.');
        $('select[name=sel_experience]').focus();
        return;
    }

    if ($("select[name=school]").val() == '') {
        alert('최종학력을 선택해주세요.');
        $("select[name=school]").focus();
        return;
    }

    //접수방법
    chk = 0;
    $('input[name="regwaychk"]').each(function () {
        if (this.checked) {
            chk += 1;
        }
    });

    if (chk == 0) {
        alert('접수방법을 선택해주세요.');
        $('input[name=regwaychk]').focus();
        return;
    }

    if ($('input[name="regwaychk"][value="6"]').prop('checked')) {
        if ($('input[name=regurl]').val() == 'http://') {
            alert('홈페이지 주소를 입력해주세요.');
            $('input[name=regurl]').focus();
            return;
        }
    }

    //접수양식
    chk = 0;
    $('input[name="formtypechk"]').each(function () {
        if (this.checked) {
            chk += 1;
        }
    });

    if (chk == 0) {
        alert('접수양식을 선택해주세요.');
        $('input[name=formtypechk]').focus();
        return;
    }

    if ($('input[name="formtypechk"][value=C]').prop('checked')) {
        if ($('input[name=mtNewFileName]').val() == '' || $('input[name=mtNewFileName]').val() == undefined) {
            alert('자사 양식을 등록해주세요.');
            var off = $('#step04').offset();
            $('html, body').animate({
                scrollTop: off.top
            }, 200);
            return;
        }
    }

    //전형절차
    $('input[name="choiceprocess"]').each(function () {
        if (this.value == '전형절차 입력') {
            this.value = '';
        }
    });

    //근무지역 
    if ($("select[name=areaCode1] option:selected").val() == "" || $("select[name=areaCode2] option:selected").val() == "") {
        alert('근무지역을 선택해주세요.');
        $('select[name=areaCode1]').focus();
        return;
    }

    //근무요일
    if ($("select[name=weekdays] option:selected").val() == "") {
        alert('근무요일을 선택해주세요.');
        $('select[name=weekdays]').focus();
        return;
    }

    if ($("select[name=weekdays] option:selected").val() == "5" && $('input[name=day_txt]').val() == "예) 주5일 (매주 월요일 휴일), 2일근무 후 2일 휴무 등") {
        alert('근무요일을 입력해주세요.');
        $('input[name=day_txt]').focus();
        return;
    }

    if ($('input[name=day_txt]').val() == "예) 주5일 (매주 월요일 휴일), 2일근무 후 2일 휴무 등") {
        $('input[name=day_txt]').val('');
    }

    //업직종 필수 
    if ($('input[name=ctCode]').val() == '' || $('input[name=ctCode]').val() == undefined) {
        alert('산업(업종)을 선택해주세요.');
        var off = $('#step08').offset();
        $('html, body').animate({
            scrollTop: off.top
        }, 200);
        return;
    }

    if ($('input[name=jcCode]').val() == '' || $('input[name=jcCode]').val() == undefined) {
        alert('직무(직종)을 선택해주세요.');
        var off = $('#step08').offset();
        $('html, body').animate({
            scrollTop: off.top
        }, 200);
        return;
    }

    if ($('input[name=chargeMan]').val() == "") {
        alert('담당자 명을 입력해주세요.');
        $("input[name=chargeMan]").focus();
        return;
    }

    //담당자 정보 하나로 
    if ($('select[name=tel1] option:selected').val() != '' & $('input[name=tel2]').val() != '' & $('input[name=tel3]').val() != '') {
        $('input[name=tel]').val($('select[name=tel1] option:selected').val() + '-' + $('input[name=tel2]').val() + '-' + $('input[name=tel3]').val());
    }

    if ($('input[name=tel]').val() == "") {
        alert('유선전화를 입력해주세요.');
        $("input[name=tel2]").focus();
        return;
    }

    if ($('select[name=phone1] option:selected').val() != '' & $('input[name=phone2]').val() != '' & $('input[name=phone3]').val() != '') {
        $('input[name=phone]').val($('select[name=phone1] option:selected').val() + '-' + $('input[name=phone2]').val() + '-' + $('input[name=phone3]').val());
    }

    if ($('select[name=fax1] option:selected').val() != '' & $('input[name=fax2]').val() != '' & $('input[name=fax3]').val() != '') {
        $('input[name=fax]').val($('select[name=fax1] option:selected').val() + '-' + $('input[name=fax2]').val() + '-' + $('input[name=fax3]').val());
    }

    if ($('input[name=email1]').val() != '' && $('select[name=email3] option:selected').val() != '') {
        if ($('select[name=email3] option:selected').val() == 'direct' && $('select[name=email2]').val() != '') {
            $('input[name=email]').val($('input[name=email1]').val() + '@' + $('input[name=email2]').val());
        } else if ($('select[name=email3] option:selected').val() != 'direct') {
            $('input[name=email]').val($('input[name=email1]').val() + '@' + $('select[name=email3] option:selected').val());
        }
    }

    if ($('input[name=email]').val() == "") {
        alert('이메일을 입력해주세요.');
        $("input[name=email1]").focus();
        return;
    }

    if ($('input[name=user_zipcode]').val() == "") {
        alert('주소를 입력해주세요.');
        $("input[name=user_zipcode]").focus();
        return;
    }

    if ($('input[name=user_address]').val() == "") {
        alert('주소를 입력해주세요.');
        $("input[name=user_address]").focus();
        return;
    }

    //헤드헌팅
    if ($('textarea[name=h_companyinfo]').val() != undefined) {

        if ($('input[name=h_companyinfo]').val() == "") {
            alert('기업소개를 입력해주세요.');
            $("input[name=h_companyinfo]").focus();
            return;
        }

        if ($("input[name=h_comkind1]:checked").length == 0) {
            alert('기업구분을 선택해주세요.');
            $('input[name=h_comkind1]').focus();
            return;
        }

        if ($("input[name=h_comkind2]:checked").length == 0) {
            alert('상장여부를 선택해주세요.');
            $('input[name=h_comkind2]').focus();
            return;
        }

        if ($('textarea[name=h_comtxt]').val() == "") {
            alert('기업설명을 입력해주세요.');
            $("textarea[name=h_comtxt]").focus();
            return;
        }
    }

    $("#frm_post").attr("action", "/Biz/jobpost/jobpost_insert_admin_popup");
    $("#frm_post").submit();
}

//폼 전송 박람회
function sendit_fair() {

    //템플릿 넣어주기
    var edit = myeditor.outputBodyHTML();
    edit = edit.replace(/</g, "&lt;");
    edit = edit.replace(/>/g, "&gt;");
    $('#txtContents').val(edit);

    var checktxt = $("#guin_title").val() + $("#task").val() + $("#txtContents").val()

    $.ajax({
        type: "POST"
        , url: "/biz/jobpost/get_jobs_Forbidden"
        , data: { content: checktxt.trim() }
        , dataType: "html"
        , async: true
        , success: function (data) {
            if (data.trim() != "") {
                var alertMsg = "금지어:[" + data.trim() + "]가 포함된 내용은 등록 할 수 없습니다.";
                alert(alertMsg);
            } else {
                var chk = 0;

                //중복제거 
                chk_val('area');
                chk_val('jc');

                //템플릿 넣어주기
                var edit = myeditor.outputBodyHTML();
                edit = edit.replace(/</g, "&lt;");
                edit = edit.replace(/>/g, "&gt;");
                $('#txtContents').val(edit);

                //헤드헌팅, 기업설명이 있는 경우
                if ($('textarea[name=h_comtxt]').val() != undefined) {
                    var h_comtxt = $('textarea[name=h_comtxt]').val();
                    h_comtxt = h_comtxt.replace(/<br\/>/ig, "\n");
                    h_comtxt = h_comtxt.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
                    $('textarea[name=h_comtxt]').val(h_comtxt);
                }

                if ($('#guin_title').val() == '') {
                    alert('채용제목을 입력해주세요.');
                    $('#guin_title').focus();
                    return;
                }

                //채용제목과 동일한 경우 
                if ($('input[name=jobtitleSame]').prop('checked')) {
                    $('#task').val($('#guin_title').val());
                }

                if ($('#task').val() == '') {
                    alert('담당업무를 입력해주세요.');
                    $('#task').focus();
                    return;
                }

                if ($("input[name=worktype]:checked").length == 0) {
                    alert('고용형태를 선택해주세요.');
                    $('input[name=worktype]').focus();
                    return;
                }

                //시간선택제 근무시간
                if ($("input[name=worktype][value=14]:checked").prop("checked")) {
                    $('input[name=worktime]').val($('select[name=sltWorkTime1]').val() + ':' + $('select[name=sltWorkTime2]').val() + '~' + $('select[name=sltWorkTime3').val() + ':' + $('select[name=sltWorkTime4]').val());
                }

                if ($("input[name=rnumber_1]:checked").length == 0) {
                    alert('모집인원을 선택해주세요.');
                    $('input[name=rnumber_1]').focus();
                    return;
                } else if ($("input[name=rnumber_1]:checked").val() == '' && $("input[name=rnumber]").val() == '') { //직접입력의 경우
                    alert('모집인원을 입력해주세요.');
                    $('input[name=rnumber]').focus();
                    return;
                }

                //급여조건
                if ($("input[name=salary_sel]:checked").length == 0) { //연봉, 월급 선택되어있지 않을 때 
                    alert('급여조건을 선택해주세요.');
                    $('input[name=salary_sel]').focus();
                    return;
                }

                if ($("input[name=salary_annual1]:checked").length == 0) { //회사내규, 면접후, 직무별 체크가 되어있지 않을 때
                    if ($("input[name=salary_sel]:checked").val() == "1") { ///연봉
                        if ($("select[name=salary_annual]").val() == "0") {
                            alert('급여조건을 선택해주세요.');
                            $("select[name=salary_annual]").focus();
                            return;
                        } else if ($("select[name=salary_annual]").val() == "87" && $('input[name=salary_txt]').val() == '') { //직접입력
                            alert('급여조건을 입력해주세요.');
                            $("input[name=salary_txt]").focus();
                            return;
                        }

                    } else if ($("input[name=salary_sel]:checked").val() == "2") { //월급
                        if ($("select[name=salary_month]").val() == "0") {
                            alert('급여조건을 선택해주세요.');
                            $("select[name=salary_annual]").focus();
                            return;
                        } else if ($("select[name=salary_month]").val() == "87" && $('input[name=salary_txt]').val() == '') { //직접입력
                            alert('급여조건을 입력해주세요.');
                            $("input[name=salary_txt]").focus();
                            return;
                        }
                    }
                }

                if ($('input[name=work_part]').val() == '') {
                    alert('근무부서를 입력해주세요.');
                    $("input[name=work_part]").focus();
                    return;
                }

                if ($('input[name=classlevel]').length == 0 && $('input[name=duty]').length == 0) {
                    alert('직급/직책을 선택해주세요.');
                    var off = $('#step02').offset();
                    $('html, body').animate({
                        scrollTop: off.top
                    }, 200);
                    return;
                }

                if ($('input[name=experience]:checked').val() == '8' && $('select[name=sel_experience]').val() == '') {
                    alert('경력사항을 선택해주세요.');
                    $('select[name=sel_experience]').focus();
                    return;
                }

                if ($("select[name=school]").val() == '') {
                    alert('최종학력을 선택해주세요.');
                    $("select[name=school]").focus();
                    return;
                }

                //접수방법
                chk = 0;
                $('input[name="regwaychk"]').each(function () {
                    if (this.checked) {
                        chk += 1;
                    }
                });

                if (chk == 0) {
                    alert('접수방법을 선택해주세요.');
                    $('input[name=regwaychk]').focus();
                    return;
                }

                if ($('input[name="regwaychk"][value="6"]').prop('checked')) {
                    if ($('input[name=regurl]').val() == 'http://') {
                        alert('홈페이지 주소를 입력해주세요.');
                        $('input[name=regurl]').focus();
                        return;
                    }
                }

                //접수양식
                chk = 0;
                $('input[name="formtypechk"]').each(function () {
                    if (this.checked) {
                        chk += 1;
                    }
                });

                if (chk == 0) {
                    alert('접수양식을 선택해주세요.');
                    $('input[name=formtypechk]').focus();
                    return;
                }

                if ($('input[name="formtypechk"][value=C]').prop('checked')) {
                    if ($('input[name=mtNewFileName]').val() == '' || $('input[name=mtNewFileName]').val() == undefined) {
                        alert('자사 양식을 등록해주세요.');
                        var off = $('#step04').offset();
                        $('html, body').animate({
                            scrollTop: off.top
                        }, 200);
                        return;
                    }
                }

                //전형절차
                $('input[name="choiceprocess"]').each(function () {
                    if (this.value == '전형절차 입력') {
                        this.value = '';
                    }
                });

                //근무지역 
                if ($("select[name=areaCode1] option:selected").val() == "" || $("select[name=areaCode2] option:selected").val() == "") {
                    alert('근무지역을 선택해주세요.');
                    $('select[name=areaCode1]').focus();
                    return;
                }

                //근무요일
                if ($("select[name=weekdays] option:selected").val() == "") {
                    alert('근무요일을 선택해주세요.');
                    $('select[name=weekdays]').focus();
                    return;
                }

                if ($("select[name=weekdays] option:selected").val() == "5" && $('input[name=day_txt]').val() == "예) 주5일 (매주 월요일 휴일), 2일근무 후 2일 휴무 등") {
                    alert('근무요일을 입력해주세요.');
                    $('input[name=day_txt]').focus();
                    return;
                }

                if ($('input[name=day_txt]').val() == "예) 주5일 (매주 월요일 휴일), 2일근무 후 2일 휴무 등") {
                    $('input[name=day_txt]').val('');
                }

                //업직종 필수 
                if ($('input[name=ctCode]').val() == '' || $('input[name=ctCode]').val() == undefined) {
                    alert('산업(업종)을 선택해주세요.');
                    var off = $('#step08').offset();
                    $('html, body').animate({
                        scrollTop: off.top
                    }, 200);
                    return;
                }

                if ($('input[name=jcCode]').val() == '' || $('input[name=jcCode]').val() == undefined) {
                    alert('직무(직종)을 선택해주세요.');
                    var off = $('#step08').offset();
                    $('html, body').animate({
                        scrollTop: off.top
                    }, 200);
                    return;
                }

                if ($('input[name=chargeMan]').val() == "") {
                    alert('담당자 명을 입력해주세요.');
                    $("input[name=chargeMan]").focus();
                    return;
                }

                //담당자 정보 하나로 
                if ($('select[name=tel1] option:selected').val() != '' & $('input[name=tel2]').val() != '' & $('input[name=tel3]').val() != '') {
                    $('input[name=tel]').val($('select[name=tel1] option:selected').val() + '-' + $('input[name=tel2]').val() + '-' + $('input[name=tel3]').val());
                }

                if ($('input[name=tel]').val() == "") {
                    alert('유선전화를 입력해주세요.');
                    $("input[name=tel2]").focus();
                    return;
                }

                if ($('select[name=phone1] option:selected').val() != '' & $('input[name=phone2]').val() != '' & $('input[name=phone3]').val() != '') {
                    $('input[name=phone]').val($('select[name=phone1] option:selected').val() + '-' + $('input[name=phone2]').val() + '-' + $('input[name=phone3]').val());
                }

                if ($('select[name=fax1] option:selected').val() != '' & $('input[name=fax2]').val() != '' & $('input[name=fax3]').val() != '') {
                    $('input[name=fax]').val($('select[name=fax1] option:selected').val() + '-' + $('input[name=fax2]').val() + '-' + $('input[name=fax3]').val());
                }

                if ($('input[name=email1]').val() != '' && $('select[name=email3] option:selected').val() != '') {
                    if ($('select[name=email3] option:selected').val() == 'direct' && $('select[name=email2]').val() != '') {
                        $('input[name=email]').val($('input[name=email1]').val() + '@' + $('input[name=email2]').val());
                    } else if ($('select[name=email3] option:selected').val() != 'direct') {
                        $('input[name=email]').val($('input[name=email1]').val() + '@' + $('select[name=email3] option:selected').val());
                    }
                }

                if ($('input[name=email]').val() == "") {
                    alert('이메일을 입력해주세요.');
                    $("input[name=email1]").focus();
                    return;
                }

                if ($('input[name=user_zipcode]').val() == "") {
                    alert('주소를 입력해주세요.');
                    $("input[name=user_zipcode]").focus();
                    return;
                }

                if ($('input[name=user_address]').val() == "") {
                    alert('주소를 입력해주세요.');
                    $("input[name=user_address]").focus();
                    return;
                }

                //헤드헌팅
                if ($('textarea[name=h_companyinfo]').val() != undefined) {

                    if ($('input[name=h_companyinfo]').val() == "") {
                        alert('기업소개를 입력해주세요.');
                        $("input[name=h_companyinfo]").focus();
                        return;
                    }

                    if ($("input[name=h_comkind1]:checked").length == 0) {
                        alert('기업구분을 선택해주세요.');
                        $('input[name=h_comkind1]').focus();
                        return;
                    }

                    if ($("input[name=h_comkind2]:checked").length == 0) {
                        alert('상장여부를 선택해주세요.');
                        $('input[name=h_comkind2]').focus();
                        return;
                    }

                    if ($('textarea[name=h_comtxt]').val() == "") {
                        alert('기업설명을 입력해주세요.');
                        $("textarea[name=h_comtxt]").focus();
                        return;
                    }
                }

                //채용관련 법률안내 동의
                if ($("input[id=roulcheck1]:checked").length == 0 || $("input[id=roulcheck2]:checked").length == 0 || $("input[id=roulcheck3]:checked").length == 0 || $("input[id=roulcheck4]:checked").length == 0) {
                    alert('채용관련 법률안내에 동의하셔야 공고등록이 가능합니다.');
                    location.href = "#step11";
                    return;
                }

                $("#frm_post").attr("action", "/Biz/jobpost/jobpost_insert_fair");
                $("#frm_post").submit();
            }
        }
        , error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.responseText);
        }
    });
}

function getParameter(obj) {
    obj = obj.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + obj + "=([^&#]*)"), results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// 이전공고 불러오기
function getPast(regno) {
    location.href = "/biz/jobpost/jobpost_modify?jid=" + regno + "&mode=LOAD";
}

// 연봉 
function getSalayYear(scode) {
    var returnVal = "";
    switch (scode) {
        case "1": returnVal = "1,000이하"; break;
        case "2": returnVal = "1,000~1,200"; break;
        case "3": returnVal = "1,200~1,400"; break;
        case "4": returnVal = "1,400~1,600"; break;
        case "5": returnVal = "1,600~1,800"; break;
        case "6": returnVal = "1,800~2,000"; break;
        case "7": returnVal = "2,000~2,200"; break;
        case "8": returnVal = "2,200~2,400"; break;
        case "9": returnVal = "2,400~2,600"; break;
        case "10": returnVal = "2,600~2,800"; break;
        case "11": returnVal = "2,800~3,000"; break;
        case "12": returnVal = "3,000~3,200"; break;
        case "13": returnVal = "3,200~3,400"; break;
        case "14": returnVal = "3,400~3,600"; break;
        case "15": returnVal = "3,600~3,800"; break;
        case "16": returnVal = "3,800~4,000"; break;
        case "17": returnVal = "4,000~4,200"; break;
        case "18": returnVal = "4,200~4,400"; break;
        case "19": returnVal = "4,400~4,600"; break;
        case "20": returnVal = "4,600~4,800"; break;
        case "21": returnVal = "4,800~5,000"; break;
        case "22": returnVal = "5,000~5,500"; break;
        case "23": returnVal = "5,500~6,000"; break;
        case "24": returnVal = "6,000~6,500"; break;
        case "25": returnVal = "6,500~7,000"; break;
        case "26": returnVal = "7,000~8,000"; break;
        case "27": returnVal = "8,000~9,000"; break;
        case "28": returnVal = "9,000~10,000"; break;
        case "29": returnVal = "1억원이상"; break;
        default: returnVal = ""; break;
    }
    return returnVal;
}

//월급
function getSalayMonth(scode) {
    var returnVal = "";
    switch (scode) {
        case "1": returnVal = "1,000이하"; break;
        case "30": returnVal = "50이하"; break;
        case "31": returnVal = "50~100"; break;
        case "32": returnVal = "100~120"; break;
        case "33": returnVal = "120~140"; break;
        case "34": returnVal = "140~160"; break;
        case "35": returnVal = "160~180"; break;
        case "36": returnVal = "180~200"; break;
        case "37": returnVal = "200~220"; break;
        case "38": returnVal = "220~240"; break;
        case "39": returnVal = "240~260"; break;
        case "40": returnVal = "260~280"; break;
        case "41": returnVal = "280~300"; break;
        case "42": returnVal = "300~320"; break;
        case "43": returnVal = "320~340"; break;
        case "44": returnVal = "340~360"; break;
        case "45": returnVal = "360~380"; break;
        case "46": returnVal = "380~400"; break;
        case "47": returnVal = "400~420"; break;
        case "48": returnVal = "420~440"; break;
        case "49": returnVal = "440~460"; break;
        case "50": returnVal = "460~480"; break;
        case "51": returnVal = "480~500"; break;
        case "52": returnVal = "500~550"; break;
        case "53": returnVal = "550~600"; break;
        case "54": returnVal = "600~650"; break;
        case "55": returnVal = "650~700"; break;
        case "56": returnVal = "700~800"; break;
        case "57": returnVal = "800~900"; break;
        case "58": returnVal = "900~1,000"; break;
        case "59": returnVal = "1,000이상"; break;
        default: returnVal = ""; break;
    }

    return returnVal;
}


// 템플릿 ===============================================================================================
function fnSelTemplate(_val) {
    var tmp = myeditor.outputBodyHTML();
    var tmp_str = $("#hdnTemplateHtml" + _val).val();

    if (tmp != "") {
        if (confirm("기존 내용은 지워지고 템플릿이 추가됩니다. \n추가하시겠습니까?")) {
            myeditor.loadContents(tmp_str);
            $('.slider li').removeClass('on');
            $('.slider #' + _val).addClass('on');
        } else {
            return;
        }
    } else {
        myeditor.loadContents(tmp_str);
    }

    //채용제목
    if ($.trim($("#guin_title").val()) != "") {
        $('.cheditor-editarea').contents().find('body #temp_title').html($("#guin_title").val());
    }


    //채용인사말
    if ($.trim($("#hongbo").val()) != "") {
        $('.cheditor-editarea').contents().find('body #temp_hongbo').html($("#hongbo").val());
    }

    //인원    
    var strRnumber = 0;
    $('input[name="rnumber_1"]:checked').each(function () {
        if ($(this).val() == '') {
            strRnumber = $('#rnumber').val();
        } else {
            strRnumber = $(this).val();
        }
    });

    if (strRnumber == '') {
        strRnumber = 0;
    }

    //모집부분 및 자격요건
    var schoolTxt = "";
    if ($("#school option:selected").val() != undefined && $("#school option:selected").val() != "") {
        schoolTxt += "- 학력 : " + $("#school option:selected").text();

        if ($("input:checkbox[name='school_exp'][value='1']").attr("checked") == true) {
            schoolTxt += "(줄업예정자가능)";
        }
        schoolTxt += "<br>";
    }

    schoolTxt += "- 경력 : " + $('input[name=experience]:checked').next().html();

    if ($('input[name=jobtitleSame]').prop('checked')) {
        $('#task').val($('#guin_title').val());
    }

    //담당업무
    var task = $('#task').val();
    if (task == "") {
        task = " - ";
    }

    //모집부문
    var job_part = "";
    $('input[name="job_part"]').each(function () {
        if (this.value != "") {
            job_part = job_part + $.trim(this.value) + '<br> ';
        }
    });

    if (job_part == "") {
        job_part = " - ";
    }

    var strDataList = "";
    strDataList = '<TR>';
    strDataList += '<TD class="first center"><DIV class=inner>' + job_part + '</DIV></TD> ';
    strDataList += '<TD class=left><DIV class=inner>' + task + '</DIV></TD>';
    strDataList += '<TD class=left><DIV class=inner>' + schoolTxt + '</DIV></TD>';
    strDataList += '<TD class=center><DIV class=inner>' + strRnumber + '명</DIV></TD>';
    strDataList += '</TR>';
    $('.cheditor-editarea').contents().find('body #strDataList').html(strDataList);


    // 근무조건
    var strWorktype = "";
    $('input:checkbox[name="worktype"]').each(function () {
        if (this.checked) {
            strWorktype += $(this).next().text();
            if (strWorktype != "") strWorktype += ",";
        }
    });

    if (strWorktype != '') {
        strWorktype = strWorktype.substring(0, strWorktype.length - 1);
        $('.cheditor-editarea').contents().find('body #temp_work').html('채용형태 : ' + strWorktype);
    }


    // 급여조건
    var strSalary_sel = "";
    if ($("input[name=salary_sel]:checked").val() == "1") {
        strSalary_sel = "연봉";
        if ($('#salary_annual').val() == 'direct') {
            strSalary_sel += " " + $('input[name=salary_txt]').val() + "만원";
        } else if ($("#salary_annual").val() != "0") {
            strSalary_sel += " " + getSalayYear($("#salary_annual").val()) + "만원";
        }
    } else if ($("input[name=salary_sel]:checked").val() == "2") {
        strSalary_sel = "월급";
        if ($('#salary_month').val() == 'direct') {
            strSalary_sel += " " + $('input[name=salary_txt]').val() + "만원";
        } else if ($("#salary_month").val() != "0") {
            strSalary_sel += " " + getSalayMonth($("#salary_month").val()) + "만원";
        }
    }

    if ($("input[name=salary_annual1]:checked").val() != undefined) {
        strSalary_sel = $("input[name=salary_annual1]:checked").next().html();
    }

    if (strSalary_sel != '') {
        $('.cheditor-editarea').contents().find('body #temp_salary').html('급여조건 : ' + strSalary_sel);
    }


    //근무지역 : 서울특별시 &gt; 전지역
    var strArea = "";
    for (x = 0; x < $('select[name=areaCode1]').length; x++) {
        if ($('select[name=areaCode1] option:selected').eq(x).val() != "") {
            strArea += $('select[name=areaCode1] option:selected').eq(x).text();

            if ($('select[name=areaCode2] option:selected').eq(x).val() != "") {
                strArea += " > " + $('select[name=areaCode2] option:selected').eq(x).text();
            }
            strArea += "<br>";
        }
    }

    if (strArea != '') {
        $('.cheditor-editarea').contents().find('body #temp_area').html('근무지역 : ' + strArea);
    }

    //접수방법
    var strformtype = "";
    $('input[name="regwaychk"]:checked').each(function () {
        if (strformtype == "") {
            strformtype += $(this).next().html();
        } else {
            strformtype += ", " + $(this).next().html();
        }
    });

    if (strformtype != '') {
        $('.cheditor-editarea').contents().find('body #temp_formtype').html('접수방법 : ' + strformtype);
    }


    //접수기간
    var strStartdate = $('input[name=startdate]').val();
    var strClosedate = $('input[name=closedate]').val();

    if ($('input[name=seldate]:checked').val() != undefined) {
        strClosedate = $('input[name=seldate]:checked').next().html();
    }

    $('.cheditor-editarea').contents().find('body #temp_date').html(strStartdate + ' ~ ' + strClosedate);


    //제출서류
    var strSubmitpaper = "";
    $('input:checkbox[name="submitpaper"]').each(function () {
        if (this.checked) {
            strSubmitpaper += "<li>" + $(this).next().text() + "</li>";
        }
    });

    if (strSubmitpaper == "") {
        strSubmitpaper = "<li></li>";
    }

    $('.cheditor-editarea').contents().find('body #temp_Submitpaper').html(strSubmitpaper);


    //절차
    var strChoiceprocess = ""
    for (x = 0; x < $('input[name=choiceprocess]').length; x++) {
        if ($('input[name=choiceprocess]').eq(x).val() != "" && $('input[name=choiceprocess]').eq(x).val() != "전형절차 입력") {
            strChoiceprocess += "<li>" + (x + 1) + "차 " + $('input[name=choiceprocess]').eq(x).val() + "</li>";
        }
    }
    if (strChoiceprocess == "") strChoiceprocess = "<li></li>";
    $('.cheditor-editarea').contents().find('body #temp_choiceprocess').html(strChoiceprocess);


    //기타
    var strD = ""
    if ($('input[name=userDept]').val() != '') {
        strD = $('input[name=userDept]').val();
    }

    if ($('input[name=telIsOpen]').attr('checked') == undefined) {  //비공개 상태의 경우 추가하지 않음
        if ($('select[name=tel1]').val() != '' & $('input[name=tel2]').val() != '' & $('input[name=tel3]').val() != '') {
            strD += " ☎ " + $('select[name=tel1]').val() + ')' + $('input[name=tel2]').val() + '-' + $('input[name=tel3]').val();
        }
    }

    if ($('input[name=emailIsOpen]').attr('checked') == undefined) {  //비공개 상태의 경우 추가하지 않음
        if ($('input[name=email1]').val() != '' && $('select[name=email3]').val() != '') {
            if ($('select[name=email3]').val() == 'direct' && $('select[name=email2]').val() != '') {

                if (strD != '') {
                    strD += ' / ';
                }

                strD += ' <A href="mailto:' + $('input[name=email1]').val() + '@' + $('input[name=email2]').val() + '" target=_blank>' + $('input[name=email1]').val() + '@' + $('input[name=email2]').val() + '</A> ';

            } else if ($('select[name=email3]').val() != 'direct') {

                if (strD != '') {
                    strD += ' / ';
                }

                strD += ' <A href="mailto:' + $('input[name=email1]').val() + '@' + $('select[name=email3]').val() + '" target=_blank>' + $('input[name=email1]').val() + '@' + $('select[name=email3]').val() + '</A> ';
            }
        }
    }

    if (strD != '') {
        $('.cheditor-editarea').contents().find('body #temp_other').html('문의처 : ' + strD);
    }
}

//접수양식
function appformtypechk(obj) {
    var chk = '';
    $('input[name="formtypechk"]').each(function () {
        if (this.checked) {
            chk += this.value;
        }
    });

    $('input[name=formtype]').val(chk);
}

//접수방법체크
function regchk() {
    var frm = document.frm1;
    var regwaychkvalue = '';

    for (i = 1; i < 7; i++) {
        regwaychkvalue += (regwaychkvalue == '' ? '' : ',') + ($('input:checkbox[name=regwaychk][value=' + i + ']').is(':checked') == true ? '1' : '0');
    }
    regwaychkvalue += ',0,0';
    $('input[name=regway]').val(regwaychkvalue);
}

//파일 업로드
function validate_file() {
    var list = '', arr = "";

    if ($('input[name=file]:checked').val() == '1') {
        var str = ".hwp, .doc, .docx, .xls, .xlsx, .gul, .ppt, .pptx, .gif, .jpg(jpeg), .zip, .alz, .pdf, png"
        var alertStr = "hwp, doc, docx,  xls, xlsx,  gul, ppt, pptx, gif, jpg(jpeg), zip, alz, pdf, png"

        var fname = $('input[name=UploadedFile]').val();
        fname = fname.toLowerCase();

        if (fname == "") {
            alert("파일이 선택되지 않았습니다.");
            $('input[name=UploadedFile]').focus();
            return false;
        }

        var fext = getExt(fname);

        if (fext == -1) {
            alert("파일 확장자가 없습니다.\n파일이름뒤에 .hwp, .xls, .gif, .zip 등의 확장자를 붙여주세요.");
            $('input[name=UploadedFile]').focus();
            return false;
        }

        if (str.indexOf(fext) < 0) {
            alert("파일은 " + alertStr + " 등만 저장가능 합니다.");
            $('input[name=UploadedFile]').focus();
            return false;
        }

        var formData = new FormData();
        formData.append("file", $('.file')[0].files[0]);

        $.ajax({
            type: "POST"
            , url: "/biz/jobfiles/JobFileUpload"
            , enctype: "multipart/form-data"
            , data: formData
            , async: false
            , cache: false
            , contentType: false
            , processData: false
            , success: function (data) {
                arr = data.split('|');

                if (arr[1] != undefined) {
                    if (arr[1].indexOf("\\") > 0) {
                        var res = arr[1].split("\\");
                        arr[1] = res[res.length - 1];
                    }
                }

                list = '<li><input type="hidden" name="fileSel" value="file">';
                list += '<input type="hidden" id="mtOldFileName" name="mtOldFileName" value="' + arr[1] + '">';
                list += '<input type="hidden" id="mtNewFileName" name="mtNewFileName" value="' + arr[0] + '">';
                list += '<span id="fname">' + arr[1] + '</span><button type="button" class="btn deleteS" onclick="removeLineFnc(this);">삭제</button></li>';
                $('.fileList').html(list);
            }
            , error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.responseText);
            }
        });
    } else {
        if ($('input[name=formurl]').val() == "http://") {
            alert("url을 입력해주세요.");
            $('input[name=formurl]').focus();
            return false;
        } else {
            list = '<li><input type="hidden" name="fileSel" value="url">';
            list += '<input type="hidden" id="mtOldFileName" name="mtOldFileName" value="' + $('input[name=formurl]').val() + '">';
            list += '<input type="hidden" id="mtNewFileName" name="mtNewFileName" value="' + $('input[name=formurl]').val() + '">';
            list += '<input type="hidden" id="mtFolderPath" name="mtFolderPath" value="/web/site/">';
            list += '<span id="fname">' + $('input[name=formurl]').val() + '</span><button type="button" class="btn deleteS" onclick="removeLineFnc(this);">삭제</button></li>';
            $('.fileList').html(list);

            if ($('#fname').html().length > 30) {
                $('#fname').html($('#fname').html().substring(0, 50) + '...');
            }
        }
    }

    $('#form_div').fadeOut(200);
    $('body').css('overflow', '');
}

function getExt(sdata) {
    var flen = sdata.length;
    var pcnt = sdata.lastIndexOf("."); // 없으면 -1 반환
    if (pcnt > 0) {
        return sdata.substring(pcnt, flen);
    }
    else {
        return -1;
    }
}

//헤드헌팅
function load_hList(val) {
    if (val != "") {
        var arr = val.split('|');

        $('input[name=chargeMan]').val(arr[0]);
        $('select[name=tel1]').val(arr[1].split('-')[0]);
        $('input[name=tel2]').val(arr[1].split('-')[1]);
        $('input[name=tel3]').val(arr[1].split('-')[2]);

        $('input[name=email1]').val(arr[2].split('@')[0]);
        $('input[name=email2]').val(arr[2].split('@')[1]);
    }
}


//입력 체크 
function chk_input() {
    var chk = 0;

    if ($('#guin_title').val() == '') {
        chk += 1;
    }

    //채용제목과 동일한 경우 
    if ($('input[name=jobtitleSame]').prop('checked')) {
        $('#task').val($('#guin_title').val());
    }

    if ($('#task').val() == '') {
        chk += 1;
    }

    if ($("input[name=worktype]:checked").length == 0) {
        chk += 1;
    }

    //시간선택제 근무시간
    if ($("input[name=worktype][value=14]:checked").prop("checked")) {
        $('input[name=worktime]').val($('select[name=sltWorkTime1]').val() + ':' + $('select[name=sltWorkTime2]').val() + '~' + $('select[name=sltWorkTime3').val() + ':' + $('select[name=sltWorkTime4]').val());
    }

    if ($("input[name=rnumber_1]:checked").length == 0) {
        chk += 1;
    } else if ($("input[name=rnumber_1]:checked").val() == '' && $("input[name=rnumber]").val() == '') { //직접입력의 경우
        chk += 1;
    }

    //급여조건
    if ($("input[name=salary_annual1]:checked").length == 0) {
        if ($("input[name=salary_sel]:checked").length == 0) {
            chk += 1;
        } else if ($("input[name=salary_sel]:checked").val() == "1") { ///연봉
            if ($("select[name=salary_annual]").val() == "0") {
                chk += 1;
            } else if ($("select[name=salary_annual]").val() == "direct" && $('input[name=salary_txt]').val() == '') { //직접입력
                chk += 1;
            }

        } else if ($("input[name=salary_sel]:checked").val() == "2") { //월급
            if ($("select[name=salary_month]").val() == "0") {
                chk += 1;
            } else if ($("select[name=salary_month]").val() == "direct" && $('input[name=salary_txt]').val() == '') { //직접입력
                chk += 1;
            }
        }
    }

    if ($('input[name=work_part]').val() == '') {
        chk += 1;
    }

    if ($('input[name=classlevel]').length == 0 && $('input[name=duty]').length == 0) {
        chk += 1;
    }

    if (chk > 0) {
        alert('미입력한 사항 있음.');
    }
}

//동의 정보 체크 
function chk_qa(obj) {
    if ($(obj).is(":checked")) {
        $('#seviceYn').val('Y');
    } else {
        $('#seviceYn').val('N');
    }
}
