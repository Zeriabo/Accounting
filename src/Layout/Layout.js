    import React, { Component } from 'react';   
    import Header from './Header'  
    import Footer from './Footer'  
    import Router from './Router'

   
    import 'bootstrap/dist/css/bootstrap.min.css';
  
    export class Layout extends Component {  
        loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>  
      
        render() {  
            return ( 
                 
                <div >  
                    <div id="wrapper"  >  
                    <div id="content-wrapper" className="d-flex flex-column" >  
                            <div id="content" >  
                                <Header /> 
                             <div style={{backgroundColor: "white", color: "rgb(49, 115, 238)"}}>
                             <Router/>
                     
                             </div>
                                  
                                    
                          
                              
                              
                            </div >  
                           
                            </div>  
                              <Footer /> 
                    </div>  
                </div>  
            )  
        }  
    }  
      
    export default Layout  
