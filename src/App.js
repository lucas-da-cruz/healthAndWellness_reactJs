import React, {Component} from 'react';
import Routes from './Routes';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";

export default class App extends Component{

  render(){
    return(
      <Routes/>
    )
  }
}