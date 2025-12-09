// Probability experiments data
const experiments = [
    {
        title: "Rolling a Die",
        description: "You roll a standard 6-sided die (with faces numbered 1 to 6).",
        visual: ["🎲"],
        outcome: "Rolling a 7",
        correct: "impossible"
    },
    {
        title: "Flipping a Coin",
        description: "You flip a fair coin.",
        visual: ["🪙"],
        outcome: "Getting heads",
        correct: "possible"
    },
    {
        title: "Drawing from a Bag",
        description: "A bag contains 5 red marbles and 3 blue marbles. You draw one marble without looking.",
        visual: ["🔴", "🔴", "🔴", "🔴", "🔴", "🔵", "🔵", "🔵"],
        outcome: "Drawing a red marble",
        correct: "possible"
    },
    {
        title: "Spinning a Spinner",
        description: "A spinner has 4 equal sections colored red, blue, green, and yellow.",
        visual: ["🔴", "🔵", "🟢", "🟡"],
        outcome: "Landing on red, blue, green, or yellow",
        correct: "certain"
    },
    {
        title: "Rolling Two Dice",
        description: "You roll two standard 6-sided dice.",
        visual: ["🎲", "🎲"],
        outcome: "Getting a sum of 13",
        correct: "impossible"
    },
    {
        title: "Weather Forecast",
        description: "The weather forecast says there's a 30% chance of rain tomorrow.",
        visual: ["☀️", "🌧️"],
        outcome: "It raining tomorrow",
        correct: "possible"
    },
    {
        title: "Drawing a Card",
        description: "You draw one card from a standard deck of 52 playing cards.",
        visual: ["🂠"],
        outcome: "Drawing a card that is either red or black",
        correct: "certain"
    },
    {
        title: "Tossing a Paper Clip",
        description: "You toss a paper clip in the air.",
        visual: ["📎"],
        outcome: "The paper clip landing on its side",
        correct: "possible"
    },
    {
        title: "Selecting a Month",
        description: "You randomly select a month of the year.",
        visual: ["📅"],
        outcome: "Selecting a month with 32 days",
        correct: "impossible"
    },
    {
        title: "Rolling a Die",
        description: "You roll a standard 6-sided die.",
        visual: ["🎲"],
        outcome: "Rolling a number between 1 and 6",
        correct: "certain"
    }
];

// DOM elements
const startScreen = document.getElementById('start-screen');
const experimentScreen = document.getElementById('experiment-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const experimentTitle = document.getElementById('experiment-title');
const experimentDescription = document.getElementById('experiment-description');
const experimentVisual = document.getElementById('experiment-visual');
const outcomeText = document.getElementById('outcome-text');
const experimentCount = document.getElementById('experiment-count');
const scoreElement = document.getElementById('score');
const feedbackMessage = document.getElementById('feedback-message');
const optionButtons = document.querySelectorAll('.option-btn');
const correctSound = document.getElementById('correctSound');
const incorrectSound = document.getElementById('incorrectSound');

// Game state
let currentExperimentIndex = 0;
let score = 0;
let selectedAnswer = null;

// Initialize game
function initGame() {
    currentExperimentIndex = 0;
    score = 0;
    showStartScreen();
}

// Show start screen
function showStartScreen() {
    startScreen.classList.remove('hidden');
    experimentScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    resetButtons();
}

// Start the game
function startGame() {
    startScreen.classList.add('hidden');
    experimentScreen.classList.remove('hidden');
    loadExperiment();
}

// Load current experiment
function loadExperiment() {
    resetButtons();
    const current = experiments[currentExperimentIndex];
    
    experimentTitle.textContent = current.title;
    experimentDescription.textContent = current.description;
    outcomeText.textContent = current.outcome;
    experimentCount.textContent = currentExperimentIndex + 1;
    
    // Render visual
    experimentVisual.innerHTML = '';
    current.visual.forEach(item => {
        const visualItem = document.createElement('div');
        visualItem.className = 'visual-item';
        visualItem.textContent = item;
        experimentVisual.appendChild(visualItem);
    });
}

// Reset option buttons
function resetButtons() {
    optionButtons.forEach(btn => {
        btn.classList.remove('selected');
        btn.disabled = false;
    });
    selectedAnswer = null;
}

// Handle answer selection
function selectAnswer(choice) {
    if (selectedAnswer) return;
    
    selectedAnswer = choice;
    
    // Highlight selected button
    optionButtons.forEach(btn => {
        if (btn.dataset.choice === choice) {
            btn.classList.add('selected');
        }
    });
    
    // Disable all buttons
    optionButtons.forEach(btn => btn.disabled = true);
    
    // Check answer
    const current = experiments[currentExperimentIndex];
    const isCorrect = choice === current.correct;
    
    // Update score
    if (isCorrect) {
        score++;
        correctSound.currentTime = 0;
        correctSound.play().catch(e => console.log("Audio play prevented:", e));
    } else {
        incorrectSound.currentTime = 0;
        incorrectSound.play().catch(e => console.log("Audio play prevented:", e));
    }
    
    // Move to next experiment or end game
    setTimeout(() => {
        currentExperimentIndex++;
        if (currentExperimentIndex < experiments.length) {
            loadExperiment();
        } else {
            endGame();
        }
    }, 1800);
}

// End the game
function endGame() {
    experimentScreen.classList.add('hidden');
    gameOverScreen.classList.remove('hidden');
    
    // Update score
    scoreElement.textContent = score;
    
    // Provide feedback based on score
    let feedback = '';
    let feedbackClass = '';
    
    if (score >= 9) {
        feedback = "Outstanding! You've mastered probability concepts!";
        feedbackClass = 'excellent';
    } else if (score >= 7) {
        feedback = "Great work! You understand probability well!";
        feedbackClass = 'good';
    } else if (score >= 5) {
        feedback = "Good attempt! Review probability concepts to improve.";
        feedbackClass = 'practice';
    } else {
        feedback = "Keep practicing! Probability takes time to understand fully.";
        feedbackClass = 'practice';
    }
    
    feedbackMessage.textContent = feedback;
    feedbackMessage.className = `feedback ${feedbackClass}`;
}

// Event listeners
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', initGame);

optionButtons.forEach(button => {
    button.addEventListener('click', () => {
        selectAnswer(button.dataset.choice);
    });
});

// Initialize the game
initGame();