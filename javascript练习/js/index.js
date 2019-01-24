(function ($) {
	$.fn.weekCalendar = function (options, param) {
 
		if (typeof options == 'string') {
			return $.fn.weekCalendar.methods[options](this, param);
		}
		//将调用时候传过来的参数和default参数合并
		options = $.extend({}, $.fn.weekCalendar.defaults, options || {});
 
		var $ele = $(this);
 
		var d = new Date();
		var year = d.getFullYear();
		var month = d.getMonth();
		var date = d.getDate();
		var day = d.getDay();
		var arr = new Array();
		var html = '<div class="week-container">'+
						'<div class="week_head"></div>'+
						'<div class="time">'+
					    '<div class="button_prev">&lt;</div>'+
					    '<div class="button_next">&gt;</div>'+
					    '<div class="time_header">'+
					       '<h3>周一</h3><h3>周二</h3><h3>周三</h3><h3>周四</h3><h3>周五</h3><h3>周六</h3><h3>周日</h3>'+
					    '</div>'+
					    '<div class="time_con"></div>'+
					   '</div>'+
		            '</div>';
  
		$ele.append(html);
		showWeek();
 
		function week(dd){
			var li = '<div class="slider_li"></div>';
			//var firstTime = new Date(dd.getTime() - (dd.getDay() || 7)*1000 * 60 * 60 * 24);
			var firstTime = new Date(dd.getTime() - (dd.getDay()-1)*1000 * 60 * 60 * 24);
			//console.log(firstTime);
			var lili = new Array();
			for(i = 0; i<7;i++){
				arr[i]= new Date(firstTime.getTime() + 1000 * 60 * 60 * 24*i);
				arr[i].nian = arr[i].getFullYear();
				arr[i].yue = arr[i].getMonth();
				arr[i].ri = arr[i].getDate();
 
				if(new Date(arr[i].nian,arr[i].yue,arr[i].ri).getTime() == new Date(year,month,date).getTime()){
					lili[i] = '<div class="time_td current_date"><span>' + "今天" + '</span></div>';
					if(options.data){
						for (var j =  0; j < options.data.length; j++) {
							if(new Date(arr[i].nian,arr[i].yue,arr[i].ri).getTime() == new Date(options.data[j].date).getTime()){
								lili[i] = '<div class="time_td current_date">' + arr[i].ri + '</div>';
							}
						}
					}
				}else{
					lili[i] = '<div class="time_td"><span>' + arr[i].ri + '</span></div>';
					if(options.data){
						for (var j =  0; j < options.data.length; j++) {
							if(new Date(arr[i].nian,arr[i].yue,arr[i].ri).getTime() == new Date(options.data[j].date).getTime()){
								lili[i] = '<div class="time_td"><span>' + arr[i].ri + '</span></div>';
							}
						}
					}
				}
 
			}
			
			
			
			
			//console.log( $(li))
			return $(li).append(lili);
		}
 
		function showYM(ym){
			//var firstTime = new Date(ym.getTime() - (ym.getDay() || 7)*1000 * 60 * 60 * 24);
			var firstTime = new Date(ym.getTime() - (ym.getDay()-1)*1000 * 60 * 60 * 24);
			var firstYear = firstTime.getFullYear();
			var firstMonth = firstTime.getMonth();
			$ele.find(".week_head").html("<span>"+firstYear+"年"+parseInt(firstMonth+1)+"月</span>");
			//console.log(firstTime);
		}
 
		function showWeek(){
			var now_d = new Date();
			var prev_d = new Date(new Date().getTime() - 7*1000 * 60 * 60 * 24);
			var next_d = new Date(new Date().getTime() + 7*1000 * 60 * 60 * 24);
 
			$ele.find(".time_con").append(week(prev_d));
			$ele.find(".time_con").append(week(now_d));
			$ele.find(".time_con").append(week(next_d));
 
			showYM(now_d);
 
			styleTime();
			selectDate();
		}
 
		var count = 0;
		function weekPrev(){
			count --;
			var now_d = new Date(new Date().getTime() + 7*1000 * 60 * 60 * 24*(count));
			var prev_d = new Date(new Date().getTime() + 7*1000 * 60 * 60 * 24*(count-1));
			$ele.find(".time_con").animate({
				marginLeft: 0
			}, 200, 'swing', function() {
				$ele.find(".time_con").children(':last').remove();
				$ele.find(".time_con").prepend(week(prev_d)).css('margin-left', '-100%');
 
				showYM(now_d);
 
				styleTime();
				selectDate();
			});
 
			return options.weekPrev();
		}
 
 
		function weekNext(){
			count ++;
			var now_d = new Date(new Date().getTime() + 7*1000 * 60 * 60 * 24*(count));
			var next_d = new Date(new Date().getTime() + 7*1000 * 60 * 60 * 24*(count+1));
			$ele.find(".time_con").animate({
				marginLeft: '-200%'
			}, 200, 'swing', function() {
				$ele.find(".time_con").children(':first').remove();
				$ele.find(".time_con").append(week(next_d)).css('margin-left', '-100%');
 
				showYM(now_d);
 
				styleTime();
				selectDate();
			});
 
			return options.weekNext();
		}
 
		var startX = endX =0;
		$ele.find(".time_con").on("touchstart", function (e) {
			//e.preventDefault();
			var finger = e.originalEvent.changedTouches[0];
			startX = finger.pageX;
		});
		$ele.find(".time_con").on("touchmove", function (e) {
			//e.preventDefault(); //阻止页面滑动
			var finger = e.originalEvent.changedTouches[0];
			endX = finger.pageX;
			dX = endX - startX;
			$ele.find(".time_con").css({"-webkit-transform":"translate3d("+dX+"px,0,0)"});
 
			//console.log(dX)
		});
		$ele.find(".time_con").on("touchend", function (e) {
			dX = endX - startX;
			$ele.find(".time_con").css({"-webkit-transform":"translate3d(0,0,0)","-webkit-transition":"0ms"});
 
			//判断是否滑动了，而不是屏幕上单击了
			if(startX!=Math.abs(dX)){
				//在滑动的距离超过屏幕宽度的20%时，做某种操作
				var clientWidth = document.documentElement.clientWidth;
				if(Math.abs(dX)>clientWidth*0.2){
					dX <0 ? weekNext():weekPrev();
				}
			}
			startX = endX =0;
		});
 
		$ele.find(".button_prev").click(function(){
			weekPrev();
		});
		$ele.find(".button_next").click(function(){
			weekNext();
		});
 
		function styleTime(){
			var widthTime = $ele.find(".time_td").width();
			$ele.find(".time_td").css({"height":widthTime,"line-height":widthTime+"px"});
		}
 
		function selectDate(){
			$ele.find(".time_td").unbind("click");
			$ele.find(".time_td").on("click", function (e) {
				$ele.find(".time_td").removeClass('selected');
				$(this).addClass('selected');
				var date = $ele.find(".week_head").text().replace(/年/,'-');
				date = date.replace(/月/,'');
				date = date+'-'+$(this).text();
				var value = '';
				if(options.data){
					for (var j =  0; j < options.data.length; j++) {
						if(new Date(date).getTime() == new Date(options.data[j].date).getTime()){
							value = options.data[j].value;
						}
					}
				}
 
				return options.selectDate(date,value);
			});
		}
	};
 
	$.fn.weekCalendar.defaults = {
		data:null,
		weekPrev: function () { },
		weekNext: function () { },
		selectDate: function (date,value) { }
	};
})(jQuery);
