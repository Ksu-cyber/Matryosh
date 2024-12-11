const formTitle = document.getElementById('form-title');
const authForm = document.getElementById('auth-form');
const goToButton = document.getElementById('go-to-button');
const submitButton = document.getElementById('submit-button');
const messageDiv = document.getElementById('message');
const haveAcc = document.getElementById('haveAcc');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

let isRegisterMode = true;

goToButton.addEventListener('click', () => {
    isRegisterMode = !isRegisterMode;
    if (isRegisterMode) {

        formTitle.textContent = 'РЕГИСТРАЦИЯ';
        submitButton.textContent = 'ЗАРЕГИСТРИРОВАТЬСЯ';
        haveAcc.textContent = 'Есть аккаунт? Авторизуйтесь';
        goToButton.textContent = 'ВОЙТИ';
        messageDiv.textContent = '';
        usernameInput.value = '';
        passwordInput.value = '';

    } else {
        formTitle.textContent = 'ВХОД';
        submitButton.textContent = 'ВОЙТИ';
        haveAcc.textContent = 'Нет аккаунта? Пройдите регистрацию';
        goToButton.textContent = 'ЗАРЕГИСТРИРОВАТЬСЯ';
        messageDiv.textContent = '';
        usernameInput.value = '';
        passwordInput.value = '';
    }
});

authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    if (isRegisterMode) {
        if (localStorage.getItem(username)) {
            messageDiv.style.color = 'red';
            messageDiv.textContent = 'Пользователь уже существует';
        } else {
            localStorage.setItem(username, password);
            messageDiv.style.color = 'green';
            messageDiv.textContent = 'Регистрация успешна!';
        }
    } else {
        const storedPassword = localStorage.getItem(username);
        if (storedPassword === password) {
            localStorage.setItem('currentUser', username); // Сохраняем текущего пользователя
            messageDiv.style.color = 'green';
            messageDiv.textContent = 'Успешный вход! Переход...';
            setTimeout(() => {
                window.location.href = 'pages/game_level1.html'; // Редирект на другую страницу
            }, 2000); // Задержка 2 секунды
        } else {
            messageDiv.style.color = 'red';
            messageDiv.textContent = 'Неверный логин или пароль';
        }
    }

    usernameInput.value = '';
    passwordInput.value = '';
});