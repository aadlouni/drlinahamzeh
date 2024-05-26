AOS.init({
	duration: 800,
	easing: 'slide'
});


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

	var fullHeight = function() {

		$('.full-height').css('height', $(window).height());
		$(window).resize(function(){
			$('.full-height').css('height', $(window).height());
		});

	};
	fullHeight();

	// Scrollax
	$.Scrollax();

	$('nav .dropdown').hover(function () {
		var $this = $(this);

		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		$this.find('.dropdown-menu').addClass('show');

	}, function () {
		var $this = $(this);
		$this.removeClass('show');
		$this.find('> a').attr('aria-expanded', false);
		$this.find('.dropdown-menu').removeClass('show');
	});

	// scroll
	var scrollWindow = function () {
		$(window).scroll(function () {
			var $w = $(this),
				st = $w.scrollTop(),
				navbar = $('.ftco_navbar'),
				sd = $('.js-scroll-wrap');

			if (st > 150) {
				if (!navbar.hasClass('scrolled')) {
					navbar.addClass('scrolled');
				}
			}
			if (st < 150) {
				if (navbar.hasClass('scrolled')) {
					navbar.removeClass('scrolled sleep');
				}
			}
			if (st > 350) {
				if (!navbar.hasClass('awake')) {
					navbar.addClass('awake');
				}

				if (sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if (st < 350) {
				if (navbar.hasClass('awake')) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if (sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	var contentWayPoint = function () {
		var i = 0;
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

	var TxtRotate = function (el, toRotate, period) {
		this.toRotate = toRotate;
		this.el = el;
		this.loopNum = 0;
		this.period = parseInt(period, 10) || 2000;
		this.txt = '';
		this.tick();
		this.isDeleting = false;
	};

	TxtRotate.prototype.tick = function () {
		var i = this.loopNum % this.toRotate.length;
		var fullTxt = this.toRotate[i];

		if (this.isDeleting) {
			this.txt = fullTxt.substring(0, this.txt.length - 1);
		} else {
			this.txt = fullTxt.substring(0, this.txt.length + 1);
		}

		this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

		var that = this;
		var delta = 300 - Math.random() * 100;

		if (this.isDeleting) { delta /= 2; }

		if (!this.isDeleting && this.txt === fullTxt) {
			delta = this.period;
			this.isDeleting = true;
		} else if (this.isDeleting && this.txt === '') {
			this.isDeleting = false;
			this.loopNum++;
			delta = 500;
		}

		setTimeout(function () {
			that.tick();
		}, delta);
	};

	window.onload = function () {
		var elements = document.getElementsByClassName('txt-rotate');
		for (var i = 0; i < elements.length; i++) {
			var toRotate = elements[i].getAttribute('data-rotate');
			var period = elements[i].getAttribute('data-period');
			if (toRotate) {
				new TxtRotate(elements[i], JSON.parse(toRotate), period);
			}
		}
		// INJECT CSS
		var css = document.createElement("style");
		css.type = "text/css";
		css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
		document.body.appendChild(css);
	};


})(jQuery);


// this makes the height of each page equal to the height of the window
// $('.page').css('height', $( window ).height());

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

hash = function (h) {
	if (history.pushState) {
		history.pushState(null, null, h);
	} else {
		location.hash = h;
	}
}
