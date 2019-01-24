;(function(name, definition) {
    var hasDefine = typeof define === 'function'
      , hasExports = typeof module !== 'undefined' && module.exports;
    if (hasDefine) {
        define(definition);
    } else if (hasExports) {
        module.exports = definition();
    } else {
        this[name] = definition();
    }
}
)('MeScroll', function() {
    function MeScroll(mescrollId, options) {
        this.scrollDom = document.getElementById(mescrollId);
        this.options = options || {};
        this.isDownScrolling = false;
        this.isUpScrolling = false;
        this.initDownScroll();
        this.initUpScroll();
        var me = this;
        setTimeout(function() {
            if (me.optDown.auto) {
                if (me.optDown.autoShowLoading) {
                    me.triggerDownScroll();
                } else {
                    me.optDown.callback && me.optDown.callback(me);
                }
            }
            me.optUp.auto && me.triggerUpScroll();
        }, 30);
    }
    MeScroll.prototype.extendDownScroll = function(optDown) {
        var isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        MeScroll.extend(optDown, {
            use: true,
            auto: true,
            autoShowLoading: false,
            isLock: false,
            isBoth: false,
            offset: 80,
            outOffsetRate: 0.2,
            minAngle: 45,
            mustToTop: !isIOS,
            hardwareClass: "mescroll-hardware",
            warpClass: "mescroll-downwarp",
            resetClass: "mescroll-downwarp-reset",
            htmlContent: '<p class="downwarp-progress"></p><p class="downwarp-tip">下拉刷新 </p>',
            inited: function(mescroll, downwarp) {
                mescroll.downTipDom = downwarp.getElementsByClassName("downwarp-tip")[0];
                mescroll.downProgressDom = downwarp.getElementsByClassName("downwarp-progress")[0];
            },
            inOffset: function(mescroll) {
                if (mescroll.downTipDom)
                    mescroll.downTipDom.innerHTML = "下拉刷新";
                if (mescroll.downProgressDom)
                    mescroll.downProgressDom.classList.remove("mescroll-rotate");
            },
            outOffset: function(mescroll) {
                if (mescroll.downTipDom)
                    mescroll.downTipDom.innerHTML = "释放更新";
            },
            onMoving: function(mescroll, rate, downHight) {
                if (mescroll.downProgressDom) {
                    var progress = 360 * rate;
                    mescroll.downProgressDom.style.webkitTransform = "rotate(" + progress + "deg)";
                    mescroll.downProgressDom.style.transform = "rotate(" + progress + "deg)";
                }
            },
            beforeLoading: function(mescroll, downwarp) {
                return false;
            },
            showLoading: function(mescroll) {
                if (mescroll.downTipDom)
                    mescroll.downTipDom.innerHTML = "加载中 ...";
                if (mescroll.downProgressDom)
                    mescroll.downProgressDom.classList.add("mescroll-rotate");
            },
            callback: function(mescroll) {
                mescroll.resetUpScroll();
            }
        })
    }
    MeScroll.prototype.extendUpScroll = function(optUp) {
        var isPC = typeof window.orientation == 'undefined';
        MeScroll.extend(optUp, {
            use: true,
            auto: false,
            isLock: false,
            isBoth: false,
            callback: null,
            page: {
                num: 0,
                size: 10,
                time: null
            },
            noMoreSize: 5,
            offset: 100,
            toTop: {
                src: null,
                offset: 1000,
                warpClass: "mescroll-totop",
                showClass: "mescroll-fade-in",
                hideClass: "mescroll-fade-out",
                duration: 300
            },
            loadFull: {
                use: false,
                delay: 500
            },
            empty: {
                warpId: null,
                icon: null,
                tip: "暂无相关数据~",
                btntext: "",
                btnClick: null
            },
            clearId: null,
            clearEmptyId: null,
            hardwareClass: "mescroll-hardware",
            warpClass: "mescroll-upwarp",
            htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>',
            htmlNodata: '<p class="upwarp-nodata">-------------我是有底线的-------------</p>',
            inited: function(mescroll, upwarp) {},
            showLoading: function(mescroll, upwarp) {
                upwarp.innerHTML = mescroll.optUp.htmlLoading;
            },
            showNoMore: function(mescroll, upwarp) {
                upwarp.innerHTML = mescroll.optUp.htmlNodata;
            },
            onScroll: null,
            scrollbar: {
                use: isPC,
                barClass: "mescroll-bar"
            }
        })
    }
    MeScroll.extend = function(userOption, defaultOption) {
        if (!userOption)
            return defaultOption;
        for (key in defaultOption) {
            if (userOption[key] == null) {
                userOption[key] = defaultOption[key];
            } else if (typeof userOption[key] == "object") {
                MeScroll.extend(userOption[key], defaultOption[key]);
            }
        }
        return userOption;
    }
    MeScroll.prototype.initDownScroll = function() {
        var me = this;
        me.optDown = me.options.down || {};
        if (me.optDown.use == false)
            return;
        me.extendDownScroll(me.optDown);
        me.downwarp = document.createElement("div");
        me.downwarp.className = me.optDown.warpClass;
        me.downwarp.innerHTML = '<div class="downwarp-content">' + me.optDown.htmlContent + '</div>';
        me.scrollDom.insertBefore(me.downwarp, me.scrollDom.firstChild);
        me.scrollDom.addEventListener("touchstart", touchstartEvent);
        me.scrollDom.addEventListener("mousedown", touchstartEvent);
        function touchstartEvent(e) {
            if (me.isScrollTo)
                e.preventDefault();
            me.startTop = me.scrollDom.scrollTop;
            if (me.optDown.mustToTop) {
                me.startY = e.touches ? e.touches[0].pageY : e.clientY;
            }
        }
        me.scrollDom.addEventListener("touchmove", touchmoveEvent);
        me.scrollDom.addEventListener("mousemove", touchmoveEvent);
        function touchmoveEvent(e) {
            if (me.startTop != null && me.scrollDom.scrollTop <= 0 && !me.isDownScrolling && (!me.isUpScrolling || (me.isUpScrolling && me.optUp.isBoth)) && !me.optDown.isLock) {
                if (me.optDown.mustToTop && me.startTop > 0)
                    return;
                var curX = e.touches ? e.touches[0].pageX : e.clientX;
                var curY = e.touches ? e.touches[0].pageY : e.clientY;
                if (!me.preX)
                    me.preX = curX;
                if (!me.preY)
                    me.preY = curY;
                var x = Math.abs(me.preX - curX);
                var y = Math.abs(me.preY - curY);
                var z = Math.sqrt(x * x + y * y);
                var diff = curY - me.preY;
                me.preX = curX;
                me.preY = curY;
                if (z != 0) {
                    var angle = Math.asin(y / z) / Math.PI * 180;
                    if (angle < me.optDown.minAngle)
                        return;
                }
                if (!me.startY && !me.optDown.mustToTop)
                    me.startY = curY;
                var moveY = curY - me.startY;
                if (moveY > 0) {
                    e.preventDefault();
                    if (!me.downHight)
                        me.downHight = 0;
                    if (me.downHight < me.optDown.offset) {
                        if (me.movetype != 1) {
                            me.movetype = 1;
                            me.optDown.inOffset(me);
                            me.downwarp.classList.remove(me.optDown.resetClass);
                            me.scrollDom.classList.add(me.optDown.hardwareClass);
                            me.scrollDom.style.webkitOverflowScrolling = "auto";
                            me.isMoveDown = true;
                        }
                        me.downHight += diff;
                    } else {
                        if (me.movetype != 2) {
                            me.movetype = 2;
                            me.optDown.outOffset(me);
                            me.downwarp.classList.remove(me.optDown.resetClass);
                            me.scrollDom.classList.add(me.optDown.hardwareClass);
                            me.scrollDom.style.webkitOverflowScrolling = "auto";
                            me.isMoveDown = true;
                        }
                        if (diff > 0) {
                            me.downHight += diff * me.optDown.outOffsetRate;
                        } else {
                            me.downHight += diff;
                        }
                    }
                    me.downwarp.style.height = me.downHight + "px";
                    var rate = me.downHight / me.optDown.offset;
                    me.optDown.onMoving(me, rate, me.downHight);
                }
            }
        }
        me.scrollDom.addEventListener("touchend", touchendEvent);
        me.scrollDom.addEventListener("mouseup", touchendEvent);
        me.scrollDom.addEventListener("mouseleave", touchendEvent);
        function touchendEvent(e) {
            if (me.isMoveDown) {
                if (me.downHight >= me.optDown.offset) {
                    me.triggerDownScroll();
                } else {
                    me.downwarp.classList.add(me.optDown.resetClass);
                    me.downHight = 0;
                    me.downwarp.style.height = 0;
                }
                me.scrollDom.style.webkitOverflowScrolling = "touch";
                me.scrollDom.classList.remove(me.optDown.hardwareClass);
                me.movetype = 0;
                me.isMoveDown = false;
            }
            me.startY = 0;
            me.preX = 0;
            me.preY = 0;
            me.startTop = null;
        }
        setTimeout(function() {
            me.optDown.inited(me, me.downwarp);
        }, 0)
    }
    MeScroll.prototype.triggerDownScroll = function() {
        if (!this.optDown.beforeLoading(this, this.downwarp)) {
            this.showDownScroll();
            this.optDown.callback && this.optDown.callback(this);
        }
    }
    MeScroll.prototype.showDownScroll = function() {
        this.isDownScrolling = true;
        this.optDown.showLoading(this);
        this.downHight = this.optDown.offset;
        this.downwarp.classList.add(this.optDown.resetClass);
        this.downwarp.style.height = this.optDown.offset + "px";
    }
    MeScroll.prototype.endDownScroll = function() {
        this.downHight = 0;
        this.downwarp.style.height = 0;
        this.isDownScrolling = false;
    }
    MeScroll.prototype.lockDownScroll = function(isLock) {
        if (isLock == null)
            isLock = true;
        this.optDown.isLock = isLock;
    }
    MeScroll.prototype.initUpScroll = function() {
        var me = this;
        me.optUp = me.options.up || {};
        if (me.optUp.use == false)
            return;
        me.extendUpScroll(me.optUp);
        if (me.optUp.scrollbar.use)
            me.scrollDom.classList.add(me.optUp.scrollbar.barClass);
        me.upwarp = document.createElement("div");
        me.upwarp.className = me.optUp.warpClass;
        me.scrollDom.appendChild(me.upwarp);
        me.scrollDom.addEventListener("scroll", function() {
            var scrollTop = me.scrollDom.scrollTop;
            if (!me.isUpScrolling && (!me.isDownScrolling || (me.isDownScrolling && me.optDown.isBoth))) {
                if (!me.optUp.isLock) {
                    var toBottom = me.scrollDom.scrollHeight - me.scrollDom.clientHeight - scrollTop;
                    if (toBottom <= me.optUp.offset) {
                        me.triggerUpScroll();
                    }
                }
                if (me.optUp.toTop.src) {
                    if (scrollTop >= me.optUp.toTop.offset) {
                        me.showTopBtn();
                    } else {
                        me.hideTopBtn();
                    }
                }
            }
            me.optUp.onScroll && me.optUp.onScroll(me, scrollTop);
        });
        setTimeout(function() {
            me.optUp.inited(me, me.upwarp);
        }, 0)
    }
    MeScroll.prototype.triggerUpScroll = function() {
        this.showUpScroll();
        this.optUp.page.num++;
        this.optUp.callback && this.optUp.callback(this.optUp.page, this);
    }
    MeScroll.prototype.showUpScroll = function() {
        this.isUpScrolling = true;
        this.upwarp.classList.add(this.optUp.hardwareClass);
        this.upwarp.style.visibility = "visible";
        this.optUp.showLoading(this, this.upwarp);
    }
    MeScroll.prototype.showNoMore = function() {
        this.upwarp.style.visibility = "visible";
        this.optUp.isLock = true;
        this.optUp.showNoMore(this, this.upwarp);
    }
    MeScroll.prototype.hideUpScroll = function() {
        this.upwarp.style.visibility = "hidden";
        this.upwarp.classList.remove(this.optUp.hardwareClass);
    }
    MeScroll.prototype.endUpScroll = function(isShowNoMore) {
        if (isShowNoMore != null) {
            if (isShowNoMore) {
                this.showNoMore();
            } else {
                this.hideUpScroll();
            }
        }
        this.isUpScrolling = false;
    }
    MeScroll.prototype.resetUpScroll = function(isShowLoading) {
        if (this.optUp && this.optUp.use) {
            var page = this.optUp.page;
            this.prePageNum = page.num;
            this.prePageTime = page.time;
            page.num = 1;
            page.time = null;
            if (!this.isDownScrolling && isShowLoading != false) {
                if (isShowLoading == null) {
                    this.removeEmpty();
                    this.clearDataList();
                    this.showUpScroll();
                } else {
                    this.showDownScroll();
                }
            }
            this.optUp.callback && this.optUp.callback(page, this);
        }
    }
    MeScroll.prototype.clearDataList = function() {
        var listId = this.optUp.clearId || this.optUp.clearEmptyId;
        if (listId) {
            var listDom = document.getElementById(listId);
            if (listDom)
                listDom.innerHTML = "";
        }
    }
    MeScroll.prototype.endSuccess = function(dataSize, systime) {
        if (this.isDownScrolling)
            this.endDownScroll();
        if (this.optUp.use) {
            var pageNum = this.optUp.page.num;
            var pageSize = this.optUp.page.size;
            if (pageNum == 1)
                this.clearDataList();
            var isShowNoMore;
            if (dataSize != null) {
                if (dataSize < pageSize) {
                    this.optUp.isLock = true;
                    if (dataSize == 0 && pageNum == 1) {
                        isShowNoMore = false;
                        this.showEmpty();
                    } else {
                        var allDataSize = (pageNum - 1) * pageSize + dataSize;
                        if (allDataSize < this.optUp.noMoreSize) {
                            isShowNoMore = false;
                        } else {
                            isShowNoMore = true;
                        }
                        this.removeEmpty();
                    }
                } else {
                    isShowNoMore = false;
                    this.optUp.isLock = false;
                    this.removeEmpty();
                }
            }
            if (pageNum == 1 && systime)
                this.optUp.page.time = systime;
            this.endUpScroll(isShowNoMore);
            this.loadFull();
        }
    }
    MeScroll.prototype.endErr = function() {
        if (this.isDownScrolling) {
            var page = this.optUp.page;
            if (page && this.prePageNum) {
                page.num = this.prePageNum;
                page.time = this.prePageTime;
            }
            this.endDownScroll();
        }
        if (this.isUpScrolling) {
            this.optUp.page.num--;
            this.endUpScroll(false);
        }
    }
    MeScroll.prototype.loadFull = function() {
        var me = this;
        if (me.optUp.loadFull.use && !me.optUp.isLock && me.scrollDom.scrollHeight <= me.scrollDom.clientHeight) {
            setTimeout(function() {
                if (me.scrollDom.scrollHeight <= me.scrollDom.clientHeight)
                    me.triggerUpScroll();
            }, me.optUp.loadFull.delay)
        }
    }
    MeScroll.prototype.lockUpScroll = function(isLock) {
        if (isLock == null)
            isLock = true;
        this.optUp.isLock = isLock;
    }
    MeScroll.prototype.showEmpty = function() {
        var me = this;
        var optEmpty = me.optUp.empty;
        var warpId = optEmpty.warpId || me.optUp.clearEmptyId;
        if (warpId == null)
            return;
        var emptyWarp = document.getElementById(warpId)
        if (emptyWarp) {
            me.removeEmpty();
            var str = '';
            if (optEmpty.icon)
                str += '<img class="empty-icon" src="' + optEmpty.icon + '"/>';
            if (optEmpty.tip)
                str += '<p class="empty-tip">' + optEmpty.tip + '</p>';
            if (optEmpty.btntext)
                str += '<p class="empty-btn">' + optEmpty.btntext + '</p>';
            me.emptyDom = document.createElement("div");
            me.emptyDom.className = 'mescroll-empty';
            me.emptyDom.innerHTML = str;
            emptyWarp.appendChild(me.emptyDom);
            if (optEmpty.btnClick) {
                var emptyBtn = me.emptyDom.getElementsByClassName("empty-btn")[0];
                emptyBtn.onclick = function() {
                    optEmpty.btnClick();
                }
            }
        }
    }
    MeScroll.prototype.removeEmpty = function() {
        if (this.emptyDom) {
            var parentDom = this.emptyDom.parentNode;
            if (parentDom)
                parentDom.removeChild(this.emptyDom);
            this.emptyDom = null;
        }
    }
    MeScroll.prototype.showTopBtn = function() {
        if (!this.topBtnShow) {
            this.topBtnShow = true;
            var me = this;
            var optTop = me.optUp.toTop;
            if (me.toTopBtn == null) {
                me.toTopBtn = document.createElement("img");
                me.toTopBtn.className = optTop.warpClass;
                me.toTopBtn.src = optTop.src;
                me.toTopBtn.onclick = function() {
                    me.scrollTo(0, me.optUp.toTop.duration);
                }
                document.body.appendChild(me.toTopBtn);
            }
            me.toTopBtn.classList.remove(optTop.hideClass);
            me.toTopBtn.classList.add(optTop.showClass);
        }
    }
    MeScroll.prototype.hideTopBtn = function() {
        if (this.topBtnShow && this.toTopBtn) {
            this.topBtnShow = false;
            this.toTopBtn.classList.remove(this.optUp.toTop.showClass);
            this.toTopBtn.classList.add(this.optUp.toTop.hideClass);
        }
    }
    MeScroll.prototype.scrollTo = function(y, t) {
        t = t || 300;
        var rate = 20;
        var count = t / rate;
        var me = this;
        var maxY = me.scrollDom.scrollHeight - me.scrollDom.clientHeight;
        if (y < 0)
            y = 0;
        if (y > maxY)
            y = maxY;
        var diff = me.scrollDom.scrollTop - y;
        if (diff == 0)
            return;
        var step = diff / count;
        me.isScrollTo = true;
        var i = 0;
        var scrollTimer = window.setInterval(function() {
            if (i < count) {
                if (i == count - 1) {
                    me.scrollDom.scrollTop = y;
                } else {
                    me.scrollDom.scrollTop -= step;
                }
                i++;
            } else {
                me.isScrollTo = false;
                window.clearInterval(scrollTimer);
            }
        }, rate);
    }
    return MeScroll
});
