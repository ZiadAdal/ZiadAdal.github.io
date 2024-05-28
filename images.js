const questions = [
    {
        image: "US.png",
        options: ["RED BULL RING", "HUNGARORING", "Circuit GILLED VILLENEUVE", "Circuit of the AMERICAS"],
        answer: "Circuit of the AMERICAS"
    },
    {
        image: "Silverstone.png",
        options: ["Circuit de Catalunya", "Circuit Silverstone", "Circuit Zandvoort", "Baku city Circuit"],
        answer:"Circuit Silverstone"
    },
    {
        image: "jeddah.png",
        options: ["LAS VEGAS street Circuit", "LOSAIL international Circuit", "JEDDAH street Circuit", "BAHRAIN international Circuit"],
        answer:"JEDDAH street Circuit"
    },
    {
        image: "interlagos.png",
        options: ["YAS MARINA Circuit", "Circuit De MONACO", "SHANGHAI international Circuit", "Interlagos Circuit"],
        answer:"Interlagos Circuit"
    }
];

let currentQuestion = 0;
let answered = false;
let correctAnswers = 0;

function displayQuestion() {
    const progressText = document.getElementById("progress");
    const imageContainer = document.getElementById("imageContainer");
    const optionA = document.getElementById("optionA");
    const optionB = document.getElementById("optionB");
    const optionC = document.getElementById("optionC");
    const optionD = document.getElementById("optionD");

    if (currentQuestion < questions.length) {
        progressText.textContent = `Question ${currentQuestion + 1} of ${questions.length} | Correct Answers: ${correctAnswers}`;
        imageContainer.innerHTML = `<img src="${questions[currentQuestion].image}" alt="Image ${currentQuestion + 1}">`;
        optionA.textContent = questions[currentQuestion].options[0];
        optionB.textContent = questions[currentQuestion].options[1];
        optionC.textContent = questions[currentQuestion].options[2];
        optionD.textContent = questions[currentQuestion].options[3];

        document.querySelectorAll(".option").forEach(option => {
            option.style.backgroundColor = "";
        });
    }
}

function checkAnswer(selectedOption) {
    if (answered) return;

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
        document.querySelectorAll(".option").forEach(opt => {
            opt.classList.remove("selected");
            opt.style.backgroundColor = "";
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
    window.location.href = "third_section.html";
  });
  
  document.getElementById("tryAgainButton").addEventListener("click", () => {
    window.location.href = "first_screen.html"; // or wherever the start of the quiz is
  });

displayQuestion();
