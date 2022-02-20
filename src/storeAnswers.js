
let answers, correctAnswers;

// stores the answer by the user and the correct answer in localStorage
const storeAnswers = (selectedAnswers, currentCorrectAnswers) => {
  localStorage.getItem('answers') ? answers = JSON.parse(localStorage.getItem('answers')) : answers = [];
  answers.push(selectedAnswers);
  localStorage.setItem('answers', JSON.stringify(answers));
  let correctAnswersArray = [];
  localStorage.getItem('correctAnswers') ? correctAnswers = JSON.parse(localStorage.getItem('correctAnswers')) : correctAnswers = [];
  Object.keys(currentCorrectAnswers).forEach(e => {
    if(currentCorrectAnswers[e] === 'true') {
      correctAnswersArray.push(e.substr(0, 8));
    }
  });
  correctAnswers.push(correctAnswersArray);
  localStorage.setItem('correctAnswers', JSON.stringify(correctAnswers));
  let score = localStorage.getItem('score');
  if(JSON.stringify(selectedAnswers) == JSON.stringify(correctAnswersArray)) score++;
  localStorage.setItem('score', score);

}

export { storeAnswers };