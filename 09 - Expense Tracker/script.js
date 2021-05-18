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

    const total = amounts.reduce((acc, item) => acc + item);
    const expense = amounts.filter(number => number < 0).reduce((acc, item) => acc + item) * -1;
    const income = amounts.filter(number => number > 0).reduce((acc,item) => acc + item);

    console.log(expense);

    balance.innerText = `$${total.toFixed(2)}`;
    money_plus.innerText = `+$${income.toFixed(2)}`;
    money_minus.innerText = `-$${expense.toFixed(2)}`;
}

// init app
function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();