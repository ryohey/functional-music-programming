import React from 'react'
import song from "./mysong"
import { play } from './player';

class App extends React.Component {
  componentDidMount() {
    play(song)
  }

  public render() {
    return <div id="visualization" />
  }
}

export default App;
