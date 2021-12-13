var inputFnc, selectboxFnc, checkboxFnc, radioboxFnc, cancelFnc, resetFnc, tabFnc, tooltipFnc, toggleFnc, toggle2Fnc, rnbWrapFnc, jobPostRnb, searchListFnc, multiSelectFnc, SelJobBoxFnc, sliderFnc;//2017-11-20 추가
(function ($) {
    $(function () {
        $(document).ready(function () {
            if ($('input.txt').length > 0) inputFnc();//인풋박스
            if ($('.selectbox select').length > 0) selectboxFnc();//셀렉트박스
            if ($('input.chk').length > 0) checkboxFnc();//체크박스
            if ($('input.rdi').length > 0) radioboxFnc();//라디오박스
            if ($('input.value, textarea.area').length > 0) $('input.value, textarea.area').check();//인풋텍스트 체크
            if ($(".ellipsis").length > 0) $(".ellipsis").ellipsis(); //글줄임
            if ($('.tabArea ul').length > 0) tabFnc();//탭메뉴
            if ($('.sideStep').length > 0) jobPostRnb();//채용공고등록 우측메뉴
            if ($('#rnb').length > 0) rnbWrapFnc();//RNB
            if ($('.tooltipArea').length > 0) tooltipFnc();//툴팁
            if ($('.inputSearch').length > 0) searchListFnc();//자격증,우대전공 자동완성검색
            if ($('.selectBtn').length > 0) hasListFnc();//선택수정하기변경
            if ($('.toggle').length > 0) toggle2Fnc();//공고관리툴팁 2017-10-10 수정
            if ($('.tooltipArea.select').length > 0) toggle3Fnc();//공고관리툴팁 2017-10-10 수정
            if ($('.selRecruitArea').length > 0) SelJobBoxFnc();//지원자관리 공고선택 2017-10-16 추가
            if ($('.slider').length > 0) sliderFnc();//상세모집요강 템플릿 슬라이더 2017-11-14 추가
            if ($('.jobPostWrap .layoutBox').length > 0) bgChaingeFnc();//채용공고등록 배경 2017-11-23 추가
        });//ready


        $(window).load(function () {//2017-11-29 추가
            if ($('.jobPostWrap').length > 0) topMoveFnc();////채용공고등록 상단포커싱
        });

        topMoveFnc = function () {//채용공고등록 상단포커싱 2017-11-29 추가
            $('#guin_title').focus();//채용제목
            var offset = $("#header").offset();
            $('html, body').animate({ scrollTop: offset.top }, 10);
        };


        inputFnc = function (obj) {//인풋박스
            var _this, _tmp, _bg = null;
            if (!obj)
                _this = $('input.txt, textarea.area');
            else
                _this = $(obj).find('input.txt, textarea.area');
            _this.unbind('focus blur').bind('focus', function () {
                _bg = ($(this).attr('class').indexOf('bg') > -1) ? true : false;
                $(this).addClass('on');//클래스 방식
                if (_bg) $(this).removeClass('bg');
            }).bind('blur', function () {
                $(this).removeClass('on');//클래스 방식
                if (_bg && $(this).val() == '') $(this).addClass('bg');
            });

            _this.bind('focus', function() {//인풋배경 2017-12-05 추가
				if (!$(this).val() || $(this).val()) $(this).addClass('bgnone');
			}).bind('blur', function() {
				if ($(this).val()) $(this).addClass('bgnone');
				else $(this).removeClass('bgnone');
			});
        };//인풋박스

        selectboxFnc = function (obj) {//셀렉트박스
            var _select = null
            if (!obj)
                _select = $('.selectbox select');
            else
                _select = ($(obj).find('.selectbox select').length > 0) ? $(obj).find('.selectbox select') : $(obj);
                _select.unbind().each(function (index, value) {
                $(this).prev().html($(this).children('option:selected').text());
                if ($(this).val() == 'direct') {//직접입력
                    $(this).parent().parent().find('.direct').css('display', 'inline');
                }
            }).bind('change keyup', function (evt) {
                $(this).prev().html($(this).children('option:selected').text());
                if ($(this).prev().is('.ellipsis')) $(this).prev().ellipsis();//글줄임 설정  

                if ($(this).attr('name') == 'weekdays') { //근무요일
                    if ($(this).val() == '5') { //직접입력일 경우
                        $(this).parent().parent().find('.direct').css('display', 'inline');
                        if (evt.type == 'change') $(this).parent().parent().find('.direct').focus();//직접입력 포커스 이동
                    } else {
                        $(this).parent().parent().find('.direct').css('display', 'none');
                    }
                } else if ($(this).attr('name') == 'salary_month' || $(this).attr('name') == 'salary_annual') { //연봉
                    if ($(this).find("option[value='87']").length == 1) {//직접입력 설정
                        if ($(this).val() == '87') {
                            $(this).parent().parent().find('.direct').css('display', 'inline');
                            if (evt.type == 'change') $(this).parent().parent().find('.direct').focus();//직접입력 포커스 이동
                        } else {
                            $(this).parent().parent().find('.direct').css('display', 'none');
                        }
                    }
                } else {
                    if ($(this).find("option[value='direct']").length == 1) {//직접입력 설정
                        if ($(this).val() == 'direct') {
                            $(this).parent().parent().find('.direct').css('display', 'inline');
                            if (evt.type == 'change') $(this).parent().parent().find('.direct').focus();//직접입력 포커스 이동
                        } else {
                            $(this).parent().parent().find('.direct').css('display', 'none');
                        }
                    }
                }

        }).bind('focus', function () {
                $(this).prev().addClass('on');
            }).bind('blur', function () {
                $(this).prev().removeClass('on');
            });

        };//셀렉트박스

        checkboxFnc = function () {//체크박스
            var _chk = $('.chk').parent();
            _chk.each(function () {
                if ($(this).find('input').is(':checked')) {
                    $(this).removeClass('off').addClass('on');
                } else {
                    $(this).removeClass('on').addClass('off');
                }
            }).click(function () {
                if ($(this).find('input').is(':checked')) {
                    $(this).removeClass('off').addClass('on');
                } else {
                    $(this).removeClass('on').addClass('off');
                }
            });
        };//체크박스

        radioboxFnc = function () {//라디오박스
            var _rdi = $('.rdi').parent();
            _rdi.each(function () {
                if ($(this).find('input').is(':checked')) {
                    $(this).removeClass('off').addClass('on');
                } else {
                    $(this).removeClass('on').addClass('off');
                }
            }).click(function () {
                var _name = $(this).find('input').attr('name');
                var _radio = $('label input[name$=' + _name + ']');
                var _index = _radio.parent().index(this);
                _radio.each(function (index, value) {
                    if (_index == index) {
                        $(this).checked = true;
                        $(this).parent().removeClass('off').addClass('on');
                    } else {
                        $(this).checked = false;
                        $(this).parent().removeClass('on').addClass('off');
                    }
                });
            });
        };//라디오박스

        $.fn.check = function (index) {//인풋텍스트 체크
            return this.each(function (index, value) {
                var _default = $(this).attr('default');
                if (this.value == '' || this.value == _default) {
                    $(this).attr('value', _default);
                } else {
                    $(this).removeClass('value');
                }
                $(this).bind('focus', function () {
                    if (this.value == _default) {
                        this.value = '';
                    }
                    $(this).removeClass('value');
                }).bind('blur', function () {
                    if (this.value == '' || this.value == _default) {
                        this.value = _default;
                        $(this).addClass('value');
                    }
                });
            });
        };//인풋텍스트 체크

        if(!$.fn.ellipsis) {//글줄임 v3 2017-12-11 수정
			$.fn.ellipsis = function(index) {//v2태그필터 추가, v3클래스 추가
				return this.each(function(index, value) {
					var el = $(this);
					if(el.attr('ellipsis') != null) return false;
					if(el.css("overflow") == "hidden") {
						var _tmpObj = (el.find('span').length > 0) ? el.find('span') : null;
						var _tmpWidth = el.find('span').outerWidth() || 0;
						var _tmpClass = el.find('span').attr('class') || 0;
						var text = el.find('span').remove();
							text = el.html();
						var multiline = el.hasClass('multiline');
						var t = $(this.cloneNode(true))
						.hide()
						.css({
							'max-height':'none',
							'position':'absolute',
							'overflow':'visible'
						})
						.width(multiline ? el.width() - _tmpWidth : 'auto')
						.height(multiline ? 'auto' : el.height());
						el.after(t);
						function height() { return t.height() > el.height(); };
						function width() { return t.width() > el.width() - _tmpWidth; };
						var func = multiline ? height : width;
						while (text.length > 0 && func()) {
							text = text.substr(0, text.length - 1);
							t.html(text + "<em>...</em>");
							if(func())el.attr('title', el.text().replace(/[\t]/g, '').replace(/[\r\n]/g, ' '));//타이틀 추가
						}
						if(_tmpObj != null) el.html(t.html() + '<span'+ ((_tmpClass) ? ' class=\"'+_tmpClass+'\"' : '') +'>' +_tmpObj.html() + '</span>');//태그필터 붙임
						else el.html(t.html());
						t.remove();
						el.attr('ellipsis',true);
					}
				});
			};
		}//글줄임

        displayFnc = function (obj, param) {//디스플레이
            if ($(obj).length == 0) return false;;
            var _obj = $(obj);
            //var _find = _obj.find('a, input:text');
            switch (param) {
                case 'block':
                    if (_obj.get(0).tagName == 'TABLE') {
                        _obj.css('display', 'table');
                    } else if (_obj.get(0).tagName == 'TR') {
                        _obj.css('display', 'table-row');
                    } else {
                        _obj.css('display', 'block');
                    }
                    //if (navigator.appVersion.indexOf('MSIE 7') == -1 && _find.get(0) != undefined) _find.get(0).focus();//IE7 오류방지
                    break;
                case 'none':
                    _obj.css('display', 'none');
                    break;
                case 'check':
                    _obj = $(obj).parent().parent().next();//다음다음항목 검색
                    if ($(obj).is(":checked") == true)
                        _obj.css('display', 'block');
                    else
                        _obj.css('display', 'none');
                    break;
                case 'textarea'://직업입력
                    _obj = $(obj).parent().next();//다음항목 검색
                    if ($(obj).is(":checked") == true)
                        _obj.removeAttr('disabled').removeClass('disable').focus();
                    else
                        _obj.attr('disabled', 'disabled').addClass('disable');
                    break;
                case 'checkId':
                    var id = $(obj).attr('id');
                    if ($(obj).is(":checked") == true)
                        $('[id=' + id + 'Chk' + ']').css('display', 'block');
                    else
                        $('[id=' + id + 'Chk' + ']').css('display', 'none');
                    break;
                default:
                    return false;
            }
            return false;
        };//디스플레이

        disableFnc = function (obj, param) {//비활성
            var _obj = $(obj);
            var _input = _obj.find('input.txt, input.rdi, input.chk, textarea.area');
            switch (param) {
                case 'disable':
                    _obj.addClass('disable');
                    if (_input.length > 0) _input.attr('readonly', 'readonly');
                    if (_input.length > 0) _input.attr('disabled', 'disabled');
                    selectboxFnc();
                    break;
                case 'active':
                    _obj.removeClass('disable');
                    if (_input.length > 0) _input.removeAttr('readonly');
                    if (_input.length > 0) _input.removeAttr('disabled');
                    break;
                case 'check'://체크박스
                    if ((_obj.attr('class')) ? (_obj.attr('class') == 'disable') : false) {
                        _obj.removeClass('disable');
                        if (_input.length > 0) _input.removeAttr('readonly');
                    } else {
                        _obj.addClass('disable');
                        if (_input.length > 0) _input.attr('readonly', 'readonly');
                    }
                    break;
                default:
                    return false;
            }
        };//비활성

        cancelFnc = function (obj) {//취소 버튼
            $(obj).parent().find('input:text, input:checkbox, input:radio, textarea.area, span.selectbox, span.total').each(function (index, value) {
                inputReset(this);
            });
        };//취소 버튼

        resetFnc = function (obj) {//리셋 버튼
            $(obj).parent().parent().prev().children().find('input:text, input:checkbox, input:radio, textarea.area, span.selectbox, span.total, label.checkbox , label.radiobox').each(function (index, value) {
                if ($(this).attr('class') != null && $(this).attr('class').indexOf('autoresize') == -1) inputReset(this);
            });//직급/직책

            $(obj).parent().parent().prev().prev().children().children().find('input:text, input:checkbox, input:radio, textarea.area, span.selectbox, span.total, label.checkbox , label.radiobox').each(function (index, value) {
                if ($(this).attr('class') != null && $(this).attr('class').indexOf('autoresize') == -1) inputReset(this);
            });//우대사항,복리후생
        };//리셋 버튼

        function inputReset(obj) {//리셋 인풋
            switch (obj.tagName) {
                case 'INPUT':
                    if ($(obj).attr('type') == 'text') {
                        $(obj).val('');
                        $(obj).removeAttr('disabled');//연봉취소
                    } else {
                        $(obj).attr('checked', false);
                    }
                    break;
                case 'SPAN':
                    if ($(obj).attr('class').indexOf('total') > -1) {
                        $(obj).find('strong').text('0');
                    }
                    if ($(obj).attr('class').indexOf('selectbox') > -1) {
                        $(obj).find('> select > option').eq(0).prop('selected', true);
                        //$(obj).find('> span').text($(obj).find('> select > option').prop('selectedIndex', 0).val());
                        $(obj).find('> span').text($(obj).find('> select > option:selected').text());
                    }
                    break;
                case 'TEXTAREA':
                    $(obj).val('');
                    break;
                case 'SELECT':
                    $(obj).get(0).selectedIndex = 0;
                    selectboxFnc($(obj));
                    break;
                case 'LABEL':
                    $(obj).removeClass('on');
                    break;
                default:
                    return false;
            }
        };//리셋 인풋

        layerOpen = function (el) {//레이어중앙정렬
            var temp = $('#' + el);
            var layer = $('.layerPop');
            var bg = temp.siblings().hasClass('dim');	//dimmed 레이어를 감지하기 위한 boolean 변수
            var dimmed = $('.dim')
            if (bg) {
                temp.parent().fadeIn(200);	//'dim' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다.
            } else {
                temp.fadeIn(200);
            }
            $('body').css('overflow', 'hidden');
            // 화면의 중앙에 레이어를 띄운다.

            if (temp.outerWidth() >= $(window).innerWidth()) {
                dimmed.css('width', temp.outerWidth() + 'px');
                layer.css('overflow-x', 'scroll');
                temp.css({
                    'margin-left': '0',
                    'left': '0'
                });
            } else {
                dimmed.css('width', $(window).innerWidth() + 50 + 'px');
                layer.css('overflow-x', 'hidden');
                temp.css({
                    'margin-left': '-' + temp.outerWidth() / 2 + 'px',
                    'left': "50%"
                });
            };

            if (temp.outerHeight() >= $(window).innerHeight()) {
                dimmed.css('height', temp.outerHeight() + 'px');
                layer.css('overflow-y', 'scroll');
                temp.css({
                    'margin-top': '0',
                    'top': '0'
                });
            } else {
                dimmed.css('height', $(window).innerHeight() + 50 + 'px');
                layer.css('overflow-y', 'hidden');
                temp.css({
                    'margin-top': '-' + temp.outerHeight() / 2 + 'px',
                    'top': '50%'
                });

            };

            temp.find('.popHead .closeBtn, button.cancle').click(function (e) {
                if (bg) {
                    temp.parent().fadeOut(200); //'dim' 클래스가 존재하면 레이어를 사라지게 한다.
                } else {
                    temp.fadeOut(200);
                }
                $('body').css('overflow', '');
                e.preventDefault();
            });
            temp.siblings('.dim').click(function (e) {	//배경을 클릭하면 레이어를 사라지게 하는 이벤트 핸들러
                temp.parent().fadeOut(200);
                $('body').css('overflow', '');
                e.preventDefault();
            });

            $(window).resize(function () {
                if (temp.outerWidth() >= $(window).innerWidth()) {
                    dimmed.css('width', temp.outerWidth() + 'px');
                    layer.css('overflow-x', 'scroll');
                    temp.css({
                        'margin-left': '0',
                        'left': '0'
                    });
                } else {
                    dimmed.css('width', $(window).innerWidth() + 50 + 'px');
                    layer.css('overflow-x', 'hidden');
                    temp.css({
                        'margin-left': '-' + temp.outerWidth() / 2 + 'px',
                        'left': "50%"
                    });
                };

                if (temp.outerHeight() >= $(window).innerHeight()) {
                    dimmed.css('height', temp.outerHeight() + 'px');
                    layer.css('overflow-y', 'scroll');
                    temp.css({
                        'margin-top': '0',
                        'top': '0'
                    });
                } else {
                    dimmed.css('height', $(window).innerHeight() + 50 + 'px');
                    layer.css('overflow-y', 'hidden');
                    temp.css({
                        'margin-top': '-' + temp.outerHeight() / 2 + 'px',
                        'top': '50%'
                    });

                };
            });

            if (location.href.match("/biz/jobpost") != null) {
                chk_layer(el); //jobspost_step.js
            }
            
        };//레이어중앙정렬

        function tooltipFnc() {//툴팁
            $('.tooltipArea > button, .tooltipBtn').on('click', function () {
                var obj = $(this).next();

                if (obj.css('display') == 'none') {
                    $(this).addClass('on');
                    $('.tooltipArea .box').hide();
                    obj.css('display', 'block');
                } else {
                    $(this).removeClass('on')
                    obj.css('display', 'none');
                }
            });

            $('.tooltipArea .box > button').on('click', function () {
                $(this).parent().hide();
            });
        };//툴팁

        function tooltipFnc() {//툴팁
            $('.tooltipArea > button, .tooltipBtn').on('click', function () {
                var obj = $(this).next();

                if (obj.css('display') == 'none') {
                    $(this).addClass('on');
                    $('.tooltipArea .box').hide();
                    obj.css('display', 'block');
                } else {
                    $(this).removeClass('on')
                    obj.css('display', 'none');
                }
            });

            $('.tooltipArea .box > button').on('click', function () {
                $(this).parent().hide();
            });
        };//툴팁


        //2017-10-10 수정
        toggleFnc = function (obj, obj2) {//토글
            if ($(obj2).css('display') == 'none') {
                $(obj).addClass('on');
                $(obj2).css('display', 'block');
            } else {
                $(obj).removeClass('on');
                $(obj2).css('display', 'none');
            }
        }//토글

        function toggle2Fnc() {//공고관리툴팁
            $('.toggle').on('click', function () {
                var obj = $(this).next().find('>div')
                if (obj.css('display') == 'none') {
                    $('.tooltipArea .box').hide();
                    obj.css('display', 'block');
                } else {
                    obj.css('display', 'none');
                }
            });
        };//공고관리툴팁
        //2017-10-10 수정

        tabFnc = function (obj, group, idx) {//탭메뉴
            $(group).each(function (index, value) {
                if (idx == index) {
                    $(group).eq(index).show();
                    $(obj).parents('ul').find('li').eq(index).addClass('on');
                } else {
                    $(group).eq(index).hide();
                    $(obj).parents('ul').find('li').eq(index).removeClass('on');
                }
            });
        };//탭메뉴

        popOpenFnc = function (obj) {//팝업열기
            $(obj).show();
        };//팝업열기

        popCloseFnc = function (obj) {//팝업닫기
            $(obj).hide();
        };//팝업닫기

        function rnbWrapFnc() {//RNB
            if ($('#rnb .fixArea').length == 0) return false;
            var _quick = $('#rnb .fixArea');
            var _tmp = null;
            var speed = 100;
            var objPosition = _quick.offset().top;
            var currentPosition = parseInt(_quick.css('top')) + 20;
            $(window).scroll(function () {
                var position = $(window).scrollTop();
                if (position > objPosition + currentPosition) {
                    //if (position > 398) {
                    if (_quick.css('position') != 'fixed') _quick.css({ 'position': 'fixed', 'top': 20 });
                    $('.topBtn').show();
                } else {
                    if (_quick.css('position') == 'fixed') _quick.css({ 'position': 'absolute', 'top': 0 });
                    $('.topBtn').hide();
                }
            });
            $(".topBtn a").click(function () {//top버튼
                $('html, body').animate({
                    scrollTop: 0
                }, 200);
                return false;
            });
        };//RNB

        jobPostRnb = function () {//채용공고등록 사이드메뉴 2017/11/29 수정
            //스크롤 애니메이션
            var $body = $('body');
            var htmlWrap = $('html, body');
            $body.on('click', '.sideStep ul a', function (e) {
                var offset = $($(this).attr('href')).offset(),
					marginTop = $(this).data('margin-top') || 0;
                if (!!offset) {
                    htmlWrap.stop().animate({ scrollTop: offset.top - marginTop });
                    e.preventDefault();
                }
            });

            //위치에따라 메뉴 활성화
            var $window = $(window),
				sectionBorderPadding = 120,
				lastEventToken,
				$sideStepMe = $('.sideStep'),
				$sideStep = $('.sideStep .inn'),
				idArray = [];
            $sideStep.find('li:first').addClass('on');//첫번째 메뉴에 on 추가
            $window.on('scroll', function () {
                //마지막 이벤트만 처리하도록
                var closureToken = Math.floor((Math.random() * 1000000) + 1),
					windowScrollTop = $window.scrollTop(),
					tabOn, tmpOffset;

                lastEventToken = closureToken;

                if (windowScrollTop >= 90) {
                    $sideStep.css({ 'top': 0 });
					$sideStepMe.css({ 'margin-top': 0 });
                    $('.topBtn').show();
                } else {
                    $sideStep.css({ 'top': 120 });
					$sideStepMe.css({ 'margin-top': 0 });
                    $('.topBtn').hide();
                }

                $('.scSet').each(function (n) {
                    var id = $(this);
                    idArray[n] = id;
                });

                setTimeout(function () {
                    if (closureToken === lastEventToken) {
                        //right tab menu
                        tabOn = 0;
                        for (i = 0; i < idArray.length; i++) {
                            if (idArray[i].size() > 0) {
                                tmpOffset = idArray[i].offset();
                                if ((windowScrollTop + sectionBorderPadding) > tmpOffset.top) {
                                    tabOn = i;
                                } else {
                                    break;
                                }
                            }
                        };
                        $sideStep.find('li')
						.eq(tabOn).addClass('on')
						.siblings().removeClass('on');
                    }
                }, 200);
            });
            $(".topBtn a").click(function () {//top버튼
                $('html, body').animate({
                    scrollTop: 0
                }, 200);
                return false;
            });
        };//채용공고등록 사이드메뉴

        searchListFnc = function () {//자격증/우대전공 검색
            var _obj = $('.inputSearch');
            _obj.each(function () {
                $(this).on("keyup", function (e) {
                    var _autoHight = $(this).parent().find('.autoHight');
                    var _autoTxt = $(this).parent().find('.autoHight a');

                    if ($(this).val() == "") {
                        _autoHight.hide();
                    } else {
                        _autoHight.show();
                        _autoTxt.each(function () {
                            $(this).on("click", function (e) {
                                var _text = $(this).text()
                                var _inputBox = $(this).parent().parent().parent().parent().find('.inputSearch');
                                var _autoBox = _autoTxt.parent().parent().parent();
                                _inputBox.val(_text);
                                _autoBox.hide();
                            });
                        })
                    }
                });
            })
            $("body").click(function (e) {
                if (!$(".autoHight").has(e.target).length) {
                    $(".autoHight").hide();
                }
            });
        };

        searchTextFn = function () {
            var _obj = $('.autoHight a');

            _obj.each(function () {
                $(this).on("click", function (e) {
                    var _text = $(this).text()
                    var _inputBox = $(this).parent().parent().parent().prev().prev();
                    var _autoBox = _obj.parent().parent().parent();
                    _inputBox.val(_text);
                    _autoBox.hide();
                });
            })
        };//자격증/우대전공 검색

        AddlangFnc = function (obj) {//채용공고등록 외국어 레이어 2017-11-22 수정
            if ($('select[name=language_name]').length < 3) {
                var _html = '<div class="inp addLine">';
                _html += '		<span class="selectbox" style="width:151px">';
                _html += '			<span>언어선택</span>';
                _html += '			<select title="언어선택" name="language_name" onchange="ajax_code_langex(this);">';
                _html += '              <option value="">언어선택</option>';
                _html += '				<option value="1">영어</option>';
                _html += '				<option value="2">일본어</option>';
                _html += '				<option value="3">중국어</option>';
                _html += '				<option value="4">프랑스어</option>';
                _html += '				<option value="5">독일어</option>';
                _html += '			</select>';
                _html += '		</span><!-- .selectbox -->';
                _html += '		<span class="selectbox" style="width:281px">';
                _html += '			<span>시험 선택</span>';
                _html += '			<select title="시험 선택" name="language_exam" onchange="chk_sel(this);">';
                _html += '				<option value="">시험 선택</option>';
                _html += '			</select>';
                _html += '		</span><!-- .selectbox -->';
                _html += '		<input type="text" class="txt color" name="language_score" style="width:71px" />';
                _html += '		<span class="txt">점(급) 이상</span>';
                _html += '		<button type="button" class="btn delete" onclick="removeLineFnc(this);">삭제</button>';
                _html += '	</div>';

                $(obj).parent().parent().prev().append(_html);
                selectboxFnc();
            } else {
                alert('3개이상 등록할 수 없습니다.');
            }
        };//채용공고등록 외국어 레이어추가

        AddLicenseFnc = function (obj) {//채용공고등록 자격증 레이어 2017-11-22 수정
            if ($('input[name=license_name]').length < 3) {
                var _html = '<div class="inp addLine">';
                _html += '		<input type="text" class="txt color inputSearch" id="" style="width:671px" onkeyup="ajax_code(this)" name="license_name" />';
                _html += '      <input type="hidden" name="license_code">';
                _html += '		<button type="button" class="btn delete" onclick="removeLineFnc(this);">삭제</button>';
                _html += '		<div class="autoHight" style="display:none">';
                _html += '		</div><!-- .autoHight -->';
                _html += '	</div>';

                $(obj).parent().parent().prev().append(_html);
                selectboxFnc();
                searchListFnc();
            } else {
                alert('3개이상 등록할 수 없습니다.');
            }
        };//채용공고등록 자격증 레이어추가

        AddMajorFnc = function (obj) {//채용공고등록 우대전공 2017-11-22 수정
            if ($('input[name=special_subject_text]').length < 5) {
                var _html = '<div class="inp addLine">';
                _html += '		<input type="text" class="txt color inputSearch" id="" style="width:671px" onkeyup="ajax_code(this)" name="special_subject_text" />';
                _html += '      <input type="hidden" name="special_subject">';
                _html += '		<button type="button" class="btn delete" onclick="removeLineFnc(this);">삭제</button>';
                _html += '		<div class="autoHight" style="display:none">';
                _html += '		</div><!-- .autoHight -->';
                _html += '	</div>';

                $(obj).parent().parent().prev().append(_html);
                selectboxFnc();
                searchListFnc();
            } else {
                alert('5개이상 등록할 수 없습니다.');
            }
        };//채용공고등록 우대전공 레이어추가

        AddDivisionFnc = function (obj) {//채용공고등록 모집부분 레이어추가
            if ($('input[name=job_part]').length < 30) {
                var _html = '<div class="inp addLine">';
                _html += '		<input type="text" class="txt color" name="job_part" id="" style="width:377px"><button type="button" class="btn delete" onclick="removeLineFnc(this);">삭제</button>';
                _html += '		<button type="button" class="btn add" onclick="AddDivisionFnc(this);">추가</button>';
                _html += '	</div>';

                $(obj).parent().parent().append(_html);
                inputFnc();
                $('input.value, textarea.area').check();
            } else {
                alert('30개이상 등록할 수 없습니다.');
            }
        };//채용공고등록 모집부분 레이어추가

        AddProcedureFnc = function (obj) {//채용공고등록 전형절차 레이어추가
            if ($('input[name=choiceprocess]').length < 10) {
                var _html = '<li class="addLine">';
                _html += '		<span class="num">' + ($('input[name=choiceprocess]').length+1) + '.</span>';
                _html += '		<input type="text" name="choiceprocess" class="txt value color" default="전형절차 입력" />';
                _html += '		<button type="button" class="btn deleteS" onclick="removeLineFnc(this);">삭제</button>';
                _html += '	</li>';

                $(obj).parent().parent().prev().find('ol').append(_html);
                inputFnc();
                $('input.value, textarea.area').check();
            } else {
                alert('10개이상 등록할 수 없습니다.');
            }
        };//채용공고등록 전형절차 레이어추가

        AddQuestionFnc = function (obj) {//채용공고등록 사전질문 레이어추가
            if ($('input[name=priorAnswer]').length < 5){
                var _html = '<li class="addLine">';
                _html += '		<span class="num">' + ($('input[name=priorAnswer]').length + 1) + '.</span>';
                _html += '		<input type="text" name="priorAnswer" class="txt value color" default="질문용을 입력해주세요." />';
                _html += '		<button type="button" class="btn delete" onclick="removeLineFnc(this);">삭제</button>';
                _html += '	</li>';

                $(obj).parent().parent().prev().find('ol').append(_html);
                inputFnc();
                $('input.value, textarea.area').check();
            } else {
                alert('5개이상 등록할 수 없습니다.');
            }
        };//채용공고등록 사전질문 레이어추가

        AddAddressFnc = function (obj) {//채용공고등록 근무지역 레이어추가
            if ($('select[name=areaCode1]').length < 30) {
                var _html = '<div class="inp addLine">';
                _html += '		<span class="selectbox" style="width:218px">';
                _html += '			<span>시선택</span>';
                _html += '			<select title="시 선택" name="areaCode1" onchange="ajax_acList(this);">';
                _html += '			    <option value="">시 선택</option>';
                _html += '			    <option value="1">서울특별시</option>';
                _html += '			    <option value="10">울산광역시</option>';
                _html += '			    <option value="11">인천광역시</option>';
                _html += '			    <option value="12">전라남도</option>';
                _html += '			    <option value="13">전라북도</option>';
                _html += '			    <option value="14">제주도</option>';
                _html += '			    <option value="15">충청남도</option>';
                _html += '			    <option value="16">충청북도</option>';
                _html += '			    <option value="2">강원도</option>';
                _html += '			    <option value="3">경기도</option>';
                _html += '			    <option value="4">경상남도</option>';
                _html += '			    <option value="5">경상북도</option>';
                _html += '			    <option value="6">광주광역시</option>';
                _html += '			    <option value="7">대구광역시</option>';
                _html += '			    <option value="8">대전광역시</option>';
                _html += '			    <option value="9">부산광역시</option>';
                _html += '			    <option value="17">전국</option>';
                _html += '			    <option value="30">세종시</option>';
                _html += '			    <option value="29">북한경제특구</option>';
                _html += '			    <option value="25">아시아.중동</option>';
                _html += '			    <option value="26">아프리카</option>';
                _html += '			    <option value="27">아메리카</option>';
                _html += '			    <option value="23">유럽</option>';
                _html += '			    <option value="28">오세아니아</option>';
                _html += '			</select>';
                _html += '		</span><!-- .selectbox -->';
                _html += '		<span class="selectbox" style="width:281px">';
                _html += '			<span>구 선택</span>';
                _html += '			<select title="구 선택" name="areaCode2" onchange="chk_sel(this)">';
                _html += '				<option value="">구 선택</option>';
                _html += '			</select>';
                _html += '		</span><!-- .selectbox -->';
                _html += '		<button type="button" class="btn delete" onclick="removeLineFnc(this);">삭제</button>';
                _html += '	</div>';

                $(obj).parent().parent().prev().append(_html);
                selectboxFnc();
            } else {
                alert('30개이상 등록할 수 없습니다.');
            }
        };//채용공고등록 근무지역 레이어추가

        AddMetroFnc = function (obj) {//채용공고등록 인근전철 레이어 2017-11-22 수정
            if ($('select[name=sw_a]').length < 2) {
                var _html = '<div class="inp addLine">';
                _html += '		<span class="selectbox" style="width:110px">';
                _html += '		    <span>지역</span>';
                _html += '		    <select title="지역" name="sw_a" onchange="ajax_sbList(this);" id="sw_a2">';
                _html += '		        <option value="">지역</option>';
                _html += '		        <option value="01">수도권</option>';
                _html += '		        <option value="02">부산</option>';
                _html += '		        <option value="03">대구</option>';
                _html += '		        <option value="04">광주</option>';
                _html += '		        <option value="05">대전</option>';
                _html += '		    </select>';
                _html += '		</span><!-- .selectbox -->';
                _html += '		<span class="selectbox" style="width:151px">';
                _html += '		    <span>노선</span>';
                _html += '		    <select title="노선" name="sw_l" onchange="ajax_sbList(this);">';
                _html += '		        <option value="">노선</option>';
                _html += '		    </select>';
                _html += '		</span><!-- .selectbox -->';
                _html += '		<span class="selectbox" style="width:199px">';
                _html += '		    <span>역명</span>';
                _html += '		    <select title="역명" name="sb">';
                _html += '		        <option  value="">역명</option>';
                _html += '		    </select>';
                _html += '		</span><!-- .selectbox -->';
                _html += '		<input type="text" class="txt color" name="enternum" id="" style="width:59px" onkeypress="return numkeyCheck(event);" />';
                _html += '		<span class="txt">번 출구</span>';
                _html += '		<span class="selectbox" style="width:101px">';
                _html += '		    <span>거리</span>';
                _html += '		    <select title="거리" name="dist">';
                _html += '		        <option value="">거리</option>';
                _html += '		        <option value="10">10M</option>';
                _html += '		        <option value="100">100M</option>';
                _html += '		        <option value="150">150M</option>';
                _html += '		        <option value="300">300M</option>';
                _html += '		        <option value="500">500M</option>';
                _html += '		        <option value="1000">1Km</option>';
                _html += '		        <option value="2000">2Km</option>';
                _html += '		    </select>';
                _html += '		</span><!-- .selectbox -->';
                _html += '		<span class="txt">이내</span>';
                _html += '		<button type="button" class="btn delete" onclick="removeLineFnc(this);">삭제</button>';
                _html += '	</div>';

                $(obj).parent().parent().prev().append(_html);
                selectboxFnc();
            } else {
                alert('2개이상 등록할 수 없습니다.');
            }
        };//채용공고등록 인근전철 레이어추가

        removeLineFnc = function (obj) {//리스트 한줄 삭제
            $(obj).parent().remove();
            hasListFnc();
        };//리스트 한줄 삭제

        removeFnc = function (obj) {//리스트 한개 삭제
            $(obj).remove();
        };//리스트 한개 삭제

        resetLineFnc = function (obj) {//추가한 전체 리스트 삭제
            $(obj).parent().parent().prev().find('.addLine').remove();
            $(obj).parent().parent().prev().find('.inp .inputSearch').val('');

            // 셀렉트박스가 있는 경우, 초기화
            $(obj).parent().parent().prev().find('select').val('');
            $(obj).parent().parent().prev().find('input').val('');
            $(obj).parent().parent().prev().find('select').eq(0).prev().html($(obj).parent().parent().prev().find('select').eq(0).find(':selected').text());
            $(obj).parent().parent().prev().find('select').eq(1).prev().html($(obj).parent().parent().prev().find('select').eq(1).find(':selected').text());
            $(obj).parent().parent().prev().find('select').eq(2).prev().html($(obj).parent().parent().prev().find('select').eq(2).find(':selected').text());
            $(obj).parent().parent().prev().find('select').eq(3).prev().html($(obj).parent().parent().prev().find('select').eq(3).find(':selected').text());

            $(obj).parent().parent().prev().find('checkbox').prop("checked", false);
            $(obj).parent().parent().next().removeClass('on').addClass('off');
        };//추가한 전체 리스트 삭제

        hasListFnc = function () {//선택수정버튼변경
            var _obj = $('.selectBtn');
            _obj.each(function() {
                if ($(this).find('li').length == 0) {
                    $(this).parent().parent().next().find('button span').html('선택하기');
                    if($(this).parent().hasClass("welfare")) {//기업정보수정 복리후생
                        var _nodata = '<li><span class="fc_gra9">등록된 복리후생이 없습니다.</span></li>';
                        $(this).append(_nodata);
                    }//기업정보수정 복리후생
                } else {
                    $(this).parent().parent().next().find('button span').html('수정하기');

                }
            });
        };//선택수정버튼변경

        mulSelBoxFnc = function (obj,obj2) {//다중선택박스 2017-10-16 수정
            if ($(obj).length == 0) return false;
            var _obj = $(obj);
            var _obj2 = $('#' + obj2);
            if(_obj.hasClass('on')){
                $('.multiSelect').hide();
                $('.mulSelBox').children().removeClass('on');
            } else{
                _obj.parent().children().removeClass('on');
                _obj.parent().find('.multiSelect').hide();
                _obj.addClass('on');
                _obj2.show();
                multiSelectFnc(obj);
            }
            $("body").on('click',function(e){
                if (!$(e.target).hasClass('on')){
                    $('.multiSelect').hide();
                    $('.mulSelBox').children().removeClass('on');
                };
            });
        };//다중선택박스

        function multiSelectFnc(obj) {//선택한 업종,기업규모,상장여부 2017-10-10 수정
            var _this;
            if (!obj)
                _this = $('.multiSelect');
            else
                _this = $(obj);
            var _lt = _this.find('.depth1');
            var _ltLi = _lt.children();
            var _rt = _this.find('.depth2');
            var _rtLi = _rt.children();
            var _selTxt = _rt.find('a');

            _ltLi.bind('click', function() {
                var _index = _ltLi.index($(this));
                _ltLi.each(function(index, value) {
                    if(_index == index) {
                        $(this).addClass('on');
                        $(this).parent().parent().next().find('.depth2').eq(index).show();
                    } else {
                        $(this).removeClass('on');
                        $(this).parent().parent().next().find('.depth2').eq(index).hide();
                    }
                });
                return false;
            });
            _rtLi.bind('click', function() {
                var _index = _rtLi.index($(this));
                _rtLi.each(function(index, value) {
                    if(_index == index) {
                        _mulSelVal = $(this).find('a').text();
                        _this.find('em').text(_mulSelVal);
                        $(this).addClass('on');
                        $(this).parents('.multiSelect').hide();
                        $(this).parents('.multiSelect').parent().removeClass('on');

                    } else {
                        $(this).removeClass('on');
                    }
                });
                return false;
            });

        }//선택한 업종,기업규모,상장여부

        function toggle3Fnc() {//지원자관리툴팁 2017-10-13 추가
            var _this = $('.tooltipArea.select');
            var _obj = _this.find('.tooltipBtn');
            var _objLi = _this.find('li');
            _objLi.bind('click', function() {
                var _objVal = $(this).text();
                _obj.removeClass('on');
                $(this).parent().parent().parent().find('.tooltipBtn span').text(_objVal);
                $(this).parent().parent().hide();
            });
        };//지원자관리툴팁


        function SelJobBoxFnc(obj) {//지원자관리 공고선택 2017-10-16 추가
            var _this;
            if (!obj)
                _this = $('.selRecruitArea');
            else
                _this = $(obj);
            var _obj = _this.find('.tit');
            var _objBox = _obj.next();
            var _objDl = _objBox.find('dl');
            var _objDd = _objBox.find('dd a');
            _obj.bind('click', function() {
                if($(this).hasClass('on')){
                    _obj.removeClass('on');
                    _objBox.hide();
                }else{
                    _obj.addClass('on');
                    _objBox.show();
                }
            });
            _objDd.bind('click', function() {
                _objVal = $(this).text();
                _obj.find('em').text(_objVal);
                _objDd.removeClass('on');
                $(this).addClass('on');
                _objBox.hide();
                _obj.removeClass('on');
                _objSort = _obj.find('span');
                if($(this).hasClass('ing')){
                    _obj.addClass('ing');
                    _obj.removeClass('end');
                    _objSort.html('<span>진행중</span>');
                } else{
                    _obj.addClass('end');
                    _obj.removeClass('ing');
                    _objSort.html('<span>마감</span>');
                }
            });
            $("body").on('click',function(e){
                if (!$(e.target).hasClass('on')){
                    $('.multiSelect').hide();
                    $('.mulSelBox').children().removeClass('on');
                };
            });

        };//지원자관리 공고선택

        function sliderFnc(obj){//상세모집요강 템플릿 슬라이더 2017-11-29 수정
            $('.slider li').each(function(){
                $(this).bind({
                    "click": function () {
                        fnSelTemplate($(this).attr('id'));
                        /*if(confirm("선택하시겠습니까?"))
                        {
                            $('.slider li').removeClass('on');
                            $(this).addClass('on');
                        }*/
                    }
                });
            });

            var movSlider = $('.slider').bxSlider({
                infiniteLoop: false,
                speed: 300,        // 이동 속도를 설정
                pager: false,      // 현재 위치 페이징 표시 여부 설정
                moveSlides: 1,     // 슬라이드 이동시 개수
                slideWidth: 152,   // 슬라이드 너비
                minSlides: 4,      // 최소 노출 개수
                maxSlides: 5,      // 최대 노출 개수
                slideMargin: 10,    // 슬라이드간의 간격
                auto: false,        // 자동 실행 여부
                autoHover: true,   // 마우스 호버시 정지 여부
                touchEnabled: false,
                hideControlOnEnd: true,
                controls: true    // 이전 다음 버튼 노출 여부
            });
            //이전 버튼을 클릭하면 이전 슬라이드로 전환
            $('.bt-prev').on('click', function () {
                movSlider.goToPrevSlide();  //이전 슬라이드 배너로 이동
                return false;              //<a>에 링크 차단
            });
            //다음 버튼을 클릭하면 다음 슬라이드로 전환
            $('.bt-next').on('click', function () {
                movSlider.goToNextSlide();  //다음 슬라이드 배너로 이동
                return false;
            });
        }

        function bgChaingeFnc() {//채용공고등록 배경 2017-11-23 추가
            $('.jobPostWrap .layoutBox:odd').addClass("bgWhite");
            $('.jobPostWrap .layoutBox:even').removeClass("bgWhite");
        };

        newWindowFull = function (obj) {//이력서보기 전체윈도우팝업 2017-11-29 수정
            var wname = open(obj, "", 'top=0,left=0,width=' + (screen.availWidth) + ',height=' + (screen.availHeight) + ',toolbar=0,location=0,directories=0,status=0,menubar=0,resizable=1,scrolling=0,scrollbars=1');
            wname.focus();
        };

        newWindowFnc = function (url, width, height) {//메일,SMS발송 윈도우팝업 2017-12-05 수정
            var attr = "width=" + width + ", height=" + height + ", resizable=no, scrollbars=yes, status=no";
            window.open(url, "", attr);
            return false;
        }

    });
})(jQuery);