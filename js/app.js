function Papaya(canvas,textCanvas,width,height){
	this.canvas = document.getElementById(canvas);
	this.context = this.canvas.getContext('2d');
	this.sceenObject = {};
	this.sceenWidth = width;
	this.sceenHeight = height;
	this.k = innerWidth/width;
	this.menuArr = [];
	this.fps = 20;
	if(window.mozRequestAnimationFrame!==undefined)
		this.fps = 80;
				
	this.source;
	this.arrObjName = [];
  this.images = {};
  this.loadedImages = 0;
  this.numImages = 0;
	this.arrowAnimI = 0;
	this.buff = {name:null};
	this.time = 0;
	this.c = {};
	window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 10);
    };
   })();
};
Papaya.textMenuColorDefault = "black";
Papaya.textMenuColorHover = "red";
Papaya.prototype.canvasSetSize = function(){
		this.canvas.width = innerWidth;
		this.canvas.height = innerHeight-5;
};
Papaya.prototype.sorting = function(){
	var self = this;
	var sorted = {};
	var keysSorted = Object.keys(self.sceenObject).sort(function(a,b){
			return self.sceenObject[a].weight-self.sceenObject[b].weight;
	});
	
	for(var i=0;keysSorted.length>i;i++){
		sorted[keysSorted[i]] =  self.sceenObject[keysSorted[i]];
	}
	return sorted;
}
Papaya.prototype.loadImages = function(callback) {
	var self = this;
	for(var objName in this.sceenObject){
		self.arrObjName.push(objName);
	}
   for(var name in this.sceenObject) {
		if(self.sceenObject[name].src==undefined)
			continue;
    self.images[name] = new Image();
    self.images[name].onload = function() {
      if(++self.loadedImages >= self.arrObjName.length) {
        callback();
			}
		};

		self.images[name].src = self.sceenObject[name].src;
	}

};
Papaya.prototype.imageDraw = function(name){
	this.context.save();
	if(this.sceenObject[name].sku!==undefined){
		this.context.transform(this.sceenObject[name].sku.m11, 
													this.sceenObject[name].sku.m12, 
													this.sceenObject[name].sku.m21, 
													this.sceenObject[name].sku.m22, 
													this.sceenObject[name].sku.dx*this.k, 
													this.sceenObject[name].sku.dy*this.k);
	}
		if(this.sceenObject[name].cut!=undefined){
			this.context.drawImage(
									this.images[name], 
									0, 
									this.sceenObject[name].cut.h, 
									this.sceenObject[name].width/this.k, 
									this.sceenObject[name].h-this.sceenObject[name].h/2,
									this.sceenObject[name].posX,
									this.sceenObject[name].posY,
									this.sceenObject[name].width, 
									this.sceenObject[name].height/2
									)
		}else{
		this.context.drawImage(
									this.images[name], 
									this.sceenObject[name].posX, 
									this.sceenObject[name].posY, 
									this.sceenObject[name].width, 
									this.sceenObject[name].height);
		}
		if(this.sceenObject[name].text!==undefined){
			for(var i =0;this.sceenObject[name].text.length>i;i++){
			if(this.sceenObject[name].name == 'tablichka'){
				this.context.rotate(Math.PI/-300);
			}
				
				
			this.context.font = this.sceenObject[name].text[i].type+' '+this.sceenObject[name].text[i].size*this.k+'pt Calibri';
			this.context.fillStyle = this.sceenObject[name].text[i].color;
			this.context.fillText(this.sceenObject[name].text[i].value, 
													this.sceenObject[name].posX+this.sceenObject[name].text[i].x*this.k, 
													this.sceenObject[name].posY+this.sceenObject[name].text[i].y*this.k
													);
			}

		}
   this.context.restore();
}

Papaya.prototype.sceenObjectGet = function(){
	
}

Papaya.prototype.sceenObjectAdd = function(obj){

		obj.width *= this.k;
		obj.height *= this.k;
		obj.posX *= this.k;
		obj.posY *= this.k;
	this.sceenObject[obj.name] = obj;
	if(obj.url!==undefined)
		this.menuArr.push(obj.name);
		this.c[obj.name] = obj
	
	
};
Papaya.prototype.tablichkaTextDraw = function(x,y,text,size,type){

	this.context.save();
	this.context.transform(1,-0.015,0,1,0,0);
	//this.context.rotate(Math.PI/900);
  this.context.font = type+' '+Math.floor(size*this.k)+'pt Helvetica';
	this.context.fillStyle = '#4F0D0D';
	this.context.fillText(text, this.sceenObject['tablichka'].posX+x*this.k, this.sceenObject['tablichka'].posY+y*this.k);
	this.context.restore();

}
Papaya.prototype.menuEvent = function(event,callback){
	var self = this;
	var x = event.clientX - canvas.getBoundingClientRect().left;
	var y = event.clientY - canvas.getBoundingClientRect().top;
	var objX;
	var objY;
	var objYend;
	var objXend;
	self.sceenObject['totem-about'].text[0].color = this.textMenuColorDefault;
	self.sceenObject['totem-bar-and-cuhnya'].text[0].color = this.textMenuColorDefault;
	self.sceenObject['totem-bar-and-cuhnya'].text[1].color = this.textMenuColorDefault;
	self.sceenObject['totem-events'].text[0].color = this.textMenuColorDefault;
	self.sceenObject['totem-events'].text[1].color = this.textMenuColorDefault;
	self.sceenObject['totem-galery'].text[0].color = this.textMenuColorDefault;
	self.sceenObject['totem-reviews'].text[0].color = this.textMenuColorDefault;
	self.sceenObject['totem-sovety'].text[0].color = this.textMenuColorDefault;
	self.sceenObject['totem-sovety'].text[1].color = this.textMenuColorDefault;
	self.sceenObject['totem-menu'].text[0].color = this.textMenuColorDefault;
	self.sceenObject['totem-contact'].text[0].color = this.textMenuColorDefault;
	if(self.buff.name!==null&&self.sceenObject[self.buff.name].cut!==undefined)
		self.sceenObject[self.buff.name].cut.h = self.buff.cut.h;
	document.body.style.cursor = '';
	for(var i = 0; self.menuArr.length>i;i++){
		objX = self.sceenObject[self.menuArr[i]].posX+self.sceenObject[self.menuArr[i]].bound.xStart*this.k;
		objY = self.sceenObject[self.menuArr[i]].posY+self.sceenObject[self.menuArr[i]].bound.yStart*this.k;
		objXend = Math.abs(objX + self.sceenObject[self.menuArr[i]].width+self.sceenObject[self.menuArr[i]].bound.xEnd*this.k);
		objYend = Math.abs(objY + self.sceenObject[self.menuArr[i]].height+self.sceenObject[self.menuArr[i]].bound.yEnd*this.k);
			if((x>=objX && x<=objXend) && (y>=objY && y<=objYend)){
				callback(self.sceenObject[self.menuArr[i]]);
				document.body.style.cursor = 'pointer';
				
			}
					
	}
	
				
};

Papaya.prototype.boatAnim = function (dt){
	var self = this;


	self.sceenObject['boat'].posX-=dt/100*this.k;
		if(self.sceenObject['boat'].posX<0){
			self.sceenObject['boat'].posX = self.canvas.width;
			//dt = 0;
		}

}
/*
Papaya.prototype.menuAnim = function(status,name){
	this.menuAdd("totem-about",62,208,"О БАРЕ");

		var self = this;
    this.context.font = 'bold '+14+'pt Calibri';
		this.context.fillText('test', 100, 100);
}
*/
		
Papaya.arrow = {angle:0,xScale:0,yScale:0,xOffset:0,yOffset:0,name : 'arrow'};

Papaya.prototype.arrowAnim = function(dt){
	var p =32;
	//console.log(dt/-100);

	//console.log(dt/-100);

	
	Papaya.arrow.xScale = Math.abs(Math.sin(Papaya.arrow.angle*this.k));
	Papaya.arrow.	yScale = Math.abs(Math.sin(Papaya.arrow.angle*this.k));	
	
	if(Papaya.arrow.xScale<0.7 || Papaya.arrow.yScale<0.7){
		Papaya.arrow.xScale = 0.7;
		Papaya.arrow.yScale = 0.7;
	}
	
	//xScale = 0.8;
	//yScale = 0.8;
	Papaya.arrow.xOffset = this.sceenObject[Papaya.arrow.name].width / -2;
	Papaya.arrow.yOffset = this.sceenObject[Papaya.arrow.name].height / -2;

	this.context.save();
	this.context.translate(this.sceenObject[Papaya.arrow.name].posX-this.sceenObject[Papaya.arrow.name].width/2,
												this.sceenObject[Papaya.arrow.name].posY+this.sceenObject[Papaya.arrow.name].height/2);
	this.context.scale(Papaya.arrow.xScale, Papaya.arrow.yScale);
	if(window.mozRequestAnimationFrame==undefined)
		 p = 64;
	Papaya.arrow.angle += Math.PI/p;

	this.context.drawImage(
									this.images[Papaya.arrow.name], 
									Papaya.arrow.xOffset, 
									Papaya.arrow.yOffset, 
									this.sceenObject[Papaya.arrow.name].width, 
									this.sceenObject[Papaya.arrow.name].height);
	this.context.restore();

}

Papaya.glaz = {angle:0,xScale:0,yScale:0,xOffset:0,yOffset:0,name : 'glaz',bi:0};

Papaya.prototype.glazAnim = function(start){

	Papaya.glaz.xScale = Math.abs(Math.sin(Papaya.glaz.angle));
	Papaya.glaz.yScale = Math.abs(Math.sin(Papaya.glaz.angle));

	//xScale = 0.8;
	//yScale = 0.8;
	Papaya.glaz.xOffset = this.sceenObject[Papaya.glaz.name].width / -2;
	Papaya.glaz.yOffset = this.sceenObject[Papaya.glaz.name].height / -2;

	this.context.save();
	this.context.translate(this.sceenObject[Papaya.glaz.name].posX-this.sceenObject[Papaya.glaz.name].width/2,
												this.sceenObject[Papaya.glaz.name].posY+this.sceenObject[Papaya.glaz.name].height/2);
	Papaya.glaz.angle += Math.PI/32*this.k;
	
			Papaya.glaz.bi++;
		if(Papaya.glaz.bi>100){
			this.context.transform(1, -0.3, 0.2, 1, 0, 0);
			this.context.scale(-1,1);
			if(Papaya.glaz.bi==145){
				Papaya.glaz.bi = 0;
					
			}
		}

		this.context.transform(1, 0, 0, 1, 0, 0);
		this.context.scale(1,1);
	this.context.drawImage(
									this.images[Papaya.glaz.name], 
									Papaya.glaz.xOffset, 
									Papaya.glaz.yOffset, 
									this.sceenObject[Papaya.glaz.name].width, 
									this.sceenObject[Papaya.glaz.name].height);
	this.context.restore();

}

Papaya.blick = {angle:0.5,xScale:0,yScale:0,xOffset:0,yOffset:0,bi:0,name : 'blick'};
Papaya.prototype.blickAnim = function(start){
		Papaya.blick.bi++;
		if(Papaya.blick.bi>200){
			if(Papaya.blick.bi==245){
				Papaya.blick.bi = 0;
				 Papaya.blick.angle = 0.5;
				 Papaya.blick.xScale = 0;
				 Papaya.blick.yScale = 0 ;
				 Papaya.blick.xOffset = 0;
				 Papaya.blick.yOffset  = 0;
			}
		}else{
			return;
		}
	Papaya.blick.xScale = Math.abs(Math.sin(Papaya.blick.angle));
	Papaya.blick.	yScale = Math.abs(Math.sin(Papaya.blick.angle));
	if(Papaya.blick.xScale<0.2 || Papaya.blick.yScale<0.2){
		Papaya.blick.xScale = 0.2;
		Papaya.blick.yScale = 0.2;
	}

	//xScale = 0.8;
	//yScale = 0.8;
	Papaya.blick.xOffset = this.sceenObject[Papaya.blick.name].width / -2;
	Papaya.blick.yOffset = this.sceenObject[Papaya.blick.name].height / -2;

	this.context.save();
	this.context.translate(this.sceenObject[Papaya.blick.name].posX-this.sceenObject[Papaya.blick.name].width/2,
												this.sceenObject[Papaya.blick.name].posY+this.sceenObject[Papaya.blick.name].height/2);
	this.context.scale(Papaya.blick.xScale, Papaya.blick.yScale);
	this.context.rotate(Papaya.blick.angle);
	Papaya.blick.angle += Math.PI/64*this.k;
	
	this.context.drawImage(
									this.images[Papaya.blick.name], 
									Papaya.blick.xOffset, 
									Papaya.blick.yOffset, 
									this.sceenObject[Papaya.blick.name].width, 
									this.sceenObject[Papaya.blick.name].height);
	this.context.restore();

}
Papaya.prototype.clone = function(obj)
{
    if(obj == null || typeof(obj) != 'object')
    {
        return obj;
    }
    var temp = {};
    for(var key in obj)
    {
        temp[key] = this.clone(obj[key]);
    }
    return temp;
}
var time;
Papaya.prototype.animation = function(startTime){
	var now = new Date().getTime(),
	dt = now - (time || now);
	

	var self = this;
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	
	this.boatAnim(dt);
	
	
	this.imageDraw('bg-sceen');
	this.imageDraw('boat');
	this.imageDraw('bungalo');
	this.imageDraw('forest');
	this.imageDraw('logo');
	this.imageDraw('sunduk');
	this.glazAnim();
	this.arrowAnim(dt);
	//this.imageDraw('arrow');
/*start totem*/
	this.imageDraw('totem-about');
	this.imageDraw('totem-about-ico');
	this.imageDraw('totem-bar-and-cuhnya');
	this.imageDraw('totem-bar-and-cuhnya-ico');
	this.imageDraw('totem-galery');
	this.imageDraw('totem-galery-ico');
	this.imageDraw('totem-events');
	this.imageDraw('totem-events-ico');
	this.imageDraw('totem-reviews');
	this.imageDraw('totem-reviews-ico');
	this.imageDraw('totem-menu');
	this.imageDraw('totem-menu-ico');
	this.imageDraw('totem-sovety');
	this.imageDraw('totem-sovety-ico');
	this.imageDraw('totem-contact');
	this.imageDraw('totem-contact-ico');
	
	this.imageDraw('bird');
/*end totem*/	
	this.imageDraw('tablichka');
	//this.textDraw('tablichka-text');
	this.imageDraw('afisha');
	this.imageDraw('girl');
	this.blickAnim();
	this.imageDraw('palmy-right');
	this.imageDraw('palmy-left');

	time = now;
	requestAnimFrame(function() {
					 self.animation(startTime);     
        });

}
Papaya.prototype.run = function(){
		var buff = null;
		var self = this;

		self.canvas.onclick=function(event){
			
			self.menuEvent(event,function(element){
				window.location.href=element.url;
			});
		};
		self.canvas.onmousemove = function(event){

			self.menuEvent(event,function(element){
					self.buff = self.clone(element);
			if(element.text!==undefined){
				for(var i = 0;element.text.length>i;i++){
					element.text[i].color = element.text[i].hover;
				}
			}
			if(element.cut!==undefined){
				element.cut.h =element.h/2;
			}
			});
		};

		self.sceenObjectAdd({
													name:'totem-about',
													src:'/images/totem-about.png',
													url:'/#',
													width:157,
													height:391,
													posY:400,
													posX:280,
													weight:1,
													text:[
														{
															color:'black',
															hover:'red',
															value:'О БАРЕ',
															size:14,
															type:'bold',
															x:62,
															y:200,		
														},
													],
													bound:{
														xStart:40,
														xEnd:-52,
														yStart:0,
														yEnd:-60,
													}
													});
		self.sceenObjectAdd({
													name:'totem-about-ico',
													src:'/images/totem-about-ico.png',
													url:'',
													width:45,
													height:115,
													h:115,
													posY:520,
													posX:350,
													weight:1,

													bound:{
														xStart:-30,
														xEnd:60,
														yStart:-120,
														yEnd:210,
													},
													cut:{
														h:0,
														x:3,
														y:3,
														hd:3,
														wd:3,
													}
													});
		self.sceenObjectAdd({
													name:'totem-bar-and-cuhnya',
													url:'/#2',
													src:'/images/bar-and-cuhnya.png',
													width:147,
													height:399,
													posY:360,
													posX:420,
													weight:1,
													bound:{
														xStart:20,
														xEnd:-30,
														yStart:0,
														yEnd:-100,
													},
													text:[
														{
															color:'black',
															hover:'red',
															value:'БАР',
															size:14,
															type:'bold',
															x:69,
															y:200,		
														},
														{
															color:'black',
															hover:'red',
															value:'И КУХНЯ',
															size:14,
															type:'bold',
															x:50,
															y:180,		
														},
													],
													});
		self.sceenObjectAdd({
													name:'totem-bar-and-cuhnya-ico',
													src:'/images/bar-and-cuhnya-ico.png',
													url:'',
													width:44,
													height:98,
													h:98,
													posY:470,
													posX:483,
													weight:1,

													bound:{
														xStart:-43,
														xEnd:73,
														yStart:-110,
														yEnd:200,
													},
													cut:{
														h:0,
														x:4,
														y:1,
														hd:0,
														wd:0
													}
													});

		self.sceenObjectAdd({
													name:'totem-events',
													url:'/#3',
													src:'/images/totem-events.png',
													width:147,
													height:399,
													posY:350,
													posX:560,
													weight:1,
													bound:{
														xStart:20,
														xEnd:-60,
														yStart:0,
														yEnd:-120,
													},
													text:[
														{
															color:'black',
															hover:'red',
															value:'МЕРО-',
															size:14,
															type:'bold',
															x:40,
															y:160,		
														},
														{
															color:'black',
															hover:'red',
															value:'ПРИЯТИЯ',
															size:14,
															type:'bold',
															x:30,
															y:180,		
														},
													],
													});	
		self.sceenObjectAdd({
													name:'totem-events-ico',
													src:'/images/totem-events-ico.png',
													url:'',
													width:58,
													h:97,
													height:97,
													posY:445,
													posX:600,
													weight:1,

													bound:{
														xStart:-20,
														xEnd:30,
														yStart:-95,
														yEnd:180,
													},
													cut:{
														h:0,
														x:3,
														y:2,
														hd:0,
														wd:0
													}
													});													
		self.sceenObjectAdd({
													name:'totem-galery',
													url:'/#4',
													src:'/images/totem-galery.png',
													width:143,
													height:433,
													posY:340,
													posX:660,
													weight:1,
													bound:{
														xStart:20,
														xEnd:-40,
														yStart:0,
														yEnd:-150,
													},
													text:[
														{
															color:'black',
															hover:'red',
															value:'ГАЛЕРЕЯ',
															size:14,
															type:'bold',
															x:40,
															y:180,		
														},
													]
													});
		self.sceenObjectAdd({
													name:'totem-galery-ico',
													src:'/images/totem-galery-ico.png',
													url:'',
													width:59,
													h:87,
													height:87,
													posY:450,
													posX:700,
													weight:1,

													bound:{
														xStart:-20,
														xEnd:43,
														yStart:-95,
														yEnd:180,
													},
													cut:{
														h:0,
														x:3,
														y:2,
														hd:0,
														wd:0
													}
													});	
		self.sceenObjectAdd({
													name:'totem-reviews',
													url:'/#5',
													src:'/images/totem-reviews.png',
													width:151,
													height:404,
													posY:330,
													posX:1227,
													weight:1,
													bound:{
														xStart:30,
														xEnd:-50,
														yStart:-10,
														yEnd:-100,
													},
													text:[
														{
															color:'black',
															hover:'red',
															value:'ОТЗЫВЫ',
															size:14,
															type:'bold',
															x:48,
															y:180,		
														},
													]
													});		
		self.sceenObjectAdd({
													name:'totem-reviews-ico',
													src:'/images/totem-reviews-ico.png',
													url:'',
													width:52,
													h:97,
													height:97,
													posY:440,
													posX:1285,
													weight:1,

													bound:{
														xStart:-20,
														xEnd:43,
														yStart:-120,
														yEnd:207,
													},
													cut:{
														h:0,
														x:3,
														y:2,
														hd:0,
														wd:0
													}
													});	
		self.sceenObjectAdd({
													name:'totem-menu',
													url:'/#6',
													src:'/images/totem-menu.png',
													width:143,
													height:431,
													posY:348,
													posX:1356,
													weight:1,
													bound:{
														xStart:30,
														xEnd:-50,
														yStart:-8,
														yEnd:-140,
													},
													text:[
														{
															color:'black',
															hover:'red',
															value:'МЕНЮ',
															size:14,
															type:'bold',
															x:53,
															y:184,		
														},
													]
													});	
		self.sceenObjectAdd({
													name:'totem-menu-ico',
													src:'/images/totem-menu-ico.png',
													url:'',
													width:53,
													h:105,
													height:105,
													posY:460,
													posX:1410,
													weight:1,

													bound:{
														xStart:-25,
														xEnd:40,
														yStart:-120,
														yEnd:185,
													},
													cut:{
														h:0,
														x:3,
														y:2,
														hd:0,
														wd:0
													}
													});	
		self.sceenObjectAdd({
													name:'totem-sovety',
													url:'/#7',
													src:'/images/totem-sovety.png',
													width:148,
													height:407,
													posY:350,
													posX:1466,
													weight:1,
													bound:{
														xStart:30,
														xEnd:-50,
														yStart:-8,
														yEnd:-120,
													},
													text:[
														{
															color:'black',
															hover:'red',
															value:'ПОЛЕЗНЫЕ-',
															size:14,
															type:'bold',
															x:37,
															y:185,		
														},
														{
															color:'black',
															hover:'red',
															value:'СОВЕТЫ',
															size:14,
															type:'bold',
															x:53,
															y:200,		
														},
													]
													
													});	
		self.sceenObjectAdd({
													name:'totem-sovety-ico',
													src:'/images/totem-sovety-ico.png',
													url:'',
													width:56,
													h:99,
													height:99,
													posY:470,
													posX:1520,
													weight:1,

													bound:{
														xStart:-25,
														xEnd:40,
														yStart:-130,
														yEnd:190,
													},
													cut:{
														h:0,
														x:3,
														y:2,
														hd:0,
														wd:0
													}
													});														
		self.sceenObjectAdd({
													name:'totem-contact',
													url:'/#7',
													src:'/images/totem-contact.png',
													width:157,
													height:390,
													posY:387,
													posX:1599,
													weight:1,
													bound:{
														xStart:30,
														xEnd:-50,
														yStart:-8,
														yEnd:-120,
													},
													text:[
														{
															color:'black',
															hover:'red',
															value:'КОНТАКТЫ',
															size:14,
															type:'bold',
															x:47,
															y:195,		
														}
													]
													});	
		self.sceenObjectAdd({
													name:'totem-contact-ico',
													src:'/images/totem-contact-ico.png',
													url:'',
													width:37,
													h:101,
													height:101,
													posY:515,
													posX:1670,
													weight:1,

													bound:{
														xStart:-41,
														xEnd:70,
														yStart:-134,
														yEnd:164,
													},
													cut:{
														h:0,
														x:3,
														y:2,
														hd:0,
														wd:0
													}
													});	
		self.sceenObjectAdd({
													name:'bird',
													src:'/images/bird.png',
													width:228,
													height:320,
													posY:740,
													posX:300,
													weight:1,
													});														
		self.sceenObjectAdd({
													name:'forest',
													src:'/images/forest.png',
													width:2048,
													height:460,
													posY:740,
													posX:0,
													weight:1,
													});	
		self.sceenObjectAdd({
													name:'palmy-left',
													src:'/images/palmy-left.png',
													width:513,
													height:818,
													posY:0,
													posX:0,
													weight:1,
													});	
		self.sceenObjectAdd({
													name:'afisha',
													src:'/images/afisha.png',
													width:180,
													height:180,
													posY:345,
													posX:64,
													weight:1,
													bound:{
														xStart:0,
														xEnd:0,
														yStart:0,
														yEnd:0,
													},
													url:'#afisha',
													text:[
														{
															color:'#ffffff',
															hover:'red',
															value:'',
															size:14,
															type:'bold',
															y:40,
															x:20,		
														}
													],
													sku:{
														m11:1, 
														m12:-0.115, 
														m21:0.07, 
														m22:1, 
														dx:-40, 
														dy:0
													}
													});	
		self.sceenObjectAdd({
													name:'bungalo',
													src:'/images/bungalo.png',
													width:370,
													height:874,
													posY:0,
													posX:-20,
													weight:1,
													});	
		self.sceenObjectAdd({
													name:'logo',
													src:'/images/logo.png',
													width:412,
													height:391,
													posY:260,
													posX:813,
													weight:1,
													});
		self.sceenObjectAdd({
													name:'tablichka',
													url:'test',
													src:'/images/tablichka.png',
													width:320,
													height:444,
													posY:670,
													posX:720,
													weight:1,
													bound:{
														xStart:0,
														xEnd:0,
														yStart:30,
														yEnd:-300,
													},
													text:[
														{
															color:'#800000',
															hover:'#800000',
															value:'Работаем с 10:00 до 3:00',
															size:14,
															type:'normal',
															y:108,
															x:90,		
														},
														{
															color:'#800000',
															hover:'#800000',
															value:'+7(909) 123-45-67-8',
															size:18,
															type:'bold',
															y:85,
															x:90,		
														}
													],
													});	

		self.sceenObjectAdd({
													name:'blick',
													src:'/images/blick.png',
													width:56,
													height:50,
													posY:720,
													posX:1718,
													weight:1,
													});													
		self.sceenObjectAdd({
													name:'girl',
													src:'/images/girl.png',
													width:583,
													height:658,
													posY:520,
													posX:1380,
													weight:1,
													});	
		self.sceenObjectAdd({
													name:'palmy-right',
													src:'/images/palmy-right.png',
													width:545,
													height:702,
													posY:0,
													posX:1540,
													weight:1,
													});
		self.sceenObjectAdd({
													name:'sunduk',
													src:'/images/sunduk.png',
													width:373,
													height:258,
													posY:755,
													posX:1050,
													weight:1,
													});	
		self.sceenObjectAdd({
													name:'glaz',
													src:'/images/glaz.png',
													width:53,
													height:37,
													posY:840,
													posX:1265,
													weight:1,
													});
		self.sceenObjectAdd({
													name:'arrow',
													src:'/images/arrow.png',
													width:75,
													height:85,
													posY:670,
													posX:1378,
													weight:1,
													});	
													
		self.sceenObjectAdd({
													name:'boat',
													src:'/images/boat.png',
													width:90,
													height:83,
													posY:150,
													posX:680,
													weight:1,
													});														
													
		self.sceenObjectAdd({
													weight:0,
													name:'bg-sceen',
													src:'/images/bg-sceen.jpg',
													width:2048,
													height:1200,
													posX:0,
													posY:0});
		

		
		


		

	
//***********************************************************//
  //this.imageDraw('boat');
	//self.imageDraw('totem-about');
	//self.imageDraw('totem-bar-and-cuhnya');
	//self.imageDraw('totem-events');
	//self.imageDraw('totem-galery');
	//self.imageDraw('bg-sceen');
	
	
	
	
		this.canvasSetSize();
	self.loadImages(function(){
		self.animation((new Date()).getTime()); 
	 });
};
