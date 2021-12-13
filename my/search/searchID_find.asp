<%
	session.codepage = "65001"
	response.expires = -1
	response.cachecontrol = "no-cache"
	response.charset = "utf-8"
%>

<!--#include virtual="/wwwconf/function/db/DBConnection.asp"-->

<%
	Response.AddHeader "P3P", "CP='ALL CURa ADMa DEVa TAIa OUR BUS IND PHY ONL UNI PUR FIN COM NAV INT DEM CNT STA POL HEA PRE LOC OTC'"

	Dim user_name, authType, AuthValue, rtn_value

	user_name	= Request("user_nm")
    authType	= Request("authType")
    AuthValue	= Request("AuthValue")
	
	If user_name = "" Then 
		Response.write "<script language=""javascript"">location.href='/my/search/searchID.asp';</script>"
	Else
		ConnectDB DBCon, Application("DBInfo_FAIR")

		SpName="USP_USER_FIND_ID"

		ReDim param(2)
		param(0) = makeParam("@AuthType", adTinyInt, adParamInput, 1, authType)
		param(1) = makeParam("@UserName", adVarChar, adParamInput, 30, user_name)
		param(2) = makeParam("@AuthValue", adVarChar, adParamInput, 100, AuthValue)
	
		rtn_value = arrGetRsSP(DBCon, SpName, param, "", "")

		If isArray(rtn_value) Then
			Dim i, search_id, reg_date, lenid, ii, marking 
			
			For i = 0 to ubound(rtn_value, 2)
				search_id = Replace(rtn_value(0,i), "_wk", "")
				reg_date = rtn_value(1,i)
				lenid = Len(search_id)

				For ii=1 To Fix(lenid/2)
					marking = marking & "*"
				Next
				
				Response.write "1|" & Left(search_id, -(Int(-(lenid/2)))) & marking & "|" & Left(reg_date, 10)
			Next
		Else
			Response.write "0|"
		End If
	End If
	
	DisconnectDB DBCon
%>