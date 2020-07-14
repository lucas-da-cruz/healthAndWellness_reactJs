import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import firebase from './config/fireConnection';
//FRAGMENT
import MenuBar from './fragment/menuBar';
import MenuBarSemLogar from './fragment/menuBar/menuBarSemLogar';
import Header from './fragment/header';
import HeaderSemLogar from './fragment/header/HeaderSemLogar';
import Footer from './fragment/footer';

//PAGES
import Cadastrar from './pages/auth/Cadastrar';
import Logar from './pages/auth/Logar';
import Home from './pages/home';
import ErrorUrl from './pages/error';
import ErrorUrlToken from './pages/error/errorTokenLogado';
import novaConsulta from './pages/consulta/novaConsulta';
import historicoConsulta from './pages/consulta/historicoConsulta';
import editaConsulta from './pages/consulta/editaConsulta';
import historicoExame from './pages/exame/historicoExame';
import novoExame from './pages/exame/novoExame';
import editaExame from './pages/exame/editaExame';
import perfil from './pages/perfil';
import resetSenha from './pages/resetSenha';
import Imc from './pages/imc';
import GenerateToken from './pages/generate_token';
import GenerateQrCode from './pages/generate_token/generateQrCode';
import getToken from './pages/getToken';
import Loading from './pages/loading';
import ServicePaciente from './services/paciente/ServicePaciente';

class Routes extends Component{

  state = {
    firebaseInitialized: null
  };

  componentDidMount(){
    firebase.isInitialized().then(resultado => {
      if(resultado == null){
        resultado = false;
      } else {
        ServicePaciente.getPaciente().then(response => {
          response.json().then(data => {
            localStorage.setItem('userId', data.data.id);
          }).catch((erro) => {
            console.log(erro);
          })
        })
        .catch((erro) => {
          console.log(erro);
        });
      }
      // Devolve o usuario
      this.setState({firebaseInitialized: resultado});
    })
  }

  render(){
    return this.state.firebaseInitialized === false ? (
      <BrowserRouter>
        <HeaderSemLogar/>
        {this.state.firebaseInitialized == null ?
          <Loading/>
          : 
          <Switch>
            <Route exact path="/cadastro" component={Cadastrar}/>
            <Route exact path="/" component={Logar}/>
            <Route exact path="/getToken/:token" component={getToken}/>
            <Route path="*" component={Logar}/>
          </Switch>
        }
        <Footer/>
      </BrowserRouter>
    ) : (
      <BrowserRouter>
        <Header/>
        {this.state.firebaseInitialized == null ?
          <Loading/>
          :
        <div>
          {
          localStorage.getItem('access') === 'token' ?
          <div>
            <MenuBarSemLogar/>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/novaConsulta" component={novaConsulta}/>
              <Route exact path="/historicoConsulta" component={historicoConsulta}/>
              <Route exact path="/consulta/:id" component={editaConsulta}/>
              <Route exact path="/historicoExame" component={historicoExame}/>
              <Route exact path="/novoExame" component={novoExame}/>
              <Route exact path="/exame/:id" component={editaExame}/>
              <Route exact path="/imc" component={Imc}/>
              <Route exact path="/getToken" component={ErrorUrlToken}/>
              <Route exact path="/getToken/:token" component={ErrorUrlToken}/>
              <Route path="*" component={ErrorUrl}/>
            </Switch>
          </div>
          :
          <div>
            <MenuBar/>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/novaConsulta" component={novaConsulta}/>
                <Route exact path="/historicoConsulta" component={historicoConsulta}/>
                <Route exact path="/consulta/:id" component={editaConsulta}/>
                <Route exact path="/historicoExame" component={historicoExame}/>
                <Route exact path="/novoExame" component={novoExame}/>
                <Route exact path="/exame/:id" component={editaExame}/>
                <Route exact path="/imc" component={Imc}/>
                <Route exact path="/perfil" component={perfil}/>
                <Route exact path="/resetSenha" component={resetSenha}/>
                <Route exact path="/generateToken" component={GenerateToken}/>
                <Route exact path="/token/generate" component={GenerateQrCode}/>
                <Route exact path="/getToken" component={ErrorUrlToken}/>
                <Route exact path="/getToken/:token" component={ErrorUrlToken}/>
                GenerateQrCode
                <Route path="*" component={ErrorUrl}/>
              </Switch>
            </div>
          }
        </div>
        }
        <Footer/>
      </BrowserRouter>
    );
  }
}

export default Routes;