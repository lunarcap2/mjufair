// 상단 미니로그인 오버메뉴

function divDisplay(divId,flag){

	if (flag == "true")
	{
		document.getElementById("overmenu"+divId).style.display = "block";

	}else{
		document.getElementById("overmenu"+divId).style.display = "none";
	}

}

// 하단 이메일 팝업창

function email_pop() {
	window.open ('http://www.career.co.kr/help/mailtopop.asp','email','width=600,height=750,scrollbars=auto,status=no,toolbar=no,resizable=0,location=no,menu=no');
}

try {
    document.execCommand("BackgroundImageCache", false, true);
} catch(ignored) {}


// 공통 input

function replaceText(objValue, srcStr, desStr)
{
	var str = objValue;

	while(str.indexOf(srcStr) != -1)
		str = str.replace(srcStr, desStr);

	return str;
}

function getBrowerType()
{
	if(navigator.appName == "Microsoft Internet Explorer")
		return "IE";
	else if(navigator.appName == "Netscape")
		return "Netscape";
}

function convertSizeWidth(width, size)
{
	if(width)
		return parseInt(width.replace("px", ""), 10);
	else
		return 100;

/*
	// ie : size=1(15px), size=2(22px), ... +7
	// ie 외 : size=1(17px), size=2(24px), ... +7
	var baseSize = 6;
	var addSize = 7;

	if(getBrowerType() != "IE")
		baseSize += 2;

	if(!size)
		size = 1;

	size = parseInt(size, 10);
	size = (size * addSize) + baseSize;

	return size;
*/
}

function onFocus(obj) {
	if(obj.className.indexOf("Off") > 0){
		var objWidth = convertSizeWidth(obj.style.width, obj.size);
		obj.style.width = (objWidth-2) + "px";
		obj.className = replaceText(obj.className, "Off", "On");

	}
}

function onBlur(obj)
{
	if(obj.className.indexOf("On") > 0){
		var objWidth = parseInt(obj.style.width.replace("px", ""), 10);
		obj.style.width = (objWidth+2) + "px";
		obj.className = replaceText(obj.className, "On", "Off");
	}
}

function onFocus_Login(obj)
{
	if(obj.className.indexOf("off") > 0){
		var objWidth = convertSizeWidth(obj.style.width, obj.size);
		obj.style.width = (objWidth-4) + "px";
		obj.className = replaceText(obj.className, "off", "on");

	}
}

function onBlur_Login(obj)
{
	if(obj.className.indexOf("on") > 0){
		var objWidth = parseInt(obj.style.width.replace("px", ""), 10);
		obj.style.width = (objWidth+4) + "px";
		obj.className = replaceText(obj.className, "on", "off");
	}
}

function linkOnOff(obj, className)
{
	obj.parentNode.className = className;
	obj.className = className;
}

function openwin(surl, wname, w, h) {
	wname = window.open(surl, wname, 'width='+w+', height='+h+', scrollbars=1, left=10, top=10');
	wname.focus();
}

// 선택된 코드
function writeMenu(menuCode, pageCode, menuName)
{
	if(menuCode.length == 6)
		menuCode = menuCode.substring(4, 6);

	if(pageCode.length == 6)
		menuCode = menuCode.substring(4, 6);

	if(menuCode == pageCode)
		document.write("<u>"+ menuName +"</u>");
	else
		document.write(menuName);
}

// 공백문자치환.
function trim(objValue)
{
	return objValue.replace(/(\s*)|(\r*)|(\n*)|(\t*)|(\f*)/g, "");
}

// 라이브채용정보 플래쉬
function objflash(FURL)
{
document.write("<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0' width='410' height='240'>");
document.write("<param name='movie' value='"+FURL+"'>");
document.write("<param name='quality' value='high'>");
document.write("<param name='wmode' value='transparent'>");
document.write("<embed src='"+FURL+"' quality='high' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='410' height='240'></embed>");
document.write("</object>");
}

// 신입별,경력별 오버이미지
function ShowDiv(menunm) {
	for(var i = 1; i <= 4; i++) {
		var obj = document.getElementById("tab0"+ i);
		var obj2 = document.getElementById("step_text"+ i);
		obj.src = "http://image.career.co.kr/career_new/jobs/img_junior_step"+i+".gif";
		obj2.style.display = "none";

		if(menunm=="step_text"+i) {
			obj.src = obj.src.replace(".gif", "on.gif");
			obj2.style.display = "";
		}else
			obj2.style.display = "none";

	}
}

// form check
function chkObjValue(obj, showMsg, isFocus)
{
	if(!obj) return false;

	if(!trim(obj.value)){
		if(showMsg) alert(showMsg);
		if(isFocus && obj.type != "hidden") obj.focus();
		return false;
	}

	return true;
}

//get. current page url
function getCurrentPageUrl()
{
	return location.href.toString();
}

// png 투명
function setPng24(obj) {
  obj.width=obj.height=1;
  obj.className=obj.className.replace(/\bpng24\b/i,'');
  obj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+ obj.src +"',sizingMethod='image');"
  obj.src='';
  return '';
}

// 기본 text background 이미지 삭제
function chkBackTextImg(obj, clsNm)
{
	if(obj.value)
		obj.className = obj.className.replace(''+ clsNm, '');
	else
		obj.className = obj.className + ' '+ clsNm;
}

function onloadInputBgCk(obj){
		if(document.getElementById(obj)){
			if(document.getElementById(obj).value){
				document.getElementById(obj).className="";
			}
		}
}


//화면 중앙에 팝업띄움
function centerOpenWindow(url, windowname, nWidth, nHeight, sStatus, sMenubar, sScrollbar, sToolbar)
{
	var nLeft, nTop
	var settings = "" ;
	var oWin ;

	nLeft = (screen.availWidth - nWidth)/2;
	nTop = (screen.availHeight - nHeight)/2;

	settings += "height=" + nHeight ;
	settings += ", width=" + nWidth ;
	settings += ", top=" + nTop;
	settings += ", left=" + nLeft;
	if(sStatus != undefined){
		settings += ", status=" + sStatus ;
	}
	if(sMenubar != undefined){
		settings += ", menubar=" + sMenubar ;
	}
	if(sScrollbar != undefined){
		settings += ", scrollbars=" + sScrollbar ;
	}
	if(sToolbar != undefined){
		settings += ", toolbar=" + sToolbar ;
	}

	oWin = window.open(url, windowname, settings) ;

	return oWin;
}

//단계별로 팝업띄움
var preStepPixel = new Array(0, 0);	//left, top
function openWindowDepth(url, windowname, nWidth, nHeight, sStatus, sMenubar, sScrollbar, sToolbar, isModalPop, nBaseLeft, nBaseTop, stepPixel)
{
	var nLeft, nTop
	var settings = "" ;
	var oWin ;

	if(!nBaseLeft || !nBaseTop){
		//중앙정렬
		nLeft = (screen.availWidth - nWidth)/2;
		nTop = (screen.availHeight - nHeight)/2;
	}else{
		//기준점 정렬
		nLeft = nBaseLeft;
		nTop = nBaseTop;
	}

	if(stepPixel){
		if(preStepPixel[0] == 0 && preStepPixel[1] == 0){
			preStepPixel[0] = nLeft;
			preStepPixel[1] = nTop;
		}else{
			preStepPixel[0] = preStepPixel[0] + stepPixel;
			preStepPixel[1] = preStepPixel[1] + stepPixel;
		}

		nLeft = preStepPixel[0];
		nTop = preStepPixel[1];
	}

	if(isModalPop){
		settings += "dialogHeight:" + nHeight +'px;';
		settings += "dialogWidth:" + nWidth +'px;';
		settings += "dialogTop:" + nTop +'px';
		settings += "dialogLeft:" + nLeft +'px';
		if(sStatus) settings += "status:yes;";
		if(sMenubar) settings += "menubar:yes;";
		if(sScrollbar) settings += "scrollbars:yes;";
		if(sToolbar) settings += "toolbar:yes;";
		settings += 'help:no;center:no;';	//center:yes;help:no; edge:sunken

		oWin = window.showModelessDialog(url, windowname, settings);
	}else{
		settings += "height=" + nHeight ;
		settings += ", width=" + nWidth ;
		settings += ", top=" + nTop;
		settings += ", left=" + nLeft;
		if(sStatus != undefined) settings += ", status=" + sStatus;
		if(sMenubar != undefined) settings += ", menubar=" + sMenubar;
		if(sScrollbar != undefined) settings += ", scrollbars=" + sScrollbar;
		if(sToolbar != undefined) settings += ", toolbar=" + sToolbar;

		oWin = window.open(url, windowname, settings) ;
	}

	return oWin;
}

// 로그인 페이지로 이동.
function goLogin(loginChk, isTargetObj, isSelfClose, location_url, popupName)
{	
	var loginUrl = '';
	var redir = escape(location.href);
	if(isTargetObj) redir = escape(isTargetObj.location.href);
	if(location_url) redir = escape(location_url);
	//alert(loginChk)
	switch (loginChk)
	{
		case 1 :
			loginUrl = '/my/login.asp?redir=';
			break;

		case 2 :
			loginUrl = '/company/login.asp?redir=';
			break;

		default :
			loginUrl = '/my/login.asp?redir=';
			break;
	}

	if(popupName){
		var pop = window.open(loginUrl + redir, popupName);
		pop.focus();
	}else{
		if(loginUrl && !isTargetObj) location.href = loginUrl + redir;
		if(loginUrl && isTargetObj) isTargetObj.location.href = loginUrl + redir;
		if(isSelfClose) self.close();
	}
}

// set. cookies
function set_cookie(name, value, expiredays)
{
	var todayDate = new Date();
	var m = (23 - todayDate.getHours()) * 60;
	var s = (m + (59 - todayDate.getMinutes())) * 60;
	var ms = (s + (59 - todayDate.getSeconds())) * 1000;
	var expireTime = todayDate.getTime() +  ms;

	todayDate.setTime(expireTime);
	document.cookie = name + '=' + escape( value ) + '; path=/; expires=' + todayDate.toGMTString() + '; domain=career.co.kr;'
	document.cookie = name + '=' + escape( value ) + '; path=/; expires=' + todayDate.toGMTString() + '; domain=daum.net;'
}

// get. cookies
function get_cookie(name)
{
	var Found = false;
	var start, end;
	var i = 0;
	while(i <= document.cookie.length) {
		start = i;
		end = start + name.length;
		if(document.cookie.substring(start, end) == name) {
			Found = true;
			break;
		}
		i++;
	}

	if(Found == true) {
		start = end + 1;
		end = document.cookie.indexOf(';', start);
		if(end < start)
			end = document.cookie.length;
		return document.cookie.substring(start, end);
	}
	return '';
}

// 채용대행 원본이미지보기
function openImage(s)
{
	var srcImg = new Image();
	srcImg.src = s;
    srcImg.onload;

    var clientWidth = screen.width;
	var clientHeight = screen.height;
    var scrollbar = null;
    var sWidth = 674;
    var sHeight = 600;

	if(clientWidth > srcImg.width && clientHeight > srcImg.height)
		scrollbar = 1;
	else if(clientWidth <= srcImg.width)
        sWidth = srcImg.width+30;

    var srcFileName = srcImg.src.substr(srcImg.src.lastIndexOf("/")+1, srcImg.src.length);

    var win = centerOpenWindow('about:blank', 'image', sWidth, sHeight, undefined, undefined, scrollbar, undefined);
   	win.document.writeln("<html>");
	win.document.writeln("<head>");
	win.document.writeln("<meta http-equiv='Content-Type' content='text/html; charset=euc-kr' />");
	win.document.writeln("<title>"+document.title+"</title>");
	win.document.writeln("</head>");
	win.document.writeln("<body style='margin:0; padding:0; background:#fff;'>");
	win.document.writeln("<table width='100%' border='0' cellpadding='0' cellspacing='0' style='cursor:pointer;' onclick='self.close()'>");
	win.document.writeln(" <tr>");
	win.document.writeln("  <td style='text-align:center;'><img src="+s+" name='winImg' style='cursor:pointer;' onclick='self.close()' alt='클릭하면 사라집니다'></td>");
	win.document.writeln(" </tr>");
	win.document.writeln("</table>");
	win.document.writeln("</body>");
	win.document.writeln("</html>");
}


function goLink(url, isReplace)
{
	if(isReplace)
		location.replace(url);
	else
		location.href = url;
}

function showLoading(){
	var obj = document.getElementById('loaddingBar');
	if(obj){
		var objW = obj.style.width.replace('px','');
		var objH = obj.style.height.replace('px','');
		var left = Math.round((document.body.clientWidth/2)-(objW/2))
		var top = Math.round((document.body.clientHeight/2)-(objH/2));
		obj.style.top = left+'px';
		obj.style.left = top+'px';
		obj.style.display = '';
		document.body.style.cursor = 'wait';
	}
}

function hideLoading(){
	var obj = document.getElementById('loaddingBar');
	if(obj) obj.style.display = 'none';
	document.body.style.cursor = 'default';
}


/******************************* SUB GNB area Start *******************************/
function showHideSub(id, action)
{
	var obj;
	if(typeof(id) == 'object') obj = id
	else{
		obj = document.getElementById(id);
		if(!obj) return;
	}

	if(action != undefined){
		obj.style.display = action;
	}else{
		if(obj.style.display == 'none') action = '';
		else action = 'none';
		obj.style.display = action;
	}
}

//------------- 통합검색 selectbox 레이어뷰.
function showItemListSub(objId)
{
	showHideSub(objId);
}

function setCollSub(obj, tLayer, val)
{

	var form = document.frmAllSch;
	var tLayer = document.getElementById(tLayer);
	form.coll.value = val;
	//20130916 sub gnb 변경으로 인하여 주석처리함. cjs
	//showHideSub(obj.parentNode, 'none');
	//tLayer.innerHTML = obj.innerHTML;
}

//------------- 통합검색 클릭시.
function goAllSchSub(form)
{
	if(!chkObjValue(form.sw1, '검색어를 입력해 주세요.', true)) return false;
	if(document.getElementById("coll").value == "Alba"){
		document.frmAllSch.target = "_blank"
	}
}

function imgOnOff(id, before, after){
	var obj = document.getElementById(id);
	if(obj) obj.src = obj.src.replace(before, after);
}

/******************************* SUB GNB area End *******************************/



/*
*	클립보드 복사 함수
*/
function copyToClipboard(text) {
	if (window.clipboardData) {
		window.clipboardData.setData("Text", text);
		alert('소스가 클립보드에 복사되었습니다.');
	} else {
		try {
			netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
			var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
			if (!clip) return;
			var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
			if (!trans) return;
			trans.addDataFlavor('text/unicode');
			var str = new Object();
			var len = new Object();
			var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
			var copytext=text;
			str.data=copytext;
			trans.setTransferData("text/unicode",str,copytext.length*2);
			var clipid=Components.interfaces.nsIClipboard;
			if (!clip) return false;
			clip.setData(trans,null,clipid.kGlobalClipboard);
			
			alert('소스가 클립보드에 복사되었습니다.');
		} catch(e) {
			alert("브라우저가 클립보드 사용을 지원하지 않습니다."+e);
			return false;
		}
	}
 
	return true;
} 

// 개인정보취급방침 2014-07-15 skydown@career.co.kr
function privacyShow(obj, param) {//링크선택&레이어 보이기
	var _this = obj.href.split('#')[1] -1;
	var _a = obj.parentNode.getElementsByTagName('a');
	for(var i=0; i< _a.length; i++) {
		if(i == _this) {
			_a[i].innerHTML = '<strong>' + _a[i].innerHTML.replace(/\n|<.*?>/g,'') + '</strong>';
			privacyClassName('privacyText')[i].style.display = 'block'
		} else {
			_a[i].innerHTML = _a[i].innerHTML.replace(/\n|<.*?>/g,'');
			privacyClassName('privacyText')[i].style.display = 'none'
		}
	}
}
function privacyClassName(className) {//ie8이전 호환
	var found = [];
	var elements = document.getElementsByTagName("*");
	for (var i = 0; i < elements.length; i++) {
		var names = elements[i].className.split(' ');
		for (var j = 0; j < names.length; j++) {
			if (names[j] == className) found.push(elements[i]);
		}
	}
	return found;
}




// 2014-12-03 남승미 4주 성공취업캠프 관련 파라미터 추가
function chkconsult()
{
	var consultVal = $(":checkbox[name=campAgree]:checked").val();
		
	if (consultVal == undefined){
		if(confirm("성공 취업 컨설팅 신청을 취소하시겠습니까?"))
		{
			document.frm1.jm.value = "N";
		}
		else
		{
			document.frm1.jm.value = "Y";
			document.frm1.campAgree.checked = true;
		}
	}
}


// 2015-02-26 도메인체크
function chkCareer()
{
	var strDomain = window.location.href;
	var chkCareer = false;
	for(i =0 ; i < strDomain.split(".").length;i++){
		if(strDomain.split(".")[i]=="career"){
			chkCareer = true;
		}
	}
	return chkCareer;
}








// 
// 2015-04-07
// nsm : 비밀번호 체크 하기 위해 추가
// 
//---------------------------------------------------------------------------------------------------
// 등록시 글자수 체크
//---------------------------------------------------------------------------------------------------
function FC_ChkTextLen(form, maxLen) {
	var f = form;
	var text = f.value;
	
	var i = 0;
	var li_byte = 0;
	var li_len = 0; 
	var ls_one_char = "";
	var text2 = "";
 
	for (i=0; i< text.length; i++) {
		ls_one_char = text.charAt(i);

		if (escape(ls_one_char).length > 4) {
			li_byte += 2;
		} else {
			li_byte++;
		}

		if(li_byte <= maxLen) {
			li_len = i + 1;
		}
	}

	if (li_byte > maxLen) {
		alert( maxLen + " 글자를 초과 입력할수 없습니다. \n 초과된 내용은 자동으로 삭제 됩니다. ");
		text2 = text.substr(0, li_len);
		f.value = text2;
	}

	f.focus();
}


//관심기업 2017.07.17
function fn_attention(loginChk, com_idnum, company_name, company_id, obj){
	if (loginChk == "1") {
		var params = "com_idnum=" + com_idnum + "&company_id=" + company_id + "&company_name=" + escape(company_name);
		jQuery.ajax({
			url: '/service/interest_com2017.asp',
			type: 'post',
			data: params,
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8', 
			dataType: 'html',
			success: function (data) {
				if (data == "0"){
					goLogin(1);	
				} else if (data == "1"){					
					$(obj).addClass('on'); 
					//$(obj).find("img").attr("src", "http://image.career.co.kr/career_new4/kangso/calendar/icon_mid_heart_on.png"); 
					alert('관심기업으로 등록되었습니다.');
				} else if (data == "2"){					
					$(obj).removeClass('on');
					//$(obj).find("img").attr("src", "http://image.career.co.kr/career_new4/kangso/calendar/icon_mid_heart_off.png");
					alert('관심기업 등록에서 해제되었습니다.');
				} else if (data == "50"){
					alert('관심기업은 최대 50개까지 등록 가능합니다.');
				}
			},
			error : function(request, status, error ) {   // 오류가 발생했을 때 호출된다. 
				alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
				//console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			}
		});
	} else {
		var result = confirm("개인회원 로그인 후 이용 가능합니다. 로그인하시겠습니까?");

		if(result) {
			goLogin(1);
		}
		else {
			return;
		}		
	}
}

//공고 스크랩 2017.07.17
function fn_Scrap(loginChk, id_num, cmpNM, obj){
	if (loginChk == "1") {
		var params = "id_num=" + id_num + "&company_name=" + escape(cmpNM);
		jQuery.ajax({
			url: '/service/scrap2017.asp',
			type: 'post',
			data: params,
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8', 
			dataType: 'html',
			success: function (data) {
				if (data == "0"){
					goLogin(1);	
				} else if (data == "1"){					
					//$(obj).addClass('on');
					$(".round scrap").addClass('on');
					$(".scrap").addClass('on');
					$(obj).find("img").attr("src", "http://image.career.co.kr/career_new4/kangso/calendar/icon_big_scrap_on.png");
					alert('채용공고가 스크랩 되었습니다.');
				} else if (data == "2"){					
					//$(obj).removeClass('on');
					$(".round scrap").removeClass('on');
					$(".scrap").removeClass('on');
					$(obj).find("img").attr("src", "http://image.career.co.kr/career_new4/kangso/calendar/icon_big_scrap_off.png");
					alert('채용공고 스크랩이 해제되었습니다.');
				} 
			},
			error : function(request, status, error ) {   // 오류가 발생했을 때 호출된다. 
				//console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			}
		});
	} else {
		var result = confirm("개인회원 로그인 후 이용 가능합니다. 로그인하시겠습니까?");

		if(result) {
			goLogin(1);
		}
		else {
			return;
		}
	}
}

//기업회원 취업뉴스 2019-04-03
/*
$(document).ready(function(){
	var height =  $(".memberInfo .notice").height();
	var num = $(".memberInfo .rolling li").length;
	var max = height * num;
	var move = 0;
	function noticeRolling(){
		move += height;
		$(".memberInfo .rolling").animate({"top":-move},1000,function(){
			if( move >= max ){
				$(this).css("top",0);
				move = 0;
			};
		});
	};
	noticeRollingOff = setInterval(noticeRolling,2000);
	$(".memberInfo .rolling").append($(".memberInfo .rolling li").first().clone());

	$(".memberInfo .rolling li a").mouseover(function(){
		clearInterval(noticeRollingOff);
	});
	$(".memberInfo .rolling li a").mouseout(function(){
		noticeRollingOff = setInterval(noticeRolling,2000);
	});
}); 
*/
//end 기업회원 취업뉴스 2019-04-03



function openPostCode(zipcd_id, addr_id, addr2_id) {
	new daum.Postcode({
		oncomplete: function (data) {
			// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

			// 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
			// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
			var fullRoadAddr = data.roadAddress; // 도로명 주소 변수
			var extraRoadAddr = ''; // 도로명 조합형 주소 변수

			// 법정동명이 있을 경우 추가한다. (법정리는 제외)
			// 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
			if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
				extraRoadAddr += data.bname;
			}
			// 건물명이 있고, 공동주택일 경우 추가한다.
			if (data.buildingName !== '' && data.apartment === 'Y') {
				extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
			}
			// 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
			if (extraRoadAddr !== '') {
				extraRoadAddr = ' (' + extraRoadAddr + ')';
			}
			// 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
			if (fullRoadAddr !== '') {
				fullRoadAddr += extraRoadAddr;
			}

			// 우편번호와 주소 정보를 해당 필드에 넣는다.
			if (zipcd_id != "") {
				document.getElementById(zipcd_id).value = data.zonecode; //5자리 새우편번호 사용
			}
			if (addr_id != "") {
				document.getElementById(addr_id).value = fullRoadAddr;
			}
			if (addr2_id != "") {
				document.getElementById(addr2_id).value = fullRoadAddr;
			}
		}
	}).open();
}