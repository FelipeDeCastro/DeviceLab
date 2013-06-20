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
		

//Scrola a página para o conteúdo/id relacionado ao ítem de menu clicado
function MenuDeAncoras(){
	$('.menu, #logo2, #logo3').click(function(event){
		event.preventDefault();
		
		var ancora = $(this).attr('href');
		
		$('.menu').removeClass('active');
		$('html, body').stop().animate({
			scrollTop: $(ancora).offset().top+10
		}, 750,'easeInOutQuint');
		$(this).addClass('active');
	});
};

//Constrói o menu flutuante
function MontaMenuQVoa(){
	var menu = $('#menu').clone().addClass('qvoa');
	$('#menu').after($(menu));
	$('#menu.qvoa').find('#logo').hide();
	$('#menu.qvoa').find('#logo2').show();
}

//Exibe e marca o menu de acordo com o conteúdo/id apresentado
function MarcaMenu(){
	var apresentacaoH = $('#apresentacao').offset().top;
	var projetosH = $('#projetos').offset().top;
	var pesquisasH = $('#pesquisas').offset().top;
	var namidiaH = $('#na-midia').offset().top;
	var faleconoscoH = $('#fale-conosco').offset().top;
	
	if($(document).scrollTop() >= apresentacaoH-99 && $(document).scrollTop() < projetosH){
		$(".menu").removeClass('active');
		$('.dl').addClass('active');
		$('.qvoa').slideDown('fast');
	}
	else if($(document).scrollTop() >= projetosH && $(document).scrollTop() < pesquisasH){
		$(".menu").removeClass('active');
		$('.lp').addClass('active');
		$('.qvoa').slideDown('fast');
	}
	else if($(document).scrollTop() >= pesquisasH && $(document).scrollTop() < namidiaH){
		$(".menu").removeClass('active');
		$('.pesq').addClass('active');
		$('.qvoa').slideDown('fast');
	}
	else if($(document).scrollTop() >= namidiaH && $(document).scrollTop() < faleconoscoH){
		$(".menu").removeClass('active');
		$('.mid').addClass('active');
		$('.qvoa').slideDown('fast');
	}
	else if($(document).scrollTop() >= faleconoscoH){
		$(".menu").removeClass('active');
		$('.fc').addClass('active');
		$('.qvoa').slideDown('fast');
	}
	else if($(document).scrollTop() < apresentacaoH-99){
		$(".menu").removeClass('active');
		$('.qvoa').slideUp('fast');
	}
};


//Exibe o vídeo do topo
function mostraVideo(){
	$('#mostra-video').click(function(e){
		e.preventDefault();
		
		$('#mostra-video').fadeOut('fast');
		$('#foto-topo').addClass('comvideo').find('.wrap').stop().animate({height: 540}, 750,'easeInOutQuint');
		$('#foto-topo').children('.wrap').append('<iframe id="video" src="http://player.vimeo.com/video/56758941?title=0&amp;byline=0&amp;portrait=0&amp;color=ee2c43&amp;autoplay=1" width="960" height="540" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>')
		carregaLegenda();
	});
};

//Slides de #faça uma visita
function slider(){
	var larguraViewport = $(window).width();
	var slides = $("#conteudo").html();
	var pedacoDeCodigo = '<div id="slider"><div class="slides_container">'+ slides +'</div></div>';
	console.log(pedacoDeCodigo);

	$("#slider").remove();
	$("#conteudo").after(pedacoDeCodigo);
	$(".slides_container, .slides_container div").width(larguraViewport);	
	$("#slider").slides({
		effect: 'fade',
		play: 5000,
		fadeEasing: "easeOutQuad",
		fadeSpeed: 150,
		bigTarget: true
	});
};

//navegar entre projetos
function ProjetosNav(){
	$('#projetos #nav a').click(function(e){
		e.preventDefault();

		$('#projetos #nav li').removeClass('active');
		$(this).parent('li').addClass('active');

		var target = $(this).attr('href');
		$('#projetos .conteudo').fadeOut();
		$('#projetos .conteudo').removeClass('active');
		$(target).addClass('active').fadeIn();
	})
}

//Evento no analytics para os cliques no play do vídeo
function playEventTracker(){
	$('mostra-video').click( function(){
		gaq.push(['_trackEvent', 'vídeo', 'visualizado']);
	});
};


//Ao terminar de carregar todos os elementos da página
$(document).ready(function() {
	initialize();
	MontaMenuQVoa();
	MarcaMenu();
	MenuDeAncoras();
	mostraVideo();
	slider();
	menuMapa();
	playEventTracker();
	ProjetosNav();

	//Ao scrollar a página
	$(window).bind('scroll',function(e){
		MarcaMenu();
	});
	
	//Ao redimensionar a janela
	$(window).resize(function() {
		initialize();
		slider();
	});	
	
});