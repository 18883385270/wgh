//jquery特效开始
$(document).ready(function(){

//下拉菜单
$("#navigate li").hover(function(){
	$(this).find('ul').show();
},function(){
	$(this).find('ul').hide();
});

$(".navbar-toggle").click(function(){		
		$(".collapse").slideToggle();		
	});

//手机版菜单
$('.mobile_nav a').click(function(){     
if( $(this).next().is('ul') ){
if( $(this).next('ul').css('display') == 'none' ){
$(this).next('ul').slideDown();
$(this).find('i').attr("class","touch-arrow-up");     
}else{
$(this).next('ul').slideUp();
$(this).next('ul').find('ul').slideUp();
$(this).find('i').attr("class","touch-arrow-down");
}   
}
});
						
});
//jquery 结束


//视频
function showVideo(v_url,v_img,v_mobile,v_id){
	$(".video_list a").removeClass("current");
	$("#"+v_id).addClass("current");
	v_width=$("#Player").width();
	v_height=v_width*3/4;
	
	var flashvars={
		f:v_url,
		c:0,
		b:1,
		i:v_img
		};
	var params={bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always',wmode:'transparent'};
	CKobject.embedSWF('ckplayer/ckplayer.swf','Player','ckplayer_Player','100%',v_height,flashvars,params);
	
	var video=[v_mobile+'->video/mp4'];
	var support=['iPad','iPhone','ios','android+false','msie10+false'];
	CKobject.embedHTML5('Player','ckplayer_Player','100%',v_height,video,flashvars,support);
	
//	var so = new SWFObject("images/player.swf","ply","100%",v_height,"9","#000000");
//	so.addParam("allowfullscreen","true");
//	so.addParam("allowscriptaccess","always");
//	so.addParam("wmode","opaque");
//	so.addParam("quality","high");
//	so.addParam("salign","lt");
//	so.addParam("align","absmiddle");
//	so.addVariable("file",v_url);
//	so.addVariable("img",v_img);
//	so.addVariable("autoplay",v_play);
//	so.write("Player");
}

//获取浏览量
function showNum(cid,ctype,cshow,showid){
	$.get('/config/count.asp',{id:cid,stype:ctype,show:cshow},function(data){
		$(showid).html(data);
	});
}


//搜索
function chkseach(sn){
if(sn.skw.value==""){
alert("请输入搜索关键词！"); 
sn.skw.focus(); 
return false;
}
if(sn.skw.value=="请输入搜索关键词"){
alert("请输入搜索关键词！"); 
sn.skw.focus(); 
return false;
}
return true;
}
function clearsearch(sn){
if(sn.value=="请输入搜索关键词")
sn.value="";
}
function redosearch(sn){
if(sn.value=="")
sn.value="请输入搜索关键词";
}
//end

//邮箱格式
function is_email(str)
{ if((str.indexOf("@")==-1)||(str.indexOf(".")==-1))
{
return false;
}
return true;
}

//feedback
function Checkfeedback(form1){
if(form1.name.value==""){
alert("请输入你的姓名！");
form1.name.focus();
return false;
}
if(form1.email.value==""){
alert("请输入你的邮箱！");
form1.email.focus();
return false;
}
if(!is_email(form1.email.value))
{ alert("邮箱格式错误！");
form1.email.focus();
return false;
}

if(form1.tel.value==""){
alert("请输入你的电话！");
form1.tel.focus();
return false;
}
if(form1.CompanyName.value==""){
alert("请输入你的公司！");
form1.CompanyName.focus();
return false;
}
if(form1.address.value==""){
alert("请输入你的地址！");
form1.address.focus();
return false;
}
if(form1.title.value==""){
alert("请输入你的标题");
form1.title.focus();
return false;
}
if(form1.content.value==''){
alert("请输入你的内容！");
form1.content.focus();
return false;
}
if(form1.validatecode.value==""){
alert("请输入你的验证码！");
form1.validatecode.focus();
return false;
}
return true;
}
//end

//切换
function nTabs(thisObj,Num){
if(thisObj.className == "active")return;
var tabObj = thisObj.parentNode.id;
var tabList = document.getElementById(tabObj).getElementsByTagName("li");
for(i=0; i <tabList.length; i++){
  if (i==Num){
   thisObj.className = "active"; 
      document.getElementById(tabObj+"_Content"+i).style.display = "block";
  }else{
   tabList[i].className = "normal"; 
   document.getElementById(tabObj+"_Content"+i).style.display = "none";
  }
} 
}

//加入收藏 
function AddFavorite() {
sURL = encodeURI(window.location);
try{  
window.external.addFavorite(window.location,document.title);  
}catch(e) {  
try{  
window.sidebar.addPanel(document.title,window.location,"");  
}catch (e) {  
alert("加入收藏失败，请使用Ctrl+D进行添加,或手动在浏览器里进行设置.");
}  
}
}

//设为首页
function SetHome(){
if (document.all) {
document.body.style.behavior='url(#default#homepage)';
document.body.setHomePage(window.location);
}else{
alert("您好,您的浏览器不支持自动设置页面为首页功能,请您手动在浏览器里设置该页面为首页!");
}
}

jQuery(document).ready(function($){
	var $lateral_menu_trigger = $('#cd-menu-trigger'),
		$content_wrapper = $('.cd-main-content'),
		$navigation = $('header');

	//open-close lateral menu clicking on the menu icon
	$lateral_menu_trigger.on('click', function(event){
		event.preventDefault();
		
		$lateral_menu_trigger.toggleClass('is-clicked');
		$navigation.toggleClass('lateral-menu-is-open');
		$content_wrapper.toggleClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			// firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
			$('body').toggleClass('overflow-hidden');
		});
		$('#cd-lateral-nav').toggleClass('lateral-menu-is-open');
		
		//check if transitions are not supported - i.e. in IE9
		if($('html').hasClass('no-csstransitions')) {
			$('body').toggleClass('overflow-hidden');
		}
	});

	//close lateral menu clicking outside the menu itself
	$content_wrapper.on('click', function(event){
		if( !$(event.target).is('#cd-menu-trigger, #cd-menu-trigger span') ) {
			$lateral_menu_trigger.removeClass('is-clicked');
			$navigation.removeClass('lateral-menu-is-open');
			$content_wrapper.removeClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('body').removeClass('overflow-hidden');
			});
			$('#cd-lateral-nav').removeClass('lateral-menu-is-open');
			//check if transitions are not supported
			if($('html').hasClass('no-csstransitions')) {
				$('body').removeClass('overflow-hidden');
			}

		}
	});

	//open (or close) submenu items in the lateral menu. Close all the other open submenu items.
	$('.item-has-children').children('a').on('click', function(event){
		event.preventDefault();
		$(this).toggleClass('submenu-open').next('.sub-menu').slideToggle(200).end().parent('.item-has-children').siblings('.item-has-children').children('a').removeClass('submenu-open').next('.sub-menu').slideUp(200);
	});
	
	
	$("#cd-menu-trigger").click(function(){
		if($(this).hasClass("is-clicked")){
			$("#toolbar2").addClass("toolbar2_left");
			$("#toolbar2").removeClass("toolbar2_right");
		}else{
			$("#toolbar2").removeClass("toolbar2_left");
			$("#toolbar2").addClass("toolbar2_right");
		}
	});
});