import React from 'react'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import './RuleSetup.css'

class RuleSetup extends React.Component {
    constructor() {
          super(); 
          this.state = {
            duplicateCheck: true,
            phiCheck:true,
            templateMatch:true
        };
    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.checked });
      };
    render(){
        return(
            <div class="rule-container">
                <FormGroup column>
                    <label><h2>Rules Setup:</h2></label>
                    <FormControlLabel
                    control={
                        <Checkbox
                        checked={this.state.duplicateCheck}
                        onChange={this.handleChange}
                        name="duplicateCheck"
                        color="primary"
                        />
                    }
                    label="Duplicate Letter Check"
                    />
                    <FormControlLabel
                    control={
                        <Checkbox
                        checked={this.state.phiCheck}
                        onChange={this.handleChange}
                        name="phiCheck"
                        color="primary"
                        />
                    }
                    label="Letter Contains PHI Information"
                    />
                    <FormControlLabel
                    control={
                        <Checkbox
                        checked={this.state.templateMatch}
                        onChange={this.handleChange}
                        name="templateMatch"
                        color="primary"
                        />
                    }
                    label="Not Matching Any Template "
                    />
            </FormGroup>
          </div>
        )
    }
}
export default RuleSetup