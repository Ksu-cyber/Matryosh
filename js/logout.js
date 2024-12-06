const currentUser = localStorage.getItem('currentUser');
const logoutButton = document.getElementById('user-menu__link-exit');

// if (currentUser) {
//     logoutButton.disabled = false; // Делаем кнопку активной
// } else {
//     alert('Вы не авторизованы!');
//     window.location.href = 'index.html'; // Возвращаем на страницу входа
// }

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('currentUser'); // Удаляем текущего пользователя
    alert('Вы вышли из аккаунта!');
    window.location.href = '../index.html'; // Возвращаем на страницу входа
});