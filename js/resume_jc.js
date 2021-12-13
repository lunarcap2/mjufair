//직종의 1차 data list 를 리턴합니다.
	function getJcOptDepth1List() {
		var arrRet = new Array();
		var k = 0;
		for (var i = 0; i < cat_fld1.length; i++) {
			arrRet[k] = new Array();
			arrRet[k][0] = cat_fld1[i][0];
			arrRet[k][1] = cat_fld1[i][1];
			k++;
		}
		return arrRet;
	}
	//직종의 2차 data list 를 리턴합니다.
	function getJcOptDepth2List(depthval1) {
		var arrRet = new Array();
		var k = 0;
		for (var i = 0; i < cat_fld2.length; i++) {
			if (cat_fld2[i][1] == depthval1) {
				arrRet[k] = new Array();
				arrRet[k][0] = cat_fld2[i][0];
				arrRet[k][1] = cat_fld2[i][2];
				k++;
			}
		}
		return arrRet;
	}
	//직종의 3차 data list 를 리턴합니다.
	function getJcOptDepth3List(depthval1) {
		var arrRet = new Array();
		var k = 0;
		for (var i = 0; i < cat_fld3.length; i++) {
			if (cat_fld3[i][1] == depthval1) {
				arrRet[k] = new Array();
				arrRet[k][0] = cat_fld3[i][0];
				arrRet[k][1] = cat_fld3[i][2];
				k++;
			}
		}
		return arrRet;
	}
	
	// 직종1차 리스트
	function fn_append_jc() {
		var arrJc1 = getJcOptDepth1List();
		var str = '';
		var k = 1;
		var key = 0;

		for (var i = 0; i < arrJc1.length; i++) {
			str += '<li><button type="button" class="button" onclick="fn_append_jc2(this, \'' + arrJc1[i][0] + '\')">' + arrJc1[i][1] + '</button></li>'
		}
		$('#col_ul_jc1').html(str);
		$('#col_ul_jc2').html("");
		$('#col_ul_jc3').html("");
	}
	// 직종2차 리스트
	function fn_append_jc2(obj, val) {
		
		//전체 리스트 class초기화 및 선택요소 class on
		$('#col_ul_jc1').children().children().attr('class', 'button');
		$(obj).attr('class', 'button on');

		var arrJc2 = getJcOptDepth2List(val);
		var str = '';
		var k = 1;
		var key = 0;

		for (var i = 0; i < arrJc2.length; i++) {
			str += '<li>'
			str += '	<button class="" type="button" onclick="fn_append_jc3(this)" value="'+arrJc2[i][0] +'">'
			str += '		<span>'+ arrJc2[i][1] +'</span>'
			str += '	</button>'
			str += '	<label class="checkbox off" for="">'
			str += '		<input type="checkbox" id="" class="chk" onclick="fn_appand_jckey2(this)" name="jcKeyWord2" value="'+ arrJc2[i][0] +'|'+ arrJc2[i][1] +'">'
			str += '	</label>'
			str += '</li>'
		}
		$('#col_ul_jc2').html(str);
		$('#col_ul_jc3').html("");

		//직종2차 체크
		var category_out_jc2_val = "";
		$('[name="category_out_jc2"]').each(function() {
			category_out_jc2_val += "," + this.value;
		});
		if (category_out_jc2_val != "") {
			$('[name="jcKeyWord2"]').each(function() {
				if (category_out_jc2_val.indexOf(this.value.split('|')[0]) > 0) {
					this.checked = true;
				}
			});
		}
		checkboxFnc();//체크박스.
	}
	// 직종3차 리스트
	function fn_append_jc3(obj) {

		//전체 리스트 class초기화 및 선택요소 class on
		$('#col_ul_jc2').children().children('button').attr('class', '');
		$(obj).attr('class', 'sel');

		var jc2_val, jc2_nm
		jc2_val = $(obj).val();
		jc2_nm = $(obj).children().html().trim();

		var arrJc3 = getJcOptDepth3List(jc2_val);
		var str = '';
		var k = 1;
		var key = 0;

		for (var i = 0; i < arrJc3.length; i++) {
			str += '<li>'
			str += '	<label class="checkbox off">'
			str += '		<input type="checkbox" class="chk" name="jcKeyWord3" onclick="fn_appand_jckey3(this, \''+ jc2_val +'\', \''+ jc2_nm +'\')" value="'+arrJc3[i][0] +'">'
			str += '		<span>'+ arrJc3[i][1] +'</span>'
			str += '	</label>'
			str += '</li>'
		}
		$('#col_ul_jc3').html(str);

		//직종3차 체크
		var category_out_jc3_val = "";
		$('[name="category_out_jc3"]').each(function() {
			category_out_jc3_val += "," + this.value;
		});
		if (category_out_jc3_val != "") {
			$('[name="jcKeyWord3"]').each(function() {
				if (category_out_jc3_val.indexOf(this.value) > 0) {
					this.checked = true;
				}
			});
		}
		checkboxFnc();//체크박스.
	}

	// 직종2차코드 클릭
	function fn_appand_jckey2(obj) {
		var jc2_chk, jc2_val, jc2_nm
		jc2_chk = $(obj).is(":checked");
		jc2_val = $(obj).val().split('|')[0];
		jc2_nm = $(obj).val().split('|')[1];

		if (jc2_chk) {

			var jc2_chk_cnt = $('[name="category_out_jc2"]').length
			if (jc2_chk_cnt >= 4) {
				$(obj).attr("checked", false);
				alert("희망 직종은 최대 4개까지 선택이 가능합니다.");
				return;
			} else {
				var up_html = '';
				up_html += '<li>'
				up_html += '	<div class="c_recommend"><span>'+ jc2_nm +'</span><button type="button" class="del" name="category_out_jc2" value="'+ jc2_val +'" onclick="fn_jckey2_del(\''+ jc2_val +'\')">삭제</button></div>'
				up_html += '	<div class="c_jobs">'
				up_html += '		<ul>'
				up_html += '		</ul>'
				up_html += '	</div>'
				up_html += '</li>'
				$('#btm_category_jc').append(up_html);
			}
		} else { //선택해제시
			fn_jckey2_del(jc2_val);
		}
	}

	// 직종3차코드 클릭
	function fn_appand_jckey3(obj, jc2_val, jc2_nm) {
		var jc3_chk, jc3_val, jc3_nm
		jc3_chk = $(obj).is(":checked");
		jc3_val = $(obj).val();
		jc3_nm = $(obj).next().html();

		if (jc3_chk) {

			var jc2_chk_cnt = $('[name="category_out_jc2"]').length;
			if (jc2_chk_cnt >= 4) {
				$(obj).attr("checked", false);
				alert("희망 직종은 최대 4개까지 선택이 가능합니다.");
				return;
			}

			var jc3_chk_cnt = $('[name="category_out_jc3"]').length
			if (jc3_chk_cnt >= 10) {
				$(obj).attr("checked", false);
				alert("희망 직종키워드는 최대 10개까지 선택이 가능합니다.");
				return;
			} else {
				var up_html = '';
				var jc2_cnt = 0;
				$('[name="category_out_jc2"]').each(function() {
					if (this.value == jc2_val) {
						jc2_cnt = jc2_cnt + 1;
						up_html += '			<li><span>'+ jc3_nm +'</span><button type="button" class="del" name="category_out_jc3" value="'+ jc3_val +'" onclick="fn_jckey3_del(\''+ jc3_val +'\')">삭제</button></li>'
						$(this).parents('.c_recommend').next().children().append(up_html);
					}
				});

				if (jc2_cnt == 0) {
					up_html += '<li>'
					up_html += '	<div class="c_recommend">'
					up_html += '		<span>'+ jc2_nm +'</span>'
					up_html += '		<button type="button" class="del" name="category_out_jc2" value="'+ jc2_val +'" onclick="fn_jckey2_del(\''+ jc2_val +'\')">삭제</button>'
					up_html += '	</div>'
					up_html += '	<div class="c_jobs">'
					up_html += '		<ul>'
					up_html += '			<li><span>'+ jc3_nm +'</span><button type="button" class="del" name="category_out_jc3" value="'+ jc3_val +'" onclick="fn_jckey3_del(\''+ jc3_val +'\')">삭제</button></li>'
					up_html += '		</ul>'
					up_html += '	</div>'
					up_html += '</li>'
					$('#btm_category_jc').append(up_html);

					//상위 2차 체크박스
					$('[name="jcKeyWord2"]').each(function() {
						if (this.value.split('|')[0] == jc2_val) {
							this.checked = true;
						}
					});
					checkboxFnc();//체크박스.
				}
			}
		} else { //선택해제시
			fn_jckey3_del(jc3_val);
		}
	}

	// 직종2차 삭제
	function fn_jckey2_del(_val) {
		// 하단부 선택된 직종표기 삭제
		$('[name="category_out_jc2"]').each(function() {
			if (this.value == _val) {
				$(this).parent().parent().remove();
			}
		});

		// 직종2차 선택된 체크박스 해제
		$('input:checkbox[name="jcKeyWord2"]').each(function() {
			if (this.value.split('|')[0] == _val) {
				this.checked = false;
			}
		});

		// 직종3차 체크박스 해제
		$('input:checkbox[name="jcKeyWord3"]').each(function() {
			this.checked = false;
		});
		checkboxFnc();//체크박스.
	}
	
	// 직종3차 삭제
	function fn_jckey3_del(_val) {
		// 하단부 선택된 직종표기 삭제
		$('[name="category_out_jc3"]').each(function() {
			if (this.value == _val) {
				$(this).parent().remove();
			}
		});

		// 하단부 2차표기 삭제(포함된 3차 없을경우)
		$('[name="category_out_jc2"]').each(function() {
			if (this.value == _val.substring(0, 4)) {
				if ($(this).parent().next().children().children().length == 0) {
					fn_jckey2_del(this.value);
				}
			}
		});

		// 직종3차 선택된 체크박스 해제
		$('input:checkbox[name="jcKeyWord3"]').each(function() {
			if (this.value == _val) {
				this.checked = false;
			}
		});
		checkboxFnc();//체크박스.
	}

	// 저장된 직종값 삭제
	function fn_save_jc3_del(_obj, _val) {

		fn_jckey3_del(_val);

		if ($(_obj).parent().parent().children().length == 1) {
			$(_obj).parents('.c_jobs').parent().remove();
		} else {
			$(_obj).parent().remove();
		}
	}
	function fn_save_jc2_del(_obj, _val) {
		$(_obj).parent().parent().remove();
		fn_jckey2_del(_val);
	}

	// 직종 초기화
	function fn_reset_jc() {
		// 하단부 직종표기 초기화
		$("#btm_category_jc").html("");
		// 리스트 초기화
		$("#col_ul_jc2").html("");
		$("#col_ul_jc3").html("");
		fn_append_jc();
	}

	// 직종값 조건저장
	function fn_save_jc() {
		var out_html = '';

		var set_jc2_cnt = $('[name="category_out_jc2"]').length;
		var set_jc3_cnt = $('[name="category_out_jc3"]').length;

		for (i=0; i<set_jc2_cnt; i++) {
			var resume_jc2 = $('[name="category_out_jc2"]').eq(i).val();
			var resume_jc2_nm = $('[name="category_out_jc2"]').eq(i).prev().html();

			out_html += '<li>'
			out_html += '	<div class="c_recommend"><span>'+ resume_jc2_nm +'</span><button type="button" onclick="fn_save_jc2_del(this, \''+ resume_jc2 +'\')">삭제</button></div>'
			out_html += '	<div class="c_jobs">'
			out_html += '		<ul>'
			out_html +=	'		<input type="hidden" name="resume_jobcode" value="'+ resume_jc2 +'">'
			for (j=0; j<set_jc3_cnt; j++) {
				var resume_jc3 = $('[name="category_out_jc3"]').eq(j).val();
				var resume_jc3_nm = $('[name="category_out_jc3"]').eq(j).prev().html();

				if (resume_jc2 == resume_jc3.substring(0, 4)) {
					out_html += '<li>'
					out_html += '<input type="hidden" name="jc_keyword" value="'+ resume_jc3 +'">'
					out_html += '<span>'+ resume_jc3_nm +'</span>'
					out_html += '<button type="button" onclick="fn_save_jc3_del(this, \''+ resume_jc3 +'\')">삭제</button>'
					out_html += '</li>'
				}
			}
			out_html += '		</ul>'
			out_html += '	</div>'
			out_html += '</li>'
		}
		$('#ul_place_jc').html(out_html);

		if (set_jc2_cnt > 0) {
			$('#c_head_jc_title').html("직무");
		} else {
			$('#c_head_jc_title').html("");
		}

	}