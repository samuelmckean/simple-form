import { countries } from 'countries-list';

const countryCodes = Object.keys(countries);
const countryNames = countryCodes.map((code) => countries[code].name);

// handles inline validation for email
function validateEmail() {
  const email = document.getElementById('email');
  if (email.validity.typeMismatch) {
    // notify user if not email format
    email.classList.add('invalid');
    email.setCustomValidity('Not a valid email.');
    email.reportValidity();
  }
  // not valueMissing or typeMismatch, email is valid
  email.classList.remove('invalid');
  email.setCustomValidity('');
  email.reportValidity();
}

// handles inline validation for country by comparing with list of all countries
function validateCountry() {
  const countryInput = document.getElementById('country');
  const country = countryInput.value;
  // validates if the country is a real country
  if (!countryNames.includes(country)) {
    // notify user if not a valid country
    countryInput.classList.add('invalid');
    countryInput.setCustomValidity('Country does not exist.');
    countryInput.reportValidity();
  }
  countryInput.classList.remove('invalid');
  countryInput.setCustomValidity('');
  countryInput.reportValidity();
}

// handles inline validation for zipcode matching with US format
function validateZipcode() {
  const zipcodeInput = document.getElementById('zipcode');
  if (zipcodeInput.validity.patternMismatch) {
    zipcodeInput.classList.add('invalid');
    zipcodeInput.setCustomValidity('Not a valid zipcode format (ex. 01234 or 12345-6789)');
    zipcodeInput.reportValidity();
  }
  zipcodeInput.classList.remove('invalid');
  zipcodeInput.setCustomValidity('');
  zipcodeInput.reportValidity();
}

// handles inline validation for password length
function validatePassword() {
  const password = document.getElementById('password');
  if (password.validity.tooShort) {
    password.classList.add('invalid');
    password.setCustomValidity('Password must be at least 8 characters.');
    password.reportValidity();
  }
  if (password.validity.tooLong) {
    password.classList.add('invalid');
    password.setCustomValidity('Password must be less than 20 characters.');
    password.reportValidity();
  }
  password.classList.remove('invalid');
  password.setCustomValidity('');
  password.reportValidity();
}

// handles inline validation for confirm password matching with password
function validatePasswordMatch() {
  const password = document.getElementById('password');
  const passwordConfirm = document.getElementById('password-confirm');
  if (password.value !== passwordConfirm.value) {
    passwordConfirm.classList.add('invalid');
    passwordConfirm.setCustomValidity('Passwords do not match.');
    passwordConfirm.reportValidity();
  }
  passwordConfirm.classList.remove('invalid');
  passwordConfirm.setCustomValidity('');
  passwordConfirm.reportValidity();
}

// display the submitted info
function validateForm(event) {
  const form = document.querySelector('form');
  const email = document.createElement('p');
  email.innerText = form.email.value;
  const country = document.createElement('p');
  country.innerText = form.country.value;
  const zipcode = document.createElement('p');
  zipcode.innerText = form.zipcode.value;
  const password = document.createElement('p');
  password.innerText = form.password.value;
  const display = document.getElementById('display');
  display.replaceChildren();
  display.append(email, country, zipcode, password);
  // prevent refreshing the page on submit
  event.preventDefault();
}

const form = document.querySelector('form');
form.addEventListener('submit', validateForm);
// validate the email on invalid for custom validation
form.email.addEventListener('blur', validateEmail);
form.country.addEventListener('blur', validateCountry);
form.zipcode.addEventListener('blur', validateZipcode);
form.password.addEventListener('blur', validatePassword);
form.passwordconfirm.addEventListener('blur', validatePasswordMatch);
