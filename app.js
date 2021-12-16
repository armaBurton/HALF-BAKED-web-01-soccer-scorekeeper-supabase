import { 
    redirectToGames, 
    signInUser, 
    signUpUser,
} from './fetch-utils.js';

const signInForm = document.getElementById('sign-in');
const signInEmail = document.getElementById('sign-in-email');
const signInPassword = document.getElementById('sign-in-password');

const signUpForm = document.getElementById('sign-up');
const signUpEmail = document.getElementById('sign-up-email');
const signUpPassword = document.getElementById('sign-up-password');

// if user currently logged in, redirect
redirectToGames();

signUpForm.addEventListener('submit', async(event)=>{
    event.preventDefault();
    const user = await signUpUser(signUpEmail.value, signUpPassword.value);

    if (user){
        redirectToGames();
    } else {
        console.error(user);
        const data = new FormData(signUpForm);
        const email = data.get(`email`);
        const password = data.get(`password`)

        // console.log(email, password);
    }
});

signInForm.addEventListener('submit', async(event)=>{
    event.preventDefault();
    const user = await signInUser(signInEmail.value, signInPassword.value);
    
    if (user){
        redirectToGames();
    } else {
        console.error(user);
    }
});