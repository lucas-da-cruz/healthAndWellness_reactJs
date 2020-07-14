import React, { useState } from 'react';
import useForm from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import {Button} from 'primereact/button';
import {Calendar} from 'primereact/calendar';
import {Password} from 'primereact/password';
import Loading from '../loading';
import Validador from './../../services/util/validador';
import {Link} from 'react-router-dom';

import './../../css/css_general.css';

//SERVICE
import ServicePaciente from './../../services/paciente/ServicePaciente';

export default function Cadastrar (){ 
  
  const { register, handleSubmit, errors } = useForm();
  const [ loading, setLoading ] = useState(false);
  const [dataNascimento, setDataNascimento] = useState(null);
  const [senha, setSenha] = useState();
  const [senhaConfirma, setSenhaConfirma] = useState();

  const [confirmaSenha, setConfirmaSenha] = useState(true);

  const setPassword = (e) => {
    if(e.target.name === "senha") {
      setSenha(e.target.value);
      if(e.target.value.length >= 6 && e.target.value === senhaConfirma){
        setConfirmaSenha(false);
      } else {
        setConfirmaSenha(true);
      }
    } else {
      if(e.target.name === "senhaConfirma"){
        setSenhaConfirma(e.target.value);
        if(e.target.value.length >= 6 && e.target.value === senha){
          setConfirmaSenha(false);
        } else {
          setConfirmaSenha(true);
        }
      }
    }
  };

  const convertDate = (str) => {
    var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    setDataNascimento([day, mnth, date.getFullYear()].join("/"));
  }

  const onSubmit = data => {
    setLoading(true);
    data.birth_date = dataNascimento;
    data.password = senha;
    ServicePaciente.insertPacienteBanco(data).then( retorno => {
      console.log(retorno.json());
      console.log("Requisição feita...")
      alert("Parabéns, você foi cadastrado com sucesso!");
      document.location.assign('/');
    }).catch(error => {
      console.log(error);
      if(error.code === "auth/invalid-email"){
        alert('Email em formato inválido.');
      } else {
        if(error.code === "auth/weak-password"){
        alert("Senha fraca, tamanho mínimo de 6 caracteres.");
        } else {
          alert("Ops, algum erro em seu cadastro: " + error.code)
        }
    }
    });
  }

  return (
    <div>
      <Container>
          {loading ?
          <Loading/> :
          <div>
          <br/>
          <center><h2>Criar uma nova conta</h2></center><br/><br/>
          <form onSubmit={handleSubmit(onSubmit)}>
          <Row className="justify-content-md-center">
            <Col lg={4} md={10}>
              <br/>
              <Form.Label className="required">Nome completo</Form.Label>
              <Form.Control type="text" name="name" maxLength="50" ref={register({required:true, maxLength: 50})}
               placeholder="Insira aqui seu nome completo"/>
              {errors.nome && errors.nome.type === "required" && <span className="alertField">Campo nome é obrigatório</span>}
              {errors.nome && errors.nome.type === "maxLength" && <span className="alertField">O tamanho máximo é de 50 caracteres</span> }
            </Col>
            <Col lg={4} md={10}>
              <br/>
              <Form.Label>Telefone</Form.Label><br/>
              <Form.Control type="text" name="contact" maxLength="14" ref={register({maxLength: 14})}
               placeholder="Insira aqui seu ddd e telefone (apenas números)" onKeyUp={(e) => Validador.formatNumber(e)}/>
              {errors.telefone && errors.telefone.type === "maxLength" && <span className="alertField">O tamanho máximo é de 11 números</span> }
            </Col>
            <Col lg={4} md={10}>
              <br/>
              <Form.Label>Data nascimento</Form.Label><br/>
              <Calendar onChange={(e) => convertDate(e.target.value)} dateFormat="dd/mm/yy"
              monthNavigator={true} yearNavigator={true} yearRange="1900:2020" placeholder="dd/mm/aaaa"/>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col lg={4} md={10}>
              <br/>
              <Form.Label className="required">Email</Form.Label>
              <Form.Control type="email" name="email" maxLength="50" ref={register({required:true, maxLength: 50})}
               placeholder="Insira aqui seu email"/>
              {errors.email && errors.email.type === "required" && <span className="alertField">Campo email é obrigatório</span>}
              {errors.email && errors.email.type === "maxLength" && <span className="alertField">O tamanho máximo é de 50 caracteres</span> }
            </Col>
            <Col lg={4} md={10}>
              <br/>
              <Form.Label className="required">Senha (mínimo de 6 catacteres)</Form.Label><br/>
              <Password size="30" autoComplete="off" onChange={(e) => setPassword(e)} name="senha" weakLabel="Senha fraca" mediumLabel="Senha média" strongLabel="Senha forte"
              placeholder="Insira aqui sua senha" />
            </Col>
            <Col lg={4} md={10}>
              <br/>
              <Form.Label  className="required">Confirmação de senha</Form.Label><br/>
              <Password size="30" autoComplete="off" onChange={(e) => setPassword(e)} name="senhaConfirma" weakLabel="Senha fraca" mediumLabel="Senha média" strongLabel="Senha forte"
              placeholder="Confirme sua senha"/><br/>
              {confirmaSenha?
                <span className="alertField">As senhas devem coincidir</span> 
                : null
              }
              
            </Col>
          </Row>
          <Row lg={6} className="justify-content-md-center">
              <Col>
                <br/><br/><br/>
                <center>
                  <Link to="/">
                    <Button label="Voltar" className="p-button-secondary"/>
                  </Link>
                </center>
              </Col>
              <Col>
                <br/><br/><br/>
                <center>
                  <Button disabled={confirmaSenha} label="Cadastrar-se" size="45" className="p-button-danger" type="submit"/>
                </center>
              </Col>
            </Row>
          </form>
          <br/><br/><br/><br/><br/>
          </div>
          }
        </Container>
      </div>
  )
}