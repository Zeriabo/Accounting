
import React, { Component } from 'react';


import { BrowserRouter as    Prompt,withRouter,Switch} from 'react-router-dom'; // eslint-disable-line no-unused-vars





export class Header extends Component {  
    render() {  
        return (  
             <div>
             <nav className="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar">
             <div className="container"><a className="navbar-brand" id="brand-logo" href="/Home"> </a>
            <nav className="navbar navbar-light navbar-expand-md">
                <div className="container-fluid">
                    <div><button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button></div>
                    <div className="collapse navbar-collapse" id="navcol-1">
                        <ul className="nav navbar-nav ml-auto">
                            <li className="nav-item" role="presentation">
                                <div><a className="nav-link" href="/Home">Home</a></div></li>
                                <li className="nav-item" role="presentation">
                                <div><a className="nav-link" href="/BalanceStatement">Balance Statement</a></div></li>
                                <li className="nav-item" role="presentation">
                                <div><a className="nav-link" href="./IncomeStatement">Income Statement</a></div></li>
                                <li className="nav-item" role="presentation">
                                <div><a className="nav-link" href="./Result">Result</a></div></li>
                          <li className="nav-item" role="presentation"></li>
                            <li className="nav-item" role="presentation"></li>
                        </ul>
                    </div>
                    
                    
                </div>
            </nav>
        </div>
             </nav>

             
             </div>

        )
    }
}
export default withRouter(Header) 