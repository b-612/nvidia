import 'magnific-popup';

var popup = {
	popupSelector: '.js-popup',

	init: () => {
		const $popup = $(popup.popupSelector);

		$popup.magnificPopup({
			type: 'inline',
			focus: 'input[name="name"]',

			fixedContentPos: false,
			fixedBgPos: true,
			overflowY: 'auto',

			preloader: false,

			midClick: true,
			removalDelay: 300,
			mainClass: 'my-mfp-zoom-in',

			closeMarkup: '<button type="button" class="mfp-close"></button>',

			// When elemened is focused, some mobile browsers in some cases zoom in
			// It looks not nice, so we disable it:
			callbacks: {
				beforeOpen: function() {
					if($(window).width() < 700) {
						this.st.focus = false;
					} else {
						this.st.focus = 'input[name="name"]';
					}
				}
			}
		});

	}
};

export { popup }
