//jquery特效开始
$(document).ready(function(){

//花旗参的六大好处
$(".home_item_img img").hover(function(){
	var new_img=$(this).attr("data-new");
	if(new_img!=""){
		$(this).attr("src",new_img);
	}
},function(){
	var old_img=$(this).attr("data-old");
	if(old_img!=""){
		$(this).attr("src",old_img);	
	}
});



if( $(window).width() > 748)
	{ 
	   $("#flash").show();
	   $("#mobileflash").hide();
	   //全屏轮换
	   TouchSlide({ 
		  slideCell:"#slideBox",
		  titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
		  mainCell:".bd ul", 
		  effect:"leftLoop", 
		  interTime:5000,
		  autoPlay:true,//自动播放
		  autoPage:true //自动分页
	   });
	}
	else
	{
		$("#flash").hide();
		$("#mobileflash").show();
		//中部轮换
		TouchSlide({ 
			slideCell:"#adBox",
			titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
			mainCell:".bd ul", 
			effect:"leftLoop", 
			interTime:5000,
			autoPlay:true,//自动播放
			autoPage:true //自动分页
		});
	}


						
});
//jquery 结束

