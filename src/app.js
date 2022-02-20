/**
 * The Main Application
 */

/**
 * Imports
 */

import { APP_TITLE } from './consts.js';
import { fetchQuestions } from './fetchQuestions.js';
import { storeAnswers } from './storeAnswers.js';
import { buildScore } from './buildScore.js';


/**
 * Get inputs from html files
 */
const playBtn = document.getElementById('play-button');
const nextBtn = document.getElementById('next-button');
const loader = document.getElementById('loader');
const cat_container = document.querySelector('.categories_container');
const diff_container = document.querySelector('.difficulties_container');
const amount_container = document.querySelector('.amount_container');
const button_container = document.querySelector('.button');
const progressText = document.getElementById('progressText');
const progressCurrent = document.getElementById('progressCurrent');
const question = document.getElementById('question');
const choiceContainer = document.querySelector('.choice_container');
const checkboxText = document.getElementById('checkboxText');
const timerBar = document.getElementById('timer_bar');
const homeButton = document.querySelector('#homeBtn button');


/**
 * Create global variables
 */
let questionCounter, score, allQuestions, amountQuestions, currentQuestion, currentAnswers, counter;



const app = () =>
{
  // set the app title
  document.title = APP_TITLE;



  // When clicked on Play we fetch the questions, sotre them in localStorage and show a loader on screen
  if(playBtn) {
    playBtn.addEventListener('click', () => {
      cat_container.classList.add('hide');
      diff_container.classList.add('hide');
      amount_container.classList.add('hide');
      button_container.classList.add('hide');
      loader.classList.remove('hide');  // show loader
      let selectedCat = document.querySelector('input[name="category"]:checked').value;
      let selectedDiff = document.querySelector('input[name="difficulty"]:checked').value;
      let selectedAmount = document.querySelector('input[type="range"]').value;
      fetchQuestions(selectedCat, selectedDiff, selectedAmount)
        .then(data => {
          if(data[selectedAmount-1]) {
            localStorage.setItem('questions', JSON.stringify(data));
            localStorage.setItem('amountQuestions', selectedAmount);
            window.location.href = 'question.html';
          } else {  // If there are fewer questions than entered by the user the page shows an alert
            location.reload();
            window.alert(`There are not enough questions available\nTry decreasing the amount of questions or change the category/difficulty.`);
          }
        })
    });
  }

  // function for a 20sec timer to answer the question
  const startTimer = () => {
    let linelength = 100;
    counter = setInterval(timer, 10);
    function timer() {
      linelength-= 0.05;
      timerBar.style.width = linelength + "%";
      if(linelength <= 0) {
        clearInterval(counter);
        storeAnswers([], currentQuestion.correct_answers);
        choiceContainer.innerHTML = '';
        getQuestion();
      }
    }
  }


  // function that resets the localstorage and gets the first question
  const startQuiz = () => {
    score = 0;
    localStorage.setItem('score', score);
    questionCounter = 0;
    localStorage.setItem('questionCounter', questionCounter);
    if(localStorage.getItem('answers')) localStorage.removeItem('answers');
    if(localStorage.getItem('correctAnswers')) localStorage.removeItem('correctAnswers');
    if(localStorage.getItem('questions')) {;
      allQuestions = JSON.parse(localStorage.getItem('questions'));
      amountQuestions = localStorage.getItem('amountQuestions');
    } else {
      console.log('There are no questions to display');
    }
    getQuestion();
  }

  // function that displays the questions
  const getQuestion = () => {
    checkboxText.classList.add('hide');
    questionCounter++;
    localStorage.setItem('questionCounter', questionCounter);
    // if there are no questions left
    if(questionCounter > amountQuestions) {
      return window.location.href = 'score.html';
    } else if (questionCounter == amountQuestions) {
      nextBtn.innerText = 'Finish';
    }

    startTimer(); //starts the timer

    // building the question page
    progressText.innerHTML = `Question ${questionCounter} / ${amountQuestions}`;
    progressCurrent.style.width = `${(questionCounter/amountQuestions) * 100}%`;

    currentQuestion = allQuestions[questionCounter-1];
    question.innerText = currentQuestion.question;

    currentAnswers = currentQuestion.answers;

    Object.keys(currentAnswers).forEach(e => {
      if(currentAnswers[e]) {
        // create div
        let answerDiv = document.createElement('div');
        answerDiv.className = 'choice';
        choiceContainer.appendChild(answerDiv);

        //create input
        if(currentQuestion.multiple_correct_answers === 'false') {  // creates radio buttons
          let answerInput = document.createElement('input');
          answerInput.className = 'radio-question';
          answerInput.type = 'radio';
          answerInput.name = `question${questionCounter}`;
          answerInput.value = e;
          answerInput.id = e;
          
          let answerLabel = document.createElement('label');
          answerLabel.innerText = currentAnswers[e];
          answerLabel.htmlFor = e;

          answerDiv.appendChild(answerInput);
          answerDiv.appendChild(answerLabel);

        } else {  // creates checkboxes
          checkboxText.classList.remove('hide');

          let answerInput = document.createElement('input');
          answerInput.className = 'checkbox-question';
          answerInput.type = 'checkbox';
          answerInput.name = `question${questionCounter}`;
          answerInput.value = e;
          answerInput.id = e;

          let answerLabel = document.createElement('label');
          answerLabel.innerText = currentAnswers[e];
          answerLabel.htmlFor = e;
          
          answerDiv.appendChild(answerInput);
          answerDiv.appendChild(answerLabel);
        
        }
      }
    });
  }
  
  
  
  if(document.location.pathname === "/question.html") {
    if(!localStorage.getItem('questionCounter')) {
      startQuiz();
    } else {
      allQuestions = JSON.parse(localStorage.getItem('questions'));
      questionCounter = localStorage.getItem('questionCounter')-1;
      amountQuestions = localStorage.getItem('amountQuestions');
      getQuestion();
    }
    

    nextBtn.addEventListener('click', () => {
      let selectedAnswers = [];
      let selectedChoices = document.querySelectorAll(`input[name="question${questionCounter}"]:checked`);
      selectedChoices.forEach(e => {
        selectedAnswers.push(e.value)
      })
      if(selectedAnswers.length === 0) {
        window.alert("You have to select an answer");
      } else {
        storeAnswers(selectedAnswers, currentQuestion.correct_answers);
        clearInterval(counter);
        choiceContainer.innerHTML = '';   // removes all items from the container
        getQuestion();
      }
      
    })
  }

  if(homeButton) {
    homeButton.addEventListener('click', () => {
      window.location.href = 'index.html';
    })
  }


  if(document.location.pathname === "/score.html") {
    buildScore(); // builds the scorepage
  }

  if(document.location.pathname === "/index.html") {
    localStorage.removeItem('questionCounter');
  }
  
};

// start the app
app();