import React from 'react';
import './letterHead.css'
class LetterHead extends React.Component {
    constructor(prop){
        super();
    }
    render(){
        return (
            <div class="letterHeadContainer">
                <p>Hello {this.props.location.title},</p>
                <p>{this.props.location.description}</p>
                <ol class="highlighter">
                    <li>Either this isn't a priority for you and your company at the moment</li>
                    <li>You've been busy and we should keep trying to connect</li>
                </ol>
                <p>If the answer is option one, I won't take up any more of your time. If the answer is option two, do you have time to connect tomorrow?</p>
                <p>Thanks,<br/>[Your name]</p>
            </div>
        )
    }
}
export default LetterHead