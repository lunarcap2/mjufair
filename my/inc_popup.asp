<div class="pop_up" id="pop1">
	<div class="pop">
		<div class="pop_wrap">
			<div class="pop_head">
				<h3>정보수정</h3>
			</div>
			<div class="pop_body">
				<div class="tb_area">
					<table class="tb">
						<colgroup>
							<col style="width:20%">
							<col>
						</colgroup>
						<tbody>
							<tr>
								<th>이름</th>
								<td>홍길동</td>
							</tr>
							<tr>
								<th><span class="pil">필수</span>휴대폰</th>
								<td>
									<div class="cn_box">
										<input type="text" class="txt" name="" style="width:300px" placeholder="010-4228-7877">
										<button type="button" class="btn blue">인증번호 전송</button>
										<div class="cn_input">
											<input type="text" class="txt number" name="" style="width:300px" placeholder="인증번호를 입력해 주세요">
											<em class="time">(03:00)</em>
											<span class="result">인증</span><span>인증 실패</span>
										</div>
									</div>
									
								</td>
							</tr>
							<tr>
								<th><span class="pil">필수</span>이메일</th>
								<td>
									<input type="text" class="txt" name="" style="width:300px;" placeholder="ditak@career.co.kr">
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="pop_footer">
				<div class="btn_area">
					<button type="button" class="btn blue">저장</button>
					<button type="button" class="btn gray close">취소</button>
				</div>
			</div>
			<a href="#none" class="pop_close">닫기</a>
		</div><!--.popWrap-->
	</div><!--.pop-->
	<span class="dim close"></span>
</div>

<form id="frm_pop_question" name="frm_pop_question" method="post" enctype="multipart/form-data">
<input type="hidden" id="pop_question_idx" name="pop_question_idx" value="">
<div class="pop_up" id="pop2">
	<div class="pop">
		<div class="pop_wrap">
			<div class="pop_head">
				<h3>사전질문 보기/수정</h3>
			</div>
			<div class="pop_body" id="pop_area_question_view">

			</div>
			<div class="pop_footer">
				<div class="btn_area">
					<button type="button" class="btn blue" onclick="fn_question_mod()">질문 수정하기</button>
				</div>
				<a href="#none" class="pop_close">닫기</a>
			</div>
		</div><!--.popWrap-->
	</div><!--.pop-->
	<span class="dim close"></span>
</div>
</form>


<div class="pop_up" id="pop3">
	<div class="pop">
		<div class="pop_wrap">
			<div class="pop_head">
				<h3>사전질문 등록하기</h3>
			</div>
			<div class="pop_body">
				<div class="tabs">
					<li><a href="#tab1">사전질문 등록하기</a></li>
					<li><a href="#tab2">사전질문 리스트</a></li>
				</div>
				<div id="tab1"class="tab_content">
					<div class="tb_area">
						<table class="tb tc">
							<colgroup>
								<col style="width:20%">
								<col style="width:30%">
								<col style="width:20%">
								<col>
							</colgroup>
							<tbody>
								<tr>
									<th>로고</th>
									<td>전략마케팅팀  <span>홍길동</span> 멘토</td>
									<th>멘토링 일시</th>
									<td>8월31일 / 14시</td>
								</tr>
								<tr>
									<td colspan="4" class="input_txt">
										<textarea>									</textarea>
									</td>
								</tr>
							</tbody>
						</table>
					</div><!--tb_area-->
				</div><!--tab_content -->
				<div id="tab2"class="tab_content">
					<div class="tb_area">
						<table class="tb tc">
							<colgroup>
								<col style="width:20%">
								<col style="width:30%">
								<col style="width:20%">
								<col>
							</colgroup>
							<tbody>
								<tr>
									<th>로고</th>
									<td>전략마케팅팀  <span>홍길동</span> 멘토</td>
									<th>멘토링 일시</th>
									<td>8월31일 / 14시</td>
								</tr>
							</tbody>
						</table>
						<table class="tb tc">
							<colgroup>
								<col style="width:80px">
								<col>
								<col style="width:80px">
								<col style="width:120px">
							</colgroup>
							<thead>
								<tr>
									<th>No</th>
									<th>내용</th>
									<th>첨부<br>파일</th>
									<th>작성일</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>10</td>
									<td class="subject">
										전략마케팅 직무에 필요한 전공능력 측면 역량이 무엇이 있을까요? 전략마케팅 직무에 필요한 전공능력 측면 역량이 무엇이 있을까요?
										전략마케팅 직무에 필요한 전공능력 측면 역량이 무엇이 있을까요?
										전략마케팅 직무에 필요한 전공능력 측면 역량이 무엇이 있을까요?
									<td>첨부파일</td>
									<td>2020-04-20</td>
								</tr>
								<tr>
									<td>9</td>
									<td class="subject">
										서류 지원 시 불이익이 있을까요? 서류 지원 시 불이익이 있을까요?
										서류 지원 시 불이익이 있을까요? 서류 지원 시 불이익이 있을까요?
									<td>첨부파일</td>
									<td>2020-04-15</td>
								</tr>
								<tr>
									<td>8</td>
									<td class="subject">
										면접을 준비하고 있는 중고신입 입니다. 서류 지원 시 불이익이 있을까요? 서류 지원 시 불이익이 있을까요? 서류 지원 시 불이익이 있을까요? 서류 지원 시 불이익이 있을까요?
									<td>첨부파일</td>
									<td>2020-04-12</td>
								</tr>
								<tr>
									<td>7</td>
									<td class="subject">
										외국어 면접이 따로 있나요? 서류 지원 시 불이익이 있을까요? 서류 지원 시 불이익이 있을까요?
										서류 지원 시 불이익이 있을까요? 서류 지원 시 불이익이 있을까요?
									<td>첨부파일</td>
									<td>2020-04-10</td>
								</tr>
							</tbody>
						</table>
						<div class="pagingArea">
							<a><span class="prev"></span></a>
							<strong>1</strong>
							<a href="javaScript:;">2</a>
							<a><span class="next"></span></a>
						</div>
					</div><!--tb_area-->
				</div><!--tab_content -->
				
			</div>
			<div class="pop_footer">
				
			</div>
			<a href="#none" class="pop_close">닫기</a>
		</div><!--.popWrap-->
	</div><!--.pop-->
	<span class="dim close"></span>
</div>

<div class="pop_up" id="pop4">
	<div class="pop_wrap">
		<div class="inner">
			4
		</div>
		<div class="pop_close">X</div>
	</div><!--.popWrap-->
	<span class="dim close"></span>
</div>