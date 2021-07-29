import * as mockroblog from './mockroblog.js'
window.mockroblog = mockroblog

function login() {
    let loginSession = window.sessionStorage;
    let usernameInput = document.getElementById("login-username").value
    let passwordInput = document.getElementById("login-password").value
    let userInfo = mockroblog.authenticateUser(usernameInput, passwordInput)
    if(userInfo){
        //Store login info
        loginSession.setItem('uid', userInfo.id); 
        loginSession.setItem('username', userInfo.username);
        window.location.href = "public_timeline.html"
    }
}

//Login button functionality
var loginButton = document.getElementById('login-button');
loginButton.onclick = function() { login() };

// Switch between login and registration forms
const loginForm = document.getElementById('login-form')
const registrationForm = document.getElementById('registration-form')
const newLoginButton = document.getElementById('new-login-button')
const newRegistrationButton = document.getElementById('new-registration-button')

newLoginButton.addEventListener("click", () => {
    loginForm.classList.toggle("hidden")
    registrationForm.classList.toggle("hidden")
})

newRegistrationButton.addEventListener("click", () => {
    registrationForm.classList.toggle("hidden")
    loginForm.classList.toggle("hidden")
})