const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');

// check every second

// const isAlertDisplayed = () => {
//   const result = alert('This is an alert');
//   return typeof result === 'undefined';
// }

// if (isAlertDisplayed()) {
//   window.location.href = 'takeaclass.html';
// } else {
//   console.log('Alert is not displayed');
// }



let flag = 0;
// create an array of questions and their possible answers and correct answer
const questions = [
  {
    question: "1. What is the capital of Telangana?",
    options: ["Warangal", "Kamareddy", "Hyderabad", "Sydney"],
    correctAnswer: "Hyderabad"
  },
  {
    question: "2. What is the capital of Tamil Nadu?",
    options: ["Mumbai", "Hyderabad", "Delhi", "Chennai"],
    correctAnswer: "Chennai"
  },
  {
    question: "3. What is the capital of Karnataka?",
    options: ["Hyderabad", "Chennai", "Warangal", "Bengaluru"],
    correctAnswer: "Bengaluru"
  },
  {
    question: "4. What is the capital of Andhra Pradesh?",
    options: ["Hyderabad", "Chennai", "Amaravathi", "Bengaluru"],
    correctAnswer: "Amaravathi"
  },
  {
    question: "5. What is the capital of Maharashtra?",
    options: ["Mumbai", "Chennai", "Kolkata", "Bengaluru"],
    correctAnswer: "Mumbai"
  }
];
// initialize the score and wrongAnswers arrays
let score = 0;
let wrongAnswers = [];

// display the questions
function displayQuestions() {
  // clear the previous content of the quiz container
  quizContainer.innerHTML = "";

  // loop through each question and create the HTML for it
  questions.forEach((currentQuestion, questionNumber) => {
    // create a div element to hold the question and the answers
    const questionContainer = document.createElement('div');
    questionContainer.classList.add('question');

    // add the question to the container
    const questionText = document.createElement('div');
    questionText.classList.add('question-text');
    questionText.innerText = currentQuestion.question;
    questionContainer.appendChild(questionText);

    // add the answer options to the container
    const answerOptions = document.createElement('div');
    answerOptions.classList.add('answer-options');

    // loop through each answer option and create the HTML for it
    currentQuestion.options.forEach((currentOption, optionNumber) => {
      // create a label element for the answer option
      const label = document.createElement('label');

      // create a radio button for the answer option
      const radioButton = document.createElement('input');
      radioButton.type = 'radio';
      radioButton.name = `question${questionNumber}`;
      radioButton.value = currentOption;

      // add the radio button and the text to the label
      label.appendChild(radioButton);
      label.appendChild(document.createTextNode(currentOption));

      // add the label to the answer options container
      answerOptions.appendChild(label);
    });

    // add the answer options container to the question container
    questionContainer.appendChild(answerOptions);

    // add the question container to the quiz container
    quizContainer.appendChild(questionContainer);
  });
  quizContainer.appendChild(submitButton);

}

// get the user's answers and update the score and wrongAnswers arrays
function getAnswers() {
  // reset the score and wrongAnswers arrays
  score = 0;
  wrongAnswers = [];

  // loop through each question and check the user's answer
  questions.forEach((currentQuestion, questionNumber) => {
    const answerContainers = quizContainer.querySelectorAll(`div.question:nth-of-type(${questionNumber + 1}) .answer-options`);
    const selectedAnswer = Array.from(answerContainers[0].querySelectorAll('input[type="radio"]:checked')).map(radio => radio.value)[0];
    console.log(selectedAnswer)
    // if the answer is correct, update the score
    if (selectedAnswer === currentQuestion.correctAnswer) {
      score++;
    } else {
      // if the answer is wrong, add the correct answer to the wrongAnswers array
      wrongAnswers.push(currentQuestion.correctAnswer);
    }
  });
}

// display the score and retry button
function displayScore() {
    // clear the previous content of the quiz container
    
    quizContainer.innerHTML = "";

    // create a div element to hold the score and the retry button
    const scoreContainer = document.createElement('div');
    scoreContainer.classList.add('score');
    
    // add the score to the container
    const scoreText = document.createElement('div');
    scoreText.classList.add('score-text');
    scoreText.innerText = `You scored ${score} out of ${questions.length}!`;
    scoreContainer.appendChild(scoreText);

    const scoreText2 = document.createElement('div');
    scoreText2.classList.add('score-text-1');
    scoreText2.innerText = `Prepare well and continue for next Iteration until you get all answers correct.`
    scoreContainer.appendChild(scoreText2)
    // if the user got any questions wrong, add the retry button to the container
    if (wrongAnswers.length > 0) {
    const retryButton = document.createElement('button');
    retryButton.classList.add('btn','btn-primary','btn-lg','retry-button');
    retryButton.innerText = 'Retry';
    retryButton.addEventListener('click', displayWrongAnswers);
    scoreContainer.appendChild(retryButton);
    }
    if(wrongAnswers.length == 0){
      flag = 1;
      return; 
    }
    
    // add the score container to the quiz container
    quizContainer.appendChild(scoreContainer);
    }
    
    // display the questions that were answered incorrectly
    function displayWrongAnswers() {
    // filter the questions to display only the ones that were answered incorrectly
    const wrongQuestions = questions.filter((currentQuestion) => {
    return wrongAnswers.includes(currentQuestion.correctAnswer);
    });
    
    // update the questions array to include only the wrong questions
    questions.length = 0;
    Array.prototype.push.apply(questions, wrongQuestions);
    
    // display the wrong questions
    displayQuestions();
    
    // reset the score and wrongAnswers arrays
    score = 0;
    wrongAnswers = [];
    
    // add the submit button to the quiz container
    }
     
    // display the questions when the page loads
    displayQuestions();
    
    // add the event listener to the submit button
    submitButton.addEventListener('click', () => {
    getAnswers();
    displayScore();
    if(flag == 1){
      
      // const cardDiv = document.createElement("div");
      // cardDiv.classList.add('card','card-width');
      quizContainer.classList.add('congrats-div')
      const img = document.createElement("img");
      img.classList.add("card-img-top");
      img.setAttribute("src","../static/img1/Group 179650.png");

      quizContainer.appendChild(img);
      // cardDiv.appendChild(img);

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body","card-body-text-center");

      const cardTitle = document.createElement("h5");
      cardTitle.textContent = "Best Of Luck for Next Level"
      cardTitle.style.color = "#122b8d"
      cardTitle.classList.add("card-title","card-title-color")

      cardBody.appendChild(cardTitle);

      const link = document.createElement("a");
      link.setAttribute('href','/generate_certificate');
      link.textContent = "Generate Certificate";
      link.classList.add('btn', 'btn-primary','certificate-btn');

      cardBody.appendChild(link);

      // cardDiv.appendChild(cardBody);


      quizContainer.appendChild(cardBody);
      // console.log("Completed..");
    }
    });

    // hide the retry button by default
    retryButton.style.display = 'none';

