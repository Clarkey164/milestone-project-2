// Global Variables

const gameGrid = document.getElementById("game-grid");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;
let attempts = 0;
let level = 1;

//Level 1 Cards (6 pairs)
const cardNamesLevel1 = ['apple', 'banana', 'cherry', 'grape', 'lemon', 'orange'];

//Level 2 Cards (9 pairs)
const cardNamesLevel2 = ['apple', 'banana', 'cherry', 'grape', 'lemon', 'orange', 'pear', 'peach', 'strawberry'];

// Level 3 Cards (12 pairs) 
const cardNamesLevel3 = ['apple', 'banana', 'cherry', 'grape', 'lemon', 'orange', 'pear', 'peach', 'strawberry', 'watermelon', 'kiwi', 'pineapple'];


// Card Data
function shuffleCards() {
    let currentIndex = cards.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }
}

// Generate Cards
function generateCards(cardNamesLevel1) {
    cards = [...cardNamesLevel1, ...cardNamesLevel1];  
    shuffleCards();
    cards.forEach(name => {
        const card = document.createElement("div");
        card.classList.add("card",);
        card.dataset.name = name;
        card.innerHTML = `
            <div class="front">
                <img src="assets/images/${name}.png" alt="${name}" class="front-image">
            </div>
            <div class="back">
                <img src="assets/images/pattern_waves.png" alt="Card Back" class="card back">
            </div>
        `;
        card.addEventListener("click", flipCard);
        gameGrid.appendChild(card);
    });

    document.getElementById("score").innerText = "Score: " + score + "  " + "Attempts: " + attempts;
    document.getElementById("level").innerText = "Level: " + level;
}


// Select and Flip Cards
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return; 

    this.classList.add("flipped"); 
    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    // Count attempt (because 2 cards are flipped)
    attempts++;
    document.getElementById("score").innerText = "Score: " + score + "  " + "Attempts: " + attempts;

    checkForMatch();
}

// Check for Match
function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    if (isMatch) {
        score++;
        document.getElementById("score").innerText = "Score: " + score + "  " + "Attempts: " + attempts;
        disableCards();
        levelTwo();
        levelThree();
        gameComplete();
    } else {
        unflipCards();
    }
} 

// Disable Matched Cards
function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
}

// Unflip Cards
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetBoard();
    }, 1000);
}

// Reset Board
function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

// Restart Game
function restartGame() {
    gameGrid.innerHTML = "";
    score = 0;
    attempts = 0;
    level = 1;
    document.getElementById("score").innerText = "Score: " + score + "  " + "Attempts: " + attempts;
    document.getElementById("level").innerText = "Level: " + level;
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    resetBoard();
    generateCards(cardNamesLevel1); 
    shuffleCards();
}

// Bug Present, Level 2 not working as intended - REFERENCE IN README
// Level Up Function
function levelTwo() {

    if (score === 6 && level === 1) {
        alert("Congratulations! You've completed Level 1. Get ready for Level 2!");
        
        // Reset game state for Level 2
        level = 2;
        document.getElementById("score").innerText = "Score: " + score + "  " + "Attempts: " + attempts;
        //document.getElementById("level").innerText = "Level: 2";

        cards = [...cardNamesLevel2, ...cardNamesLevel2];  
        gameGrid.innerHTML = ""; // Clear existing cards
        shuffleCards();
        generateCards(cardNamesLevel2);
    }
}

//Level 3 Function
function levelThree() {

    if (score === 15 && level === 2) {
        alert("Congratulations! You've completed Level 2. Get ready for Level 3!");
        document.getElementById("level").innerText = "Level: 3";

        // Reset game state for Level 3
        level = 3;
        document.getElementById("score").innerText = "Score: " + score + "  " + "Attempts: " + attempts;
        //document.getElementById("level").innerText = "Level: 3";

        cards = [...cardNamesLevel3, ...cardNamesLevel3];  
        gameGrid.innerHTML = ""; // Clear existing cards
        shuffleCards();
        generateCards(cardNamesLevel3);

        // Mark the grid as Level 3 for CSS and adjustments
        gameGrid.classList.add("level-3");

        // Adjust the grid to fit viewport
        adjustLevel3Grid();
    }
}

// Adjust Level 3 Grid based on viewport width
function adjustLevel3Grid() {
    const viewportWidth = window.innerWidth;
    if (level === 3) {
        if (viewportWidth > 800) {
            gameGrid.style.gridTemplateColumns = "repeat(8, 1fr)";
        }
    }
}

function gameComplete() {
    if (score === 27 && level === 3) {
        // Remove cards from the grid
        gameGrid.innerHTML = "";

        document.createElement("div");
        const message = document.createElement("div");
        message.classList.add("message");
        message.innerHTML = `
            <h2>Congratulations! You've completed all levels!</h2>
            <p>Your final score is ${score} with ${attempts} attempts. </p>
            <p>Total Score of ${(score + attempts)}!</p>
            <p>Click the restart button to play again.</p>
        `;
        
        // Append the message to the game grid
        gameGrid.appendChild(message);
    }
}

// Hide Start Button and Instructions on Click
function hideStartButton() {
    addEventListener("click", function() {
        document.getElementById("start-button").style.display = "none";
    });
}

function hideInstructions() {
    addEventListener("click", function() {
        document.getElementById("instructions-section").style.display = "none";
    });
}

// Hide Reset button before game starts
function showResetButton() {
    addEventListener("click", function() {
        document.getElementById("reset-button").style.display = "block";
    });
}