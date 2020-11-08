var mobileNav = {
	TABLET: 720,

	hiddenNav: '.js-mobile-nav',
	burgerSelector: '.js-burger',

	openNav: ($menuToggleElem, $menuList) => {
		let isVisible = false;

		$('html, body').toggleClass('js-lock');
		$menuToggleElem.toggleClass('is-active');

		if (!$menuList.hasClass('is-active')) {
			isVisible = true;
			$menuList
				.addClass('is-active fade-in')
				.removeClass('fade-out')
				.off();
		} else {
			isVisible = false;

			$menuList.on('animationend', function () {
				if (!isVisible) {
					$(this).removeClass('is-active fade-in').off();
				}
			});
			$menuList.addClass('fade-out');
		}
	},

	init: () => {
		const $navigation = $(mobileNav.hiddenNav);
		const $burger = $(mobileNav.burgerSelector);

		$burger.on('click', function () {
			mobileNav.openNav($(this), $navigation)
		});

		$(window).resize(() => {
			// if ($(window).width() > mobileNav.LARGE_TABLET) {
			// 	if ($navigation.is(':visible')) {
			// 		$navigation.css('style', '').removeAttr('style');
			// 	}
			//
			// 	if ($burger.hasClass('is-active')) {
			// 		$burger.removeClass('is-active')
			// 	}
			// }
		})
	}
};

export {mobileNav};
