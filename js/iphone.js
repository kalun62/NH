jQuery(document).ready(function() {	

	$('.bx-im-textarea-input').on('focus', function(){
		console.log('focus');
		$('.active-chat').addClass('openKeyboard')
	})
	$('.bx-im-textarea-input').on('blur', function(){
		console.log('blur');
		$('.active-chat').removeClass('openKeyboard')
	})

	console.log('вроде работает');
})
