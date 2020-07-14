import React, { useState, useRef  } from 'react';
import useForm from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import {Button} from 'primereact/button';
import {Password} from 'primereact/password';
import Loading from '../loading';
import firebase from './../../config/fireConnection';
import {Link} from 'react-router-dom';
import {Messages} from 'primereact/messages';

import './../../css/css_general.css';

export default function Cadastrar (){
  let messages = useRef(null);

  const {  handleSubmit } = useForm();
  const [ loading, setLoading ] = useState(false);
  const [senha, setSenha] = useState();
  const [senhaConfirma, setSenhaConfirma] = useState();
  const [atualPassword, setAtualPassword] = useState();

  const [confirmaSenha, setConfirmaSenha] = useState(true);

  const showPasswordUpdated = () => {
    messages.current.show({severity: 'success', summary: 'Sua senha foi atualizado com sucesso'});
    setLoading(false);
  };

  const showFailedUpdated = (message) => {
    messages.current.show({severity: 'error', summary: message});
    setLoading(false);
  };

  const setPassword = (e) => {
    if(e.target.name === "senhaAtual"){
        setAtualPassword(e.target.value);
        if(senhaConfirma >= 6 && senhaConfirma === senha)
        setConfirmaSenha(false);
    }
        if(e.target.name === "senha") {
            setSenha(e.target.value);
            if(e.target.value.length >= 6 && e.target.value === senhaConfirma){
                if(atualPassword !== undefined && atualPassword !== "" & atualPassword !== null) 
                    setConfirmaSenha(false);
              
            } else {
              setConfirmaSenha(true);
            }
          } else {
            if(e.target.name === "senhaConfirma" ){
              setSenhaConfirma(e.target.value);
              if(e.target.value.length >= 6 && e.target.value === senha){
                if(atualPassword !== undefined && atualPassword !== "" & atualPassword !== null) 
                setConfirmaSenha(false);
              } else {
                setConfirmaSenha(true);
              }
            }
        }
  };

  const onSubmit = data => {
      setLoading(true);
      firebase.reLogin(atualPassword).then(() => {
        firebase.updatePassWord(senha).then(() => {
            showPasswordUpdated();
          }).catch(error => {
            console.log(error.code);
            showFailedUpdated('Ops, algo de errado aconteceu: ' + error.code);
          });
      }).catch(error => {
        if(error.code === 'auth/wrong-password'){
            showFailedUpdated('Sua atual senha foi inserida incorretamente!');
        } else {
            console.log(error);
            showFailedUpdated('Ops, algo de errado aconteceu: ' + error.code);
        } 
      });
      setAtualPassword("");
      setSenha("");
      setSenhaConfirma("");
      
  }

  return (
    
    <div>
      <Container>
        <br/>
        <center><h2>Alterar senha</h2></center><br/>
        <Messages ref={messages} life={8000} />
        {loading ?
            <Loading/> :
        <div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
        <Row className="justify-content-md-center">
            <Col lg={4} md={12}>
              <br/>
              <Form.Label className="required">Senha atual</Form.Label><br/>
                <Password
                    size="40"
                    autoComplete="off"
                    name="senhaAtual"
                    weakLabel="Senha fraca"
                    mediumLabel="Senha média"
                    strongLabel="Senha forte"
                    onChange={(e) => setPassword(e)}
                    placeholder="Insira aqui sua atual senha"
                />
            </Col>
            <Col lg={4} md={12} xs={12}>
                <br/>
                <Form.Label className="required">Nova senha (mínimo de 6 catacteres)</Form.Label><br/>
                <Password
                    size="40"
                    autoComplete="off"
                    onChange={(e) => setPassword(e)}
                    name="senha"
                    weakLabel="Senha fraca"
                    mediumLabel="Senha média"
                    strongLabel="Senha forte"
                    placeholder="Insira aqui sua nova senha"
                /> 
            </Col>
            <Col lg={4} md={12} xs={12}>
                <br/>
                <Form.Label  className="required">Confirmação de senha</Form.Label><br/>
                <Password
                    size="40"
                    autoComplete="off"
                    onChange={(e) => setPassword(e)}
                    name="senhaConfirma"
                    weakLabel="Senha fraca"
                    mediumLabel="Senha média"
                    strongLabel="Senha forte"
                    placeholder="Confirme sua nova senha"
                />
                <br/>
                {confirmaSenha?
                    <span className="alertField">As senhas devem coincidir</span> 
                    : null
                }
            </Col>
        </Row>
        <Row lg={6} md={12} className="justify-content-md-center">
            <Col xs lg="2">
              <br/><br/><br/>
              <center>
                <Link to="/perfil">
                    <Button label="Voltar" className="p-button-secondary" />
                </Link>
              </center>
            </Col>
            <Col xs lg="3">
              <br/><br/><br/>
              <center>
                <Button disabled={confirmaSenha} label="Atualizar" className="p-button-danger" type="submit"/>
              </center>
            </Col>
        </Row>
        </form>
        <br/><br/><br/><br/><br/><br/>
        </div>
        }
        </Container>
      </div>
  )
}