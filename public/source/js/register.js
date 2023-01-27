// Animation added
const loginContainer = document.querySelector('.login_main');
const loginLink = document.querySelector('.login_link');

loginLink.addEventListener('click', (e)=>{
    e.preventDefault();
    loginContainer.classList.remove('animate__zoomIn');
    loginContainer.classList.add('animate__zoomOut');
    setTimeout(()=>{
        location.href = "/";
    },500);
});

// Show message function
function showMessage(type, msg){

    if(type == 'success'){
        let messageHolder = document.querySelector('.success_message');
        messageHolder.innerHTML = msg;
        messageHolder.style.display = 'block';
    }else{
        let messageHolder = document.querySelector('.error_message');
        messageHolder.innerHTML = msg;
        messageHolder.style.display = 'block';
    }

    setTimeout(()=>{
        let error = document.querySelector('.error_message');
        let success = document.querySelector('.success_message');

        error.innerHTML = "";
        success.innerHTML = "";
        error.style.display = "none";
        success.style.display = "none";

    },5000);
}

// Reset error filed, input field border-color and hide it
function resetErrorFields(){
    // Reset error field
    let errorField = document.querySelectorAll('.error');
    if(errorField.length > 0){
        for(let i = 0; i < errorField.length; i++){
            errorField[i].innerHTML = "";
            errorField[i].style.display = 'none';
        }
    }
    let inputFields = document.querySelectorAll('input[name]');
    if(inputFields.length > 0){
        for(let i = 0; i < inputFields.length; i++){
            inputFields[i].style.borderColor = '#eee';
        }
    }
}
// Handle register form
let registerForm = document.querySelector('#registerForm');
registerForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    resetErrorFields();

    const formData = {
        name: document.querySelector('#reg_name').value,
        phone: document.querySelector('#reg_phone').value,
        email: document.querySelector('#reg_email').value,
        password: document.querySelector('#reg_password').value,
    };

    // Request to the server to save user
    await fetch('/register',{
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-type': 'application/json',
        }
    })
    .then((response)=> response.json())
    .then((result) => {
        console.log(result);
        if(result.errors){
            Object.keys(result.errors).forEach((fieldName)=>{
                let errPlaceholder = document.querySelector(`.reg_${fieldName}_error`);
                let inputField = document.querySelector(`#reg_${fieldName}`);
                errPlaceholder.innerHTML = result.errors[fieldName].msg;
                inputField.style.borderColor = 'red';
                errPlaceholder.style.display = 'block';
            });
        }else{
            registerForm.reset();
            showMessage('success', result.message)
        }
    })
});