import React from 'react';
import './letterHead.css'
class LetterHead extends React.Component {
    constructor(prop){
        super();
    }
    render(){
        return (
            <div class="letterHeadContainer">
                <p class="highlighter">{this.props.location.title},</p>
                <p>{this.props.location.description}</p>
            </div>
        )
    }
}
export default LetterHead