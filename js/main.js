//global variables
body = document.body;

// show / hidden header menu on hover
const menuButton = document.querySelector('.header__menu_item.sub-menu');

menuButton.addEventListener('mouseenter', () => {
	menuButton.classList.add('active');
})

menuButton.addEventListener('mouseleave', () => {
	menuButton.classList.remove('active');
})
// ---------------------

// quiz logic

// all quiz questions
const questions = document.querySelectorAll('.quiz__item');

if(questions.length > 0) {
	// numbers of questions 
	const questionsNumbers = document.querySelectorAll('.quiz__number');
	// quiz container
	const quizContainer = document.querySelector('.quiz__container');
	// quiz form 
	const quizForm = document.querySelector('.form-box');
	//quiz present 
	const quizPresent = document.querySelector('.quiz__present');
	// nav buttons 
	const next = document.querySelector('.quiz__nav_next');
	const prev = document.querySelector('.quiz__nav_prev');

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
			console.log('if')
			currentQuestion.classList.add('active');
		} else {
			console.log('else')
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
const modals = document.querySelectorAll('.modal');

modalBtn.forEach(btn => {
	btn.addEventListener('click', (event) => {
		document.body.classList.add('is-modal-open');
		if(event.target.closest('.same-js')) {
			document.body.classList.add('same');
		}
		if(event.target.closest('.free-js')) {
			document.body.classList.add('free');
		}
		if(event.target.closest('.main-js')) {
			document.body.classList.add('main');
		}
	})
})

for(let item of modals) {
	item.addEventListener('click', (event) => {
		const target = event.target;
		if (target.closest('.close-js')) {
			document.body.classList.remove('is-modal-open');
			document.body.classList.remove('free');
			document.body.classList.remove('same');
			document.body.classList.remove('main');
		}
		if (target.classList.contains('modal')) {
			document.body.classList.remove('is-modal-open');
			document.body.classList.remove('free');
			document.body.classList.remove('same');
			document.body.classList.remove('main');
		}
	})
}

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
				currentForm.innerHTML = `<div class="lds-spinner form__spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`
		
				const response = await fetch(url, {
							method: 'POST',
							body: formData
						});
				
				const resp = await response;
				if(resp?.status === 200 && resp.ok) {
					currentForm.classList.add('hidden');
					currentForm.nextElementSibling.classList.remove('hidden');
					
				} else {
					currentForm.innerHTML = `<div> Произошла ошибка </div>`
				}
				return resp
			}
			return postData()
		}
		
		
	})
}

// sticky header on scroll
window.onscroll = function() {stickyHeader()};

// Get the header
const header = document.querySelector('.header');

// Get the offset position of the navbar
const sticky = header.offsetTop;
let lastScroll = 0;
header.style.paddingTop = `${header.querySelector('.header__inner').clientHeight}px`;
header.style.height = `calc(100vh - ${header.querySelector('.header__inner').clientHeight}px)`;
// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
const stickyHeader = () => {
	
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
	
	const currentScroll = window.pageYOffset;
  if (currentScroll <= 0) {
    body.classList.remove('scrollUp');
    return;
  }

  if (currentScroll > lastScroll && !body.classList.contains('scrollDown')) {
    body.classList.remove('scrollUp');
    body.classList.add('scrollDown');
  } else if (
    currentScroll + 3 < lastScroll &&
    body.classList.contains('scrollDown')
  ) {
    body.classList.remove('scrollDown');
    body.classList.add('scrollUp');
  }
  lastScroll = currentScroll;
	

}

// make a layout cover on map
const wrapMap = document.querySelector('.main-contacts__map');
if(wrapMap) {
	wrapMap.addEventListener('click', ()  => {
		console.log('wrapMap.children',wrapMap.children[0])
		// убираем атрибут "style", в котором прописано свойство "pointer-events"
		wrapMap.children[0].removeAttribute('style');
		
		wrapMap.classList.remove('mouse-enter')
	}) 
	
	wrapMap.addEventListener('mouseenter', () => {
		wrapMap.classList.add('mouse-enter')
	}) 
	
	wrapMap.addEventListener('mouseout', () => {
		wrapMap.classList.remove('mouse-enter')
	}) 
}

	// moving hint on map area
	// if(event.offsetY > 10) mapTitle.style.top = event.offsetY + 20 + 'px';
	// if(event.offsetX > 10) mapTitle.style.left = event.offsetX + 20 + 'px';

	// tabs 
	const tab = document.querySelector('.tab-js');
	const tabConetnt = document.querySelectorAll('.tab__content');
	const tabCaptions = document.querySelectorAll('.main-caption-js');
	const tabRemontContent = document.querySelectorAll('.tab-remontContent-js');
	const tabRemontCaptions = document.querySelectorAll('.remont-caption-js');
	const tabDesignCaptions = document.querySelectorAll('.design-caption-js');
	const tabDesignContent = document.querySelectorAll('.tab-designContent-js');

	if(tab) {
		tab.addEventListener('click', (event) => {
			let target = event.target;
			const switchTab = (captionsArr,contentArr) => {
				captionsArr.forEach(item => item.classList.remove('active'));
				const captionIndex = [...captionsArr].findIndex(item => item === target);
				contentArr.forEach(item => item.classList.remove('active'));
				const currentTab = [...contentArr].find((item,index) => index === captionIndex);
				currentTab.classList.add('active');
			}
			if(target.dataset.name === 'mainTab') {
				switchTab(tabCaptions,tabConetnt);
				target.classList.add('active');
			}
			if(target.dataset.name === 'remontCaption') {
				switchTab(tabRemontCaptions,tabRemontContent);
				target.classList.add('active');
			}
			if(target.dataset.name === 'designCaption') {
				switchTab(tabDesignCaptions,tabDesignContent);
				target.classList.add('active');
			}
		})
		
	}
	
