import * as mockroblog from './mockroblog.js'
window.mockroblog = mockroblog

function login(){
    console.log('LOGIN CALLED')
    console.log(document.getElementById("username").value, document.getElementById("password").value)
    
    let loginSession = window.sessionStorage;
    if(mockroblog.authenticateUser(document.getElementById("username").value, document.getElementById("password").value)){
        console.log('VALID LOGIN')
        loginSession.setItem('username', mockroblog.authenticateUser(document.getElementById("username").value,document.getElementById("password").value));
        window.location.href = "public_timeline.html"
    }
}

//Login Button functionality
var loginButton = document.getElementById('loginButton');
loginButton.onclick = function(){login()};