jQuery(document).ready(function() {	

	$('.bx-im-textarea-input').on('focus', function(e){
		
		$('.contact-form.bx.active-chat').addClass('openKeyboard')
	})
	$('.bx-im-textarea-input').on('blur', function(){
		$('.contact-form.bx.active-chat').removeClass('openKeyboard')
	})
console.log('вроде работает');
})

// сделать окно на весь экран и поверх всех элементов но в рамках страницы и разрешить скролл всей страницы
