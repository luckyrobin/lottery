var Robin_popup = function(imgWidth_fix, imgHeight_fix) {
		if(imgWidth_fix && imgHeight_fix) {
			var imgWidth = imgWidth_fix;
			var imgHeight = imgHeight_fix;
		} else {
			var imgHeight = document.documentElement.clientHeight - 40;
			var imgWidth = imgHeight / 3 * 4;
		}
		window.onresize = window.onscroll = resizePos;

		function resizePos() {
			if(document.getElementById('overallMask')) {
				var resizeMask = document.getElementById('overallMask');
				var resizePop = document.getElementById('lottery_scroll');
				if(document.body.scrollTop) {
					var scrollPos = document.body;
				} else {
					var scrollPos = document.documentElement;
				}
				var resizePop_left = document.documentElement.clientWidth / 2 - resizePop.clientWidth / 2;
				var resizePop_top = document.documentElement.clientHeight / 2 - resizePop.clientHeight / 2;
				if(resizePop_left < 0) {
					resizePop_left = 0;
				} else if(resizePop_top < 0) {
					resizePop_top = 0;
				} else {
					resizePop.style.left = resizePop_left + 'px';
					resizePop.style.top = resizePop_top + 'px';
				}

				resizeMask.style.width = document.documentElement.clientWidth + scrollPos.scrollLeft + 'px';
				resizeMask.style.height = document.documentElement.clientHeight + scrollPos.scrollTop + 'px';
			}
		};

		function createDiv() {
			var elementArr = [document.createElement('div'), document.createElement('div'), document.createElement('div'), document.createElement('div'), document.createElement('ul'), document.createElement('div'), document.createElement('input')];
			var divName = ['overallMask', 'lottery_scroll', 'lottery_mask', 'lottery_mask_sub', 'lottery_ul', 'lottery_info', 'lottery_btn'];
			document.getElementsByTagName('body')[0].appendChild(elementArr[0]);
			for(var i = 0; i < elementArr.length - 3; i++) {
				elementArr[i].id = divName[i];
				elementArr[i].appendChild(elementArr[i + 1]);
			};
			elementArr[6].type = "button";
			elementArr[6].id = divName[6];
			elementArr[6].value = "Start";
			elementArr[5].id = divName[5];
			elementArr[1].appendChild(elementArr[5]);
			elementArr[5].appendChild(elementArr[6]);
			elementArr[2].style['width'] = imgWidth + 'px';
			elementArr[2].style['height'] = imgHeight + 'px';
			elementArr[6].style['marginLeft'] = Math.round(-(elementArr[6].clientWidth / 2)) + 'px';
			resizePos();
			elementArr[0].onclick = function(ev) {
				stopBubble(ev);
				document.getElementsByTagName('body')[0].removeChild(elementArr[0]);
				window.onresize = window.onscroll = null;
				img = null;
				clearTimeout(timer);
			}
			elementArr[1].onclick = function(ev) {
				stopBubble(ev);
			}
		}

		function initImg() {
			//var d = new Drag("scroll");
			img = new Robin_init("lottery_mask", "lottery_mask_sub", 10);
			var startBtn = document.getElementById('lottery_btn');
			var count = 0;
			startBtn.onclick = function(ev) {
				stopBubble(ev);
				if(count % 2 == 0) {
					count++;
					startBtn.disabled = true;
					img.picStartScroll();
					var i = 5;
					var str = "Stop";
					setTimeout(function() {
						timeend();
					}, 0);

					function timeend() {
						startBtn.value = str + '(' + i + ')';
						if(i != 0) {
							setTimeout(function() {
								timeend();
							}, 1000);
						} else {
							startBtn.disabled = false;
							startBtn.value = "Stop";
							return false;
						};
						i--;
					}
				} else {
					count++;
					clearTimeout(timer);
					img.picStopScroll();
					startBtn.disabled = false;
					startBtn.value = "Start";
				};

			}

		}
		createDiv();
		initImg();
	}

var Robin_init = function(parentNotes, subNotes, scrollSpeed) {
		this.scrollSpeed = scrollSpeed;
		this.outLine = document.getElementById(parentNotes);
		this.inLine = inLine = document.getElementById(subNotes);
		//私有变量和私有函数
		var img = document.getElementsByTagName('img');
		var oUl = inLine.getElementsByTagName('ul')[0];
		timer = null;
		var initialHeight = imgInitial(oUl, this.outLine);
		//初始化图片大小

		function imgInitial(oUl, parentObj) {
			var Imgtemp = document.createDocumentFragment();
			for(var i in imageSource) {
				var newImg = new Image();
				var newLi = document.createElement("li");
				newLi.style['width'] = parseInt(getMyStyle(parentObj, "width")) + 'px';
				newLi.style['height'] = parseInt(getMyStyle(parentObj, "height")) + 'px';
				newImg.src = imageSource[i];
				newImg.width = parseInt(getMyStyle(parentObj, "width"));
				newImg.height = parseInt(getMyStyle(parentObj, "height"));
				newLi.appendChild(newImg);
				Imgtemp.appendChild(newLi);
			}
			oUl.appendChild(Imgtemp);
			return oUl.offsetHeight;
		}

		//获取outline大小

		function getMyStyle(obj, val) {
			if(obj.currentStyle) {
				return obj.currentStyle[val];
			} else {
				return getComputedStyle(obj, false)[val];
			};
		}

		//复制一份li

		function appendLi(oUl) {
			var aLi = oUl.getElementsByTagName('li');
			var temp = document.createDocumentFragment();
			for(var i = 0; i < aLi.length; i++) {
				temp.appendChild(aLi[i].cloneNode(true));
			};
			oUl.appendChild(temp);
		}

		//滚动定时器

		function timeScroll(oUl, imgHeight, tag) {
			tag ? iSpeed += 1 : iSpeed -= 2;
			if(oUl.offsetTop <= -oUl.offsetHeight / 2) {
				oUl.style.top = 0 + "px";
			} else {
				oUl.style.top = oUl.offsetTop - iSpeed + "px";
				if(iSpeed > 200) {
					iSpeed = 200;
					clearTimeout(timer);
				} else if(iSpeed < 10) {
					iSpeed = 10;
					clearTimeout(timer);
					if(oUl.offsetTop % imgHeight != 0) {
						setTimeout(function() {
							animate(oUl, imgHeight * Math.ceil(-oUl.offsetTop / imgHeight));
						}, 30);
						console.log(getValue(imgHeight));
						return getValue(imgHeight);
					} else {
						console.log(getValue(imgHeight));
						return getValue(imgHeight);
					}
				}
			};
			//console.log(iSpeed);
			if(tag == true) {
				timer = setTimeout(function() {
					timeScroll(oUl, imgHeight, tag);
				}, 30);
			} else {
				timer = setTimeout(function() {
					timeScroll(oUl, imgHeight, false);
				}, 30);
			}

			//console.log(oUl.offsetTop + "&&" + iSpeed);
			//document.title = oUl.offsetTop + "&&" + iSpeed;
		}
		//获取抽奖结果

		function getValue(imgHeight) {
			var value = Math.ceil(-oUl.offsetTop / imgHeight) + 1;
			if(value > oUl.offsetHeight / 2 / imgHeight) {
				return 1;
			} else {
				return value;
			};
		}
		//校准定时器

		function animate(obj, endPos) {
			obj.style.top = obj.offsetTop - iSpeed + "px";
			iSpeed = iSpeed > 0 ? Math.ceil((endPos + obj.offsetTop) / 8) : Math.floor((endPos + obj.offsetTop) / 8);
			//alert(-obj.offsetTop + '&' + endPos);
			if(-obj.offsetTop != endPos) {
				setTimeout(function() {
					animate(obj, endPos);
				}, 30);
			}
		}
		//if(typeof this.picStartScroll != "function") {
		this.picStartScroll = function() {
			iSpeed = this.scrollSpeed;
			if(oUl.offsetHeight == initialHeight) {
				appendLi(oUl);
			}
			timer = setTimeout(function() {
				timeScroll(oUl, img[0].height, true);
			}, 30);
		};

		this.picStopScroll = function() {
			setTimeout(function() {
				timeScroll(oUl, img[0].height, false);
			}, 30);
		};
		//}
	};

function stopBubble(ev) {
	var oEvent = ev || window.event;
	if(oEvent && oEvent.stopPropagation) {
		oEvent.stopPropagation();
	} else {
		oEvent.cancelBubble = true;
	}
};