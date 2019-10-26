
import React from 'react'
import Context from '../../context/context'

class StartGame extends React.Component {

    static contextType = Context

    handleClick = e => {
        e.preventDefault()
        this.context.startGame()
        this.context.setGameStarted(true)
    }

    renderStart() {
        return(
            <section className = "game-start">
                
                <button
                    onClick = { this.handleClick }>
                    Start Game
                </button>

            </section>
        )
    }

    renderResults() {
        return(
            <section className = "game-results">
                <p>
                    { this.context.gameWinner } wins!
                </p>
                    
            </section>
        )
    }

    render() {
        return(
            <div>
                {
                    this.context.gameStarted
                    ? ''
                    : this.renderStart()
                }
                {
                    this.context.gameFinished
                        ? this.renderResults()
                        : ''
                }
            </div>
        )
    }

    
}

export default StartGame