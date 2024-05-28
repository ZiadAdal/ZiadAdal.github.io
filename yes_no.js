const yesNoQuestions = [
    {
        question: "When I was really young, I busted my nose when I was racing. The first thing my dad asked me was: ‘Are you OK?’ I said, ‘Can you fix the car for tomorrow?’ And I won the race the next day.",
        answer: "yes"
    },
    {
        question: "I dont aspire to be like other drivers  I aspire to be unique in my own way.",
        answer: "yes"
    },
    {
        question: "What people tend to forget is the journey that I had getting to Formula One. There were plenty of years where I had to learn about losing and having bad races.",
        answer: "yes"
    },
    {
        question: "As a driver, your target is always to be with the most competitive team possible.",
        answer: "no"
    }
];

let currentQuestion = 0;
let answered = false;
let correctAnswers = 0;

function displayQuestion() {
    const progressText = document.getElementById("progress");
    const questionText = document.getElementById("questionText");

    const question = yesNoQuestions[currentQuestion];
    progressText.textContent = `Question ${currentQuestion + 1} of ${yesNoQuestions.length} | Correct Answers: ${correctAnswers}`;
    questionText.textContent = question.question;

    document.querySelectorAll(".option").forEach(option => {
        option.style.backgroundColor = "";
    });
}

function checkAnswer(selectedOption) {
    if (answered) return;

    answered = true;

    const selectedAnswer = selectedOption.textContent.toLowerCase();
    const correctAnswer = yesNoQuestions[currentQuestion].answer.toLowerCase();

    if (selectedAnswer === correctAnswer) {
        selectedOption.style.backgroundColor = "green";
        correctAnswers++;
    } else {
        selectedOption.style.backgroundColor = "red";
        document.querySelectorAll(".option").forEach(option => {
            if (option.textContent.toLowerCase() === correctAnswer) {
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
    answered = false;

    if (currentQuestion < yesNoQuestions.length) {
        displayQuestion();
    } else {
        showResultWindow();
    }
});

function showResultWindow() {
    const resultWindow = document.getElementById("resultWindow");
    const resultText = document.getElementById("resultText");
    const restartButton = document.getElementById("restartButton");

    if (correctAnswers >= 2) {
        window.location.href = "last.html"; // Modify this to the next section URL
    } else {
        resultText.innerHTML = `Quiz completed!<br>You got ${correctAnswers} out of ${yesNoQuestions.length} questions correct.`;
        resultWindow.style.display = "block";
        document.getElementById("quiz").classList.add("dimmed");
    }
}

document.getElementById("restartButton").addEventListener("click", () => {
    window.location.href = "first_screen.html"; // Modify this to the start of the quiz URL
});

displayQuestion();
