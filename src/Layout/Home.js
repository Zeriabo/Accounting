
import React, { Component } from 'react'  
import './CSS/t.css'


export class Home extends Component {  
    render() {  
        return (  
             <div>
              
              <section className="clean-block clean-hero" >
            <div  className="text"  >
                <br />   <br />
                <font size="3" face="Courier New" >
                <table border='0' width="100%">
                    <tr><th colspan ='2'><center><h1>MERN CRUD Accounting</h1></center></th></tr>
                    <tr>
                        <td >
                        This website is made by React and Bootstrap and Express.js backend with a MongoDB Database stored on cloud the code is written
                         by Javascript ES6 standard, the website 3 pages BalanceStatement and IncomeStatement and Cash Flow Statement perform accounting 
                         calculations, for example: In the BalanceStatement page you can enter the debit and the credit of Asset or liability or 
                         shareholder which is selected from the dropbox and the website will perform the calculations by Nodejs (Express), And 
                         insert the result into a MongoDB Database then you can either view the Trail balance sheet or the Balance Statement,
                         BalanceStatement formula=>Assets=(Liabilities+ Equity)
</td></tr>
<tr><td></td></tr>
<tr>
<td>
In the income statement page, the user inserts the debit and the credit of the operating and non-operating activities by selecting them from the dropbox and then viewing the profit and loss. In the Result page 
 you can view the result of the company activity, IncomeStatement formula => Net Income=(Revenue−Expenses)
In the Cash Flow Statement page, it shows The statement of cash flows or the cash flow statement,
 is a financial statement that summarizes the amount of cash and cash equivalents entering and leaving a company.
The cash flow statement (CFS) measures how well a company manages its cash position.
</td>

</tr>

                   
                </table>
                </font>
            
  
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
                        <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cash Flow Statement</h4>
                        <p>The statement of cash flows, or the cash flow statement, is a financial statement that summarizes the amount of cash and cash equivalents entering and leaving a company. </p>
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