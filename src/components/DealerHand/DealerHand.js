import React from 'react'

import Context from '../../context/context'

class DealerHand extends React.Component {

    static contextType = Context

    render() {
        return(
            <section className = "dealer-hand">
                <p>Dealer</p>
                <p>Hand Score: { this.context.dealerHandScore }</p>
                { this.context.dealerHand }
            </section>
        )
    }
}

export default DealerHand