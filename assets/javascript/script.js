// Global Variables

const gameGrid = document.getElementById("game-grid");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;
let attempts = 0;

//document.getElementById("score").innerText = "Score: " + score + "  " + "Attempts: " + attempts;
//document.getElementById("level").innerText = "Level: 1";

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

function generateCards() {
    const cardNames = ['apple', 'banana', 'cherry', 'grape', 'lemon', 'orange',];
    cards = [...cardNames, ...cardNames];  
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
    document.getElementById("level").innerText = "Level: 1";
}

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
    document.getElementById("score").innerText =
        "Score: " + score + "  " + "Attempts: " + attempts;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    if (isMatch) {
        score++;
        document.getElementById("score").innerText =
            "Score: " + score + "  " + "Attempts: " + attempts;
        disableCards();
        levelUp();
    } else {
        unflipCards();
    }
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetBoard();
    }, 1000);
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function restartGame() {
    gameGrid.innerHTML = "";
    score = 0;
    attempts = 0;
    document.getElementById("score").innerText = "Score: " + score + "  " + "Attempts: " + attempts;
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    resetBoard();
    generateCards(); 
    shuffleCards();
}

// Level Up
function levelUp() {
    if (score === 6) { // 6 pairs = Level 1 complete
        alert("Congratulations! You've completed Level 1. Get ready for Level 2!");
        document.getElementById("level").innerText = "Level: 2";

        // reset score for new challenge
        score = 0;
        attempts = 0;

        document.getElementById("score").innerText =
            "Score: " + score + "  " + "Attempts: " + attempts;

        const cardNamesLevel2 = [
            'apple', 'banana', 'cherry', 'grape', 'lemon',
            'orange', 'pear', 'peach', 'strawberry'
        ];
        generateCards(cardNamesLevel2);
    }
}

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