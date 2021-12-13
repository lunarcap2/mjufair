<%
	session.codepage = "65001"
	response.expires = -1
	response.cachecontrol = "no-cache"
	response.charset = "utf-8"
%>

<!--#include virtual = "/inc/db/DBConnection.asp"-->

<%
	Response.AddHeader "P3P", "CP='ALL CURa ADMa DEVa TAIa OUR BUS IND PHY ONL UNI PUR FIN COM NAV INT DEM CNT STA POL HEA PRE LOC OTC'"

	Dim user_name, authType, AuthValue, user_id, idxNum, rtn_value

	user_name	= Request("user_nm")
    authType	= Request("authType")
    AuthValue	= Request("AuthValue")
	user_id		= Request("user_id")
	idxNum		= Request("idxNum")
	
	If user_name = "" Then 
		Response.write "<script language=""javascript"">location.href='/my/search/searchPW.asp';</script>"
	Else		
		ConnectDB DBCon, Application("DBInfo_FAIR")

		SpName="USP_USER_FIND_PW"

		ReDim param(4)
		param(0) = makeParam("@AuthType", adTinyInt, adParamInput, 1, authType)
		param(1) = makeParam("@UserName", adVarChar, adParamInput, 30, user_name)
		param(2) = makeParam("@AuthValue", adVarChar, adParamInput, 100, AuthValue)
		param(3) = makeParam("@UserID", adVarChar, adParamInput, 20, user_id)
        param(4) = makeParam("@idxNum", adInteger, adParamInput, 100, idxNum)

		rtn_value = arrGetRsSP(DBCon, SpName, param, "", "")
		
		If isArray(rtn_value) Then
			Dim i, search_id
			
			For i = 0 to ubound(rtn_value, 2)
				search_id = Replace(rtn_value(0,i), "_wk", "")
			Next
		End If

		Response.write search_id
	End If
	
	DisconnectDB DBCon
%>