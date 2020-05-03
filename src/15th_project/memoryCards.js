const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

//Keep track of current card
let currentActiveCard = 0;

//Store the Dom cards
const cardsEl = [];

// Store card data 

const cardsData = getCardsData();

// Create all cards 
function createCards() {
    cardsData.forEach((data, index) => createCard(data, index));
};

//Create the card element into the DOM
function createCard(data, index) {
    const card = document.createElement('div');
    card.classList.add('card');

    if (index === 0) {
        card.classList.add('active');
    }

    card.innerHTML = `
    <div class="inner-card">
        <div class="inner-card-front">
            <p>
                ${data.question}
            </p>
        </div>
        <div class="inner-card-back">
            <p>${data.answer}</p>
        </div>
    </div>
    </div>
    `;

    card.addEventListener('click', () => card.classList.toggle('show-answer'));

    // Add to DOM cards
    cardsEl.push(card);

    cardsContainer.appendChild(card);

    updateCurrentText();
    console.log(currentActiveCard);
}

//Show number of cards
function updateCurrentText() {
    currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`
}

// Get Cards from localStorage

function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

// Store cards in the localStorage
function setCardsData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();
}

createCards();

//Event Listeners 
nextBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card left';
    currentActiveCard++;

    if (currentActiveCard > cardsEl.length - 1) {
        currentActiveCard = cardsEl.length - 1;
    }

    cardsEl[currentActiveCard].className = 'card active';

    updateCurrentText();

})

prevBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card right';
    currentActiveCard--;

    if (currentActiveCard < 0) {
        currentActiveCard = 0;
    }

    cardsEl[currentActiveCard].className = 'card active';

    updateCurrentText();

});

showBtn.addEventListener('click', () => {
    addContainer.classList.add('show');
})
hideBtn.addEventListener('click', () => {
    addContainer.classList.remove('show');
});

addCardBtn.addEventListener('click', () => {
    const question = questionEl.value;
    const answer = answerEl.value;

    if (question.trim() && answer.trim()) {
        const newCard = { question, answer };


        createCard(newCard);

        questionEl.value = '';
        answerEl.value = '';

        addContainer.classList.remove('show');

        cardsData.push(newCard);
        setCardsData(cardsData);
    }

});

clearBtn.addEventListener('click', () => {
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.location.reload();
})