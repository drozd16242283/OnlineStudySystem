export function login() {
    document.querySelector('.loginForm').classList.toggle('show')
    document.querySelector('.registerForm').classList.remove('show')
}

export function register() {
    document.querySelector('.registerForm').classList.toggle('show')
    document.querySelector('.loginForm').classList.remove('show')
}
