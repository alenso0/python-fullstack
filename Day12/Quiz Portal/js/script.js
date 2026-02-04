// State Variables
let currentQuestionIndex = 0;
let userAnswers = new Array(quizData.length).fill(null); // Stores index of selected option
let markedForReview = new Array(quizData.length).fill(false);
let timerInterval;
const TOTAL_TIME_MINUTES = 30;
let timeRemaining = TOTAL_TIME_MINUTES * 60; // Seconds

// DOM Elements
const questionNumberEl = document.getElementById('question-number');
const questionTextEl = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const markBtn = document.getElementById('mark-btn');
const endTestBtn = document.getElementById('end-test-btn');
const timerEl = document.getElementById('timer');
const paletteGrid = document.getElementById('palette-grid');

// Initialization
function init() {
    renderPalette();
    loadQuestion(currentQuestionIndex);
    startTimer();
    updateNavigationButtons();
}

// Timer Logic
function startTimer() {
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            finishQuiz();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;

    timerEl.textContent =
        `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;

    // Optional: Turn red when low time
    if (timeRemaining < 300) { // last 5 mins
        timerEl.style.color = 'red';
    }
}

// Question Loading
function loadQuestion(index) {
    const data = quizData[index];
    questionNumberEl.textContent = `Question ${index + 1}`;
    questionTextEl.textContent = data.question;

    optionsContainer.innerHTML = '';
    data.options.forEach((opt, i) => {
        const div = document.createElement('div');
        div.className = `option-item ${userAnswers[index] === i ? 'selected' : ''}`;
        div.innerHTML = `
            <input type="radio" name="option" id="opt-${i}" ${userAnswers[index] === i ? 'checked' : ''}>
            <label for="opt-${i}" style="cursor: pointer; width: 100%;">${String.fromCharCode(65 + i)}. ${opt}</label>
        `;

        div.addEventListener('click', () => selectOption(index, i));
        optionsContainer.appendChild(div);
    });

    updatePalette(index);
}

function selectOption(qIndex, oIndex) {
    userAnswers[qIndex] = oIndex;

    // Visual update
    const options = optionsContainer.querySelectorAll('.option-item');
    options.forEach((opt, i) => {
        if (i === oIndex) {
            opt.classList.add('selected');
            opt.querySelector('input').checked = true;
        } else {
            opt.classList.remove('selected');
            opt.querySelector('input').checked = false;
        }
    });

    // Update palette to show answered
    updatePalette(qIndex);
}

// Navigation
function nextQuestion() {
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
        updateNavigationButtons();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
        updateNavigationButtons();
    }
}

function updateNavigationButtons() {
    prevBtn.disabled = currentQuestionIndex === 0;
    if (currentQuestionIndex === 0) prevBtn.style.opacity = 0.5;
    else prevBtn.style.opacity = 1;

    if (currentQuestionIndex === quizData.length - 1) {
        nextBtn.textContent = 'Finish';
    } else {
        nextBtn.textContent = 'Next question';
    }
}

// Mark for Review
function markForReviewHandler() {
    markedForReview[currentQuestionIndex] = !markedForReview[currentQuestionIndex];
    updatePalette(currentQuestionIndex);
}

// Palette
function renderPalette() {
    paletteGrid.innerHTML = '';
    quizData.forEach((_, i) => {
        const item = document.createElement('div');
        item.className = 'palette-item';
        item.textContent = i + 1;
        item.id = `palette-${i}`;
        item.addEventListener('click', () => {
            currentQuestionIndex = i;
            loadQuestion(currentQuestionIndex);
            updateNavigationButtons();
        });
        paletteGrid.appendChild(item);
    });
}

function updatePalette(index) {
    // Reset all actives first (optional, but cleaner if we only want current highlighted)
    // Actually we keep 'active' for current question

    // Re-render state for all palette items is safest or just update specific
    const item = document.getElementById(`palette-${index}`);

    // Classes
    item.className = 'palette-item'; // Reset
    if (index === currentQuestionIndex) item.classList.add('active'); // Highlight current
    if (userAnswers[index] !== null) item.classList.add('answered'); // Green if answered
    if (markedForReview[index]) {
        item.style.border = "2px solid #ffc107"; // Yellow border for marked
    } else {
        item.style.border = "none";
    }

    // Also update others to remove 'active' class
    quizData.forEach((_, i) => {
        const pItem = document.getElementById(`palette-${i}`);
        if (i !== currentQuestionIndex) pItem.classList.remove('active');
        else pItem.classList.add('active');
    });
}

// Submission
function finishQuiz() {
    // Calculate Score
    let score = 0;
    userAnswers.forEach((ans, i) => {
        if (ans === quizData[i].answer) {
            score++;
        }
    });

    // Redirect to Result Page
    window.location.href = `result.html?score=${score}&total=${quizData.length}`;
}

// Event Listeners
prevBtn.addEventListener('click', prevQuestion);
nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex === quizData.length - 1) {
        finishQuiz();
    } else {
        nextQuestion();
    }
});
markBtn.addEventListener('click', markForReviewHandler);
endTestBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to end the test?")) {
        finishQuiz();
    }
});

// Initialize on Load
init();
