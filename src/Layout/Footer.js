
    import React, { Component } from 'react'  
      
    export class Footer extends Component {  
        render() {  
            return (  
                <div>  
                    
        <footer className="page-footer font-small teal pt-4">
        <div class="container-fluid text-center text-md-left">
        <div class="row">
            
        <div class="col-md-6 mt-md-0 mt-3">
        <h5 class="text-uppercase font-weight-bold">Get Started</h5>
                    <ul>
                        <li><a href="inde.html">Home</a></li>
                        <li><a href="BalanceSheet.html">Balancesheet</a></li>
                        <li><a href="Incomestatement.html">IncomeStatment</a></li>
                        <li><a href="Result.html">Result</a></li>
                    </ul>
                </div>
                <hr class="clearfix w-100 d-md-none pb-3"></hr>
                <div  class="col-md-6 mb-md-0 mb-3">
                <h5 class="text-uppercase font-weight-bold">About Us</h5>
                    <ul>
                        <li><a href="https://github.com/Zeriabo">Github&nbsp;</a></li>
                        <li><a href="https://github.com/Zeriabo">Contact us</a></li>
                        <li><a href="https://www.linkedin.com/in/zeriab-chiah-017b9a60/">LinkedIn</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer-copyright text-center py-3">
            <p>© 2020 Copyright Zeriab</p>
        </div>
    </footer> 
                
                </div>  
            )  
        }  
    }  
      
    export default Footer  
