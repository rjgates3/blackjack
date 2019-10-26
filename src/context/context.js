import React from 'react'

const Context = React.createContext({
    gameStarted: false,
    gameFinished: false,
    gameWinner: '',
    playerStays: false,
    dealerHandScore: 0,
    dealerBust: false,
    dealerHand: '',
    playerHandScore: 0,
    playerBust: false,
    playerHand: '',

    startGame: () => {},
    setGameStarted: () => {},
    hitPlayer: () => {},
    hitDealer: () => {},
    calcScore: () => {},
    shuffleDeck: () => {},
    stay: () => {},
})

export default Context

export class ContextProvider extends React.Component {
    constructor(props) {
        super(props)

        const state = {
            gameStarted: false,
            gameFinished: false,
            gameWinner: '',
            playerStays: false,
            deck: [],
            dealerCards: [],
            dealerHandScore: 0,
            dealerBust: false,
            dealerHand: '',
            playerCards: [],
            playerHandScore: 0,
            playerBust: false,
            playerHand: '',
            playerTotalScore: 0,
        }

        this.state = state
    }

    newDeck = [
        { card: '2', suite: 'hearts', value: 2 },
        { card: '2', suite: 'diamonds', value: 2 },
        { card: '2', suite: 'clubs', value: 2 },
        { card: '2', suite: 'spades', value: 2 },
        { card: '3', suite: 'hearts', value: 3 },
        { card: '3', suite: 'diamonds', value: 3 },
        { card: '3', suite: 'clubs', value: 3 },
        { card: '3', suite: 'spades', value: 3 },
        { card: '4', suite: 'hearts', value: 4 },
        { card: '4', suite: 'diamonds', value: 4 },
        { card: '4', suite: 'clubs', value: 4 },
        { card: '4', suite: 'spades', value: 4 },
        { card: '5', suite: 'hearts', value: 5 },
        { card: '5', suite: 'diamonds', value: 5 },
        { card: '5', suite: 'clubs', value: 5 },
        { card: '5', suite: 'spades', value: 5 },
        { card: '6', suite: 'hearts', value: 6 },
        { card: '6', suite: 'diamonds', value: 6 },
        { card: '6', suite: 'clubs', value: 6 },
        { card: '6', suite: 'spades', value: 6 },
        { card: '7', suite: 'hearts', value: 7 },
        { card: '7', suite: 'diamonds', value: 7 },
        { card: '7', suite: 'clubs', value: 7 },
        { card: '7', suite: 'spades', value: 7 },
        { card: '8', suite: 'hearts', value: 8 },
        { card: '8', suite: 'diamonds', value: 8 },
        { card: '8', suite: 'clubs', value: 8 },
        { card: '8', suite: 'spades', value: 8 },
        { card: '9', suite: 'hearts', value: 9 },
        { card: '9', suite: 'diamonds', value: 9 },
        { card: '9', suite: 'clubs', value: 9 },
        { card: '9', suite: 'spades', value: 9 },
        { card: '10', suite: 'hearts', value: 10 },
        { card: '10', suite: 'diamonds', value: 10 },
        { card: '10', suite: 'clubs', value: 10 },
        { card: '10', suite: 'spades', value: 10 },
        { card: 'J', suite: 'hearts', value: 10 },
        { card: 'J', suite: 'diamonds', value: 10 },
        { card: 'J', suite: 'clubs', value: 10 },
        { card: 'J', suite: 'spades', value: 10 },
        { card: 'Q', suite: 'hearts', value: 10 },
        { card: 'Q', suite: 'diamonds', value: 10 },
        { card: 'Q', suite: 'clubs', value: 10 },
        { card: 'Q', suite: 'spades', value: 10 },
        { card: 'K', suite: 'hearts', value: 10 },
        { card: 'K', suite: 'diamonds', value: 10 },
        { card: 'K', suite: 'clubs', value: 10 },
        { card: 'K', suite: 'spades', value: 10 },
        { card: 'A', suite: 'hearts', value: 11 },
        { card: 'A', suite: 'diamonds', value: 11 },
        { card: 'A', suite: 'clubs', value: 11 },
        { card: 'A', suite: 'spades', value: 11 },
    ]

    // initializes a new game
    startGame = () => {

        // get a new deck
        let deck = this.newDeck.slice(0)

        // shuffle deck
        deck = this.shuffleDeck(deck)
        
        // initialize an empty had for dealer and player
        const dCards = []
        const pCards = []
        
        // add two cards each to dealer and player
        pCards.push(deck.pop())
        dCards.push(deck.pop())
        pCards.push(deck.pop())
        dCards.push(deck.pop())

        // create JSX code for dealer and player hands
        const dealerHand = this.generateHand(dCards)
        const playerHand = this.generateHand(pCards)

        // get scores, update hands if over 21 and have aces
        const [dealerCards, dealerHandScore] = this.calcScore(dCards)
        const [playerCards, playerHandScore] = this.calcScore(pCards)
        
        // check if bust
        const dealerBust = this.isBust(dealerHandScore)
        const playerBust = this.isBust(playerHandScore)

        // check if player is at 21
        let gameFinished = false
        let gameWinner = 'Player'
        if(playerHandScore === 21) {
            gameFinished = true
            gameWinner = 'Player'
        }

        // update state
        this.setState({
            deck,
            gameStarted: true,
            gameFinished,
            gameWinner,
            dealerCards,
            playerCards,
            dealerHand,
            playerHand,
            dealerHandScore,
            playerHandScore,
            dealerBust,
            playerBust,
            playerStays: false
        })

        
    }

    setGameStarted = gameStarted => {
        this.setState({
            gameStarted
        })
    }

    generateHand = cards => {
        return cards
            .map(card => {
                return(
                    <div 
                        key= {card.card + card.suite}
                        className = "card">
                        <span>{ card.card }</span>
                        <span>{ card.suite }</span>
                    </div>
                )
            })
    }


    // adds a card to the player, checks for bust
    hitPlayer = () => {
        // add a card to player
        const deck = this.state.deck
        const pCards = this.state.playerCards
        pCards.push(deck.pop())

        // update score
        const [playerCards, playerHandScore] = this.calcScore(pCards)

        // update players hand
        const playerHand = this.generateHand(playerCards)
        // check if player is bust
        const playerBust = this.isBust(playerHandScore)

        let gameFinished = false
        let gameWinner = ''
        let gameStarted = true

        if(playerBust) {
            gameFinished = true
            gameWinner =  'Dealer'
            gameStarted = false
        }

        this.setState({
            playerCards,
            playerHandScore,
            playerHand,
            playerBust,
            gameFinished,
            gameWinner,
            gameStarted
        })
    }

    // player stays
    stay = () => {

        this.setState({
            playerStays: true
        })

        this.hitDealer()

        // could not figure out this part in time
        // while(!this.state.dealerBust) {
        //     console.log(this.state.dealerBust)
        //     this.hitDealer()
        // }

    }

    /* Adds a card to the dealer until meets dealers hit requirements
     - Score is less than 17
     - If score is less than player, dealer hits
     - checks for bust after every hit
    */
    hitDealer = (dealerBust = false) => {
        // base case for recursivly calling hitDealer
        if(dealerBust) {
            return ''
        }
        let gameFinished
        let gameWinner
        let gameStarted

        const deck = this.state.deck
        const dCards = this.state.dealerCards
        dCards.push(deck.pop())
        // update score
        const [dealerCards, dealerHandScore] = this.calcScore(dCards)

        // update players hand
        const dealerHand = this.generateHand(dealerCards)
        // check if player is bust
        const bust = this.isBust(dealerHandScore)

        if(bust) {
            gameFinished = true
            gameWinner =  'Player'
            gameStarted = false
            dealerBust = true
        }

        this.setState({
            dealerCards,
            dealerHandScore,
            dealerHand,
            dealerBust,
            gameFinished,
            gameWinner,
            gameStarted
        })

        this.hitDealer(bust)
        
        

    }

    /*  given a hand of cards returns score, 
     - accounting for aces being 1 or 11 
     - returns bust if bust
    */

    calcScore = cards => {
        let score = cards.reduce((acc, card) => {
            return acc + card.value
        }, 0)



        if(score > 21) {
            for(let index = 0; index<cards.length; index++) {
                if(cards[index].value === 11) {
                    cards[index].value = 1
                    score -= 10
                    return [cards, score]
                }
                else {
                    return [cards, score]
                }
            }
        }
        return [cards, score]
        
    }

    isBust(score) {
        if(score > 21) {
            return true
        }
        else {
            return false
        }
    }
    

    // takes the newDeck and returns a shuffled deck
    shuffleDeck = (arr) => {
        let currIndex = arr.length
        let temp
        let randIndex
      
        while (0 !== currIndex) {
      
          randIndex = Math.floor(Math.random() * currIndex);
          currIndex -= 1;
      
          temp = arr[currIndex];
          arr[currIndex] = arr[randIndex];
          arr[randIndex] = temp;
        }
      
        return arr;
    }

    render() {
        const value = {

            gameStarted: this.state.gameStarted,
            gameFinished: this.state.gameFinished,
            gameWinner: this.state.gameWinner,
            playerStays: this.state.playerStays,
            dealerHandScore: this.state.dealerHandScore,
            dealerBust: this.state.dealerBust,
            dealerHand: this.state.dealerHand,
            playerHandScore: this.state.playerHandScore,
            playerBust: this.state.playerBust,
            playerHand: this.state.playerHand,

            startGame: this.startGame,
            setGameStarted: this.setGameStarted,
            hitPlayer: this.hitPlayer,
            hitDealer: this.hitDealer,
            calcScore: this.calcScore,
            shuffleDeck: this.shuffleDeck,
            stay: this.stay,
        }

        return(
            <Context.Provider value = { value }>
                { this.props.children }
            </Context.Provider>
        )
    }
}