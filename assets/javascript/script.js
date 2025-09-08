// Global Variables

const gameGrid = document.getElementById("game-grid");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;

document.getElementById("score").innerText = "Score: " + score;

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
    const cardNames = ['apple', 'banana', 'cherry', 'grape', 'lemon', 'orange', 'peach', 'pear', 'stawberry',];
    cards = [...cardNames, ...cardNames];  
    shuffleCards();
    cards.forEach(name => {
        const card = document.createElement("div");
        card.classList.add("card",);
        card.dataset.name = name;
        card.innerHTML = `
            <div class="front-image"></div>
            <div class="card back"></div>
        `;
        card.addEventListener("click", flipCard);
        gameGrid.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return; // Prevent double click on the same card

    this.classList.add("flipped"); 
    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    score++;
    document.getElementById("score").innerText = "Score: " + score;
    lockBoard = true;

    checkForMatch();
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
    resetBoard();
    shuffleCards();
    score = 0;
    document.getElementById("score").innerText = "Score: " + score;
    gameGrid.innerHTML = '';
    generateCards();    
}