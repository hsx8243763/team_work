function vMove(obj,attr,count,speed,endFn){
	var c = count;
	var v = speed;
	clearInterval(obj[attr]);
	obj[attr] = setInterval(function(){
	var p = parseFloat(getComputedStyle(obj)[attr]);
	var s = p + v;
	if(s>=c){
		s=c;
	}
	obj.style[attr] = s +'px';
	if(s>=c){
		clearInterval(obj[attr]);		
		endFn && endFn();
	}
	},20)
}

function move(obj,attrs,duartion,fx,endFn){
	var old = new Date;
	var oldTime = old.getTime();
	var d = duartion;
	var j ={};
	
	for(var attr in attrs){
		j[attr] = {};
		j[attr].b = parseFloat(getComputedStyle(obj)[attr]);
		j[attr].c = attrs[attr] - j[attr].b; 
	}

	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
	var New = new Date;
	var newTime = New.getTime();		
	var t = newTime - oldTime;
	if(t>=d){
		t=d;
	}
	for(var attr in j){
		var b = j[attr].b;
		var c = j[attr].c;
		var v = Tween[fx](t,b,c,d);
		if(attr == 'opacity'){
			obj.style[attr] = v;
		}else{
			obj.style[attr] = v +'px';
		}			
	}	
	if(t>=d){
		clearInterval(obj.timer);		
		endFn && endFn();
	}
	buttleDuang(obj);
	},5)
}
function move2(obj,attrs,duartion,fx,endFn){
	var old = new Date;
	var oldTime = old.getTime();
	var d = duartion;
	var j ={};
	
	for(var attr in attrs){
		j[attr] = {};
		j[attr].b = parseFloat(getComputedStyle(obj)[attr]);
		j[attr].c = attrs[attr] - j[attr].b; 
	}

	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
	var New = new Date;
	var newTime = New.getTime();		
	var t = newTime - oldTime;
	if(t>=d){
		t=d;
	}
	for(var attr in j){
		var b = j[attr].b;
		var c = j[attr].c;
		var v = Tween[fx](t,b,c,d);
		if(attr == 'opacity'){
			obj.style[attr] = v;
		}else{
			obj.style[attr] = v +'px';
		}			
	}	
	if(t>=d){
		clearInterval(obj.timer);		
		endFn && endFn();
	}
	buttleDuang(obj);
	var strongS = box.getElementsByTagName('strong');
		for(var i=0;i<strongS.length;i++){
			if(duang(obj,strongS[i])){
				if(obj.blood > bullPower){
					obj.blood = obj.blood-bullPower;
					obj.firstElementChild.firstElementChild.style.width = 60*(obj.blood/enemyData[obj.tYpe][0].blood)+'px';
				}else{
					obj.firstElementChild.style.display = 'none';
					enemyM1.load();
					enemyM1.play();					
					obj.style.backgroundImage = 'url(images/img_item.gif)';
					scoreNum += 10;
					pins();
					obj.style.width = '65px';
					obj.style.height = '66px';
					obj.style.backgroundPosition = '0 0';
					clearInterval(obj.timer);
					suplyMove(obj,{top:box.offsetHeight},1000,'easeInStrong');
					clearInterval(obj.doMoveTimer);
				}	
				strongS[i].style.display = 'none';
			}
		}			
	},5)
}
function suplyMove(obj,attrs,duartion,fx,endFn){
	var old = new Date;
	var oldTime = old.getTime();
	var d = duartion;
	var j ={};
	console.log(obj)
	for(var attr in attrs){
		j[attr] = {};
		j[attr].b = parseFloat(getComputedStyle(obj)[attr]);
		j[attr].c = attrs[attr] - j[attr].b; 
	}

	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
	var New = new Date;
	var newTime = New.getTime();		
	var t = newTime - oldTime;
	if(t>=d){
		t=d;
	}
	for(var attr in j){
		var b = j[attr].b;
		var c = j[attr].c;
		var v = Tween[fx](t,b,c,d);
		if(attr == 'opacity'){
			obj.style[attr] = v;
		}else{
			obj.style[attr] = v +'px';
		}			
	}	
	if(t>=d){
		clearInterval(obj.timer);		
		endFn && endFn();
	}
	if(duang(obj,my)){
		if(obj.tYpe == 'small' || obj.tYpe == 'ruleSmall' || obj.tYpe == 'noSmall'){
			scoreNum += 20;
			pins();
			get_score.load();
			get_score.play();			
		}else if(obj.tYpe == 'mid'){
			scoreNum += 50;
			pins();	
			get_score.load();
			get_score.play();			
		}else if(obj.tYpe == 'big'){
			scoreNum += 100;
			pins();
			get_score.load();
			get_score.play();			
		}else if(obj.tYpe == 'buladd'){
			bullPower++;	
			if(bullPower >= 4){
				bullPower = 4;
			}else{
				get_suply.load();
				get_suply.play();				
				Img.style.display = 'block';
				var ImgTimer = setInterval(function(){
					Img.style.left = my.offsetLeft + 'px';
					Img.style.top = my.offsetTop + 'px';					
				},10)
				myPlay(hash,bullPower-1);			
				setTimeout(function(){
					clearInterval(ImgTimer)
					Img.style.display = 'none';
					
				},500)				
			}
		}else if(obj.tYpe == 'more'){		
			moreonOff = true;
			get_suply.load();
			get_suply.play();			
			setTimeout(function(){
				moreonOff = false;
			},10000)
		}else if(obj.tYpe == 'zhadan'){
			get_suply.load();
			get_suply.play();			
			bombNum++;
			bombp.innerHTML = bombNum;
		}
		obj.style.display = 'none';
		box.removeChild(obj);		
	}
	
	},5)
}
function tMove(obj,attrs,duartion,fx,endFn){
	var old = new Date;
	var oldTime = old.getTime();
	var d = duartion;
	var j ={};
	
	for(var attr in attrs){
		j[attr] = {};
		j[attr].b = parseFloat(getComputedStyle(obj)[attr]);
		j[attr].c = attrs[attr] - j[attr].b; 
	}

	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
	var New = new Date;
	var newTime = New.getTime();		
	var t = newTime - oldTime;
	if(t>=d){
		t=d;
	}
	for(var attr in j){
		var b = j[attr].b;
		var c = j[attr].c;
		var v = Tween[fx](t,b,c,d);
		if(attr == 'opacity'){
			obj.style[attr] = v;
		}else{
			obj.style[attr] = v +'px';
		}			
	}	
	if(t>=d){
		box.removeChild(obj);
		clearInterval(obj.timer);		
		endFn && endFn();
	}
	buttleDuang(obj);	
	var strongS = box.getElementsByTagName('strong');
	for(var i=0;i<strongS.length;i++){
		if(duang(obj,strongS[i])){
			if(obj.blood > bullPower){
				obj.blood = obj.blood-bullPower;
				obj.firstElementChild.firstElementChild.style.width = 60*(obj.blood/enemyData[obj.tYpe][0].blood)+'px';
			}else{
				obj.firstElementChild.style.display = 'none';
				if(obj.tYpe == 'small' || obj.tYpe == 'ruleSmall' || obj.tYpe == 'noSmall'){
					enemyM1.load();
					enemyM1.play();					
					obj.style.backgroundImage = 'url(images/img_item.gif)';
					scoreNum += 10;
					pins();
					obj.style.width = '65px';
					obj.style.height = '66px';
					obj.style.backgroundPosition = '0 0';
					clearInterval(obj.timer);
					suplyMove(obj,{top:box.offsetHeight},1000,'easeInStrong');
				}else if(obj.tYpe == 'mid'){
					enemyM2.load();
					enemyM2.play();						
					obj.style.backgroundImage = 'url(images/img_item.png)';
					scoreNum += 50;
					pins();
					obj.style.width = suplyData.green[0].wiDth + 'px';
					obj.style.height = suplyData.green[0].heiGht + 'px';
					obj.style.backgroundPosition = suplyData.green[0].poxy;
					clearInterval(obj.timer);
					suplyMove(obj,{top:box.offsetHeight},1000,'easeInStrong');				
				}else if(obj.tYpe == 'big'){
					enemyM3.load();
					enemyM3.play();						
					obj.style.backgroundImage = 'url(images/img_item.png)';
					scoreNum += 100;
					pins();
					obj.style.width = suplyData.red[0].wiDth + 'px';
					obj.style.height = suplyData.red[0].heiGht + 'px';
					obj.style.backgroundPosition = suplyData.red[0].poxy;
					clearInterval(obj.timer);
					suplyMove(obj,{top:box.offsetHeight},1000,'easeInStrong');				
				}
			}	
			strongS[i].style.display = 'none';
		}		
	}
	},5)
}

/*
 	t:已运动时间（需要计算）
 	b:起始位置（直接获取）
 	c:要运动距离（需要计算）
 	d:运动时间(传入)
 * */
var Tween = {
    linear: function (t, b, c, d){  //匀速
        return c*t/d + b;
    },
    easeIn: function(t, b, c, d){  //加速曲线
        return c*(t/=d)*t + b;
    },
    easeOut: function(t, b, c, d){  //减速曲线
        return -c *(t/=d)*(t-2) + b;
    },
    easeBoth: function(t, b, c, d){  //加速减速曲线
        if ((t/=d/2) < 1) {
            return c/2*t*t + b;
        }
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInStrong: function(t, b, c, d){  //加加速曲线
        return c*(t/=d)*t*t*t + b;
    },
    easeOutStrong: function(t, b, c, d){  //减减速曲线
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
        if ((t/=d/2) < 1) {
            return c/2*t*t*t*t + b;
        }
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p/4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    elasticBoth: function(t, b, c, d, a, p){
        if (t === 0) {
            return b;
        }
        if ( (t /= d/2) == 2 ) {
            return b+c;
        }
        if (!p) {
            p = d*(0.3*1.5);
        }
        if ( !a || a < Math.abs(c) ) {
            a = c;
            var s = p/4;
        }
        else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        if (t < 1) {
            return - 0.5*(a*Math.pow(2,10*(t-=1)) *
                Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        }
        return a*Math.pow(2,-10*(t-=1)) *
            Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
    },
    backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    backOut: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 3.70158;  //回缩的距离
        }
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    backBoth: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        if ((t /= d/2 ) < 1) {
            return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        }
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
        return c - Tween['bounceOut'](d-t, 0, c, d) + b;
    },
    bounceOut: function(t, b, c, d){
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
        }
        return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
    },
    bounceBoth: function(t, b, c, d){
        if (t < d/2) {
            return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
        }
        return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
    }
}
//抖动函数
function shake(obj,attr,endFn){
    var arr=[];
    var timer=null;
    var n=0;
//  if(!obj.num){
        obj.num=parseFloat(getComputedStyle(obj)[attr]);
//  }
    //拿到一组数字，抖动的幅度。
    for(var i=20;i>0;i-=2){
        arr.push(i,-i);
    }
    arr.push(0);
    //用定时器来实现抖动效果。
    clearInterval(obj[attr]);
    obj[attr]=setInterval(function(){
        n++;
        if(n>arr.length-1){
            clearInterval(obj[attr]);
            endFn&&endFn();
        }
        obj.style[attr]=arr[n]+obj.num+'px';
    },50);
}