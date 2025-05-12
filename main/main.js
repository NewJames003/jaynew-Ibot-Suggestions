const formBtn = document.getElementById('form-btn');
const form = document.getElementById('form');
const voteBtn = document.querySelector('.vote');
const overlay = document.getElementById('overlay');
const signInWith = document.querySelector('.sign-in-with');
const closeSocials = document.querySelector('.close-socials');
const petitionLink = document.querySelector('.petition-link');
const donateLink  = document.querySelector('.donate-link');


const signInFunction = (object) =>{
    signInWith.style.display = 'block'
    overlay.style.display = 'block'
}
formBtn.addEventListener('click', function() {
    form.classList.remove('form-display');
    overlay.style.display = 'none'; 
});

voteBtn.addEventListener('click', function() {
   signInFunction()
});

petitionLink.addEventListener('click',() =>{
  signInFunction()
})

donateLink.addEventListener('click', () =>{
    signInFunction()
})

closeSocials.addEventListener('click',() =>{
    signInWith.style.display = 'none'
    overlay.style.display = 'none'
})


