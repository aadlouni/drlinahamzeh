(function ($) {

	"use strict";

	$(window).stellar({
		responsive: true,
		parallaxBackgrounds: true,
		parallaxElements: true,
		horizontalScrolling: false,
		hideDistantElements: false,
		scrollProperty: 'scroll'
	});

	const contentWayPoint = function () {
		let i = 0;
		$('.ftco-animate').waypoint(function (direction) {

			if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function () {

					$('body .ftco-animate.item-animate').each(function (k) {
						var el = $(this);
						setTimeout(function () {
							var effect = el.data('animate-effect');
							if (effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if (effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if (effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						}, k * 50, 'easeInOutExpo');
					});

				}, 100);
			}
		}, { offset: '95%' });
	};
	contentWayPoint();

})(jQuery);


// scrollspy section
(function ($) {
	//variable that will hold the href attr of the links in the menu
	var sections = [];
	//variable that stores the id of the section
	var id = false;
	//variable for the selection of the anchors in the navbar
	var $navbara = $('#navi a');

	$navbara.click(function (e) {
		//prevent the page from refreshing
		e.preventDefault();
		//set the top offset animation and speed
		$('html, body').animate({
			scrollTop: $($(this).attr('href')).offset().top - 180
		}, 500);
		hash($(this).attr('href'));
	});

	//select all the anchors in the navbar one after another
	$navbara.each(function () {
		// and adds them in the sections variable
		sections.push($($(this).attr('href')));

	})
	$(window).scroll(function (e) {
		// scrollTop retains the value of the scroll top with the reference at the middle of the page
		var scrollTop = $(this).scrollTop() + ($(window).height() / 2);
		//cycle through the values in sections array
		for (var i in sections) {
			var section = sections[i];
			//if scrollTop variable is bigger than the top offset of a section in the sections array then 
			if (scrollTop > section.offset().top) {
				var scrolled_id = section.attr('id');
			}
		}
		if (scrolled_id !== id) {
			id = scrolled_id;
			$($navbara).removeClass('current');
			$('#navi a[href="#' + id + '"]').addClass('current');
		}
	})
})(jQuery);

const hash = function (hash) {
	if (history.pushState)
		history.pushState(null, null, hash);
	else
		location.hash = hash;
}
