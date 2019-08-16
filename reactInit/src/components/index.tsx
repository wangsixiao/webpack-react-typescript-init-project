import React,{Component} from 'react'
import Hello from './hello'

export default class App extends Component {
  constructor(props:any){
    super(props);
    this.state={}
  }

  render(){
    return (
      <Hello
        name="typescript"
        amout={3}
      />
    )
  }
}