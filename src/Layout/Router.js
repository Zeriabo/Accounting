import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import BalanceStatement from './BalanceStatement';
import Result from './Result'
import IncomeStatement from './IncomeStatement';


const Router = (props) => (<Switch>
<Route exact path='/' component={Home}/>
<Route  path='/Home' component={Home}/>
<Route path="/BalanceStatement" component={BalanceStatement} />
<Route path="/IncomeStatement" component={IncomeStatement} />
<Route path="/Result" component={Result} />


</Switch>)
export default Router;