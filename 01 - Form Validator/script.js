const form = document.getElementById('form');
const nameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');



// EVENT LISTENERS ----------------------------------

form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkRequired([nameInput, emailInput, password, password2]);

    checkLength(nameInput, 2, 10);
    checkLength(password, 6, 20);

    checkEmail(emailInput);

    checkMatch(password, password2)
}) 



// FUNCTIONS --------------------------------------

function checkRequired(inputArr) {
    inputArr.forEach(input => {
        if (!input.value) {
            showError(input, `${getInputName(input)} is required`);
        } else {
            showSuccess(input);
        };
    });
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getInputName(input)} must be longer than ${min} characters`)
    } else if (input.value.length > max) {
        showError(input, `${getInputName(input)} must be shorter than ${max} characters`)
    } else {
        showSuccess(input);
    }
}

function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value)) {
        showSuccess(input)
    } else {
        showError(input, `${getInputName(input)} is not valid`);
    }
}

function checkMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, `Passwords do not match`)
    } 
}


// INPUT NAME - - - - - - - - - - 

function getInputName(input) {
    return `${input.id.charAt(0).toUpperCase()}` + `${input.id.slice(1)}`
}


// ERROR & SUCCESS - - - - - - - - - -

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.classList.add('error');
    formControl.querySelector('small').textContent = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.classList.remove('error');
    formControl.classList.add('success');
}




