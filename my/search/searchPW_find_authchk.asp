<%
	session.codepage = "65001"
	response.expires = -1
	response.cachecontrol = "no-cache"
	response.charset = "utf-8"
%>

<!--#include virtual="/wwwconf/function/db/DBConnection.asp"-->

<%
	Response.AddHeader "P3P", "CP='ALL CURa ADMa DEVa TAIa OUR BUS IND PHY ONL UNI PUR FIN COM NAV INT DEM CNT STA POL HEA PRE LOC OTC'"

	Dim gubun, AuthNumber, user_id, rtn_value

	gubun		= Request("authType")
    AuthNumber	= Request("AuthNumber")
    user_id		= Request("user_id")
	
	If user_id = "" Then 
		Response.write "<script language=""javascript"">location.href='/my/search/searchPW.asp';</script>"
	Else
		ConnectDB DBCon, Application("DBInfo_FAIR")

		SpName="USP_FIND_AUTHCHK"

		ReDim param(3)
		param(0) = makeParam("@gubun", adWChar, adParamInput, 1, gubun)
		param(1) = makeParam("@AuthNumber", adVarWChar, adParamInput, 500, AuthNumber)
		param(2) = makeParam("@user_id", adVarWChar, adParamInput, 50, user_id)
		param(3) = makeParam("@rtn", adChar, adParamOutput, 1, "")

		Call execSP(DBCon, SpName, param, "", "")

		rtn_value = getParamOutputValue(param, "@rtn")

		Response.write rtn_value
	End If	
	
	DisconnectDB DBCon
%>