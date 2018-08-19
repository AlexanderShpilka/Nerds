const contactsFeedbackBtn = document.querySelector('.contacts__feedback');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');
const modalOverlay = document.querySelector('.modal__overlay');
const form = document.querySelector('.form');
const nameInput = document.querySelector('[name=name]');
const emailInput = document.querySelector('[name=email]');
const messageInput = document.querySelector('[name=message]');
let isStorageSupport = true;
let storageName = '';
let storageEmail = '';

try {
  storageName = localStorage.getItem('name');
  storageEmail = localStorage.getItem('email');
} catch (err) {
  isStorageSupport = false;
}

contactsFeedbackBtn.addEventListener('click', function(evt) {
  evt.preventDefault();
  modal.classList.add('modal--show');

  if (storageName && storageEmail) {
    nameInput.value = storageName;
    emailInput.value = storageEmail;
    messageInput.focus();
  } else {
    nameInput.focus();
  }
});

modalClose.addEventListener('click', function(evt) {
  evt.preventDefault();
  modal.classList.remove('modal--show');
  // todo write modal--error behaviour
  writeUsModal.classList.remove('modal--error');
});

form.addEventListener('submit', function(evt) {
  if (!nameInput.value || !emailInput.value || !messageInput.value) {
    evt.preventDefault();
    modal.classList.add('modal--error');
  } else {
    if (isStorageSupport) {
      localStorage.setItem('name', nameInput.value);
      localStorage.setItem('email', emailInput.value);
    }
  }
});

window.addEventListener('keydown', function(evt) {
  if (evt.keyCode === 27 && modal.classList.contains('modal--show')) {
    evt.preventDefault();
    modal.classList.remove('modal--show');
  }
});

modalOverlay.addEventListener('click', function(evt) {
  modal.classList.remove('modal--show');
});
