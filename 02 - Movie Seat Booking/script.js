// check notes below to read about local storage

const container = document.querySelector('.container');
// seats which are not in the showcase and are not occupied
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

// ticket price to calculate the total: plus sign makes it a number
let ticketPrice = +movieSelect.value;


// === FUNCTIONS === === === === === === === === === === === === ===

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.selected');

    // map the selected seats array onto seats array and find their indeces
    const seatIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    
    // localStorage saves strings, so we need to parse the array to a string
    localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));


    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// set selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    //localStorage.setItem('selectedMoviePrice', moviePrice);
}


// get data from local storage and populate UI

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// === EVENT LISTENERS === === === === === === === === === === === 

// event listener on the container makes the code more performant
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
})

// to ensure that the price of tickets updates when different movie is selected
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

// initial count and total
updateSelectedCount();




// === === NOTES ON LOCAL STORAGE === === === === === === === 

// Things that need to be saved in the local storage: seats selected 
//(the indexes of those seats in the seats array that we selected at the top), 
//as well as the movie chosen and the price of a ticket

// To get the seats selected, map seatsSelected array over the seats array - 
//use the sprea operator to copy the node list into an array

// To save something to local storage, use localStorage.setItem and pass a key-value pair. 
// This method takes strings as arguments, so we need to parse the array to a string with JSON.stringify()

// Movie selection should be saved on selection change 
//(so in the event listener for the select form control). 
// Use e.target.selectedIndex() to get the movie which was selected

// To populate UI with data from local storage, use localStorage.getItem. 
//To get item, use the key you set. Since we parsed our selectedSeats array to a string, 
// we need to parse it back when we retrieve it from localStorage.

// Then we need to check that selectedSeats is not null and that it's not an empty array.
// Loop through all seats - we're checking if the index of each seat appears in the selectedSeats array. 
// If it does, we add 'selected' class to it

// Then get the selectedMovieIndex from localStorage using the same method, 
//and if it's not null, set the selectedIndex to that