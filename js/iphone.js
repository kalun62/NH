
// сделать окно на весь экран и поверх всех элементов но в рамках страницы и разрешить скролл всей страницы
const contact_form = document.querySelector('.contact-form'),
	  input = document.querySelector('.bx-im-textarea-input'),
 	  active_chat = document.querySelector('.active-chat')

contact_form.addEventListener('click', () => {
	setTimeout(() => {
		input.addEventListener('focus', () => {
			active_chat.classList.add('openKeyboard')
		})
		input.addEventListener('blur', () => {
			active_chat.classList.remove('openKeyboard')
		})
	}, 100)
})
