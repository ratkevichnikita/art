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
		quizForm.classList.remove('hidden')
	}
}

const showCurrentNumber = (number) => {
	const currentNumber = [...questionsNumbers].find((item, index) => index === number);
	questionsNumbers.forEach(n => n.classList.remove('active') )
	if(currentNumber) {
		currentNumber.classList.add('active')
	}
	
}

// accordion for questions and answers

const qList = document.querySelectorAll('.questions__item');

qList.forEach(item => {
	item.addEventListener('click', (event) => {
		const target = event.target;
		if(target.dataset.name === 'toggle') {
			if(target.closest('LI').classList.contains('active')) {
				target.closest('LI').classList.remove('active')
			} else {
				target.closest('LI').classList.add('active')
			}
			// qList.forEach(item => item.classList.remove('active'))
		}
	})
})

// open / close modal

const modalBtn = document.querySelector('.modal-js');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close-js');
const body =  document.getElementById('body')

modalBtn.addEventListener('click', () => {
	modal.classList.remove('hidden');
	body.classList.add('freeze');
})

closeBtn.addEventListener('click', () => {
	modal.classList.add('hidden');
	body.classList.remove('freeze');
})

