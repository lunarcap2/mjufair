/* JS Document 2014-11-17 skydown@career.co.kr */
var keywordFnc, quickmenuFnc, expandFnc, cancelFnc, resetFnc, cloneFnc, addFnc, moveFnc, prevcopyFnc, disableFnc, layerFnc, displayFnc, tooltipFnc, modifyFnc, checkallFnc, selectboxFnc, inputFnc, checkboxFnc, radioboxFnc;
(function ($) {
	$(function () {
		$(document).ready(function () {
            if ($('.selectbox select').length > 0) selectboxFnc();//셀렉트박스
            if ($('input.chk').length > 0) checkboxFnc();//체크박스
            if ($('input.rdi').length > 0) radioboxFnc();//라디오박스
            if ($('input.txt').length > 0) inputFnc();//인풋박스
            if ($('input.placehd').length > 0) $('input.placehd').placeholder();//인풋박스
            if ($('input.value, textarea.area').length > 0) $('input.value, textarea.area').inputcheckFnc();//인풋텍스트 체크박스
            if ( $(".ellipsis").length > 0) $(".ellipsis").ellipsis();//글줄임
			if ($('.termsView').length > 0) termsFnc();//약관보기
			quickmenuFnc();//퀵메뉴
			layerFnc.init();//팝업 레이어
			modifyFnc();//동시수정
			keywordFnc();//키워드입력
			fileboxFnc();//찾아보기
			tabStyle();//인증탭
		});//ready

		quickmenuFnc = function() {//퀵메뉴
			if ($('#quickmenu .quickmenu').length == 0) return false;
			var _quick = $('#quickmenu .quickmenu');
			var _tmp = null;
			var speed = 100;
			var objPosition = _quick.offset().top;
			var currentPosition = parseInt(_quick.css('top')) - 10;
			$(window).scroll(function () {
				var position = $(window).scrollTop();
				if (position > objPosition + currentPosition) {
					if (_quick.css('position') != 'fixed') _quick.css({'position':'fixed', 'top':'10px'});
				} else {
					if (_quick.css('position') == 'fixed') _quick.css({'position':'absolute', 'top' : 0});
				}
			});
		};//퀵메뉴
		expandFnc = function (obj) {//펼치기 버튼
			var _obj = $(obj).children();
			var _height = parseInt(_obj.parent().prev().css('height')) * 3;

			if (_obj.attr('src').indexOf('btn_expand') > -1) {
				_obj.attr({'src' : _obj.attr('src').replace('btn_expand', 'btn_fold'), 'alt' : '접기'});
				_obj.parent().prev().css('height', _height + 'px' ).addClass('vert');
			} else {
				_obj.attr({'src' : _obj.attr('src').replace('btn_fold', 'btn_expand'), 'alt' : '펼치기'});
				_obj.parent().prev().removeAttr('style').removeClass('vert');
			}
			$('html, body').animate({//이전 스크롤 위치로 이동
				scrollTop: _obj.parent().prev().offset().top
			}, 500);
		};//펼치기 버튼
		cancelFnc = function (obj) {//취소 버튼
			$(obj).parent().find('input:text, input:checkbox, input:radio, textarea.area, span.selectbox, span.total').each(function (index, value) {
				inputReset(this);
			});
		};//취소 버튼
		resetFnc = function (obj) {//리셋 버튼
			$(obj).parent().next().find('input:text, input:checkbox, input:radio, textarea.area, span.selectbox, span.total').each(function (index, value) {
				if ($(this).attr('class') != null && $(this).attr('class').indexOf('autoresize') == -1) inputReset(this);
			});
		};//리셋 버튼
		function inputReset (obj) {//리셋 인풋
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
				default:
					return false;
			}
		}//리셋 인풋
		cloneFnc = function (obj, param, total) {//추가, 삭제 버튼
			var _dur = 300;
			//var _clone = ($(obj).parent().parent().parent().attr('class').indexOf('group') == -1) ? $(obj).parent().parent().prev() : $(obj).parent().parent().parent();
			var _clone = ($(obj).parent().parent().parent().attr('class').indexOf('group') == -1) ? $(obj).parent().parent().parent().find('.group').last() : $(obj).parent().parent().parent();//요소 마지막 복제
			var _group = _clone.parent().find('.group');
			switch(param) {
				case 'add'://인풋 타입별 초기화 개선
					if (_group.length < total) {
						_clone.clone(true).insertAfter(_clone);
						if (_clone.next('.group').length > 0) {
							_clone.next('.group').find('.stitle.first').removeClass('first');
							_clone.next('.group').addClass('clone');
						} else {//개발 페이지
							_clone.parent().find('.stitle:last-child').last().removeClass('first');
							_clone.parent().find('.group:last-child').last().addClass('clone');
						}
						_clone.parent().find('.group').each(function (index, value) {//복제후 ID, NAME 재설정
							var _index = index;
							$(this).find('label, input:hidden, input:text, .selectbox select, textarea.area').each(function (index, value) {
								switch ($(this).get(0).tagName) {
									case 'LABEL':
										$(this).attr('for', $(this).attr('for').replace(/\d+|\_/g, '') + (index + 1) + '_' + (_index + 1));
										$(this).find('input').attr('id', $(this).find('input').attr('id').replace(/\d+|\_/g, '') + (index + 1) + '_' + (_index + 1));
										$(this).find('input').attr('name', $(this).find('input').attr('name').replace(/\d+/g, '') + (_index + 1));
										break;
									case 'TEXTAREA':
									case 'INPUT':
									case 'SELECT':
										if ($(this).attr('id'))
											$(this).attr('id', $(this).attr('id').replace(/\d+|\_/g, '') + (index + 1) + '_' + (_index + 1));
										break;
									default:
										return false;
								}
								if(_index == _group.length) {//입력항목 초기화
									if($(this).get(0).tagName == 'INPUT' || $(this).get(0).tagName == 'TEXTAREA') {
										$(this).val('');
										$(this).attr('checked', false);
									} else if($(this).get(0).tagName == 'SELECT') {
										$(this).get(0).selectedIndex = 0;
										selectboxFnc($(this));
									} else if($(this).get(0).tagName == 'LABEL') {
										$(this).find('input').attr('checked', false);
									}
								} else {
									if($(this).is('.lb.on')) {
										$(this).find('input').attr('checked', true);
									}
								}
							});
						});
						$('html, body').animate({//다음 스크롤 위치로 이동
							scrollTop: (_clone.next('.group').length > 0) ? _clone.next('.group').offset().top : _clone.parent().find('.group:last-child').offset().top
						}, _dur, function() {
							//
						}).promise().done(function() {
							_clone.next('.group').find('.fncbutton button').is(function () {
								_clone.next('.group').find('.fncbutton button').get(0).focus();
								selectboxFnc(_clone.next('.group'));//셀렉트박스 재설정
								inputFnc(_clone.next('.group'));//인풋 재설정
							 });
						});
					}
					break;
				case 'del':
					if (_group.length > 1) {
						if (_clone.prev('.group').length > 0) {
							_clone.prev('.group').find('.fncbutton button').is(function () {
								_clone.prev('.group').find('.fncbutton button').get(1).focus();
							});
							$('html, body').animate({//이전 스크롤 위치로 이동
								scrollTop: _clone.prev('.group').offset().top
							}, _dur);
						} else {
							$('html, body').animate({//이전 스크롤 위치로 이동
								scrollTop: _group.offset().top
							}, _dur, function() {
								//
							}).promise().done(function() {
								_group.find('.fncbutton button').get(1).focus();
							});
						}
						_clone.remove();
						if (_group.index(_clone) == 0)
							$(_group.get(1)).removeClass('clone');
						_clone.parent().find('.group').each(function (index, value) {//복제후 ID, NAME 재설정
							var _index = index;
							$(this).find('label, input:hidden, input:text, .selectbox select, textarea.area').each(function (index, value) {
								switch ($(this).get(0).tagName) {
									case 'LABEL':
										$(this).attr('for', $(this).attr('for').replace(/\d+|\_/g, '') + (index + 1) + '_' + (_index + 1));
										$(this).find('input').attr('id', $(this).find('input').attr('id').replace(/\d+|\_/g, '') + (index + 1) + '_' + (_index + 1));
										$(this).find('input').attr('name', $(this).find('input').attr('name').replace(/\d+/g, '') + (_index + 1));
										break;
									case 'TEXTAREA':
									case 'INPUT':
									case 'SELECT':
										if ($(this).attr('id'))
											$(this).attr('id', $(this).attr('id').replace(/\d+|\_/g, '') + (index + 1) + '_' + (_index + 1));
										break;
									default:
										return false;
								}
							});
						});
					} else {
						//
					}
					break;
				default:
					return false;
			}
		}//추가, 삭제 버튼
		delFnc = function (obj) {//삭제 버튼 [자기소개서 주제형]
			var _dur = 300;
			var _obj = $(obj).parent().parent().parent();
			var _group = _obj.parent().find('.group');
			_obj.hide();
			if (_group.length == 2) {
				_obj.parent().hide();
				$('html, body').animate({//영역 스크롤 위치로 이동
					scrollTop: _obj.parent().parent().offset().top
				}, _dur).promise().done(function() {
					_obj.remove();
				});
			} else {
				$('html, body').animate({//이전 스크롤 위치로 이동
					scrollTop: _obj.prev('.group').offset().top
				}, _dur).promise().done(function() {
					_obj.prev('.group').find('.button button.btn').is(function () {
						_obj.prev('.group').find('.button button.btn').get(0).focus();
					 });
					_obj.remove();
				});
			}
			_obj.parent().find('.group').filter(function (index) {
				return $(this).css('display') === 'block';
			}).each(function (index, value) {//복제후 ID, NAME 재설정
				var _index = index;
				$(this).find('label, input:hidden, input:text, .selectbox select, textarea.area').each(function (index, value) {
					switch ($(this).get(0).tagName) {
						case 'LABEL':
							$(this).attr('for', $(this).attr('for').replace(/\d+|\_/g, '') + (index + 1) + '_' + (_index + 1));
							$(this).find('input').attr('id', $(this).find('input').attr('id').replace(/\d+|\_/g, '') + (index + 1) + '_' + (_index + 1));
							$(this).find('input').attr('name', $(this).find('input').attr('name').replace(/\d+/g, '') + (_index + 1));
							break;
						case 'TEXTAREA':
						case 'INPUT':
						case 'SELECT':
							if ($(this).attr('id'))
								$(this).attr('id', $(this).attr('id').replace(/\d+|\_/g, '') + (index + 1) + '_' + (_index + 1));
							break;
						default:
							return false;
					}
				});
			});

		}//삭제 버튼
		addFnc = function (obj1, obj2, total) {//추가 버튼 [자기소개서 주제형]
			var _val = (obj1.tagName == 'BUTTON') ? $(obj1).parent().parent().prev('input.txt').val() : $(obj1).next('span').text();
			var _clone = $(obj2).find('.group:first-child');
			var _group = $(obj2).find('.group');
			if ($(obj1).is('input:checked') == true || obj1.tagName == 'BUTTON') {
				if (_group.length < total + 1) {
					if ($(obj2).css('display') == 'none') $(obj2).show();
					_clone.clone(true).insertAfter(_group.last()).removeAttr('style');
					if ($(obj1).parent().parent().prev(':text').length > 0) {//직접입력 추가
						_group.last().next().find('input:text.autoresize').val(_val);
					} else {//체크 등록
						_group.last().next().find('input:text.autoresize').val($(obj1).next('span').text()).attr('disabled','disabled');
						_group.last().next().find('button.modify').remove();
					}
					inputFnc(_group.last().next());//인풋 재설정
					if (obj1.tagName == 'BUTTON') {
						$('html, body').animate({//다음 스크롤 위치로 이동
							scrollTop: _group.last().next().offset().top
						}, 500).promise().done(function() {
							//
						});
					}
					_clone.parent().find('.group').filter(function (index) {
						return $(this).css('display') === 'block';
					}).each(function (index, value) {//복제후 ID, NAME 재설정
						var _index = index;
						$(this).find('label, input:hidden, input:text, .selectbox select, textarea.area').each(function (index, value) {
							switch ($(this).get(0).tagName) {
								case 'LABEL':
									$(this).attr('for', $(this).attr('for').replace(/\d+|\_/g, '') + (index + 1) + '_' + (_index + 1));
									$(this).find('input').attr('id', $(this).find('input').attr('id').replace(/\d+|\_/g, '') + (index + 1) + '_' + (_index + 1));
									$(this).find('input').attr('name', $(this).find('input').attr('name').replace(/\d+/g, '') + (_index + 1));
									break;
								case 'TEXTAREA':
								case 'INPUT':
								case 'SELECT':
									if ($(this).attr('id'))
										$(this).attr('id', $(this).attr('id').replace(/\d+|\_/g, '') + (index + 1) + '_' + (_index + 1));
									break;
								default:
									return false;
							}
							if(_index == _group.length) {//입력항목 초기화
								if($(this).get(0).tagName == 'INPUT' || $(this).get(0).tagName == 'TEXTAREA') {
									$(this).val('');
									$(this).attr('checked', false);
								} else if($(this).get(0).tagName == 'SELECT') {
									$(this).get(0).selectedIndex = 0;
									selectboxFnc($(this));
								} else if($(this).get(0).tagName == 'LABEL') {
									$(this).find('input').attr('checked', false);
								}
							} else {
								if($(this).is('.lb.on')) {
									$(this).find('input').attr('checked', true);
								}
							}
						});
					});
				} else {
					//
				}
			} else {//체크 비활성
				if (_group.length == 2) $(obj2).hide();
				_group.find('input:text.autoresize').each(function (index, value) {
					if ($(this).val() == _val) $(this).parent().parent().parent().parent().remove();
				});
			}
		}//추가 버튼
		moveFnc = function (obj, param) {//이동버튼 버튼
			var _this = $(obj).parent().parent().parent();
			var _group = _this.parent().find('.group');
			var _index = _group.index(_this);
			switch(param) {
				case 'up':
					if (_index > 0 && _this.prev().css('display') != 'none') {
						_group.eq(_index-1).before(_group.eq(_index));
					}
					break;
				case 'down':
					if (_index < _group.length) {
						_group.eq(_index+1).after(_group.eq(_index));
					}
					break;
				default:
					return false;
			}
		}//이동버튼 버튼
		prevcopyFnc = function (obj, param, total) {//이전추가 버튼, 인풋 타입별 초기화 개선
			var _div = $(obj).parent().parent().parent();
			var _clone = $(obj).parent().parent().prev();
			var _group = _clone.parent().find('.grp');
			switch(param) {
				case 'add':
					if (_group.length < total) {
						_clone.clone(true).insertAfter(_clone);
						_clone.next('.grp').addClass('clone');
						_clone.parent().find('.button button.del').removeClass('off');
						_clone.parent().find('.grp').each(function (index, value) {//복제후 ID, NAME 재설정
							var _index = index;
							$(this).find('label, input:text').each(function (index, value) {
								switch ($(this).get(0).tagName) {
									case 'LABEL':
										$(this).attr('for', $(this).attr('for').replace(/\d+|\_/g, '') + (index + 1) + '_' + (_index + 1));
										$(this).find('input').attr('id', $(this).find('input').attr('id').replace(/\d+|\_/g, '') + (index + 1) + '_' + (_index + 1));
										$(this).find('input').attr('name', $(this).find('input').attr('name').replace(/\d+/g, '') + (_index + 1));
										break;
									case 'TEXTAREA':
									case 'INPUT':
									case 'SELECT':
										if ($(this).attr('id'))
											$(this).attr('id', $(this).attr('id').replace(/\d+|\_/g, '') + (index + 1) + '_' + (_index + 1));
										break;
									default:
										return false;
								}
								if(_index == _group.length) {//입력항목 초기화
									if($(this).get(0).tagName == 'INPUT' || $(this).get(0).tagName == 'TEXTAREA') {
										$(this).val('');
										$(this).attr('checked', false);
									} else if($(this).get(0).tagName == 'SELECT') {
										$(this).get(0).selectedIndex = 0;
										selectboxFnc($(this));
									} else if($(this).get(0).tagName == 'LABEL') {
										$(this).find('input').attr('checked', false);
									}
								} else {
									if($(this).is('.lb.on')) {
										$(this).find('input').attr('checked', true);
									}
								}
							});
						});
					}
					break;
				case 'del':
					if (_group.length > 1) {
						_clone.remove();
						if (_group.index(_clone) == 1)
							_div.find('.button button.del').addClass('off');
					} else {
						//
					}
					break;
				default:
					return false;
			}
		}//이전추가 버튼
		disableFnc = function (obj, param) {//비활성
			var _obj = $(obj);
			var _input = _obj.find('input.txt, input.rdi, input.chk, textarea.area');
			switch(param) {
				case 'disable':
					_obj.addClass('disable');
					if (_input.length > 0) _input.attr('readonly','readonly');
					selectboxFnc();
					break;
				case 'active':
					_obj.removeClass('disable');
					if (_input.length > 0) _input.removeAttr('readonly');
					break;
				case 'check'://체크박스
					if ((_obj.attr('class')) ? (_obj.attr('class') == 'disable') : false) {
						_obj.removeClass('disable');
						if (_input.length > 0) _input.removeAttr('readonly');
					} else {
						_obj.addClass('disable');
						if (_input.length > 0) _input.attr('readonly','readonly');
					}
					break;
				default:
					return false;
			}
		};//비활성
		layerFnc = {//팝업 레이어
			val: {
				motion : 50,
				duration : 300,
				layer : null,
				inner : null,
				tmpscroll : null
			},
			init: function () {//초기화
				this.close();
			},
			close: function () {//레이어 닫기
				var _close = $('.popupLayer > .popupInner > .close > button.btn');
				_close.click(function () {
					$(this).parent().parent().parent().animate({
						opacity: 0
					}, layerFnc.val.duration, function () {
						$(this).removeAttr('style').find('> .popupInner').removeAttr('style');
						$('html, body').animate({//이전 스크롤 위치로 이동
							scrollTop: layerFnc.val.tmpscroll
						}, 500);
					});
				});
			},
			show: function (param) {//레이어 보이기
				if ($(param).length == 0) return false;
				this.val.layer = $(param);
				this.val.inner = $(param + '> .popupInner');
				this.height();
				this.val.tmpscroll = $(document).scrollTop();
				$('html, body').animate({
					scrollTop: this.val.inner.offset().top - layerFnc.val.motion
				}, 500).promise().done(function() {
					layerFnc.val.inner.delay(150).animate({
						'opacity' : 1,
						'margin-top' : 0
					}, layerFnc.val.duration, function () {
						layerFnc.val.inner.find('a, input, button').get(0).focus();
					});
				});
			},
			hide: function (param) {//레이어 감추기
				this.val.layer = $(param);
				this.val.inner = $(param + '> .popupInner');
				this.val.inner.animate({
					'opacity' : 0,
					'margin-top' : this.val.motion
				}, this.val.duration);
			},
			height: function () {//레이어 높이 초기화
				this.val.layer.css({
					'height' : $('body').height(),
					'display' : 'block'
				});
				this.val.inner.css({
					'margin-left' : '-' + (this.val.inner.width() / 2) - parseInt(this.val.inner.css('borderLeftWidth')) + 'px',
					'margin-top' : this.val.motion
				});
			}
		};//팝업 레이어
		displayFnc = function (obj, param) {//디스플레이
			if ($(obj).length == 0) return false;
			var _obj = $(obj);
			//var _find = _obj.find('a, input:text');
			switch(param) {
				case 'block':
					if (_obj.get(0).tagName == 'TABLE') {
						_obj.css('display','table');
					} else if (_obj.get(0).tagName == 'TR') {
						_obj.css('display','table-row');
					} else {
						_obj.css('display','block');
					}
					//if (navigator.appVersion.indexOf('MSIE 7') == -1 && _find.get(0) != undefined) _find.get(0).focus();//IE7 오류방지
					break;
				case 'none':
					_obj.css('display','none');
					break;
				case 'check':
					_obj = $(obj).parent().next();//다음항목 검색
					if ($(obj).is(":checked") == true || _obj.css('display') == 'none')
						_obj.css('display','block');
					else
						_obj.css('display','none');
					break;
				default:
					return false;
			}
			return false;
		};//디스플레이
		tooltipFnc = function (obj) {//툴팁 레이어
			var _dur = 100;
			var _obj = $('#' + obj);
			var _mb = (_obj.css('bottom') != 'auto') ? '-10px' : 0;
			var _mt = (_obj.css('top') != 'auto') ? '-10px' : 0;
			if (_obj.css('display') == 'none') {
				_obj.css({'display':'block','opacity':0, marginBottom : _mb, marginTop : _mt}).clearQueue().animate({
					opacity: 1,
					marginBottom: _mb,
					marginBottom: _mt
				},_dur);
			} else {
				_obj.clearQueue().animate({
					opacity: 0
				},_dur, function () {
					$(this).removeAttr('style');
				});
			}
			return false;
		};//툴팁 레이어
		modifyFnc = function (obj) {//동시수정
			var _obj = null;
			if (!obj) {//테이블 초기화
				_obj = ($('.allmodify').length > 0) ? $('.allmodify') : null;
				if (_obj != null) {
					if (_obj.find('input:checkbox').is(':checked')) {
						_obj.next('.tb').addClass('on');//테이블 on/off
					}
				} else {
					return false;
				}
			} else {
				_obj = $('#' + obj);
			}
			if (_obj.attr('class').indexOf('on') > -1) {
				_obj.removeClass('on');
			} else {
				_obj.addClass('on');
			}
			return false;
		};//동시수정
		inputFnc = function (obj) {//인풋박스 2017-12-05 수정
			var _this, _tmp, _bg = null;
			if (!obj)
				_this = $('input.txt, textarea.area, span.selectbox');
			else
				_this = $(obj).find('input.txt, textarea.area, span.selectbox');
			_this.unbind('focus blur').each(function (index, value) {
				if ($(this).attr('class').indexOf('autoresize') > -1) $(this).attr('size', resizeInput).bind('keyup textchange', resizeInput);//리사이즈 초기화
				if ($(this).val() != null && $(this).val() != '') $(this).removeClass('bg');//배경이미지 초기화
			}).bind('focus', function () {
				_tmp = this.value;
				_bg = ($(this).attr('class').indexOf('bg') > -1) ? true : false;
				//if ($(this).attr('class').indexOf('normal') == -1) this.value = '';
				$(this).addClass('on');
				$(this).parent().addClass('on');//회원정보입력
				if(_bg) $(this).removeClass('bg');
			}).bind('blur', function () {
				//if (this.value == '' && $(this).attr('class').indexOf('normal') == -1) this.value = _tmp;
				$(this).removeClass('on');
				$(this).parent().removeClass('on');//회원정보입력
				if (_bg && $(this).val() == '') $(this).addClass('bg');
			}).bind('keyup', function (e) {
				//if (e.keyCode == 27 && this.value != null) this.value = '';//this.value = _tmp;
			});
		}//인풋박스

        $.fn.inputcheckFnc = function(index) {//인풋텍스트 체크
            return this.each(function(index, value) {
                var _default = $(this).attr('default');
                var _type = $(this).attr('type');
                if(this.value == '' || this.value == _default) {
                    $(this).attr('value', _default);
                    $(this).attr('type', 'text');
                } else {
                    $(this).removeClass('value');
                    $(this).attr('type', _type);
                }
                $(this).bind('focus', function() {
                    if(this.value == _default) {
                        this.value = '';
                        this.type = _type;
                    }
                    $(this).removeClass('value')
                }).bind('blur', function() {
                    if(this.value == '' || this.value == _default) {
                        this.value = _default;
                        this.type = 'text';
                        $(this).addClass('value');
                    }
                });
            });
        };//인풋텍스트 체크
		$.event.special.textchange = {//Detecting Text Changes
			setup: function (data, namespaces) {
			  $(this).data('lastValue', this.contentEditable === 'true' ? $(this).html() : $(this).val());
				$(this).bind('keyup.textchange', $.event.special.textchange.handler);
				$(this).bind('cut.textchange paste.textchange input.textchange', $.event.special.textchange.delayedHandler);
			},
			teardown: function (namespaces) {
				$(this).unbind('.textchange');
			},
			handler: function (event) {
				$.event.special.textchange.triggerIfChanged($(this));
			},
			delayedHandler: function (event) {
				var element = $(this);
				setTimeout(function () {
					$.event.special.textchange.triggerIfChanged(element);
				}, 25);
			},
			triggerIfChanged: function (element) {
			  var current = element[0].contentEditable === 'true' ? element.html() : element.val();
				if (current !== element.data('lastValue')) {
					element.trigger('textchange',  [element.data('lastValue')]);
					element.data('lastValue', current);
				}
			}
		};//Detecting Text Changes
		function resizeInput() {//인풋 리사이즈
			var _obj = $(this)
			var _val = _obj.val();
			var _tmp = (_obj.next('.hidden').length == 0) ? $('<div class="txt hidden" style="display:none;"></div>').insertAfter(_obj) : _obj.next('.hidden');
			var _width = parseInt(_tmp.text(_obj.val()).css('width')) + 22;
			_obj.css('width',_width).next('.hidden').remove();
		}//인풋 리사이즈
		keywordFnc = function () {//키워드입력
			$('.keywordbox input:text').each(function (index, value) {
			}).unbind('focusin focusout').bind('focusin', function () {
				$(this).parent().addClass('on');
				$(this).next().stop().show(1);
			}).bind('focusout', function () {
				$(this).parent().removeClass('on');
				$(this).next().stop().hide(1, function () {$(this).removeAttr('style');});
			}).next().unbind('mouseenter mouseleave focusin focusout').bind('mouseenter focusin', function () {
				$(this).parent().addClass('on');
				$(this).stop().show(1).addClass('on');
			}).bind('mouseleave focusout', function (e) {
				$(this).stop().hide(1, function () {
					$(this).removeClass('on').removeAttr('style');
					$(this).prev().removeClass('on');
					$(this).parent().removeClass('on');
				});
			}).find('a').unbind('click focusin focusout').bind('click keydown', function (e) {
				if (e.which == 13 || e.type == 'click') {//ENTER, CLICK
					$(this).parent().parent().parent().prev().val($(this).text());
					$(this).parent().parent().parent().removeAttr('style').removeClass('on').stop().hide(0);
					return false;
				} else if (e.keyCode == 38) {//UP
					$(this).parent().prev().find('> a').focus();
					$(this).parent().parent().parent().prev().val($(this).parent().prev().text());
					return false;
				} else if (e.keyCode == 40) {//DOWN
					$(this).parent().next().find('> a').focus();
					$(this).parent().parent().parent().prev().val($(this).parent().next().text());
					return false;
				}
			}).bind('focusin', function () {
				$(this).parent().parent().parent().stop().show(1);
			}).bind('focusout', function () {
				$(this).parent().parent().parent().stop().hide(1);
			});
		}//키워드입력
		function fileboxFnc() {//찾아보기
			$('.filebox input:file').each(function (index, value) {
				$(this).prev().val($(this).val());
			}).bind('click change', function () {
				$(this).prev().val($(this).val());
			}).bind('focus', function () {
				$(this).prev().addClass('on');
			}).bind('blur', function () {
				$(this).prev().removeClass('on');
			});
		}//찾아보기
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
		checkboxFnc = function () {//체크박스 2017-12-27 수정
			var _chk = $('.chk');
			_chk.each(function() {
				if ($(this).is(':checked')) {
					$(this).prop('checked', true).parent().removeClass('off').addClass('on');
				} else {
					$(this).prop('checked', false).parent().removeClass('on').addClass('off');
				}
			}).click(function() {
				if ($(this).is(':checked')) {
					$(this).prop('checked', true).parent().removeClass('off').addClass('on');
				} else {
					$(this).prop('checked', false).parent().removeClass('on').addClass('off');
				}
			});
		}//체크박스
		radioboxFnc = function () {//라디오박스
			var _rdi = $('.rdi').parent();
			_rdi.each(function() {
				if ($(this).find('input').is(':checked')) {
					$(this).removeClass('off').addClass('on');
				} else {
					$(this).removeClass('on').addClass('off');
				}
			}).click(function() {
				var _name = $(this).find('input').attr('name');
				var _radio = $('label input[name='+_name+']');
				var _index = _radio.parent().index(this);
				_radio.each(function(index, value) {
					if (_index == index) {
						$(this).checked = true;
						$(this).parent().removeClass('off').addClass('on');
					} else {
						$(this).checked = false;
						$(this).parent().removeClass('on').addClass('off');
					}
				});
			});
		}//라디오박스
		function tabStyle() {//인증탭
			$('.certiTab li a').click(function() {
				var _index = $('.certiTab li a').index(this);
				$('.certiTab li a img').each(function(index,value) {
					if (_index == index) {
						$(this).attr('src', $(this).attr('src').replace('_off.gif','_on.gif'));
						$('.certiCont').get(index).style.display = 'block';
					} else {
						$(this).attr('src', $(this).attr('src').replace('_on.gif','_off.gif'));
						$('.certiCont').get(index).style.display = 'none';
					}
				});
				return false;
			});
		}//인증탭
		$.fn.ellipsis = function() {//글줄임
			return this.each(function() {
				var el = $(this);
				if (el.css("overflow") == "hidden") {
					var text = el.html();
					var multiline = el.hasClass('multiline');
					var t = $(this.cloneNode(true))
					.hide()
					.css({
						'max-height':'none',
						'position':'absolute',
						'overflow':'visible'
					})
					.width(multiline ? el.width() : 'auto')
					.height(multiline ? 'auto' : el.height());
					el.after(t);
					function height() { return t.height() > el.height(); };
					function width() { return t.width() > el.width(); };
					var func = multiline ? height : width;
					while (text.length > 0 && func()) {
						text = text.substr(0, text.length - 1);
						t.html(text + "<em>...</em>");
					}
					el.attr('title', el.text().replace(/[\t]/g, '').replace(/[\r\n]/g, ' '));
					el.html(t.html());
					t.remove();
				}
			});
		};//글줄임
		var browser = (function() {//브라우저 체크
			var s = navigator.userAgent.toLowerCase();
			var match = /(webkit)[ \/](\w.]+)/.exec(s) ||
			/(opera)(?:.*version)?[ \/](\w.]+)/.exec(s) ||
			/(msie) ([\w.]+)/.exec(s) ||
			/(mozilla)(?:.*? rv:([\w.]+))?/.exec(s) ||
			[];
			return { name: match[1] || "", version: match[2] || "0" };
		}());//브라우저 체크
		$.fn.popupWindow = function(instanceSettings){//윈도우 팝업
			$.fn.popupWindow.defaultSettings = {
				centerBrowser:0, // center window over browser window? {1 (YES) or 0 (NO)}. overrides top and left
				centerScreen:0, // center window over entire screen? {1 (YES) or 0 (NO)}. overrides top and left
				height:500, // sets the height in pixels of the window.
				left:0, // left position when the window appears.
				location:0, // determines whether the address bar is displayed {1 (YES) or 0 (NO)}.
				menubar:0, // determines whether the menu bar is displayed {1 (YES) or 0 (NO)}.
				resizable:0, // whether the window can be resized {1 (YES) or 0 (NO)}. Can also be overloaded using resizable.
				scrollbars:0, // determines whether scrollbars appear on the window {1 (YES) or 0 (NO)}.
				status:0, // whether a status line appears at the bottom of the window {1 (YES) or 0 (NO)}.
				width:500, // sets the width in pixels of the window.
				windowName:null, // name of window set from the name attribute of the element that invokes the click
				windowURL:null, // url used for the popup
				top:0, // top position when the window appears.
				toolbar:0 // determines whether a toolbar (includes the forward and back buttons) is displayed {1 (YES) or 0 (NO)}.
			};
			settings = $.extend({}, $.fn.popupWindow.defaultSettings, instanceSettings || {});
			var windowFeatures =	'height=' + settings.height +
							',width=' + settings.width +
							',toolbar=' + settings.toolbar +
							',scrollbars=' + settings.scrollbars +
							',status=' + settings.status +
							',resizable=' + settings.resizable +
							',location=' + settings.location +
							',menuBar=' + settings.menubar;
			settings.windowName = this.name || settings.windowName;
			settings.windowURL = this.href || settings.windowURL;
			var centeredY,centeredX;
			if (settings.centerBrowser) {
				if (browser.name == 'msie') {//hacked together for IE browsers
					centeredY = (window.screenTop - 120) + ((((document.documentElement.clientHeight + 120)/2) - (settings.height/2)));
					centeredX = window.screenLeft + ((((document.body.offsetWidth + 20)/2) - (settings.width/2)));
				} else {
					centeredY = window.screenY + (((window.outerHeight/2) - (settings.height/2)));
					centeredX = window.screenX + (((window.outerWidth/2) - (settings.width/2)));
				}
				window.open(settings.windowURL, settings.windowName, windowFeatures+',left=' + centeredX +',top=' + centeredY).focus();
			} else if (settings.centerScreen) {
				centeredY = (screen.height - settings.height)/2 - 40;
				centeredX = (screen.width - settings.width)/2;
				window.open(settings.windowURL, settings.windowName, windowFeatures+',left=' + centeredX +',top=' + centeredY).focus();
			} else {
				window.open(settings.windowURL, settings.windowName, windowFeatures+',left=' + settings.left +',top=' + settings.top).focus();
			}
			return false;
		};//윈도우 팝업

		function termsFnc() {//약관보기
			$('.termsView').on('click',function(){
				var obj = $(this).parent().parent().next().find('.terms');
				if(obj.css('display') == 'none') {
					$(this).addClass('on');
					obj.show();
				} else {
					$(this).removeClass('on');
					obj.hide();
				}
			});
		};//약관보기


		// 개인회원 비밀번호 재설정 인증확인
		$('#aMobile').click(function(){
			$('#aMobileNum').show();
		});
		$('#aEmail').click(function(){
			$('#aEmailNum').show();
		});

		// 기업회원 비밀번호 재설정 인증확인
		$('#aMobile_biz').click(function(){
			$('#aMobile_bizNum').show();
		});
		$('#aEmail_biz').click(function(){
			$('#aEmail_bizNum').show();
		});

	});//$
})(jQuery);
