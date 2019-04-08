let buttonSubmitForm = document.getElementById('submit-button'),
    inputIdName = document.getElementById('name'),
    inputIdEmail = document.getElementById('email'),
    inputIdDob = document.getElementById('dob'),
    inputIdGender = document.getElementById('gender'),
    inputIdMarried = document.getElementById('married'),
    resultElement = document.getElementById('result');

buttonSubmitForm.addEventListener('click', validationForm, false);

function validationForm() {
    if (!validationInputIdName()) {
        inputIdName.nextElementSibling.classList.add('visible');
        inputIdName.classList.add('invalid');
    } else {
        inputIdName.nextElementSibling.classList.remove('visible');
        inputIdName.classList.remove('invalid');
    }
    
    if (!validationInputIdEmail()) {
        inputIdEmail.nextElementSibling.classList.add('visible');
        inputIdEmail.classList.add('invalid');
    } else {
        inputIdEmail.nextElementSibling.classList.remove('visible');
        inputIdEmail.classList.remove('invalid');
    }
    
    if (!validationInputIdDob()) {
        inputIdDob.nextElementSibling.classList.add('visible');
        inputIdDob.classList.add('invalid');
    } else {
        inputIdDob.nextElementSibling.classList.remove('visible');
        inputIdDob.classList.remove('invalid');
    }
    
    if (validationInputIdName() && validationInputIdEmail() && validationInputIdDob()) {
        outputFormInputValue();
        
        inputIdName.value = '';
        inputIdEmail.value = '';
        inputIdDob.value = '';
    }
}

function validationInputIdName() {
    return /^[A-Z]{1}[a-z]{1,9}$/.test(inputIdName.value);
}

function validationInputIdEmail() {
    return /^\w+@+\w{2,}.\w{2,}$/.test(inputIdEmail.value);
}

function validationInputIdDob() {
    let dateOfInput = new Date(inputIdDob.value),
        currentDate = new Date();
    
    return dateOfInput.getFullYear() >= currentDate.getFullYear() - 100;
}

function outputFormInputValue() {
    let stringResult = '';
    
    stringResult = stringResult + 'Name: ' + inputIdName.value + '\n';
    stringResult = stringResult + 'Email: ' + inputIdEmail.value + '\n';
    stringResult = stringResult + 'Date of birth: ' + inputIdDob.value + '\n';
    stringResult = stringResult + 'Gender: ' + inputIdGender.value + '\n';
    stringResult = stringResult + 'Married: ' + inputIdMarried.checked + '\n';
    
    resultElement.innerText = stringResult;
}