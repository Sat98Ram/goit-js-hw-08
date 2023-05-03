import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  input: document.querySelector('.feedback-form input'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextareaInput));

//  виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями

populateForm();

function onFormSubmit(event) {
  event.preventDefault();

  const formData = {
    email: refs.input.value,
    message: refs.textarea.value,
  };

  console.log(formData);

  event.target.reset();

  localStorage.removeItem('feedback-form-state');
}

function onTextareaInput(event) {
  const { message, email } = event.currentTarget.elements;

  localStorage.setItem(
    'feedback-form-state',
    JSON.stringify({ message: message.value, email: email.value })
  );
}

function populateForm() {
  const savedForm = localStorage.getItem('feedback-form-state');

  if (savedForm) {
    const parsedData = JSON.parse(savedForm);
    console.log(parsedData);
    refs.textarea.value = parsedData.message;
    refs.input.value = parsedData.email;
  }
}
