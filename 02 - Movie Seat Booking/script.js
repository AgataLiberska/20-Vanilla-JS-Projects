const container = document.querySelector('.container');
// seats which are not in the showcase and are not occupied
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

// ticket price to calculate the total: plus sign makes it a number
let ticketPrice = +movieSelect.value;

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.selected');
    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}




// ==== EVENT LISTENERS =========================================

// event listener on the container makes the code more performant
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
})

// to ensure that the price of tickets updates when different movie is selected
movieSelect.addEventListener('change', e => {
    ticketPrice = e.target.value;
    updateSelectedCount();
})




// SAVE DATA TO LOCAL STORAGE +======================================

//When we select seats, they are a nodelist and all elements in that nodelist are basically identical? it's the divs with a class of seat and selected. Instead, we will need to have an array of indexes.
//We need to copy the nodelist into an array, then map through that array and return a new array of indexes.

