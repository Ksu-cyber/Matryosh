const instructionDialog = document.getElementById("instructionDialog");
const closeInstructionDialogBtn = document.getElementById("closeDialogButton");

window.addEventListener('load', () => {
    instructionDialog.showModal();
    document.removeEventListener('keydown', handleSpacebarPress);
});

closeInstructionDialogBtn.addEventListener('click', () => {
    instructionDialog.close();
    document.addEventListener('keydown', handleSpacebarPress);
});