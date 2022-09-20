
// фиксированое меню
const header = document.querySelector('.header'),
	  headerFixed = document.createElement('div'),
	  wrap = document.querySelector('.main-wrap')

	headerFixed.classList.add('header-fixed')
	headerFixed.append(header.cloneNode(true))

  	if(window.innerWidth < 768){
		const mobileMenuBtn = document.querySelector('.mobile-menu-butt'),
			  mobileMenuBtn_headerFixed =  mobileMenuBtn.cloneNode(true)

		mobileMenuBtn_headerFixed.classList.add('active')
		wrap.prepend(headerFixed, mobileMenuBtn_headerFixed)

		window.onscroll = () => {
			const scroll = window.scrollY
			scroll > 80 
			? (headerFixed.classList.add('active'),
			  mobileMenuBtn_headerFixed.style.transform = 'translateY(0)') 
			: (headerFixed.classList.remove('active'),
			  mobileMenuBtn_headerFixed.style.transform = 'translateY(-300%)')
		}
	}
	else{
		wrap.prepend(headerFixed)
		window.onscroll = () => {
			const scroll = window.scrollY
			scroll > 130
			? headerFixed.classList.add('active')
			: headerFixed.classList.remove('active')
		}
	}

// волны
let openChat = false

function waveAnimation (){
	"use strict";
	var cvs,ctx;
	var nodes = 3;
	var waves = [];
	var waveHeight = 350;
	var colours = ["rgb(48,52,55)","rgb(89,97,100)","rgb(89,97,100)","rgb(147,152,156)"];

	function init() {
		cvs = document.getElementById("canvas");
		ctx = cvs.getContext("2d");
		resizeCanvas(cvs);
		for (var i = 0; i < 4; i++) {
			waves.push(new wave(colours[i], 1, nodes));
		}
    update();
	}

	function update() {
    var fill = window.getComputedStyle(document.querySelector(".header-canvas"),null).getPropertyValue("background-color");
		ctx.fillStyle = fill;
		ctx.globalCompositeOperation = "source-over";
		ctx.fillRect(0,0,cvs.width,cvs.height);
    	ctx.clearRect(0,0,cvs.width,cvs.height);
		ctx.globalCompositeOperation = "screen";
		for (var i = 0; i < waves.length; i++) {
			for (var j = 0; j < waves[i].nodes.length; j++) {
				bounce(waves[i].nodes[j]);
			}
			drawWave(waves[i]);
		}
		ctx.fillStyle = fill;

		(window.innerWidth < 768)
		? (!openChat)
			? requestAnimationFrame(update)
			: ''
		: requestAnimationFrame(update)
	}

	function wave(colour, lambda, nodes) {
		this.colour = colour;
		this.lambda = lambda;
		this.nodes = [];
		var tick = 1;
  
		for (var i = 0; i <= nodes+2; i++) {
			var temp = [(i-1) * cvs.width / nodes, 0, Math.random()*200, .15];
			this.nodes.push(temp);
		}
	}

	function bounce(nodeArr) {
		nodeArr[1] = waveHeight/2*Math.sin(nodeArr[2]/20)+cvs.height/2;
		nodeArr[2] = nodeArr[2] + nodeArr[3];
	}
	
	function drawWave (obj) {
		var diff = function(a,b) {
			return (b - a)/2 + a;
		}
    
		ctx.fillStyle = obj.colour;
		ctx.beginPath();
		ctx.moveTo(0,cvs.height);
		ctx.lineTo(obj.nodes[0][0],obj.nodes[0][1]);
    
		for (var i = 0; i < obj.nodes.length; i++) {
      
			if (obj.nodes[i+1]) {
				ctx.quadraticCurveTo(
					obj.nodes[i][0],obj.nodes[i][1],
					diff(obj.nodes[i][0],obj.nodes[i+1][0]),diff(obj.nodes[i][1],obj.nodes[i+1][1])
				);
			}
      else {
				ctx.lineTo(obj.nodes[i][0],obj.nodes[i][1]);
				ctx.lineTo(cvs.width,cvs.height);
			}
		}
		ctx.closePath();
		ctx.fill();
	}

	function resizeCanvas(canvas,width,height) {
		if (width && height) {
			canvas.width = width;
			canvas.height = height;
		}
    else {
			if (window.innerWidth > 1920) {
				canvas.width = window.innerWidth;
			}
			else {
				canvas.width = 1920;
			}
			canvas.height = waveHeight;
		}
	}

	init()
}

waveAnimation()



jQuery(document).ready(function ($) {
	// скролы к якорям	

	let $page = $('html, body');
	$('a[href*="#"]').click(function () {
	$page.animate({
		scrollTop: $($.attr(this, 'href')).offset().top - 110
	}, 500);
	history.pushState('data to be passed', 'Title of the page', $.attr(this, 'href'));
	history.replaceState('data to be passed', 'Title of the page', '.');
	return false;
	});

	// клик по логотипу

	$('.logo-header').click(function(){
		$('html, body').animate({
			scrollTop: 0
		}, 500);
	})

	// анимация фона

	let bg = document.querySelector('.main-wrap-bg');
	let mainWrap = document.querySelector('.main-wrap');
	
	$(mainWrap).mousemove(function(e) {
		if (window.innerWidth > 1000) {
		let x = e.clientX / window.innerWidth;
		let y = e.clientY / window.innerHeight;
		bg.style.transform = 'translate(-' + x * 100 + 'px, -' + y * 100 + 'px)';
		}
	}); 

	// анимация стрелок вниз
	let arr_small = document.querySelector('.arrow-down').children[0]
	let arr_big = document.querySelector('.arrow-down').children[1]

	setInterval(() => { 
		$(arr_small).animate({opacity: '.1'},1000);
		$(arr_big).animate({opacity: '.1'},1000);
		}, 4000);
	setInterval(() => { 
		$(arr_small).animate({opacity: '.5'},200);
		$(arr_big).delay(200).animate({opacity: '1'},200);
		}, 4000);

	//слайдер 
	const activeSlide = document.querySelectorAll('#programm.slide')
	$(activeSlide).clone().appendTo($('.slider-track'))
	
	// меню слайдера

	$(".button").on("click", function(e) {
		e.preventDefault();
        $(this)
            .addClass("active")
            .siblings()
            .removeClass("active")

	// вставка слайдов и анимация

	let slides = document.querySelectorAll('.slide')
	let track_up = document.createElement ('div')

		$(track_up).addClass('slider-track upToCenter')
		$(track_up).prependTo('.slider-list')

	let _id = $(e.target).closest('[id]').attr('id');
		$(slides).each(function () {
			if ($(this).attr('id') === _id) {
				$(this).clone().appendTo($('.upToCenter'))
			}
		})

		$('.center').addClass('centerToDown').removeClass('center')
		$('.centerToDown').addClass('animate__fadeOutDown')
		
		setTimeout(() => {
			$('.upToCenter').addClass('center').removeClass('upToCenter')
			$('.center').addClass('animate__fadeInDown')
		},500)
		
		setTimeout(()=> {
			$('.centerToDown').remove()	
		},800)
		setTimeout(() => {
			$('.slider-list').animate({
				scrollLeft: 0
			});
		}, 1000)
		
		  
	// disable кнопок слайдера по клику меню

	let sliderTrackWidth = document.querySelector('.slider-track').offsetWidth
	let sliderListWidth = document.querySelector('.slider-list').offsetWidth
	let widthSlider = sliderTrackWidth - sliderListWidth

		$(sliderList).on('scroll', () => {
				if (widthSlider === Math.round(sliderList.scrollLeft)) {
					$('#right').addClass('disable')
				}else{
					$('#right').removeClass('disable')
				}
			})
		})

	// disable кнопок слайдера при загрузке

	let sliderTrackWidth = document.querySelector('.slider-track').offsetWidth
	let sliderList = document.querySelector('.slider-list')
	let sliderListWidth = document.querySelector('.slider-list').offsetWidth
	let widthSlider = sliderTrackWidth - sliderListWidth
	
	$(sliderList).on('scroll', () => {
		if (sliderList.scrollLeft === 0) {
			$('#left').addClass('disable')
		}else{
			$('#left').removeClass('disable')
		}
		
		if (widthSlider === Math.round(sliderList.scrollLeft)) {
			$('#right').addClass('disable')
		}else{
			$('#right').removeClass('disable')
		}
	})
	
	// клик по кнопке слайдера

  $('#right').click(function (e) {
    e.preventDefault()
    $('.slider-list').animate({
      scrollLeft: "+=250px"
    }, 500);
  })
  $('#left').click(function () {
    $('.slider-list').animate({
      scrollLeft: "-=250px"
    }, 500);
  })

  $(".slider-list").mousedown(function (e) {
    let startX = this.scrollLeft + e.pageX;

    $(".slider-list").mousemove(function (e) {
      this.scrollLeft = startX - e.pageX;
      return false;
    });
  });
  $(window).mouseup(function () {
    $(".slider-list").off("mousemove");
  });

  // мобильное меню

  $('.mobile-menu-butt').click(function () {
    $('.mobile-menu-butt span').toggleClass('active');
    $('.mobile-menu').toggleClass('active');
    $('.menu-dark').toggleClass('active');
    $('body').toggleClass('no-scroll')
  })
  $('.mobile-menu a').click(function () {
    $('body').toggleClass('no-scroll')
    setTimeout(function () {
      $('.mobile-menu').removeClass('active');
      $('.menu-dark').toggleClass('active');
      $('.mobile-menu-butt span').removeClass('active');
    }, 700)
  })

  $('.menu-dark').click(function(e){ // закрыть меню по клику вне его
    if (!$('.mobile-menu.active').is(e.target) && $('.mobile-menu.active, .mobile-menu-butt').has(e.target).length === 0){
        $('.mobile-menu-butt span').removeClass('active');
        $('.mobile-menu').removeClass('active');
        $('.menu-dark').removeClass('active');
        $('body').toggleClass('no-scroll')
    }
  })
})

// окно обратной связи

jQuery(document).ready(function() {	

	let is_ipad = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );

	if(is_ipad){
		$('<link rel="stylesheet" type="text/css" href="css/iphone-view.css" />').appendTo('head');
		$('<script type="text/javascript" src="js/iphone-view.js"></script>').appendTo('body');
	}
	
	const closeBtn = $('<span class="close-chat"></span>')
	$('.contact-form').prepend(closeBtn)
	
	$('#contact-form_input').click(function(){
		openChat = true
		$(this).hide()
		document.querySelector('.b24-widget-button-icon-container').click();
		let livechat = document.querySelector('.bx-livechat-wrapper')
		let load = setInterval(function(){
		let load_win = document.querySelector('.bx-livechat-loading-window')
				if($(load_win).length === 0){
					let livechat = document.querySelector('.bx-livechat-wrapper')
					let livechat_textarea = document.querySelector('.bx-livechat-textarea')
					$(livechat).css('display', 'block')
					$(livechat).prependTo('.chat-wrapper')
					$(livechat_textarea).prependTo('.wrap-textarea')
					$(livechat_textarea).css('display', 'block')

					if(window.innerWidth < 768){
						
						$('.bx-im-textarea-input').keydown(function(e){
							if(e.keyCode == 13 && !e.shiftKey) {
								e.preventDefault()
								document.querySelector('.bx-im-textarea-send-button').click();
								$('.active-chat textarea').height(30)
							}
						})
//поменять высоту блока при открывании клавиатуры iphone js contact form? просто уезжает наверх

// 664 умножать высоту на .9
						function mobileView () {
							$(livechat).prependTo('.chat-wrapper')
							$('.contact-form').addClass('bx active-chat')
							$('body').addClass('no-scroll')
							$('.active-chat').prependTo('body')	
							document.body.style.position = 'fixed';

							$('.mobile-menu-butt, .header-fixed').addClass('display-none')
							
							closeBtn.css('display', 'block')
							$('.button-input').addClass('active-chat-button').text('')
							$('.button-input').append($('<img src="image/send-button.svg">'))

							$('.bx-im-textarea').append($('.button-input'))
							$('.bx-im-textarea').append($('.volume'))

							setTimeout(() => {
								$('.bx-im-textarea').append($('.bx-im-textarea-app-file'))
								if($('.messengers_wrap').hasClass('active')){
									$('.chat-wrapper').addClass('activeMess')
								}
							},200)
						}

						mobileView()

						$('.contact-form').click((e) => {
							let target = e.target

							if(!target.closest('.contact-form').classList.contains('active-chat')){
								openChat = true
								mobileView()
							}
							if(target.classList.contains('close-chat')){
								openChat = false
								$('.active-chat').appendTo('.main-block')
								if(is_ipad){
									$('.active-chat').removeClass('openKeyboard')
									$('.active-chat').attr('style', '')
								}	
								waveAnimation()
								$('.contact-form').removeClass('active-chat')
								$('body').removeClass('no-scroll')

								document.body.style.position = '';
								document.body.style.top = '';
								window.scrollTo(0, $(".contact-form").offset().top - $(window).scrollTop() - 85);

								$('.mobile-menu-butt, .header-fixed').removeClass('display-none')
								$('.contact-form .bx-livechat-wrapper').css('margin-top', '20px')
								closeBtn.css('display', 'none')
							}
							
							if(target.closest('.wrap-textarea')){
								$('.chat-wrapper').attr('style', '')
								setTimeout(() => {
									if($('.wrap-textarea').height() > 52){
										resizeChat()
									}
								}, 500);
							}else{
								if(is_ipad){
									$('.active-chat').removeClass('openKeyboard')
									$('.active-chat').attr('style', '')
								}	
								$('.heightChat').remove()
								// let heightChat = $('.contact-form').height() - $('.wrap-textarea').height() - $('.messengers_wrap').height() - 80
								let heightChat = window.innerHeight
								$('.messengers_wrap').prepend($(`<div class="heightChat" style="position:absolute">${heightChat}</div>`))
								setTimeout(() => {
									$('.chat-wrapper').attr('style', '')
									if($('.wrap-textarea').height() > 52){
										resizeChat()
									}
								}, 500);
							}
						})

						$('.active-chat textarea').on('input', function(){
							this.style.height = 30 + 'px' 
							this.style.height = this.scrollHeight + 'px'; 
							resizeChat()
						})
			
						$('.active-chat textarea').on('focus', function(){
							
							if(is_ipad){
								$('.active-chat').addClass('openKeyboard')

								setTimeout(() => {
									let iphone_scroll = window.scrollY
									let iphone_height = $(window).height()

									console.log(iphone_height);
									setTimeout(() => {
										$('.active-chat').attr('style',`top: ${iphone_scroll - 85}px !important; height: ${iphone_height - iphone_scroll}px !important`)
									})
								}, 500);
							
							}
							setTimeout(()=> {
								$('.bx-im-dialog-scroll-button').click()
								$('.heightChat').remove()
								// let heightChat = $('.contact-form').height() - $('.wrap-textarea').height() - $('.messengers_wrap').height() - 80
								let heightChat = window.innerHeight
								$('.messengers_wrap').prepend($(`<div class="heightChat" style="position:absolute">${heightChat}</div>`))
							},200)
						})
						// $('.active-chat textarea').on('blur', function(){
						// })
					}

					$('.bx-im-textarea-input').focus()
					clearInterval(load)
				}
			},100)	

		if(window.innerWidth < 1024){
			$('body').removeClass('bx-livechat-mobile-state')
			$(livechat).removeClass('bx-livechat-mobile')
		}
		
	})

	function resizeChat(){
		let heightChat = $('.contact-form').height() - $('.wrap-textarea').height() - $('.messengers_wrap').height() - 80 	
			$('.active-chat .chat-wrapper').attr('style', 'height:'+ heightChat + 'px');
	}

	$('.button-input').click(function(e){
		e.preventDefault()
		document.querySelector('.bx-im-textarea-send-button').click();
		$('.active-chat textarea').height(30)
		$('.chat-wrapper').attr('style', '')
	})

	let load_mess = setInterval(function(){
		let livechat_message = document.querySelector('.bx-livechat-body-with-message')
				if($(livechat_message).length === 1){
					let livechat = document.querySelector('.bx-livechat-wrapper')
					$(livechat).addClass('blok')
					$(livechat).prependTo('.chat-wrapper')
					$('.contact-form').addClass('bx')

					let livechat_textarea = document.querySelector('.bx-livechat-textarea')
					$(livechat_textarea).prependTo('.wrap-textarea')
					$(livechat_textarea).css('display', 'block')
					$('.bx-livechat-textarea').css('height', 150)

					$('#contact-form_input').hide()
					
					$('.bx-im-textarea-input').focus()
					clearInterval(load_mess)

					//  отслеживание сообщений  
					old_message()
					Observer()

					let messengers_link = document.querySelectorAll('.bx-im-message-content-text a')

					$(messengers_link).click(function(){
						$(this).each(function(){
							if($(this).attr('href') === 'https://api.whatsapp.com/send/?phone=79891659356&text=%22%D0%AF%20%D1%81%20%D1%81%D0%B0%D0%B9%D1%82%D0%B0,%20%D0%B4%D0%B8%D0%B0%D0%BB%D0%BE%D0%B3%200000%22'){
								whatsappClick();
							}
							if($(this).attr('href') === 'https://t.me/nohau'){
								telegramClick();
							}
						})
					})
				}
	},100)	

function Observer(){  // слежение за сообщениями 
	let target = document.querySelector('.bx-im-dialog-list')

		const config = {
			childList: true
		}

		const callback = function(mutationsList) {

			let dialog_list_items = document.querySelectorAll('.bx-im-dialog-list-item')
			let last_message = dialog_list_items[dialog_list_items.length - 1]

				if(!last_message.dataset.templateId.includes('temporary')){

					let income_mess = last_message.firstChild
					let mess_text = income_mess.querySelector('.bx-im-message-content-text').textContent

						if(income_mess.classList.contains('bx-im-message-type-opponent')){
							
							soundClick()

							setInterval(() => {
								old_message()
							}, 300);
						}
						
						if(income_mess.classList.contains('bx-im-message-type-opponent') && mess_text.includes('https://t.me/nohau')){
							setTimeout(()=>{
								$('.chat-wrapper').addClass('activeMess')
								document.querySelector('.messengers_wrap').classList.add('active')
								document.querySelector('.tme').classList.add('active')
								document.querySelector('.bx-livechat-textarea').style.marginTop = 5 + 'px'
							},700)
						}
						if(income_mess.classList.contains('bx-im-message-type-opponent') && mess_text.includes('https://api.whatsapp.com/send/?phone=79891659356&text=%22%D0%AF%20%D1%81%20%D1%81%D0%B0%D0%B9%D1%82%D0%B0,%20%D0%B4%D0%B8%D0%B0%D0%BB%D0%BE%D0%B3%200000%22')){
							setTimeout(()=>{
								$('.chat-wrapper').addClass('activeMess')
								document.querySelector('.messengers_wrap').classList.add('active')
								document.querySelector('.whatsapp').classList.add('active')
								document.querySelector('.bx-livechat-textarea').style.marginTop = 5 + 'px'
							},700)
						}
						if((income_mess.classList.contains('bx-im-message-type-opponent') && mess_text.includes('https://t.me/nohau') && mess_text.includes('https://api.whatsapp.com/send/?phone=79891659356&text=%22%D0%AF%20%D1%81%20%D1%81%D0%B0%D0%B9%D1%82%D0%B0,%20%D0%B4%D0%B8%D0%B0%D0%BB%D0%BE%D0%B3%200000%22'))){
							$('.chat-wrapper').addClass('activeMess')
							document.querySelector('.messengers_wrap').classList.add('active')
							document.querySelector('.whatsapp').classList.add('active')
							document.querySelector('.tme').classList.add('active')
							document.querySelector('.bx-livechat-textarea').style.marginTop = 5 + 'px'
						}
						if(mess_text === 'Пользователь перешел в Telegram'){
							income_mess.parentElement.style.display = 'none'
						}
						if(mess_text === 'Пользователь перешел в Whatsapp'){
							income_mess.parentElement.style.display = 'none'
						}
						
						let messengers_link = document.querySelectorAll('.bx-im-message-content-text a')

						$(messengers_link).click(function(){
							$(this).each(function(){
								if($(this).attr('href') === 'https://api.whatsapp.com/send/?phone=79891659356&text=%22%D0%AF%20%D1%81%20%D1%81%D0%B0%D0%B9%D1%82%D0%B0,%20%D0%B4%D0%B8%D0%B0%D0%BB%D0%BE%D0%B3%200000%22'){
									whatsappClick();
								}
								if($(this).attr('href') === 'https://t.me/nohau'){
									telegramClick();
								}
							})
						})
				}
		};

	const observer = new MutationObserver(callback);
	observer.observe(target, config);

}

// текскт сообщений после перезагрузки
function old_message(){
	let dialog_list_items = document.querySelectorAll('.bx-im-dialog-list-item')
	let income_mess = dialog_list_items[dialog_list_items.length - 1].firstChild
	let all_mess = document.querySelectorAll('.bx-im-message-content-text')

	if(income_mess.classList.contains('bx-im-message-type-opponent')){
		income_mess.classList.remove('bx-im-message-type-opponent')
		income_mess.classList.add('bx-im-message-opponent')
	}	

	all_mess.forEach(elem => {
		let mess_val = elem.textContent
		if((mess_val === 'Пользователь перешел в Telegram') || (mess_val === 'Пользователь перешел в Whatsapp')){
				elem.closest('.bx-im-dialog-list-item').style.display = 'none'
		}
		if(mess_val.includes('https://t.me/nohau')){
			document.querySelector('.messengers_wrap').classList.add('active')
			document.querySelector('.tme').classList.add('active')
			document.querySelector('.bx-livechat-textarea').style.marginTop = 5 + 'px'
		}
		if(mess_val.includes('https://api.whatsapp.com/send/?phone=79891659356&text=%22%D0%AF%20%D1%81%20%D1%81%D0%B0%D0%B9%D1%82%D0%B0,%20%D0%B4%D0%B8%D0%B0%D0%BB%D0%BE%D0%B3%200000%22')){
			document.querySelector('.messengers_wrap').classList.add('active')
			document.querySelector('.whatsapp').classList.add('active')
			document.querySelector('.bx-livechat-textarea').style.marginTop = 5 + 'px'
		}
	})
}

function soundClick() { // звук для входящих сообщений
	let audio = new Audio()
	let fullVolume = document.getElementById('fullVolume')
	audio.src = 'audio/income.mp3'
	audio.autoplay = true
	fullVolume.classList.contains('visible')? audio.volume = 0.5 : audio.volume = 1.0
	
}

	// клик по кнопкам перехода в мессенджеры 

const whatsapp = document.querySelector('.whatsapp')
const telegram = document.querySelector('.tme')

	whatsapp.addEventListener('click', whatsappClick);
	telegram.addEventListener('click', telegramClick);

function whatsappClick(){

	let textarea = document.querySelector('.bx-im-textarea-input')
	let sendButton = document.querySelector('.button-input')

	textarea.focus()
	
	textarea.value = 'Пользователь перешел в Whatsapp'
			
	let event = new KeyboardEvent('keyup', KeyboardEvent.ctrlKey);
	textarea.dispatchEvent(event);
	setTimeout(() => {
		sendButton.click()	
	}, 100);
}

function telegramClick(){
	
		let textarea = document.querySelector('.bx-im-textarea-input')
		let sendButton = document.querySelector('.button-input')
		textarea.focus()
		
		textarea.value = 'Пользователь перешел в Telegram'
				
		let event = new KeyboardEvent('keyup', KeyboardEvent.ctrlKey);
		textarea.dispatchEvent(event);
		setTimeout(() => {
			sendButton.click()	
		}, 100);
	}

	$('.volume').click(function(){
		$(this).css('transform','scale(1.5)')
		setTimeout(() => {
			$(this).css('transform','scale(1)')
		},100)

		$('#fullVolume').toggleClass('visible')
	})
})
