const findQuestion = document.querySelector('.findQuestion');
const totalQuestionNum = document.querySelector('.totalQuestionNum');
const checkCorrectness = document.querySelector('.checkCorrectness');

findQuestion.addEventListener('click', e => {
    e.preventDefault();
    const db = firebase.firestore();
    const questionRef = db.collection('q_and_a');
    const selectedCalculator = [...e.target.form.groupCalculator.elements].filter(e => e.checked)[0].value;
    const selectedAnswerType = [...e.target.form.groupAnswerType.elements].filter(e => e.checked)[0].value;
    const selectedProblemLength = [...e.target.form.groupProblemLength.elements].filter(e => e.checked)[0].value;
    const selectedAlgebra = [...e.target.form.topicsAlgebra.elements].filter(e => e.checked)[0].value;
    const selectedGeometry = [...e.target.form.topicsGeometry.elements].filter(e => e.checked)[0].value;
    const selectedArithmetic = [...e.target.form.topicsArithmetic.elements].filter(e => e.checked)[0].value;
    const selectedTrignometry = [...e.target.form.topicsTrignometry.elements].filter(e => e.checked)[0].value;
    const query = questionRef.where('calculator', '==', selectedCalculator)
                             .where('answer_type', '==', selectedAnswerType)
                             .where('length', '==', selectedProblemLength)
                             .where('topics_algebra', '==', selectedAlgebra)
                             .where('topics_arithmetic', '==', selectedArithmetic)
                             .where('topics_geometry', '==', selectedGeometry)
                             .where('topics_trignometry', '==', selectedTrignometry)
    query.get().then(data => {
        const questionTableBody = clearTable();
        totalQuestionNum.innerHTML = `Total ${data.size} Questions`
        checkCorrectness.classList.add('open');
        data.forEach(d => {
            const questionData = d.data();
            createTable(questionData, questionTableBody);
        });
        questionModal.classList.remove('open');
    }).catch(err => {
        console.log(err);
    });
});

checkCorrectness.addEventListener('click', e => {
    e.preventDefault();
    document.getElementsByTagName("tbody")[0].childNodes.forEach(c => {
        if (c.childNodes[3].childNodes[0].value === c.childNodes[5].childNodes[0].value) {
            c.childNodes[4].childNodes[0].value = 'Correct';
        } else {
            c.childNodes[4].innerHTML = 'Incorrect';
        }

    });
});

function clearTable() {
    const questionTable = document.querySelector(".questionTable");
    let questionTableBody = document.querySelector(".questionTable .questionTableBody");
    if (questionTableBody != null) {
        questionTable.removeChild(questionTableBody);
        questionTableBody = null;
    }
    questionTableBody = document.createElement('tbody');
    questionTableBody.classList.add("questionTableBody");
    questionTable.appendChild(questionTableBody);
    return questionTableBody;
}

function createTable(data, questionTableBody) {
    const row = questionTableBody.insertRow(0);
    const cellQuestionId = row.insertCell(0);
    const cellQuestionTitle = row.insertCell(1);
    const cellQuestionText = row.insertCell(2);
    const answer = row.insertCell(3);
    const correctness = row.insertCell(4);
    const correctAnswer = row.insertCell(5);
    cellQuestionId.innerHTML = data.question_id;
    cellQuestionTitle.innerHTML = data.question_title;
    cellQuestionText.innerHTML = data.question_text;
    answer.innerHTML = `<input id='${data.question_id}'></input>`;
    correctAnswer.innerHTML = data.answer;
}


