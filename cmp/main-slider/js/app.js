function Papaya(canvas){

	this.canvas = document.getElementById(canvas);
	this.context = this.canvas.getContext('2d');
	this.sceenObject = {};
};
Papaya.prototype.canvasSetSize = function(){
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight-5;
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
	console.log(arrObjName);
  // get num of sources
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
									self.sceenObject[name].posX, 
									self.sceenObject[name].posY, 
									self.sceenObject[name].width, 
									self.sceenObject[name].height);
		});
}

Papaya.prototype.sceenObjectGet = function(){
	
}

Papaya.prototype.sceenObjectAdd = function(obj){
	this.sceenObject[obj.name] = {
																src:obj.src,
																width:obj.width,
																height:obj.height,
																posX:obj.posX,
																posY:obj.posY,
																}
}

Papaya.prototype.run = function(){
	
};

