
import React, { Component } from 'react'  
import image from "./bg.jpg" 


export class Home extends Component {  
    render() {  
        return (  
             <div>
              <div><p><font color='red'>Hello babey</font></p></div>
              <section className="clean-block clean-hero" style={{backgroundImage: `url(${image})`  }}>
            <div className="text"></div>
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
export default Home 