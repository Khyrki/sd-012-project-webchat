const socket = window.io();

const webchat = document.querySelector('.webchat-form');
const input = document.querySelector('.input-message');
const submit = document.querySelector('.btn-submit');

const submitForm = (event) => {
  event.preventDefault();
};

webchat.addEventListener('submit', (event) => submitForm(event));