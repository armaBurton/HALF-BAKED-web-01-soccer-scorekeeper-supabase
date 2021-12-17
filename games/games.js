import { 
    logout, 
    checkAuth,
    getGames,
    createGame,
} from '../fetch-utils.js';
import { renderGame } from '../render-utils.js';

const currentGameEl = document.getElementById('current-game-container');
const pastGamesEl = document.getElementById('past-games-container');
const logoutButton = document.getElementById('logout');

const nameForm = document.getElementById('name-form');
const teamOneAddButton = document.getElementById('team-one-add-button');
const teamTwoAddButton = document.getElementById('team-two-add-button');
const teamOneSubtractButton = document.getElementById('team-one-subtract-button');
const teamTwoSubtractButton = document.getElementById('team-two-subtract-button');
const finishGameButton = document.getElementById('finish-game-button');
const teamOneLabel = document.getElementById('team-one-name');
const teamTwoLabel = document.getElementById('team-two-name');

checkAuth();

let name1 = '';
let name2 = '';
let score1 = 0;
let score2 = 0;
const currentGame = {
    name1, 
    name2,
    score1,
    score2
};

nameForm.addEventListener('submit', (e) => {
    // don't forget to prevent the default form behavior!
    e.preventDefault();
    // get the name data from the form
    const data = new FormData(nameForm);
    currentGame.name1 = data.get(`team-one`);
    currentGame.name2 = data.get(`team-two`);
    // set the state to this data from the form
    // reset the form values
    nameForm.reset();
    // display updated data in the current game div
    displayCurrentGameEl(currentGame);

});


teamOneAddButton.addEventListener('click', () => {
    // increment the current state for team one's score
    currentGame.score1++;
    // display updated data in the current game div
    displayCurrentGameEl(currentGame);

});

teamTwoAddButton.addEventListener('click', () => {
    // increment the current state for team two's score
    currentGame.score2++;
    // display updated data in the current game div
    displayCurrentGameEl(currentGame);
});

teamOneSubtractButton.addEventListener('click', () => {
    // decrement the current state for team one's score
    currentGame.score1--;
    // display updated data in the current game div
    displayCurrentGameEl(currentGame);
});

teamTwoSubtractButton.addEventListener('click', () => {
    // decrement the current state for team two's score
    currentGame.score2--;
    // display updated data in the current game div
    displayCurrentGameEl(currentGame);
});

finishGameButton.addEventListener('click', async() => {
   
    
    // create a new game using the current game state
    await createGame(currentGame);
    // re-fetch the games to get the updated state
    const allGames = await getGames();

    // setTimeout(displayAllGames(allGames), 300);

    // reassign the past games state to the re-fetched, updated games
    // displayAllGames();
    nameForm.reset();
    
    currentGame.name1 = '';
    currentGame.name2 = '';
    currentGame.score1 = 0;
    currentGame.score2 = 0;
    displayAllGames(allGames);
    displayCurrentGameEl();
});

logoutButton.addEventListener('click', () => {
    logout();
});

    // on load . . .
window.addEventListener('load', async(e) => {
    e.preventDefault();
    // fetch all games
    const allGames = await getGames();
    // check if there are any
    // if there are, set those as the initial state of pastGames
    if (allGames){
        displayAllGames(allGames);
    }
    // then display all the games (hint: call displayAllGames())
});


function displayCurrentGameEl() {
    // clear out the current game div
    currentGameEl.textContent = '';
    // change the label to show team one's name;
    // change the label to show team two's name;
    teamOneLabel.textContent = '';
    teamOneLabel.textContent = currentGame.name1;
    
    teamTwoLabel.textContent = '';
    teamTwoLabel.textContent = currentGame.name2;
    
    // call the render game function to create a game element
    const gameEl = renderGame(currentGame);
    gameEl.classList.add('current');
    
    // append the element to the cleared out current game div
    currentGameEl.append(gameEl);
}


function displayAllGames(allGames) {
    // clear out the past games list in the DOM

    pastGamesEl.textContent = '';
    for (let g of allGames){
        const pastGames = renderGame(g);
        pastGamesEl.append(pastGames);
        console.log(g);
    }
    // fetch and loop through the past games 
    // render and append a past game for each past game in state
}


displayCurrentGameEl();
