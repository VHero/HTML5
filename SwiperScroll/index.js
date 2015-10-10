$(document).ready(function(){
	// 图片的缩放比例控制,只能应用在行间样式
	function scaleControl(){
		scaleW = window.innerWidth / 320;
	    scaleH = window.innerHeight / 480;
	    var resizes = document.querySelectorAll('.resize');
	    for (var j = 0; j < resizes.length; j++) {
	        resizes[j].style.width = parseInt(resizes[j].style.width) * scaleW + 'px';
	        resizes[j].style.height = parseInt(resizes[j].style.height) * scaleH + 'px';
	        resizes[j].style.top = parseInt(resizes[j].style.top) * scaleH + 'px';
	        resizes[j].style.left = parseInt(resizes[j].style.left) * scaleW + 'px';
	    }
	}
	// swiper的初始化以及swiper的一些函数的应用
	function swiperInit(){
		    var mySwiper = new Swiper('.swiper-container', {
            direction: 'vertical',
            pagination: '.swiper-pagination',
            mousewheelControl: true,
            watchSlidesProgress: true,
            paginationClickable:true,
            onImagesReady: function(swiper){
     			 $('#loader').css('display','none');
    		},
            onProgress: function(swiper) {
                for (var i = 0; i < swiper.slides.length; i++) {
                    var slide = swiper.slides[i];
                    var progress = slide.progress;
                    var translate = progress * swiper.height / 4;
                    scale = 1 - Math.min(Math.abs(progress * 0.5), 1);
                    var opacity = 1 - Math.min(Math.abs(progress / 2), 0.5);
                    slide.style.opacity = opacity;
                    es = slide.style;
                    es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'translate3d(0,' + translate + 'px,-' + translate + 'px) scaleY(' + scale + ')';

                }
            },
        });
	}
	// 控制document的字体大小，应用rem这个单位可以让字体自适应尺寸
	function sizeControl(doc, win){
		var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function () {
		var clientWidth = docEl.clientWidth;
		if (!clientWidth) return;
			docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
		};
		
		if (!doc.addEventListener) return;
			win.addEventListener(resizeEvt, recalc, false);
			doc.addEventListener('DOMContentLoaded', recalc, false);
		}
	sizeControl(document,window);
	scaleControl();
	swiperInit();

});