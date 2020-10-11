// FUNCTIONS FOR FILLING OUT THE QUIZ DOCUMENT
function buildQuiz(){
    // variable to store the HTML output
    const output = [];
  
    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {
  
        // variable to store the list of possible answers
        const answers = [];
  
        // and for each available answer...
        for(letter in currentQuestion.answers){
  
          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }
  
        // add this question and its answers to the output
        output.push(
          `<div class="slide"> 
          <div class ="question>
          ${currentQuestion.question} </div>
          <div class="answers"> 
          ${answers.join('')} </div>
          </div>`
        );
      }
    );
  
    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults() {
      //GATHER ANSWER CONTAINERS FROM OUR QUIZ
      const answerContainers = quizContainer.querySelectorAll('.answers');

      //KEEP TRACK FOR THE USERS ANSWERS
      let numCorrect=0;

      //FOR EACH QUESTION
      myQuestions.forEach((currentQuestion, questionNumber) => {
              //FIND SELECTED ANSWER
              const answerContainer = answerContainers[questionNumber];
              const selector = `input[name=question${questionNumber}]:checked`;
              const userAnswer = (answerContainer.querySelector(selector) || {}).value;

              //IF ANSWER IS CORRECT
              if(userAnswer === currentQuestion.correctAnswer){
                  //ADD TO CORRECT ANSWER TOTAL
                  numCorrect++;
                  //COLORS ANSWERS GREEN
                  answerContainers[questionNumber].style.color = 'lightgreen';
                  //IF ANSWER IS WRONG OR BLANK
              }else{
                //COLOR ANSWERS RED
                answerContainers[questionNumber].style.color = 'red';
              }
              
          });
          //SHOW TOTAL CORRECT ANSWERS OUT OF THE QUIZ
          resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}
//FUNCTION FOR THE SLIDES TO OPERATE
function showSlide(n) {
  slides[currentSlide].classList.remove('active-slide');
  slides[n].classList.add('active-slide');
  currentSlide = n;
  if (currentSlide === 0){
    previousButton.style.display = 'none';
  } else{
    previousButton.style.display = 'inline-block';
  }
  if(currentSlide === slides.length-1){
    nextButton.style.display = 'none';
    submitButton.style.display = 'inline-block';
  }else{
    nextButton.style.display = 'inline-block';
    submitButton.style.display =  'none';
  }
}
//FUNCTION TO NAVIGATE THE 'NEXT' SLIDE BY +1
function showNextSlide() {
  showSlide(currentSlide + 1);
}
//FUNCTION TO NAVIGATE THE 'PREVIOUS' SLIDE BY -1
function showPreviousSlide() {
  showSlide(currentSlide -1);
}


// VARIABLES USED TO STORE INFORMATION IN THE 'QUIZ', 'RESULTS', & 'SUBMIT' DIVS
const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");

//THE ARRAY OF QUIZ QUESTIONS
const myQuestions = [
    {
        question: "Who invented JavaScript?",
    answers: {
      a: "Douglas Crockford",
      b: "Sheryl Sandberg",
      c: "Brendan Eich"
    },
    correctAnswer: "c"
  },
  {
    question: "Which one of these is a JavaScript package manager?",
    answers: {
      a: "Node.js",
      b: "TypeScript",
      c: "npm"
    },
    correctAnswer: "c"
  },
  {
    question: "Which tool can you use to ensure code quality?",
    answers: {
      a: "Angular",
      b: "jQuery",
      c: "RequireJS",
      d: "ESLint"
    },
    correctAnswer: "d"
    }, 
    {
      question: "What is the proper format for an 'Arrow Function' in JS?",
      answers: {
        a: `hello = () => {}`,
        b:`function() => {}`,
        c:`() => {}`,
        d:`{} (=>) = `
      },
      correctAnswer: "a"
    },
      {
        question: "How do you navigate through a JS object within the code?" ,
        answers: {
          a:"dot notation",
          b:"With the GUI",
          c:"With a 'GET' command",
          d:"With a GPS"
        },
        correctAnswer: "a"
      },
        {
          question: "Which function rounds the given numerical value up?",
          answers: {
            a: "Math.floor()",
            b: "Math.ceil()",
            c: "Math.up()",
            d:"Math.sqrt()"
          },
          correctAnswer: "b"
        },
          {
            question: "Which function directly selects the `ID` of a div without using the `#`?",
            answers: {
              a: "querySelector",
              b: "querySelectorAll",
              c: "getElementByClass",
              d: "getElementByID"
            },
            correctAnswer: "d"
          },
            {
              question: "Which function rounds a given numerical value down?",
              answers: {
                a: "Math.ceil()",
                b: "Math.sqrt()",
                c: "Math.rnd()",
                d: "Math.floor()"
              },
              correctAnswer: "d"
            },
              {
                question: "When using the `setTimeout()` function, what is the base measurement of time?" ,
                answers: {
                  a:"Milliseconds",
                  b:"Microseconds",
                  c:"Macroseconds",                  
                  d:"Hours"
                },
                correctAnswer: "a"
              },
                {
                  question: "Among the given answers, which is recognized as a JS boolean value?",
                  answers: {
                    a: "Truthy",
                    b: "0",
                    c: "Falsey",
                    d: "True"
                  },
                  correctAnswer: "d"
    }
]

//DISPLAY THE QUIZ
buildQuiz();

//PAGINATION
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;


//SHOW FIRST SLIDE
showSlide(currentSlide);

//EVENT LISTENERS
submitButton.addEventListener('click', showResults);
//EVENT LISTENER FOR THE 'PREVIOUS' BUTTON
previousButton.addEventListener("click", showPreviousSlide);
//EVENT LISTENER FOR THE 'NEXT' BUTTON
nextButton.addEventListener("click", showNextSlide);

