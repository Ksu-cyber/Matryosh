const instructionDialog = document.getElementById("instructionDialog");
const closeInstructionDialogBtn = document.getElementById("closeDialogButton");
const linkInstructionDialogBtn = document.getElementById("user-menu__link-user-menu__item-instruction");

window.addEventListener('load', () => {
    instructionDialog.showModal();
    document.removeEventListener('keydown', handleSpacebarPress);
});

closeInstructionDialogBtn.addEventListener('click', () => {
    instructionDialog.close();
    document.addEventListener('keydown', handleSpacebarPress);
    if (isGameStarted) {
        document.addEventListener('keydown', handleKeyPress);
    }
});

linkInstructionDialogBtn.addEventListener('click', () => {
    instructionDialog.showModal();
    document.removeEventListener('keydown', handleSpacebarPress);
    document.removeEventListener('keydown', handleKeyPress);
})