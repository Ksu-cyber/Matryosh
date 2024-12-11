// Функция для получения данных пользователя (текущий балл и лучший балл)
function getUserData() {
    const userName = localStorage.getItem('username');
    if (!userName) return null;

    const currentPoints = parseInt(localStorage.getItem(`${userName}_currentPoints`)) || 0;
    const bestScore = parseInt(localStorage.getItem(`${userName}_bestScore`)) || 0;

    return { userName, currentPoints, bestScore };
}

// Функция для обновления текущих баллов
function updateCurrentPoints(points) {
    const userName = localStorage.getItem('username');
    if (!userName) return; // если имя пользователя не найдено, выходим

    const currentPoints = parseInt(localStorage.getItem(`${userName}_currentPoints`)) || 0;
    const newPoints = currentPoints + points;

    // Обновляем текущие баллы в LocalStorage
    localStorage.setItem(`${userName}_currentPoints`, newPoints);

    // Проверяем и обновляем лучший балл, если нужно
    const bestScore = parseInt(localStorage.getItem(`${userName}_bestScore`)) || 0;
    if (newPoints > bestScore) {
        localStorage.setItem(`${userName}_bestScore`, newPoints);
    }
}

// Функция для сброса текущих баллов после игры (например, при окончании игры)
function resetCurrentPoints() {
    const userName = localStorage.getItem('username');
    if (!userName) return;

    // Сбросить только текущие баллы, лучший балл остается
    localStorage.setItem(`${userName}_currentPoints`, 0);
}
