
import React, { Component } from 'react'; 
import image from "../Layout/bg.jpg";

export class IncomeStatement extends Component {  
    constructor(props) {
        super(props);
        
        this.state = { name:null, value: null , type:""};
        
    
  
    }
    
     handleaccNameChange=e=>      
        this.setState({name: e.target.value});
     
     handleaccValChange=e=>
        this.setState({value: e.target.value});
     
     handleSelaccChange=e=>
        this.setState({type: e.target.value});
       
        ViewBalanceSheet=e=>
        this.setState(alert("get assets"))    
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   M                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
  
    handleSubmit(e) {
       
       
        e.preventDefault();
      
        let data = {
            "name": this.state.name,
            "value": this.state.value,
            "type":this.state.type,
        }
      
      return fetch('http://localhost:3000/saveresdata', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())

        
    

    }
    render() {  
        return (  
            <div>
            
            <section className="clean-block clean-hero" style={{backgroundImage: `url(${image})`  }}>
            
            <div className="text"><p><font color='red'><b>Page is under Construction</b></font></p>
    
            <div className="form-group">
      
          </div>
        
          
            
            
            </div>
        </section>
          
        <section className="clean-block features">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5 feature-box">
                        <i className="icon-star icon"></i>
                        <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Balance Sheet</h4>
                        <p>&nbsp;financial statement that reports a company's assets, liabilities and shareholders' equity.</p>
                    </div>
                    <div className="col-md-5 feature-box"><i className="icon-pencil icon"></i>
                        <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Income Statement</h4>
                        <p>&nbsp;financial statement&nbsp;that shows you how profitable your business was over a given reporting period.</p>
                    </div>
                    <div className="col-md-5 feature-box"><i className="icon-screen-smartphone icon"></i>
                        <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result</h4>
                        <p>financial statement that reports the Result of profit or loss at the end of the year</p>
                    </div>
                    <div className="col-md-5 feature-box"><i className="icon-refresh icon"></i>
                        <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Calculations</h4>
                        <p>TVA calculations and loans and other calculations&nbsp;</p>
                    </div>
                </div>
            </div>
        </section>
        <section className="clean-block about-us">
            <div className="container">
                <div className="block-heading">
                    <h2 className="text-info">About Us</h2>
                    <p>This Website is made by Bootstrap and Reactjs with&nbsp; a mongob Database to make accounting calculations&nbsp;</p>
                </div>
            </div>
        </section>
   
             </div>

        )
    }
}
export default IncomeStatement 