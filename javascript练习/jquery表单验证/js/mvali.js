(function(my){
	my.extend({
		myvali:function(id){
			var myobj={
				myVali:".vali",							//input标签的父盒子class,默认vali

				Required:".Required",					//只验证不为空
				RequiredTps:["不能为空!!!"],			//只验证不为空提示

				Requireds:".Requireds",					//验证不为空自定义提示
				reqtps:".reqtps",						//验证不为空自定义提示,input父盒子的class
				ReqlengthTps:[""],						//验证不为空长度提示
				RequiredsTps:["不能为空"],				//验证不为空默认提示

				myNameMinLength:3,						//默认用户名最小长度	
				myNameMaxLength:8,						//默认用户名最大长度

				myPasswordMinLength:6,					//默认密码最小长度
				myPasswordMaxLength:16,					//默认密码最大长度
				isServer:false,							//是否要与数据库验证，默认false为否

				corrCol:["rgb(78, 117, 4)"],			//默认正确提示文字的颜色
				errCol:["red"],							//默认错误提示文字的颜色

				PwdStrong:false,						//密码强度验证，默认false不开启，true开启
				isStrongTps:["弱","中","强"],			//密码强度提示，可自定义

				isServerType:"post",					//用户名以什么方式提交
				isServerDType:"json",					//用户名以什么格式提交

				count:60,								//发送短信验证码倒计时，默认60s
				isPhoneCodeType:"post",					//短信验证以什么方式提交（按钮）
				isPhoneCodeDType:"json",				//短信验证以什么格式提交（按钮）

				phoneCodeInputType:"post",				//短信验证以什么方式提交（输入框）
				phoneCodeInputDType:"json",				//短信验证以什么格式提交（输入框）

				phoneIsServerType:"post",				//手机号以什么方式提交
				phoneIsServerDType:"json",				//手机号以什么格式提交

				phoneIsServerType1:"post",				//修改手机号以什么方式提交
				phoneIsServerDType1:"json",				//修改手机号以什么格式提交

				CodeIsServerType:"post",				//验证码以什么方式提交
				CodeIsServerDType:"json",				//验证码以什么格式提交

				myPhone:"",								//手机号
				myPhone1:"",							//修改手机号
				isMyCode:false,							//开启与手机同时验证发送短信功能，默认false不开启
				myNameNuber:"数字",						//验证数字提示的名字
			};
			var mclass=$.extend({},myobj,id);

			var myVali=$(mclass.myVali),					//input标签父盒子class
				myform=$(mclass.myform),					//表单id
				mybtn=$(mclass.mybtn);						//提交表单按钮

			//创建验证表单提示元素
			var p=$("<p style="+"font-size:12px;display:inline;vertical-align:top;"+"></p>");
			//将p元素插入到表单后代为myVali
			myform.find(myVali).append(p);
			
			var Required=$(mclass.Required),						//验证不为空
				RequiredTps=$(mclass.RequiredTps),					//验证不为空提示
			
				Requireds=$(mclass.Requireds),						//验证不为空，不同提示
				reqtps=$(mclass.reqtps),							//验证不为空，不同提示
				Reqlength=$(mclass.Reqlength),						//验证不为空长度
				ReqlengthTps=$(mclass.ReqlengthTps),				//验证不为空长度自定义提示
				RequiredsTps=$(mclass.RequiredsTps),				//验证不为空自定义提示

				myname1=$(mclass.myName),							//用户名
				myname2=$(mclass.myName2),							//昵称
				myphone=$(mclass.myPhone),							//手机号
				myphone1=$(mclass.myPhone1),						//修改手机号
				myCard=$(mclass.myCard),							//身份证
				isPhoneCode=$(Number(mclass.isPhoneCode)),			//开启手机短信验证
							
				phoneCodeBtn=$(mclass.phoneCodeBtn),				//发送手机号短信验证码（按钮）
				count=$(mclass.count),								//发送短信验证码倒计时，默认60s
				codeBtnCol1=$(mclass.codeBtnCol1),					//短信验证码倒计时（按钮，通过验证前）颜色
				codeBtnCol2=$(mclass.codeBtnCol2),					//短信验证码倒计时（按钮，通过验证后）颜色
				isPhoneCodeUrl=$(mclass.isPhoneCodeUrl),			//发送手机验证码与数据库验证的路径
				isPhoneCodeType=$(mclass.isPhoneCodeType),			//以什么方式提交
				isPhoneCodeDType=$(mclass.isPhoneCodeDType),		//以什么格式提交

				phoneCodeInput=$(mclass.phoneCodeInput),			//手机短信验证码（输入框）
				phoneCodeInputUrl=$(mclass.phoneCodeInputUrl),		//短信验证码与数据库验证的路径
				phoneCodeInputType=$(mclass.phoneCodeInputType),	//以什么方式提交
				phoneCodeInputDType=$(mclass.phoneCodeInputDType),	//以什么方式提交

				mymailbox=$(mclass.myMailbox),						//邮箱
				myNuber=$(mclass.myNuber),							//数字
				myNuberlength=$(mclass.myNuberlength),				//数字长度
				myNameNuber=$(mclass.myNameNuber),					//验证数字名字
				
				chinese=$(mclass.chinese),							//验证中文
				chinesetps=$(mclass.chinesetps),					//中文验证提示

				mailboxIsServer=$(Number(mclass.mailboxIsServer)),	//邮箱是否要与数据库验证，默认false为否
				mailboxIsServerUrl=$(mclass.mailboxIsServerUrl),	//邮箱与数据库验证的路径
				mailboxIsServerType=$(mclass.mailboxIsServerType),	//以什么方式提交
				mailboxIsServerDType=$(mclass.mailboxIsServerDType),//以什么格式提交

				mypassword=$(mclass.myPassword),					//密码
				mypasswords=$(mclass.myConfirmPassword),			//确认密码

				phoneIsServer=$(Number(mclass.phoneIsServer)),		//开启手机号与数据库验证
				phoneIsServerUrl=$(mclass.phoneIsServerUrl),		//手机号与数据库验证的路径
				phoneIsServerType=$(mclass.phoneIsServerType),		//以什么方式提交
				phoneIsServerDType=$(mclass.phoneIsServerDType),	//以什么格式提交

				phoneIsServer1=$(Number(mclass.phoneIsServer1)),	//开启手机号与数据库验证
				phoneIsServerUrl1=$(mclass.phoneIsServerUrl1),		//手机号与数据库验证的路径
				phoneIsServerType1=$(mclass.phoneIsServerType1),	//以什么方式提交
				phoneIsServerDType1=$(mclass.phoneIsServerDType1),	//以什么格式提交

				myCode=$(mclass.myCode),							//验证码
				CodeIsServerUrl=$(mclass.CodeIsServerUrl),			//验证码与数据库匹配的路径
				CodeIsServerType=$(mclass.CodeIsServerType),		//以什么方式提交
				CodeIsServerDType=$(mclass.CodeIsServerDType),		//以什么格式提交					

				PwdStrong=$(Number(mclass.PwdStrong)),				//验证密码强度，true开启，默认false不开启
				isStrongTps=$(mclass.isStrongTps),					//密码强度提示，可自定义

				NameMinLength=$(mclass.myNameMinLength),			//用户名最小长度
				NameMaxLength=$(mclass.myNameMaxLength),			//用户名最大长度

				NameMinLength2=$(mclass.myNameMinLength2),			//昵称最小长度
				NameMaxLength2=$(mclass.myNameMaxLength2),			//昵称最大长度

				PasswordMinLength=$(mclass.myPasswordMinLength),	//密码最小长度	
				PasswordMaxLength=$(mclass.myPasswordMaxLength),	//密码最大长度

				corrCol=$(mclass.corrCol),							//设置正确提示文字的颜色											
				errCol=$(mclass.errCol),							//设置错误提示文字的颜色		

				nameIsserver=$(Number(mclass.nameIsServer)),		//用户名是否要与数据库验证，默认false为否
				nameIsserverUrl=$(mclass.nameIsServerUrl),			//用户名与数据库验证的路径
				nameIsServerType=$(mclass.nameIsServerType),		//以什么方式提交
				nameIsServerDType=$(mclass.nameIsServerDType),		//以什么格式提交

				isMyCode=$(mclass.isMyCode),						//开启与手机同时验证发送短信功能，默认false不开启

				codeval=myform.find(phoneCodeBtn).val();			//获取短信验证码按钮初始value值
				// console.log(myNameNuber.selector)
				if(chinesetps.length!=0){
					var chitps=chinesetps[0].tps||"中文",						//中文提示
						chiminLength=chinesetps[0].minLength||0,				//中文最小长度
						chimaxLength=chinesetps[0].maxLength||Infinity;			//中文最大长度
				}

			//所有验证的方法
			var valiform={
				//短信验证按钮
				ismsgbtn:function(){
					var codeval1=myform.find(phoneCodeBtn).val();
					if(codeval1=="重新获取"||codeval1==codeval){
						myform.find(phoneCodeBtn).css("color",codeBtnCol2[0]).removeAttr("disabled");
					}else{
						myform.find(phoneCodeBtn).css("color",codeBtnCol1[0]).attr("disabled","disabled");
					}
				},
				//手机号验证 
				vphone:function(){
					var strphone=/^1[3|4|5|7|8][0-9]{9}$/;
					if($(this).val()==""){
						$(this).siblings("p").html("请输入手机号").removeAttr("class").css({"color":errCol[0]});
					}else if(!strphone.test($(this).val())){
						$(this).siblings("p").html("请输入11位正确的手机号").removeAttr("class").css({"color":errCol[0]});
						if(isPhoneCode[0]==1){
							if(isMyCode[0]==1){
								if(myCode.siblings("p").hasClass("correct")&&$(this).siblings("p").hasClass("correct")){
									valiform.ismsgbtn.apply(myphone);
								}else{
									myform.find(phoneCodeBtn).css("color",codeBtnCol1[0]).attr("disabled","disabled");
								}
							}else{
								if($(this).siblings("p").hasClass("correct")){
									valiform.ismsgbtn.apply(myphone);
								}else{
									myform.find(phoneCodeBtn).css("color",codeBtnCol1[0]).attr("disabled","disabled");
								}
							}
						}
					}else{
						// 手机号是否与数据库验证
						if(phoneIsServer[0]==1){
							//开启手机发送短信功能
							var $this=$(this),
								vl=$this.val();
							$.ajax({
								url:phoneIsServerUrl[0],
								type:phoneIsServerType.selector,
								dataType:phoneIsServerDType.selector,
								data:{phone:vl},
								success:function(data){
									if(data==1){
										$this.siblings("p").html("手机号可以注册").attr({"class":"correct"}).css({"color":corrCol[0]});
										if(isPhoneCode[0]==1){
											if(isMyCode[0]==1){
												if(myCode.siblings("p").hasClass("correct")){
													valiform.ismsgbtn.apply(myphone);
												}
											}else{
												if($this.siblings("p").hasClass("correct")){
													valiform.ismsgbtn.apply(myphone);
												}else{
													myform.find(phoneCodeBtn).css("color",codeBtnCol1[0]).attr("disabled","disabled");
												}
											}
										}
									}else{
										$this.siblings("p").html("手机号已被注册").removeAttr("class").css({"color":errCol[0]});
										if(isPhoneCode[0]==1){
											myform.find(phoneCodeBtn).css("color",codeBtnCol1[0]).attr("disabled","disabled");
										}
									}
								},
								error:function(error){
									console.log(error);
								}
							});
						}else{
							$(this).siblings("p").html("√").attr({"class":"correct"}).css({"color":corrCol[0]});
							if(isPhoneCode[0]==1){
								if(isMyCode[0]==1){
									if(myCode.siblings("p").hasClass("correct")){
										valiform.ismsgbtn.apply(myphone);
									}
								}else{
									if($(this).siblings("p").hasClass("correct")){
										valiform.ismsgbtn.apply(myphone);
									}else{
										myform.find(phoneCodeBtn).css("color",codeBtnCol1[0]).attr("disabled","disabled");
									}
								}
							}
						}
					}
				},
				//修改手机号验证
				vphone1:function(){
					var strphone=/^1[3|4|5|7|8][0-9]{9}$/;
					if($(this).val()==""){
						$(this).siblings("p").html("请输入手机号").removeAttr("class").css({"color":errCol[0]});
					}else if(!strphone.test($(this).val())){
						$(this).siblings("p").html("请输入11位正确的手机号").removeAttr("class").css({"color":errCol[0]});
						if(isPhoneCode[0]==1){
							if(isMyCode[0]==1){
								if(myCode.siblings("p").hasClass("correct")&&$(this).siblings("p").hasClass("correct")){
									valiform.ismsgbtn.apply(myphone);
								}else{
									myform.find(phoneCodeBtn).css("color",codeBtnCol1[0]).attr("disabled","disabled");
								}
							}else{
								if($(this).siblings("p").hasClass("correct")){
									valiform.ismsgbtn.apply(myphone);
								}else{
									myform.find(phoneCodeBtn).css("color",codeBtnCol1[0]).attr("disabled","disabled");
								}
							}
						}
					}else{
						if(phoneIsServer1[0]==1){
							var $this=$(this);
							var vl=$this.val();
							$.ajax({
								url:phoneIsServerUrl1[0],
								type:phoneIsServerType1.selector,
								dataType:phoneIsServerDType1.selector,
								data:{phone1:vl},
								success:function(data){
									if(data==1){
										$this.siblings("p").html("手机号可以使用").attr({"class":"correct"}).css({"color":corrCol[0]});
										if(isPhoneCode[0]==1){
											if(isMyCode[0]==1){
												if(myCode.siblings("p").hasClass("correct")){
													valiform.ismsgbtn.apply(myphone);
												}
											}else{
												if($this.siblings("p").hasClass("correct")){
													valiform.ismsgbtn.apply(myphone);
												}else{
													myform.find(phoneCodeBtn).css("color",codeBtnCol1[0]).attr("disabled","disabled");
												}
											}
										}
									}else{
										$this.siblings("p").html("手机号已被使用").removeAttr("class").css({"color":errCol[0]});
										if(isPhoneCode[0]==1){
											myform.find(phoneCodeBtn).css("color",codeBtnCol1[0]).attr("disabled","disabled");
										}
									}
								},
								error:function(xml,error){
									console.log(error);
								}
							});
						}else{
							$(this).siblings("p").html("√").attr({"class":"correct"}).css({"color":corrCol[0]});
						}
					}
				},
				//开启手机短信验证
				pCode:function(){
					myform.find(phoneCodeBtn).css("color",codeBtnCol1[0]).attr("disabled","disabled");
				},
				//点击发送短信验证码（按钮）
				msg:function(){
					var $this=$(this);
					var a=count[0];
					$this.val(a+"S");
					var ti;
					var b=true;
					if(b==true){
						b=false;
						clearTimeout(ti);
						ti=setInterval(yz,1000);
						myform.find(phoneCodeBtn).attr("disabled","true").css("color",codeBtnCol1[0]);
					}
					function yz(){
						a--;
						if(a<0){
							a=0;
							$this.val("重新获取");
							b=true;
							myform.find(phoneCodeBtn).removeAttr("disabled").css("color",codeBtnCol2[0]);
							clearTimeout(ti);
						}else{
							$this.val(a+"S");
						}
					}
					if(myphone.length==1){
						var vl=myphone.val();
					}else{
						var vl=myphone1.val();
					}
					$.ajax({
						url:isPhoneCodeUrl[0],
						type:isPhoneCodeType.selector,
						dataType:isPhoneCodeDType.selector,
						data:{phone:vl},
						success:function(data){},
						error:function(err){
							console.log(err);
						}
					})
				},
				//获取输入短信验证码（框）
				yzm:function(){
					var $this=$(this);
					if(isPhoneCode[0]==1){
						Tsval=$this.val().replace(/\s/g,'');
						if(Tsval==""){
							$this.siblings("p").removeAttr("class").css({"color":errCol[0]}).html("请输入验证码");
						}else{
							$this.siblings("p").attr({"class":"correct"}).html("");
							$.ajax({
								url:phoneCodeInputUrl[0],
								type:phoneCodeInputType.selector,
								dataType:phoneCodeInputDType.selector,
								data:{vcode:Tsval},
								success:function(data){
									if(data=="1"){
										$this.siblings("p").html("√").attr({"class":"correct"}).css({"color":corrCol[0]});
									}else if(data=="0"){
										$this.siblings("p").html("验证码错误").removeAttr("class").css({"color":errCol[0]});
									}else if(data=="-1"){
										$this.siblings("p").html("验证码已过期").removeAttr("class").css({"color":errCol[0]});
									}
								},
								error:function(err){
									console.log(err);
								}
							})
						}
					}else{
						myform.find(phoneCodeInput).siblings("p").html("√").attr({"class":"correct"}).css({"color":corrCol[0]});
					}
				},
				//用户名验证
				name1:function(){
					var Tsval=$(this).val();
					var Tsval=Tsval.replace(/\s/g,'');
					if(Tsval==""){
						$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html("请输入用户名");
					}else if(Tsval.length<NameMinLength[0]||Tsval.length>NameMaxLength[0]){
						$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html("请输入"+NameMinLength[0]+"至"+NameMaxLength[0]+"位字符的用户名");
					}else{
						if(nameIsserver[0]==1){
							var $this=$(this);
							var vl=Tsval;
							$.ajax({
								url:nameIsserverUrl[0],
								type:nameIsServerType.selector,
								dataType:nameIsServerDType.selector,
								data:{name:vl},
								success:function(data){
									if(data==1){
										$this.siblings("p").html("用户名可以注册").attr({"class":"correct"}).css({"color":corrCol[0]});
									}else{
										$this.siblings("p").html("用户名已被注册").removeAttr("class").css({"color":errCol[0]});
									}
								},
								error:function(xml,error){
									console.log(error);
								}
							});
						}else{
							$(this).siblings("p").html("√").attr({"class":"correct"}).css({"color":corrCol[0]});
						}
					}
				},
				//密码验证
				password:function(){
					var Num=/^[0-9]+$/;						//初级验证
					var Num1=/^[a-zA-Z]+$/;					//初级验证
					var Num2=/^[\_\.]+$/;					//初级验证
					
					var NumEl=/^[0-9a-zA-Z]+$/;				//中级验证
					var NumEl1=/^[0-9\_\.]+$/;				//中级验证
					var NumEl2=/^[a-zA-Z\_\.]+$/;			//中级验证

					var NumElg=/^[0-9a-zA-Z\_\.]+$/;		//高级验证

					var Tsval=$(this).val().replace(/\s/g,'');
					if(Tsval==""){
						$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html("请输入密码");
					}else if($(this).val().length<PasswordMinLength[0]||$(this).val().length>PasswordMaxLength[0]){
						$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html("请输入"+PasswordMinLength[0]+"至"+PasswordMaxLength[0]+"位字符的密码");
					}else{
						//开启密码强度验证
						if(PwdStrong[0]==1){
							if(Num.test($(this).val())||Num1.test($(this).val())||Num2.test($(this).val())){
								$(this).siblings("p").attr({"class":"correct"}).css({"color":corrCol[0]}).html(isStrongTps[0]);
							}else if(NumEl.test($(this).val())||NumEl1.test($(this).val())||NumEl2.test($(this).val())){
								$(this).siblings("p").attr({"class":"correct"}).css({"color":corrCol[0]}).html(isStrongTps[1]);
							}else if(NumElg.test($(this).val())){
								$(this).siblings("p").attr({"class":"correct"}).css({"color":corrCol[0]}).html(isStrongTps[2]);
							}else{
								$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html("请输入数字字母_.组成的密码");
							}
						}else{
							$(this).siblings("p").attr({"class":"correct"}).css({"color":corrCol[0]}).html("√");
						}
					}

					// 判断是否跟第二次密码一致
					if($(this).val()!=mypasswords.val()&&mypasswords.val()!=""){
						mypasswords.siblings("p").removeAttr("class").css({"color":errCol[0]}).html("两次输入的密码不一致");
					}else if(mypasswords.val()==""){
						mypasswords.siblings("p").html("");
					}else{
						mypasswords.siblings("p").attr({"class":"correct"}).css({"color":corrCol[0]}).html("√");
					}
				},
				//确认密码验证
				passwords:function(){
					var Tsval=$(this).val().replace(/\s/g,'');
					if(Tsval==""){
						$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html("请再次输入密码");
					}else if($(this).val()!=mypassword.val()){
						$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html("两次输入的密码不一致");
					}else{
						$(this).siblings("p").attr({"class":"correct"}).css({"color":corrCol[0]}).html("√");
					}
				},
				//身份证验证
				card:function(){
					var reg=/(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
					
					var Tsval=$(this).val().replace(/\s/g,'');
					var caseval=Tsval.toUpperCase();

					if(caseval==""){
						$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html("请输入身份证");
					}else if(reg.test(caseval)){
						$(this).siblings("p").attr({"class":"correct"}).css({"color":corrCol[0]}).html("√");
					}else{
						$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html("身份证号码错误");
					}
				},
				//数字验证
				nuber:function(){
					var Tsval=$(this).val().replace(/\s/g,'');
					if(Tsval==""){
						$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html("请输入"+myNameNuber.selector);
					}else if(!Number(Tsval)){
						$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html("请输入数字");
					}else{
						if(Tsval.length<myNuberlength[0]||Tsval.length>myNuberlength[1]){
							$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html("请输入"+myNuberlength[0]+"至"+myNuberlength[1]+"位长度的"+myNameNuber.selector);
						}else{
							$(this).siblings("p").attr({"class":"correct"}).css({"color":corrCol[0]}).html("√");
						}
					}
				},
				//中文验证
				chines:function(){
					var Tsval=$(this).val().replace(/\s/g,''),
						chi=/^[\u4E00-\u9FA5]+$/;
					if(Tsval==""){
						$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html("请输入"+chitps);
					}else if(!chi.test(Tsval)){
						$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html("请输入中文");
					}else{
						if(Tsval.length<chiminLength||Tsval.length>chimaxLength){
							$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html("请输入"+chiminLength+"至"+chimaxLength+"位长度的"+chitps);
						}else{
							$(this).siblings("p").attr({"class":"correct"}).css({"color":corrCol[0]}).html("√");
						}
					}
				},
				//验证不为空
				Reqd:function(){
					var Tsval=$(this).val().replace(/\s/g,'');
					if(Tsval==""){
						$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html(RequiredTps[0]);
						return false;
					}else if($(this).siblings("p").html()==""){
						$(this).siblings("p").html("√").attr({"class":"correct"}).css({"color":corrCol[0]});
					}else{
						$(this).siblings("p").html("√").attr({"class":"correct"}).css({"color":corrCol[0]});
					}
				},
				//验证不为空，自定义提示
				Reqds:function(){
					var Tsval=$(this).val().replace(/\s/g,'');
					if(Tsval==""){
						$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html(RequiredsTps[reqtps.index($(this).parent())]);
					}else if(Reqlength.length!=0){
						for(var i=0;i<Reqlength.length;i++){
							if(Reqlength[i]!=""){
								if(Tsval.length>=Reqlength[reqtps.index($(this).parent())][0]&&Tsval.length<=Reqlength[reqtps.index($(this).parent())][1]){
									$(this).siblings("p").html("√").attr({"class":"correct"}).css({"color":corrCol[0]});
								}else if(Tsval.length<Reqlength[reqtps.index($(this).parent())][0]||Tsval.length>Reqlength[reqtps.index($(this).parent())][1]){
									$(this).siblings("p").removeAttr("class").css({"color":errCol[0]})
									.html("请输入"+Reqlength[reqtps.index($(this).parent())][0]+"至"+Reqlength[reqtps.index($(this).parent())][1]+"位字符"+ReqlengthTps[reqtps.index($(this).parent())]);
								}
							}else{
								$(this).siblings("p").html("√").attr({"class":"correct"}).css({"color":corrCol[0]});
							}
						}
					}else{
						$(this).siblings("p").html("√").attr({"class":"correct"}).css({"color":corrCol[0]});
					}
				},
				//验证邮箱
				mailbox:function(){
					var strmailbox=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
					if($(this).val()==""){
						$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html("请输入邮箱号");
					}else if(!strmailbox.test($(this).val())){
						$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html("请输入正确的邮箱号");
					}else{
						if(mailboxIsServer[0]==1){
							var $this=$(this);
							var vl=$this.val();
							$.ajax({
								url:mailboxIsServerUrl[0],
								type:mailboxIsServerType.selector,
								dataType:mailboxIsServerDType.selector,
								data:{mailbox:vl},
								success:function(data){
									if(data==1){
										$this.siblings("p").html("邮箱可以注册").attr({"class":"correct"}).css({"color":corrCol[0]});
										myform.find(phoneCodeBtn).css("color",codeBtnCol2.selector).removeAttr("disabled");
									}else{
										$this.siblings("p").html("邮箱已被注册").removeAttr("class").css({"color":errCol[0]});
										myform.find(phoneCodeBtn).css("color",codeBtnCol1.selector).attr("disabled","disabled");
									}
								},
								error:function(error){
									console.log(error);
								}
							});
						}else{
							$(this).siblings("p").attr({"class":"correct"}).css({"color":corrCol[0]}).html("√");
						}
					}
				},
				//验证码验证
				codes:function(){
					var	$this=$(this),
						Tsval=$this.val().replace(/\s/g,"");
					if(Tsval==""){
						$(this).siblings("p").removeAttr("class").css({"color":errCol[0]}).html("请输入验证码");
						if(isPhoneCode[0]==1){
							if(isMyCode[0]==1){
								if(myCode.siblings("p").hasClass("correct")&&$(this).siblings("p").hasClass("correct")){
									valiform.ismsgbtn.apply(myphone);
								}else{
									myform.find(phoneCodeBtn).css("color",codeBtnCol1[0]).attr("disabled","disabled");
								}
							}
						}
					}else{
						if(isMyCode[0]==1){
							$.ajax({
								url:CodeIsServerUrl[0],
								type:CodeIsServerType.selector,
								dataType:CodeIsServerDType.selector,
								data:{codes:Tsval},
								success:function(data){
									if(data=="1"){
										$this.siblings("p").attr({"class":"correct"}).css({"color":corrCol[0]}).html("√");
										var codeval1=myform.find(phoneCodeBtn).val();
										if(myphone.siblings("p").hasClass("correct")){
											valiform.ismsgbtn.apply(myCode)
										}else{
											myform.find(phoneCodeBtn).css("color",codeBtnCol1[0]).attr("disabled","disabled");
										}
									}else{
										$this.siblings("p").removeAttr("class").css({"color":errCol[0]}).html("验证码错误");
										if(isPhoneCode[0]==1){
											myform.find(phoneCodeBtn).css("color",codeBtnCol1[0]).attr("disabled","disabled");
										}
									}
								},
								error:function(error){
									console.log(error)
								}
							});
						}else{
							$.ajax({
								url:CodeIsServerUrl[0],
								type:CodeIsServerType.selector,
								dataType:CodeIsServerDType.selector,
								data:{codes:Tsval},
								success:function(data){
									if(data=="1"){
										$this.siblings("p").attr({"class":"correct"}).css({"color":corrCol[0]}).html("√");
									}else{
										$this.siblings("p").removeAttr("class").css({"color":errCol[0]}).html("验证码错误");
									}
								},
								error:function(error){
									console.log(error);
								}
							});
						}
					}
				},
				//表单提交验证是否全部通过
				vform:function(){
					//验证必填有几个为空，提示几个
					if(myform.find(Required).length>=1){
						for(var i=0;i<myform.find(Required).length;i++){
							if(myform.find(Required).eq(i).val()==""){
								myform.find(Required).eq(i).siblings("p").removeAttr("class").css({"color":errCol[0]}).html(RequiredTps[0]);
							}else{
								myform.find(Required).eq(i).siblings("p").html("√").attr({"class":"correct"}).css({"color":corrCol[0]});
							}
						}
					}
					
					//验证必填自定义提示，有几个为空，提示几个
					if(myform.find(Requireds).length>=1){
						for(var j=0;j<myform.find(Requireds).length;j++){
							if(myform.find(Requireds).eq(j).val()==""){
								myform.find(Requireds).eq(j).siblings("p").removeAttr("class").css({"color":errCol[0]}).html(RequiredsTps[j]);
							}else{
								myform.find(Requireds).eq(j).siblings("p").html("√").attr({"class":"correct"}).css({"color":corrCol[0]});
							}
						}
					}
					
					//用户名不为空
					if(myname1.val()==""){
						myname1.siblings("p").removeAttr("class").css({"color":errCol[0]}).html("请输入用户名");
					}else if(myname1.siblings("p").html()==""){
						valiform.name1.apply(myname1);
					}

					//手机号不为空
					if(myphone.val()==""){
						myphone.siblings("p").removeAttr("class").css({"color":errCol[0]}).html("请输入手机号");
					}else if(myphone.siblings("p").html()==""){
						valiform.vphone.apply(myphone);
					}

					//修改手机号不为空
					if(myphone1.val()==""){
						myphone1.siblings("p").removeAttr("class").css({"color":errCol[0]}).html("请输入手机号");
					}else if(myphone1.siblings("p").html()==""){
						valiform.vphone.apply(myphone1);
					}

					//手机短信验证不为空
					if(isPhoneCode[0]==1){
						if(phoneCodeInput.val()==""){
							phoneCodeInput.siblings("p").removeAttr("class").css({"color":errCol[0]}).html("请输入验证码");
						}else if(phoneCodeInput.siblings("p").html()==""){
							valiform.yzm.apply(phoneCodeInput);
						}
					}
					
					//邮箱不为空
					if(mymailbox.val()==""){
						mymailbox.siblings("p").removeAttr("class").css({"color":errCol[0]}).html("请输入邮箱号");
					}else if(mymailbox.siblings("p").html()==""){
						valiform.mailbox.apply(mymailbox);
					}

					//身份证不为空
					if(myCard.val()==""){
						myCard.siblings("p").removeAttr("class").css({"color":errCol[0]}).html("请输入身份证");
					}else if(myCard.siblings("p").html()==""){
						valiform.card.apply(myCard);
					}

					// 数字验证
					if(myNuber.val()==""){
						myNuber.siblings("p").removeAttr("class").css({"color":errCol[0]}).html("请输入"+myNameNuber.selector);
					}else if(myNuber.siblings("p").html()==""){
						valiform.nuber.apply(myNuber);
					}
					// 中文验证
					if(chinese.val()==""){
						chinese.siblings("p").removeAttr("class").css({"color":errCol[0]}).html("请输入"+chitps);
					}else if(chinese.siblings("p").html()==""){
						valiform.chines.apply(chinese);
					}
					//密码不为空
					if(mypassword.val()==""){
						mypassword.siblings("p").removeAttr("class").css({"color":errCol[0]}).html("请输入密码");
					}else if(mypassword.siblings("p").html()==""){
						valiform.password.apply(mypassword);
					}

					//确认密码不为空
					if(mypasswords.val()==""){
						mypasswords.siblings("p").removeAttr("class").css({"color":errCol[0]}).html("请再次输入密码");
					}else if(mypasswords.siblings("p").html()==""){
						valiform.passwords.apply(mypasswords);
					}

					//验证码不为空
					if(myCode.val()==""){
						myCode.siblings("p").removeAttr("class").css({"color":errCol[0]}).html("请输入验证码");
					}else if(myCode.siblings("p").html()==""){
						valiform.codes.apply(myCode);
					}
				}
			};


			// 验证不为空
			Required.on("blur keyup",function(){
				valiform.Reqd.apply($(this));
			});

			// 验证不为空，自定义提示
			Requireds.on("blur keyup change",function(){
				valiform.Reqds.apply($(this));
			});

			// 用户名验证
			myname1.on("blur keyup",function(){
				valiform.name1.apply($(this));
			});

			// 修改手机号验证
			myphone1.on("blur keyup",function(){
				valiform.vphone1.apply($(this));
			});

			// 手机号验证
			myphone.on("blur keyup",function(){
				valiform.vphone.apply($(this));
			});

			// 发送短信(按钮)
			phoneCodeBtn.on("click",function(){
				valiform.msg.apply($(this));
			});

			//手机短信验证码(输入框)
			phoneCodeInput.on("blur keyup",function(){
				valiform.yzm.apply(phoneCodeInput);
			});

			// 手机短信验证开启,不开启就注销发送短信功能和手机短信验证码验证功能
			if(isPhoneCode[0]==1){
				myform.find(phoneCodeBtn).css("color",codeBtnCol1[0]).attr("disabled","true");
			}else{
				phoneCodeBtn.off("click");
				phoneCodeInput.off("blur keyup");
			};

			// 邮箱验证
			mymailbox.on("blur keyup",function(){
				valiform.mailbox.apply($(this));
			});

			// 身份证验证
			myCard.on("blur keyup",function(){
				valiform.card.apply($(this));
			});

			// 数字验证
			myNuber.on("blur keyup",function(){
				valiform.nuber.apply($(this));
			})
			//中文验证
			chinese.on("blur keyup",function(){
				valiform.chines.apply($(this));
			})
			// 密码验证
			mypassword.on("blur keyup",function(){
				valiform.password.apply($(this));
			});

			// 确认密码验证
			mypasswords.on("blur keyup",function(){
				valiform.passwords.apply($(this));
			});

			// 验证码
			myCode.on("blur keyup",function(){
				valiform.codes.apply($(this));
			});

			// 表单提交
			myform.on("click",mybtn,function(){
				myform.submit(function(){
					//调用vform方法验证是否全部验证通过
					valiform.vform.apply(myform);
					//验证通过一项cunt就+1;
					var cunt=0;
					for(var i=0;i<myform.find(myVali).length;i++){
						if(myform.find(myVali).eq(i).children("p").attr("class")=="correct"||myform.find(myVali).eq(i).children("p").html()==""){
							cunt++;
						}
					}
					// console.log(cunt)
					if(cunt!=myform.find(myVali).length){
						return false;
					}
				});
				myform.off("click");
			})
		}
	})
})($)