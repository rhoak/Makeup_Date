 /* jshint ignore:start */

(function (window, $){


    $(window).ready(function(){
    
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





        function CoreMetrics(tag_type, category_name, tag_value){
            if(tag_type=="Pageview"){
                try {
                    BLOOMIES.coremetrics.cmCreatePageviewTag( tag_value, category_name );
                } catch (e) {
                }
                trace("{{{{{{{{ Pageview- category_name: "+category_name+" tag_value: "+tag_value+" }}}}}}}}");
            }else if(tag_type=="Element"){
                try {
                    BLOOMIES.coremetrics.cmCreatePageElementTag( tag_value, category_name );
                } catch (e) {
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
        //  switch(event.value) {
        //      case '/How_To_Video':
        //      if(ismobile) {
        //          $('html, body').animate({scrollTop: $('#mob_section1').offset().top,}, 2000); 
        //      }
        //      else {
        //          $('html, body').animate({scrollTop: $('#section1').offset().top,}, 2000);
        //      } 
        //      break;
        //      case '/Q&A_with_Cyndle':
        //      if(ismobile) {
        //          $('html, body').animate({scrollTop: $('#mob_section3').offset().top,}, 2000); 
        //      }
        //      else {
        //          $('html, body').animate({scrollTop: $('#section3').offset().top,}, 2000);
        //      } 
        //      break;
        //      case '/Exclusive_Gift':
        //      if(ismobile) {
        //          $('html, body').animate({scrollTop: $('#mob_section4').offset().top,}, 2000); 
        //      }
        //      else {
        //          $('html, body').animate({scrollTop: $('#section4').offset().top,}, 2000);
        //      } 
        //      break;
        //      case '/Celebrate_in_Store':
        //      if(ismobile) {
        //          $('html, body').animate({scrollTop: $('#mob_section5').offset().top,}, 2000); 
        //      }
        //      else {
        //          $('html, body').animate({scrollTop: $('#section5').offset().top,}, 2000);
        //      } 
        //      break;
        //      case '/Enter_to_Win':
        //      if(ismobile) {
        //          $('html, body').animate({scrollTop: $('#mob_section7').offset().top,}, 2000); 
        //      }
        //      else {
        //          $('html, body').animate({scrollTop: $('#section7').offset().top,}, 2000);
        //      } 
        //      break;
        //  }
        // }); 



        /********* Video Deep Linking - JQuery Address **********/ 
        // $(".video_thumbnail").on('click', function() {
        //  $('.clicked').removeClass('clicked');
        //  $(this).toggleClass('clicked');
        //  CoreMetrics("Element","fall15_makeupdate", $(this).attr('data-key'));
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