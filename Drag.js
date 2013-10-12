	function Drag(id) {
		this.oDiv = document.getElementById(id);
		var _this = this;
		this.oDiv.onmousedown = function() {
			_this.mDown();
			return false;
		};
	};

	Drag.prototype.mDown = function(ev) {
		var oEvent = ev || event;
		this.disX = oEvent.clientX - this.oDiv.offsetLeft;
		this.disY = oEvent.clientY - this.oDiv.offsetTop;
		var _this = this;
		document.onmousemove = function() {
			_this.mMove();
		};

		document.onmouseup = this.mUp;
	};

	Drag.prototype.mMove = function(ev) {
		var oEvent = ev || event;
		var l = oEvent.clientX - this.disX;
		var t = oEvent.clientY - this.disY;
		if(l < 0) {
			l = 0
		} else if(l > document.documentElement.clientWidth - this.oDiv.clientWidth) {
			l = document.documentElement.clientWidth - this.oDiv.clientWidth;
		};
		if(t < 0) {
			t = 0;
		} else if(t > document.documentElement.clientHeight - this.oDiv.clientHeight) {
			t = document.documentElement.clientHeight - this.oDiv.clientHeight;
		};

		this.oDiv.style.left = l + 'px';
		this.oDiv.style.top = t + 'px';
	};

	Drag.prototype.mUp = function() {
		document.onmousemove = null;
		document.onmouseup = null;
	};