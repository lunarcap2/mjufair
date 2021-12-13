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

			ReDim Param(10)
			Param(0) = makeparam("@KW_GUBUN",adVarChar,adParamInput,100,"")
			Param(1) = makeparam("@KW",adVarChar,adParamInput,100,"")
			Param(2) = makeparam("@MENTORING_NO",adInteger,adParamInput,4,mentor_no)
			Param(3) = makeparam("@S_DATE",adVarChar,adParamInput,10,"")
			Param(4) = makeparam("@E_DATE",adVarChar,adParamInput,10,"")
			Param(5) = makeparam("@USER_ID",adVarChar,adParamInput,20,"")
			Param(6) = makeparam("@PAGE",adInteger,adParamInput,4,1)
			Param(7) = makeparam("@PAGE_SIZE",adInteger,adParamInput,4,1000)
			Param(8) = makeparam("@TOTAL_CNT",adInteger,adParamOutput,4,"")


			Param(9) = makeparam("@MENTORING_DATE",adVarChar,adParamInput,10,montoring_date)
			Param(10) = makeparam("@MENTORING_TIME",adVarChar,adParamInput,2,montoring_time)

			Dim arrRs
			arrRs = arrGetRsSP(DBcon, "asp_관리자_상담정보_신청_리스트", Param, "", "")

		DisconnectDB DBCon


		If isArray(arrRs) Then
			For i=0 To UBound(arrRs, 2)

				dbCon.Open Application("DBInfo_etc")
					now_time = year(now) & right("0" & month(now),2) & right("0" & day(now),2) & right("0" & hour(now),2) & right("0" & minute(now),2) & right("0" & second(now),2)
					hp = arrRs(4, i)

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


				dbCon.Open Application("DBInfo_FAIR")
					
					sqlstr = ""
					sqlstr = sqlstr & " UPDATE 상담_신청정보"
					sqlstr = sqlstr & " SET 문자발송여부 = 'Y'"
					sqlstr = sqlstr & " ,문자발송시간 = GETDATE()"
					sqlstr = sqlstr & " WHERE IDX = " & arrRs(11, i)
					dbcon.Execute(sqlstr)

				dbcon.close

			Next
		End If
End If
%>
<script>
	alert("문자발송이 완료되었습니다.");
	location.href = "/admin/mentoring/send_sms_list.asp";
</script>