var Robin_popup = function(imgWidth, imgHeight) {
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
				resizePop.style.left = document.documentElement.clientWidth / 2 - resizePop.clientWidth / 2 + 'px';
				resizePop.style.top = document.documentElement.clientHeight / 2 - resizePop.clientHeight / 2 + 'px';
				resizeMask.style.width = document.documentElement.clientWidth + scrollPos.scrollLeft + 'px';
				resizeMask.style.height = document.documentElement.clientHeight + scrollPos.scrollTop + 'px';
			}
		};

		function createDiv() {
			var elementArr = [document.createElement('div'), document.createElement('div'), document.createElement('div'), document.createElement('div'), document.createElement('ul'), document.createElement('input'), document.createElement('input')];
			var divName = ['overallMask', 'lottery_scroll', 'lottery_mask', 'lottery_mask_sub', 'lottery_ul', 'lottery_start', 'lottery_stop'];
			document.getElementsByTagName('body')[0].appendChild(elementArr[0]);
			for(var i = 0; i < elementArr.length - 3; i++) {
				elementArr[i].id = divName[i];
				elementArr[i].appendChild(elementArr[i + 1]);
			};
			elementArr[5].type = elementArr[6].type = "button";
			elementArr[5].id = divName[5];
			elementArr[5].value = "开始";
			elementArr[6].id = divName[6];
			elementArr[6].value = "停止";
			elementArr[6].style['float'] = 'right';
			elementArr[1].appendChild(elementArr[5]);
			elementArr[1].appendChild(elementArr[6]);
			elementArr[2].style['width'] = imgWidth + 'px';
			elementArr[2].style['height'] = imgHeight + 'px';
			resizePos();
			elementArr[1].style['width'] = imgWidth + 50 + 'px';
			elementArr[1].style['height'] = imgHeight + 80 + 'px';
			elementArr[0].onclick = function(ev) {
				stopBubble(ev);
				document.getElementsByTagName('body')[0].removeChild(elementArr[0]);
				window.onresize = window.onscroll = null;
				clearInterval(timer);
				img = null;
			}
			elementArr[1].onclick = function(ev) {
				stopBubble(ev);
			}
		}

		function initImg() {
			//var d = new Drag("scroll");
			img = new Robin_init("lottery_mask", "lottery_mask_sub", 10);
			var startBtn = document.getElementById('lottery_start');
			var stopBtn = document.getElementById('lottery_stop');
			stopBtn.disabled = true;
			startBtn.onclick = function(ev) {
				stopBubble(ev);
				img.picStartScroll();
				var i = 5;
				var str = stopBtn.value;
				var timeend = setInterval(function() {
					stopBtn.value = str + '(' + (i--) + ')';
				}, 1000);
				setTimeout(function() {
					stopBtn.disabled = false;
					clearInterval(timeend);
					stopBtn.value = str;
				}, 2000);
			}
			stopBtn.onclick = function(ev) {
				stopBubble(ev);
				img.picStopScroll();
				stopBtn.disabled = true;
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
			clearInterval(timer);
			timer = setInterval(function() {
				tag ? iSpeed += 1 : iSpeed -= 2;
				if(oUl.offsetTop <= -oUl.offsetHeight / 2) {
					oUl.style.top = 0 + "px";
				} else {
					oUl.style.top = oUl.offsetTop - iSpeed + "px";
					if(iSpeed > 200) {
						iSpeed = 200;
					} else if(iSpeed < 0) {
						iSpeed = 10;
						clearInterval(timer);
						if(oUl.offsetTop % imgHeight != 0) {
							animate(oUl, imgHeight * Math.ceil(-oUl.offsetTop / imgHeight));
							console.log(getValue(imgHeight));
							return getValue(imgHeight);
						} else {
							console.log(getValue(imgHeight));
							return getValue(imgHeight);
						}
					}
				};
				//console.log(oUl.offsetTop + "&&" + iSpeed);
			}, 30);
		}
		//获取结果

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
			clearInterval(obj.adjusttimer);
			obj.adjusttimer = setInterval(function() {
				obj.style.top = obj.offsetTop - iSpeed + "px";
				iSpeed = iSpeed > 0 ? Math.ceil((endPos + obj.offsetTop) / 8) : Math.floor((endPos + obj.offsetTop) / 8);
			}, 30);
			/*	obj.style.top = obj.offsetTop - iSpeed + "px";
	iSpeed = iSpeed > 0 ? Math.ceil((endPos + obj.offsetTop) / 8) : Math.floor((endPos + obj.offsetTop) / 8);
	arguments.callee(obj,endPos);*/
		}
		//if(typeof this.picStartScroll != "function") {
		this.picStartScroll = function() {
			iSpeed = this.scrollSpeed;
			if(oUl.offsetHeight == initialHeight) {
				appendLi(oUl);
			}
			clearInterval(oUl.adjusttimer);
			timeScroll(oUl, img[0].height, true);
		};

		this.picStopScroll = function() {
			clearInterval(timer);
			timeScroll(oUl, img[0].height, false);
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