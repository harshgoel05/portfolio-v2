var cursor = {
	delay: 8,
	_x: 0,
	_y: 0,
	endX: window.innerWidth / 2,
	endY: window.innerHeight / 2,
	cursorVisible: true,
	cursorEnlarged: false,

	$dot: document.querySelector('.cursor-dot'),
	$outline: document.querySelector('.cursor-dot-outline'),

	init: function () {
		// Set up element sizes
		this.dotSize = this.$dot.offsetWidth;
		this.outlineSize = this.$outline.offsetWidth;

		this.setupEventListeners();
		this.animateDotOutline();
	},

	setupEventListeners: function () {
		var self = this;

		// Anchor hovering
		document.querySelectorAll('a').forEach(function (el) {
			el.addEventListener('mouseover', function () {
				self.cursorEnlarged = true;
				self.toggleCursorSize();
			});
			el.addEventListener('mouseout', function () {
				self.cursorEnlarged = false;
				self.toggleCursorSize();
			});
		});

		// Click events
		document.addEventListener('mousedown', function () {
			self.cursorEnlarged = true;
			self.toggleCursorSize();
		});
		document.addEventListener('mouseup', function () {
			self.cursorEnlarged = false;
			self.toggleCursorSize();
		});

		document.addEventListener('mousemove', function (e) {
			// Show the cursor
			self.cursorVisible = true;
			self.toggleCursorVisibility();

			// Position the dot
			self.endX = e.pageX;
			self.endY = e.pageY;
			self.$dot.style.top = self.endY + 'px';
			self.$dot.style.left = self.endX + 'px';
		});

		// Hide/show cursor
		document.addEventListener('mouseenter', function (e) {
			self.cursorVisible = true;
			self.toggleCursorVisibility();
			self.$dot.style.opacity = 1;
			self.$outline.style.opacity = 1;
		});

		document.addEventListener('mouseleave', function (e) {
			self.cursorVisible = true;
			self.toggleCursorVisibility();
			self.$dot.style.opacity = 0;
			self.$outline.style.opacity = 0;
		});
	},

	animateDotOutline: function () {
		var self = this;

		self._x += (self.endX - self._x) / self.delay;
		self._y += (self.endY - self._y) / self.delay;
		self.$outline.style.top = self._y + 'px';
		self.$outline.style.left = self._x + 'px';

		requestAnimationFrame(this.animateDotOutline.bind(self));
	},

	toggleCursorSize: function () {
		var self = this;

		if (self.cursorEnlarged) {
			self.$dot.style.display = 'none';
			self.$outline.style.transform = 'translate(-50%, -50%) scale(4)';
		} else {
			self.$dot.style.display = 'block';
			self.$outline.style.transform = 'translate(-50%, -50%) scale(1)';
		}
	},

	toggleCursorVisibility: function () {
		var self = this;

		if (self.cursorVisible) {
			self.$dot.style.opacity = 1;
			self.$outline.style.opacity = 1;
		} else {
			self.$dot.style.opacity = 0;
			self.$outline.style.opacity = 0;
		}
	},
};

cursor.init();
window.onscroll = function () {
	myFunction();
	addsocial();
};

function myFunction() {
	var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
	var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	var scrolled = (winScroll / height) * 100;
	document.getElementById('myBar').style.width = scrolled + '%';
}

function addsocial() {
	var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
	var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	var scrolled = (winScroll / height) * 100;
	if (winScroll >= 400) {
		document.getElementById('socialnav').style.left = '0px';
	} else {
		document.getElementById('socialnav').style.left = '-50px';
	}
}

$('#show-more').click(function () {
	$('.more-projects').css('display', 'block');
	$('#show-more').css('display', 'none');
	setTimeout($('html').height('100%'), 500);
});

$('#hide-more').click(function () {
	$('.more-projects').css('display', 'none');
	$('#show-more').css('display', 'block');
	$('#show-more').css('margin', 'auto');
	setTimeout($('html').height('100%'), 500);
	location.href = '#projects';
});
