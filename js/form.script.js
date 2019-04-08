let buttonSubmitForm = document.getElementById('submit-button'),
    inputIdName = document.getElementById('name'),
    inputIdEmail = document.getElementById('email'),
    inputIdDob = document.getElementById('dob'),
    inputIdGender = document.getElementById('gender'),
    inputIdMarried = document.getElementById('married'),
    resultElement = document.getElementById('result');

buttonSubmitForm.addEventListener('click', validateForm, false);

function validateForm() {
    validateInputIdName() ? disableStyleError(inputIdName) : enableStyleError(inputIdName);
    validateInputIdEmail() ? disableStyleError(inputIdEmail) : enableStyleError(inputIdEmail);
    validateInputIdDob() ? disableStyleError(inputIdDob) : enableStyleError(inputIdDob);
    
    if (validateInputIdName() && validateInputIdEmail() && validateInputIdDob()) {
        outputFormInputValue();
        
        clearInputField(inputIdName);
        clearInputField(inputIdEmail);
        clearInputField(inputIdDob);
    } else {
        resultElement.innerHTML = '';
    }
}

function validateInputIdName() {
    return /^[A-Z]{1}[a-z]{1,9}$/.test(inputIdName.value);
}

function validateInputIdEmail() {
    return /^\w+@+\w{2,}.\w{2,}$/.test(inputIdEmail.value);
}

function validateInputIdDob() {
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

function enableStyleError(element) {
    element.nextElementSibling.classList.add('visible');
    element.classList.add('invalid');
}

function disableStyleError(element) {
    element.nextElementSibling.classList.remove('visible');
    element.classList.remove('invalid');
}

function clearInputField(field) {
    field.value = '';
}
