const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//     { id: 1, text: 'Flower', amount: -20 },
//     { id: 2, text: 'Salary', amount: 300 },
//     { id: 3, text: 'Book', amount: -10 },
//     { id: 4, text: 'Camera', amount: 150 },
//     { id: 5, text: 'Briefcase', amount: 120 }
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

//Add transaction
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and amount')
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };

        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateSum();

        updateLocalStorage();

        text.value = "";
        amount.value = "";
    }
}

//Generate random id 
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

//Add transactions to DOM list
function addTransactionDOM(transaction) {

    //Get the sign 
    const sign = transaction.amount > 0 ? "+" : "-";

    const item = document.createElement('li');

    //Add class on value 
    item.classList.add(transaction.amount > 0 ? 'plus' : 'minus');

    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `

    list.appendChild(item);
}

//Update income and expense
function updateSum() {

    let posSum = [];
    let negSum = [];
    let resPos = 0;
    let resNeg = 0;

    transactions.forEach(i => {
        if (i.amount < 0) {
            negSum.push(i.amount)
            resNeg = negSum.reduce((acc, item) => { return acc + item }, 0).toFixed(2);
        }
        else {
            posSum.push(i.amount)
            resPos = posSum.reduce((acc, item) => { return acc + item }, 0).toFixed(2);
        }
    })

    const total = ((+resPos) + (+resNeg)).toFixed(2)
    balance.innerText = `$${total}`
    moneyPlus.innerText = `$${resPos}`
    moneyMinus.innerText = `$${resNeg * -1}`
}

// Remove Transaction by id 
function removeTransaction(id) {
    transactions = transactions.filter(transaction =>
        transaction.id !== id
    )

    updateLocalStorage();

    init();
}

// Update localstorage transactions
function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions))
}


//init app 
function init() {
    list.innerHTML = '';
    transactions.forEach(
        addTransactionDOM
    );
    updateSum()
}
init();

form.addEventListener('submit', addTransaction)
