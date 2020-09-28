import React from 'react'
import './LetterIntake.css'
import Dropzone from '../dropzone/Dropzone'
import Delayed from '../delay/Delayed'
import {URL} from '../constant/url'

require('es6-promise').polyfill();
 
var originalFetch = require('isomorphic-fetch');
var fetch = require('fetch-retry')(originalFetch);

class LetterIntake extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          data: '',
          show: false
        }
        this.readData=this.readData.bind(this)
        this.showExtract=this.showExtract.bind(this)
        this.hideBlock=this.hideBlock.bind(this)
}
  readData(fileName){
      let url = URL.extractData+'/'+fileName+'.txt'
    //fetch(url).then(response => response.text()).then(data => this.setState({data:data}));
    fetch(url, {
      retries: 3,
      retryDelay: 2000,
        retryOn: function(attempt, error, response) {
          // retry on any network error, or 4xx or 5xx status codes
          if (error !== null || response.status >= 400) {
            console.log(`retrying, attempt number ${attempt + 1}`);
            return true;
          }
        }
    })
    .then(function(response) {
      return response.text();
    }).then(data => this.setState({data:data}));
  }
  showExtract(fileName){
   this.setState({show:true}) 
   this.readData(fileName.replace(/\.[^/.]+$/, ""))
  }
  hideBlock(){
    this.setState({show:false})
  }
  timeout(delay) {
    return setTimeout(delay)
  }
  render(){
      return(
        <div>
            <div className="row">
                <div className="col-sm-6">
                    <Dropzone showExtract={this.showExtract} hideBlock={this.hideBlock}/>
                        
                    {this.state.show &&<div className="marginTop">
                        <span><i className="fa fa-file" aria-hidden="true"></i> Matched Template: <b>N/A</b></span>
                    </div>
                    }
                </div>
                       
                {this.state.show && 
                  <div className="col-sm-6">
                      <div className="container">
                          <h2 className="title">Document Extract</h2>
                          <div className="scroll">
                          <Delayed waitBeforeShow={2000}>
                              {this.state.data}
                            </Delayed>
                          </div>
                          <div className="marginTop">
                            <Delayed waitBeforeShow={2000}>
                              <h3 className="title1">QC Check</h3>
                              <span><i className="fa fa-check" aria-hidden="true"></i> Duplicate Letter Check<br/></span>
                            </Delayed>
                            <Delayed waitBeforeShow={4000}>
                              <span><i className="fa fa-check" aria-hidden="true"></i> Letter Contains PHI Information<br/></span>
                            </Delayed>
                            <Delayed waitBeforeShow={6000}>
                              <span><i className="fa fa-times" aria-hidden="true"></i> Not Matching Any Template<br/>
                              </span>
                            </Delayed>
                          </div>
                      </div>
                  </div>
                }
            </div>
        </div>
      )
  }
}
export default LetterIntake