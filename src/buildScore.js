import { checkIfCorrect } from './checkIfCorrect.js';

const scoreText = document.getElementById('score');
const resultDiv = document.querySelector('.results')
let counter;


// builds the score page
export const buildScore = () => {
    counter = 0;
    scoreText.innerText = `${localStorage.getItem('score')} / ${localStorage.getItem('amountQuestions')}`;

    let questions = JSON.parse(localStorage.getItem('questions'));

    questions.forEach(question => {
        // building the resultCard
        let resultCard = document.createElement('div');
        resultCard.className = 'result_card';
        // if question answered is correct the card gets a green border, otherwise it gets a red border
        if(checkIfCorrect(counter)) { 
            resultCard.classList.add('correct');
        } else {
            resultCard.classList.add('wrong');
        }
        resultDiv.appendChild(resultCard);


        // filling up the resultCard
        let questionText = document.createElement('h2');
        questionText.innerText = question.question;
        resultCard.appendChild(questionText);


        // show the users answer
        let userAnswerLabel = document.createElement('p');
        userAnswerLabel.innerText = 'Your answer';
        resultCard.appendChild(userAnswerLabel);

        let userAnswerList = document.createElement('ul');
        resultCard.appendChild(userAnswerList);
        let userAnswer = JSON.parse(localStorage.getItem('answers'))[counter];
        if(userAnswer.length) {
            userAnswer.forEach((e) => {
                let userAnswerText = document.createElement('li');
                userAnswerText.innerText = question.answers[e];
                userAnswerList.appendChild(userAnswerText);
            })
        } else {
            let userAnswerText = document.createElement('li');
            userAnswerText.innerText = "/";
            userAnswerList.appendChild(userAnswerText);
        }

        // if the question was answered wrong it shows the correct answer
        if(!checkIfCorrect(counter)) {  
            let correctAnswerLabel = document.createElement('p');
            correctAnswerLabel.innerText = 'Correct answer';
            resultCard.appendChild(correctAnswerLabel);

            let correctAnswerList = document.createElement('ul');
            resultCard.appendChild(correctAnswerList);
            let correctAnswer = JSON.parse(localStorage.getItem('correctAnswers'))[counter];
            correctAnswer.forEach((e) => {
                let correctAnswerText = document.createElement('li');
                correctAnswerText.innerText = question.answers[e];
                correctAnswerList.appendChild(correctAnswerText);
            })
        }
        counter++;
    })
}