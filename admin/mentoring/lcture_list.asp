<% Option Explicit %>
<!--#include virtual="/wwwconf/function/db/DBConnection.asp"-->
<!--#include virtual="/common/common.asp"--> 
<!--#include virtual="/inc/function/paging.asp"-->
<%
	' ������ ������ ��쿡�� ���� ���   
	If Request.Cookies(site_code & "WKADMIN")("admin_id")="" Then 
		Response.Write "<script language=javascript>"&_
			"alert('�ش� �޴��� ���� ���� ������ �����ϴ�.');"&_
			"location.href='/';"&_
			"</script>"
		response.End 
	End If

	If Request.ServerVariables("HTTPS") = "off" Then 
		Response.redirect "https://"& Request.ServerVariables("HTTP_HOST") & Request.ServerVariables("URL") 
	End If


	Dim schKeyword	: schKeyword	= Request("schKeyword") ' �˻���(����/����)  
	Dim page		: page			= Request("page")
	Dim pageSize	: pageSize		= 20

	If page = "" Then page=1
	page = CInt(page)

	Dim stropt, i, ii
	stropt = "schKeyword="&schKeyword

	ConnectDB DBCon, Application("DBInfo_FAIR")

		Dim Param(3)
		Param(0) = makeparam("@kw",adVarChar,adParamInput,100,schKeyword)
		Param(1) = makeparam("@PAGE",adInteger,adParamInput,4,page)
		Param(2) = makeparam("@PAGE_SIZE",adInteger,adParamInput,4,pagesize)
		Param(3) = makeparam("@TOTAL_CNT",adInteger,adParamOutput,4,"")

		Dim arrRs, totalCnt, pageCount
		arrRs		= arrGetRsSP(DBcon, "asp_������_Ư����ʰ���_����Ʈ", Param, "", "")
		totalCnt	= getParamOutputValue(Param, "@TOTAL_CNT")
		pageCount	= Fix(((totalCnt-1)/PageSize) +1) 'int(totalCnt / pagesize) + 1

	DisconnectDB DBCon

%>
<!--#include virtual = "/include/header/header.asp"-->
<script type="text/javascript">
	
	// �˻�
	function fn_search() {
		var obj = document.frm_list;
		if ($("#schKeyword").val() == "") {
			alert("�˻�� �Է��� �ּ���.");
			$("#schKeyword").focus();
			return false;
		}
		obj.action = "lcture_list.asp";
		obj.submit();
	}

	// �˻� �ʱ�ȭ
	function fn_reset() {
		var obj = document.frm_list;
		obj.schKeyword.value	= "";
		obj.action				= "lcture_list.asp";
		obj.submit();
	}

</script>
</head>

<body id="loginWrap">
<!-- ��� -->
<!--#include virtual = "/include/gnb/topMenu.asp"-->
<!-- ��� -->

<!-- ���� -->
<div id="contents" class="admin">
	<div class="content">
		<div class="navi">
			<ul>
				<li><a href="#none;">Ȩ</a></li>
				<li><a href="#none;">Ư�� ��� ����</a></li>
			</ul>
		</div>

		<div class="list_area">
			<div class="tit">
				<h3>Ư�� ��� ����</h3>
			</div>

			<!-- �Ǹ޴� -->
			<br>
			<div class="s2_tab_tit">
				<!-- ���ݱ� ������� -->			
				<a style="width:16.7%;" href="/admin/board/board_list.asp">��������</a>
				<a style="width:16.7%;" href="/admin/mentoring/user_list.asp">������û ��Ȳ</a>
				<a style="width:16.7%;" href="/admin/mentoring/apply_list.asp">������� ��û��</a>
				<a style="width:16.7%;" href="/admin/mentoring/lcture_apply_list.asp">Ư�� ��û��</a>
				<a style="width:16.7%;" href="/admin/mentoring/question_list.asp">��������</a>
				<a style="width:16.7%;" href="/admin/mentoring/send_sms_list.asp">������� ���ڹ߼�</a>
				<a style="width:16.7%;" href="/admin/mentoring/lcture_send_sms_list.asp">Ư�� ���ڹ߼�</a>
				<a style="width:16.7%;" href="/admin/mentoring/mentor_list.asp">������� ��������</a>
				<a style="width:16.7%;" href="/admin/mentoring/lcture_list.asp" class="on">Ư�� ��� ����</a>
			</div>
			<br>
			<!-- //�Ǹ޴� -->
			
			<!--
			<div class="right_box">
				<form method="post" id="frm_list" name="frm_list">
				<div class="sch_box">
					<input type="text" class="txt" id="schKeyword" name="schKeyword" placeholder="�˻�� �Է��� �ּ���." value="<%=schKeyword%>">
					<button type="button" class="btn" onclick="fn_search();">�˻�</button>
					<button type="button" class="reset" onclick="fn_reset();">�ʱ�ȭ</button>
				</div>
				</form>
			</div>
			-->

			<table class="tb">
				<colgroup>
					<col style="width:150px">
					<col>
					<col style="width:260px">
					<col style="width:300px">
				</colgroup>
				<thead>
					<tr>
						<th>No</th>
						<th>Ư��</th>
						<th>Ư���Ͻ�</th>
						<th>��û�� ��</th>
					</tr>
				</thead>
				<tbody>
					<%
						If isArray(arrRs) Then
							For i=0 To UBound(arrRs, 2)
							Dim lcture_rownum, lcture_no, lcture_tit, lcture_day, lcture_applyCnt
							lcture_rownum	= arrRs(1,i)	' No
							lcture_no		= arrRs(2,i)	' ���ǹ�ȣ
							lcture_tit		= arrRs(3,i)	' Ư����
							lcture_day		= arrRs(4,i)	' Ư���Ͻ�
							lcture_applyCnt	= arrRs(5,i)	' ��û�ڼ�
					%>
					<tr>
						<td><%=lcture_rownum%></td>
						<td><a href="./lcture_reg.asp?lcture_no=<%=lcture_no%>"><%=lcture_tit%></a></td>
						<td><%=lcture_day%></td>
						<td>��û�� : <%=lcture_applyCnt%></td>
					</tr>
					<%
							Next
						Else
					%>
					<tr>
						<td colspan="4" class="non_data">
							��ϵ� Ư���� �����ϴ�.
						</td>
					</tr>
					<% End If %>
				</tbody>
			</table>
			<div class="btn_area right">
				<a href="./lcture_reg.asp" class="btn blue">Ư�� ��� ���</a>
			</div><!--btn_area -->

			<% Call putPage(page, stropt, pageCount) %>
			
		</div><!-- list_area -->
	</div><!-- //content -->
</div>
<!-- //���� -->

<!-- �ϴ� -->
<!--#include virtual = "/include/footer/footer.asp"-->
<!-- �ϴ� -->
</body>	
</html>