$(function() {
	$(document).ready(function() {
		//tabFnc();//탭
		accordionFnc();//아코디언
        selectboxFnc();//셀렉트박스
		selectDown();//셀렉트형 UL
		showBox();//click 박스 Show or hidden
        checkboxFnc();//체크박스.
		chkpassFnc();//체크박스 비밀번호 보이기/감추기
        radioboxFnc();//라디오박스
		popUp();//팝업

		//if ($('input.placehd, textarea.placehd').length > 0) $('input.placehd, textarea.placehd').placeholder();//input,textarea placehd
		if ($('.datepicker').length > 0) useDatePicker();//달력
	});
	
	tabFnc = function(){
		$(".tab_content").hide();
		$(".tabs li:first").addClass("on").show();
		$(".tab_content:first").show();

		$(".tabs li").click(function() {
			$(".tabs li").removeClass("on");
			$(".acco li a").removeClass("on")
			$(".acco_txt").hide();
			$(this).addClass("on"); 
			$(".tab_content").hide();
			var activeTab = $(this).find("a").attr("href");
			$(activeTab).fadeIn();
			return false;
		});
	}//탭

	accordionFnc = function(){
		$(".acco li a").click(function(){
			$(this).toggleClass('on');
			$(this).next().slideToggle(300);
			$(".acco li a").not(this).next().slideUp(300);
			$(".acco li a").not(this).removeClass('on');
			return false;
		});
	}//아코디언

	selectboxFnc = function (obj) {
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

	selectDown = function() {
		$(".select_box .name a").click(function() {
			$(this).parents('.name').next('.sel').find('ul').show();
		});
					
		$(".select_box .sel ul li a").click(function() {
			var text = $(this).html();
			$(this).parents('.sel').prev('.name').find('span').html(text);
			$(this).parents('.sel').find('ul').hide();
		});

		$(document).bind('click', function(e) {
			var $clicked = $(e.target);
			if (! $clicked.parents().hasClass("select_box"))
				$(".select_box .sel ul").hide();
		});			
	}//셀렉트형 UL

	showBox = function() {
		$(".show_box .name a").click(function() {
			$(this).parents('.name').next('.sel').find('ul').show();
		});
					
		$(".show_box .sel ul li a").click(function() {
			$(this).parents('.sel').find('ul').hide();
		});

		$(document).bind('click', function(e) {
			var $clicked = $(e.target);
			if (! $clicked.parents().hasClass("show_box"))
				$(".show_box .sel ul").hide();
		});			
	}// click 박스 Show or hidden

    checkboxFnc = function () {//체크박스
        var _chk = $('.chk').parent();
        _chk.each(function() {
            if ($(this).find('input').is(':checked')) {
                $(this).removeClass('off').addClass('on');

            } else {
                $(this).removeClass('on').addClass('off');
            }
        }).click(function() {
            if ($(this).find('input').is(':checked')) {
                $(this).removeClass('off').addClass('on');
            } else {
                $(this).removeClass('on').addClass('off');
            }
        });
    }//체크박스

	chkpassFnc = function () {
		$("#passChk").change(function(){
			// Check the checkbox state
			if($(this).is(':checked')){
				// Changing type attribute
				$("#inPass").attr("type","text");

				// Change the Text
				//$(".pass_txt").text("비밀번호 보이기");
			}else{
				// Changing type attribute
				$("#inPass").attr("type","password");

				// Change the Text
				//$(".pass_txt").text("비밀번호 감추기");
			}
		});
	} //패스워드 보이기/감추기

    radioboxFnc = function () {

		//비활성화 클래스명
		$(".disable").attr("readonly",true);
		$(".disable").attr("disabled",true);

        var _rdi = $('.rdi').parent();
        _rdi.unbind().each(function() {
            if ($(this).find('input').is(':checked')) {
                $(this).removeClass('off').addClass('on');
            }else if ($(this).find('input').is('[disabled=disabled]'))//비활성화시킬때
			{
				$(this).find("span").css({'color':'#a8a8a8','cursor':'default'});
				$(this).find('input').attr('name','disable')
			} else {
                $(this).removeClass('on').addClass('off');
            }
        }).bind('click', function() {
            var _name = $(this).find('input').attr('name');
            var _radio = $('label input[name$='+_name+']');
            var _index = _radio.parent().index(this);
            _radio.each(function(index, value) {
                if (_index == index) {
                    $(this).checked = true;
                    $(this).parent().removeClass('off').addClass('on');
					if ($(this).is('[disabled=disabled]'))
					{
						$(this).parent().removeClass('on');
					}
                } else {
                    $(this).checked = false;
                    $(this).parent().removeClass('on').addClass('off');
                }
            });
        });
        
        $('input:radio').click(function() {
            $('input:radio[name='+$(this).attr('name')+']').parent().removeClass('on');
            $(this).parent().addClass('on');
        });
		
    }//라디오박스

	popUp = function(){//레이어팝업*/
		$openPop = $(".pop");
		$closePop = $(".pop_up .btn.close, .pop_up .pop_close");

		$openPop.click(function(){
			var popHref = $(this).attr("href");
			$(popHref).show().find(".dim").show();
		});

		$closePop.click(function(){
			$(this).parents(".pop_up").hide().find(".dim").hide();
		});

	}//레이어팝업*/

	useDatePicker = function() {
	
		$(document).ready(function() {

			//datepicker 한국어로 사용하기 위한 언어설정
			$.datepicker.setDefaults($.datepicker.regional['ko']);     
		
			// Datepicker
			$(".datepicker.only").datepicker({
				dateFormat: "yy-mm-dd",
				dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
				monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
				monthNamesShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
				changeMonth: true,
				changeYear: true,
				showButtonPanel: true,
				closeText: '닫기',
				currentText: '오늘',

			});

			$(".datepicker.two").datepicker({
				dateFormat: "yy-mm-dd",
				dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
				monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
				monthNamesShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
				changeMonth: true,
				changeYear: true,
				showButtonPanel: true,
				closeText: '닫기',
				currentText: '오늘',
				onClose : function ( selectedDate ) {
					var eleId = $(this).attr("id");
					var optionName = "";
					if(eleId.indexOf("StartDate") > 0) {
						eleId = eleId.replace("StartDate", "EndDate");
						optionName = "minDate";
					} else {
						eleId = eleId.replace("EndDate", "StartDate");
						optionName = "maxDate";
					}
					$("#"+eleId).datepicker( "option", optionName, selectedDate);        
					$(".searchDate").find(".chkbox2").removeClass("on"); 

					var $dates = $('.start_date, .end_date').datepicker();
					$('.datePick .reset').on('click', function () {	
						 $dates.val('').datepicker('option', {minDate: null, maxDate: null});
					});
				}
			});

			$.datepicker._gotoToday = function(id) { 
				$(id).datepicker('setDate', new Date()).datepicker('hide').blur(); 
			};

			$(".dateclick").dateclick();    // DateClick
			$(".searchDate").schDate();        // searchDate
			
		});   

		// Search Date
		jQuery.fn.schDate = function(){
			var $obj = $(this);
			var $chk = $obj.find("input[type=radio]");
			$chk.click(function(){                
				$('input:not(:checked)').parent(".chkbox2").removeClass("on");
				$('input:checked').parent(".chkbox2").addClass("on");                    
			});
		};

		// DateClick
		jQuery.fn.dateclick = function(){
			var $obj = $(this);
			$obj.click(function(){
				$(this).parent().find("input").focus();
			});
		}

	}

	view_layer = function (num){
		var popUp = $("#pop" + num);
		popUp.show().find(".dim").show();
	}

});

