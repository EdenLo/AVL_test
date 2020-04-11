const questionModal = document.querySelector('.newQuestion');
const addQuestionLink = document.querySelector('.addQuestionLink');
const questionForm = document.querySelector('.newQuestion form');
const mailSection = document.querySelector('.mailSection');
const questionSection = document.querySelector('.questionSection');
const showQuestionLink = document.querySelector('.showQuestionLink');
const mailUsLink = document.querySelector('.mailUsLink');

addQuestionLink.addEventListener('click', () => {
    questionModal.classList.add('open');
});

questionModal.addEventListener('click', e => {
    if (e.target.classList.contains('newQuestion')) {
        questionModal.classList.remove('open');
    }
});

showQuestionLink.addEventListener('click', () => {
    questionSection.style.display = "block";
    addQuestionLink.style.display = "inline";
    mailUsLink.style.display = "inline";
    mailSection.style.display = "none";
    showQuestionLink.style.display = "none";
});

mailUsLink.addEventListener('click', () => {
    mailSection.style.display = "block";
    showQuestionLink.style.display = "inline";
    questionSection.style.display = "none";
    mailUsLink.style.display = "none";
    addQuestionLink.style.display = "none";
});
