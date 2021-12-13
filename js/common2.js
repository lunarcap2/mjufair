// Window Open
function openwin(surl, wname, w, h) {
	wname = window.open(surl, wname, 'width='+w+', height='+h+', scrollbars=1, left=10, top=10');
	wname.focus();
}

function openwin2(surl, wname, w, h) {
	wname = window.open(surl, wname, 'width='+w+', height='+h+', scrollbars=0, left=10, top=10');
	wname.focus();
}

function openwinProfile(surl, wname, w, h) {
	wname = window.open(surl, wname, 'width='+w+', height='+h+', scrollbars=0, left=10, top=10');
	wname.focus();
}
//function openwin2(url, wname, w, h, s, l, t) {
//	wname = window.open(url, wname, 'width='+w+', height='+h+', scrollbars='+s+', left='+l+', top='+t+', toolbars=no, status=no');
//	wname.focus();
//}

// CheckBox Reverse
function checkAll(objFrm) {
	for (var i = 0; i < objFrm.elements.length; i++) {
		var forminput = objFrm.elements[i];
		if (forminput.name == 'rid') {
			if (forminput.checked) 
				forminput.checked = false;
			else 
				forminput.checked = true;
		}
	}
}

// 글자길? 체?
function checkLen(obj) {
	var i, len = 0;
	for(i = 0; i < obj.length; i++) (obj.charCodeAt(i) > 255) ? len += 2 : len++;
	return len;
}

// 공? 체?
function isEmpty(data) {
	for(var i = 0; i < data.length; i++) {
		if (data.substring(i, i + 1) != " ")
			return false;
	}
	return true;
}

// ?자 체?
var num = "0123456789";
var alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var etc = "-_.";


function Validchar(g, str) {
	for (var i = 0; i < g.length; i++) {
		if (str.indexOf(g.charAt(i)) == -1)
			return false;
	}
	return true;
}

// alert ?? 및 포커??동
function fieldChk(msg, f) {
	alert(msg);
	f.focus();
}

function IsDate(strDate) {
	var arrDate;
	var chkDate;
	
	if (strDate.indexOf("-") != -1) {
		arrDate = strDate.split("-");
	}
	else {
		arrDate = strDate.split("/");
	}

	if (arrDate.length != 3) {
		return false;
	}
	
	chkDate = new Date(arrDate[0] + "/" + arrDate[1] + "/" + arrDate[2]);
	if (isNaN(chkDate) == true || (arrDate[1] != chkDate.getMonth() + 1 || arrDate[2] != chkDate.getDate())) {
		return false;
	}
	
	return true;
}

function chkChar(objItem, length_limit, msgkind) {
	var length = calculate_msglen(objItem.value);
	if (length > length_limit) {
		alert(msgkind + "? ?대 " + length_limit + "Byte?지 ??할 ? ?습?다.\n\n" + length_limit + "Byte? [ " + assert_msglen(objItem.value, length_limit) + " ] ?지 ??다.");
		return true;
	}
	else if (length == 0) {
		alert(msgkind + "? ?확? ??(" + length_limit + "Byte)해 주세?.");
		return true;
	}
}

function calculate_msglen(message) {
	var nbytes = 0;

	for (i = 0; i < message.length; i++) {
		var ch = message.charAt(i);
		if(escape(ch).length > 4) {
			nbytes += 2;
		} else if (ch == '\n') {
			if (message.charAt(i-1) != '\r') {
				nbytes += 1;
			}
		} else if (ch == '<' || ch == '>') {
			nbytes += 4;
		} else {
			nbytes += 1;
		}
	}

	return nbytes;
}

function assert_msglen(message, maximum) {
	var inc = 0;
	var nbytes = 0;
	var msg = "";
	var msglen = message.length;

	for (i = 0; i < msglen; i++) {
		var ch = message.charAt(i);
		if (escape(ch).length > 4) {
			inc = 2;
		} else if (ch == '\n') {
			if (message.charAt(i-1) != '\r') {
				inc = 1;
			}
		} else if (ch == '<' || ch == '>') {
			inc = 4;
		} else {
			inc = 1;
		}
		if ((nbytes + inc) > maximum) {
			break;
		}
		nbytes += inc;
		msg += ch;
	}
	
	return msg;
}

function DoCallback(url) {
	var xmlReq = new ActiveXObject("Microsoft.XMLHTTP");

	xmlReq.Open("POST", url, false);
	xmlReq.setRequestHeader("Accept-Language","ko"); 
	xmlReq.setRequestHeader("Content-type:", "text/html");
	xmlReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlReq.Send(null);

	return xmlReq;
}

function jsAjax() {
	var xmlHttp = null;
	var method = "GET";
	var url = null;
	var urlparse = new Array;
	
	this.run = function(function_name) {

		if (window.ActiveXObject) {
	        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	    } 
	    else if (window.XMLHttpRequest) {
	        xmlHttp = new XMLHttpRequest();
	    }
		
		if (this.method == "GET") {
			xmlHttp.open("GET", this.url, true);
			
			urlparse[0] = this.url;
			urlparse[1] = null;
		} 
		else if (this.method == "POST") {
			if(this.url.indexOf("?") >= 0) {
				urlparse = this.url.split("?");
			} else {
				urlparse[0] = this.url;
				urlparse[1] = null;
			}
			
			xmlHttp.open("POST", urlparse[0], true);
			xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		}
		
	    xmlHttp.onreadystatechange = function() {
	    	if(xmlHttp.readyState == 4) {
	        	if(xmlHttp.status == 200) {
	        		function_name(xmlHttp);
	        	}
	        }
	   	}
	    
	    xmlHttp.send(urlparse[1]);
	}
}

function onlyNumber(event) {
	event = event || window.event;
	var keyID = (event.which) ? event.which : event.keyCode;
	if ( (keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 ) 
		return;
	else
		return false;
}