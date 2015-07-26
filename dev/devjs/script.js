 /* jshint ignore:start */

 (function (window, $){

 	$(window).ready(function(){

 		/********* Device **********/

 		if(jQuery.browser.mobile)
 		{
 			console.log('mobile!')
 			$('#bgvid').hide('assets/headervideo.mp4');
 			$('.desktop').hide();
 			ismobile=true;
 		}
 		else
 		{
 			console.log('not mobile!')
 			$('#bgvid').show('assets/headervideo.mp4');
 			$('.mobile').hide();
 			ismobile=false;
 		} 
 		/********* JQuery Address Desktop **********/ 
 		$('.change_section').click(function() {  
 			$.address.value($(this).attr('id'));  
 		});  

 		$.address.change(function(event) {
 			switch(event.value) {
 				case '/part2':
 				console.log('hello');
 				if(ismobile) {
 					$('html, body').animate({scrollTop: $('#mob_section2').offset().top,}, 2000); 
 				}
 				else {
 					$('html, body').animate({scrollTop: $('#section2').offset().top,}, 2000);
 				} 
 				break;
 				case '/part3':
 				if(ismobile) {
 					$('html, body').animate({scrollTop: $('#mob_section3').offset().top,}, 2000); 
 				}
 				else {
 					$('html, body').animate({scrollTop: $('#section3').offset().top,}, 2000);
 				} 
 				break;
 				case '/part4':
 				if(ismobile) {
 					$('html, body').animate({scrollTop: $('#mob_section4').offset().top,}, 2000); 
 				}
 				else {
 					$('html, body').animate({scrollTop: $('#section4').offset().top,}, 2000);
 				} 
 				break;
 				case '/part5':
 				if(ismobile) {
 					$('html, body').animate({scrollTop: $('#mob_section5').offset().top,}, 2000); 
 				}
 				else {
 					$('html, body').animate({scrollTop: $('#section5').offset().top,}, 2000);
 				} 
 				break;
 			}
 		}); 

 /********* JQuery Address Video **********/ 

 $(".video_thumbnail").on('click', function() {
 	$('.clicked').removeClass('clicked');
 	$(this).toggleClass('clicked');
 });





 $.address.change(function(event) {
 	
	 	switch(event.value) {
	 		case '/video1':
		 		
		 		if(ismobile) {
		 			console.log('hello');
		 		}
		 		else {
			 			$('html, body').animate({scrollTop: $('#section2').offset().top,}, 2000);
			 			$('.video_thumbnail').removeClass('clicked'); 
			 			$('#v1').addClass('clicked');  
			 			function loadVideo(event, videoId) {
			 				videoPlayer.loadVideoByID(videoId);
			 				event.preventDefault();
			 			}
			 			loadVideo(event, 4065898176001);
			 		
		 		}

	 		break;
	 		case '/video2':
	 		if(ismobile) {
	 			console.log('hello');
	 		}
	 		else {
	 			$('html, body').animate({scrollTop: $('#section2').offset().top,}, 2000);
	 			$('.video_thumbnail').removeClass('clicked'); 
	 			$('#v2').addClass('clicked');  
	 			function loadVideo(event, videoId) {
	 				videoPlayer.loadVideoByID(videoId);
	 				event.preventDefault();
	 			}
	 			loadVideo(event, 4065945907001);


	 		}
	 		break;  
	 		case '/video3':
	 		if(ismobile) {
	 			console.log('hello');
	 		}
	 		else {
	 			$('html, body').animate({scrollTop: $('#section2').offset().top,}, 2000);
	 			$('.video_thumbnail').removeClass('clicked'); 
	 			$('#v3').addClass('clicked');
	 			function loadVideo(event, videoId) {
	 				videoPlayer.loadVideoByID(videoId);
	 				event.preventDefault();
	 			}
	 			loadVideo(event, 4072917973001);
	 		}
	 		break;     

	 	}
	
	

 }); 


 $(window).on("load resize", function(){
 	$('.pages').css({'top': '98%'});
 });







 /********* Navigation **********/  
	if (!!$('#sticky').offset()) { // make sure "#sticky" element exists
		var stickyTop = $('#sticky').offset().top; 
	var section3 = $('#section3').offset().top; 


    $(window).scroll(function(){ // scroll event
        var windowTop = $(window).scrollTop(); // returns number 
        if (stickyTop < windowTop){
        	$('#sticky').css({ position: 'fixed', top: 0 });
        }
        else {
        	$('#sticky').css('position','absolute');
        }
        if (section3 < windowTop){
        	$('#bgvid').hide('assets/headervideo.mp4');

        }
        else {
        	$('#bgvid').show('assets/headervideo.mp4');
        }
    });

}

toggle();
window.onresize = function() {
	toggle();
}

function toggle() {
	if (window.innerWidth < 1322) {
		document.getElementById('sticky').style.display = 'none';      
	}
	else {
		document.getElementById('sticky').style.display = 'block';                
	}    
}



  // $(document).ready(function () {
  //       var url = window.location;
  //       $('.side_navigation').find('.nav-active').removeClass('nav-active');
  //       $('.side_navigation ul li').each(function () {
  //           if (this.id == url) {
  //               $(this).parent().addClass('nav-active');
  //           }
  //       }); 
  //   });

  // $(document).ready(function() {
  //   var url = window.location;                
  //   $('ul.side_navigation li').each(function () {
  //        if (this.href == url) {
  //             $("ul.side_navigation li").each(function () {
  //                  if ($(this).hasClass("nav-active")) {
  //                       $(this).removeClass("nav-active");
  //                  }
  //             });
  //             $(this).parent().addClass('nav-active');
  //        }
  //    });
  // });



 /********* Custom Desktop **********/      


 $('.uparrow').hide();

 $("#downarrow").on("click", function(event) {
 	$('html, body').animate({
 		scrollTop: $("#section1").offset().top
 	}, 2000);

 	$('html, body').bind("scroll mousedown DOMMouseScroll mousewheel keyup touchmove", function(e){
 		if ( e.which > 0 || e.type === "mousedown" || e.type === "mousewheel" || e.type === "touchmove"){
 			$('html, body').stop(); 
 		}
 	}); 
 });


 $("#uparrow_button").on("click", function(event) {
 	$('html, body').animate({
 		scrollTop: $("#section1").offset().top
 	}, 2000);
 });



 $(window).scroll(function() {
 	var height = $(window).scrollTop();

 	if(height  > 40) {
 		$('.uparrow').show();
 		$('.downarrow').hide();
 	}else {
 		$('.uparrow').hide();
 		$('.downarrow').show();
 	}

 });





 $("#backtotop").on("click", function(event) {
 	$('html, body').animate({
 		scrollTop: $("#section1").offset().top 
 	}, 1900);
 });



 $(window).on("load resize", function(){
 	$('pages').css({'top': '97%'});
 });

 /********* SlideShow **********/ 


 $(".video_thumbnail").on("click", function(e) {
 	switch ($(this).attr('id')) {
 		case "v1":
 		$('#shop1').show();
 		$('#shop2').hide();
 		$('#shop3').hide();
 		break;
 		case "v2":
 		$('#shop2').show();
 		$('#shop1').hide();
 		$('#shop3').hide();
 		break;
 		case "v3":
 		$('#shop3').show();
 		$('#shop1').hide();
 		$('#shop2').hide();
 		break;
 	}
 })

 $(".video_thumbnail").on('click', function() {
 	$('.clicked').removeClass('clicked');
 	$(this).toggleClass('clicked');
 });



 /** SlideShow **/ 

 var currentPanel=1;


 $('.next').click(function() {
 	if(currentPanel===1) {
 		$('.slide1').animate({ right: 960 }, 400, 'swing');
 		$('.slide2').animate({ right: 0}, 400,'swing');
 		currentPanel=2;
 	}
 	else {
 		$('.slide1').animate({ right: 0 }, 400,'swing');
 		$('.slide2').animate({ right: -960}, 400,'swing');
 		currentPanel=1;
 	}
 });

 $('.prev').click(function() {
 	if(currentPanel===1) {
 		$('.slide1').animate({ right: 960 }, 400,'swing');
 		$('.slide2').animate({ right: 0}, 400,'swing');
 		currentPanel=2;
 	}
 	else {
 		$('.slide1').animate({ right: 0}, 400,'swing');
 		$('.slide2').animate({ right: -960}, 400,'swing');
 		currentPanel=1;
 	}
 });

 

 /********* Custom Mobile **********/ 


 function arrowToggle() { 
 	if($('#shop_lip_content').is(':hidden')) {
 		console.log('peaches');
 		$('.arrow_mob').css({
 			transform: 'translateY(0px) rotateZ(-45deg)',
 			MozTransform: 'translateY(0px) rotateZ(-45deg)',
 			WebkitTransform: 'translateY(0px) rotateZ(-45deg)',
 			msTransform: 'translateY(0px) rotateZ(-45deg)'       
 		}); 
 	} else {
 		console.log('closed');
 		$('.arrow_mob').css({
 			transform: 'translateY(-14px) rotateZ(135deg)',
 			MozTransform: 'translateY(-14px) rotateZ(135deg)',
 			WebkitTransform: 'translateY(-14px) rotateZ(135deg)',
 			msTransform: 'translateY(-14px) rotateZ(135deg)'        
 		}); 
 	}
 }


 $('#arrow_mob2').click(function(){
 	$('#shop_lip_content').slideToggle( 2000, 'swing', function() {
 		arrowToggle();
 	});
 });
 

 $(".mob-button").click(function(){
 	$(this).next(".mob-content").slideToggle(2000, 'swing', function () { 
 		arrowToggle();
 	});
 });

 $(".totop").on("click", function(event) {
 	$('html, body').animate({
 		scrollTop: $("#mob_section1").offset().top 
 	}, 1900);
 });

 $("#downarrow_mob").on("click", function(event) {
 	$('html, body').animate({
 		scrollTop: $("#mob_section2").offset().top
 	}, 1900);
 });


 /********* BrightCove **********/
 var videoPlayer;
 function onTemplateLoaded(id) {
 	var player = brightcove.api.getExperience(id);
 	videoPlayer = player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
 }

 function loadVideo(event, videoId) {
 	videoPlayer.loadVideoByID(videoId);
 	event.preventDefault();
 }

 window.onTemplateLoaded=onTemplateLoaded;
 window.loadVideo=loadVideo;

});


}(window, jQuery));

/* jshint ignore:end */