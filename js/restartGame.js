const restartBtn = document.getElementById("game-header__logo");

restartBtn.addEventListener("click", () => {
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('currentUser_lvl')) {
            localStorage.removeItem(key);
        }
    });

    setTimeout(() => {
        window.location.href = 'game_level1.html';
    }, 200);
})