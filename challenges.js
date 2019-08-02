/*
YOUR 3 CHALLENGES
Change the game to follow these rules:
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScore, activePlayer, gamePlaying, lastDice;

init();

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.getElementById('dice1').style.display = 'none';
    document.getElementById('dice2').style.display = 'none';

    document.getElementById('score-0').textContent = '0'; // getElementById is a bit faster than querySelector
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

document.querySelector('.btn-roll').addEventListener('click', function () {
    // Anonymous function, do something here and only here (cannot be called anywhere else)

    // Checking is game on
    if (gamePlaying){
        // 1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;


        // 2. Display the result
        document.getElementById('dice1').style.display = 'block';
        document.getElementById('dice2').style.display = 'block';
        document.getElementById('dice1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice2').src = 'dice-' + dice2 + '.png';

        // 3. Update the round score IF the rolled number was NOT a 1
        if (dice1 !== 1 && dice2 !== 1) {
            // Add score
            roundScore += dice1 + dice2; 
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // Next player
            nextPlayer();
        }
/*        // 3. If the player rolls 6 twice in a row, he loses his ENTIRE score and then its next player's turn
        if (dice === 6 && lastDice === 6) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        } else if (dice !== 1) {
            // Update the round score IF the rolled number was NOT a 1
            roundScore += dice; // If you use += it is the same as 'roundScore = roundScore + dice'
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // Next player
            nextPlayer();
        }

        lastDice = dice;*/
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {

    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore;

        // Undefined, 0, null or "" are COERCED to false, anything else is true
        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        // Check if player won the game
        if (scores[activePlayer] >= winningScore ) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice1').style.display = 'none';
            document.getElementById('dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

function nextPlayer() {
    // Next player using ternary operator
    activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.getElementById('dice1').style.display = 'none';
    document.getElementById('dice2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);
