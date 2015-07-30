(function (window){


  $(window).ready(function(){

    /********* Detect Device **********/
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

    $(window).on("load resize", function(){
        $('pages').css({'top': '97%'});
    });

    /********* CoreMetrics **********/
    function CoreMetrics(tag_type, category_name, tag_value){
    if(tag_type=="Pageview"){
        try {
            BLOOMIES.coremetrics.cmCreatePageviewTag( tag_value, category_name );
        } catch (e) { console.log('Core Metrics not enabled');
        }
            ("{{{{{{{{ Pageview- category_name: "+category_name+" tag_value: "+tag_value+" }}}}}}}}");
        }else if(tag_type=="Element"){
        try {
            BLOOMIES.coremetrics.cmCreatePageElementTag( tag_value, category_name );
        } catch (e) {
        }
            ("{{{{{{{{ Element- category_name: "+category_name+" tag_value: "+tag_value+" }}}}}}}}");
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

  $(window).scroll(function () {
        if(currentSection!=getSection($(window).scrollTop())){
            currentSection=getSection($(window).scrollTop());
            CoreMetrics("Pageview","fall15_makeupdate",currentSection);
        }
        if(currentSection===1) {
            $('[data-info="How_To_Video"]').addClass('active');
        } 
        else { 
            $('[data-info="How_To_Video"]').removeClass('active');
        }
        if(currentSection===2) {
            $('[data-info="Q&A_with_Cyndle"]').addClass('active');
        } 
        else { 
            $('[data-info="Q&A_with_Cyndle"]').removeClass('active');
        }
        if(currentSection===3) {
            $('[data-info="Exclusive_Gift"]').addClass('active');
        } 
        else { 
            $('[data-info="Exclusive_Gift"]').removeClass('active');
        }
        if(currentSection===4) {
            $('[data-info="Celebrate_in_Store"]').addClass('active');
        } 
        else { 
            $('[data-info="Celebrate_in_Store"]').removeClass('active');
        }
        if(currentSection===5) {
            $('[data-info="Enter_to_Win"]').addClass('active');
        } 
        else { 
            $('[data-info="Enter_to_Win"]').removeClass('active');
        }

    }); 


    $(".shopvideo_item").on('click', function() {
        CoreMetrics("Element","fall15_makeupdate", $(this).attr('data-key'));
    });

    $(".giftset").on('click', function() {
        CoreMetrics("Element","fall15_makeupdate", 'fall15_makeupdate--exclusives');
    });

    $("#shop_now").on('click', function() {
        CoreMetrics("Element","fall15_makeupdate", 'fall15_makeupdate--exclusives');
    });

    $('#bluecircle').on('click', function() { 
        // pop('/popup.ognc?popupID=563664','myDynaPop','width=575,height=350'); //Do not have the library - have not tested this 
        CoreMetrics("Element","fall15_makeupdate", 'fall15_makeupdate--exclusives');
    });

    $('.galleryitem').on('click', function() { 
        // CoreMetrics("Element","fall15_makeupdate", 'fall15_makeupdate--exclusives');
    });

    $('.mob_galleryitem').on('click', function() { 
        // CoreMetrics("Element","fall15_makeupdate", 'fall15_makeupdate--exclusives');
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
        });
    }

  /********* Sticky Toggle **********/ 
    toggle();
    $( window ).resize(function() { 
        toggle();
    });

    function toggle() {
        if ($(window).innerWidth() < 1262) { 
    $('#sticky').css('display', 'none');      
        }
    else {
        $('#sticky').css('display', 'block');                
        }    
    }

  /********* JQuery Address Desktop **********/ 
  $('.change_section').click(function() {  
    $.address.value($(this).attr('data-info'));  
  });  

  $.address.change(function(event) {
        switch(event.value) {
          case '/How_To_Video':
          if(ismobile) {
            $('html, body').animate({scrollTop: $('#mob_section1').offset().top,}, 2000); 
          }
          else {
            $('html, body').animate({scrollTop: $('#section1').offset().top,}, 2000);
          } 
          break;
          case '/Q&A_with_Cyndle':
          if(ismobile) {
            $('html, body').animate({scrollTop: $('#mob_section3').offset().top,}, 2000); 
          }
          else {
            $('html, body').animate({scrollTop: $('#section3').offset().top,}, 2000);
          } 
          break;
          case '/Exclusive_Gift':
          if(ismobile) {
            $('html, body').animate({scrollTop: $('#mob_section4').offset().top,}, 2000); 
          }
          else {
            $('html, body').animate({scrollTop: $('#section4').offset().top,}, 2000);
          } 
          break;
          case '/Celebrate_in_Store':
          if(ismobile) {
            $('html, body').animate({scrollTop: $('#mob_section5').offset().top,}, 2000); 
          }
          else {
            $('html, body').animate({scrollTop: $('#section5').offset().top,}, 2000);
          } 
          break;
          case '/Enter_to_Win':
          if(ismobile) {
            $('html, body').animate({scrollTop: $('#mob_section7').offset().top,}, 2000); 
          }
          else {
            $('html, body').animate({scrollTop: $('#section7').offset().top,}, 2000);
          } 
          break;
        }
  }); 

    /********* Video Deep Linking - JQuery Address **********/ 
    $(".video_thumbnail").on('click', function() {
        $('.clicked').removeClass('clicked');
        $(this).toggleClass('clicked');
        CoreMetrics("Element","fall15_makeupdate", $(this).attr('data-key'));
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

/********* SeaSaw SlideShow **********/ 

var currentPanel=1;


$('#next-button').click(function() {
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

$('#prev-button').click(function() {
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

/********* Adding Links **********/ 
$('.galleryitem').wrap('<a href="http://m.bloomingdales.com/shop/beauty/gifts-with-purchase?id=7138"></a>');
$('.mob_galleryitem').wrap('<a href="http://m.bloomingdales.com/shop/beauty/gifts-with-purchase?id=7138"></a>');



/********* Custom Mobile **********/ 
/********* Arrows **********/ 


    function arrowToggle(item) {
        item.toggleClass('zed');
        if(item.hasClass('zed')) {
            item.next().find('.arrow_mob').css({
                transform: 'translateY(-14px) rotateZ(135deg)',
                MozTransform: 'translateY(-14px) rotateZ(135deg)',
                WebkitTransform: 'translateY(-14px) rotateZ(135deg)',
                msTransform: 'translateY(-14px) rotateZ(135deg)'        
            });
        } else {
            item.next().find('.arrow_mob').css({
                transform: 'translateY(0px) rotateZ(-45deg)',
                MozTransform: 'translateY(0px) rotateZ(-45deg)',
                WebkitTransform: 'translateY(0px) rotateZ(-45deg)',
                msTransform: 'translateY(0px) rotateZ(-45deg)'       
            }); 
        }
    };

    $("#mob_backtotop").on("click", function(event) {
        $('html, body').animate({
            scrollTop: $("#mob_section1").offset().top 
        }, 1900);
    });

    $('.mob-button2').click(function(){
        var content = $(this).prev(".mob-content")
        content.slideToggle(2000, 'swing', function () { 
          arrowToggle(content);
        });
        $('html, body').animate({ 
            scrollTop: content.offset().top 
        }, 2000);
    });

    $(".mob-button").click(function(){
        $(this).next(".mob-content").slideToggle(2000, 'swing', function () { 
            var content = $(this);
            arrowToggle(content);
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



}(window));
