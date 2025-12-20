
const readline = require('readline');

// 1. DATA STRUCTURE: Array of Objects (Requirement)
const triviaData = [
    {
        question: "Which data type is used for True/False values?",
        options: ["String", "Boolean", "Number", "Object"],
        correct: 1, // Index of 'Boolean'
    },
    {
        question: "Which method is used to add an element to the end of an array?",
        options: [".pop()", ".shift()", ".push()", ".map()"],
        correct: 2,
    },
    {
        question: "What does 'CLI' stand for?",
        options: ["Command Line Interface", "Common Logic Integration", "Control Level Input"],
        correct: 0,
    }
];

// 2. GAME STATE: Using an Object to manage scoring and progress
const gameState = {
    score: 0,
    currentQuestionIndex: 0,
    timeLimit: 10, // Seconds per question
};

// Initialize Readline for CLI interaction
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * START FUNCTION: Initializes the game flow
 */
function startGame() {
    console.clear();
    console.log("========================================");
    console.log("   WELCOME TO THE JS TRIVIA CHALLENGE   ");
    console.log("========================================");
    console.log(`Instructions: You have ${gameState.timeLimit}s per question.`);
    console.log("Type the number of your answer and press Enter.\n");
    
    // Begin sequential viewing
    askQuestion();
}

/**
 * CORE LOGIC: Presents questions and manages the timer
 */
function askQuestion() {
    const item = triviaData[gameState.currentQuestionIndex];
    
    console.log(`Question ${gameState.currentQuestionIndex + 1} of ${triviaData.length}`);
    console.log(`> ${item.question}`);

    // ARRAY ITERATION: Use forEach to display options (Requirement)
    item.options.forEach((opt, i) => {
        console.log(`  ${i}: ${opt}`);
    });

    let timeLeft = gameState.timeLimit;
    
    // ASYNCHRONOUS TIMER: SetInterval for the countdown (Requirement)
    const timer = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 3 && timeLeft > 0) {
            process.stdout.write(`\r⚠️  Time remaining: ${timeLeft}s... `);
        }
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            console.log("\n\n❌ TIME'S UP!");
            handleNextStep();
        }
    }, 1000);

    // USER INTERACTION: Capturing the answer
    rl.question("\nYour answer: ", (input) => {
        clearInterval(timer); // Stop the timer once user answers
        validateAnswer(input, item.correct);
    });
}

/**
 * VALIDATION: Provides immediate feedback
 */
function validateAnswer(input, correctIndex) {
    const userAnswer = parseInt(input.trim());

    if (userAnswer === correctIndex) {
        console.log("\n✅ CORRECT!");
        gameState.score++;
    } else {
        const correctText = triviaData[gameState.currentQuestionIndex].options[correctIndex];
        console.log(`\n❌ INCORRECT. The correct answer was: ${correctText}`);
    }
    
    handleNextStep();
}

/**
 * FLOW CONTROL: Determines if the game continues or ends
 */
function handleNextStep() {
    gameState.currentQuestionIndex++;
    
    if (gameState.currentQuestionIndex < triviaData.length) {
        // Short pause for user to read feedback before next question
        setTimeout(() => {
            console.log("\n----------------------------------------\n");
            askQuestion();
        }, 1500);
    } else {
        endGame();
    }
}

/**
 * END GAME: Displays final results using array methods
 */
function endGame() {
    console.log("\n========================================");
    console.log("               GAME OVER!               ");
    console.log("========================================");
    
    // ARRAY ITERATION: Using reduce to calculate total questions (Requirement)
    const totalQuestions = triviaData.reduce((acc) => acc + 1, 0);
    
    const percentage = Math.round((gameState.score / totalQuestions) * 100);
    
    console.log(`Final Score: ${gameState.score} / ${totalQuestions} (${percentage}%)`);
    
    if (percentage >= 70) {
        console.log("Great job! You're a JS pro. 🏆");
    } else {
        console.log("Keep practicing! You'll get there. 📚");
    }

    rl.close();
}

// Start the game execution
startGame();