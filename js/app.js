function Papaya(canvas,textCanvas,width,height){
	this.canvas = document.getElementById(canvas);
	this.context = this.canvas.getContext('2d');
	this.sceenObject = {};
	this.sceenWidth = width;
	this.sceenHeight = height;
	this.k = innerWidth/width;
	this.menuArr = [];
	
	this.source;
	this.arrObjName = [];
  this.images = {};
  this.loadedImages = 0;
  this.numImages = 0;
	this.arrowAnimI = 0;
	window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
    };
   })();
};
Papaya.prototype.canvasSetSize = function(){
		this.canvas.width = this.sceenWidth*this.k;
		this.canvas.height = this.sceenHeight*this.k;
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
		this.context.drawImage(
									this.images[name], 
									this.sceenObject[name].posX, 
									this.sceenObject[name].posY, 
									this.sceenObject[name].width, 
									this.sceenObject[name].height);
   
}

Papaya.prototype.sceenObjectGet = function(){
	
}

Papaya.prototype.sceenObjectAdd = function(obj){

		obj.width *= this.k;
		obj.height *= this.k;

		obj.posX *= this.k;
		obj.posY *= this.k;

	this.sceenObject[obj.name] = obj;
	
	
};
Papaya.prototype.menuAdd = function(name,x,y,text){
    this.context.font = 'bold '+14*this.k+'pt Calibri';
		this.context.fillText(text, this.sceenObject[name].posX+x*this.k, this.sceenObject[name].posY+y*this.k);
		this.menuArr.push(name);
}
Papaya.prototype.menuEvent = function(event,callback){
	var self = this;
	var x = event.clientX;
	var y = event.clientY;
	var objX;
	var objY;
	var objYend;
	var objXend;
	document.body.style.cursor = '';
	for(var i = 0; self.menuArr.length>i;i++){
		var objX = self.sceenObject[self.menuArr[i]].posX+10;
		var objY = self.sceenObject[self.menuArr[i]].posY;
		var objYend = Math.abs(objY + self.sceenObject[self.menuArr[i]].height-120);
		var objXend = Math.abs(objX + self.sceenObject[self.menuArr[i]].width-40);
			
			if((x>=objX && x<=objXend) && (y>=objY && y<=objYend)){
				callback(self.sceenObject[self.menuArr[i]]);
				document.body.style.cursor = 'pointer';
			}
	}
	
				
};
Papaya.prototype.boatAnim = function (){
	var self = this;
	self.sceenObject['boat'].posX-=0.5*self.k;
		if(self.sceenObject['boat'].posX<0)
			self.sceenObject['boat'].posX = self.canvas.width;
	

}
Papaya.prototype.menuAnim = function(name){
var self = this;

}
Papaya.prototype.arrowAnim = function(start){
		//this.sceenObject['arrow'].width+=delta;
		//this.sceenObject['arrow'].height+=delta;



}
Papaya.prototype.animation = function(startTime){
	var self = this;
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	
	this.boatAnim();
	this.arrowAnim(startTime);
	
	this.imageDraw('bg-sceen');
	this.imageDraw('boat');
	this.imageDraw('bungalo');
	this.imageDraw('forest');
	this.imageDraw('logo');
	this.imageDraw('sunduk');
	this.imageDraw('arrow');
/*start totem*/
	this.imageDraw('totem-about');
	this.imageDraw('totem-bar-and-cuhnya');
	this.imageDraw('totem-galery');
	this.imageDraw('totem-events');
	this.imageDraw('totem-reviews');
	this.imageDraw('totem-menu');
	this.imageDraw('totem-sovety');
	this.imageDraw('totem-contact');
/*end totem*/	
	this.imageDraw('tablichka');
	this.imageDraw('girl');
	this.imageDraw('palmy-right');
	/*
	this.menuAdd("totem-about",62,208,"О БАРЕ");
	this.menuAdd("totem-bar-and-cuhnya",62,180,"БАР И");
	this.menuAdd("totem-bar-and-cuhnya",58,200,"КУХНЯ");
	this.menuAdd("totem-events",43,163,"МЕРО-");
	this.menuAdd("totem-events",30,180,"ПРИЯТИЯ");
	this.menuAdd("totem-galery",30,190,"ГАЛЕРЕЯ");	
*/
	requestAnimFrame(function() {
          self.animation(startTime);
        });
}
Papaya.prototype.run = function(){
		var self = this;
		this.canvasSetSize();
		self.canvas.onclick=function(event){
			self.menuEvent(event,function(element){
				window.location.href=element.url;
			});
		};
		
		self.canvas.onmousemove = function(event){
			self.menuEvent(event,function(element){
			});
		};
		
		self.sceenObjectAdd({
													name:'totem-about',
													src:'/images/totem-about.png',
													url:'/#',
													width:157,
													height:391,
													posY:400,
													posX:380,
													weight:1,
													});
		self.sceenObjectAdd({
													name:'totem-bar-and-cuhnya',
													url:'/#2',
													src:'/images/bar-and-cuhnya.png',
													width:147,
													height:399,
													posY:360,
													posX:520,
													weight:1,
													});
		self.sceenObjectAdd({
													name:'totem-events',
													url:'/#3',
													src:'/images/totem-events.png',
													width:147,
													height:399,
													posY:350,
													posX:660,
													weight:1,
													});													
		self.sceenObjectAdd({
													name:'totem-galery',
													url:'/#4',
													src:'/images/totem-galery.png',
													width:143,
													height:433,
													posY:340,
													posX:760,
													weight:1,
													});
		self.sceenObjectAdd({
													name:'totem-reviews',
													url:'/#5',
													src:'/images/totem-reviews.png',
													width:151,
													height:404,
													posY:330,
													posX:1362,
													weight:1,
													});		
		self.sceenObjectAdd({
													name:'totem-menu',
													url:'/#6',
													src:'/images/totem-menu.png',
													width:143,
													height:431,
													posY:348,
													posX:1491,
													weight:1,
													});	
		self.sceenObjectAdd({
													name:'totem-sovety',
													url:'/#7',
													src:'/images/totem-sovety.png',
													width:148,
													height:407,
													posY:350,
													posX:1601,
													weight:1,
													});		
		self.sceenObjectAdd({
													name:'totem-contact',
													url:'/#7',
													src:'/images/totem-contact.png',
													width:157,
													height:390,
													posY:387,
													posX:1734,
													weight:1,
													});														
		self.sceenObjectAdd({
													name:'forest',
													src:'/images/forest.png',
													width:2048,
													height:460,
													posY:750,
													posX:0,
													weight:1,
													});	
		self.sceenObjectAdd({
													name:'bungalo',
													src:'/images/bungalo.png',
													width:513,
													height:964,
													posY:0,
													posX:0,
													weight:1,
													});	
		self.sceenObjectAdd({
													name:'logo',
													src:'/images/logo.png',
													width:462,
													height:461,
													posY:240,
													posX:905,
													weight:1,
													});
		self.sceenObjectAdd({
													name:'tablichka',
													src:'/images/tablichka.png',
													width:320,
													height:444,
													posY:660,
													posX:720,
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
													posX:1510,
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
													name:'arrow',
													src:'/images/arrow.png',
													width:75,
													height:85,
													posY:690,
													posX:1345,
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
	
	
	
	

	self.loadImages(function(){
		self.animation((new Date()).getTime()); 
	 });
	
	
};

