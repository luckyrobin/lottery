var Robin = function(parentNotes, subNotes, scrollSpeed) {
		this.scrollSpeed = scrollSpeed;
		this.outLine = document.getElementById(parentNotes);
		this.inLine = inLine = document.getElementById(subNotes);
		this.img = document.getElementsByTagName('img');
		this.oUl = inLine.getElementsByTagName('ul')[0];
		this.timer = null;
		this.initialHeight = imgInitial(this.oUl, this.outLine);
	};

Robin.prototype.picStartScroll = function() {
	iSpeed = this.scrollSpeed;
	if(this.oUl.offsetHeight == this.initialHeight) {
		appendLi(this.oUl);
	}
	clearInterval(this.oUl.adjusttimer);
	timeScroll(this.oUl, this.img[0].height, true);
};

Robin.prototype.picStopScroll = function() {
	clearInterval(this.timer);
	timeScroll(this.oUl, this.img[0].height, false);
};

//初始化图片大小

function imgInitial(oUl, parentObj) {
	var Imgtemp = document.createDocumentFragment();
	for(var i in imageSource) {
		var newImg = new Image();
		var newLi = document.createElement("li");
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
	clearInterval(this.timer);
	this.timer = setInterval(function() {
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
				}
			}
		};
		//console.log(oUl.offsetTop + "&&" + iSpeed);
	}, 30);
}

//校准定时器

function animate(obj, endPos) {
	clearInterval(obj.newtimer);
	obj.adjusttimer = setInterval(function() {
		obj.style.top = obj.offsetTop - iSpeed + "px";
		iSpeed = iSpeed > 0 ? Math.ceil((endPos + obj.offsetTop) / 8) : Math.floor((endPos + obj.offsetTop) / 8);
	}, 30);
/*	obj.style.top = obj.offsetTop - iSpeed + "px";
	iSpeed = iSpeed > 0 ? Math.ceil((endPos + obj.offsetTop) / 8) : Math.floor((endPos + obj.offsetTop) / 8);
	arguments.callee(obj,endPos);*/
}