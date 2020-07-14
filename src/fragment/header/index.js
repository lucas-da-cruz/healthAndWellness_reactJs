import React, {Component} from 'react';
import { Button } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import './header.css';
import firebase from './../../config/fireConnection';

export default class Header extends Component{

  constructor(props){
    super(props);
    this.state = {
      nome: localStorage.nome
    };
    this.logout = this.logout.bind(this);
  }

  logout = async () => {
   await firebase.logout()
   .catch((error)=>{
     console.log(error);
   });
   localStorage.removeItem("nome");
   
   document.location.assign('/');
 }

  render(){
    
    return(
    <header id="main-header">
      <div className="header-content">
        <Link to="/">
          Health and Wellness
        </Link>
          <Button inverted onClick={()=> this.logout()}>Sair</Button>       
      </div>
    </header>
  );
}
}
