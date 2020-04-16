const form = document.getElementById('form')
const email = document.getElementById('email')
const username = document.getElementById('username')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')

//show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}
function showSuccess(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success'
}

//check email 
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    }
    else {
        showError(input, "Email is not valid")
    }
}

//check matched passwords
function checkMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, "Passwords do not match")
    }
}

//check required 
function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${(getFieldName(input))} is required`)
        }
        else {
            showSuccess(input)
            console.log(input.value)
        }
    })
}

//check input length 
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${(getFieldName(input))} must be at least ${min}`)
    }
    else if (input.value.length > max) {
        showError(input, `${(getFieldName(input))} must be less than ${max}`)
    }
    else {
        showSuccess(input)
    }
}

// get fieldname 
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Event listeners
form.addEventListener('submit', function (e) {
    e.preventDefault();
    checkRequired([username, password, password2, email])
    checkLength(username, 3, 15)
    checkLength(password, 6, 25)
    checkEmail(email)
    checkMatch(password, password2)
})