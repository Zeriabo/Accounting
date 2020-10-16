
    import React, { Component } from 'react'  
    import { mdbFooter, mdbContainer, mdbRow, mdbCol } from 'mdbvue';
    import { SocialIcon } from 'react-social-icons';
    
    export class Footer extends Component {  
        render() {  
            
            return (  
                
                <div>  
                    
        {/* <footer className="page-footer font-small teal pt-2">
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
    </footer>  */}
    
    <mdb-footer color="indigo" class="font-small pt-0">
    <mdb-container >
      <mdb-row>
      
        
      <mdb-col md="12">
      <div class="footer-copyright text-center py-3">
        
    
      
       <SocialIcon url="https://www.linkedin.com/in/zeriab-chiah-017b9a60/" />  &nbsp;
       <SocialIcon url="https://github.com/Zeriabo/" />&nbsp;
       <SocialIcon url="https://twitter.com/ZeriabChiah/" />
       

               
        </div>
        </mdb-col>
      </mdb-row>
    </mdb-container>
    <div class="footer-copyright text-center py-3">
      <mdb-container fluid>
        &copy; 2020 Copyright: <a href="https://github.com/Zeriabo"> Zeriab</a>
      </mdb-container>
    </div>
  </mdb-footer>
                
                </div>  
            )  
        }  
    }  
      
    export default Footer  
