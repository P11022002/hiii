// ===== Navbar Menu Toggle =====
let menuicon = document.querySelector('#menu-icon');
let menu = document.querySelector('#menu-icon-js');
let navbar = document.querySelector('.navbar');
let navtc = document.querySelector('#nav-tc-js');

menu.onclick = () => {
	menuicon.classList.toggle('bx-x');
	navbar.classList.toggle('open');
	navtc.classList.toggle('nav-touch-close-open');
};

// Close menu on touch close
navtc.onclick = () => {
	menuicon.classList.toggle('bx-x');
	navbar.classList.remove('open');
	navtc.classList.remove('nav-touch-close-open');
	navtc.classList.remove('nav-tc-z');
	navtc.classList.remove('nav-LR-TC');
};

// ===== Hide / Show Navbar on Scroll =====
let prevScrollpos = window.pageYOffset;

window.onscroll = function () {
	let currentScrollPos = window.pageYOffset;
	let header = document.getElementById('header');

	header.classList.add('scrolled');

	if (currentScrollPos === 0) {
		header.classList.remove('scrolled');
	}

	if (navtc.classList.contains('nav-touch-close-open')) {
		return;
	}

	if (prevScrollpos > currentScrollPos) {
		header.style.top = '0';
	} else {
		header.style.top = '-100px';
	}

	prevScrollpos = currentScrollPos;
};

// ===== Contact Form Elements =====
const contactSection = document.querySelector('.contact-section');
const formSection = document.querySelector('.form-section');
const contactSubmitAfter = document.querySelector('.contact-submit-after');
const csaOK = document.querySelector('.csa-ok');

const contactForm = document.querySelector('.contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const errorDiv = document.querySelector('.error');
const emailErrorDiv = document.querySelector('.email-error');
const contactButton = document.querySelector('.contact-button');
const contactLoad = document.querySelector('.contact-load');
const submitText = document.querySelector('.submit-text');

// ===== CSA OK Button =====
if (csaOK) {
	csaOK.onclick = () => {
		contactSubmitAfter.classList.remove('show');
		formSection.classList.remove('hide');
		contactSection.classList.remove('csa-cs');
		contactForm.classList.remove('csa-cf');
		contactButton.classList.remove('loading');
		contactLoad.classList.remove('show');
		submitText.classList.remove('hide');
	};
}

// ===== Form Validation =====
function validateForm(event) {
	event.preventDefault();

	let isValid = true;
	let nameIsValid = true;
	let emailIsValid = true;
	let messageIsValid = true;

	if (nameInput.value.trim() === '') {
		isValid = false;
		nameIsValid = false;
	}

	if (
		emailInput.value.trim() === '' ||
		!isValidEmail(emailInput.value)
	) {
		isValid = false;
		emailIsValid = false;
	}

	if (messageInput.value.trim() === '') {
		isValid = false;
		messageIsValid = false;
	}

	if (!isValid) {
		errorDiv.classList.add('error-show');
		emailErrorDiv.classList.remove('error-show');

		if (nameIsValid && messageIsValid && !emailIsValid) {
			errorDiv.classList.remove('error-show');
			emailErrorDiv.classList.add('error-show');
		}
	} else {
		emailErrorDiv.classList.remove('error-show');
		errorDiv.classList.remove('error-show');

		contactButton.classList.add('loading');
		contactLoad.classList.add('show');
		submitText.classList.add('hide');

		setTimeout(sendMail, 2000);
	}
}

// ===== Email Validation =====
function isValidEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

// ===== Form Submit Listener =====
if (contactForm) {
	contactForm.addEventListener('submit', validateForm);
}

// ===== Send Mail (Temporary UI Only) =====
function sendMail() {
	contactSubmitAfter.classList.add('show');
	formSection.classList.add('hide');
	contactSection.classList.add('csa-cs');
	contactForm.classList.add('csa-cf');
}
