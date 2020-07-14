import React from 'react';
import logo from './../../img/logo.png';

export default function Home() {

  return (
    <div>
      <br/>
        <center>
        <h2>Seja bem-vindo ao <b>Health and Wellness</b></h2>
        </center>
        <br/>
        <center>
          <img src={logo} alt="Logo da Health and Wellness" style={{width:'50%'}}/>
        </center>
    </div>
  );
}