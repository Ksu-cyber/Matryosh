let timer;
let timeRemaining = 180; // 3 минуты
let isGameStarted = false;
let currentScore = 0;
const matryoshkaColors1 = [
    'синих',   // 0
    'зелёных', // 1
    'оранжевых', // 2
    'фиолетовых', // 3
    'красных', // 4
    'жёлтых'   // 5
];

const matryoshkaColors = [
    { name: 'синих', color: '#46A5DE' },
    { name: 'зелёных', color: '#3F975A' },
    { name: 'оранжевых', color: '#FFCB33' },
    { name: 'фиолетовых', color: '#D645DE' },
    { name: 'красных', color: '#DE4545' },
    { name: 'жёлтых', color: '#F6F25E' }
];

let score = 0;
let currentQuestion = {};
let draggedMatryoshka = null
let neededMatryoshkaColor = 0;
const timerDiv = document.getElementById('timer');
const gameInfo = document.getElementById('gameInfo');
const matryoshkaField = document.getElementById('matryoshkaField');
const matryoshkaContainer = document.getElementById('matryoshkaContainer');
const finishBtn = document.getElementById('finishBtn');
const scoreElement = document.getElementById('current_score');

// Начало игры
function startGame() {
    isGameStarted = true;

    generateQuestion(gameInfo);

    finishBtn.style.display = 'block';
    startTimer();

    document.addEventListener('keydown', handleKeyPress);

    matryoshkaField.addEventListener("dragover", handleDragOver);
    matryoshkaField.addEventListener("drop", handleDropInField);
    matryoshkaContainer.addEventListener("dragover", handleDragOver);
    matryoshkaContainer.addEventListener("drop", handleDropInContainer);
}

// Генерация случайного вопроса
function generateQuestion() {
    neededMatryoshkaColor = Math.floor(Math.random() * matryoshkaColors.length);

    // const randomCount = Math.floor(Math.random() * 5) + 1;
    // currentQuestion = { color: randomMatryoshka, count: randomCount };
    currentQuestion = { color: neededMatryoshkaColor};
    // gameInfoElement.innerText = `Собери матрешку из ${randomCount} ${randomMatryoshka} матрешек`;
    gameInfo.innerHTML = `Собери матрёшку из <span style="color: ${(matryoshkaColors[neededMatryoshkaColor]).color};">${(matryoshkaColors[neededMatryoshkaColor]).name}</span> матрёшек за 3 минуты!`;
}

// Таймер
function startTimer() {
    timer = setInterval(() => {
        if (timeRemaining <= 0) {
            clearInterval(timer);

            endGame();
        } else {
            timeRemaining--;
            let minutes = Math.floor(timeRemaining / 60);
            let seconds = timeRemaining % 60;
            timerDiv.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    }, 1000);
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        createAndAnimateMatryoshka();
    }
}

function handleDragOver(e) {
    e.preventDefault()
}

function handleDropInField(e) {
    e.preventDefault();

    const scale = draggedMatryoshka.style.transform ? parseFloat(draggedMatryoshka.style.transform.replace('scale(', '').replace(')', '')) : 1;
    draggedMatryoshka.classList.add('is-dragging');
    // Получаем размеры блока moveBlock
    const FieldRect = matryoshkaField.getBoundingClientRect();

    // Рассчитываем границы для перетаскиваемого элемента
    const minX = FieldRect.left;
    const minY = FieldRect.top;
    const maxX = FieldRect.right - draggedMatryoshka.offsetWidth;
    const maxY = FieldRect.bottom  - draggedMatryoshka.offsetHeight * scale;

    // Получаем новые координаты перетаскиваемого элемента
    let newX = e.clientX - draggedMatryoshka.offsetWidth / 2;
    let newY = e.clientY - draggedMatryoshka.offsetHeight * scale / 2;

    // Переопределяем новые координаты, чтобы элемент оставался внутри блока 1
    newX = Math.max(minX, Math.min(maxX, newX));
    newY = Math.max(minY, Math.min(maxY, newY));

    // Устанавливаем новое положение для элемента
    draggedMatryoshka.style.position = "absolute";
    draggedMatryoshka.style.left = `${newX}px`;
    draggedMatryoshka.style.top = `${newY}px`;

    // Динамически обавляем элемент в блок
    matryoshkaField.append(draggedMatryoshka);
}

function handleDropInContainer(e) {
    e.preventDefault();
    draggedMatryoshka.classList.remove('is-dragging');

    // Возвращаем позиционирование к относительному
    draggedMatryoshka.style.position = "relative";
    draggedMatryoshka.style.left = "0";
    draggedMatryoshka.style.top = "0";
    matryoshkaContainer.append(draggedMatryoshka);
}
function handleDropInField1(e) {
    e.preventDefault();

    draggedMatryoshka.classList.add('is-dragging');
    // Возвращаем позиционирование к относительному
    draggedMatryoshka.style.position = "relative";
    draggedMatryoshka.style.left = "0";
    draggedMatryoshka.style.top = "0";
    matryoshkaField.append(draggedMatryoshka);
}


function createAndAnimateMatryoshka() {
    matryoshkaContainer.innerHTML = "";

    // Создаем элемент img для матрешки
    const matryoshkaImage = document.createElement('img');
    const randomNum = Math.floor(Math.random() * matryoshkaColors.length);
    matryoshkaImage.src = `../images/matryoshki/matryoshka_${randomNum}.png`;  // Путь к изображению
    matryoshkaImage.alt = 'Матрешка';
    matryoshkaImage.classList.add('matryoshka');  // Добавляем класс для анимации
    matryoshkaImage.draggable = true;
    matryoshkaImage.setAttribute('data-color', randomNum);

    // Добавляем изображение в контейнер
    matryoshkaContainer.append(matryoshkaImage);

    // Генерация случайной горизонтальной позиции
    const randomX = Math.random() * (window.innerWidth - 80); // 100 - ширина изображения

    // Начальная позиция сверху
    matryoshkaImage.style.left = `${randomX}px`;

    // Запуск анимации (перемещение вниз)
    setTimeout(() => {
        matryoshkaImage.style.top = `${window.innerHeight - 150}px`;  // Позиция чуть выше нижней части окна
    }, 50); // Небольшая задержка, чтобы сработала анимация


    // Обработчик для изменения масштаба с помощью кнопок мыши
    let scale = 1;
    const minScale = 0.5;
    const maxScale = 1.5;

    matryoshkaImage.addEventListener('mousedown', function(event) {
        if (matryoshkaImage.classList.contains('is-dragging')) {
            return;
        }
        if (event.button === 2) { // Правая кнопка мыши (уменьшение)
            scale -= 0.1;
            if (scale < minScale) scale = minScale;
        } else if (event.button === 0) { // Левая кнопка мыши (увеличение)
            scale += 0.1;
            if (scale > maxScale) scale = maxScale;
        }
        matryoshkaImage.style.transform = `scale(${scale})`; // Применяем масштаб
    });

    // Предотвращаем появление контекстного меню браузера при нажатии правой кнопкой мыши
    matryoshkaImage.addEventListener('contextmenu', function(event) {
        event.preventDefault();
    });

    // Назначаем перетаскивание
    matryoshkaImage.addEventListener("dragstart", function(e) {
        draggedMatryoshka = matryoshkaImage; // Сохраняем ссылку на перетаскиваемую матрешку
    });
}


// Проверка правильности сборки
finishBtn.addEventListener('click', () => {
    endGame();
    if (score === 0)
    {
        alert('Ошибка в сборке!');
    }
});


// // Подсчет очков
function calculateScore() {
    let count = 0;
    let elements = null;
    let timeTaken = 0;
    let points = 0;

    if (checkOrder()) {
        elements = matryoshkaField.querySelectorAll('.matryoshka')
        count = elements.length;
        points = (timeRemaining/ 6) * (count > 0 ? 1: 0) + count * 5;

        if (timeRemaining === 0) {
            points -= 4;
        }

        score = Math.round(Math.max(0, points) * 10) / 10;
    }
}

// // Обновление счета
// function updateScore(score) {
//     scoreElement.innerText = `Баллы: ${score}`;
// }

// Конец игры
function endGame() {
    isGameStarted = false;
    document.removeEventListener('keydown', handleKeyPress);
    clearInterval(timer);
    finishBtn.style.display = 'none';


    calculateScore();
    gameInfo.innerText = 'Игра завершена! Ваши баллы: ' + score;
    saveScore();


    setTimeout(() => {
        location.reload();
    }, 4000);

}

// Сохранение результата в localStorage
function saveScore() {
    const user = localStorage.getItem('currentUser');
    if (user) {
        const userScores = JSON.parse(localStorage.getItem('userScores')) || {};
        userScores[user] = score;
        localStorage.setItem('userScores', JSON.stringify(userScores));
    }
}


// Функция для получения всех матрешек с их текущими координатами и scale
function getMatryoshkaPositions() {
    let matryoshkas;
    let positions;
    matryoshkas = Array.from(matryoshkaField.querySelectorAll('.matryoshka'));

    // Получаем позицию и scale для каждой матрешки
    positions = matryoshkas.map(matryoshka => {
        const rect = matryoshka.getBoundingClientRect(); // Позиция на экране
        const color = matryoshka.getAttribute('data-color');
        const scale = matryoshka.style.transform ? parseFloat(matryoshka.style.transform.replace('scale(', '').replace(')', '')) : 1;

        return {
            element: matryoshka,
            x: rect.left,
            scale: scale,
            color: color

        };
    });

    return positions;
}

// Функция для проверки порядка элементов в поле
function checkOrder() {
    const positions = getMatryoshkaPositions();

    // Сортируем элементы по оси X
    positions.sort((a, b) => a.x - b.x);  // Сортируем по позиции X

    // Проверяем, что элементы отсортированы по возрастанию scale
    for (let i = 1; i < positions.length; i++) {
        const prev = positions[i - 1];
        const current = positions[i];

        // Если предыдущий элемент имеет большее значение scale, порядок нарушен
        if (prev.scale > current.scale) {
            console.log("Порядок нарушен по scale!");
            return false;
        }
        if (prev.color != neededMatryoshkaColor) {
            console.log("Порядок нарушен по color!");
            return false;
        }
    }

    console.log("Порядок правильный!");
    return true;
}

// Вызываем функцию для проверки порядка после того, как элементы были перетащены или перемещены
matryoshkaField.addEventListener("drop", function (e) {
    handleDropInField(e);  // Обрабатываем перетаскивание
    checkOrder();  // Проверяем порядок по X и scale
});

// Запуск игры по нажатию пробела
document.addEventListener('keydown', (event) => {
    if (event.key === ' ' && !isGameStarted) {
        event.preventDefault();
        startGame();
    }
});

