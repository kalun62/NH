jQuery(document).ready(function() {	

	// $('.contact-form').click(() => {
	// 	window.scrollTo(0, 0)
	// })
	$('.active-chat textarea').on('focus', function(){
		$('.active-chat').addClass('openKeyboard')
	})
})

// сделать окно на весь экран и поверх всех элементов но в рамках страницы и разрешить скролл всей страницы