import React, {Component} from 'react'  
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import ProgressBar from 'react-bootstrap/ProgressBar'
// React Notification
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './CSS/t.css';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';




    
  
 
function setaccName(n){
    var name="";
    switch(n){
        case 101:
         
            name="Bank/Cash at Bank";
            break;
        case 108:
        
            name= "Deferred Expense"; 
            break;
        case 110 :
            name="Others";
            break;
        case 112:
            name="Accounts Receivable";
            break; 
        case 157:
            name="Equipment"; 
            break;
        case 130:
            name="Prepaid Insurance"; 
            break;
        case 200:
            name="Notes Payable";
            break;
        case 201:
            name="Accounts Payable";
            break;
        case 209:
            name="Unearned Service Revenue";
            break;
        case 230:
            name="Interest Payable";
            break;
        case 231:
            name="Deferred Gross profit";
            break;

        case 300:
            name="Owner Capital";
            break;
        case 311:
            name="Share Capital-Ordinary";
            break;
        case 320:
            name="Retained Earnings"; 
            break;
        case 330:
            name="Capital contribtions";
        break;
        case 332:
            name="Dividends";
        break;
        default:
            name= ""
        break;
       
    }
    return name;
   } 


function fixot(acc){ //function which take each object and put the credit and debit name and the values and the difference between the values

   var accob={}
   var clc,crval,mval = 0 // eslint-disable-line no-unused-vars
   var crn,mn=''; // eslint-disable-line no-unused-vars
   var accobarr=[]

acc.forEach((acco)=> {

   mn=acco.mname;
   crn=acco.dname;
   mval=acco.mvalue;
   crval=acco.dvalue;
   accob={mname:mn,mvalue:mval,dname:crn,cvalue:crval,res:(acco.mvalue>acco.dvalue)? clc= acco.mvalue-acco.dvalue:clc=acco.dvalue-acco.mvalue}

   accobarr.push(accob)
   });
 
   return accobarr
}

 
function fixo(n)
{ 

    var accba={} 
    var crval,mval,resu= 0
    var mn='';   var balarray=[]
    n.forEach((accb)=>{
     mn=setaccName(accb._id);
   
     mval=accb.mvalue;

     crval=accb.cvalue;

     resu=(mval>crval)?mval-crval+' Debit':(crval>mval)?crval-mval+' Credit':0;
   accba={name:mn,mvalue:mval,cvalue:crval,res:resu}
    balarray.push(accba)

    });
    for(var i = 0;i<n.length-1;i++){
        mval+=n[i].mvalue;
        crval+=n[i].cvalue;
        
    }
     

       
       accba={name:"Result",mvalue:mval,cvalue:crval,res:(mval>crval)?mval-crval +' Debit':crval-mval+' Credit'}
       balarray.push(accba)
      
 return balarray
}

function compare(a, b) {
    if(a._id < b._id) { return -1; }
  else if(a._id > b._id) { return 1; }
  return 0;
  }
  function comparestr(a, b) {
    // Use toUpperCase() to ignore character casing
    const accA = a._id.toUpperCase();
    const accB = b._id.toUpperCase();

    let comparison = 0;
    if (accA > accB) {
      comparison = 1;
    } else if (accA < accB) {
      comparison = -1;
    }
    return comparison;
  }
 
 
export class BalanceStatement extends Component {
    
    constructor(props) {
        super(props);

     
        this.state = { credit: "",debit: "",daccn :null, caccn:null ,dvalue: null,cvalue: null ,accounts:[],d:[],c:[],db:[],dc:[],rows:[],
        
        balancestat:null,trailstat:null,creditsum:null,debitsum:null,bool:"",msg:"",value:0,kind:null,//kind: success,info,warning,danger
        columnDefs: [
            
            { headerName: "Account Name", field: "name",},
            { headerName: "Debit Balance", field: "mvalue", },
            { headerName: "Credit Balance", field: "cvalue", },
            { headerName: "Result", field: "res", },
            
        
     
            
          ],
          columnDefs2: [
            
            { headerName: "Account Debit Name", field: "mname",},
            { headerName: "Account Credit Name", field: "dname", },
            { headerName: "Debit Balance", field: "mvalue", },
            { headerName: "Credit Balance", field: "cvalue", },
            { headerName: "Result", field: "res", },
            
        
     
            
          ],
        };

      
        
         this.Assetaccount = [
            {id:101,name:"Bank/Cash at Bank"},
            {id:108, name:"Deferred Expense"},
            {id:110, name:"Others"},
            {id:112, name:"Accounts Receivable"},
            {id:157, name:"Equipment"},
            {id:130, name:"Prepaid Insurance"}
          
            ]

         this.Liabilityaccount = [
                {id:200,name:"Notes Payable"},
                {id:201, name:"Accounts Payable"},
                {id:209, name:"Unearned Service Revenue"},
                {id:230, name:"Interest Payable"},
                {id:231, name:"Deferred Gross profit"}
              
                ]
         this.Equity = [
            {id:300,name:"Owner Capital"},
            {id:311, name:"Share Capital-Ordinary"},
            {id:320, name:"Retained Earnings"},
            {id:330, name:"Capital contribtions"},
            {id:332, name:"Dividends"}
         ]

        
    

        
    }
    createNotification = (type) => { 
        return () => {
          switch (type) {
            case 'info':
              NotificationManager.info('Info message');
              break;
            case 'success':
              NotificationManager.success('Success message', 'Title here');
              break;
            case 'warning':
              NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
              break;
            case 'error':
              NotificationManager.error('Error message', 'Click me!', 5000, () => {
                alert('callback');
              });
              break;
          }
        };
      };
    setaccNumber(name){
        var n=0;
        switch(name){
            case "Bank/Cash at Bank":
             
                n=101;
                break;
            case "Deferred Expense":
            
                n=108; 
                break;
            case "Others":
                n=110;
                break;
            case "Accounts Receivable":
                n=112;
                break; 
            case "Equipment":
                n=157; 
                break;
            case "Prepaid Insurance":
                n=130; 
                break;
            case "Notes Payable":
                n=200;
                break;
            case "Accounts Payable":
                n=201;
                break;
            case "Unearned Service Revenue":
                n=209;
                break;
            case "Interest Payable":
                n=230;
                break;
            case "Deferred Gross profit":
                n=231;
                break;

            case "Owner Capital":
                n=300;
                break;
            case "Share Capital-Ordinary":
                n=311;
                break;
            case "Retained Earnings":
                n=320; 
                break;
            case "Capital contribtions":
            n=330;
            break;
            case "Dividends":
            n=332;
            break;
            default:
            n=0;
            break;

        }
        return n;
     
}     

 calctrail(a,b){
    return((a>b)? 'Credit '+(a-b).toString() :(a===b)? '0':'Debit '+(b-a).toString() )
  }   
handleDebitAcc(e){
    this.setState({debit:e.target.value});
    this.setState({daccn:this.setaccNumber(e.target.value)});
    
    
    }
handleCreditAcc(e){
        this.setState({credit:e.target.value});
        this.setState({caccn:this.setaccNumber(e.target.value)});
        
    }
     
handledAccVal(e){
    this.setState({dvalue: e.target.value});
 
}
     
handlecAccVal(e){
    this.setState({cvalue: e.target.value});
}   


async ViewTrailBalance() {
    this.setState({balancestat:null});
    this.setState({trailstat:null});
    this.setState({kind:"success"})
 var n=  await axios.get('https://fullstack-accounting-backend.herokuapp.com/getTrailBalance') // eslint-disable-line no-unused-vars
 .then((response) => {


     const data = response.data;

     setTimeout(()=>{this.setState({value:100});},300) 
         
      const res= fixot(data)

     setTimeout(()=>{this.setState({value:0});},2000) 
     setTimeout(()=>{this.setState({kind:null});},2000)

     setTimeout(()=>{this.setState({trailstat:res});},1999)
    
    
   

 
  
   
  
    })
    .catch((err) => {this.setState({kind:"danger"});
    if(n==='undefined'){ 
        NotificationManager.error('Error message', 'Database Connection problem!', 3000);
        this.setState({value:100});
    clearTimeout(this.myVar);
     this.myVar = setTimeout(()=>{this.setState({value:0})}, 2000);  
   
    }else{
        this.setState({kind:"warning"});
        this.setState({value:100});
    NotificationManager.warning('Warrning', 'No transactions yet!', 3000);
        console.log("Error retreiving data",err);
      
        setTimeout(()=>{this.setState({value:0});},2000) 
        this.setState({trailstat:null})
   
    } 
    

 });
     

        
      
    }

 
    

async activateBalance(){
    this.setState({kind:"warning"})
    this.setState({balancestat:null});
    this.setState({trailstat:null});
   var m,n  
 n= await  axios.get('https://fullstack-accounting-backend.herokuapp.com/getBalance') // eslint-disable-line no-unused-vars
    .then((response) => {
        const data = response.data;
        if(data.length==1){
            NotificationManager.warning('Warning message', 'No transactions yet!', 3000);
        }
        setTimeout(()=>{this.setState({value:100});},300) 
       
        
       m= fixo(data);
    
       setTimeout(() => {
        this.setState({value: 0});
      }, 2000)
      setTimeout(() => {
        this.setState({kind: null});
      }, 2000)
  
        setTimeout(()=> {
            this.setState({balancestat:m});
            
           
        
           },1999)
 

       })
    .catch((err) => {      
        if(n==='undefined'){
            NotificationManager.error('Error message', 'Database Connection problem!', 3000);
        this.setState({kind:"danger"}); this.setState({value:100});
       
        clearTimeout(this.myVar);
         this.myVar = setTimeout(()=>{this.setState({value:0})}, 2000);   }

            
        console.log("Error retreiving data",err);
    });

  
}
resetstate(e){
    this.setState({kind:"secondary"})
    setTimeout(()=>{  this.setState({balancestat:null});},1000)
     setTimeout(()=>{this.setState({trailstat:null});},1000)
    this.DisplayBalanceStatement.dd = null;
    setTimeout(()=>{this.setState({value:100});},300) 
    setTimeout(()=>{this.setState({value:0});},2000) 
   
   document.getElementById('dvalue').value = null;
   document.getElementById('cvalue').value = null;
  document.getElementById('select2').selectedIndex = 0 
  document.getElementById('select1').selectedIndex = 0 
  setTimeout(() => {
    this.setState({value: 0});
  }, 1000)
} 
async emptydata(e){
    this.setState({kind:"danger"})
    setTimeout(()=>{this.setState({value:100});},300) 
    setTimeout(()=>{this.setState({value:0});},2000) 
//('https://fullstack-accounting-backend.herokuapp.com/intializeData')
    await  axios.post('https://fullstack-accounting-backend.herokuapp.com/intializeData')
    .then(() => {
       
     console.log("Data has been cleared")
   
       })
    .catch((err) => {
        console.log("Error Emptying data",err.res);
    });


   
}
handleSubmit = async e => {
    NotificationManager.success('You have added a new book!', 'Successful!', 2000); 
    this.setState({kind:"success"})
    setTimeout(()=>{this.setState({value:100});},300) 
    setTimeout(()=>{this.setState({value:0});},2000) 
        e.preventDefault();
    
        
        let data = {
            "credit": this.state.credit,
            "cAccNo": this.state.caccn,
            "debit":this.state.debit,
            "dAccNo":this.state.daccn,
            "cvalue": this.state.cvalue,
            "dvalue": this.state.dvalue,
            
        }
    
    await fetch('https://fullstack-accounting-backend.herokuapp.com/savedata', {
        
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
          },
    })
   
    .then(res => res.json())
    
   
       
        
        
    }
    
 
    DisplayBalanceStatement = (props) => {
 
  
    var u=[{}];

  
    u =props.a1
 
   




  u.sort(compare);

var disdata=[]

if(this.state.bs)
var s= this.state.bs





var dd = null;
var  cc = null;
if(s && typeof s[1] !== 'undefined'){
   dd =s[0].debitbook;
   cc = s[1].creditbook;
 
  }
 
 
    
if(dd)
{

    dd.forEach(element => 
        disdata.push(element)
        );

  
}




if(cc){
    cc.forEach(element => 
        disdata.push(element)
        );
}

  disdata.sort(comparestr)


 if((dd && cc )|| this.state.balancestat){  return ( 
    <div className="ag-theme-alpine" style={ {height: '400px', width: '900px', display:"inline-block"} }>
    <AgGridReact
        columnDefs={this.state.columnDefs}
        groupIncludeFooter={true}
        groupIncludeTotalFooter={true}
       rowData={this.state.balancestat}
  
                >
    </AgGridReact>

          </div>

    );
   
}else if(this.state.trailstat){
    return ( 
        <div className="ag-theme-alpine" style={ {height: '400px', width: '900px', display:"inline-block"} }>
        <AgGridReact
            columnDefs={this.state.columnDefs2}
            groupIncludeFooter={true}
            groupIncludeTotalFooter={true}
           rowData={this.state.trailstat}
      
                    >
        </AgGridReact>
    
              </div>
    
        );

}else return null
     

         

      
      }
           
       
           
    render() { 
     
        return (  
             <div>
        <br /><br />
              <section className="clean-block clean-hero"   >
    
              <div className="text"><p><font color='#2e20a4'><b></b></font></p>

            <table className="table table-borderless table-light">
            <thead className="thead-light">
    <tr>
      <th scope="col" colSpan='4'><font  size = '4' color='#2e20a4'>Fill the balance Sheet</font></th>
    </tr>  
</thead>
<tbody>
      <tr>
      <td> <label htmlFor="exampleFormControlInput1"><font color='#2e20a4'><b>Debit Account : </b></font></label></td>
      </tr>
     
     <tr>
      <td> <label htmlFor="exampleFormControlInput1"><font color='#2e20a4'><select className="form-control" id="select1" onChange={this.handleDebitAcc.bind(this)}>
               <option>Choose</option>
               <optgroup label = "Assets">    
              { this.Assetaccount.map(acc =>  <option key={acc.id}> {acc.name}</option>)}
              </optgroup>
              <optgroup label = "Liabitility">    
              { this.Liabilityaccount.map(acc =>  <option key={acc.id}> {acc.name}</option>)}
              </optgroup>
              <optgroup label = "Equity">    
              { this.Equity.map(acc =>  <option key={acc.id}> {acc.name}</option>)}
              </optgroup>
                  
          </select></font></label></td>

          <td>  <input type="number" onChange={this.handledAccVal.bind(this)} className="form-control" id="dvalue"  placeholder="Account Value"></input></td>
      </tr>
     
   <tr>
    
     <td><label htmlFor="exampleFormControlInput1"><font color='#2e20a4'><b>Credit Account : </b></font></label> </td></tr>
  
     <tr>
     <td>
        
       <select className="form-control" id="select2" onChange={this.handleCreditAcc.bind(this)}>
          <option>Choose</option>
               <optgroup label = "Assets">    
              { this.Assetaccount.map(acc =>  <option key={acc.id}> {acc.name}</option>)}
              </optgroup>
              <optgroup label = "Liabitility">    
              { this.Liabilityaccount.map(acc =>  <option key={acc.id}> {acc.name}</option>)}
              </optgroup>
              <optgroup label = "Equity">    
              { this.Equity.map(acc =>  <option key={acc.id}> {acc.name}</option>)}
              </optgroup>
          </select>   
       </td>
       <td>
       <input type="number" onChange={this.handlecAccVal.bind(this)}  className="form-control" id="cvalue" placeholder="Account Value"></input>  
       </td>
   </tr>
   
 
 <tr><td><button type="button" className="btn btn-primary mb-2" onClick={this.handleSubmit.bind(this)}  > Confirm</button></td>
     <td><button type="reset"  onClick={this.resetstate.bind(this)} className="btn btn-primary mb-2">Reset</button>  </td>
 
 </tr>
<tr  className="table-info"><th scope="col" colSpan='4'><font  size = '4' color='#2e20a4'>View Trail and Balance Sheet</font></th></tr>
 
 <tr><td>   <button type="submit" onClick={this.ViewTrailBalance.bind(this)}  className="btn btn-outline-info"> View Trail Sheet </button></td>

 <td><button type="submit" onClick={this.activateBalance.bind(this)}   className="btn btn-outline-info"> View Balance Sheet</button></td></tr>
 <tr><td colSpan='2'> <button type="reset"  onClick={this.emptydata.bind(this)} className="btn btn-outline-danger">Reset Database</button></td></tr>
 </tbody>
                </table>
           
                </div>       
           
            
                </section>       
           
           
                <NotificationContainer/>
          
           <div> 
           {(this.state.value!==0)?  <ProgressBar animated variant={this.state.kind} now={this.state.value} /> : null}
          
       </div>
          <div className= 'relative' id ='balance'>   
          <this.DisplayBalanceStatement a1={this.state.d} a2={this.state.c}/>  
  
          
     
          </div>

         
              
  
          
           

           
       
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
                    <p>This Website is made by Bootstrap and Reactjs with&nbsp;MongoDB Database to make accounting calculations&nbsp;</p>
                </div>
            </div>
        </section>
   
             </div>

        )
    }
}
export default BalanceStatement 