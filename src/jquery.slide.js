;
(function($, window, document) {
	var Slide = function($el, opt) {
		this.defaults = {
			direction: 'return'
		};
		this.options = $.extend({}, this.defaults, opt || {});

		this.oBox = $el.get(0);
		this.oUl = this.oBox.getElementsByTagName('ul')[0];
		this.aImg = this.oUl.getElementsByTagName('img');
		this.iNow = 0;
		this.timer = null;
		this.autoTimer = null;
		this.bOrder = true;	

	};
	Slide.prototype = {
		init: function() {
			var oThis = this;
			this.createBtn();
			this.aBtn = this.oCount.getElementsByTagName('li');
			this.toggle();
			this.autoTimer = setInterval(function(){
				oThis.next();
			}, 3000);
			this.oUl.onmouseover = function(){
				clearInterval(oThis.autoTimer);
			};
			this.oUl.onmouseout = function(){
				oThis.autoTimer = setInterval(function(){
					oThis.next();
				}, 3000);
			};
			for (var i = 0; i < this.aBtn.length; i++) {
				this.aBtn[i].index = i;
				this.aBtn[i].onmouseover = function(){
					oThis.iNow = this.index;
					oThis.toggle();
				}
			}
		},
		// 生成对应数量的nav提示
		createBtn: function(){
			this.oCount = document.createElement('ul');
			var oFrag = document.createDocumentFragment();
			this.oCount.className = 'count';
			for (var i = 0; i < this.aImg.length; i++) {
				var oLi = document.createElement('li');
				oLi.innerHTML = i+1;
				oFrag.appendChild(oLi);
			}
			this.oCount.appendChild(oFrag);
			this.oBox.appendChild(this.oCount);
		},
		next: function(){
				this.bOrder ? this.iNow++ : this.iNow--;
				this.iNow <= 0 && (this.iNow = 0, this.bOrder = true);
				// 判断轮播的模式是来回return，还是最后一张时直接跳到第一张
				switch(this.options.direction) {
					case 'return':
					this.iNow >= this.aImg.length-1 && (this.iNow = this.aImg.length-1, this.bOrder = false);
					break;
					case 'forwards':
					this.iNow >= this.aImg.length && (this.iNow = 0, this.bOrder = true);
					break;
					default:
					;
				};
				this.toggle();
		},
		toggle: function(){
			// 改变nav的样式
			for (var i = 0; i < this.aBtn.length; i++) {
				this.aBtn[i].className = '';
			}
			this.aBtn[this.iNow].className = 'current';
			// 完成图片切换
			this.doMove(-this.iNow*this.aImg[0].offsetHeight);
		},
		doMove: function(iTarget){
			var oThis = this;
			clearInterval(this.timer);
			this.timer = setInterval(function(){
				var iSpeed = (iTarget - oThis.oUl.offsetTop) / 10;
				iSpeed = iSpeed>0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				oThis.oUl.offsetTop === iTarget ? clearInterval(oThis.timer) : (oThis.oUl.style.top = oThis.oUl.offsetTop + iSpeed + 'px');
			},30)
		}
	};
	$.fn.extend({
		mSlide: function(options) {
			slider = new Slide(this, options);
			return slider.init();
		}
	})
})(jQuery, window, document);