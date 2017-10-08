import { h, render, Component } from 'preact';

class App extends Component {

  constructor() {
    super()
  }

  render() {
    let time = new Date().toLocaleTimeString()
    return <span>Hello, it's already { time }</span>
  }

}

export default App
