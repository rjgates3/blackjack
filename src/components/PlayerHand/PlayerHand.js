import React from 'react'

import Context from '../../context/context'

class PlayerHand extends React.Component {

    static contextType = Context

    renderHit() {
        return(
            <div>
                <button
                onClick = {this.context.hitPlayer}>
                    Hit
                </button>
                <button
                    onClick = {this.context.stay}>
                    Stay
                </button>
            </div>
        )
    }

    render() {
        
        return(
            <section className = "dealer-hand">
                <p>Player</p>
                <p>Hand Score: { this.context.playerHandScore }</p>
                { this.context.playerHand }
                {
                    (this.context.gameStarted && !this.context.playerStays)
                        ? this.renderHit()
                        : ''
                }
            </section>
        )
    }
}

export default PlayerHand