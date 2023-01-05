// show / hidden header menu on hover
const menuButton = document.querySelector('.header__menu_item.sub-menu');

menuButton.addEventListener('mouseenter', () => {
	menuButton.classList.add('active')
})

menuButton.addEventListener('mouseleave', () => {
	menuButton.classList.remove('active')
})
// ---------------------

// quiz logic
// nav buttons 
const next = document.querySelector('.quiz__nav_next');
const prev = document.querySelector('.quiz__nav_prev');
// all quiz questions
const questions = document.querySelectorAll('.quiz__item');
// numbers of questions 
const questionsNumbers = document.querySelectorAll('.quiz__number');
// quiz container
const quizContainer = document.querySelector('.quiz__container')
// quiz form 
const quizForm = document.querySelector('.form');
//quiz present 
const quizPresent = document.querySelector('.quiz__present')
let currentQuestionIndex = 0;

next.addEventListener('click', () => {
	currentQuestionIndex++;
	const increaseValue = Math.min(currentQuestionIndex, questions.length);
	if (increaseValue > 0) {
		prev.classList.remove('hidden');
	}
	showCurrentQuestion(increaseValue);
	showCurrentNumber(increaseValue);
})

prev.addEventListener('click', () => {
	currentQuestionIndex--;
	const decreaseValue = Math.max(0, currentQuestionIndex);
	if (decreaseValue === 0) {
		prev.classList.add('hidden');
	}
	showCurrentQuestion(decreaseValue);
	showCurrentNumber(decreaseValue);
})

const showCurrentQuestion = (number) => {
	const currentQuestion = [...questions].find((item, index) => index === number);
	questions.forEach((q, index) => q.classList.remove('active'));
	if (currentQuestion) {
		currentQuestion.classList.add('active');
	} else {
		quizContainer.classList.add('hidden');
		quizForm.classList.remove('hidden');
		quizPresent.classList.add('hidden')
	}
}

const showCurrentNumber = (number) => {
	const currentNumber = [...questionsNumbers].find((item, index) => index === number);
	questionsNumbers.forEach(n => n.classList.remove('active'))
	if (currentNumber) {
		currentNumber.classList.add('active')
	}

}

// accordion for questions and answers

const qList = document.querySelectorAll('.questions__item');

qList.forEach(item => {
	item.addEventListener('click', (event) => {
		const target = event.target;
		if (target.dataset.name === 'toggle') {
			if (target.closest('LI').classList.contains('active')) {
				target.closest('LI').classList.remove('active')
			} else {
				target.closest('LI').classList.add('active')
			}
			// qList.forEach(item => item.classList.remove('active'))
		}
	})
})

// open / close modal

const modalBtn = document.querySelectorAll('.modal-js');
const modal = document.querySelector('.modal');

modalBtn.forEach(btn => {
	btn.addEventListener('click', () => {
		document.body.classList.add('is-modal-open');
	})
})

modal.addEventListener('click', (event) => {
	const target = event.target;
	if (target.closest('.close-js')) {
		document.body.classList.remove('is-modal-open');
	}
	if (target.classList.contains('modal')) {
		document.body.classList.remove('is-modal-open');
	}
})

// smooth scroll

const anchors = document.querySelectorAll('.go-to')

for (let anchor of anchors) {
	anchor.addEventListener('click', function (e) {
		e.preventDefault()

		const blockID = anchor.getAttribute('href').substr(1)

		document.getElementById(blockID).scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		})
	})
}

//modile menu 
const subitemMenuItem = document.querySelectorAll('.subitem-js');
const mobileMenu = document.querySelector('.mobile-menu');
const burger = document.querySelector('.mobile-menu-button');

burger.addEventListener('click', () => {
	burger.classList.toggle('active');
	mobileMenu.classList.toggle('active');
	document.body.classList.toggle('is-menu-open');
})


subitemMenuItem.forEach(item => {
	item.addEventListener('click', (event) => {
		subitemMenuItem.forEach(item => item.classList.remove('active'))
		if (event.target.closest('.subitem-js')) {
			item.classList.add('active')
		}
	})
})

// form validation
const formButtons = document.querySelectorAll('.form-btn-js');
const form = document.querySelector('.form');
const regexPhone = /^[+]?[1-9 ][0-9 ]*(?:\.[0-9 ]+)?$/;

for(let btn of formButtons) {
	btn.addEventListener('click', (event) => {
		event.preventDefault();
		const currentForm = event.target.closest('FORM');
		const phone = currentForm.querySelector('[data-name*="formPhone"]');
		const name = currentForm.querySelector('[data-name*="formName"]');
		
		let filedNameError = false;
		let fieldPhoneError = false;
	
		if(name.value.length < 3) {
			name.closest('.form__field').classList.add('error');
			filedNameError = true;
		} else {
			name.closest('.form__field').classList.remove('error');
			filedNameError = false;
		}
		if(phone.value.length < 6 || !regexPhone.test(phone.value)) {
			phone.closest('.form__field').classList.add('error');
			fieldPhoneError = true;
		} else {
			phone.closest('.form__field').classList.remove('error');
			fieldPhoneError = false;
		}
		
		if(!filedNameError && !fieldPhoneError) {
			const postData =  async () => {
				const formData = new FormData(currentForm);
				const url = currentForm.dataset.name === 'quizForm' ? '/quiz.php' : '/mail.php'
				console.log('url',url)
				const response = await fetch(url, {
							method: 'POST',
							body: formData
						});
				
				const resp = await response;
				console.log('resp', resp);
				currentForm.innerHTML = `<div class="lds-spinner form__spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`
				if(resp?.status === 200 && resp.ok) {
					currentForm.classList.add('hidden');
					currentForm.nextElementSibling.classList.remove('hidden');
					
				} else {
					currentForm.classList.add('error');
				}
				return resp
			}
			return postData()
		}
		
		
	})
}


