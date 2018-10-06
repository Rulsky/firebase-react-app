import React, { Fragment, Component } from 'react'
import { hot } from 'react-hot-loader'
import rndColor from 'randomcolor'

import Btn from './Btn'

class App extends Component {
  state = {
    bgc: '#FF6EA6',
    brdc: '#FFB4D9',
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
      <Fragment>
        <h1>my web app</h1>
        <p>hello there</p>
        <Btn bgc={bgc} brdc={brdc} onClick={this.changeColors}>Click me to change my colors</Btn>
        <p>
          Photo by Finding Dan | Dan Grinwis on Unsplash
        </p>
        <p>
          <a href="https://unsplash.com/@finding_dan?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge">Link</a>
        </p>
        <img
          src="./img/finding-dan-dan-grinwis-unsplash.jpg"
          alt="Dan Grinwis on Unsplash"
        />
      </Fragment>
    )
  }
}

export default hot(module)(App)
