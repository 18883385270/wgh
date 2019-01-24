(function(root, factory, plug) {
	root[plug] = factory(root.jQuery, plug);
})(window, function($, plug) {
	var __def__ = {
		start: "",
		end: null,
		level: "YMD",
		less: false
	};
	var __prop__ = {
		_init: function() {
			var start = $(this.start);
			var end = $(this.end);
			var level = this.level;
			var less = this.less;
			borainTimeChoiceEvent(start, end, level, less);
		}
	};
	$.fn[plug] = function(options) {
		$.extend(this, __def__, options, __prop__);
		this._init();
	};
	return function(options) {
		var dom = options.dom;
		$(dom)[plug].call($(dom), options);
	}
}, "borainTimeChoice");

function onLoadTimeChoiceDemo() {
	var demo = '<div class="borain-timeChoice-body">' +
		'<div class="borain-timeChoiceMask fl"></div>' +
		'<div class="borain-timeChoice">' +
		'<div class="choiceBox">' +
		'<div class="yearBox">' +
		'<a class="btn back" href="javascript:void(0);"><i class="fa fa-angle-left" aria-hidden="true"></i></a>' +
		'<div class="showBox">' +
		'<a class="year" href="javascript:void(0);"></a> - <a class="month" href="javascript:void(0);"></a>' +
		'</div><a class="btn forward" href="javascript:void(0);"><i class="fa fa-angle-right" aria-hidden="true"></i></a></div>' +
		'<div class="choiceDayBox beChoice">' +
		'<div class="week">' +
		'<span>日</span>' +
		'<span>一</span>' +
		'<span>二</span>' +
		'<span>三</span>' +
		'<span>四</span>' +
		'<span>五</span>' +
		'<span>六</span>' +
		'</div>' +
		'<div class="day">' +
		'<!--加载日期-->' +
		'</div>' +
		'</div>' +
		'<div class="choiceYearBox beChoice">' +
		'<div class="yearTitle clearFix">' +
		'<a class="btn up fl" href="javascript:void(0);"><i class="fa fa-angle-up" aria-hidden="true"></i></a>' +
		'<span class="fl"><em></em> - <em></em></span>' +
		'<a class="btn down fr" href="javascript:void(0);"><i class="fa fa-angle-down" aria-hidden="true"></i></a>' +
		'</div>' +
		'<div class="year">' +
		'<!--加载年-->' +
		'</div>' +
		'</div>' +
		'<div class="choiceMinBox beChoice">' +
		'<div class="month">' +
		'<!--<span><em>01</em>月</span>-->' +
		'</div>' +
		'</div>' +
		//'<div class="tipBox"></div>' +
		'<div class="operateBox clearFix">' +
		'<a class="cancel fl" href="javascript:void (0);">取消</a>' +
		'<a class="submit fr" href="javascript:void (0);">确定</a>' +
		'</div>' +
		'</div>' +
		'<div class="revealBox">' +
		'<div class="titleBox">当前选择时间</div>' +
		'<div class="nowBox clearFix">' +
		'<div class="nowDay fl">' +
		'<em></em>' +
		'<span>日</span>' +
		'</div>' +
		'<div class="nowMonth fr">' +
		'<em></em>' +
		'<span>月</span>' +
		'</div>' +
		'<div class="nowYear fr">' +
		'<em></em>' +
		'<span>年</span>' +
		'</div>' +
		'</div>' +
		'<div class="timeBox">' +
		'<div class="hourBox">' +
		'<a class="add" href="javascript:void (0);"><i class="fa fa-angle-up" aria-hidden="true"></i></a>' +
		'<span></span>' +
		'<a class="minus" href="javascript:void (0);"><i class="fa fa-angle-down" aria-hidden="true"></i></a>' +
		'</div>' +
		'<div class="punctuation">' +
		'<em></em>' +
		'<em></em>' +
		'</div>' +
		'<div class="minBox">' +
		'<a class="add" href="javascript:void (0);"><i class="fa fa-angle-up" aria-hidden="true"></i></a>' +
		'<span></span>' +
		'<a class="minus" href="javascript:void (0);"><i class="fa fa-angle-down" aria-hidden="true"></i></a>' +
		'</div>' +
		'</div>' +
		'<div class="operateBox clearFix">' +
		'<a class="cancel fl" href="javascript:void (0);">取消</a>' +
		'<a class="submit fr" href="javascript:void (0);">确定</a>' +
		'</div>' +
		'</div>' +
		'</div>' +
		'</div>';
	$("body").append(demo);
}

function borainTimeChoiceShow(obj) {
	var mask = $(".borain-timeChoiceMask");
	var box = $(".borain-timeChoice");
	var bodyWidth = $("body").width();
	var boxWidth = box.width();
	var objWidth = obj.width() + parseInt(obj.css("border-left")) + parseInt(obj.css("border-right")) + parseInt(obj.css("padding-left")) + parseInt(obj.css("padding-right"));
	var objHeight = obj.height() + parseInt(obj.css("border-top")) + parseInt(obj.css("border-bottom")) + parseInt(obj.css("padding-top")) + parseInt(obj.css("padding-bottom"));
	var objOffsetX = obj.offset().left;
	var objOffsetY = obj.offset().top;
	if(boxWidth < bodyWidth - objOffsetX) {
		box.css({
			top: objOffsetY + objHeight,
			left: objOffsetX
		});
	} else {
		box.css({
			top: objOffsetY + objHeight,
			left: objOffsetX + objWidth - boxWidth
		});
	}
	mask.fadeIn(100);
	box.fadeIn(100);
}

function borainTimeChoiceEvent(start, end, level, less) {
	//console.log(start, end, level, less);
	
	if(start == "" || start == null || start == "init {}") {
		//alert("请设置起始时间对象");
	} else {
		start.attr("readonly", "true").css("cursor", "pointer");
		if(end == "" || end == null) {
			start.unbind("click").click(function() {
				if(start.val() == "" || start.val() == null) {
					notEndNewTimeDateEvent(start, level, less);
				} else {
					notEndOldTimeDateEvent(start, level, less);
				}
				notEndTimeChoiceSubmit(start);
			});
		} else {
			end.attr("readonly", "true").css("cursor", "pointer");
			start.unbind("click").click(function() {
				hasEndStartTimeDateEvent(start, end, level, less);
			});
			end.unbind("click").click(function() {
				hasEndEndTimeDateEvent(start, end, level, less);
			});
		}
		borainTimeChoiceCancel(start, end);
	}
}

function notEndNewTimeDateEvent(obj, level, less) {
	var box = $(".borain-timeChoice");
	var tip = box.find(".choiceBox .tipBox");
	box.removeClass("YM YMD HM H");
	if(level == "" || level == "YMD") {
		box.addClass("YMD");
		tip.text("请选择至天");
	} else {
		if(level == "YM") {
			tip.text("请选择年月");
		} else if(level == "H") {
			tip.text("请选择到小时，分钟不可选");
		} else {
			tip.text("请选择到时分");
		}
		box.addClass(level);
	}
	var nowDate = new Date();
	var year, month, day, hour, minute;
	year = nowDate.getFullYear();
	month = nowDate.getMonth() + 1;
	if(level == "YM") {
		day = 1;
		hour = 0;
		minute = 0;
		onLoadChoiceYear(year, less);
	} else {
		if(level == "YMD") {
			day = nowDate.getDate();
			hour = 0;
			minute = 0;
		} else if(level == "H") {
			day = nowDate.getDate();
			hour = nowDate.getHours();
			minute = 0;
			setHour();
			setHours();
		} else if(level == "HM") {
			day = nowDate.getDate();
			hour = nowDate.getHours();
			minute = nowDate.getMinutes();
			setHour();
			setHours();
			setMinute();
		}
		getDaysInMonth(year, month, less);
	}
	timeChoiceValue(year, month, day, hour, minute);
	borainTimeChoiceShow(obj);
	openChoiceYearOrMonth(year, less);
}

function notEndOldTimeDateEvent(obj, level, less) {
	var box = $(".borain-timeChoice");
	var tip = box.find(".choiceBox .tipBox");
	box.removeClass("YM YMD HM H");
	if(level == "" || level == "YMD") {
		box.addClass("YMD");
		tip.text("请选择至天");
	} else {
		if(level == "YM") {
			tip.text("请选择年月");
		} else if(level == "H") {
			tip.text("请选择到小时，分钟不可选");
		} else {
			tip.text("请选择到时分");
		}
		box.addClass(level);
	}
	var hasVal = obj.val();
	var year, month, day, hour, minute;
	if(level == "YM") {
		hasVal = hasVal + "-1 0:0";
	} else if(level == "YMD") {
		hasVal = hasVal + " 0:0";
	}
	var oldDate = getDateVal(hasVal);
	year = oldDate.getFullYear();
	month = oldDate.getMonth() + 1;
	day = oldDate.getDate();
	hour = oldDate.getHours();
	minute = oldDate.getMinutes();
	openChoiceYearOrMonth(year, less);
	if(level == "YM") {
		onLoadChoiceYear(year, less);
	} else {
		getDaysInMonth(year, month, less);
		if(level == "H") {
			setHour();
			setHours();
		} else if(level == "HM") {
			setHour();
			setHours();
			setMinute();
		}
	}
	timeChoiceValue(year, month, day, hour, minute);
	borainTimeChoiceShow(obj);
}

function hasEndStartTimeDateEvent(start, end, level, less) {
	if(start.val() == "" || start.val() == null) {
		notEndNewTimeDateEvent(start, level, less);
	} else {
		notEndOldTimeDateEvent(start, level, less);
	}
	hasEndTimeChoiceSubmit(start, start, end, level, less);
}

function hasEndEndTimeDateEvent(start, end, level, less) {
	var box = $(".borain-timeChoice");
	var startDate, endDate;
	var year, month, day, hour, minute;
	var endVal;
	if(start.val() == "" || start.val() == null) {
		if(end.val() == "" || end.val() == null) {
			notEndNewTimeDateEvent(end, level, less);
		} else {
			notEndOldTimeDateEvent(end, level, less);
		}
	} else {
		startDate = start.val();
		if(level == "YM") {
			startDate = startDate + "-1 0:0";
		} else if(level == "YMD") {
			startDate = startDate + " 0:0";
		}
		startDate = getDateVal(startDate);
		if(end.val() == "" || end.val() == null) {
			year = startDate.getFullYear();
			month = startDate.getMonth() + 1;
			var lastDay = box.find(".choiceDayBox").find(".day span").not(".ban").length;
			if(level == "YM") {
				if(month < 12) {
					month = month + 1;
				} else {
					year = year + 1;
					month = 1;
				}
				endVal = year + "-" + month;
			} else if(level == "YMD") {
				day = startDate.getDate();
				if(day < lastDay) {
					day = day + 1;
				} else {
					if(month == 12) {
						year = year + 1;
						month = 1;
					} else {
						month = month + 1;
					}
					day = 1;
				}
				endVal = year + "-" + month + "-" + day;
			} else {
				day = startDate.getDate();
				if(day < lastDay) {
					day = day + 1;
				} else {
					if(month == 12) {
						year = year + 1;
						month = 1;
					} else {
						month = month + 1;
					}
					day = 1;
				}
				hour = startDate.getHours();
				if(hour < 10) {
					hour = "0" + hour
				}
				minute = startDate.getMinutes();
				if(minute < 10) {
					minute = "0" + minute
				}
				endVal = year + "-" + month + "-" + day + " " + hour + ":" + minute;
			}
			end.val(endVal);
			notEndOldTimeDateEvent(end, level, less);
		} else {
			endDate = end.val();
			if(level == "YM") {
				endDate = endDate + "-1 0:0";
			} else if(level == "YMD") {
				endDate = endDate + " 0:0";
			}
			endDate = getDateVal(endDate);
			if(endDate > startDate) {
				notEndOldTimeDateEvent(end, level, less);
			} else {
				end.val("");
				notEndNewTimeDateEvent(end, level, less);
			}
		}
	}
	hasEndTimeChoiceSubmit(end, start, end, level, less);
}

function onLoadChoiceYear(year,less){
    //year = year < 2000 ? year + 1900 : year;
    var yearBody = year.toString().substr(2,2);
    var yearHead = year.toString().substr(0,2);
//console.log(yearBody);
//console.log(yearHead);
    if(yearBody<=19){
        b = 0;
        c = 19;
    }else if(19<yearBody && yearBody<=39){
        b = 19;
        c = 39;
    }else if(39<yearBody && yearBody<=59){
        b=39;
        c=59;
    }else if(59<yearBody && yearBody<=79){
        b=59;
        c=79;
    }else if(79<yearBody && yearBody<=99){
        b=79;
        c=99;
    }
    choiceYearBoxAppend(year,b,c,yearHead,yearBody,less);
    onLoadChoiceMonth(less);
}

function onLoadChoiceMonth(less) {
	var box = $(".borain-timeChoice");
	var choiceMinBox = box.find(".choiceBox").find(".choiceMinBox").find(".month");
	var obj;
	var year = parseInt(box.find(".choiceBox .yearBox .showBox").find(".year").text());
	choiceMinBox.html("");
	var nowYear = new Date().getFullYear();
	var nowMonth = new Date().getMonth() + 1;
	var choiceMonth = parseInt(box.find(".choiceBox .yearBox .showBox").find(".month").text());
	var i = 1;
	if(less == true || less == "true") {
		if(year < nowYear) {
			for(; i <= 12; i++) {
				obj = "<span class='not'><em>" + i + "</em>月</span>";
				choiceMinBox.append(obj);
			}
		} else if(year == nowYear) {
			for(; i <= 12; i++) {
				if(i < nowMonth) {
					obj = "<span class='not'><em>" + i + "</em>月</span>";
				} else if(i == nowMonth) {
					obj = "<span class='now'><em>" + i + "</em>月</span>";
				} else {
					obj = "<span><em>" + i + "</em>月</span>";
				}
				choiceMinBox.append(obj);
			}
		} else {
			for(; i <= 12; i++) {
				obj = "<span><em>" + i + "</em>月</span>";
				choiceMinBox.append(obj);
			}
		}
		choiceMinBox.find("span").each(function() {
			if(parseInt($(this).find("em").text()) == choiceMonth) {
				$(this).addClass("active");
			}
		});
	} else {
		if(year == nowYear) {
			for(; i <= 12; i++) {
				if(i == nowMonth) {
					obj = "<span class='now'><em>" + i + "</em>月</span>";
				} else {
					obj = "<span><em>" + i + "</em>月</span>";
				}
				choiceMinBox.append(obj);
			}
		} else {
			for(; i <= 12; i++) {
				obj = "<span><em>" + i + "</em>月</span>";
				choiceMinBox.append(obj);
			}
		}
		choiceMinBox.find("span").each(function() {
			if(parseInt($(this).find("em").text()) == choiceMonth) {
				$(this).addClass("active");
			}
		});
	}
}

function choiceYearBoxAppend(year, b, c, yearHead, yearBody, less) {
	var box = $(".borain-timeChoice");
	var choiceYearBox = box.find(".choiceBox").find(".choiceYearBox").find(".year");
	var obj;
	var yearTitle = box.find(".choiceBox").find(".choiceYearBox").find(".yearTitle");
	var nowYear = new Date().getFullYear();
	choiceYearBox.html("");
	for(var a = b; a <= c; a++) {
		if(a == yearBody) {
			if(a < 10) {
				obj = "<span class='active'>" + yearHead +0+ a + "</span>"
				
			} else {
				obj = "<span class='active'>" + yearHead + a + "</span>"
			}
		} else {
			if(a < 10) {
				obj = "<span>" + yearHead + 0 + a + "</span>"
			} else {
				obj = "<span>" + yearHead + a + "</span>"
			}
		}
		choiceYearBox.append(obj);
	}
	var i = 0;
	choiceYearBox.find("span").each(function() {
		i++;
		if(parseInt($(this).text()) == nowYear) {
			$(this).addClass("now");
		}
	});
	yearTitle.find("span").html("<em>" + choiceYearBox.find("span").eq(0).text() + "</em>" + "-" + "<em>" + choiceYearBox.find("span").eq(19).text() + "</em>");
	choiceYearChange(less, year);
	choiceYearLess(less, year);
	choiceYearSpanClick(year, less);
	yearMonthClickChange(less);
}

function choiceYearLess(less, year) {
	var box = $(".borain-timeChoice");
	var choiceYearBox = box.find(".choiceBox").find(".choiceYearBox").find(".year");
	if(less == true || less == "true") {
		choiceYearBox.find("span").each(function() {
			if(parseInt($(this).text()) < new Date().getFullYear()) {
				$(this).addClass("not");
			}
		});
	}
}

function openChoiceYearOrMonth(year, less) {
	var box = $(".borain-timeChoice");
	var btn = box.find(".choiceBox .yearBox .showBox").find("a");
	var choiceBox;
	btn.unbind("click").click(function() {
		if($(this).is(".year")) {
			box.find(".yearBox .showBox").find(".year").addClass("active").siblings().removeClass("active");
			onLoadChoiceYear(parseInt($(this).text()), less);
			choiceYearSpanClick(year, less);
		} else if($(this).is(".month")) {
			box.find(".yearBox .showBox").find(".month").addClass("active").siblings().removeClass("active");
			choiceBox = box.find(".choiceMinBox");
			box.find(".beChoice").css("display", "none");
			choiceBox.css("display", "block");
			year = parseInt(box.find(".choiceBox .yearBox .showBox").find(".year").text());
			choiceMonthSpanClick(year, less);
		}
	});
}

function choiceYearSpanClick(year, less) {
	var box = $(".borain-timeChoice");
	box.find(".yearBox .showBox").find(".year").addClass("active").siblings().removeClass("active");
	var choiceBox = box.find(".choiceYearBox");
	box.find(".beChoice").css("display", "none");
	choiceBox.css("display", "block");
	choiceBox.find(".year").find("span").not(".not").unbind("click").click(function() {
		var year = $(this).text();
		$(this).siblings().removeClass("active");
		$(this).addClass("active");
		box.find(".yearBox .showBox").find(".year").text(year);
		choiceMonthSpanClick(year, less);
		box.find(".yearBox .showBox").find(".month").addClass("active").siblings().removeClass("active");
		choiceBox = box.find(".choiceMinBox");
		box.find(".beChoice").css("display", "none");
		choiceBox.css("display", "block");
	});
}

function choiceMonthSpanClick(year, less) {
	var box = $(".borain-timeChoice");
	var choiceBox = box.find(".choiceMinBox");
	onLoadChoiceMonth(less);
	choiceBox.find(".month").find("span").not(".not").unbind("click").click(function() {
		var month = parseInt($(this).find("em").text());
		box.find(".yearBox .showBox").find(".month").text(month);
		if(box.hasClass("YM")) {
			timeChoiceValue(year, month, 1, 0, 0);
		} else {
			getDaysInMonth(year, month, less);
			box.find(".choiceDayBox").css("display", "block").siblings(".beChoice").css("display", "none");
			box.find(".yearBox .showBox").find(".month").removeClass("active");
			var choiceDay = parseInt(box.find(".revealBox .nowBox .nowDay").find("em").text());
			var lastDay = box.find(".choiceBox .choiceDayBox .day").find("span").not(".ban").length;
			if(choiceDay > lastDay) {
				choiceDay = lastDay;
			}
			if(box.hasClass("YMD")) {
				timeChoiceValue(year, month, choiceDay, 0, 0);
			} else {
				timeChoiceValue(year, month, choiceDay);
			}
		}
	});
}

function choiceYearChange(less, year) {
	var box = $(".borain-timeChoice");
	var choiceBox = box.find(".choiceYearBox");
	var choiceYearBox = box.find(".choiceBox").find(".choiceYearBox").find(".year");
	var yearBox = choiceBox.find(".year");
	var upBtn = choiceBox.find(".yearTitle .up");
	var downBtn = choiceBox.find(".yearTitle .down");
	var yearTitle = box.find(".choiceBox").find(".choiceYearBox").find(".yearTitle");
	var activeYear;
	var obj;
	upBtn.unbind("click").click(function() {
		var firstYear = parseInt(yearBox.find("span").eq(0).text());
		activeYear = box.find(".choiceBox .yearBox").find(".showBox .year").text();
		yearBox.html("");
		for(var i = 0; i < 20; i++) {
			firstYear--;
			if(firstYear == activeYear) {
				obj = "<span class='active'>" + firstYear + "</span>";
				yearBox.prepend(obj);
			} else {
				obj = "<span>" + firstYear + "</span>";
				yearBox.prepend(obj);
			}
		}
		yearTitle.find("span").html("<em>" + choiceYearBox.find("span").eq(0).text() + "</em>" + "-" + "<em>" + choiceYearBox.find("span").eq(19).text() + "</em>");
		choiceYearLess(less, year);
		choiceYearSpanClick();
	});
	downBtn.unbind("click").click(function() {
		var lastYear = parseInt(yearBox.find("span").eq(19).text());
		activeYear = box.find(".choiceBox .yearBox").find(".showBox .year").text();
		yearBox.html("");
		for(var i = 0; i < 20; i++) {
			lastYear++;
			if(lastYear == activeYear) {
				obj = "<span class='active'>" + lastYear + "</span>";
				yearBox.append(obj);
			} else {
				var obj = "<span>" + lastYear + "</span>";
				yearBox.append(obj);
			}
		}
		yearTitle.find("span").html("<em>" + choiceYearBox.find("span").eq(0).text() + "</em>" + "-" + "<em>" + choiceYearBox.find("span").eq(19).text() + "</em>");
		choiceYearLess(less, year);
		choiceYearSpanClick();
	});
	return true;
}

function yearMonthClickChange(less) {
	var box = $(".borain-timeChoice");
	var month;
	box.find(".choiceBox .yearBox").find(".back").unbind("click").click(function() {
		backClick(less);
		var a = parseInt(box.find(".choiceBox .showBox").find(".month").text());
		box.find(".choiceMinBox .month").find("span").each(function() {
			if(parseInt($(this).find("em").text()) == a) {
				$(this).addClass("active").siblings().removeClass("active");
			}
		});
	});
	box.find(".choiceBox .yearBox").find(".forward").unbind("click").click(function() {
		forwardClick(less);
		var a = parseInt(box.find(".choiceBox .showBox").find(".month").text());
		box.find(".choiceMinBox .month").find("span").each(function() {
			if(parseInt($(this).find("em").text()) == a) {
				$(this).addClass("active").siblings().removeClass("active");
			}
		});
	});
}

function backClick(less) {
	var box = $(".borain-timeChoice");
	var yearBox = box.find(".choiceBox .showBox").find(".year");
	var monthBox = box.find(".choiceBox .showBox").find(".month");
	var choiceYear = parseInt(yearBox.text());
	var choiceMonth = parseInt(monthBox.text());
	var nowYear = new Date().getFullYear();
	var nowMonth = new Date().getMonth() + 1;
	var year, month, choiceDay, lastDay;
	if(less == true || less == "true") {
		if(choiceYear == nowYear) {
			if(choiceMonth > nowMonth) {
				if(choiceMonth > 1) {
					monthBox.text(choiceMonth - 1);
					year = parseInt(yearBox.text());
					month = parseInt(monthBox.text());
					if(box.hasClass("YM")) {
						timeChoiceValue(year, month, 1, 0, 0);
					} else {
						getDaysInMonth(year, month, less);
						choiceDay = parseInt(box.find(".revealBox .nowBox .nowDay").find("em").text());
						lastDay = box.find(".choiceBox .choiceDayBox .day").find("span").not(".ban").length;
						if(choiceDay > lastDay) {
							choiceDay = lastDay;
						}
						timeChoiceValue(year, month, choiceDay);
					}
				} else {
					monthBox.text(12);
					yearBox.text(parseInt(yearBox.text()) - 1);
					year = parseInt(yearBox.text());
					month = parseInt(monthBox.text());
					onLoadChoiceMonth(less);
					choiceMonthSpanClick(year, less);
					if(box.hasClass("YM")) {
						timeChoiceValue(year, month, 1, 0, 0);
					} else {
						getDaysInMonth(year, month, less);
						choiceDay = parseInt(box.find(".revealBox .nowBox .nowDay").find("em").text());
						lastDay = box.find(".choiceBox .choiceDayBox .day").find("span").not(".ban").length;
						if(choiceDay > lastDay) {
							choiceDay = lastDay;
						}
						timeChoiceValue(year, month, choiceDay);
					}
				}
			} else {
				box.find(".choiceBox .yearBox").find(".back").unbind();
			}
		} else if(choiceYear > nowYear) {
			if(choiceMonth > 1) {
				monthBox.text(choiceMonth - 1);
				year = parseInt(yearBox.text());
				month = parseInt(monthBox.text());
				if(box.hasClass("YM")) {
					timeChoiceValue(year, month, 1, 0, 0);
				} else {
					getDaysInMonth(year, month, less);
					choiceDay = parseInt(box.find(".revealBox .nowBox .nowDay").find("em").text());
					lastDay = box.find(".choiceBox .choiceDayBox .day").find("span").not(".ban").length;
					if(choiceDay > lastDay) {
						choiceDay = lastDay;
					}
					timeChoiceValue(year, month, choiceDay);
				}
			} else {
				monthBox.text(12);
				yearBox.text(parseInt(yearBox.text()) - 1);
				year = parseInt(yearBox.text());
				month = parseInt(monthBox.text());
				onLoadChoiceMonth(less);
				choiceMonthSpanClick(year, less);
				if(box.hasClass("YM")) {
					timeChoiceValue(year, month, 1, 0, 0);
				} else {
					getDaysInMonth(year, month, less);
					choiceDay = parseInt(box.find(".revealBox .nowBox .nowDay").find("em").text());
					lastDay = box.find(".choiceBox .choiceDayBox .day").find("span").not(".ban").length;
					if(choiceDay > lastDay) {
						choiceDay = lastDay;
					}
					timeChoiceValue(year, month, choiceDay);
				}
			}
		}
	} else {
		if(monthBox.text() > 1) {
			monthBox.text(parseInt(monthBox.text()) - 1);
			year = parseInt(yearBox.text());
			month = parseInt(monthBox.text());
			if(box.hasClass("YM")) {
				timeChoiceValue(year, month, 1, 0, 0);
			} else {
				getDaysInMonth(year, month, less);
				choiceDay = parseInt(box.find(".revealBox .nowBox .nowDay").find("em").text());
				lastDay = box.find(".choiceBox .choiceDayBox .day").find("span").not(".ban").length;
				if(choiceDay > lastDay) {
					choiceDay = lastDay;
				}
				timeChoiceValue(year, month, choiceDay);
			}
		} else {
			monthBox.text(12);
			yearBox.text(parseInt(yearBox.text()) - 1);
			year = parseInt(yearBox.text());
			month = parseInt(monthBox.text());
			onLoadChoiceMonth(less);
			choiceMonthSpanClick(year, less);
			if(box.hasClass("YM")) {
				timeChoiceValue(year, month, 1, 0, 0);
			} else {
				getDaysInMonth(year, month, less);
				choiceDay = parseInt(box.find(".revealBox .nowBox .nowDay").find("em").text());
				lastDay = box.find(".choiceBox .choiceDayBox .day").find("span").not(".ban").length;
				if(choiceDay > lastDay) {
					choiceDay = lastDay;
				}
				timeChoiceValue(year, month, choiceDay);
			}
		}
	}
}

function forwardClick(less) {
	var box = $(".borain-timeChoice");
	var yearBox = box.find(".choiceBox .showBox").find(".year");
	var monthBox = box.find(".choiceBox .showBox").find(".month");
	var year, month, choiceDay, lastDay;
	if(monthBox.text() < 12) {
		monthBox.text(parseInt(monthBox.text()) + 1);
		year = parseInt(yearBox.text());
		month = parseInt(monthBox.text());
		if(box.hasClass("YM")) {
			timeChoiceValue(year, month, 1, 0, 0);
		} else {
			getDaysInMonth(year, month, less);
			choiceDay = parseInt(box.find(".revealBox .nowBox .nowDay").find("em").text());
			lastDay = box.find(".choiceBox .choiceDayBox .day").find("span").not(".ban").length;
			if(choiceDay > lastDay) {
				choiceDay = lastDay;
			}
			timeChoiceValue(year, month, choiceDay);
		}
	} else {
		monthBox.text(01);
		yearBox.text(parseInt(yearBox.text()) + 01);
		year = parseInt(yearBox.text());
		month = parseInt(monthBox.text());
		onLoadChoiceMonth(less);
		choiceMonthSpanClick(year, less);
		if(box.hasClass("YM")) {
			timeChoiceValue(year, month, 1, 0, 0);
		} else {
			getDaysInMonth(year, month, less);
			choiceDay = parseInt(box.find(".revealBox .nowBox .nowDay").find("em").text());
			lastDay = box.find(".choiceBox .choiceDayBox .day").find("span").not(".ban").length;
			if(choiceDay > lastDay) {
				choiceDay = lastDay;
			}
			timeChoiceValue(year, month, choiceDay);
		}
	}
}

function getDateVal(strDate) {
	var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/, function(a) {
		return parseInt(a, 10) - 1;
	}).match(/\d+/g) + ')');
	return date;
}

function getDaysInMonth(year, month, less) {
	var box = $(".borain-timeChoice");
	box.find(".yearBox .showBox").find("a").removeClass("active");
	var choiceBox = box.find(".choiceDayBox");
	box.find(".beChoice").css("display", "none");
	choiceBox.css("display", "block");
	month = parseInt(month, 10);
	var date = new Date(year, month, 0);
	date.setDate(1);
	var weekday = new Array(7);
	weekday[0] = 0;
	weekday[1] = 1;
	weekday[2] = 2;
	weekday[3] = 3;
	weekday[4] = 4;
	weekday[5] = 5;
	weekday[6] = 6;
	var week = weekday[date.getDay()];
	date.setMonth(date.getMonth() + 1);
	var lastDate = new Date(date - 3600000 * 24);
	var lastDay = lastDate.getDate();
	getBeforeMonthLastDay(year, month - 1, week, lastDay, less);
	todayStyle(year, month, less);
}

function getBeforeMonthLastDay(year, month, week, lastDay, less) {
	month = parseInt(month, 10);
	var date = new Date(year, month, 0);
	date.setDate(1);
	date.setMonth(date.getMonth() + 1);
	var beforeLastDate = new Date(date - 3600000 * 24);
	var beforeLastDay = beforeLastDate.getDate();
	onLoadDayInBox(week, lastDay, beforeLastDay, less);
}

function onLoadDayInBox(week, lastDay, beforeLastDay, less) {
	var box = $(".borain-timeChoice");
	var obj;
	box.find(".choiceDayBox").find(".day").html("");
	onLoadBeforeDay(week);
	onLoadDay(lastDay);
	onLoadAfterDay(week, lastDay);
	thisMonthDayClick();
	yearMonthClickChange(less);

	function onLoadBeforeDay(week) {
		if(week == 0) {
			week = 7;
		}
		beforeLastDay = beforeLastDay - week + 1;
		for(var i = 0; i < week; i++) {
			var obj = "<span class='ban'>" + beforeLastDay + "</span>";
			box.find(".choiceDayBox").find(".day").append(obj);
			beforeLastDay++;
		}
	}

	function onLoadDay(lastDay) {
		for(var i = 1; i <= lastDay; i++) {
			obj = "<span>" + i + "</span>";
			box.find(".choiceDayBox").find(".day").append(obj);
		}
	}

	function onLoadAfterDay(week, lastDay) {
		if(week == 0) {
			week = 7;
		}
		var afterDay = 42 - week - lastDay;
		for(var i = 1; i <= afterDay; i++) {
			var obj = "<span class='ban'>" + i + "</span>";
			box.find(".choiceDayBox").find(".day").append(obj);
		}
	}
}

function todayStyle(year, month, less) {
	var box = $(".borain-timeChoice");
	var nowYear = new Date().getFullYear();
	var nowMonth = new Date().getMonth() + 1;
	var today = new Date().getDate();
	var choiceYear = parseInt(year);
	var choiceMonth = parseInt(month);
	if(choiceYear == nowYear && choiceMonth == nowMonth) {
		box.find(".choiceBox").find(".choiceDayBox").find(".day").find("span").not(".ban").each(function() {
			if(parseInt($(this).text()) == today) {
				$(this).addClass("now");
			}
		});
	}
	if(less == true || less == "true") {
		if(choiceYear == nowYear) {
			if(choiceMonth == nowMonth) {
				box.find(".choiceBox").find(".choiceDayBox").find(".day").find("span").not(".ban").each(function() {
					if(parseInt($(this).text()) < today) {
						$(this).addClass("not");
					}
				});
			} else if(choiceMonth < nowMonth) {
				box.find(".choiceBox").find(".choiceDayBox").find(".day").find("span").not(".ban").addClass("not");
			} else {
				box.find(".choiceBox").find(".choiceDayBox").find(".day").find("span").not(".ban").removeClass("not");
			}
		} else if(choiceYear < nowYear) {
			box.find(".choiceBox").find(".choiceDayBox").find(".day").find("span").not(".ban").addClass("not");
		} else {
			box.find(".choiceBox").find(".choiceDayBox").find(".day").find("span").not(".ban").removeClass("not");
		}
	}
}

function timeChoiceValue(year, month, day, hour, minute) {
	var box = $(".borain-timeChoice");
	box.find(".choiceBox .yearBox").find(".year").text(year);
	box.find(".choiceBox .yearBox").find(".month").text(month);
	box.find(".revealBox").find(".nowYear em").text(year);
	box.find(".revealBox").find(".nowMonth em").text(month);
	box.find(".revealBox").find(".nowDay em").text(day);
	box.find(".choiceBox").find(".choiceYearBox").find(".year").find("span").not(".ban").each(function() {
		if(parseInt($(this).text()) == year) {
			$(this).addClass("active").siblings().removeClass("active");
		}
	});
	box.find(".choiceBox").find(".choiceMinBox ").find(".month").find("span").not(".ban").each(function() {
		if(parseInt($(this).find("em").text()) == month) {
			$(this).addClass("active").siblings().removeClass("active");
		}
	});
	box.find(".choiceBox").find(".choiceDayBox").find(".day").find("span").not(".ban").each(function() {
		if(parseInt($(this).text()) == day) {
			$(this).addClass("active").siblings().removeClass("active");
		}
	});
	if(hour < 10) {
		hour = "0" + hour;
	}
	box.find(".revealBox").find(".hourBox span").text(hour);
	if(minute < 10) {
		minute = "0" + minute;
	}
	box.find(".revealBox").find(".minBox span").text(minute);
}

function thisMonthDayClick() {
	var box = $(".borain-timeChoice");
	var choiceBox = box.find(".choiceBox");
	var dayBtn = choiceBox.find(".choiceDayBox").find(".day").find("span");
	dayBtn.unbind("click").click(function() {
		if($(this).hasClass("ban")) {
			if(parseInt($(this).text()) > 15) {
				backClick();
			} else {
				forwardClick();
			}
		} else {
			if($(this).hasClass("not")) {} else {
				$(this).siblings().removeClass("active");
				$(this).addClass("active");
				var year = choiceBox.find(".yearBox .showBox").find(".year").text();
				var month = choiceBox.find(".yearBox .showBox").find(".month").text();
				var day = $(this).text();
				if(year<10){year = "0" + year;}
				if(month<10&&month.length==1){month = "0" + month;}
				if(day<10){day = "0" + day;}
				timeChoiceValue(year, month, day);
			}
		}
	});
}

function setHour() {
	var box = $(".borain-timeChoice");
	var hourAdd = box.find(".revealBox .timeBox").find(".hourBox .add");
	var hourMinus = box.find(".revealBox .timeBox").find(".hourBox .minus");
	hourAdd.unbind("click").click(function() {
		var hour = parseInt(box.find(".revealBox .timeBox").find(".hourBox span").text());
		if(hour < 23) {
			hour = hour + 1;
		} else {
			hour = 0;
		}
		if(hour < 10) {
			hour = "0" + hour;

		}
		box.find(".revealBox .timeBox").find(".hourBox span").text(hour);
	});
	hourMinus.unbind("click").click(function() {
		var hour = parseInt(box.find(".revealBox .timeBox").find(".hourBox span").text());
		if(hour > 0) {
			hour = hour - 1;
		} else {
			hour = 23;
		}
		if(hour < 10) {
			hour = "0" + hour;
		}
		box.find(".revealBox .timeBox").find(".hourBox span").text(hour);
	});
}







function setHours() {
	var box = $(".borain-timeChoice");
	var hourAdd = box.find(".revealBox .timeBox").find(".minBox .add");
	var hourMinus = box.find(".revealBox .timeBox").find(".minBox .minus");
	hourAdd.unbind("click").click(function() {
		var hour = parseInt(box.find(".revealBox .timeBox").find(".minBox span").text());
		if(hour < 59) {
			hour = hour + 1;
		} else {
			hour = 0;
		}
		if(hour < 10) {
			hour = "0" + hour;

		}
		box.find(".revealBox .timeBox").find(".minBox span").text(hour);
	});
	hourMinus.unbind("click").click(function() {
		var hour = parseInt(box.find(".revealBox .timeBox").find(".minBox span").text());
		if(hour > 0) {
			hour = hour - 1;
		} else {
			hour = 59;
		}
		if(hour < 10) {
			hour = "0" + hour;
		}
		box.find(".revealBox .timeBox").find(".minBox span").text(hour);
	});
}
























function setMinute() {
	var box = $(".borain-timeChoice");
	var minAdd = box.find(".revealBox .timeBox").find(".minBox .add");
	var minMinus = box.find(".revealBox .timeBox").find(".minBox .minus");
	minAdd.unbind("click").click(function() {
		var min = parseInt(box.find(".revealBox .timeBox").find(".minBox span").text());
		if(min < 59) {
			min = min + 1;
		} else {
			min = 0;
		}
		if(min < 10) {
			min = "0" + min;
		}
		box.find(".revealBox .timeBox").find(".minBox span").text(min);
	});
	minMinus.unbind("click").click(function() {
		var min = parseInt(box.find(".revealBox .timeBox").find(".minBox span").text());
		if(min > 0) {
			min = min - 1;
		} else {
			min = 59;
		}
		if(min < 10) {
			min = "0" + min;
		}
		box.find(".revealBox .timeBox").find(".minBox span").text(min);
	});
}

function notEndTimeChoiceSubmit(obj) {

	var mask = $(".borain-timeChoiceMask");
	var box = $(".borain-timeChoice");
	var submitBtn = box.find(".operateBox").find(".submit");
	var year, month, day, hour, minute, val;
	submitBtn.unbind("click").click(function() {
		year = box.find(".revealBox .nowBox").find(".nowYear em").text();
		month = box.find(".revealBox .nowBox").find(".nowMonth em").text();
		if(box.hasClass("YM")) {
			val = year + "-" + month;
			obj.val(val);
		} else if(box.hasClass("YMD")) {
			day = box.find(".revealBox .nowBox").find(".nowDay em").text();
			val = year + "-" + month + "-" + day;
			obj.val(val);
		} else {
			day = box.find(".revealBox .nowBox").find(".nowDay em").text();
			hour = box.find(".revealBox .timeBox").find(".hourBox span").text();
			minute = box.find(".revealBox .timeBox").find(".minBox span").text();
			val = year + "-" + month + "-" + day + " " + hour + ":" + minute;
			obj.val(val);
		}
		box.hide();
		mask.hide();
	});
}

function hasEndTimeChoiceSubmit(obj, start, end, level, less) {
	//console.log("双值触发了");
	var mask = $(".borain-timeChoiceMask");
	var box = $(".borain-timeChoice");
	var tip = box.find(".choiceBox .tipBox");
	var submitBtn = box.find(".operateBox").find(".submit");
	var year, month, day, hour, minute, val, choiceEndVal, choiceStartVal, startDate, endDate;
	submitBtn.unbind("click").click(function() {
		//alert(box.find(".revealBox .nowBox").find(".nowYear em").text()+"年")
		//alert(box.find(".revealBox .nowBox").find(".nowMonth em").text()+"月")
		//alert(box.find(".revealBox .timeBox").find(".hourBox span").text()+"小时")
	   // alert(box.find(".revealBox .timeBox").find(".minBox span").text()+"分")
	   
		if(obj.is(start)) {
			if(end.val() == null || end.val() == "") {
				sub();
				hasEndEndTimeDateEvent(start, end, level, less)
			} else {
				endDate = end.val();
				if(level == "YM") {
					endDate = endDate + "-1 00:00"
				} else if(level == "YMD") {
					endDate = endDate + " 00:00"
				}
				//console.log(endDate);
				endDate = getDateVal(endDate);
				year = box.find(".revealBox .nowBox").find(".nowYear em").text();
				month = box.find(".revealBox .nowBox").find(".nowMonth em").text();
				if(box.hasClass("YM")) {
					choiceStartVal = year + "-" + month + "-1 00:00";
					//alert(choiceEndVal)
				} else if(box.hasClass("YMD")) {
					day = box.find(".revealBox .nowBox").find(".nowDay em").text();
					choiceStartVal = year + "-" + month + "-" + day + " 00:00";
					//alert(choiceEndVal)
				} else {
					day = box.find(".revealBox .nowBox").find(".nowDay em").text();
					hour = box.find(".revealBox .timeBox").find(".hourBox span").text();
					minute = box.find(".revealBox .timeBox").find(".minBox span").text();
					choiceStartVal = year + "-" + month + "-" + day + " " + hour + ":" + minute;
					//alert(choiceEndVal)
				}
				//console.log(choiceStartVal);
				choiceStartVal = getDateVal(choiceStartVal);
				if(choiceStartVal < endDate) {
					sub();
				} else {
					sub();
					end.val("");
					hasEndEndTimeDateEvent(start, end, level, less);
				}
			}
		} else if(obj.is(end)) {
			if(start.val() == null || start.val() == "") {
				sub();
				hasEndStartTimeDateEvent(start, end, level, less);
			} else {
				startDate = start.val();
				if(level == "YM") {
					startDate = startDate + "-1 00:00"
				} else if(level == "YMD") {
					startDate = startDate + " 00:00"
				}
				startDate = getDateVal(startDate);
				year = box.find(".revealBox .nowBox").find(".nowYear em").text();
				month = box.find(".revealBox .nowBox").find(".nowMonth em").text();
				if(box.hasClass("YM")) {
					choiceEndVal = year + "-" + month + "-1 00:00";
				} else if(box.hasClass("YMD")) {
					day = box.find(".revealBox .nowBox").find(".nowDay em").text();
					choiceEndVal = year + "-" + month + "-" + day + " 00:00";
					//alert(choiceEndVal)
				} else {
					day = box.find(".revealBox .nowBox").find(".nowDay em").text();
					hour = box.find(".revealBox .timeBox").find(".hourBox span").text();
					minute = box.find(".revealBox .timeBox").find(".minBox span").text();
					choiceEndVal = year + "-" + month + "-" + day + " " + hour + ":" + minute;
					//alert(choiceEndVal)
				}
				choiceEndVal = getDateVal(choiceEndVal);
				if(startDate < choiceEndVal) {
					sub();
				} else {
					tip.text("结束时间必须大于开始时间！")
				}
			}
		} else {
			tip.text("数值处理出错，请关闭后重试！");
		}
	});

	function sub() {
		year = box.find(".revealBox .nowBox").find(".nowYear em").text();
		month = box.find(".revealBox .nowBox").find(".nowMonth em").text();
		if(box.hasClass("YM")) {
			val = year + "-" + month;
			obj.val(val);
		} else if(box.hasClass("YMD")) {
			day = box.find(".revealBox .nowBox").find(".nowDay em").text();
			if(day<10){
				val = year + "-" + month + "-" + "0" + day;
				obj.val(val);

			}else{
			   val = year + "-" + month + "-" + day;
			   
			   obj.val(val);
			}

			
		} else {
			day = box.find(".revealBox .nowBox").find(".nowDay em").text();
			hour = box.find(".revealBox .timeBox").find(".hourBox span").text();
			month=box.find(".revealBox .nowBox").find(".nowMonth em").text();
			if(month<10&&month.length==1){month = "0" + month;}
		    if(day<10&&day.length==1){day = "0" + day;}
			minute = box.find(".revealBox .timeBox").find(".minBox span").text();
			val = year + "-" + month + "-" + day + " " + hour + ":" + minute;
			obj.val(val);
			


		
		}
		box.hide();
		mask.hide();
	}
}

function borainTimeChoiceCancel(start, end) {
	var mask = $(".borain-timeChoiceMask");
	var box = $(".borain-timeChoice");
	var cancelBtn = box.find(".operateBox").find(".cancel");
	cancelBtn.unbind("click").click(function() {
		box.hide();
		mask.hide();
	});
}