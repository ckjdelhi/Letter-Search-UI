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
            <div className="row">
                <div className="col-sm-6">
                    <Dropzone />
                </div>
                <div className="col-sm-6">
                    <div className="container">
                        <h2 className="title">Document Extract</h2>
                        <div className="scroll">It is a good platform to learn programming.  
                            It is an educational website. Prepare for the Recruitment drive 
                            of product based companies like Microsoft, Amazon, Adobe etc with 
                            a free online placement preparation course. The course focuses  
                            on various MCQ's & Coding question likely to be asked in the  
                            interviews & make your upcoming placement season efficient and  
                            successful. Also, any geeks can help other geeks by writing  
                            articles on the GeeksforGeeks, publishing articles follow few  
                            steps that are Articles that need little modification/improvement 
                            from reviewers are published first. To quickly get your articles 
                            reviewed, please refer existing articles, their formatting style, 
                            coding style, and try to make you are close to them. In case you 
                            are a beginner
                        </div>
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