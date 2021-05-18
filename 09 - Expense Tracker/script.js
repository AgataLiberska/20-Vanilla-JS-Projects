const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const dummyTransactions = [
    { id: 1, text: 'Flower', amount: -20 },
    { id: 2, text: 'Salary', amount: 300 },
    { id: 3, text: 'Book', amount: -10 },
    { id: 4, text: 'Camera', amount: 150 }
];

let transactions = dummyTransactions;

function addTransaction(e) {
    e.preventDefault();

    if (!text.value.trim() || !amount.value.trim()) {
        alert('Please fill out the form');
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        }

        transactions.push(transaction);

        addTransactionDOM(transaction);
        updateValues();

        text.value = '';
        amount.value = '';
    }
}

// generate random ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

//Add transactions to DOM list
function addTransactionDOM(transaction) {
    // get sign
    const sign = transaction.amount > 0 ? '+' : '-';

    const item = document.createElement('li');
    
    // add class based on value 
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        ${transaction.text} <span>${sign}$${Math.abs(transaction.amount)}</span><button class="delete-btn">X</button>
    `;

    list.appendChild(item);
}

// Update the balance, income and expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => acc += item).toFixed(2);
    const expense = (amounts.filter(number => number < 0).reduce((acc, item) => acc += item) * -1).toFixed(2);
    const income = amounts.filter(number => number > 0).reduce((acc,item) => acc += item).toFixed(2);

    console.log(total);

    balance.innerText = `$${total}`;
    money_plus.innerText = `+$${income}`;
    money_minus.innerText = `-$${expense}`;
}

// init app
function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

form.addEventListener('submit', addTransaction);