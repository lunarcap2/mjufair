// 면접시간 구하기
function getInterviewTime(scode) {
	var result_val = "";
	
	switch(scode){
		case "1":
			result_val = "09:00~09:25";
			break;
		case "2":
			result_val = "09:30~09:55"
			break;
		case "3":
			result_val = "10:00~10:25"
			break;
		case "4":
			result_val = "10:30~10:55"
			break;
		case "5":
			result_val = "11:00~11:25"
			break;
		case "6":
			result_val = "11:30~11:55"
			break;
		case "7":
			result_val = "13:00~13:25"
			break;
		case "8":
			result_val = "13:30~13:55"
			break;
		case "9":
			result_val = "14:00~14:25"
			break;
		case "10":
			result_val = "14:30~14:55"
			break;
		case "11":
			result_val = "15:00~15:25"
			break;
		case "12":
			result_val = "15:30~15:55"
			break;
		case "13":
			result_val = "16:00~16:25"
			break;
		case "14":
			result_val = "16:30~16:55"
			break;
		case "15":
			result_val = "17:00~17:25"
			break;
		case "16":
			result_val = "17:30~17:55"
			break;
	}

	return result_val;
}

function getDateToString(DT){//Datetime형 => String 형식으로 형변환
	var tmpDate = DT;
	var yy = tmpDate.getFullYear();
	var mm = getDateAddZero(tmpDate.getMonth()+1);
	var dd = getDateAddZero(tmpDate.getDate());
	var d = yy + '-' + mm + '-' +dd
	return d;
}

function getDateAddZero(val){//월이나 날짜가 10보다 작은경우 앞에 '0' 넣어줌
	var rtn;
	if (val < 10){
		val = '0' + val;
	}
	return val.toString();
}