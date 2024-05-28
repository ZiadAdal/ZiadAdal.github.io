const questions = [
    {
      question: "In which year did Lewis Hamilton win his first Formula 1 World Championship?",
      options: ["2008", "2009", "2011", "2007"],
      answer: "2008"
    },
    {
      question: "Which circuit has Lewis Hamilton won the most races at?",
      options: ["Silverstone Circuit", "Circuit de Spa-Francorchamps", "Circuit de Monaco", "Hungaroring"],
      answer: "Hungaroring"
    },
    {
      question: "In which year did Lewis Hamilton break Michael Schumacher's record for the most pole positions in Formula 1 history?",
      options: ["2019", "2020", "2018", "2017"],
      answer: "2017"
    },
    {
      question: "Lewis Hamilton has won the most races in Formula 1 history at which Grand Prix?",
      options: ["British Grand Prix", "Portuguese Grand Prix", "Hungarian Grand Prix", "Canadian Grand Prix"],
      answer: " Portuguese Grand Prix"
    },
    {
      question: "Which driver has Lewis Hamilton beaten the most times in Formula 1 history?",
      options: ["Sebastian Vettel", "Fernando Alonso", "Nico Rosberg", "Kimi Raikkonen"],
      answer: "Fernando Alonso"
    },
    {
        question: "Lewis Hamilton has won the most races at which circuit outside of Europe?",
        options: ["Circuit of the Americas", "Sepang International Circuit", "Suzuka Circuit", "Circuit Gilles Villeneuve"],
        answer: "Circuit of the Americas"
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
  
    resultText.textContent = `Section completed! You got ${correctAnswers} out of ${questions.length} questions correct, Now lets move to the last section.`;
  
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
    window.location.href = "yes_no_questions.html";
  });
  
  document.getElementById("tryAgainButton").addEventListener("click", () => {
    window.location.href = "first_screen.html"; // or wherever the start of the quiz is
  });
  
  displayQuestion();
  