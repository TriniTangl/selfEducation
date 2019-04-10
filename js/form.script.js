let submitFormButton = document.getElementById('submit-button'),
    nameField = document.getElementById('name'),
    emailField = document.getElementById('email'),
    dobField = document.getElementById('dob'),
    genderField = document.getElementById('gender'),
    marriedField = document.getElementById('married'),
    resultBlock = document.getElementById('result');

submitFormButton.addEventListener('click', validateForm, false);

function validateForm() {
    let nameIsValid = /^[\D]{1,10}$/.test(nameField.value),
        emailIsValid = /^\w+@+\w{2,}.{1}\w{2,}$/.test(emailField.value),
        dateIsValid = new Date(dobField.value).getFullYear() >= new Date().getFullYear() - 100;
    
    nameIsValid ? disableErrorClass(nameField) : enableErrorClass(nameField);
    emailIsValid ? disableErrorClass(emailField) : enableErrorClass(emailField);
    dateIsValid ? disableErrorClass(dobField) : enableErrorClass(dobField);
    
    if (nameIsValid && emailIsValid && dateIsValid) {
        outputFormInputValue();
        
        clearInputField(nameField);
        clearInputField(emailField);
        clearInputField(dobField);
    } else {
        resultBlock.innerHTML = '';
    }
}

function outputFormInputValue() {
    resultBlock.innerText =
        `Name: ${nameField.value}\n` +
        `Email: ${emailField.value}\n` +
        `Date of birth: ${dobField.value}\n` +
        `Gender: ${genderField.value}\n` +
        `Married: ${marriedField.checked}`;
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
