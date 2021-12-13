<!--#include virtual="/common/common.asp"-->
<!--#include virtual="/wwwconf/function/db/DBConnection.asp"-->
<%
Dim mentor_no, user_hp, sms_cont, montoring_date, montoring_time
mentor_no		= request("mentor_no")
user_hp			= request("user_hp")
sms_cont		= request("sms_cont")
montoring_date	= request("montoring_date")
montoring_time	= request("montoring_time")

Dim msg
msg = sms_cont


dim now_time, sqlstr, smsid, hp

'멘토번호 있을경우 : 해당 멘토링에 신청한 인원 단체문자발송
If mentor_no <> "" Then 

		ConnectDB DBCon, Application("DBInfo_FAIR")

			ReDim Param(6)
			Param(0) = makeparam("@KW_GUBUN",adVarChar,adParamInput,100,"")
			Param(1) = makeparam("@KW",adVarChar,adParamInput,100,"")
			Param(2) = makeparam("@S_DATE",adVarChar,adParamInput,10,montoring_date)
			Param(3) = makeparam("@LCTURE_TIT",adVarChar,adParamInput,100,mentor_no)
			Param(4) = makeparam("@PAGE",adInteger,adParamInput,4,1)
			Param(5) = makeparam("@PAGE_SIZE",adInteger,adParamInput,4,1000)
			Param(6) = makeparam("@TOTAL_CNT",adInteger,adParamOutput,4,"")

			Dim arrRs, totalCnt, pageCount
			arrRs		= arrGetRsSP(DBcon, "asp_관리자_특강신청자_리스트", Param, "", "")

		DisconnectDB DBCon


		If isArray(arrRs) Then
			For i=0 To UBound(arrRs, 2)

				dbCon.Open Application("DBInfo_etc")
					now_time = year(now) & right("0" & month(now),2) & right("0" & day(now),2) & right("0" & hour(now),2) & right("0" & minute(now),2) & right("0" & second(now),2)
					hp = arrRs(6, i)

					Set Rs = Server.CreateObject("ADODB.RecordSet")
					strSql = "select max(CMP_MSG_ID) as cmid from arreo_sms with(nolock) where not (left(CMP_MSG_ID, 5) = 'ALARM') "
					Rs.Open strSql, dbCon, 0, 1
					If not (Rs.BOF or Rs.EOF ) Then
						smsid = rs("cmid") + 1
						sqlstr = "insert into arreo_sms (CMP_MSG_ID, CMP_USR_ID, ODR_FG, SMS_GB, USED_CD, MSG_GB, WRT_DTTM, SND_DTTM, SND_PHN_ID, RCV_PHN_ID, CALLBACK, SND_MSG, EXPIRE_VAL, SMS_ST, RSLT_VAL, RSRVD_ID, RSRVD_WD)" &_
								" values ('" & smsid & "', '00000', '2', '1', '00', 'M', '" & now_time & "', '" & now_time & "', 'daumhr', '" & Replace(Replace(hp, " ", ""),"-","") & "', '0220066126', '" & msg & "', 0, '0', 99,'','');"

						dbcon.Execute(sqlstr)
					End If
					rs.close

				dbcon.close

			Next
		End If
End If
%>
<script>
	alert("문자발송이 완료되었습니다.");
	location.href = "/admin/mentoring/lcture_send_sms_list.asp";
</script>