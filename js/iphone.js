// jQuery(document).ready(function() {	

	// $('.contact-form').click(() => {
	// 	window.scrollTo(0, 0)
	// })
	$('.bx-im-textarea-input').on('focus', function(e){
		// e.preventDefault()
		$('.contact-form.bx.active-chat').addClass('openKeyboard')
	})
	$('.bx-im-textarea-input').on('blur', function(){
		$('.contact-form.bx.active-chat').removeClass('openKeyboard')
	})

	console.log('вроде работает');
// })

// сделать окно на весь экран и поверх всех элементов но в рамках страницы и разрешить скролл всей страницы
const input = document.querySelector('.bx-im-textarea-input'),
 	  active_chat = document.querySelector('.active-chat')

input.addEventListener('focus', () => {
	active_chat.classList.add('openKeyboard')
})
input.addEventListener('focus', () => {
	active_chat.classList.remove('openKeyboard')
})