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