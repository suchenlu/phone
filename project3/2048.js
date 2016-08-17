var game={
	data:[],//单元格中的所有数字
	score:0,
	state:1,
	RUNNING:1,
	GAME_OVER:0,
	start:function(){//启动游戏时调用
	this.data=[[0,0,0,0],[0,0,0,0],
			   [0,0,0,0],[0,0,0,0]];
	this.score=0;
	this.state=this.RUNNING;
	var div=document.getElementById("gameOver");
	//修改div的style.display
	div.style.display="none";
		//在两个随机位置生成2或4
	this.randomNum(); this.randomNum();
	this.updateView();
		//document.write(this.data.join("<br>"));
},
isFull:function(){//判断是否已满
		//遍历data数组
	for(var row=0;row<4;row++){
		for(var col=0;col<4;col++){
		//   只要发现==0的，就返回false
			if(this.data[row][col]==0){
				return false;
			}
		}
	}//如果退出循环，就返回true
	return true;
},
randomNum:function(){//在随机位置生成2或4
	if(this.isFull()){//如果满，就不再生成
		return;
	}
		//循环条件：true
	while(true){
		//	随机在0-3行中生成一个行下标row
		var row=Math.floor(Math.random()*4);
		//	随机在0-3列中生成一个列下标col
		var col=Math.floor(Math.random()*4);
		//	如果该位置==0
		if(this.data[row][col]==0){
		//		随机选择2或4：放入该位置
		//        如果Math.random()<0.5,选2
		                          //否则选4
			this.data[row][col]=
				Math.random()<0.5?2:4;
		//		退出循环
			break;
		}	
	}
},
	/*实现左移：*/
canLeft:function(){
		//遍历每个元素(除最左侧列外)
			//只要发现任意元素左侧数==0或当前值==左侧值
			//return true
			//如果循环正常结束，返回false
	for(var row=0;row<4;row++){
		for(var col=1;col<4;col++){
			if(this.data[row][col]!=0){
				if(this.data[row][col-1]==0||this.data[row][col]){
					return true;
					}
				}
			}			
		}
	return false;
},
moveLeft:function(){//左移所有行
	//先判断能否左移
	if(this.canLeft()){
		for(var row=0;row<4;row++){
			this.moveLeftInRow(row);
		}
		this.randomNum();
		/*document.body.innerHTML="";
		document.write(this.data.join("<br>"));*/
		this.updateView();
	}
},
	
moveLeftInRow:function(row){//左移1行
	for(var col=0;col<=2;col++){//最右不必检查
		var nextCol=this.getNextRight(row,col);
		if(nextCol==-1){ break;//找不到就退出
		}else{//否则，判断合并
		    if(this.data[row][col]==0){
				this.data[row][col]=
					 this.data[row][nextCol];
				this.data[row][nextCol]=0;
				col--;//让col留在原地:
			}else if(this.data[row][col]
				==this.data[row][nextCol]){
				this.data[row][col]*=2;//将自己*2
				this.score+=this.data[row][col];
				this.data[row][nextCol]=0;
			}
		}
	}
},
	
//获得*当前行中，指定位置*右侧第一个不为0的数
	//返回下一个不为0的数的位置
getNextRight:function(row,col){
	//遍历row行中col位置右侧每个元素
	for(var i=col+1;i<4;i++){
	//    只要发现!=0的
		if(this.data[row][i]!=0){
	//    就返回其位置下标
			return i;
		}
	}//退出循环，返回-1
	return -1;
},
updateView:function(){
		//step1:遍历二维数组中的每个元素
	for(var row=0;row<4;row++){
		for(var col=0;col<4;col++){
			var div=document.getElementById("c"+row+col);
				//step2:找到和当前元素对应的div
		//		拼div的id：c+row+col
		//	div=document.getElementById(id);
		//step3:将当前元素的值放入div中
		//		div.innerHTML=?
		//	如果当前值==0，放入""
		//		否则放入当前值
		//step4:根据当前元素值修改div样式类
			//div.className="类名";
			//<div class="cell n8">
			//如果当前值==0，className="cell"
			//	否则className="cell n"+当前值
				div.innerHTML=this.data[row][col]==0?"":this.data[row][col];
				div.className=this.data[row][col]==0?"cell":"cell n"+this.data[row][col];
			/*if(this.data[row][col]==0){
				div.innerHTML="";
				div.className="cell";
				}else{
					div.innerHTML=this.data[row][col];
					div.className="cell n"+this.data[row][col];
					}*/
					
			}
	}

	
			//将分数放入span
			var span=document.getElementById("score");
			span.innerHTML=this.score;
			//判断游戏结束
			if(this.isGameOver()){
				this.state=this.GAME_OVER;//显示游戏结束div
				//找到gameover div
				var div=document.getElementById("gameOver");
				
				var finalScore=document.getElementById("finalScore");
				finalScore.innerHTML=this.score;
				//修改div的style.display
				div.style.display="block";
				}
			
},
	/*实现右移*/
canRight:function(){/*判断能否右移*/
	//遍历每个元素(除最右侧列外)
			//只要发现任意元素右侧数==0或当前值==右侧值
			//return true
			//如果循环正常结束，返回false
	for(var row=0;row<4;row++){
		for(var col=0;col<3;col++){
			if(this.data[row][col]!=0){
				if(this.data[row][col+1]==0||this.data[row][col+1]==this.data[row][col]){
					return true;
				}
			}
		}
	}
	return false;
},
		
moveRight:function(){
	if(this.canRight()){
		for(var row=0;row<4;row++){
			this.moveRightInRow(row);
			}
		this.randomNum();
		this.updateView();
	}	
},
moveRightInRow:function(row){
	for(col=3;col>0;col--){
		var NextCol=this.getNextLeft(row,col);
		if(NextCol==-1){
			break;
		}else{
			if(this.data[row][col]==0){
				this.data[row][col]=this.data[row][NextCol];
				this.data[row][NextCol]=0;
				col++;
			}else if(this.data[row][col]==this.data[row][NextCol]){
				this.data[row][col]*=2;
				this.score+=this.data[row][col];
				this.data[row][NextCol]=0;
			}	
		}
	}
},
getNextLeft:function(row,col){
	for(var i=col-1;i>=0;i--){
		if(this.data[row][i]!=0){
				return i;
			}
		}
	return -1;
},
/*实现上移*/
canUp:function(){
	for(var row=1;row<4;row++){
		for(var col=0;col<4;col++){
			if(this.data[row][col]!=0){
				if(this.data[row-1][col]==0||this.data[row][col]==this.data[row-1][col]){	return true;
				}	
			}	
		}	
	}
	return false;
},
moveUp:function(){//上移所有列
	if(this.canUp()){
		for(var col=0;col<4;col++){
			this.moveUpInCol(col);
		}
		this.randomNum();
		/*document.body.innerHTML="";
		document.write(this.data.join("<br>"));*/
		this.updateView();
	}
},
	
moveUpInCol:function(col){//上移1列
	for(var row=0;row<3;row++){//最下不必检查
		var nextRow=this.getNextDown(row,col);
		if(nextRow==-1){ break;//找不到就退出
		}else{//否则，判断合并
			if(this.data[row][col]==0){
				this.data[row][col]=
				this.data[nextRow][col];
				this.data[nextRow][col]=0;
				row--;//让row留在原地:
			}else if(this.data[row][col]
				==this.data[nextRow][col]){
				this.data[row][col]*=2;//将自己*2
				this.score+=this.data[row][col];
				this.data[nextRow][col]=0;
			}
		}
	}
},
	
//获得*当前行中，指定位置*右侧第一个不为0的数
	//返回下一个不为0的数的位置
getNextDown:function(row,col){
	//遍历col列中row位置下侧每个元素
	for(var i=row+1;i<4;i++){
	//    只要发现!=0的
		if(this.data[i][col]!=0){
	//    就返回其位置下标
				return i;
			}
		}//退出循环，返回-1
		return -1;
	},
/*实现下移*/
canDown:function(){/*判断能否下移*/
	//遍历每个元素(除最右侧列外)
			//只要发现任意元素右侧数==0或当前值==右侧值
			//return true
			//如果循环正常结束，返回false
	for(var row=0;row<3;row++){
		for(var col=0;col<4;col++){
			if(this.data[row][col]!=0){
				if(this.data[row+1][col]==0||this.data[row+1][col]==this.data[row][col]){
					return true;
				}
			}
		}
	}
	return false;
},
		
moveDown:function(){
	if(this.canDown()){
		for(var col=0;col<4;col++){
			this.moveDownInCol(col);
			}
		this.randomNum();
		this.updateView();
	}	
},
moveDownInCol:function(col){
	for(row=3;row>0;row--){
		var NextRow=this.getNextUp(row,col);
		if(NextRow==-1){
			break;
		}else{
			if(this.data[row][col]==0){
				this.data[row][col]=this.data[NextRow][col];
				this.data[NextRow][col]=0;
				row++;
			}else if(this.data[row][col]==this.data[NextRow][col]){
				this.data[row][col]*=2;
				this.score+=this.data[row][col];
				this.data[NextRow][col]=0;
			}	
		}
	}
},
getNextUp:function(row,col){
	for(var i=row-1;i>=0;i--){
		if(this.data[i][col]!=0){
				return i;
			}
		}
	return -1;
},
isGameOver:function(){//判断游戏是否结束
	/*能继续时返回false，否则返回true*/
		/*已经满了*/
		for(var row=0;row<4;row++){
			for(var col=0;col<4;col++){
				if(this.data[row][col]==0){
					return false;
					}
				if(col<3){/*检查右侧相邻*/
					if(this.data[row][col]==this.data[row][col+1]){
						return false;
					}
				}
				if(row<3){/*检查下方相邻*/
					if(this.data[row][col]==this.data[row+1][col]){
						return false;
					}	
				}	
			}	
		}
		return true;
	}
}


//当窗口加载后，调用game对象的start方法
window.onload=function(){//事件处理函数
	game.start();
	document.onkeydown=function(){
		//Step1：先活动事件对象！
//所有事件发生时，都自动创建一个event对象
//event对象中封装了事件信息：
//比如：鼠标坐标，触发事件的元素，按键的编号
		if(game.state==game.RUNNING){
        var event=window.event||arguments[0];
		            //IE          其它
		//||经常用于解决浏览器兼容性问题
		//Step2: 获得事件对象中的按键编号
		//如果是37号，就调用moveLeft
			if(event.keyCode==37){
				game.moveLeft();
			}
			else if(event.keyCode==39){
				game.moveRight();	
			}
			else if(event.keyCode==38){
				game.moveUp();	
			}
			else if(event.keyCode==40){
				game.moveDown();	
			}
		}else if(event.keyCode==13){
			game.start();
			}
	}
}