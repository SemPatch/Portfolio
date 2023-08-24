const nav = document.querySelector('#nav')
      ,menu = document.querySelector('#menu')
      ,menuToggle = document.querySelector('.navigation-toggle')
let body = document.querySelector('body')
    ,isMenuOpen = false;


// TOGGLE MENU ACTIVE STATE
menuToggle.addEventListener('click', e => {
  e.preventDefault();
  isMenuOpen = !isMenuOpen;
  menuToggle.setAttribute('aria-expanded', String(isMenuOpen));
  menu.hidden = !isMenuOpen;
  nav.classList.toggle('nav--open');
  menuToggle.classList.toggle('menu--open')
  body.classList.toggle('stop-scroll')
});

const menuLinks = document.querySelectorAll('.nav__link');

menuToggle.addEventListener('keydown', e => {
  if (isMenuOpen) {
    const key = e.key;

    if (key === 'Tab') {
      e.preventDefault();

      const activeIndex = Array.from(menuLinks).findIndex(link => link === document.activeElement)
            ,nextIndex = (activeIndex + 1) % menuLinks.length;

      menuLinks[nextIndex].focus();
    } else if (key === 'Shift' && e.shiftKey) {
      e.preventDefault();

      const activeIndex = Array.from(menuLinks).findIndex(link => link === document.activeElement)
            ,prevIndex = (activeIndex - 1 + menuLinks.length) % menuLinks.length;

      menuLinks[prevIndex].focus();
    }
  }
});

// Search
let searchIcon = document.querySelector('.search');
let modalSearch = document.querySelector('.modal-search');
let cross = document.querySelector('.modal-search__btn');
let closeButton = document.querySelector('.modal-search__close');

searchIcon.addEventListener('click', function() {
  modalSearch.classList.toggle('modal-search_active');
  openModal();
});

closeButton.addEventListener('click', function() {
  modalSearch.classList.remove('modal-search_active');
  closeModal();
});

// Open modal
function openModal() {
  // Focus on the first element
  const firstElement = document.querySelector('.modal-search__input');
  firstElement.focus();

  // Add Listenter
  document.addEventListener('keydown', handleTabKeyNavigation);
}

// Close modal
function closeModal() {
  // Romove keydown
  document.removeEventListener('keydown', handleTabKeyNavigation);
}

function handleTabKeyNavigation(event) {
  if (event.key === 'Tab') {
    const modal = document.querySelector('.modal-search')
          ,focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
          ,firstElement = focusableElements[0]
          ,lastElement = focusableElements[focusableElements.length - 1];

    if (!modal.contains(event.target) || document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }
}

function openModal() {

  // Focus on the first element
  const firstElement = document.querySelector('.modal-search__input');
  firstElement.focus();
  document.addEventListener('keydown', handleTabKeyNavigation);
}

// Close modal
function closeModal() {
  closeButton.addEventListener('click', function() {
    modalSearch.classList.remove('modal-search_active');
  });
  document.removeEventListener('keydown', handleTabKeyNavigation);
}





// JustValidate
let form = new JustValidate('#form');

let selector = document.querySelector('#phone')

let im = new Inputmask("+(48) 999-999-999")

im.mask(selector)

form.addField("#name", [
 {
  rule: 'required',
  errorMessage: 'Введите имя',
 },
 {
  rule: 'minLength',
  value: 2,
  errorMessage: 'Минимум 2 символа',
 },
 {
  rule: 'maxLength',
  value: 10,
  errorMessage: 'Максимум 10 символов',
 },
 {
  rule: 'customRegexp',
  value: /[a-z]/gi,
  errorMessage: 'Недопустимый формат',
}
]);

form.addField("#phone", [
  {
    rule: 'required',
    errorMessage: 'Введите телефон'
  },
  {
    validator: (value) => {
      const phone = selector.inputmask.unmaskedvalue();
      return Boolean(Number(phone) && phone.length > 0)
    },
    errorMessage: 'Недопустимый формат'
  },
  {
    validator: (value) => {
      const phone = selector.inputmask.unmaskedvalue();
      return Boolean(Number(phone) && phone.length === 9)
    },
    errorMessage: 'мин. 9 символов',
  },
]);



// Scroll
const scroller = new SweetScroll({
  trigger: 'a[href*="#"]',
  duration: 4000,
  easing: 'easeOutQuint',

});
