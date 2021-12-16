import './example.test.js';
import { renderGame, renderTeam } from '../render-utils.js';

const test = QUnit.test;
const game = {
    name1: '',
    name2: '',
    score1: '', 
    score2: ''
};

test(`renderGame Test`, (expect) => {
//Arrange
    // Set up your arguments and expectations
    const expected = `<div class="game"><div class="team"><p class="name"></p><p class="score"></p></div><div class="team"><p class="name"></p><p class="score"></p></div></div>`;
    
    //Act 
    // Call the function you're testing and set the result to a const
    const actual = renderGame(game);

    //Expect
    // Make assertions about what is expected versus the actual result
    expect.equal(actual.outerHTML, expected);
});

test(`renderTeam Test`, (expect) => {
//Arrange
    // Set up your arguments and expectations
    const expected = `<div class="team"><p class="name"></p><p class="score"></p></div>`;
    
    //Act 
    // Call the function you're testing and set the result to a const
    const actual = renderTeam(game.name1, game.score1);

    //Expect
    // Make assertions about what is expected versus the actual result
    expect.equal(actual.outerHTML, expected);
});