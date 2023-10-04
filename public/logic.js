const grid = document.querySelector('.gameGrid');
const attemptsHolder = document.querySelector('.attemptsHolder');
const foundHolder = document.querySelector('.foundHolder');


const emojiList = ['😀','👽','🦄','👀','👏','🤸‍♂️','🧬','🍿','🍌','🪀']
const fullEmojiList = [...emojiList, ...emojiList];  

const cardsInGame = 20;

let attempts =  0; //Increase the counter with every attempt
let foundCards = 0; //Increase the counter when a match is found
attemptsHolder.textContent = attempts;
foundHolder.textContent = foundCards;

let chosenCards =[];                    //will consists only 2 items. Eg- ['😀','👽']
let chosenCardsIds=[];                  //will consists indexes of emojis 2 items. Eg- ['0','1']


//function to shuffle array
function shuffle(arr){
    return arr.sort(()=>Math.random()-0.5)
}
const shuffledArr = shuffle(fullEmojiList);


// Initialises board
function initiateBoard(){
    for (let i = 0; i <fullEmojiList.length; i++){
        let card = document.createElement('div');
        card.setAttribute('class','cardClass')
        card.setAttribute('data-id',i );
        card.classList.add('bigEmoji');

        card.addEventListener('click', flipCard)        
        grid.appendChild(card);
       
    }    
}


//Check if the card is already flipped
    function flipCard() {
        let cardId = this.getAttribute('data-id'); //this = div = card

        // Check if the chosen card is already flipped or is a matched pair
        if (chosenCardsIds.includes(cardId) || chosenCards.length === 2) {
            return;
        }

        // Add the chosen card to the chosenCards array
        chosenCards.push(shuffledArr[cardId]);
        chosenCardsIds.push(cardId);

        // Flip the card by changing its text content
        this.textContent = shuffledArr[cardId];

        // Check for a match when two cards are chosen
        if (chosenCards.length === 2) {
            setTimeout(checkForMatch, 500); // Delay to show the second card
        }
    }

//Function that holds the attempts highscore, its a separate function so it can be exported
    function incrementAttempts(){
        attempts++;
        attemptsHolder.textContent = attempts;
        }

// Function to check if the chosen cards match
    function checkForMatch() {
        const [card1, card2] = chosenCards;
        const [cardId1, cardId2] = chosenCardsIds;

        // If the cards match, update foundCards count and display
        if (card1 === card2) {
            foundCards += 2;
            foundHolder.textContent = foundCards;
            if (foundCards === cardsInGame) {
                setTimeout(()=>{alert('Congratulations! You found all the pairs.')},0);
            }
        } else {
            // If the cards don't match, flip them back
            document.querySelector(`[data-id="${cardId1}"]`).textContent = '';
            document.querySelector(`[data-id="${cardId2}"]`).textContent = '';
        }

        // Clear the chosen cards arrays
        chosenCards = [];
        chosenCardsIds = [];

        // Increase attempts count and display
      incrementAttempts()
    }


module.exports = {incrementAttempts}
initiateBoard();
// export {incrementAttempts}