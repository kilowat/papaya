function Papaya(canvas,textCanvas,width,height){
	this.canvas = document.getElementById(canvas);
	this.context = this.canvas.getContext('2d');
	this.canvasText = document.getElementById(textCanvas);
	this.contextText = this.canvasText.getContext('2d');
	this.sceenObject = {};
	this.sceenWidth = width;
	this.sceenHeight = height;
	this.k = innerWidth/width;
};
Papaya.prototype.canvasSetSize = function(){
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight-5;
		this.canvasText.width = window.innerWidth;
		this.canvasText.height = window.innerHeight-5;
};
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
	this.loadImages(function(images){
		self.context.drawImage(
									images[name], 
									self.sceenObject[name].posY, 
									self.sceenObject[name].posX, 
									self.sceenObject[name].width, 
									self.sceenObject[name].height);
		});
}

Papaya.prototype.sceenObjectGet = function(){
	
}

Papaya.prototype.sceenObjectAdd = function(obj){
	if(obj.width!==undefined && obj.height!==undefined){
		obj.width *= this.k;
		obj.height *= this.k;
	}
	if(obj.posX!==undefined && obj.posY!==undefined){
		obj.posX *= this.k;
		obj.posY *= this.k;
	}
	this.sceenObject[obj.name] = obj;
};
Papaya.prototype.menuAdd = function(name,x,y,text){
    this.contextText.font = 'bold '+14*this.k+'pt Calibri';
		this.contextText.fillText(text, this.sceenObject[name].posX+x*this.k, this.sceenObject[name].posY+y*this.k);
}
Papaya.prototype.run = function(){

		papaya.sceenObjectAdd({
													name:'bg-sceen',
													src:'/images/bg-sceen.jpg',
													width:2048,
													height:1200,posX:0,
													posY:0});
		papaya.sceenObjectAdd({
													name:'totem-about',
													src:'/images/totem-about.png',
													width:157,
													height:391,
													posX:400,
													posY:400,
													});
		papaya.sceenObjectAdd({
													name:'bar-and-cuhnya',
													src:'/images/bar-and-cuhnya.png',
													width:147,
													height:399,
													posX:360,
													posY:540,
													});		
													
		papaya.canvasSetSize();
		this.menuAdd("totem-about",62,208,"О БАРЕ");
		this.menuAdd("bar-and-cuhnya",240,0,"БАР И");
		this.menuAdd("bar-and-cuhnya",240,20,"КУХНЯ");
		papaya.imageDraw("totem-about");
		papaya.imageDraw("bar-and-cuhnya");
		papaya.imageDraw("bg-sceen");
};

