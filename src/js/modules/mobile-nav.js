var mobileNav = {
	TABLET: 720,

	hiddenNav: '.js-mobile-nav',
	topSelector: '.js-mobile-top',
	burgerSelector: '.js-burger',
	topWrap: '.js-mobile-top-wrap',

	openNav: ($menuToggleElem, $menuList, $top, $topWrap) => {
		let isVisible = false;

		$('html, body').toggleClass('js-lock');
		$menuToggleElem.toggleClass('is-active');
		$top.toggleClass('is-active');
		$topWrap.toggleClass('is-active');

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
		const $top = $(mobileNav.topSelector);
		const $topWrap =  $(mobileNav.topWrap);

		$burger.on('click', function () {
			mobileNav.openNav($(this), $navigation, $top, $topWrap)
		});
	}
};

export {mobileNav};
