const questions = [
  {
    question: "When was Lewis Hamilton born?",
    options: ["May 8, 1985", "December 8, 1985", "January 7, 1985", "May 30, 2002"],
    answer: "January 7, 1985"
  },
  {
    question: "Which team won the Constructors championship in 2007?",
    options: ["Ferrari", "Renault", "McLaren", "Red Bull"],
    answer: "Ferrari"
  },
  {
    question: "Which circuit has hosted the most Formula 1 Grand Prix races?",
    options: ["Circuit de Monaco", "Silverstone Circuit", "Monza Circuit", "Circuit de Spa-Francorchamps"],
    answer: "Monza Circuit"
  },
  {
    question: "Who was the youngest driver to win a Formula 1 Grand Prix race?",
    options: ["Max Verstappen", "Sebastian Vettel", "Fernando Alonso", "Charles Leclerc"],
    answer: "Max Verstappen"
  },
  {
    question: "Which team holds the record for the most wins in a season?",
    options: ["Ferrari", "Mercedes", "Red Bull", "McLaren"],
    answer: "Red Bull"
  }
];

let currentQuestion = 0;
let answered = false;
let correctAnswers = 0;

function displayQuestion() {
  const progressText = document.getElementById("progress");
  const questionText = document.getElementById("questionText");
  const optionA = document.getElementById("optionA");
  const optionB = document.getElementById("optionB");
  const optionC = document.getElementById("optionC");
  const optionD = document.getElementById("optionD");

  progressText.textContent = `Question ${currentQuestion + 1} of ${questions.length} | Correct Answers: ${correctAnswers}`;
  questionText.textContent = questions[currentQuestion].question;
  optionA.textContent = questions[currentQuestion].options[0];
  optionB.textContent = questions[currentQuestion].options[1];
  optionC.textContent = questions[currentQuestion].options[2];
  optionD.textContent = questions[currentQuestion].options[3];

  // Reset background colors of all options
  document.querySelectorAll(".option").forEach(option => {
    option.style.backgroundColor = "";
  });
}

function checkAnswer(selectedOption) {
  if (answered) return; // Check if the question is already answered

  answered = true;
  
  const selectedAnswer = selectedOption.textContent;
  const correctAnswer = questions[currentQuestion].answer;
  
  if (selectedAnswer === correctAnswer) {
    selectedOption.style.backgroundColor = "green";
    correctAnswers++;
  } else {
    selectedOption.style.backgroundColor = "red";
    document.querySelectorAll(".option").forEach(option => {
      if (option.textContent === correctAnswer) {
        option.style.backgroundColor = "green";
      }
    });
  }
}

document.querySelectorAll(".option").forEach(option => {
  option.addEventListener("click", () => {
    // Allow selecting only one option
    document.querySelectorAll(".option").forEach(opt => {
      opt.classList.remove("selected");
      opt.style.backgroundColor = ""; // Reset background color
    });
    option.classList.add("selected");
    checkAnswer(option);
  });
});

document.getElementById("nextButton").addEventListener("click", () => {
  if (!answered) {
    alert("Please select an option before moving to the next question.");
    return;
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    answered = false; // Reset the answered flag for the next question
    displayQuestion();
  } else {
    // Show the result floating window
    showResultWindow();
  }
});

function showResultWindow() {
  const resultWindow = document.getElementById("resultWindow");
  const resultText = document.getElementById("resultText");
  const nextButton = document.getElementById("nextButtonResult");
  const tryAgainButton = document.getElementById("tryAgainButton");

  resultText.textContent = `Section completed! You got ${correctAnswers} out of ${questions.length} questions correct.`;

  if (correctAnswers >= 3) {
    nextButton.style.display = "inline-block";
    tryAgainButton.style.display = "none";
  } else {
    nextButton.style.display = "none";
    tryAgainButton.style.display = "inline-block";
  }

  resultWindow.style.display = "block";
  document.getElementById("quiz").classList.add("dimmed");
}

document.getElementById("nextButtonResult").addEventListener("click", () => {
  window.location.href = "imagesindex.html";
});

document.getElementById("tryAgainButton").addEventListener("click", () => {
  window.location.href = "first_screen.html"; // or wherever the start of the quiz is
});

displayQuestion();
