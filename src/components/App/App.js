import React from 'react';

import StartGame from '../StartGame/StartGame'
import DealerHand from '../DealerHand/DealerHand'
import PlayerHand from '../PlayerHand/PlayerHand'


class App extends React.Component {
  
    render() {
      
        return(
            <main className = "app">

                    {/* header */}
                    {/* total score */}
                
                    <DealerHand />

                    <StartGame />

                    <PlayerHand />

            </main>
        )

    }

}

export default App
