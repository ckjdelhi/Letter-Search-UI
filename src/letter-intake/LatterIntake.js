import React from 'react'
import './LetterIntake.css'
import Dropzone from '../dropzone/Dropzone'
var request = require('request');

class LetterIntake extends React.Component{
    constructor(prop) {
        super()
        this.state = {data:''}
  }
  readData(fileName){
    let resp = 'File Not Found'
    request.get('https://exl-upload-image-bucket.s3.amazonaws.com/'+fileName+'.txt', function (error, response, body) {
        if (!error && response.statusCode === 200) {
            this.setState({data:body})
            console.log(body)
            resp =  body
        }
    });
    return resp
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
                        <div className="scroll">{this.readData('doc_new')}</div>
                        <div className="marginTop">
                            <span><i class="fa fa-check" aria-hidden="true"></i> Duplicate Letter Check<br/></span>
                            <span><i class="fa fa-check" aria-hidden="true"></i> Letter Contains PHI Information<br/></span>
                            <span><i class="fa fa-times" aria-hidden="true"></i> Not Matching Any Template<br/></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )
  }
}
export default LetterIntake