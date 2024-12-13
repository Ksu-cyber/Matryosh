let rating = [];
const ratingList = document.getElementById("rating_list");

function doRate() {
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('bestScore_')) {
            let userName = key.replace('bestScore_', '');
            console.log(userName);
            let bestScore = localStorage.getItem(key);
            console.log(bestScore);

            rating.push({userName: userName, bestScore: bestScore});
        }
    });

    rating.sort((a, b) => b.bestScore - a.bestScore);

    createUl();
}

function createUl(players) {
    const ul = document.createElement('ul'); // Создаем список
    const maxScore = rating[0].bestScore;

    rating.forEach(player => {
        const li = document.createElement('li'); // Создаем элемент списка
        li.classList.add('player-item');


        const playerName = document.createElement('span');
        playerName.classList.add('player-name');
        playerName.textContent = player.userName;

        const scoreBarContainer = document.createElement('div');
        scoreBarContainer.classList.add('score-bar-container');

        const scoreBar = document.createElement('div');
        scoreBar.classList.add('score-bar');

        // Заполнение полоски пропорционально баллам игрока
        const scorePercentage = (player.bestScore / maxScore) * 100;
        scoreBar.setAttribute('data-width', scorePercentage);
        scoreBar.textContent = player.bestScore;

        li.append(playerName);
        scoreBarContainer.append(scoreBar);
        li.append(scoreBarContainer);

        ul.append(li); // Добавляем элемент в список
    });

    ratingList.append(ul);

    setTimeout(() => {
        const scoreBars = document.querySelectorAll('.score-bar');
        scoreBars.forEach(bar => {
            bar.style.width = bar.getAttribute('data-width') + '%'; // Начинаем анимацию с ширины
        });
    }, 50);
}

doRate();


