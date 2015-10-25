function Papaya(canvas,textCanvas,width,height){
	this.canvas = document.getElementById(canvas);
	this.context = this.canvas.getContext('2d');
	this.canvasText = document.getElementById(textCanvas);
	this.contextText = this.canvasText.getContext('2d');
	this.sceenObject = {};
	this.sceenWidth = width;
	this.sceenHeight = height;
	this.k = innerWidth/width;
	this.menuArr = [];
};
Papaya.prototype.canvasSetSize = function(){
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight-5;
		this.canvasText.width = window.innerWidth;
		this.canvasText.height = window.innerHeight-5;
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
	var source;
	var arrObjName = [];
  var images = {};
  var loadedImages = 0;
  var numImages = 0;
	
	for(var objName in this.sceenObject){
		arrObjName.push(objName);
	}
   for(var name in this.sceenObject) {
    images[name] = new Image();
    images[name].onload = function() {
      if(++loadedImages >= arrObjName.length) {
        callback(images);
			}
		};
		images[name].src = this.sceenObject[name].src;
	}
};
Papaya.prototype.imageDraw = function(name){
	var self = this;
	var imageObj = new Image();
      imageObj.onload = function() {
        		self.context.drawImage(
									imageObj, 
									self.sceenObject[name].posX, 
									self.sceenObject[name].posY, 
									self.sceenObject[name].width, 
									self.sceenObject[name].height);
      };
    imageObj.src = self.sceenObject[name].src;

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
    this.contextText.font = 'bold '+14*this.k+'pt Calibri';
		this.contextText.fillText(text, this.sceenObject[name].posX+x*this.k, this.sceenObject[name].posY+y*this.k);
		this.menuArr.push(name);
}
Papaya.prototype.menuEvent = function(event,callback){
	var self = this;
	var rect = self.canvasText.getBoundingClientRect();
	var x = event.clientX;
	var y = event.clientY;
	var objX;
	var objY;
	var objYend;
	var objXend;
	for(var i = 0; self.menuArr.length>i;i++){
		var objX = self.sceenObject[self.menuArr[i]].posX+10;
		var objY = self.sceenObject[self.menuArr[i]].posY+10;
		var objYend = objY + self.sceenObject[self.menuArr[i]].height-70;
		var objXend = objX + self.sceenObject[self.menuArr[i]].width-40;
			if((x>=objX && x<=objXend) && (y>=objY && y<=objYend))
				callback(self.sceenObject[self.menuArr[i]]);
	}
	
				
};
Papaya.prototype.run = function(){
		var self = this;
		this.canvasSetSize();
		self.canvasText.onclick=function(event){
			self.menuEvent(event,function(element){
				console.log(element);
				window.location.href=element.url;
			});
		}
		
		self.sceenObjectAdd({
													name:'totem-about',
													src:'/images/totem-about.png',
													url:'/#',
													width:157,
													height:391,
													posY:400,
													posX:400,
													weight:1,
													});
		self.sceenObjectAdd({
													name:'totem-bar-and-cuhnya',
													url:'/#2',
													src:'/images/bar-and-cuhnya.png',
													width:147,
													height:399,
													posY:360,
													posX:540,
													weight:1,
													});
		self.sceenObjectAdd({
													name:'totem-events',
													url:'/#3',
													src:'/images/totem-events.png',
													width:147,
													height:399,
													posY:350,
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
		
		papaya.imageDraw('bg-sceen');
		papaya.imageDraw('totem-about');
		papaya.imageDraw('totem-bar-and-cuhnya');
		papaya.imageDraw('totem-events');


		
	this.menuAdd("totem-about",62,208,"О БАРЕ");
	this.menuAdd("totem-bar-and-cuhnya",62,180,"БАР И");
	this.menuAdd("totem-bar-and-cuhnya",58,200,"КУХНЯ");
	this.menuAdd("totem-events",43,163,"МЕРО-");
	this.menuAdd("totem-events",30,180,"ПРИЯТИЯ");
};

