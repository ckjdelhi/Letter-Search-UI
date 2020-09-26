import React from 'react'
import './LetterIntake.css'
import Dropzone from '../dropzone/Dropzone'

class LetterIntake extends React.Component{
    constructor() {
        super()
        this.state = {}
  }
  render(){
      return(
        <div>
            <p className="title">React Drag and Drop Image Upload</p>
            <div className="content">
                <Dropzone />
            </div>
      </div>
      )
  }
}
export default LetterIntake