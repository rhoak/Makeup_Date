(function (window, $){

    'use strict';

    var namespace = {
        projectGlobalPrefix: 'uniquePrefix',
        environment: 'local', //legacy || astra 
        environmentProjectFolder: 'template_vertical', // for a Legacy project, set this to the folder name which is created in the /specialProjects,
                                                       // for an Astra project, set this to { homepage_pools || cat_splash } 
        coremetrics: 'spring15_famultivendor',
        views: {
            sectionInViewport: 'header'
        },
        state: {
            isDesktop: true
        },
        variables: {
            n: 0
        },
        socialShare:{
            facebookTitle: 'ACCESSORIES-PACKED GETAWAY | bloomingdales.com',
            facebookDescription: 'We toted the season\'s top accessories to the stylish @ViceroySM for our latest lookbook...',
            facebookImageFileName: 'uniquePrefix_share_FB.jpg',
            twitterTitle: 'We toted the season\'s top accessories to the stylish @ViceroySM for our latest lookbook @bloomingdales.com http://bit.ly/1C51Mnv',
            pinterestTitle: 'ACCESSORIES-PACKED GETAWAY | bloomingdales.com',
            pinterestImageFileName: 'uniquePrefix_share_Pinterest.jpg'
        },
        urls: {
            pageURL: '/fashion-index/template_vertical.jsp',
            baseURL: 'http://www.bloomingdales.com',
            serverURL: 'http://' + window.location.host,
            facebookShareURL: '',
            twitterShareURL: '',
            pinterestShareURL: ''
        }
    };

    $(window).load(function(){
        //detect device 
        if(Detect({ useUA: true })=='mobiledevice' || Detect({ useUA: true })=='smartphone' || Detect({ useUA: false }) === 'smartphone' || (Detect({ useUA: true })=='firefox' && navigator.userAgent.match('Mobile'))) {
            namespace.state.isDesktop = false;
            initMobile();
        }else{
            initDesktop();
            removeLoader();
        }

        // listeners:
            $('#'+ namespace.projectGlobalPrefix +'_desktop_nav > ul > li > a').on("click", function(event) {
                var hash = $(this).attr('href');
                hash = hash.substring(1, hash.length);
                addressChange(event, hash);
            });
            $('#'+ namespace.projectGlobalPrefix +'_desktop_back_to_top').on('click', function(){
                $("html, body").animate({ scrollTop: 0 }, "slow");
                coreMetrics("Element",namespace.coremetrics,"back_to_top");
            });          
            $('#'+ namespace.projectGlobalPrefix +'_desktop_shop_all_collection').on('click', function(){
                coreMetrics("Element",namespace.coremetrics,"bottom_shop_all_collection");
            });
            $('#'+ namespace.projectGlobalPrefix +'_desktop_shop_all_featured').on('click', function(){
                coreMetrics("Element",namespace.coremetrics,"bottom_shop_all_featured");
            });
            $('#'+ namespace.projectGlobalPrefix +'_desktop_nav_shopall').on('click', function(){
                coreMetrics("Element",namespace.coremetrics,"shop_all_top");
            });
            $('#'+ namespace.projectGlobalPrefix +'_desktop_main_container section a').on('click', function(){
            	var hash = $(this).attr('href');
            	hash = hash.replace('http://www1.bloomingdales.com/shop/','');
				hash = hash.split('?')[0];
                hash = hash.substring(hash.indexOf("/") + 1);
                coreMetrics("Element",namespace.coremetrics,"shop_now_"+ hash);
            });
            $('#'+ namespace.projectGlobalPrefix +'_desktop_main_container img').on('click', function(){
                if (isHotImages(this)){
                    var hash = $(this).attr('data-url');
                    window.open(hash, '_blank');
                    hash = hash.replace('http://www1.bloomingdales.com/shop/','');
                    hash = hash.split('?')[0];
                    hash = hash.substring(hash.indexOf("/") + 1);
                    coreMetrics("Element",namespace.coremetrics,"shop_now_"+ hash +"-image");
                }
            });   

            $('#'+ namespace.projectGlobalPrefix +'_mobile_main_container img').on('click', function(){
                if (isHotImages(this)){
                    var hash = $(this).attr('data-url');
                    window.open(hash, '_blank');
                    hash = hash.replace('http://m.bloomingdales.com/shop/','');
                    hash = hash.split('?')[0];
                    hash = hash.substring(hash.indexOf("/") + 1);
                    coreMetrics("Element",namespace.coremetrics,"shop_now_"+ hash +"-image");
                }
            }); 
            $('.'+ namespace.projectGlobalPrefix +'_mobile_cta').on('click', function(){
                coreMetrics('Element',namespace.coremetrics,'shop_all_featured'); //could use regex to better identify each cta
            });              
            $('#'+ namespace.projectGlobalPrefix +'_mobile_shop_all').on('click', function(){
                coreMetrics("Element",namespace.coremetrics,"shop_all_bottom");
            });
            $('#'+ namespace.projectGlobalPrefix +'_mobile_info_header > a').on('click', function(){
                coreMetrics("Element",namespace.coremetrics,"shop_all_top");
            });
            $('#'+ namespace.projectGlobalPrefix +'_mobile_back_to_top').on('click', function(){
                $("html, body").animate({ scrollTop: 0 }, "slow");
                coreMetrics("Element",namespace.coremetrics,"back_to_top");
            });

            // social share
            $('#'+ namespace.projectGlobalPrefix +'_desktop_socialshare_facebook').on('click', function(){
                window.open(namespace.urls.facebookShareURL, '_blank', 'width=608,height=342');
                coreMetrics('Element',namespace.coremetrics,'social-fb');
            });
            $('#'+ namespace.projectGlobalPrefix +'_desktop_socialshare_twitter').on('click', function(){
                window.open(namespace.urls.twitterShareURL, '_blank', 'width=740,height=340');
                coreMetrics('Element',namespace.coremetrics,'social-twitter');
            });
            $('#'+ namespace.projectGlobalPrefix +'_desktop_socialshare_pinterest').on('click', function(){
                window.open(namespace.urls.pinterestShareURL, '_blank', 'width=770,height=380');
                coreMetrics('Element',namespace.coremetrics,'social-pinterest');
            });
            $('#'+ namespace.projectGlobalPrefix +'_mobile_socialshare_facebook').on('click', function(){
                window.open(namespace.urls.facebookShareURL, '_blank', 'width=608,height=342');
                coreMetrics('Element',namespace.coremetrics,'social-fb');
            });
            $('#'+ namespace.projectGlobalPrefix +'_mobile_socialshare_twitter').on('click', function(){
                window.open(namespace.urls.twitterShareURL, '_blank', 'width=740,height=340');
                coreMetrics('Element',namespace.coremetrics,'social-twitter');
            });
            $('#'+ namespace.projectGlobalPrefix +'_mobile_socialshare_pinterest').on('click', function(){
                window.open(namespace.urls.pinterestShareURL, '_blank', 'width=770,height=380');
                coreMetrics('Element',namespace.coremetrics,'social-pinterest');
            });

            // socialShare();
    });

    $(window).scroll(function(){
        if (namespace.state.isDesktop){
            stickyNav();
            desktopHeaderVisible();
            floatingGrasphic();
        } else {
            mobileStickyFooter();
            mobileSectionCoreMetrics();
            mobileHeaderVisible();
        }
    });

    function initDesktop(){
        stickyNav();
        deepLinks();

		$("img.lazy").show().lazyload({
			threshold : 200,
			effect : "fadeIn"
		});

        hotImages();

        $('#'+ namespace.projectGlobalPrefix +'_desktop_main_container').addClass('loaded');
        $('#'+ namespace.projectGlobalPrefix +'_desktop_header').addClass('active');

        coreMetrics('Pageview',namespace.coremetrics, namespace.coremetrics+'--hp');
    }

    function removeLoader(){
        $('#'+ namespace.projectGlobalPrefix +'_desktop_loader').fadeOut('slow');
    }

    function desktopHeaderVisible(){
        return $('#'+ namespace.projectGlobalPrefix +'_desktop_header').is(':in-viewport') ? $('#'+ namespace.projectGlobalPrefix +'_desktop_header').addClass('active') : $('#'+ namespace.projectGlobalPrefix +'_desktop_header').removeClass('active');
    }

    function stickyNav(){
        if($(window).scrollTop() < ($('#'+ namespace.projectGlobalPrefix +'_desktop_nav_placeholder').offset().top)){
            $('#'+ namespace.projectGlobalPrefix +'_desktop_nav').css({
                'top': $('#'+ namespace.projectGlobalPrefix +'_desktop_nav_placeholder').position().top,
                'position':'absolute'
            });

            removeActiveNavBtn();
        }else{
            $('#'+ namespace.projectGlobalPrefix +'_desktop_nav').css({
                'top': 0,
                'position':'fixed'
            });
            markActiveNavBtn();
        }
    }

    function addressChange(event, hash){
        event.preventDefault();
        $.address.value(hash + "/");
        goToSection(hash);
        coreMetrics("Element",namespace.coremetrics,"top_nav_"+ hash);
    }

    function goToSection(hash){
        namespace.state.isDesktop ? $('html, body').animate({scrollTop : $('#'+ namespace.projectGlobalPrefix +'_desktop_'+ hash).offset().top - 42}, "slow") : $('html, body').animate({scrollTop : $('#'+ namespace.projectGlobalPrefix +'_mobile_'+ hash).offset().top - 50}, "slow");
    }

    function deepLinks(){
        var hash = $.address.value();
        if (hash != '/'){
            hash = hash.substring(1, hash.length-1);
            goToSection(hash);
        }
    }

    function markActiveNavBtn(){
        var sectionsInViewport = [];

		$('#'+ namespace.projectGlobalPrefix +'_desktop_main_container section:in-viewport').each(function(){
            if ($(this).offset().top > 42){
    		    var hash = $(this).attr('id');
    		    hash = hash.replace(namespace.projectGlobalPrefix +'_desktop_','');
                sectionsInViewport.push(hash);
            }
		});

        if (sectionsInViewport.length == 1){
            $('#'+ namespace.projectGlobalPrefix +'_desktop_nav > ul > li > a').each(function(){
                var el = $(this).attr('href');
                if (el.indexOf(sectionsInViewport[0]) > -1){
                    $('#'+ namespace.projectGlobalPrefix +'_desktop_nav > ul > li > a').removeClass('active');
                    $(this).addClass('active');
                    $('#'+ namespace.projectGlobalPrefix +'_desktop_main_container section').removeClass('active');
                    $('#'+ namespace.projectGlobalPrefix +'_desktop_'+ el.substring(1, el.length)).addClass('active');
                    $.address.value(el.substring(1, el.length) + "/");
                }
            });  

            if (namespace.views.sectionInViewport != sectionsInViewport[0]){
                namespace.views.sectionInViewport = sectionsInViewport[0];
                coreMetrics("Pageview", namespace.coremetrics, namespace.coremetrics+ '-' + namespace.views.sectionInViewport);
            }
        } else if (sectionsInViewport.length == 2){
            if (namespace.views.sectionInViewport == 'header'){
                namespace.views.sectionInViewport == sectionsInViewport[0];
                coreMetrics("Pageview", namespace.coremetrics, namespace.coremetrics+ '-' + namespace.views.sectionInViewport);
            } else {
                $('#'+ namespace.projectGlobalPrefix +'_desktop_nav > ul > li > a').each(function(){
                    var el = $(this).attr('href');
                    if (el.indexOf(namespace.views.sectionInViewport) > -1){
                        $('#'+ namespace.projectGlobalPrefix +'_desktop_nav > ul > li > a').removeClass('active');
                        $(this).addClass('active');
                        $('#'+ namespace.projectGlobalPrefix +'_desktop_main_container section').removeClass('active');
                        $('#'+ namespace.projectGlobalPrefix +'_desktop_'+ el.substring(1, el.length)).addClass('active');
                        $.address.value(el.substring(1, el.length) + "/");
                    }
                }); 
            } 
        }
    }

    function removeActiveNavBtn(){
    	return $('#'+ namespace.projectGlobalPrefix +'_desktop_nav > ul > li > a').removeClass('active');
    }

    function hotImages(){
        // for each image check if it has attached a data-url attr to switch to pointer cursor
        $('#'+ namespace.projectGlobalPrefix +'_desktop_main_container img').each(function(){
            var attr = $(this).attr('data-url');

            if (typeof attr !== typeof undefined && attr !== false && attr !== '#'){
                $(this).css('cursor','pointer');
                addImageID(this);
            }
        });
    }

    function isHotImages(elementID){
        var attr = $(elementID).attr('data-url');
        return (typeof attr !== typeof undefined && attr !== false && attr !== '#') ? true : false;
    }

    function addImageID(elementID){
        var attr = $(elementID).attr('src');

        if (attr.match(/\.(jpeg|jpg|gif|png)$/) != null) {
            return $(elementID).attr('id', attr.substr(attr.lastIndexOf('/') + 1).slice(0,-4));
        } else {
            attr = $(elementID).attr('data-original');
            return $(elementID).attr('id', attr.substr(attr.lastIndexOf('/') + 1).slice(0,-4));
        }  
    }

    function floatingGrasphic () {
        if ($('#uniquePrefix_desktop_back_to_top').is(':in-viewport')){
            $('#uniquePrefix_desktop_floating_graphic').css('top','30%');
        } else {
            $('#uniquePrefix_desktop_floating_graphic').css('top','50%');
        }
    }    

    function initMobile(){
        if (namespace.environment == 'legacy'){
            loadMobileCSS('/web20/assets/style/specialProjects/'+ namespace.environmentProjectFolder +'/'+ namespace.projectGlobalPrefix +'_style-mobile.css');    
        } else if (namespace.environment == 'astra'){
            loadMobileCSS('/dyn_img/'+ namespace.environmentProjectFolder +'/'+ namespace.projectGlobalPrefix +'_style-mobile.css');
        } else if (namespace.environment == 'local'){
            loadMobileCSS(namespace.projectGlobalPrefix +'_style-mobile.css');
        } else {
            console.log('Error setting up the namespace');
        }

        window.setTimeout( function(){
            $('#'+ namespace.projectGlobalPrefix +'_desktop_main_container').hide();
            $('#'+ namespace.projectGlobalPrefix +'_mobile_main_container, #'+ namespace.projectGlobalPrefix +'_mobile_back_to_top_container').show();

            $('#bl_main_container').addClass(namespace.projectGlobalPrefix +'_mobile_main_container-bl_main_container_reset');

            var footerStickyHTML = '<div id="'+ namespace.projectGlobalPrefix +'_mobile_back_to_top_container" style="display: block; position: relative; bottom: 0px;"><a id="'+ namespace.projectGlobalPrefix +'_mobile_back_to_top" class="#'+ namespace.projectGlobalPrefix +'_mobile_cta" href="#">back to top</a></div>';
            $('body').append(footerStickyHTML);

            mobileStickyFooter();
            deepLinks();

            $("img.lazyM").show().lazyload({
                threshold : 200,
                effect : "fadeIn"
            });

            $('#'+ namespace.projectGlobalPrefix +'_mobile_main_container').addClass('loaded');

            removeLoader();            

            coreMetrics("Pageview", namespace.coremetrics, namespace.coremetrics + "--hp");
        }, 100);
    }

    function loadMobileCSS( href, before, media ){
      // ARGUMENTS EXPLAINED:
          // `href` is the URL for your CSS file.
          // `before` optionally defines the element we'll use as a reference for injecting our <link>
          // By default, `before` uses the first <script> element in the page.
          // However, since the order in which stylesheets are referenced matters, you might need a more specific location in your document.
          // If so, pass a different reference element to the `before` argument and it'll insert before that instead
          // note: `insertBefore` is used instead of `appendChild`, for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
      var ss = window.document.createElement( "link" );
      var ref = before || window.document.getElementsByTagName( "script" )[ 0 ];
      var sheets = window.document.styleSheets;
      ss.rel = "stylesheet";
      ss.href = href;
      // temporarily, set media to something non-matching to ensure it'll fetch without blocking render
      ss.media = "only x";
      // inject link
      ref.parentNode.insertBefore( ss, ref );
      // This function sets the link's media back to `all` so that the stylesheet applies once it loads
      // It is designed to poll until document.styleSheets includes the new sheet.
      function toggleMedia(){
        var defined;
        for( var i = 0; i < sheets.length; i++ ){
          if( sheets[ i ].href && sheets[ i ].href.indexOf( href ) > -1 ){
            defined = true;
          }
        }
        if( defined ){
          ss.media = media || "all";
        }
        else {
          setTimeout( toggleMedia );
        }
      }
      toggleMedia();
      return ss;
    };

    function mobileStickyFooter(){
        if ($('.mvBloomMenuHeader').is(':in-viewport')){
            $('#'+ namespace.projectGlobalPrefix +'_mobile_back_to_top_container').css({
                'position': 'relative',
                'bottom': '215px'
            });
        } else {
            $('#'+ namespace.projectGlobalPrefix +'_mobile_back_to_top_container').css({
                'position': 'fixed',
                'bottom': 0
            });
        }
    }

    function mobileSectionCoreMetrics(){
        var sectionsInViewport = [];

        $('#'+ namespace.projectGlobalPrefix +'_mobile_main_container section:in-viewport').each(function(){
            var hash = $(this).attr('id');
            hash = hash.replace(namespace.projectGlobalPrefix +'_mobile_','');
            sectionsInViewport.push(hash);
        });

        if (sectionsInViewport.length == 1){
            $('#'+ namespace.projectGlobalPrefix +'_mobile_main_container section').removeClass('active');
            $('#'+ namespace.projectGlobalPrefix +'_mobile_'+ sectionsInViewport[0]).addClass('active');

            if (namespace.views.sectionInViewport != sectionsInViewport[0]){
                namespace.views.sectionInViewport = sectionsInViewport[0];
                coreMetrics('Pageview', namespace.coremetrics, namespace.coremetrics+ '-section-'+ namespace.views.sectionInViewport);
            }
        } else if (sectionsInViewport.length == 2){
            $('#'+ namespace.projectGlobalPrefix +'_mobile_main_container section').removeClass('active');

            $('#'+ namespace.projectGlobalPrefix +'_mobile_main_container section').each(function(){
                var el = $(this).attr('id');
                if (el.indexOf(namespace.views.sectionInViewport) > -1){
                    $('#'+ namespace.projectGlobalPrefix +'_mobile_'+ el).addClass('active');
                }
            });  
        }
    }

    function mobileHeaderVisible(){
        return $('#'+ namespace.projectGlobalPrefix +'_mobile_header').is(':in-viewport') ? $('#'+ namespace.projectGlobalPrefix +'_mobile_header').addClass('active') : $('#'+ namespace.projectGlobalPrefix +'_mobile_header').removeClass('active');
    }    

    function coreMetrics(tag_type, category_name, tag_value){
        if(tag_type=="Pageview"){
            try {
                BLOOMIES.coremetrics.cmCreatePageviewTag(tag_value, category_name);
            } catch (e) {
                trace("Coremetrics Library Not Found..." + e);
            }
            trace("{{{{{{{{ Pageview- category_name: "+category_name+" tag_value: "+tag_value+" }}}}}}}}");
        }else if(tag_type=="Element"){
            try {
                BLOOMIES.coremetrics.cmCreatePageElementTag(tag_value, category_name);
            } catch (e) {
                trace("Coremetrics Library Not Found... " + e);
            }

            trace("{{{{{{{{ Element- category_name: "+category_name+" tag_value: "+tag_value+" }}}}}}}}");
        }
    }
    function trace(log_string){
        if (window.location.href.indexOf('bloomingdales.com') < 0) window.console && console.info(log_string);
    }
    
    function socialShare(){
        var baseURL = null;

        try {
            if (namespace.urls.serverURL.indexOf('.fds.com') !== -1){
                baseURL = namespace.urls.serverURL;
            } else {
                baseURL = namespace.urls.baseURL;
            }
        } catch (e) {
            trace('Social share issue: ' + e);
        }
        
        var pageURL = namespace.urls.pageURL
        pageURL = pageURL.substr(pageURL.lastIndexOf('/'));
        pageURL = pageURL.slice(0,-4);

        try {
            if (namespace.environment == 'legacy'){
                var baseURLAssets = 'http://assets.'+ (window.location.host).replace('mdev1.','') +'/web20/assets/img/specialProjects'+ pageURL +'/';
            } else if (namespace.environment == 'astra'){
                var baseURLAssets = 'http://assets.'+ (window.location.host).replace('mdev1.','') +'/dyn_img/cat_splash/';
            }
        } catch (e) {
            trace('Social share issue: ' + e);
        }
       
        namespace.urls.pageURL = baseURL + namespace.urls.pageURL;

        namespace.urls.facebookShareURL = 'https://www.facebook.com/dialog/feed';
        namespace.urls.facebookShareURL += '?app_id=145634995501895';
        namespace.urls.facebookShareURL += '&name=' + encodeURIComponent(namespace.socialShare.facebookTitle);
        namespace.urls.facebookShareURL += '&description=' + encodeURIComponent(namespace.socialShare.facebookDescription);
        namespace.urls.facebookShareURL += '&link=' + encodeURIComponent(namespace.urls.pageURL);
        namespace.urls.facebookShareURL += '&picture=' + encodeURIComponent(baseURLAssets + namespace.socialShare.facebookImageFileName);
        namespace.urls.facebookShareURL += '&display=popup&redirect_uri=' + encodeURIComponent('https://www.facebook.com/');

        namespace.urls.twitterShareURL = 'https://twitter.com/home?';
        namespace.urls.twitterShareURL += 'status=' + encodeURIComponent(namespace.socialShare.twitterTitle);

        namespace.urls.pinterestShareURL = 'http://pinterest.com/pin/create/button/?';
        namespace.urls.pinterestShareURL += 'url=' + encodeURIComponent(namespace.urls.pageURL);
        namespace.urls.pinterestShareURL += '&media=' + encodeURIComponent(baseURLAssets + namespace.socialShare.pinterestImageFileName);
        namespace.urls.pinterestShareURL += '&description=' + encodeURIComponent(namespace.socialShare.pinterestTitle);        
    }

}(window, jQuery));
