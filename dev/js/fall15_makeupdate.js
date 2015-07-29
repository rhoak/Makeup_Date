/**
 * ScrollIt
 * ScrollIt.js(scroll•it•dot•js) makes it easy to make long, vertically scrolling pages.
 *
 * Latest version: https://github.com/cmpolis/scrollIt.js
 *
 * License <https://github.com/cmpolis/scrollIt.js/blob/master/LICENSE.txt>
 */
(function($) {
    'use strict';

    var pluginName = 'ScrollIt',
        pluginVersion = '1.0.3';

    /*
     * OPTIONS
     */
    var defaults = {
        upKey: 38,
        downKey: 40,
        easing: 'linear',
        scrollTime: 600,
        activeClass: 'active',
        onPageChange: null,
        topOffset : 0
    };

    $.scrollIt = function(options) {

        /*
         * DECLARATIONS
         */
        var settings = $.extend(defaults, options),
            active = 0,
            lastIndex = $('[data-scroll-index]:last').attr('data-scroll-index');

        /*
         * METHODS
         */

        /**
         * navigate
         *
         * sets up navigation animation
         */
        var navigate = function(ndx) {
            if(ndx < 0 || ndx > lastIndex) return;

            var targetTop = $('[data-scroll-index=' + ndx + ']').offset().top + settings.topOffset + 1;
            $('html,body').animate({
                scrollTop: targetTop,
                easing: settings.easing
            }, settings.scrollTime);
        };

        /**
         * doScroll
         *
         * runs navigation() when criteria are met
         */
        var doScroll = function (e) {
            var target = $(e.target).closest("[data-scroll-nav]").attr('data-scroll-nav') ||
            $(e.target).closest("[data-scroll-goto]").attr('data-scroll-goto');
            navigate(parseInt(target));
        };

        /**
         * keyNavigation
         *
         * sets up keyboard navigation behavior
         */
        var keyNavigation = function (e) {
            var key = e.which;
            if($('html,body').is(':animated') && (key == settings.upKey || key == settings.downKey)) {
                return false;
            }
            if(key == settings.upKey && active > 0) {
                navigate(parseInt(active) - 1);
                return false;
            } else if(key == settings.downKey && active < lastIndex) {
                navigate(parseInt(active) + 1);
                return false;
            }
            return true;
        };

        /**
         * updateActive
         *
         * sets the currently active item
         */
        var updateActive = function(ndx) {
            if(settings.onPageChange && ndx && (active != ndx)) settings.onPageChange(ndx);

            active = ndx;
            $('[data-scroll-nav]').removeClass(settings.activeClass);
            $('[data-scroll-nav=' + ndx + ']').addClass(settings.activeClass);
        };

        /**
         * watchActive
         *
         * watches currently active item and updates accordingly
         */
        var watchActive = function() {
            var winTop = $(window).scrollTop();

            var visible = $('[data-scroll-index]').filter(function(ndx, div) {
                return winTop >= $(div).offset().top + settings.topOffset &&
                winTop < $(div).offset().top + (settings.topOffset) + $(div).outerHeight()
            });
            var newActive = visible.first().attr('data-scroll-index');
            updateActive(newActive);
        };

        /*
         * runs methods
         */
        $(window).on('scroll',watchActive).scroll();

        $(window).on('keydown', keyNavigation);

        $('body').on('click','[data-scroll-nav], [data-scroll-goto]', function(e){
            e.preventDefault();
            doScroll(e);
        });

    };
}(jQuery));
 /* jshint ignore:start */

(function (window, $){


    $(window).ready(function(){
    
    	console.log('monkeyface');
		/********* Detect Device **********/
		$('.desktop').hide();
		$('.mobile').hide();


		if(jQuery.browser.mobile)
		{
			console.log('mobile!')
			$('.mobile').show();
			$('#bgvid').hide('assets/headervideo.mp4');
			ismobile=true;
		}
		else
		{
			console.log('not mobile!')
			$('.desktop').show();
			$('#bgvid').show('assets/headervideo.mp4');
			ismobile=false;
		} 

		$(window).on("load resize", function(){
			$('pages').css({'top': '97%'});
		});
		/********* CoreMetrics **********/ 




		
	console.log('monkeyface');

		function CoreMetrics(tag_type, category_name, tag_value){
			if(tag_type=="Pageview"){
				try {
					BLOOMIES.coremetrics.cmCreatePageviewTag( tag_value, category_name );
				} catch (e) {
					console.log('salamander');
				}
				trace("{{{{{{{{ Pageview- category_name: "+category_name+" tag_value: "+tag_value+" }}}}}}}}");
			}else if(tag_type=="Element"){
				try {
					BLOOMIES.coremetrics.cmCreatePageElementTag( tag_value, category_name );
				} catch (e) {
					console.log('salamander');
				}
				trace("{{{{{{{{ Element- category_name: "+category_name+" tag_value: "+tag_value+" }}}}}}}}");
			}
		}


		function getSection(currenttop){
			var sectionDivHeights = [0,
					$('#section1').offset().top,
					$('#section3').offset().top,
					$('#section4').offset().top,
					$('#section5').offset().top,
					$('#section6').offset().top,
					$('#section7').offset().top,
				]; 

				sectionDivHeights.push(currenttop);
				sectionDivHeights.sort(function(a, b){return a-b;});
				return sectionDivHeights.indexOf(currenttop);
			}

		currentSection=-1;

		currentSection=getSection($(window).scrollTop());
		CoreMetrics("Pageview","fall15_makeupdate",currentSection);

		$(window).scroll(function () {
			if(currentSection!=getSection($(window).scrollTop())){
			currentSection=getSection($(window).scrollTop());
			CoreMetrics("Pageview","fall15_makeupdate",currentSection);
			}
		});

		/********* JQuery Address Desktop **********/ 
		$('.change_section').click(function() {  
			$.address.value($(this).attr('data-info'));  
		});  

		// $.address.change(function(event) {
		// 	switch(event.value) {
		// 		case '/How_To_Video':
		// 		if(ismobile) {
		// 			$('html, body').animate({scrollTop: $('#mob_section1').offset().top,}, 2000); 
		// 		}
		// 		else {
		// 			$('html, body').animate({scrollTop: $('#section1').offset().top,}, 2000);
		// 		} 
		// 		break;
		// 		case '/Q&A_with_Cyndle':
		// 		if(ismobile) {
		// 			$('html, body').animate({scrollTop: $('#mob_section3').offset().top,}, 2000); 
		// 		}
		// 		else {
		// 			$('html, body').animate({scrollTop: $('#section3').offset().top,}, 2000);
		// 		} 
		// 		break;
		// 		case '/Exclusive_Gift':
		// 		if(ismobile) {
		// 			$('html, body').animate({scrollTop: $('#mob_section4').offset().top,}, 2000); 
		// 		}
		// 		else {
		// 			$('html, body').animate({scrollTop: $('#section4').offset().top,}, 2000);
		// 		} 
		// 		break;
		// 		case '/Celebrate_in_Store':
		// 		if(ismobile) {
		// 			$('html, body').animate({scrollTop: $('#mob_section5').offset().top,}, 2000); 
		// 		}
		// 		else {
		// 			$('html, body').animate({scrollTop: $('#section5').offset().top,}, 2000);
		// 		} 
		// 		break;
		// 		case '/Enter_to_Win':
		// 		if(ismobile) {
		// 			$('html, body').animate({scrollTop: $('#mob_section7').offset().top,}, 2000); 
		// 		}
		// 		else {
		// 			$('html, body').animate({scrollTop: $('#section7').offset().top,}, 2000);
		// 		} 
		// 		break;
		// 	}
		// }); 



		/********* Video Deep Linking - JQuery Address **********/ 
		// $(".video_thumbnail").on('click', function() {
		// 	$('.clicked').removeClass('clicked');
		// 	$(this).toggleClass('clicked');
		// 	CoreMetrics("Element","fall15_makeupdate", $(this).attr('data-key'));
		// });

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
					loadVideo(event, 4377128244001);
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
					loadVideo(event, 4377128247001);
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
					loadVideo(event, 4377147010001);
				}
				break;     
			}
		}); 


	/********* Sticky Navigation **********/ 
		if (!!$('#sticky').offset()) { 
			var stickyTop = $('#sticky').offset().top; 
			var section3 = $('#section3').offset().top; 
			$(window).scroll(function(){ // scroll event
					var windowTop = $(window).scrollTop(); 
					if (stickyTop < windowTop){
						$('#sticky').css({ position: 'fixed', top: 0 });
					}
					else {
						$('#sticky').css('position','absolute');
					}
					if (section3 < windowTop){
						$('#videowrapper').hide('assets/headervideo.mp4');
					}
					else {
						$('#videowrapper').show('assets/headervideo.mp4');
					}
				});
		}

		toggle();
			window.onresize = function() {
				toggle();
		}

		function toggle() {
			if (window.innerWidth < 1262) { // Change to jquery 
				document.getElementById('sticky').style.display = 'none';      
			}
			else {
				document.getElementById('sticky').style.display = 'block';                
			}    
		}

		/********* Up and Down Arrows **********/      
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


		/********* SlideShow Thumbnails **********/ 
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
		});

		$(".video_thumbnail").on('click', function() {
			$('.clicked').removeClass('clicked');
			$(this).toggleClass('clicked');
		});



		/********* SeaSaw SlideShow **********/ 

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
		/********* Arrows **********/ 
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



}(window, jQuery));

/* jshint ignore:end */
/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 *
 * jQuery.browser.mobile will be true if the browser is a mobile device
 *
 **/
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
/*! jQuery Address v1.6 | (c) 2009, 2013 Rostislav Hristov | jquery.org/license */
(function(c){c.address=function(){var s=function(a){a=c.extend(c.Event(a),function(){for(var b={},f=c.address.parameterNames(),m=0,p=f.length;m<p;m++)b[f[m]]=c.address.parameter(f[m]);return{value:c.address.value(),path:c.address.path(),pathNames:c.address.pathNames(),parameterNames:f,parameters:b,queryString:c.address.queryString()}}.call(c.address));c(c.address).trigger(a);return a},g=function(a){return Array.prototype.slice.call(a)},k=function(){c().bind.apply(c(c.address),Array.prototype.slice.call(arguments));
return c.address},da=function(){c().unbind.apply(c(c.address),Array.prototype.slice.call(arguments));return c.address},G=function(){return A.pushState&&d.state!==h},T=function(){return("/"+n.pathname.replace(new RegExp(d.state),"")+n.search+(H()?"#"+H():"")).replace(S,"/")},H=function(){var a=n.href.indexOf("#");return a!=-1?n.href.substr(a+1):""},q=function(){return G()?T():H()},U=function(){return"javascript"},M=function(a){a=a.toString();return(d.strict&&a.substr(0,1)!="/"?"/":"")+a},t=function(a,
b){return parseInt(a.css(b),10)},C=function(){if(!I){var a=q();if(decodeURI(e)!=decodeURI(a))if(v&&x<7)n.reload();else{v&&!J&&d.history&&u(N,50);e=a;B(o)}}},B=function(a){u(ea,10);return s(V).isDefaultPrevented()||s(a?W:X).isDefaultPrevented()},ea=function(){if(d.tracker!=="null"&&d.tracker!==D){var a=c.isFunction(d.tracker)?d.tracker:i[d.tracker],b=(n.pathname+n.search+(c.address&&!G()?c.address.value():"")).replace(/\/\//,"/").replace(/^\/$/,"");if(c.isFunction(a))a(b);else if(c.isFunction(i.urchinTracker))i.urchinTracker(b);
else if(i.pageTracker!==h&&c.isFunction(i.pageTracker._trackPageview))i.pageTracker._trackPageview(b);else i._gaq!==h&&c.isFunction(i._gaq.push)&&i._gaq.push(["_trackPageview",decodeURI(b)])}},N=function(){var a=U()+":"+o+";document.open();document.writeln('<html><head><title>"+l.title.replace(/\'/g,"\\'")+"</title><script>var "+y+' = "'+encodeURIComponent(q()).replace(/\'/g,"\\'")+(l.domain!=n.hostname?'";document.domain="'+l.domain:"")+"\";<\/script></head></html>');document.close();";if(x<7)j.src=
a;else j.contentWindow.location.replace(a)},Z=function(){if(E&&Y!=-1){var a,b,f=E.substr(Y+1).split("&");for(a=0;a<f.length;a++){b=f[a].split("=");if(/^(autoUpdate|history|strict|wrap)$/.test(b[0]))d[b[0]]=isNaN(b[1])?/^(true|yes)$/i.test(b[1]):parseInt(b[1],10)!==0;if(/^(state|tracker)$/.test(b[0]))d[b[0]]=b[1]}E=D}e=q()},aa=function(){if(!$){$=r;Z();c('a[rel*="address:"]').address();if(d.wrap){var a=c("body");c("body > *").wrapAll('<div style="padding:'+(t(a,"marginTop")+t(a,"paddingTop"))+"px "+
(t(a,"marginRight")+t(a,"paddingRight"))+"px "+(t(a,"marginBottom")+t(a,"paddingBottom"))+"px "+(t(a,"marginLeft")+t(a,"paddingLeft"))+'px;" />').parent().wrap('<div id="'+y+'" style="height:100%;overflow:auto;position:relative;'+(K&&!window.statusbar.visible?"resize:both;":"")+'" />');c("html, body").css({height:"100%",margin:0,padding:0,overflow:"hidden"});K&&c('<style type="text/css" />').appendTo("head").text("#"+y+"::-webkit-resizer { background-color: #fff; }")}if(v&&!J){a=l.getElementsByTagName("frameset")[0];
j=l.createElement((a?"":"i")+"frame");j.src=U()+":"+o;if(a){a.insertAdjacentElement("beforeEnd",j);a[a.cols?"cols":"rows"]+=",0";j.noResize=r;j.frameBorder=j.frameSpacing=0}else{j.style.display="none";j.style.width=j.style.height=0;j.tabIndex=-1;l.body.insertAdjacentElement("afterBegin",j)}u(function(){c(j).bind("load",function(){var b=j.contentWindow;e=b[y]!==h?b[y]:"";if(e!=q()){B(o);n.hash=e}});j.contentWindow[y]===h&&N()},50)}u(function(){s("init");B(o)},1);if(!G())if(v&&x>7||!v&&J)if(i.addEventListener)i.addEventListener(F,
C,o);else i.attachEvent&&i.attachEvent("on"+F,C);else fa(C,50);"state"in window.history&&c(window).trigger("popstate")}},ga=function(a){a=a.toLowerCase();a=/(chrome)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||a.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[];return{browser:a[1]||"",version:a[2]||"0"}},h,D=null,y="jQueryAddress",F="hashchange",V="change",W="internalChange",X="externalChange",
r=true,o=false,d={autoUpdate:r,history:r,strict:r,wrap:o},z=function(){var a={},b=ga(navigator.userAgent);if(b.browser){a[b.browser]=true;a.version=b.version}if(a.chrome)a.webkit=true;else if(a.webkit)a.safari=true;return a}(),x=parseFloat(z.version),K=z.webkit||z.safari,v=!c.support.opacity,i=function(){try{return top.document!==h&&top.document.title!==h?top:window}catch(a){return window}}(),l=i.document,A=i.history,n=i.location,fa=setInterval,u=setTimeout,S=/\/{2,9}/g;z=navigator.userAgent;var J=
"on"+F in i,j,E=c("script:last").attr("src"),Y=E?E.indexOf("?"):-1,O=l.title,I=o,$=o,ba=r,L=o,e=q();if(v){x=parseFloat(z.substr(z.indexOf("MSIE")+4));if(l.documentMode&&l.documentMode!=x)x=l.documentMode!=8?7:8;var ca=l.onpropertychange;l.onpropertychange=function(){ca&&ca.call(l);if(l.title!=O&&l.title.indexOf("#"+q())!=-1)l.title=O}}if(A.navigationMode)A.navigationMode="compatible";if(document.readyState=="complete")var ha=setInterval(function(){if(c.address){aa();clearInterval(ha)}},50);else{Z();
c(aa)}c(window).bind("popstate",function(){if(decodeURI(e)!=decodeURI(q())){e=q();B(o)}}).bind("unload",function(){if(i.removeEventListener)i.removeEventListener(F,C,o);else i.detachEvent&&i.detachEvent("on"+F,C)});return{bind:function(){return k.apply(this,g(arguments))},unbind:function(){return da.apply(this,g(arguments))},init:function(){return k.apply(this,["init"].concat(g(arguments)))},change:function(){return k.apply(this,[V].concat(g(arguments)))},internalChange:function(){return k.apply(this,
[W].concat(g(arguments)))},externalChange:function(){return k.apply(this,[X].concat(g(arguments)))},baseURL:function(){var a=n.href;if(a.indexOf("#")!=-1)a=a.substr(0,a.indexOf("#"));if(/\/$/.test(a))a=a.substr(0,a.length-1);return a},autoUpdate:function(a){if(a!==h){d.autoUpdate=a;return this}return d.autoUpdate},history:function(a){if(a!==h){d.history=a;return this}return d.history},state:function(a){if(a!==h){d.state=a;var b=T();if(d.state!==h)if(A.pushState)b.substr(0,3)=="/#/"&&n.replace(d.state.replace(/^\/$/,
"")+b.substr(2));else b!="/"&&b.replace(/^\/#/,"")!=H()&&u(function(){n.replace(d.state.replace(/^\/$/,"")+"/#"+b)},1);return this}return d.state},strict:function(a){if(a!==h){d.strict=a;return this}return d.strict},tracker:function(a){if(a!==h){d.tracker=a;return this}return d.tracker},wrap:function(a){if(a!==h){d.wrap=a;return this}return d.wrap},update:function(){L=r;this.value(e);L=o;return this},title:function(a){if(a!==h){u(function(){O=l.title=a;if(ba&&j&&j.contentWindow&&j.contentWindow.document){j.contentWindow.document.title=
a;ba=o}},50);return this}return l.title},value:function(a){if(a!==h){a=M(a);if(a=="/")a="";if(e==a&&!L)return;e=a;if(d.autoUpdate||L){if(B(r))return this;if(G())A[d.history?"pushState":"replaceState"]({},"",d.state.replace(/\/$/,"")+(e===""?"/":e));else{I=r;if(K)if(d.history)n.hash="#"+e;else n.replace("#"+e);else if(e!=q())if(d.history)n.hash="#"+e;else n.replace("#"+e);v&&!J&&d.history&&u(N,50);if(K)u(function(){I=o},1);else I=o}}return this}return M(e)},path:function(a){if(a!==h){var b=this.queryString(),
f=this.hash();this.value(a+(b?"?"+b:"")+(f?"#"+f:""));return this}return M(e).split("#")[0].split("?")[0]},pathNames:function(){var a=this.path(),b=a.replace(S,"/").split("/");if(a.substr(0,1)=="/"||a.length===0)b.splice(0,1);a.substr(a.length-1,1)=="/"&&b.splice(b.length-1,1);return b},queryString:function(a){if(a!==h){var b=this.hash();this.value(this.path()+(a?"?"+a:"")+(b?"#"+b:""));return this}a=e.split("?");return a.slice(1,a.length).join("?").split("#")[0]},parameter:function(a,b,f){var m,
p;if(b!==h){var P=this.parameterNames();p=[];b=b===h||b===D?"":b.toString();for(m=0;m<P.length;m++){var Q=P[m],w=this.parameter(Q);if(typeof w=="string")w=[w];if(Q==a)w=b===D||b===""?[]:f?w.concat([b]):[b];for(var R=0;R<w.length;R++)p.push(Q+"="+w[R])}c.inArray(a,P)==-1&&b!==D&&b!==""&&p.push(a+"="+b);this.queryString(p.join("&"));return this}if(b=this.queryString()){f=[];p=b.split("&");for(m=0;m<p.length;m++){b=p[m].split("=");b[0]==a&&f.push(b.slice(1).join("="))}if(f.length!==0)return f.length!=
1?f:f[0]}},parameterNames:function(){var a=this.queryString(),b=[];if(a&&a.indexOf("=")!=-1){a=a.split("&");for(var f=0;f<a.length;f++){var m=a[f].split("=")[0];c.inArray(m,b)==-1&&b.push(m)}}return b},hash:function(a){if(a!==h){this.value(e.split("#")[0]+(a?"#"+a:""));return this}a=e.split("#");return a.slice(1,a.length).join("#")}}}();c.fn.address=function(s){this.data("address")||this.on("click",function(g){if(g.shiftKey||g.ctrlKey||g.metaKey||g.which==2)return true;var k=g.currentTarget;if(c(k).is("a")){g.preventDefault();
g=s?s.call(k):/address:/.test(c(k).attr("rel"))?c(k).attr("rel").split("address:")[1].split(" ")[0]:c.address.state()!==undefined&&!/^\/?$/.test(c.address.state())?c(k).attr("href").replace(new RegExp("^(.*"+c.address.state()+"|\\.)"),""):c(k).attr("href").replace(/^(#\!?|\.)/,"");c.address.value(g)}}).on("submit",function(g){var k=g.currentTarget;if(c(k).is("form")){g.preventDefault();g=c(k).attr("action");k=s?s.call(k):(g.indexOf("?")!=-1?g.replace(/&$/,""):g+"?")+c(k).serialize();c.address.value(k)}}).data("address",
true);return this}})(jQuery);
