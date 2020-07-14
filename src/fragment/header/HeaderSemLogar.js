import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './header.css';

export default class HeaderSemLogar extends Component{

  render(){
    
    return(
    <header id="main-header">
      <div className="header-content">
        <Link to="/">
          Health and Wellness
        </Link>
      </div>
    </header>
  );
}
}
