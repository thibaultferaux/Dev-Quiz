// returns true if question was answered correct, otherwise it returns false
export const checkIfCorrect = (index) => {
    let answers = JSON.parse(localStorage.getItem('answers'));
    let correctAnswers = JSON.parse(localStorage.getItem('correctAnswers'));
    if(JSON.stringify(answers[index]) == JSON.stringify(correctAnswers[index])) {
        return true;
    } else {
        return false;
    }
}