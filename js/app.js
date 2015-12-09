var _app = function(){
	return {
		autosize:function(){
			var h;
			if(innerHeight>=800 )
				h = innerHeight
			else
				h = 800

				$('.autosize').height(h);
				if(innerWidth<=960)
				$('.about').css('height',$('.about-left').height()+$('.footer').height()+$('.about-right').height()+"px");
	
		},
		orderTabAlignCenter:function(){
			var elem = $('.add-order-table');
			var pos = innerWidth/2-(elem.width()/2);
			elem.css('left',pos+'px');
			
			$('.anons-btn').css('left',innerWidth/2-$('.anons-btn').width()/2+'px');
			$('.events-btn').css('left',innerWidth/2-$('.events-btn').width()/2+'px');
				
		
		}
	}
}
window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 10);
    };
})();

$(document).ready(function(){
	_app().autosize();
	_app().orderTabAlignCenter();


});
window.onresize = function(){
	_app().autosize();
	_app().orderTabAlignCenter();
}


