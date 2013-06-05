//Carrega mapa do google
function initialize() {
	var mapDiv = document.getElementById('mapa');
	var coordenadas = new google.maps.LatLng(-23.004250,-43.325294);
	var map = new google.maps.Map(mapDiv, {
		center: coordenadas,
		zoom: 16,
		scrollwheel: false,
		
		panControl: true,
		panControlOptions: {
			position: google.maps.ControlPosition.TOP_RIGHT
		},
		
		zoomControl: true,
		zoomControlOptions: {
		  style: google.maps.ZoomControlStyle.SMALL,
		  position: google.maps.ControlPosition.TOP_RIGHT
		},
		
		scaleControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true
	});
	var marker = new google.maps.Marker({
		position: coordenadas,
		map: map,
		icon: 'img/mapa-marcador.png',			
		title:"DeviceLab"
	});
};

//Exibir e esconder os controles do mapa
function menuMapa(){
	$("#fale-conosco").hover(
		function(){
			$(".gmnoprint").fadeIn("fast");
		},
		function(){
			$(".gmnoprint").fadeOut("fast");
		}
	);
};
		
//Exibe o menu voador de acordo com a altura do scroll
function MenuQVoa(){
	if($(document).scrollTop() >= 725){
		$('.qvoa').slideDown('fast');
	} else {
		$('.qvoa').slideUp('fast');
	}
};

//Scrola a pagina de acordo com o ítem do menu
function MenuDeAncoras(){
	$('.menu, #logo2, #logo3').click(function(event){
		event.preventDefault();
		
		var ancora = $(this).attr('href');
		
		$('.menu').removeClass('active');
		$('html, body').stop().animate({
			scrollTop: $(ancora).offset().top-100
		}, 750,'easeInOutQuint');
		$(this).addClass('active');
	});
};

//Marca o menu de acordo com o scroll da página
function MarcaMenu(){
	var apresentacaoH = $('#apresentacao').offset().top-101;
	var projetosH = $('#projetos').offset().top-101;
	var faleconoscoH = $('#fale-conosco').offset().top-130;
	
	if($(document).scrollTop() >= apresentacaoH && $(document).scrollTop() < projetosH){
		$(".menu").removeClass('active');
		$('.dl').addClass('active');
	}
	else if($(document).scrollTop() >= projetosH && $(document).scrollTop() < faleconoscoH){
		$(".menu").removeClass('active');
		$('.lp').addClass('active');
	}
	else if($(document).scrollTop() >= faleconoscoH){
		$(".menu").removeClass('active');
		$('.fc').addClass('active');
	}
	else if($(document).scrollTop() < apresentacaoH){
		$(".menu").removeClass('active');
	}
};


//Exibe o vídeo do topo
function mostraVideo(){
	$('#mostra-video').click(function(e){
		e.preventDefault();
		
		$('#mostra-video').fadeOut('fast');
		$('#foto-topo').addClass('comvideo').find('.wrap').stop().animate({height: 540}, 750,'easeInOutQuint');
		$('#foto-topo').children('.wrap').append('<iframe id="video" src="http://player.vimeo.com/video/56758941?title=0&amp;byline=0&amp;portrait=0&amp;color=ee2c43&amp;autoplay=1" width="960" height="540" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>')
	});
};

//Slides de #faça uma visita
function slider(){
	var larguraViewport = $(window).width();
	var pedacoDeCodigo = '<div class="slides_container"><div class="tres" style="background:url(img/slide1.jpg) center top no-repeat;"></div><div class="dois" style="background:url(img/slide2.jpg) center top no-repeat;"></div><div class="um" style="background:url(img/slide3.jpg) center top no-repeat;"></div></div>';
	
	$("#slider").empty().html(pedacoDeCodigo);
	$(".slides_container, .slides_container div").width(larguraViewport);	
	$("#slider").slides({
        effect: 'fade',
		play: 5000,
		fadeEasing: "easeOutQuad",
		fadeSpeed: 150,
		bigTarget: true
      });
};

//Evento no analytics para os cliques no play do vídeo
function playEventTracker(){
	$('mostra-video').click( function(){
		gaq.push(['_trackEvent', 'vídeo', 'visualizado']);
	});
};


//Ao terminar de carregar todos os elementos da página
$(document).ready(function() {
	initialize();
	MarcaMenu();
	MenuDeAncoras();
	MenuQVoa();	
	mostraVideo();
	slider();
	menuMapa();
	playEventTracker();

	//Ao scrollar a página
	$(window).bind('scroll',function(e){
		MarcaMenu();
		MenuQVoa();
	});
	
	//Ao redimensionar a janela
	$(window).resize(function() {
		initialize();
		slider();
	});	
	
});