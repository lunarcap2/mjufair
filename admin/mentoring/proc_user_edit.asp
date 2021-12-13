<!--#include virtual="/common/common.asp"-->
<!--#include virtual="/wwwconf/function/db/DBConnection.asp"-->
<%
Dim pop_user_id, pop_user_hp, pop_user_email 
pop_user_id = request("pop_user_id")
pop_user_hp = request("pop_user_hp")



ConnectDB DBCon, Application("DBInfo_FAIR")

	Dim strQuery
	strQuery = "UPDATE 개인회원정보 SET 휴대폰 = ? WHERE 개인아이디 = ?"

	ReDim param(1)
	param(0) = makeparam("@hp",adVarChar,adParamInput,20,pop_user_hp)
	param(1) = makeparam("@user_id",adVarChar,adParamInput,20,pop_user_id)

	Call execSqlParam(DBCon, strQuery, param, "", "")


DisconnectDB DBCon

%>
<script>
	alert("회원정보가 수정되었습니다.");
	location.href = "/admin/mentoring/user_list.asp";
</script>