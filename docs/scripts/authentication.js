/*
const loginForm = document.querySelector("#login-form")
const registrationForm = document.querySelector("#registration-form")
const newLoginButton = document.querySelector("#new-login-button")
const newRegistrationButton = document.querySelector("#new-registration-button")

newLoginButton.addEventListener("click", () => {
    loginForm.classList.toggle("hidden")
    registrationForm.classList.toggle("hidden")
})

newRegistrationButton.addEventListener("click", () => {
    registrationForm.classList.toggle("hidden")
    loginForm.classList.toggle("hidden")
})
*/

import * as mockroblog from './mockroblog.js'
window.mockroblog = mockroblog

function login(){
    let loginSession = window.sessionStorage;
    let usernameInput = document.getElementById("login-username").value
    let passwordInput = document.getElementById("login-password").value
    if(mockroblog.authenticateUser(usernameInput, passwordInput)){
        loginSession.setItem('username', usernameInput);    //Store login info
        window.location.href = "public_timeline.html"
    }
}

//Login Button functionality
var loginButton = document.getElementById('login-button');
loginButton.onclick = function(){login()};