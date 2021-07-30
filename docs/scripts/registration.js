import * as mockroblog from './mockroblog.js'
window.mockroblog = mockroblog

function checkForRegistrationValidation(usernameInput, emailInput, passwordInput, confirmPasswordInput) {
    return true
}

function register () {
    const loginSession = window.sessionStorage
    const usernameInput = document.getElementById('registration-username').value   
    const emailInput = document.getElementById('registration-email').value
    const passwordInput = document.getElementById('registration-password').value
    const userInfo = mockroblog.createUser(usernameInput, emailInput, passwordInput)
    checkForRegistrationValidation(usernameInput, emailInput, passwordInput, userInfo)
    if (userInfo) {
        // Store login info
        loginSession.setItem('uid', userInfo.id)
        loginSession.setItem('username', userInfo.username)
        window.location.href = 'home_timeline.html'
    }
}
const registerButton = document.getElementById('register-button')
registerButton.onclick = function () { register() }

// Registration validation
function checkForRegistrationValidation(usernameInput, emailInput, passwordInput, userInfo) {
    const registrationValidation = document.getElementById('registration-validation')
    registrationValidation.innerHTML = ''
    if (usernameInput === '' && passwordInput === '') {
      registrationValidation.innerHTML = "Error: Please enter an email, username, and password."
    }
  }