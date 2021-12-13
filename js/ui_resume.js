$(function() {
	
	$(document).ready(function() {
		tabPage();//탭페이지
		selOn();//직무,산업 키워드 select
		chkOpen();//토글input
		selectOpen();//select-ui 선택 이벤트
		resumeRnb();//토글
		scrollFixed();//스크롤 fixed
		sortableFnc();//sortable
		createCon();//이력서 폼추가
		searchTxt();//검색 텍스트 팝업
		add_del_btn();//동적 추가버튼
		add_del_btn2();//동적 추가버튼2
		del_btn();//동적 추가 삭제 버튼
		delFnc();//동적 컨텐츠 닫기버튼
        selectboxFnc();//셀렉트박스
		hiddenPop();//히든 팝업
		popFnc();//팝업

		createInput();//학력사항 추가
		createInput2();//경력사항 추가
		createInput3();//인턴,대외활동 추가
		createInput4();//외국어 추가
		createInput5();//자격증 추가
		createInput6();//수상 추가
		createInput7();//교육 추가
		createInput8();//해외경험 추가
		createInput9();//자기소개서 추가

		$(window).load(function() {
			if($("#table-id-1").length > 0) calMoreShow();//캘린더 레이어 위치값 가져오기
		});
	});

	$(document).ready(function(){
		$(document).on("click",".add_btn",function(event){
			// 동적으로 여러 태그가 생성된 경우에서의 이벤트 부여
			$(this).toggleClass('on').prev(".con_add").toggle();
		});
	});

	
	tabPage = function() {
		//When page loads...
		$(".tab_content").hide(); //Hide all content
		$("ul.tabs li:first").addClass("active").show(); //Activate first tab
		$(".tab_content:first").show(); //Show first tab content

		//On Click Event
		$("ul.tabs li").click(function() {

			$("ul.tabs li").removeClass("active"); //Remove any "active" class
			$(this).addClass("active"); //Add "active" class to selected tab
			$(".tab_content").hide(); //Hide all tab content

			var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
			$(activeTab).show(); //Fade in the active ID content
			return false;
		});
	}

	selOn = function() {
		$(".col2 ul.col_on li button").click(function() {
			$(".col2 ul.col_on li button").removeClass("sel");
			$(this).addClass("sel");
			return false;
		});

		$(".col2 ul.col_on li .checkbox").click(function() {
			if($(this).hasClass('on')){
				$(".col2 ul.col_on li button").removeClass("sel");
				$(this).prev('button').addClass("sel");   
			}else{
				$(this).prev('button').removeClass("sel");   
			}
		});
	}

	chkOpen = function() {
		$('.chk.obstacle').change(function(){
			if ($('.chk.obstacle').prop('checked')==false) {
			   $('.chk_input.n1').hide();
			}else{
			   $('.chk_input.n1').show();
			}
		});
		$('.chk.mili').change(function(){
			
			if ($('.chk.mili').prop('checked')==false) {
			   $('.chk_input.n2').hide();
			}else{
			   $('.chk_input.n2').show();
			}
		});
	}// checkBox 클릭 이벤트

	selectOpen = function() {
		//select click event
		$(".select_down .sel .test").click(function() {
			$(this).parents('.ib_m_box').find(".select_down.skill").hide();
			$(this).parents('.ib_m_box').find(".select_down.test").show();
			$(this).parents('.ib_m_box').find(".con_add.test").show();
			$(this).parents('.ib_m_box').find(".add_test").show();
		})
		$(".select_down .sel .skill").click(function() {
			$(this).parents('.ib_m_box').find(".select_down.skill").show();
			$(this).parents('.ib_m_box').find(".select_down.test").hide();
			$(this).parents('.ib_m_box').find(".con_add.test").hide();
			$(this).parents('.ib_m_box').find(".add_test").hide();
		})
	}

	resumeRnb = function() {
		
		//프로필
		/*
		$(".rr_ul li:first-child").click(function(){
			$("#resume1").toggle();
		});
		*/
		
		//학력
		$(".rr_ul li:nth-child(2)").click(function(){
			if($("#resume2").css("display") == "block") {
				if(!confirm("입력한 데이터는 삭제됩니다.\n정말 삭제하시겠습니까?")) {
					return;
				}
				$(".ib_list.add1").html(createInput());
				searchTxt();
				delFnc();//닫기버튼 호출
				selectDown();//동적 select 활성화
			}
			$("#resume2").toggle();
		});

		//경력
		$(".rr_ul li:nth-child(3)").click(function(){
			if($("#resume3").css("display") == "block") {
				if(!confirm("입력한 데이터는 삭제됩니다.\n정말 삭제하시겠습니까?")) {
					return;
				}
				$(".ib_list.add2").html(createInput2());
				searchTxt();
				delFnc();//닫기버튼 호출
				selectDown();//동적 select 활성화
				checkboxFnc();//체크박스.
			}
			$("#resume3").toggle();
		});
		
		//인턴.대외활동
		$(".rr_ul li:nth-child(4)").click(function(){
			if($("#resume4").css("display") == "block") {
				if(!confirm("입력한 데이터는 삭제됩니다.\n정말 삭제하시겠습니까?")) {
					return;
				}
				$(".ib_list.add3").html(createInput3());
				searchTxt();
				delFnc();//닫기버튼 호출
				selectDown();//동적 select 활성화
			}
			$("#resume4").toggle();
		});

		//외국어
		$(".rr_ul li:nth-child(5)").click(function(){
			if($("#resume5").css("display") == "block") {
				if(!confirm("입력한 데이터는 삭제됩니다.\n정말 삭제하시겠습니까?")) {
					return;
				}
				$(".ib_list.add4").html(createInput4());
				searchTxt();
				delFnc();//닫기버튼 호출
				selectDown();//동적 select 활성화
				selectOpen();
				add_del_btn2();//동적 추가 삭제
			}
			$("#resume5").toggle();
		});

		//자격증
		$(".rr_ul li:nth-child(6)").click(function(){
			if($("#resume6").css("display") == "block") {
				if(!confirm("입력한 데이터는 삭제됩니다.\n정말 삭제하시겠습니까?")) {
					return;
				}
				$(".ib_list.add5").html(createInput5());
				searchTxt();
				delFnc();//닫기버튼 호출
				selectDown();//동적 select 활성화
			}
			$("#resume6").toggle();
		});

		//수상
		$(".rr_ul li:nth-child(7)").click(function(){
			if($("#resume7").css("display") == "block") {
				if(!confirm("입력한 데이터는 삭제됩니다.\n정말 삭제하시겠습니까?")) {
					return;
				}
				$(".ib_list.add6").html(createInput6());
				searchTxt();
				delFnc();//닫기버튼 호출
			}
			$("#resume7").toggle();
		});

		//교육
		$(".rr_ul li:nth-child(8)").click(function(){
			if($("#resume8").css("display") == "block") {
				if(!confirm("입력한 데이터는 삭제됩니다.\n정말 삭제하시겠습니까?")) {
					return;
				}
				$(".ib_list.add7").html(createInput7());
				searchTxt();
				delFnc();//닫기버튼 호출
				selectDown();//동적 select 활성화
			}
			$("#resume8").toggle();
		});
		
		//해외경험
		$(".rr_ul li:nth-child(9)").click(function(){
			if($("#resume9").css("display") == "block") {
				if(!confirm("입력한 데이터는 삭제됩니다.\n정말 삭제하시겠습니까?")) {
					return;
				}
				$(".ib_list.add8").html(createInput8());
				searchTxt();
				delFnc();//닫기버튼 호출
				selectDown();//동적 select 활성화
			}
			$("#resume9").toggle();
		});

		//취업우대.병역
		$(".rr_ul li:nth-child(10)").click(function(){
			$("#resume10").toggle();
		});

		//포트폴리오
		$(".rr_ul li:nth-child(11)").click(function(){
			if($("#resume11").css("display") == "block") {
				if(!confirm("입력한 데이터는 삭제됩니다.\n정말 삭제하시겠습니까?")) {
					return;
				}
				$("#resume11").find(".ib_add.url").html("");
				$("#resume11").find(".ib_add.file").html("");
			}
			$("#resume11").toggle();
		});

		//희망근무조건
		$(".rr_ul li:nth-child(12)").click(function(){
			if($("#resume12").css("display") == "block") {
				if(!confirm("입력한 데이터는 삭제됩니다.\n정말 삭제하시겠습니까?")) {
					return;
				}
				//초기화
				$("#work_style").val("");
				$("#select_down_work_style").find('span').html('고용형태');

				$("#salary_amt").val("");
				$("#select_down_salary_amt").find('span').html('희망연봉');
				
				if ($("#chk_salay_code1").is(":checked"))
					$("#chk_salay_code1").click();

				fn_reset_area();
				fn_save_area();

				fn_reset_ctjc();
				fn_save_ctjc();
			}
			$("#resume12").toggle();
		});

		//자기소개서
		$(".rr_ul li:nth-child(13)").click(function(){
			if($("#resume13").css("display") == "block") {
				if(!confirm("입력한 데이터는 삭제됩니다.\n정말 삭제하시겠습니까?")) {
					return;
				}
				$(".ib_list.add9").html(createInput9());
				searchTxt();
				delFnc();//닫기버튼 호출
				selectDown();//동적 select 활성화
			}
			$("#resume13").toggle();
		});


		$(".rr_ul li.rnb_toggle").click(function() {
			$(this).children('button').toggleClass('off');
		});
	}

	scrollFixed = function () {
		$(document ).ready( function() {
			var jbOffset = $( '.rnb_wrap .rnb_con' ).offset();
				$( window ).scroll( function() {
				if ( $(document ).scrollTop() > jbOffset.top ) {
					$( '.rnb_wrap .rnb_con' ).addClass( 's_f' );
				}
				else {
					$( '.rnb_wrap .rnb_con' ).removeClass( 's_f' );
				}
			});
		});		
	}

	/* 이력서 드래그앤 드롭 */
	sortableFnc = function(){
		/* UI 설정 */
		$(".ib_list").sortable({
			handle: ".ib_m_handle",
			cancel: ".add_btn",
			start: function(event, ui) {
				ui.item.data('start_pos', ui.item.index());
			},
			stop: function(event, ui) {
				var spos = ui.item.data('start_pos');
				var epos = ui.item.index();
			}
		});

		$(".ib_list").disableSelection();
	}

	/* 이력서폼 추가 */
	createCon = function () {
		$(".addItem.r1").click(function() { //학력 추가
			if ($(".addItem.r1").parents(".input_box").find('.ib_move').length < 5) {
				$(createInput())
				.appendTo(".ib_list.add1");
				searchTxt();
				delFnc();//닫기버튼 호출
				selectDown();//동적 select 활성화
			}
		});
		$(".addItem.r2").click(function(){ //경력 추가
			if ($(".addItem.r2").parents(".input_box").find('.ib_move').length < 5) {
				$(createInput2())
				.appendTo(".ib_list.add2");
				searchTxt();
				delFnc();//닫기버튼 호출
				selectDown();//동적 select 활성화
				checkboxFnc();//체크박스.
			}
		});
		$(".addItem.r3").click(function(){ //인턴대외활동 추가
			if ($(".addItem.r3").parents(".input_box").find('.ib_move').length < 5) {
				$(createInput3())
				.appendTo(".ib_list.add3");
				searchTxt();
				delFnc();//닫기버튼 호출
				selectDown();//동적 select 활성화
			}
		});
		$(".addItem.r4").click(function(){ //외국어 추가
			if ($(".addItem.r4").parents(".input_box").find('.ib_move').length < 5) {
				$(createInput4())
				.appendTo(".ib_list.add4");
				searchTxt();
				delFnc();//닫기버튼 호출
				selectDown();//동적 select 활성화
				selectOpen();
				add_del_btn2();//동적 추가 삭제
			}
		});
		$(".addItem.r5").click(function(){ //자격증 추가
			if ($(".addItem.r5").parents(".input_box").find('.ib_move').length < 5) {
				$(createInput5())
				.appendTo(".ib_list.add5");
				searchTxt();
				delFnc();//닫기버튼 호출
				selectDown();//동적 select 활성화
			}
		});
		$(".addItem.r6").click(function(){ //수상 추가
			if ($(".addItem.r6").parents(".input_box").find('.ib_move').length < 5) {
				$(createInput6())
				.appendTo(".ib_list.add6");
				searchTxt();
				delFnc();//닫기버튼 호출
			}
		});
		$(".addItem.r7").click(function(){ //교육 추가
			if ($(".addItem.r7").parents(".input_box").find('.ib_move').length < 5) {
				$(createInput7())
				.appendTo(".ib_list.add7");
				searchTxt();
				delFnc();//닫기버튼 호출
				selectDown();//동적 select 활성화
			}
		});
		$(".addItem.r8").click(function(){ //해외경험 추가
			if ($(".addItem.r8").parents(".input_box").find('.ib_move').length < 5) {
				$(createInput8())
				.appendTo(".ib_list.add8");
				searchTxt();
				delFnc();//닫기버튼 호출
				selectDown();//동적 select 활성화
			}
		});
		$(".addItem.r9").click(function(){ //자소서 추가
			if ($(".addItem.r9").parents(".input_box").find('.ib_move').length < 5) {
				$(createInput9())
				.appendTo(".ib_list.add9");
				searchTxt();
				delFnc();//닫기버튼 호출
				selectDown();//동적 select 활성화
			}
		});
	}
	
	delFnc = function() {
		$(".deleteBox").click(function() {
			if(confirm("입력한 데이터는 삭제됩니다.\n정말 삭제하시겠습니까?")) {
				$(this).parent().remove();
			}
		});
	}
	
	searchTxt = function() {
		$('.search_box input').keyup(function(e) {
			$(this).next('.result_box').show();
		});
		$('.search_box .rb_direct, .search_box .rb_a').click(function(){
			$('.result_box').hide();
		});
		$('.search_box').mouseleave(function(){
			$('.result_box').hide();
		});
	}

	add_del_btn = function() {
		//포트폴리오 URL 추가
		$('.ib_add_btn.url').click (function () {
			$(this).prev('.ib_add.url').append (
				'<div>'
				+'<input type="hidden" id="portfolio_type1" name="portfolio_type1" value="1" />'
				+'<input type="text" id="pf_url_addr" name="pf_url_addr" class="txt" placeholder="" style="width:605px;">'
				+'<button type="button" class="btn_remove">삭제</button>'
				+'</div>'
			); // end append
			$('.btn_remove').on('click', function () { 
				$(this).parent().remove();
			});
		});
		//포트폴리오 FILE 추가
		$('.ib_add_btn.file').click (function () {
			$(this).prev('.ib_add.file').append (
				'<div>'
				+'	<span class="filebox">'
				+'		<span>찾아보기</span>'
				+'		<input type="hidden" id="portfolio_type2" name="portfolio_type2" value="1" />'
				+'		<input type="hidden" id="pf_origin_file" name="pf_origin_file" value="" />'
				+'		<input type="hidden" id="pf_upload_file" name="pf_upload_file" value="" />'
				+'		<input type="text" class="txt" name="pf_file_name" disabled="disabled" style="width:605px;">'
				+'		<input type="text" class="txt file" id="portfolio_file_upload" name="portfolio_file_upload" onclick="fn_portfolio_upload(this);">'
				+'	</span>'
				+'	<button type="button" class="btn_remove" onclick="fn_file_del(this);">삭제</button>'
				+'</div>'
			); // end append
			$('.btn_remove').on('click', function () {
				$(this).parent().remove();
			});
		})
		// end click
	}

	add_del_btn2 = function() {
		$('.add_test').click (function () {                                        
			$(this).prev('.con_add.test').append (                        
				'<div class="ca_input"><input type="text" name="name" class="txt" placeholder="시험명" style="width:370px;">'
			+'	<input type="text" name="name" class="txt" placeholder="점수/급" style="width:370px;">'
			+'	<input type="text" name="name" class="txt" placeholder="인증일자" style="width:360px;">'
			+'<button type="button" class="btn_remove">삭제</button></div>'); // end append          
			$('.btn_remove').on('click', function () { 
				$(this).parent('.ca_input').remove (); // remove the textbox
			});
		}); 
	}

	del_btn = function() {
		$('.btn_remove').on('click', function () { 
			$(this).parent().remove();
		});
	}

	selectboxFnc = function (obj) {//셀렉트박스
		var _select = null
		if (!obj)
			_select = $('.selectbox select');
		else
			_select = ($(obj).find('.selectbox select').length > 0) ? $(obj).find('.selectbox select') : $(obj);
		_select.unbind().each(function (index, value) {
			$(this).prev().html($(this).children('option:selected').text());
			if ($(this).val() == 'direct') {//직접입력
				$(this).parent().prev().css('display', 'inline');
			}
		}).bind('change keyup', function (evt) {
			$(this).prev().html($(this).children('option:selected').text());
			if ($(this).prev().is('.ellipsis')) $(this).prev().ellipsis();//글줄임 설정
			if ($(this).find("option[value='direct']").length == 1) {//직접입력 설정
				if ($(this).val() == 'direct') {
					$(this).parent().prev().css('display', 'inline');
					if (evt.type == 'change') $(this).parent().prev().focus();//직접입력 포커스 이동
				} else {
					$(this).parent().prev().css('display', 'none');
				}
			}
		}).bind('focus', function () {
			$(this).prev().addClass('on');
		}).bind('blur', function () {
			$(this).prev().removeClass('on');
		});
	}//셀렉트박스

    checkallFnc = function (obj, name) {//전체선택
        var _this = $(obj);
        var _chk = $('input[name='+name+']');
        if(_this.is(':checked')) {
            _chk.each(function(index, value) {
                $(this).attr('checked', true).parent().removeClass('off').addClass('on');
            });
        } else {
            _chk.each(function(index, value) {
                $(this).attr('checked', false).parent().removeClass('on').addClass('off');
            });
        }
    }//전체선택


	hiddenPop = function () {//팝업
		$('.pop_btn').click(function(){ 
			$(this).parent('.popup_area').find('.pop_sel, .dim').show(); 
			$(this).parent('.popup_area').addClass('on');
			
		}); 

		$('.popup_area .button.save, .dim').click(function(e){ 
			e.preventDefault(); 
			$('.popup_area').removeClass('on');
			$('.pop_sel, .dim').hide(); 
		}); 

    }//팝업

	popFnc = function () {//팝업
		$('.pop').click(function(){ 
			$('.popup, .pop_dim').show(); 
			$poHeight = $('.popup').outerHeight();
			docWidth = $(document).width(),
			winHeight = $(window).height();
			if ($poHeight > winHeight/*&& $poWidth < docWidth*/) {
				$('.popup').css("top", Math.max(0, $(window).scrollTop()));
				$('.popup').css({
					marginTop:0});
					//,marginLeft:-$poWidth / 2});
				return this;
			}
			else{
				$('.popup').css("top", Math.max(0,  $(window).scrollTop() + jQuery(window).height() / 2) + "px"); 
				$('.popup').css({
					marginTop: -$poHeight / 2});
					//,marginLeft: -$poWidth / 2});
			   return this;
			}
			
		}); 

		$('.layer_close, .pop_dim').click(function(e){ 
			e.preventDefault(); 
			$('.popup, .pop_dim').hide(); 
		}); 

		$('.popup .btn_area .btn').click(function(){ 
			$('.popup, .pop_dim').hide(); 
		}); 

    }//팝업

	/* 학력사항 추가 */
	createInput = function() {
		/*
		var contents = 
					'<div class="ib_move">'
				+'		<button type="button" name="이동버튼" class="ib_m_handle"></button>'
				+'		<div class="deleteBox">삭제</div>'
				+'		<div class="ib_m_box">'
				+'			<div class="select_down"  style="width:290px;" title="졸업상태">'
				+'				<div class="name"><a href="javaScript:;"><span>졸업상태</span></a></div>'
				+'				<div class="sel">'
				+'					<ul>'
				+'						<li><a href="javaScript:;">졸업</a></li>'
				+'						<li><a href="javaScript:;">자퇴</a></li>'
				+'						<li><a href="javaScript:;">재학중</a></li>'
				+'					</ul>'
				+'				</div>'
				+'			</div>'
				+'			<input type="text" name="name" class="txt" placeholder="입학년월" style="width:290px;">'
				+'			<input type="text" name="name" class="txt" placeholder="졸업년월" style="width:290px;">'
				+'			<input type="text" name="name" class="txt last" placeholder="학점" style="width:290px;">'
				+'			<div class="select_down"  style="width:290px;" title="1">'
				+'				<div class="name"><a href="#none"><span>1</span></a></div>'
				+'				<div class="sel">'
				+'					<ul>'
				+'						<li><a href="#none">1</a></li>'
				+'						<li><a href="#none">1</a></li>'
				+'						<li><a href="#none">1</a></li>'
				+'					</ul>'
				+'				</div>'
				+'			</div>'
				+'			<input type="text" name="name" class="txt" placeholder="학교명" style="width:433px;">'
				+'			<input type="text" name="name" class="txt last" placeholder="전공 및 학위 (ex. 경영학과 학사)" style="width:445px;">'
				+'			<input type="text" name="name" class="txt" placeholder="이수과목 및 연구내용" style="width:100%">'
				+'			<div class="con_add major">'
				+'				<div class="select_down" style="width:217px;" title="전공상태">'
				+'					<div class="name"><a href="javaScript:;"><span>전공상태</span></a></div>'
				+'					<div class="sel">'
				+'						<ul>'
				+'							<li><a href="javaScript:;">복수전공</a></li>'
				+'							<li><a href="javaScript:;">부전공</a></li>'
				+'						</ul>'
				+'					</div>'
				+'				</div>'
				+'				<input type="text" name="name" class="txt" placeholder="전공명" style="width:417px;">'
				+'			</div>'
				+'			<button type="button" name="전공추가" class="add_btn" onclick="toggleFnc();">다른 전공 추가</button>'
				+'		</div>'
				+'	</div>'
		return contents;
		*/

		var contents = ''
		contents += '<div class="ib_move">'
		contents += '	<button type="button" name="이동버튼" class="ib_m_handle"></button>'
		contents += '	<div class="deleteBox">삭제</div>'
		contents += '	<div class="ib_m_box">'
		contents += ''
		contents += '		<input type="hidden" id="univ_kind" name="univ_kind" value="">'
		contents += '		<input type="hidden" id="sc_type" name="sc_type" value="2">'
		contents += '		<input type="hidden" id="univ_depth" name="univ_depth" value=""> <!-- 계열코드(X) -->'
		contents += '		<input type="hidden" id="univ_pointavg" name="univ_pointavg" value=""> <!-- 학점기준(X) -->'
		contents += '		<input type="hidden" id="univ_code" name="univ_code" value=""> <!-- 대학코드(X) -->'
		contents += '		<input type="hidden" id="univ_major_code" name="univ_major_code" value=""> <!-- 전공코드(X) -->'
		contents += '		<input type="hidden" id="univ_area" name="univ_area" value=""> <!-- 지역코드(X) -->'
		contents += '		<input type="hidden" id="univ_stype" name="univ_stype" value="1"> <!-- 입학코드(X) -->'
		contents += '		<input type="hidden" id="univ1_grd" name="univ1_grd" value=""> <!-- 학위구분코드(X) -->'
		contents += ''
		contents += '		<input type="hidden" id="univ_syear" name="univ_syear" value="">'
		contents += '		<input type="hidden" id="univ_smonth" name="univ_smonth" value="">'
		contents += '		<input type="hidden" id="univ_eyear" name="univ_eyear" value="">'
		contents += '		<input type="hidden" id="univ_emonth" name="univ_emonth" value="">'
		contents += '		<input type="hidden" id="univ_etype" name="univ_etype" value=""> <!-- 졸업상태 -->'
		contents += '		<input type="hidden" id="univ_minor" name="univ_minor" value=""> <!-- 부전공 -->'
		contents += '		<input type="hidden" id="univ_mdepth" name="univ_mdepth" value=""> <!-- 부전공계열코드(X) -->'
		contents += '		<input type="hidden" id="univ_minor_code" name="univ_minor_code" value=""> <!-- 부전공코드(X) -->'
		contents += ''
		contents += '		<div class="select_down"  style="width:290px;" title="졸업상태">'
		contents += '			<div class="name"><a href="javaScript:;"><span>졸업상태</span></a></div>'
		contents += '			<div class="sel">'
		contents += '				<ul>'
		contents += '					<li><a href="javaScript:;" onclick="fn_sel_value_set(this, \'univ_etype\', \'3\')">재학</a></li>'
		contents += '					<li><a href="javaScript:;" onclick="fn_sel_value_set(this, \'univ_etype\', \'4\')">휴학</a></li>'
		contents += '					<li><a href="javaScript:;" onclick="fn_sel_value_set(this, \'univ_etype\', \'5\')">중퇴</a></li>'
		contents += '					<li><a href="javaScript:;" onclick="fn_sel_value_set(this, \'univ_etype\', \'7\')">졸업(예)</a></li>'
		contents += '					<li><a href="javaScript:;" onclick="fn_sel_value_set(this, \'univ_etype\', \'8\')">졸업</a></li>'
		contents += '				</ul>'
		contents += '			</div>'
		contents += '		</div>'
		contents += ''
		contents += '		<input type="text" name="univ_sdate" class="txt" placeholder="입학년월 (ex. 2019.03)" onkeyup="numCheck(this, \'int\'); changeDateType(this); fn_school_s_div(this);" onblur="chkDateType(this)" maxlength="6" style="width:290px;">'
		contents += '		<input type="text" name="univ_edate" class="txt" placeholder="졸업년월 (ex. 2020.02)" onkeyup="numCheck(this, \'int\'); changeDateType(this); fn_school_e_div(this);" onblur="chkDateType(this)" maxlength="6" style="width:290px;">'
		contents += '		<input type="text" id="univ_point" name="univ_point" class="txt last" placeholder="학점 (ex. 4.5)" maxlength="4" style="width:290px;">'
		contents += ''

		contents += '		<div class="select_down" style="width:290px;" title="학력구분">'
		contents += '			<div class="name"><a href="javaScript:;"><span>학력구분</span></a></div>'
		contents += '			<div class="sel">'
		contents += '				<ul id="ul_sel_univ_kind" style="display: none;">'
		contents += '					<li><a href="javaScript:;" onclick="fn_sel_value_set(this, \'univ_kind\', \'3\'); fn_school_chg_univ_kind(this, \'high\');">고등학교</a></li>'
		contents += '					<li><a href="javaScript:;" onclick="fn_sel_value_set(this, \'univ_kind\', \'4\'); fn_school_chg_univ_kind(this, \'univ\');">대학(2,3년)</a></li>'
		contents += '					<li><a href="javaScript:;" onclick="fn_sel_value_set(this, \'univ_kind\', \'5\'); fn_school_chg_univ_kind(this, \'univ\');">대학교(4년)</a></li>'
		contents += '					<li><a href="javaScript:;" onclick="fn_sel_value_set(this, \'univ_kind\', \'6\'); fn_school_chg_univ_kind(this, \'univ\');">대학원</a></li>'
		contents += '				</ul>'
		contents += '			</div>'
		contents += '		</div>'

		contents += '		<div class="search_box" style="width:433px;">'
		contents += '			<input type="text" id="univ_name" name="univ_name" class="txt" placeholder="학교명" onkeyup="fn_kwSearchItem(this, \'univ\')" style="width:100%;">'
		contents += '			<div class="result_box" id="id_result_box">'
		contents += '			</div>'
		contents += '		</div>'
		contents += ''
		contents += '		<input type="text" id="univ_major" name="univ_major" class="txt last" placeholder="전공 및 학위 (ex. 경영학과 학사)" style="width:445px;">'
		contents += '		<input type="text" id="univ_research" name="univ_research" class="txt" placeholder="이수과목 및 연구내용" style="width:100%">'
		contents += ''
		contents += '		<div class="con_add major" style="display:none;">'
		contents += '			<div class="select_down" style="width:217px;" title="전공상태">'
		contents += '				<div class="name"><a href="javaScript:;"><span>전공상태</span></a></div>'
		contents += '				<div class="sel">'
		contents += '					<ul>'
		contents += '						<li><a href="javaScript:;" onclick="fn_sel_value_set(this, \'univ_minor\', \'부\')">부전공</a></li>'
		contents += '						<li><a href="javaScript:;" onclick="fn_sel_value_set(this, \'univ_minor\', \'복수\')">복수전공</a></li>'
		contents += '					</ul>'
		contents += '				</div>'
		contents += '			</div>'
		contents += '			<input type="text" id="univ_minornm" name="univ_minornm" class="txt" placeholder="전공명" style="width:417px;">'
		contents += '		</div>'
		contents += ''
		contents += '		<button type="button" id="univ_add_minor" name="전공추가" class="add_btn on">다른 전공 추가</button>'
		contents += '	</div>'
		contents += '</div>'
		return contents;
		
	}
	
	/* 경력사항 추가 */
	createInput2 = function() {
		/*
		var contents = 
			'<div class="ib_move">'
		+'		<button type="button" name="이동버튼" class="ib_m_handle"></button>'
		+'				<div class="deleteBox">삭제</div>'
		+'				<div class="ib_m_box">'
		+'					<div class="select_down"  style="width:352px;" title="근무상태">'
		+'						<div class="name"><a href="javaScript:;"><span>근무상태</span></a></div>'
		+'						<div class="sel">'
		+'							<ul>'
		+'								<li><a href="javaScript:;">재직중</a></li>'
		+'								<li><a href="javaScript:;">퇴사</a></li>'
		+'							</ul>'
		+'						</div>'
		+'					</div>'
		+'					<input type="text" name="name" class="txt" placeholder="입사년월" style="width:403px;">'
		+'					<input type="text" name="name" class="txt last" placeholder="퇴사년월" style="width:410px;">'
		+'					<div class="search_box" style="width:486px;">'
		+'						<input type="text" name="name" class="txt" placeholder="회사명" style="width:100%;">'
		+'						<div class="result_box">'
		+'							<ul class="rb_ul">'
		+'								<li>'
		+'									<a href="javaScript:;" class="rb_a">'
		+'										<p>커리어넷</p>'
		+'										<span>보호대상중견기업</span><span>고용알선업</span>'
		+'									</a>'
		+'								</li>'
		+'							</ul>'
		+'							<a href="javaScript:;" class="rb_direct"><span>커리어넷</span> 직접입력</a>'
		+'						</div>'
		+'						<label class="checkbox off" for="open">'
		+'							<input type="checkbox" id="open" class="chk" name="open_hidden" value="Y">'
		+'								<span>공개</span>'
		+'						</label>'
		+'						<label class="checkbox off" for="hidden">'
		+'							<input type="checkbox" id="hidden" class="chk" name="open_hidden" value="Y">'
		+'								<span>비공개</span>'
		+'						</label>'
		+'					</div>'
		+'					<input type="text" name="name" class="txt last" placeholder="부서명/직책" style="width:691px;">'	
		+'					<div class="con_add">'
		+'						<textarea>'
		+'						</textarea>'
		+'					</div>'
		+'					<button type="button" name="전공추가" class="add_btn" onclick="toggleFnc();">주요성과 및 경력기술</button>'
		+'				</div>'
		+'				</div>'
		return contents;
		*/

		var contents = ''
		contents += '<div class="ib_move">'
		contents += '	<button type="button" name="이동버튼" class="ib_m_handle"></button>'
		contents += '	<div class="deleteBox">삭제</div>'
		contents += '	<div class="ib_m_box">'
		contents += '		<input type="hidden" id="experience_syear" name="experience_syear" value="" />'
		contents += '		<input type="hidden" id="experience_smonth" name="experience_smonth" value="" />'
		contents += '		<input type="hidden" id="experience_eyear" name="experience_eyear" value="" />'
		contents += '		<input type="hidden" id="experience_emonth" name="experience_emonth" value="" />'
		contents += '		<input type="hidden" id="experience_nowstatus_hdn" name="experience_nowstatus_hdn" value="" />'
		contents += '		<input type="hidden" id="com_close_hdn" name="com_close_hdn" value="1" />'
		contents += ''
		contents += '		<input type="hidden" id="openis_hdn" name="openis_hdn" value="" />'
		contents += '		<input type="hidden" id="experience_salary_txt" name="experience_salary_txt" value="" />'
		contents += '		<input type="hidden" id="experience_salary5" name="experience_salary5" value="" />'
		contents += '		<input type="hidden" id="experience_duty" name="experience_duty" value="" />'
		contents += '		<input type="hidden" id="experience_corp_id" name="experience_corp_id" value="" />'
		contents += ''
		contents += '		<div class="select_down"  style="width:352px;" title="근무상태">'
		contents += '			<div class="name"><a href="javaScript:;"><span>근무상태</span></a></div>'
		contents += '			<div class="sel">'
		contents += '				<ul>'
		contents += '					<li><a href="javaScript:;" onclick="fn_sel_value_set(this, \'experience_nowstatus_hdn\', \'2\'); fn_career_sel_hdn(this, \'2\');">재직중</a></li>'
		contents += '					<li><a href="javaScript:;" onclick="fn_sel_value_set(this, \'experience_nowstatus_hdn\', \'1\'); fn_career_sel_hdn(this, \'1\');">퇴사</a></li>'
		contents += '				</ul>'
		contents += '			</div>'
		contents += '		</div>'
		contents += ''
		contents += '		<input type="text" id="experience_sdate" name="experience_sdate" class="txt" placeholder="입사년월 (ex. 2019.02)" onkeyup="numCheck(this, \'int\'); changeDateType(this); fn_career_s_div(this);" onblur="chkDateType(this)" maxlength="6" style="width:403px;">'
		contents += '		<input type="text" id="experience_edate" name="experience_edate" class="txt last" placeholder="퇴사년월 (ex. 2020.03)" onkeyup="numCheck(this, \'int\'); changeDateType(this); fn_career_e_div(this);" onblur="chkDateType(this)" maxlength="6" style="width:410px;">'
		contents += '		<div class="disabled" id="experience_edate_disabled" style="width:405px; display:none;"><span>퇴사년월 (ex. 2020.03)</span></div>'
		contents += '		<div class="search_box" style="width:486px;">'
		contents += '			<input type="text" id="experience_corp_name" name="experience_corp_name" class="txt" placeholder="회사명" onkeyup="fn_kwSearchItem(this, \'company\')" style="width:100%;">'
		contents += '			<div class="result_box" id="id_result_box">'
		contents += '			</div>'
		contents += '			<label class="checkbox off"><input type="checkbox" class="chk" id="chk_career_hidden" onclick="fn_career_hidden_chk(this)"><span>회사명 비공개</span></label>'
		contents += '		</div>'
		contents += '		<input type="text" name="experience_dept" class="txt last" placeholder="부서명/직책" style="width:691px;">'
		contents += '		<div class="con_add" style="display:none;">'
		contents += '			<textarea name="rca_part_skill"></textarea>'
		contents += '		</div>'
		contents += '		<button type="button" name="전공추가" class="add_btn on" onclick="toggleFnc();">주요성과 및 경력기술</button>'
		contents += '	</div>'
		contents += '</div>'
		return contents;
		
	}

	/* 인턴,대외활동 추가 */
	createInput3 = function() {
		/*
		var contents = 
					'<div class="ib_move">'
				+'		<button type="button" name="이동버튼" class="ib_m_handle"></button>'
				+'		<div class="deleteBox">삭제</div>'
				+'		<div class="ib_m_box">'
				+'			<input type="text" name="name" class="txt" placeholder="시작년월" style="width:289px;">'
				+'			<input type="text" name="name" class="txt" placeholder="종료년월" style="width:289px;">'
				+'			<div class="select_down"  style="width:288px;" title="활동구분">'
				+'			 	<div class="name"><a href="javaScript:;"><span>활동구분</span></a></div>'
				+'				<div class="sel">'
				+'					<ul>'
				+'					<li><a href="javaScript:;">1</a></li>'
				+'					<li><a href="javaScript:;">2</a></li>'
				+'					</ul>'
				+'				</div>'
				+'			</div>'
				+'			<input type="text" name="name" class="txt last" placeholder="회사/기관/단체명" style="width:288px;">'
				+'			<textarea class="area" name="content" placeholder="직무와 관련된 경험을 서술해주세요."></textarea>'
				+'			</textarea>'
				+'		</div>'
				+'	</div>'
		return contents;
		*/

		var contents = ''
		contents += '<div class="ib_move">'
		contents += '	<button type="button" name="이동버튼" class="ib_m_handle ui-sortable-handle"></button>'
		contents += '	<div class="deleteBox">삭제</div>'
		contents += '	<div class="ib_m_box">'
		contents += '		<input type="hidden" id="rac_type" name="rac_type" value="" />'
		contents += '		<input type="hidden" id="rac_type_text" name="rac_type_text" value=" " />'
		contents += '		<input type="hidden" id="rac_syear" name="rac_syear" value="" />'
		contents += '		<input type="hidden" id="rac_smonth" name="rac_smonth" value="" />'
		contents += '		<input type="hidden" id="rac_eyear" name="rac_eyear" value="" />'
		contents += '		<input type="hidden" id="rac_emonth" name="rac_emonth" value="" />'
		contents += '		<input type="hidden" id="rac_location" name="rac_location" value=" " />'
		contents += ''
		contents += '		<input type="text" name="rac_sdate" class="txt" placeholder="시작년월 (ex. 2019.02)" onkeyup="numCheck(this, \'int\'); changeDateType(this); fn_rac_s_div(this);" onblur="chkDateType(this)" maxlength="6" style="width:289px;">'
		contents += '		<input type="text" name="rac_edate" class="txt" placeholder="종료년월 (ex. 2020.03)" onkeyup="numCheck(this, \'int\'); changeDateType(this); fn_rac_e_div(this);" onblur="chkDateType(this)" maxlength="6" style="width:289px;">'
		contents += '		<div class="select_down" style="width:288px;" title="활동구분">'
		contents += '			<div class="name"><a href="javaScript:;"><span>활동구분</span></a></div>'
		contents += '			<div class="sel">'
		contents += '				<ul style="display: none;">'
		contents += '					<li><a href="javaScript:;" onclick="fn_sel_value_set(this, \'rac_type\', \'1\')">인턴</a></li>'
		contents += '					<li><a href="javaScript:;" onclick="fn_sel_value_set(this, \'rac_type\', \'2\')">아르바이트</a></li>'
		contents += '					<li><a href="javaScript:;" onclick="fn_sel_value_set(this, \'rac_type\', \'3\')">교내활동</a></li>'
		contents += '					<li><a href="javaScript:;" onclick="fn_sel_value_set(this, \'rac_type\', \'4\')">동아리</a></li>'
		contents += '					<li><a href="javaScript:;" onclick="fn_sel_value_set(this, \'rac_type\', \'5\')">자원봉사</a></li>'
		contents += '				</ul>'
		contents += '			</div>'
		contents += '		</div>'
		contents += '		<input type="text" name="rac_organization" class="txt last" placeholder="회사/기관/단체명" style="width:288px;">'
		contents += '		<textarea class="area" name="rac_content" placeholder="직무와 관련된 경험을 서술해주세요."></textarea>'
		contents += '	</div>'
		contents += '</div>'
		return contents;
		
	}	
	/* 외국어 추가 */
	createInput4 = function() {
		/*
		var contents = 
					'<div class="ib_move non">'
			+'			<div class="deleteBox">삭제</div>'
			+'			<div class="ib_m_box">'
			+'				<div class="select_down"  style="width:200px;" title="구분">'
			+'					<div class="name"><a href="javaScript:;"><span>구분</span></a></div>'
			+'					<div class="sel">'
			+'						<ul>'
			+'							<li><a href="javaScript:;" class="skill">회화능력</a></li>'
			+'							<li><a href="javaScript:;" class="test">공인시험</a></li>'
			+'						</ul>'
			+'					</div>'
			+'				</div>'
			+'				<div class="select_down skill"  style="width:250px;" title="외국어명">'
			+'					<div class="name"><a href="javaScript:;"><span>외국어명</span></a></div>'
			+'					<div class="sel">'
			+'						<ul>'
			+'							<li><a href="javaScript:;">영어</a></li>'
			+'							<li><a href="javaScript:;">일본어</a></li>'
			+'							<li><a href="javaScript:;">중국어</a></li>'
			+'						</ul>'
			+'					</div>'
			+'				</div>'
			+'				<div class="select_down skill"  style="width:276px;" title="회화능력">'
			+'					<div class="name"><a href="javaScript:;"><span>회화능력</span></a></div>'
			+'					<div class="sel">'
			+'						<ul>'
			+'							<li><a href="javaScript:;">상</a></li>'
			+'							<li><a href="javaScript:;">중</a></li>'
			+'							<li><a href="javaScript:;">하</a></li>'
			+'						</ul>'
			+'					</div>'
			+'				</div>'
			+'				<div class="select_down test"  style="width:250px; display:none;" title="외국어명">'
			+'					<div class="name"><a href="javaScript:;"><span>외국어명</span></a></div>'
			+'					<div class="sel">'
			+'						<ul>'
			+'							<li><a href="javaScript:;">영어</a></li>'
			+'							<li><a href="javaScript:;">일본어</a></li>'
			+'							<li><a href="javaScript:;">중국어</a></li>'
			+'						</ul>'
			+'					</div>'
			+'				</div>'
			+'				<div class="select_down test"  style="width:276px; display:none;" title="회화능력">'
			+'					<div class="name"><a href="javaScript:;"><span>회화능력</span></a></div>'
			+'					<div class="sel">'
			+'						<ul>'
			+'							<li><a href="javaScript:;">상</a></li>'
			+'							<li><a href="javaScript:;">중</a></li>'
			+'							<li><a href="javaScript:;">하</a></li>'
			+'						</ul>'
			+'					</div>'
			+'				</div>'
			+'				<br>'
			+'				<div class="con_add test" style="display:none;">'
			+'					<div class="ca_input">'
			+'						<input type="text" name="name" class="txt" placeholder="시험명" style="width:370px;">'
			+'						<input type="text" name="name" class="txt" placeholder="점수/급" style="width:370px;">'
			+'						<input type="text" name="name" class="txt" placeholder="인증일자" style="width:360px;">'
			+'					</div>'			
			+'				</div>'
			+'				<button type="button" name="어학시험 추가" class="add_test">어학시험 추가</button>'
			+'			</div>'
			+'		</div>'
		return contents;
		*/

		// /rsub_05_language.asp 최초 페이지로딩시 불러온 옵션
		var language_sel_option = $("#language_sel_option").html();

		var contents = ''
		contents += '<div class="ib_move non">'
		contents += '	<div class="deleteBox">삭제</div>'
		contents += '	<div class="ib_m_box">'
		contents += '		<div class="select_down"  style="width:200px;" title="구분">'
		contents += '			<div class="name"><a href="javaScript:;"><span>구분</span></a></div>'
		contents += '			<div class="sel">'
		contents += '				<ul>'
		contents += '					<li><a href="javaScript:;" class="skill" onclick="fn_language_reset(this, \'1\')">회화능력</a></li>'
		contents += '					<li><a href="javaScript:;" class="test" onclick="fn_language_reset(this, \'2\')">공인시험</a></li>'
		contents += '				</ul>'
		contents += '			</div>'
		contents += '		</div>'
		contents += ''
		contents += '		<!-- 회화능력 -->'
		contents += '		<input type="hidden" id="language_name" name="language_name" value="" />'
		contents += '		<input type="hidden" id="language_talk" name="language_talk" value="" />'
		contents += '		<input type="hidden" id="language_read" name="language_read" value="" />'
		contents += '		<input type="hidden" id="language_write" name="language_write" value="" />'
		contents += ''
		contents += '		<div class="select_down skill" style="width:250px;" title="외국어명">'
		contents += '			<div class="name"><a href="javaScript:;"><span id="language_title_name">외국어명</span></a></div>'
		contents += '			<div class="sel">'
		contents += '				<ul>'
		contents +=					language_sel_option
		contents += '				</ul>'
		contents += '			</div>'
		contents += '		</div>'
		contents += '		<div class="select_down skill" style="width:276px;" title="회화능력">'
		contents += '			<div class="name"><a href="javaScript:;"><span id="language_title_talk">회화능력</span></a></div>'
		contents += '			<div class="sel">'
		contents += '				<ul>'
		contents += '					<li><a href="javaScript:;" onclick="fn_sel_value_set(this, \'language_talk\', \'1\');">상</a></li>'
		contents += '					<li><a href="javaScript:;" onclick="fn_sel_value_set(this, \'language_talk\', \'2\');">중</a></li>'
		contents += '					<li><a href="javaScript:;" onclick="fn_sel_value_set(this, \'language_talk\', \'3\');">하</a></li>'
		contents += '				</ul>'
		contents += '			</div>'
		contents += '		</div>'
		contents += '		<!-- //회화능력 -->'
		contents += ''
		contents += '		<!-- 공인시험 -->'
		contents += '		<input type="hidden" id="language_exam_group" name="language_exam_group" value="" />'
		contents += '		<input type="hidden" id="language_exam" name="language_exam" value="" />'
		contents += '		<input type="hidden" id="language_year" name="language_year" value="" />'
		contents += '		<input type="hidden" id="language_month" name="language_month" value="" />'
		contents += ''
		contents += '		<input type="hidden" id="language_exam_etc" name="language_exam_etc" value="" />'
		contents += '		<input type="hidden" id="language_grade_opic" name="language_grade_opic" value="" />'
		contents += ''
		contents += '		<div class="select_down test"  style="width:250px; display:none;" title="외국어명">'
		contents += '			<div class="name"><a href="javaScript:;"><span id="language_title_exam_group">외국어명</span></a></div>'
		contents += '			<div class="sel">'
		contents += '				<ul>'
		contents += '					<li><a href="javaScript:;" onclick="fn_sel_value_set(this, \'language_exam_group\', \'1\'); fn_chgLanguage(this, \'1\');">영어</a></li>'
		contents += '					<li><a href="javaScript:;" onclick="fn_sel_value_set(this, \'language_exam_group\', \'2\'); fn_chgLanguage(this, \'2\');">일본어</a></li>'
		contents += '					<li><a href="javaScript:;" onclick="fn_sel_value_set(this, \'language_exam_group\', \'3\'); fn_chgLanguage(this, \'3\');">중국어</a></li>'
		contents += '					<li><a href="javaScript:;" onclick="fn_sel_value_set(this, \'language_exam_group\', \'4\'); fn_chgLanguage(this, \'4\');">프랑스어</a></li>'
		contents += '					<li><a href="javaScript:;" onclick="fn_sel_value_set(this, \'language_exam_group\', \'5\'); fn_chgLanguage(this, \'5\');">독일어</a></li>'
		contents += '				</ul>'
		contents += '			</div>'
		contents += '		</div>'
		contents += '		<div class="con_add test" style="display: none;">'
		contents += '			<div class="ca_input">'
		contents += '				<div class="select_down" style="width:370px;" title="시험명">'
		contents += '					<div class="name"><a href="javaScript:;"><span id="language_title_exam">시험명</span></a></div>'
		contents += '					<div class="sel">'
		contents += '						<ul id="language_exam_list">'
		contents += '						</ul>'
		contents += '					</div>'
		contents += '				</div>'
		contents += '				<input type="text" id="language_grade" name="language_grade" class="txt" placeholder="점수/급" maxlength="10" style="width:370px;">'
		contents += '				<input type="text" id="language_date" name="language_date" class="txt last" placeholder="인증일자 (ex. 2020.03)" onkeyup="numCheck(this, \'int\'); changeDateType(this); fn_language_div(this);" onblur="chkDateType(this)" maxlength="6" style="width:360px;">'
		contents += '			</div>'
		contents += '		</div>'
		contents += '		<!-- //공인시험 -->'
		contents += '	</div>'
		contents += '</div>'

		return contents;
	}	
	/* 자격증 추가 */
	createInput5 = function() {

		/*
		var contents = 
					'<div class="ib_move non">'
				+'		<div class="deleteBox">삭제</div>'
				+'		<div class="ib_m_box">'
				+'			<input type="text" name="name" class="txt" placeholder="취득년월" style="width:300px;">'
				+'			<input type="text" name="name" class="txt" placeholder="자격증명" style="width:595px;">'
				+'			<input type="text" name="name" class="txt last" placeholder="발급기관" style="width:310px;">'
				+'		</div>'
				+'	</div>'
		return contents;
		*/

		var contents = ''
		contents += '<div class="ib_move non">'
		contents += '	<div class="deleteBox">삭제</div>'
		contents += '	<div class="ib_m_box">'
		contents += '		<input type="hidden" name="license_code" value="" />'
		contents += '		<input type="hidden" id="license_year" name="license_year" value="" />'
		contents += '		<input type="hidden" id="license_month" name="license_month" value="" />'
		contents += ''
		contents += '		<input type="text" name="license_date" class="txt" placeholder="취득년월 (ex. 2020.03)" onkeyup="numCheck(this, \'int\'); changeDateType(this); fn_license_div(this);" onblur="chkDateType(this)" maxlength="6" style="width:300px;">'
		contents += '		<div class="search_box" style="width:595px;">'
		contents += '			<input type="text" id="license_name" name="license_name" class="txt" placeholder="자격증명" onkeyup="fn_kwSearchItem(this, \'license\')" style="width:595px;">'
		contents += '			<div class="result_box" id="id_result_box">'
		contents += '			</div>'
		contents += '		</div>'
		contents += '		<input type="text" name="license_org" class="txt last" placeholder="발급기관" style="width:310px;">'
		contents += '	</div>'
		contents += '</div>'

		return contents;
	}
	/* 수상 추가 */
	createInput6 = function() {
		
		/*
		var contents = 
					'<div class="ib_move non">'
			+'			<div class="deleteBox">삭제</div>'
			+'			<div class="ib_m_box">'
			+'				<input type="text" name="name" class="txt" placeholder="수상년월" style="width:300px;">'
			+'				<input type="text" name="name" class="txt" placeholder="수상명" style="width:595px;">'
			+'				<input type="text" name="name" class="txt last" placeholder="수상기관" style="width:310px;">'
			+'			</div>'
			+'		</div>'
		return contents;
		*/

		var contents = ''
		contents += '		<div class="ib_move non">'
		contents += '			<div class="deleteBox">삭제</div>'
		contents += '			<div class="ib_m_box">'
		contents += '				<input type="hidden" id="prize_year" name="prize_year" value="" />'
		contents += '				<input type="hidden" id="prize_month" name="prize_month" value="" />'
		contents += '				<input type="text" name="prize_date" class="txt" placeholder="수상년월 (ex. 2020.03)" onkeyup="numCheck(this, \'int\'); changeDateType(this); fn_awards_div(this);" onblur="chkDateType(this)" maxlength="6" style="width:300px;">'
		contents += '				<input type="text" name="prize_name" class="txt" placeholder="수상명" style="width:595px;">'
		contents += '				<input type="text" name="prize_org_name" class="txt last" placeholder="수상기관" style="width:310px;">'
		contents += '			</div>'
		contents += '		</div>'
		return contents;
	}
	/* 교육 추가 */
	createInput7 = function() {
		/*
		var contents = 
					'<div class="ib_move non">'
			+'			<div class="deleteBox">삭제</div>'
			+'			<div class="ib_m_box">'
			+'				<input type="text" name="name" class="txt" placeholder="시작년월" style="width:298px;">'
			+'				<input type="text" name="name" class="txt" placeholder="종료년월" style="width:298px;">'
			+'				<input type="text" name="name" class="txt" placeholder="교육명" style="width:298px;">'
			+'				<input type="text" name="name" class="txt last" placeholder="교육기관" style="width:298px;">'
			+'				<div class="con_add">'
			+'					<textarea></textarea>'
			+'				</div>'
			+'				<button type="button" name="교육 서술" class="add_btn" onclick="toggleFnc();">직무와 관련된 경험을 서술해주세요.</button>'
			+'			</div>'
			+'		</div>'
		return contents;
		*/

		var contents = ''
		contents += '<div class="ib_move non">'
		contents += '	<div class="deleteBox">삭제</div>'
		contents += '	<div class="ib_m_box">'
		contents += '		<input type="hidden" id="academy_syear" name="academy_syear" value="" />'
		contents += '		<input type="hidden" id="academy_smonth" name="academy_smonth" value="" />'
		contents += '		<input type="hidden" id="academy_eyear" name="academy_eyear" value="" />'
		contents += '		<input type="hidden" id="academy_emonth" name="academy_emonth" value="" />'
		contents += ''
		contents += '		<input type="text" name="academy_sdate" class="txt" placeholder="시작년월 (ex. 2019.02)" onkeyup="numCheck(this, \'int\'); changeDateType(this); fn_education_s_div(this);" onblur="chkDateType(this)" maxlength="6" style="width:298px;">'
		contents += '		<input type="text" name="academy_edate" class="txt" placeholder="종료년월 (ex. 2020.03)" onkeyup="numCheck(this, \'int\'); changeDateType(this); fn_education_e_div(this);" onblur="chkDateType(this)" maxlength="6" style="width:298px;">'
		contents += '		<input type="text" name="academy_name" class="txt" placeholder="교육명" style="width:298px;">'
		contents += '		<input type="text" name="academy_org_name" class="txt last" placeholder="교육기관" style="width:298px;">'
		contents += '	</div>'
		contents += '</div>'
		return contents;
	}
	/* 해외경험 추가 */
	createInput8 = function() {
		/*
		var contents = 
					'<div class="ib_move non">'
			+'			<div class="deleteBox">삭제</div>'
			+'			<div class="ib_m_box">'
			+'				<input type="text" name="name" class="txt" placeholder="시작년월" style="width:300px;">'
			+'				<input type="text" name="name" class="txt" placeholder="종료년월" style="width:300px;">'
			+'				<input type="text" name="name" class="txt last" placeholder="국가명" style="width:605px;">'
			+'				<textarea class="area" name="content" placeholder="해외에서 어떤 경험을 했는지 적어주세요 (ex. 어학연수, 교환학생, 워킹 홀리데이, 해외근무)"></textarea>'
			+'			</div>'
			+'		</div>'
		return contents;
		*/
		
		// /rsub_09_overseas.asp 최초 페이지로딩시 불러온 옵션
		var overseas_sel_option = $("#overseas_sel_option").html();

		var contents = ''
		contents += '<div class="ib_move non">'
		contents += '	<div class="deleteBox">삭제</div>'
		contents += '	<div class="ib_m_box">'
		contents += '		<input type="hidden" id="abroad_nation_code" name="abroad_nation_code" value="" />'
		contents += '		<input type="hidden" id="abroad_org_name" name="abroad_org_name" value="" />'
		contents += '		<input type="hidden" id="abroad_syear" name="abroad_syear" value="" />'
		contents += '		<input type="hidden" id="abroad_smonth" name="abroad_smonth" value="" />'
		contents += '		<input type="hidden" id="abroad_eyear" name="abroad_eyear" value="" />'
		contents += '		<input type="hidden" id="abroad_emonth" name="abroad_emonth" value="" />'
		contents += ''
		contents += '		<input type="text" name="abroad_edate" class="txt" placeholder="종료년월 (ex. 2020.03)" onkeyup="numCheck(this, \'int\'); changeDateType(this); fn_overseas_e_div(this);" onblur="chkDateType(this)" maxlength="6" style="width:300px;">'
		contents += '		<input type="text" name="abroad_sdate" class="txt" placeholder="시작년월 (ex. 2019.02)" onkeyup="numCheck(this, \'int\'); changeDateType(this); fn_overseas_s_div(this);" onblur="chkDateType(this)" maxlength="6" style="width:300px;">'
		contents += '		<div class="select_down" style="width:600px;" title="국가명">'
		contents += '			<div class="name"><a href="javaScript:;"><span>국가명</span></a></div>'
		contents += '			<div class="sel">'
		contents += '				<ul>'
		contents +=					overseas_sel_option
		contents += '				</ul>'
		contents += '			</div>'
		contents += '		</div>'
		contents += '		<textarea class="area" name="abroad_academy_name" placeholder="해외에서 어떤 경험을 했는지 적어주세요 (ex. 어학연수, 교환학생, 워킹 홀리데이, 해외근무)"></textarea>'
		contents += '	</div>'
		contents += '</div>'
		return contents;

	}
	/* 자기소개서 추가 */
	createInput9 = function() {
		/*
		var contents = 
					'<div class="ib_move non">'
				+'		<div class="deleteBox">삭제</div>'
				+'		<div class="ib_m_box">'
				+'			<input type="text" name="name" class="txt" placeholder="항목 제목" style="width:100%;">'
				+'			<textarea class="area" name="content" placeholder="해당 내용을 입력해주세요."></textarea>'
				+'		</div>'
				+'	</div>'
		return contents;
		*/

		var contents = ''
		contents += '<div class="ib_move non">'
		contents += '	<div class="deleteBox">삭제</div>'
		contents += '	<div class="ib_m_box">'
		contents += '		<input type="hidden" id="res_seq" name="res_seq" value="0">'
		contents += '		<input type="text" id="res_quotation" name="res_quotation" class="txt" placeholder="항목 제목" style="width:100%;">'
		contents += '		<textarea class="area" id="res_content" name="res_content" placeholder="해당 내용을 입력해주세요."></textarea>'
		contents += '	</div>'
		contents += '</div>'
		return contents;

	}	

});
