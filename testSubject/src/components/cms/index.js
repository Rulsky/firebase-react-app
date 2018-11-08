import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import rndColor from 'randomcolor'

import Btn from '../Btn'

class App extends Component {
  state = {
    bgc: '#D4B483',
    brdc: '#48A9A6',
  }

  changeColors = () => {
    this.setState({
      bgc: rndColor(),
      brdc: rndColor(),
    })
  }

  render() {
    const { bgc, brdc } = this.state
    return (
      <>
        <h1>your dashboard</h1>
        <Btn bgc={bgc} brdc={brdc} onClick={this.changeColors}>
          I also can change colors :D
        </Btn>
      </>
    )
  }
}

export default hot(module)(App)
