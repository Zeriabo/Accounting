import React, {Component,useEffect,useState} from 'react'
import axios from 'axios';

 class activateBalance extends Component{
    constructor(props) {
        super(props);
       

    }

   getTrail(){
    const  [items,setItems] =  useState(""); 
    axios.get('/getTrailBalance')
    .then(response => response.json())
    .then(json => setItems(json))
    .then(console.log(items))
    .catch(() => {
        console.log("Error retreiving data",items);
    });
  
}
  
  
  }

  export default activateBalance 