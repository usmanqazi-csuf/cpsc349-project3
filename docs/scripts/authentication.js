import * as mockroblog from './mockroblog.js'
window.mockroblog = mockroblog

function login () {
  const loginSession = window.sessionStorage
  const usernameInput = document.getElementById('login-username').value
  const passwordInput = document.getElementById('login-password').value
  const userInfo = mockroblog.authenticateUser(usernameInput, passwordInput)
  checkForLoginValidation(usernameInput, passwordInput, userInfo)
  if (userInfo) {
    // Store login info
    loginSession.setItem('uid', userInfo.id)
    loginSession.setItem('username', userInfo.username)
    window.location.href = 'home_timeline.html'
  }
}

// Login button functionality
const loginButton = document.getElementById('login-button')
loginButton.onclick = function () { login() }

// Switch between login and registration forms
const loginForm = document.getElementById('login-form')
const registrationForm = document.getElementById('registration-form')
const newLoginButton = document.getElementById('new-login-button')
const newRegistrationButton = document.getElementById('new-registration-button')

newLoginButton.addEventListener('click', () => {
  loginForm.classList.toggle('hidden')
  registrationForm.classList.toggle('hidden')
})

newRegistrationButton.addEventListener('click', () => {
  registrationForm.classList.toggle('hidden')
  loginForm.classList.toggle('hidden')
})

// Login validation
function checkForLoginValidation(usernameInput, passwordInput, userInfo) {
  const loginInfoValidation = document.getElementById('login-validation')
  loginInfoValidation.innerHTML = ''
  if (usernameInput === '' && passwordInput === '') {
    loginInfoValidation.innerHTML = "Error: Please enter a username and password."
  } else if (usernameInput === '') {
    loginInfoValidation.innerHTML = "Error: Please enter a username."
  } else if (passwordInput === '') {
    loginInfoValidation.innerHTML = "Error: Please enter a password."
  } else if (!userInfo) {
    loginInfoValidation.innerHTML = "Error: The username and/or password was incorrect. Please try again."
  }
}