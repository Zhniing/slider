window.onload = function () {

	var oCont = document.getElementById("Contents");
	var oLBtn = document.getElementById('larrow');
	var oRBtn = document.getElementById('rarrow');
	var oUl = oCont.getElementsByTagName("ul")[0];
	var aLi = oUl.getElementsByTagName("li");
	var oImgs = document.getElementById("Images");
	var aImgs = oImgs.getElementsByTagName("img");

	var cur = 0;
	var len = aLi.length;
	var LiSpace = parseInt(getStyle(aLi[0], 'width'))
					+parseInt(getStyle(aLi[0], 'margin-right'));
	var UlWidth = parseInt(getStyle(oUl, 'width'));
	
	/*Slider*/
	oUl.innerHTML += oUl.innerHTML;
	startMove(aImgs[cur%5], {'width': 90, 'height': 120, 'margin-top': 0});
	oCont.timer = setInterval(function () {
		slider(1);
	}, 4000);

	/*Button*/
	oLBtn.onmouseover = oRBtn.onmouseover =  function () {
		this.getElementsByTagName('img')[0].style.top = '-39px';
	};
	oLBtn.onmouseout = oRBtn.onmouseout = function () {
		this.getElementsByTagName('img')[0].style.top = 0;
	};
	oLBtn.onclick = function () {
		document.addEventListener('click', stop, true);
		clearInterval(oCont.timer);
		slider(-1); // To left
		oCont.timer = setInterval(function () {
			slider(1);
		}, 4000);
		setTimeout(function () {
			document.removeEventListener('click', stop, true);
		}, 2000);
	};
	oRBtn.onclick = function () {
		document.addEventListener('click', stop, true);
		clearInterval(oCont.timer);
		slider(1); // To right
		oCont.timer = setInterval(function () {
			slider(1);
		}, 4000);
		setTimeout(function () {
			document.removeEventListener('click', stop, true);
		}, 2000);
	};

	/*Images*/
	for (var i=0; i<len; i++) {
		aImgs[i].index = i;
		aImgs[i].onclick = function () {
			document.addEventListener('click', stop, true);
			clearInterval(oCont.timer);
			// alert(this.index-cur%5);
			slider(this.index-cur%5);
			oCont.timer = setInterval(function () {
				slider(1);
			}, 4000);
			setTimeout(function () {
				document.removeEventListener('click', stop, true);
			}, 2000);
		};
	}

	/*Moving distance: d*/
	function slider (d) {
		document.addEventListener('click', stop, true);
		if (parseInt(getStyle(oUl, 'left')) <= LiSpace-UlWidth) {
			oUl.style.left = parseInt(getStyle(oUl, 'left')) + UlWidth/2 + 'px';
		}
		if (parseInt(getStyle(oUl, 'left')) >= 0) {
			oUl.style.left =  0-UlWidth/2 + 'px';
		}
		startMove(oUl,{'left': parseInt(getStyle(oUl, 'left'))-LiSpace*d});
		aImgs[cur%5].style.width = '48px';
		aImgs[cur%5].style.height = '54%';
		aImgs[cur%5].style.marginTop = '28px';
		cur += len+d;
		startMove(aImgs[cur%5], {'width': 90, 'height': 120, 'margin-top': 0});
		setTimeout(function () {
			document.removeEventListener('click', stop, true);
		}, 2000);
	}

	/*Stop event propagation*/
	function stop (event) {
		event.stopPropagation();
	}

};

