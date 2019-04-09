let submitFormButton = document.getElementById('submit-button'),
    nameField = document.getElementById('name'),
    emailField = document.getElementById('email'),
    dobField = document.getElementById('dob'),
    genderField = document.getElementById('gender'),
    marriedField = document.getElementById('married'),
    resultBlock = document.getElementById('result');

submitFormButton.addEventListener('click', validateForm, false);

function validateForm() {
    validateNameField() ? disableErrorClass(nameField) : enableErrorClass(nameField);
    validateEmailField() ? disableErrorClass(emailField) : enableErrorClass(emailField);
    validateDobField() ? disableErrorClass(dobField) : enableErrorClass(dobField);
    
    if (validateNameField() && validateEmailField() && validateDobField()) {
        outputFormInputValue();
        
        clearInputField(nameField);
        clearInputField(emailField);
        clearInputField(dobField);
    } else {
        resultBlock.innerHTML = '';
    }
}

function validateNameField() {
    return /^[A-Z]{1}[a-z]{1,9}$/.test(nameField.value);
}

function validateEmailField() {
    return /^\w+@+\w{2,}.{1}\w{2,}$/.test(emailField.value);
}

function validateDobField() {
    let inputDate = new Date(dobField.value),
        currentDate = new Date();
    
    return inputDate.getFullYear() >= currentDate.getFullYear() - 100;
}

function outputFormInputValue() {
    let stringResult = '';
    
    stringResult = stringResult + 'Name: ' + nameField.value + '\n';
    stringResult = stringResult + 'Email: ' + emailField.value + '\n';
    stringResult = stringResult + 'Date of birth: ' + dobField.value + '\n';
    stringResult = stringResult + 'Gender: ' + genderField.value + '\n';
    stringResult = stringResult + 'Married: ' + marriedField.checked + '\n';
    
    resultBlock.innerText = stringResult;
}

function enableErrorClass(element) {
    element.nextElementSibling.classList.add('visible');
    element.classList.add('invalid');
}

function disableErrorClass(element) {
    element.nextElementSibling.classList.remove('visible');
    element.classList.remove('invalid');
}

function clearInputField(field) {
    field.value = '';
}
