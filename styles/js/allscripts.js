var bdy = $('body'),
	win = $(window),
	doc = $(document),
	wt = parseFloat( win.width() ),
	ht = parseFloat( win.height() ),
	wst = parseFloat( win.scrollTop() ),
	sRatio,
	header = {
		menu: {
			el: '.hamburger-menu',
			opened: function(){ uty.cssClass({ 'ID': 'body', 'delay': 1, 'type': 'add', 'cls':['menu-ready', 'menu-animate'] }); },
			closed: function(){ uty.cssClass({ 'ID': 'body', 'delay': 444, 'type': 'remove', 'cls':['menu-animate', 'menu-ready'] }); },
			init: function(){
				var _t = this;
				$( _t.el ).bind('click', function(){
					if( bdy.hasClass('menu-ready') )
						_t.closed();
					else
						_t.opened();	
				});
			}
		},
		buyBar: {
			el: '.buy-bar',
			init: function(){
				
			}
		},
		init: function(){
			var _t = this;
				_t.buyBar.init();
				_t.menu.init();
		}
	},	
	mainPage = {
		wrp: '#home-page',
		plugin: function(){
			uty.lettering( { ID: '.home-slider-holder > h2, .home-slider-holder > p', type: 'lines' } );
			uty.swiper( { ID: '.home-slider .swiper-container', prop: { preloadImages: false, lazyLoading: true } } );	
			uty.swiper( { ID: '.home-mini-slider	.swiper-container', prop: { preloadImages: false, lazyLoading: true } } );		
		},
		add: function(){
			
		},
		init: function(){
			var _t = this;
			if( uty.detectEl( $( _t.wrp ) ) )
				_t.plugin();
		}
	},
	uty = {
		speed: 888,
		easing: 'easeInOutExpo',
		ani: function( o, callback ){
			var _t = this, ID = o['el'];
			if( _t.detectEl( ID ) )
				ID.velocity(o['prop'] || {}, { duration:  o['speed'] || _t.speed, easing: o['easing'] || _t.easing, complete: function(){
					if( callback != undefined && callback != null && callback != '' ) 
						callback(); 
				}});
		},
		setCss: function( o ){
			o['el'].css( o['prop'] || {} ).attr( o['attr'] || {} );
		},
		setAttr: function( o ){
			o['el'].attr( o['prop'], o['val'] || '' );
		},
		detectEl: function( ID ){
			return ID.length > 0 ? true : false;
		},
		ajx: function( o, callback, error ){	
			$.ajax({
				type: o['type'] || 'GET',
				dataType: o['dataType'] || 'html',
				url: o['uri'] || '',
				error: function( e ){ 
					if( error != undefined && error != null && error != '' ) 
						error( e ); 
				},
				timeout: 30000,
				success:function( d ){ 
					if( callback != undefined && callback != null && callback != '' ) 
						callback( d );
				}
			});
		},
		cssClass: function( o, callback ){
			var _t = this, ID = $( o['ID'] ), k = o['delay'], type = o['type'], cls;
			if( _t.detectEl( ID ) ){
				if( type == 'add' ){
					cls = o['cls'] || ['ready', 'animate'];
					ID.addClass( cls[ 0 ] ).delay( k ).queue('fx', function(){ $( this ).dequeue().addClass( cls[ 1 ] ); if( callback != undefined ) callback(); });
				}else{
					cls = o['cls'] || ['animate', 'ready'];
					ID.removeClass( cls[ 0 ] ).delay( k ).queue('fx', function(){ $( this ).dequeue().removeClass( cls[ 1 ] ); if( callback != undefined ) callback(); });
				}
			}
		},
		pageScroll: function( o, callback ){
			var _t = this;
			$('html, body').stop().animate({ scrollTop: o['scrollTop'] || 0 }, o['speed'] || _t.speed, o['easing'] || _t.easing, function(){ 
				if( callback != undefined && callback != null && callback != '' )
					callback();  
			});
		},
		lettering: function( o, callback ){
			var _t = this, ID = $( o['ID'] );
			if( _t.detectEl( ID ) )
				ID.lettering( o['type'] );
		},
		swiper: function( o, callback ){
			var _t = this;
			if( _t.detectEl( $( o['ID'] ) ) ){
				var s = new Swiper( o['ID'], o['prop'] ); 
				if( callback != undefined && callback != null && callback != '' )
					callback( s );
			}
		},
		lazyLoad: function( o, callback ){
			var _t = this, ID = $( o['ID'] );
			if( _t.detectEl( $('.lazy', ID) ) )
				$('.lazy', ID).lazyload({ effect: 'fadeIn', load: function(){ 
					$( this )
					.removeClass('lazy')
					.addClass('loaded'); 
				}});
		},
		pageProgress: function( o, callback ){
				var _t = this;
				_t.cssClass({ 'ID': 'body', 'delay': 1, 'type': 'add', 'cls':['page-progress-ready', 'page-progress-animate'] });
				_t.cssClass({ 'ID': 'body', 'delay': 444, 'type': 'remove', 'cls':['page-progress-animate', 'page-progress-ready'] });
				if( callback != undefined && callback != null && callback != '' )
					callback();
		},
		wayPoint: {
			el: 'article',
			active: false,
			rate: .5,
			cls: 'animated',
			enabled: function(){ _t.active = true; },
			disabled: function(){ _t.active = false; },
			init: function(){
				var _t = this, el = $( _t.el );
				if( uty.detectEl( el ) && _t.active )
					el.each(function(){
                        var ths = $( this ),
							o1 = { x: 0, y: wst, width: wt, height: ht * _t.rate },
               				o2 = { x: 0, y: ths.offset().top, width: wt, height: ths.height() * _t.rate };
						
						if( o1.x < o2.x + o2.width && o1.x + o1.width  > o2.x && o1.y < o2.y + o2.height && o1.y + o1.height > o2.y )
							ths.addClass( _t.cls );
							
                    });
			}
		},
		compactMenu: {
			rate: 0,
			cls: 'compact-menu',
			init: function(){
				var _t = this;
				if( wst > _t.rate && !bdy.hasClass( _t.cls ) )
					bdy.addClass( _t.cls );
				else if( wst == _t.rate && bdy.hasClass( _t.cls ) )
					bdy.removeClass( _t.cls );
			}
		}
	},
	events = {
		loaded: function(){
			uty.lazyLoad( { ID: 'body' } );
		},
		onResize: function(){
			wt = parseFloat( win.width() );
			ht = parseFloat( win.height() );
			
			uty.wayPoint.init();
			uty.compactMenu.init();
		},
		onScroll: function(){
			wst = parseFloat( win.scrollTop() );
			sRatio = wst / ( doc.height() - ht );
			
			uty.wayPoint.init();
			uty.compactMenu.init();
		},
		init: function(){
			var _t = this;
			win.load( _t.loaded );
			win.resize( _t.onResize ).resize();
			win.scroll( _t.onScroll ).scroll();	
		}
	},
	initialize = function(){
		header.init();
		mainPage.init();
		events.init();	
	};
	
	initialize();