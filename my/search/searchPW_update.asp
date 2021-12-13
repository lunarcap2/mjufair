<%
	session.codepage = "65001"
	response.expires = -1
	response.cachecontrol = "no-cache"
	response.charset = "utf-8"
%>

<!--#include virtual="/wwwconf/function/db/DBConnection.asp"-->
<!--#include virtual="/wwwconf/function/library/KISA_SHA256.asp"-->

<%
	Response.AddHeader "P3P", "CP='ALL CURa ADMa DEVa TAIa OUR BUS IND PHY ONL UNI PUR FIN COM NAV INT DEM CNT STA POL HEA PRE LOC OTC'"

	Dim authType, authValue, user_id, user_pw, rtn_value
	
	authType	= Request("authType")
    authValue	= Request("authValue")
    user_id		= Request("user_id")
    user_pw		= Request("user_pw")
	
	If user_id = "" Then 
		Response.write "<script language=""javascript"">location.href='/my/search/searchPW.asp';</script>"
	Else		
		ConnectDB DBCon, Application("DBInfo_FAIR")

		SpName="usp_user_find_password_update"

		ReDim param(3)
		param(0) = makeParam("@user_id", adVarWChar, adParamInput, 50, user_id)
		param(1) = makeParam("@authType", adWChar, adParamInput, 1, authType)
		param(2) = makeParam("@authValue", adVarWChar, adParamInput, 50, authValue)
		param(3) = makeParam("@modifyPW", adVarWChar, adParamInput, 200, SHA256_Encrypt(user_pw))

		rtn_value = arrGetRsSP(DBCon, SpName, param, "", "")		
	End If
	
	DisconnectDB DBCon
%>