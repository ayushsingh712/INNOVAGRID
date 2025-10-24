const quizData = [
    { question: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], correct: 2 },
    { question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correct: 1 },
    { question: "What is the largest ocean on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], correct: 3 },
    { question: "Who painted the Mona Lisa?", options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"], correct: 1 },
    { question: "What is the smallest prime number?", options: ["0", "1", "2", "3"], correct: 2 },
    { question: "Which programming language is known as the 'language of the web'?", options: ["Python", "Java", "JavaScript", "C++"], correct: 2 },
    { question: "What is the chemical symbol for gold?", options: ["Go", "Au", "Gd", "Ag"], correct: 1 },
    { question: "How many continents are there on Earth?", options: ["5", "6", "7", "8"], correct: 2 },
    { question: "What is the speed of light approximately?", options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "200,000 km/s"], correct: 0 },
    { question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], correct: 1 }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const questionCounter = document.getElementById('question-counter');
const progressFill = document.getElementById('progress-fill');
const questionSection = document.getElementById('question-section');
const resultSection = document.getElementById('result-section');
const finalScore = document.getElementById('final-score');
const resultMessage = document.getElementById('result-message');
const restartBtn = document.getElementById('restart-btn');
const heroSection = document.getElementById('hero-section');
const quizSection = document.getElementById('quiz-section');

function startQuiz() {
    heroSection.style.display = 'none';
    quizSection.classList.add('active');
    loadQuestion();
}

function loadQuestion() {
    answered = false;
    nextBtn.style.display = 'none';
    const current = quizData[currentQuestion];
    questionText.textContent = current.question;
    questionCounter.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
    progressFill.style.width = `${((currentQuestion) / quizData.length) * 100}%`;
    optionsContainer.innerHTML = '';

    current.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option;
        optionDiv.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionDiv);
    });
}

function selectOption(selectedIndex) {
    if (answered) return;
    answered = true;
    const current = quizData[currentQuestion];
    const options = document.querySelectorAll('.option');

    options.forEach((option, index) => {
        option.classList.add('disabled');
        if (index === current.correct) option.classList.add('correct');
        if (index === selectedIndex && index !== current.correct) option.classList.add('incorrect');
    });

    if (selectedIndex === current.correct) score++;
    nextBtn.style.display = 'block';
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    questionSection.style.display = 'none';
    resultSection.style.display = 'block';
    finalScore.textContent = score;
    progressFill.style.width = '100%';
    const percentage = (score / quizData.length) * 100;
    let message = '';

    if (percentage === 100) message = '🎉 Perfect score! You\'re a genius!';
    else if (percentage >= 80) message = '🌟 Excellent work! You really know your stuff!';
    else if (percentage >= 60) message = '👍 Good job! You did well!';
    else if (percentage >= 40) message = '📚 Not bad! Keep learning!';
    else message = '💪 Don\'t give up! Practice makes perfect!';

    resultMessage.textContent = message;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;
    questionSection.style.display = 'block';
    resultSection.style.display = 'none';
    loadQuestion();
}

nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);
