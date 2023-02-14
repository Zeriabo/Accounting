
    import React, { Component } from 'react'  
    import { SocialIcon } from 'react-social-icons';
    
    export class Footer extends Component {  
        render() {  
            
            return (  
                
                <div>  
                    
    
    
    <mdb-footer color="indigo" className="font-small pt-0">
    <mdb-container >
      <mdb-row>
      
        
      <mdb-col md="12">
      <div className="footer-copyright text-center py-3">
        
    
      
       <SocialIcon url="https://www.linkedin.com/in/zeriab-chiah-017b9a60/" />  &nbsp;
       <SocialIcon url="https://github.com/Zeriabo/" />&nbsp;
       <SocialIcon url="https://twitter.com/ZeriabChiah/" />
       

               
        </div>
        </mdb-col>
      </mdb-row>
    </mdb-container>
    <div className="footer-copyright text-center py-3">
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
