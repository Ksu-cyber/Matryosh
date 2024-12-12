// Окно подтверждения завершения игры
const exitModal = document.getElementById('exitModal');
const confirmExitButton = document.getElementById('confirmExit');
const cancelExitButton = document.getElementById('cancelExit');

// Обработчик нажатия на клавишу Esc
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.removeEventListener('keydown', handleSpacebarPress);
        document.removeEventListener('keydown', handleKeyPress);

        if (isGameStarted) {
            clearInterval(timer);
        }
        exitModal.style.display = 'block'; // Показываем окно подтверждения
    }
});

// Если пользователь подтверждает выход (кнопка "Да")
confirmExitButton.addEventListener('click', function() {
    // Перенаправление на другую страницу
    window.location.href = "rate.html"; // Перейти на другую страницу
});

// Если пользователь отменяет выход (кнопка "Нет")
cancelExitButton.addEventListener('click', function() {
    exitModal.style.display = 'none'; // Закрыть окно
    document.addEventListener('keydown', handleSpacebarPress);

    // Возобновить игру, если нужно
    if (isGameStarted) {
        startTimer();
        document.addEventListener('keydown', handleKeyPress);
    }
});