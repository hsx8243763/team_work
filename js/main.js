//主机控制
	//主机
var my = document.getElementById('my');
	//活动范围
var box = document.getElementById('box');
//分数
var score = document.getElementById('score');
var scoImg = score.getElementsByTagName('img');
var scoreNum = 0;
//难度系数
var easyNum = 5;
//更多子弹开关
var moreonOff = false;
var bullPower = 1;
var hash = location.hash.split('=')[1];
//开关
var onOff = true;
//子弹声音
var bullMu = document.getElementById('bullMu');
//敌机坠落声音
var enemyM1 = document.getElementById('enemyM1');
var enemyM2 = document.getElementById('enemyM2');
var enemyM3 = document.getElementById('enemyM3');
//获得物品声音
var get_suply = document.getElementById('get_suply');
//获得分数声音
var get_score = document.getElementById('get_score');
//游戏结束声音
var Gameover = document.getElementById('Gameover');
//超级导弹声音
var use_bomb = document.getElementById('use_bomb');
//超级导弹数量
var bombNum = 3;
var bo = document.getElementById('bomb');
var bombp = bo.getElementsByTagName('p')[0];
//道具变化
var Img = document.getElementById('Img');
var timer = null;

var Left = false;
var Top = false;
var Bottom = false;
var Right = false;

//方向键按下
document.onkeydown = function(ev){
	var ev = ev || event;
	var code = ev.keyCode;
	if(onOff){
		switch(code){
			case 37:Left = true;
			break;
			case 39:Right = true;
			break;
			case 38:Top = true;
			break;				
			case 40:Bottom = true;
			break;
		}			
	}	
}
//方向键抬起
document.onkeyup = function(ev){
	var ev = ev || event;
	var code = ev.keyCode;
	switch(code){
		case 37:Left = false;
		break;
		case 39:Right = false;
		break;
		case 38:Top = false;
		break;
		case 40:Bottom = false;
		break;	
		case 32:
			if(onOff){
				fire(myData[hash][0].bulltype,bullPower-1);
				bullMu.load();
				bullMu.play();	
			}	
		break;	
		case 70:
			bomb();
		break;
	}		
}

//my运动
timer = setInterval(function(){
	//box的高度
	box.style.height = document.documentElement.clientHeight + 'px';	
	//移动限制
	if(my.offsetLeft < box.getBoundingClientRect().left){						
		Left = false;
	}
	if(my.offsetTop > box.getBoundingClientRect().top + box.offsetHeight - my.offsetHeight - 10){						
		Bottom = false;
	}
	if(my.offsetTop < box.getBoundingClientRect().top){						
		Top = false;
	}
	if(my.offsetLeft > box.offsetWidth + box.getBoundingClientRect().left - my.offsetWidth - 10){						
		Right = false;
	}		
	//上下左右移动
	if(onOff){
		if(Left){
			my.style.left = (my.offsetLeft - 5) + 'px';						
		}
		if(Top){
			my.style.top = (my.offsetTop - 5) + 'px';	
		}			
		if(Right){
			my.style.left = (my.offsetLeft + 5) + 'px';									
		}
		if(Bottom){
			my.style.top = (my.offsetTop + 5) + 'px';					
		}	
	}	
},10)

//主机变化
function myPlay(color,num){
	my.style.backgroundPosition = myData[color][num].poxy;
	my.style.width = myData[color][num].wiDth + 'px';
	my.style.height = myData[color][num].heiGht + 'px';	
}
myChose(hash);
//根据hash选择飞机
function myChose(hash){
	my.style.backgroundPosition = myData[hash][0].poxy;
	my.style.width = myData[hash][0].wiDth + 'px';
	my.style.height = myData[hash][0].heiGht + 'px';	
	my.style.left = box.offsetWidth/2 - myData[hash][0].wiDth/2 + 'px';
	my.style.top = document.documentElement.clientHeight - myData[hash][0].heiGht + 'px';
}
//子弹设定
function fire(type,bLevel){
	if(moreonOff){
		for(var i=0;i<3;i++){
			var strong = document.createElement('strong');
			strong.style.width = bulletData[type][bLevel].wiDth+'px';
			strong.style.height = bulletData[type][bLevel].heiGht+'px';
			strong.style.backgroundPosition = bulletData[type][bLevel].poxy;
			strong.style.zIndex = '-1';
			strong.style.left = my.offsetLeft + my.offsetWidth/2 - bulletData[type][bLevel].wiDth/2 + 'px';
			strong.style.top = my.offsetTop - bulletData[type][bLevel].heiGht/2 + 'px';
			box.appendChild(strong);	
			moreBullMove(strong,i);
		}		
	}else{
		var strong = document.createElement('strong');
		strong.style.width = bulletData[type][bLevel].wiDth+'px';
		strong.style.height = bulletData[type][bLevel].heiGht+'px';
		strong.style.backgroundPosition = bulletData[type][bLevel].poxy;
		strong.style.zIndex = '-1';
		strong.style.left = my.offsetLeft + my.offsetWidth/2 - bulletData[type][bLevel].wiDth/2 + 'px';
		strong.style.top = my.offsetTop - bulletData[type][bLevel].heiGht/2 + 'px';
		box.appendChild(strong);
		bullMove(strong);		
	}	
}
//子弹飞行
function bullMove(obj){
	obj.timer = setInterval(function(){
		obj.style.top = obj.offsetTop - 5 + 'px';
		if(obj.offsetTop<=0){
			box.removeChild(obj);
			clearInterval(obj.timer);
		}		
	},10)	
}
//more子弹飞行
function moreBullMove(obj,num){
	obj.timer = setInterval(function(){
		obj.style.top = obj.offsetTop - 5 + 'px';
		obj.style.left = obj.offsetLeft + (num-1)*1  + 'px';
		if(obj.offsetTop<=0){
			box.removeChild(obj);
			clearInterval(obj.timer);
		}		
	},10)	
}
//背景变动
var backTimer = null;
function backMove(num){
	box.style.backgroundImage = 'url(images/b1.jpg)';
	var Y = 0;
	backTimer = setInterval(function(){
		Y++;
		box.style.backgroundPositionY = Y + 'px';
		if(Y>=1536){
			Y = 0;
		}
	},10)
}

//背景开始移动
backMove(2);
enemy();
//敌机出现 函数改变
function enemy(){
	var smallTimer = setInterval(function(){
		smallEnemy('small');	
	},1000)	
	setTimeout(function(){
		var ruleSmallTimer = setInterval(function(){
			smallEnemy('ruleSmall');	
			smallEnemy('ruleSmall');
		},5000)		
	},1000)
	setTimeout(function(){
		var noSmallTimer = setInterval(function(){
			smallEnemy('noSmall');	
			quickSpeed();
		},8000)	
	},20000)
	setTimeout(function(){
		var midTimer = setInterval(function(){
			smallEnemy('mid');	
		},10000)
	},40000)
	setTimeout(function(){
		var bigTimer = setInterval(function(){
			smallEnemy('big');	
			quickSpeed();
		},15000)
	},80000)	
	setTimeout(function(){
		var buTimer = setInterval(function(){
	    	suply('buladd');	
	    	setTimeout(function(){
	    		suply('buladd');
	    	},4000)	
		},20000)
	},30000)	
	setTimeout(function(){	
		var buTimer = setInterval(function(){
	    	suply('more');	
	    	setTimeout(function(){	    	
	    	suply('more');
	    	},4000)		    	
		},13000)
	},60000)
	var easyTimer = setInterval(function(){
		easyNum-=0.1;
		if(easyNum <= 1 ){
			easyNum == 1;
			clearInterval(easyTimer)
		}
	},10000)
	setTimeout(function(){
		var zhadanTimer = setInterval(function(){
			suply('zhadan');
		},80000)	
	},20000)	
}


//small敌机出现
function smallEnemy(type){
	var n = random(0,enemyData[type].length);
	var span = document.createElement('span');
	span.tYpe = type;
	span.blood = enemyData[type][n].blood;
	span.style.left = Math.random()*(box.offsetWidth - enemyData[type][n].wiDth)+'px';
	span.style.top = -enemyData[type][n].heiGht+'px';
	span.style.width = enemyData[type][n].wiDth + 'px';
	span.style.height = enemyData[type][n].heiGht + 'px';
	span.style.backgroundPosition = enemyData[type][n].poxy;
		//血条
		var enemyDiv = document.createElement('div');
		enemyDiv.id = 'enemyHp';
		enemyDiv.style.left = (enemyData[type][n].wiDth-60)/2 + 'px';
		enemyDiv.style.top = enemyData[type][n].heiGht - 5 + 'px';
		var div = document.createElement('div');
		enemyDiv.appendChild(div)
		span.appendChild(enemyDiv);
	box.appendChild(span);
	//big飞机子弹速度
	//small敌机飞行
	if(span.tYpe == 'ruleSmall'){
		doMove(span);
	}else{
		setTimeout(function(){
			enemyFire(span,n);
		},200)		
		tMove(span,{top:box.offsetHeight},easyNum*1000,'linear');		
	}
}
//敌机子弹设定
function enemyFire(obj,num){
	if(obj.tYpe == 'small' || obj.tYpe == 'noSmall' || obj.tYpe == 'ruleSmall'){
		var i = document.createElement('i');
		i.style.width = enemyData[obj.tYpe][num].bwiDth+'px';
		i.style.height = enemyData[obj.tYpe][num].bheiGht+'px';
		i.style.backgroundPosition = enemyData[obj.tYpe][num].bpoxy;
		i.style.zIndex = '-1';
		i.style.left = obj.offsetLeft + obj.offsetWidth/2 - enemyData[obj.tYpe][num].bwiDth/2 + 'px';
		i.style.top = obj.offsetTop - enemyData[obj.tYpe][num].bheiGht/2 + 'px';
		box.appendChild(i);
		enemybull(i);		
	}else if(obj.tYpe == 'mid'){
		//big六个子弹
		for(var j=0;j<6;j++){
			var i = document.createElement('i');
			i.style.width = enemyData[obj.tYpe][num].bwiDth+'px';
			i.style.height = enemyData[obj.tYpe][num].bheiGht+'px';
			i.style.backgroundPosition = enemyData[obj.tYpe][num].bpoxy;
			i.style.zIndex = '-1';
			i.style.left = obj.offsetLeft + obj.offsetWidth/2 - enemyData[obj.tYpe][num].bwiDth/2 + 'px';
			i.style.top = obj.offsetTop - enemyData[obj.tYpe][num].bheiGht/2 + 'px';
			box.appendChild(i);
			enemyMore(i,j);				
		}
	}else if(obj.tYpe == 'big'){
		//big三个子弹
		for(var j=0;j<3;j++){
			var i = document.createElement('i');
			i.style.width = enemyData[obj.tYpe][num].bwiDth+'px';
			i.style.height = enemyData[obj.tYpe][num].bheiGht+'px';
			i.style.backgroundPosition = enemyData[obj.tYpe][num].bpoxy;
			i.style.zIndex = '-1';
			i.style.left = obj.offsetLeft + obj.offsetWidth/2 - enemyData[obj.tYpe][num].bwiDth/2 + 'px';
			i.style.top = obj.offsetTop - enemyData[obj.tYpe][num].bheiGht/2 + 'px';
			box.appendChild(i);
			bigEnemyMore(i,j);				
		}
	}
}
//敌机子弹飞行 
function enemybull(obj){
	obj.timer = setInterval(function(){
		obj.style.top = obj.offsetTop + 4 + 'px';
		if(obj.offsetTop>=box.offsetHeight-obj.offsetHeight){
			box.removeChild(obj);
			clearInterval(obj.timer);
		}		
		buttleDuang(obj);
	},10)	
}
//敌机子弹飞行
function enemyMore(obj,num){
	obj.timer = setInterval(function(){
		obj.style.top = obj.offsetTop + 3 + 'px';
		obj.style.left = obj.offsetLeft + (num-2.4)*1.5  + 'px';
		if(obj.offsetTop>=box.offsetHeight - obj.offsetHeight){
			box.removeChild(obj);
			clearInterval(obj.timer);
		}	
		buttleDuang(obj);
	},10)	
	
}
//敌机子弹飞行
function bigEnemyMore(obj,num){
	obj.timer = setInterval(function(){
		obj.style.top = obj.offsetTop + 4 + 'px';
		obj.style.left = obj.offsetLeft + (num-1)*1  + 'px';
		if(obj.offsetTop>=box.offsetHeight - obj.offsetHeight){
			box.removeChild(obj);
			clearInterval(obj.timer);
		}
		buttleDuang(obj);
	},10)	
}
//敌军子弹与主机相碰
function buttleDuang(obj){
	if(duang(obj,my)){
//		box.removeChild(obj);
		clearInterval(obj.timer);
		onOff = false;
		my.style.backgroundImage = 'none';
		my.firstElementChild.style.display = 'block';
		my.style.width = '100px';
		my.style.height = '100px';
		Gameover.play();		
		setTimeout(function(){
			open('Game Over.html#score='+scoreNum,'_self');			
		},2000)
	}
}
//道具
function suply(type){
	var p = document.createElement('p');
	p.style.left = Math.random()*(box.offsetWidth - suplyData[type][0].wiDth)+'px';
	p.tYpe = type;
	p.style.top = '0px';
	p.style.width = suplyData[type][0].wiDth + 'px';
	p.style.height = suplyData[type][0].heiGht + 'px';
	p.style.backgroundPosition = suplyData[type][0].poxy;
	box.appendChild(p);
	suplyMove(p,{top:box.offsetHeight},5000,'bounceBoth');
}

//敌军飞速弹
function quickSpeed(){
	var em = document.createElement('em');
	em.style.left = Math.random()*(box.offsetWidth - bulletData.enemy[0].wiDth)+'px';
	em.style.top = -bulletData.enemy[0].heiGht/2+'px';
	em.style.width = bulletData.enemy[0].wiDth + 'px';
	em.style.height = bulletData.enemy[0].heiGht + 'px';
	em.style.backgroundImage = 'url(images/buttle.png)';
	em.style.backgroundPosition = bulletData.enemy[0].poxy;
	box.appendChild(em);
	//敌军飞速弹飞行
	move(em,{top:box.offsetHeight},3000,'elasticIn');	
}

//超级导弹
function bomb(){
	bombNum--;
	if(bombNum <=0){
		bombNum = 0;
	}
	bombp.innerHTML = bombNum;
	if(bombNum>0){
		use_bomb.load();
		use_bomb.play();
		var div = document.createElement('div');
		div.style.backgroundImage = 'url(images/img_item.png)';
		div.style.backgroundPosition = '-373px -52px';
		div.style.width = '70px';
		div.style.height = '77px';
		div.style.position = 'absolute';
		div.style.top = box.offsetHeight - 38 + 'px';
		div.style.left = box.offsetWidth/2 - 35 + 'px';
		box.appendChild(div);
		div.timer = setInterval(function(){
			div.style.top = div.offsetTop - 1 + 'px';
			if(div.offsetTop<=box.offsetHeight/2){
				clearInterval(div.timer)
				div.style.top = '0px';
				div.style.left = '0px';		
				div.style.backgroundImage = 'none';
				div.style.width = box.offsetWidth + 'px';
				div.style.height = box.offsetHeight + 'px';	
				div.style.backgroundColor = 'white';
				div.style.opacity = '0.8';
				var opNum = 0.8;
				clearAenemy();
				div.style.zIndex = '999';		
				var opTimer = setInterval(function(){
					opNum-=0.1;
					div.style.opacity = opNum;
					if(opNum<=0){
						clearInterval(opTimer);
					}
				},300)
			}
		},10)		
	}
}
//清除所有敌机
function clearAenemy(){
	var enemySpan = box.getElementsByTagName('span');
	for(var i=0;i<enemySpan.length;i++){
		box.removeChild(enemySpan[i]);
		clearInterval(enemySpan.timer);
		i--;
	}
	
}
//碰撞检测
function duang(obj,obj2){
	var L1 = obj.offsetLeft-10;
	var T1 = obj.offsetTop-10;
	var R1 = obj.offsetLeft + obj.offsetWidth-10;
	var B1 = obj.offsetTop + obj.offsetHeight-10;
	
	var L2 = obj2.offsetLeft-10;
	var T2 = obj2.offsetTop-10;
	var R2 = obj2.offsetLeft + obj2.offsetWidth-10;
	var B2 = obj2.offsetTop + obj2.offsetHeight-10;	
	
	var duanged = false;
	if(L1>R2 || R1 < L2 || B1 < T2 || T1>B2){
		
	}else{
		duanged = true;				
	}
	return duanged		
}
//产生min到max之间的随机数
function random(min,max){
    return Math.floor(min+Math.random()*(max-min));
}

//旋转
function doMove(obj){
	var dt = -1.59;
	var r = 150;	
	var L = obj.offsetLeft;
	var JD = 1;
	move2(obj,{top:150},1300,'linear',function(){
		enemyFire(obj,0);
		obj.doMoveTimer = setInterval(function(){
			JD-=2.6;			
			var py = Math.sin(dt)*r;
			var px = Math.cos(dt)*r;
			obj.style.left = L + obj.offsetWidth+ py + 'px';
			obj.style.top = 150 + px + 'px';
			obj.style.transform = 'rotate('+JD+'deg)';
//			-webkit-transform:rotate(1deg); /* Safari 和 Chrome */		
			dt+=0.05;
			if(dt >= 1.9 ){
				clearInterval(obj.doMoveTimer);
				move(obj,{top:-obj.offsetHeight},500,'linear',function(){
					box.removeChild(obj);					
				})	
			}
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
		},30);										
	});
}

//分数
function pins(){
	var pin = document.getElementById('pin');
	var pins = pin.getElementsByTagName('img');
	pins[0].style.display = 'block';
	pins[0].src = 'img/0.png';
	var pins_a = scoreNum.toString().charAt(0);
	var pins_b = scoreNum.toString().charAt(1);
	var pins_c = scoreNum.toString().charAt(2);
	var pins_d = scoreNum.toString().charAt(3);
	var timer = null;
	if(pins_a == '0'){
		pins[0].style.display = 'block';
		pins[0].src = 'img/'+pins_a+'.png';
	}
	if(pins_b != ''){
		pins[0].style.display = 'block';
		pins[1].style.display = 'block';
		pins[0].src = 'img/'+pins_a+'.png';
		pins[1].src = 'img/'+pins_b+'.png';
	}
	if(pins_c != ''){
		pins[0].style.display = 'block';
		pins[1].style.display = 'block';
		pins[2].style.display = 'block';
		pins[0].src = 'img/'+pins_a+'.png';
		pins[1].src = 'img/'+pins_b+'.png';
		pins[2].src = 'img/'+pins_c+'.png';
	}
	if(pins_d != ''){
		pins[0].style.display = 'block';
		pins[1].style.display = 'block';
		pins[2].style.display = 'block';
		pins[3].style.display = 'block';
		pins[0].src = 'img/'+pins_a+'.png';
		pins[1].src = 'img/'+pins_b+'.png';
		pins[2].src = 'img/'+pins_c+'.png';
		pins[3].src = 'img/'+pins_d+'.png';
	}
}