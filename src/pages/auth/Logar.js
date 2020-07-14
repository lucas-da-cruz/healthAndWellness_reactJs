import React, {Component} from 'react';
import firebase from './../../config/fireConnection';
import {Link, withRouter} from 'react-router-dom';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import logo from './../../img/logo.png';
import medico_na_consulta from './../../img/medico_na_consulta.jpg';

import {Messages} from 'primereact/messages';

import './Logar.css';
import './../../css/css_general.css';

class Logar extends Component{

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      emailToChange: '',
      resetSenha : false,
    };

    this.entrar = this.entrar.bind(this);
    this.login = this.login.bind(this);

    this.resetPassword = this.resetPassword.bind(this);
    this.changePassword = this.changePassword.bind(this);

    //Message
    this.showSuccess = this.showSuccess.bind(this);
    this.showError = this.showError.bind(this);
  }

  componentDidMount(){
    firebase.isInitialized().then(resultado => {
      if(resultado){
        return this.props.history.replace('/');
      }
      // Devolve o usuario
    })
  }

  showSuccess() {
    this.messages.show({severity: 'success', summary: 'Um email para redefinição de senha foi enviado com sucesso' });
  }
  
  showError(messagem) {
    this.messages.show({severity: 'error', summary: messagem });
  }

  entrar(e){
    e.preventDefault();

    this.login();
  }

  login = async () => {

    const {email, password} = this.state;

      await firebase.login(email, password).then(() => {
        localStorage.setItem('access', 'user');
        localStorage.setItem('accessToken', firebase.getAccessToken());
        localStorage.setItem('refreshToken', firebase.getRefreshToken());

        document.location.assign('/');
      })
      .catch((error)=>{
        this.setState({password: ''});
        if(error.code === 'auth/user-not-found'){
          this.showError('Email não encontrado em nosso sistema');
        }else{
          if(error.code === 'auth/wrong-password'){
            this.showError('Ops, senha incorreta, tente novamente');
          } else {
            this.showError('Ops, algo de errado aconteceu: ' + error.code);
            return null;
          }
      }
      });
  }

  resetPassword(e){
    e.preventDefault();
    this.changePassword();
  }

  changePassword = async () => {
    const {emailToChange} = this.state;
    
    await firebase.sendPasswordToResetEmail(emailToChange).then(() => {
      this.showSuccess();
      // Email sent.
    }).catch((error) => {
      if(error.code === 'auth/user-not-found'){
        this.showError('Email não encontrado em nosso sistema');
      } else { 
        this.showError('Ops, algo de errado aconteceu: ' + error.code);
        console.log(error);
      }
    });
    this.setState({emailToChange: ''});
    this.setState({resetSenha: false});

  }

  render(){
    return(
        <div>
        <Container>
          <Messages ref={(el) => this.messages = el} life={8000}/>
          <section>
          <br/>
          <Row className="justify-content-md-center">
          <Col lg={4} md={12}>

          {!this.state.resetSenha?
          <div>
            <center><h2>Login</h2></center>
            <center>
            <br/><br/>
            <form onSubmit={this.entrar} id="login">
              <table>
                <thead>
                  <tr>
                    <th>
                      <label>Email</label><br/>
                      <InputText type="email" size="40" autoComplete="off" value={this.state.email} 
                        onChange={(e) => this.setState({email: e.target.value})} placeholder="Insira aqui seu email"/>
                      </th>
                      </tr>
                      <tr>
                        <th>
                        <label>Senha</label> <br/>
                        <InputText type="password" size="40" autoComplete="off" value={this.state.password}
                        onChange={(e) => this.setState({password: e.target.value})} placeholder="Insira aqui sua senha" />
                      </th>
                      </tr>
                      <tr>
                        <th>
                        <br/>
                          <center>
                            <Button label="Entrar" className="p-button-danger" size="45" type="submit"/>
                          </center>
                        </th>
                      </tr>
                      <tr>
                        <th>
                          <center>
                            <Link onClick={() => this.setState({resetSenha: true})} >Esqueceu sua senha?</Link>
                          </center>
                          <center>
                            <Link to="/cadastro">Ainda não possui uma conta?</Link>
                          </center>
                          <br/><br/>
                        </th>
                      </tr>
                      </thead>
                    </table>
              </form>
          </center>
          </div>
          : <div>
            <center><h2>Redefinir senha</h2></center>
                <center>
                  <br/><br/>
                  <form onSubmit={this.resetPassword} id="resetPassword">
                    <table>
                      <thead>
                        <tr>
                          <th colspan="2">
                            <label>Email para recuperação</label><br/>
                            <InputText 
                              type="email"
                              size="40"
                              autoComplete="off"
                              value={this.state.emailToChange} 
                              onChange={(e) => this.setState({emailToChange: e.target.value})}
                              placeholder="Insira aqui o email de recuperação"
                            />
                            <br/>
                            <span>Uma mensagem contendo o link de recuperação da senha será enviado para o endereço.</span>
                          </th>
                        </tr>
                        <tr>
                          <th>
                            <br/>
                            <center>
                              <Button
                              label="Voltar" 
                              className="p-button-secondary"
                              onClick={(e) => this.setState({resetSenha: false})}
                              />
                            </center>
                          </th>
                          <th>
                            <br/><br/>
                            <center>
                            <Button 
                              label="Enviar email"
                              className="p-button-danger"
                              size="45"
                              type="submit"
                            />
                            </center>
                          </th>
                        </tr>
                      </thead>
                    </table>
                  </form>
                </center>
          </div>
          }
            </Col>

            <Col lg={8} md={12}>
              <center>
                <h2>Nosso propósito</h2>
                <br/>
              </center>
              <p>O <b>Health and Wellness</b> é um sistema de controle de prontuário pessoal,
                no qual busca dar a oportunidade de carregar consigo mesmo todo seu histórico 
                de consulta e exame, trazendo a comodidade e liberdade de migrar de hospitais/médicos
                levando todos seus antecedentes de saúde.
              </p>
              <center>
                <img src={logo} alt="Logo da Health and Wellness" style={{width:'70%'}}/>
              </center>
              <p>Crie seu <Link to="/cadastro">cadastro</Link> e experimente a independência do seu prontuário na palma da sua mão.</p>
              <br/>
            </Col>
            <br/>
          </Row>
          <Row >
            <Col lg={4} md={12}>
              <center>
                <h2>Como funciona?</h2>
              </center>
              <br/>
              <p>O uso do sistema é simples, quando o paciente comparecer em alguma consulta médica, basta ele gerar e conceder um token de
                 acesso ao médico da consulta, o médico por si só poderá visualizar o histórico de saúde do paciente, informações como exames salvos e
                 consultas registradas estarão de fácil acesso, o médico também poderá inserir dados relacionados aos atuais sintomas, diagnósticos e
                 medicações referente a análise feita em você.
              </p>
            </Col>
            <Col lg={8} md={12}>
              <center>
                <img 
                  src={medico_na_consulta}
                  alt="Mesa de um consultório com médico e paciente apertando a mão um do outro" 
                  style={{width:'100%'}}
                />
              </center><br/>
              <p></p>
            </Col>
            </Row>
          </section>
          <br/><br/><br/><br/>
          </Container>        
      </div>
    );
  }
}

export default withRouter(Logar);