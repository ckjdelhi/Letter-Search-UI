import React from 'react'
import './LetterIntake.css'
import Dropzone from '../dropzone/Dropzone'
import Delayed from '../delay/Delayed'
class LetterIntake extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          data: ''
        }
        this.readData=this.readData.bind(this)
}
  readData(fileName){
      let url = 'https://exl-upload-image-bucket.s3.amazonaws.com/'+fileName+'.txt'
    fetch(url).then(response => response.text()).then(data => this.setState({data:data}));

  }
  componentDidMount(){
    this.readData('MarketingLettertoPhysician')
  }
  timeout(delay) {
    return setTimeout(delay)
  }
  render(){
      return(
        <div>
            <div className="row">
                <div className="col-sm-6">
                    <Dropzone />
                </div>
                <div className="col-sm-6">
                    <div className="container">
                        <h2 className="title">Document Extract</h2>
                        <div className="scroll"> <Delayed waitBeforeShow={1000}>{this.state.data}</Delayed></div>
                        <div className="marginTop">
                          <Delayed waitBeforeShow={2000}>
                            <span><i className="fa fa-check" aria-hidden="true"></i> Duplicate Letter Check<br/></span>
                          </Delayed>
                          <Delayed waitBeforeShow={4000}>
                            <span><i className="fa fa-check" aria-hidden="true"></i> Letter Contains PHI Information<br/></span>
                          </Delayed>
                          <Delayed waitBeforeShow={6000}>
                            <span><i className="fa fa-times" aria-hidden="true"></i> Not Matching Any Template<br/></span>
                          </Delayed>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )
  }
}
export default LetterIntake