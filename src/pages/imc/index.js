import React, { useState } from 'react';
import useForm from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import {Button} from 'primereact/button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ImcService from './../../services/imc/ImService';
import Container from 'react-bootstrap/Container';
import "./../../css/css_general.css"
import Validador from './../../services/util/validador';

export default function Imc() {

  const { register, handleSubmit, errors } = useForm();
  const [ showStatus, setShowStatus ] = useState();
  const [ showAlert, setshowAlert ] = useState(false);

  const [ altura, setAltura ] = useState("");
  const [ peso, setPeso ] = useState("");
  const [ buttonVisible, setButtonVisible ] = useState(true);

  const habilitaButton = (e) => {
    if(e.target.name === "peso") {
      setPeso(e.target.value);
    } else {
      if(e.target.name === "altura") {
        setAltura(e.target.value);
      }
    }

    //if(altura !== "" || peso !== ""){
    if(altura === "" || peso === ""){
      setButtonVisible(false);
    } else {
      setButtonVisible(true);
    }
  };

  const onSubmit = data => {
    let valor =  ImcService.calculaImc(data);

    setshowAlert(true);
    setShowStatus(valor);
    window.scrollTo(0, 1000);
  };

  return (
    <Container>
      <div >
        <br/>
      <center><h1>Índice de Massa Corporal (IMC)</h1></center>
      <br/>
          <p align="justify">Uma das maneiras de saber se o seu peso está adequado à sua altura é calculando o <b>Índice de Massa Corporal (IMC)</b>.
          O resultado dessa fórmula matemática poderá indicar, por exemplo, se você está com peso adequado,
          se apresenta magreza, sobrepeso ou obesidade.</p>
          <p alighn="justify">Considere apenas como um ponto de partida,
          pois o IMC não avalia o seu estado nutricional como todo e precisa ser interpretado por um 
          profissional de saúde, que analisará uma série de outras medidas e características suas, como idade,
          sexo, percentual de gordura, entre outros aspectos, antes de um diagnóstico.</p>
          <form onSubmit={handleSubmit(onSubmit)}>
          <center><h2>Consulta de IMC</h2></center><br/>
          <Row className="justify-content-md-center">
            <Col lg={6} md={10}>
                <Form.Label>Peso</Form.Label>
                <Form.Control name="peso" type="text" maxLength="3" onKeyUp={(e) => Validador.formatJustNumber(e)} ref={register({required:true, min: 1, max: 3})} placeholder="Insira seu peso em kg" />
                {errors.peso && errors.peso.type === "required" && <span className="alertField">Campo peso é requerido</span>}
            </Col>
            <Col lg={6} md={10}>
              <Form.Label>Altura</Form.Label>
              <Form.Control name="altura" type="text" onChange={(e) => habilitaButton(e)} maxLength="3" onKeyUp={(e) => Validador.formatJustNumber(e)} ref={register({required:true, maxlength: 2})} placeholder="Insira sua altura em cm" />
              {errors.altura && errors.altura.type === "required" && <span className="alertField">Campo altura é requerido</span>}
            </Col>
          </Row>
          <br/><br/>
          <Row>
            <Col className="justify-content-md-center">
              {showAlert?
              <center>
                <h3>{showStatus}</h3>
              <br/><br/>
              </center> 
              : null}
            </Col>
          </Row>
          <Row>
            <Col className="justify-content-md-center">
              <center>
                <Button label="Calcular" disabled={buttonVisible} className="p-button-danger" type="submit"/>
              </center>
              <br/><br/><br/><br/><br/>
            </Col>
          </Row>
        </form>
        <br/><br/>
        
      </div>
    </Container>
  );
}