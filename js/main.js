console.log('s')

const menuButton = document.querySelector('.header__menu_item.sub-menu');

menuButton.addEventListener('mouseenter', () => {
    menuButton.classList.add('active')
})

menuButton.addEventListener('mouseleave', () => {
    menuButton.classList.remove('active')
})