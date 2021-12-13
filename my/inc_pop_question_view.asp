<!--#include virtual = "/common/common.asp"-->
<!--#include virtual = "/include/header/header.asp"-->
<!--#include virtual = "/wwwconf/function/db/DBConnection.asp"-->
<%
ConnectDB DBCon, Application("DBInfo_FAIR")

	Dim mentor_no, question_idx
	mentor_no = request("mentor_no")
	question_idx = request("question_idx")


	ReDim Param(7)
	Param(0) = makeparam("@kw",adVarChar,adParamInput,100,"")
	Param(1) = makeparam("@S_DATE",adVarChar,adParamInput,10,"")
	Param(2) = makeparam("@E_DATE",adVarChar,adParamInput,10,"")
	Param(3) = makeparam("@MENTOR_NO",adInteger,adParamInput,4,mentor_no)
	Param(4) = makeparam("@USER_ID",adVarChar,adParamInput,20,"")
	Param(5) = makeparam("@PAGE",adInteger,adParamInput,4,1)
	Param(6) = makeparam("@PAGE_SIZE",adInteger,adParamInput,4,1)
	Param(7) = makeparam("@TOTAL_CNT",adInteger,adParamOutput,4,"")

	Dim arrRsMentor
	arrRsMentor = arrGetRsSP(DBcon, "asp_관리자_상담정보_현황", Param, "", "")



	reDim Param(0)
	Param(0) = makeparam("@QUESTION_IDX", adInteger, adParamInput, 4, question_idx)

	Dim arrRsQuestion
	arrRsQuestion = arrGetRsSP(DBcon, "usp_개인_상담정보_사전질문_상세뷰", Param, "", "")


DisconnectDB DBCon
%>


	<div class="info_box">
		<dl class="ib_dl">
			<dt>
				<span><%=arrRsMentor(3, i)%></span>
			</dt>
			<dd class="logo">
				<div class="logo_box">
					<img src="/files/mentor/<%=arrRsMentor(7, i)%>">
				</div>
			</dd>
			<span>소속입니다.</span>
		</dl>
		<div class="input_txt tab">
			<h5>사전질문</h5>
			<textarea id="pop_question_cont" name="pop_question_cont"><%=arrRsQuestion(3, 0)%></textarea>
		</div>
	</div>

