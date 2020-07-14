import React, { useState, useEffect, useRef } from 'react';
import useForm from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import {Button} from 'primereact/button';
import Loading from '../loading';
import {Link} from 'react-router-dom';
import {Messages} from 'primereact/messages';

//SERVICE
import ServiceConsulta from './../../services/consulta/ServiceConsulta';

import './../../css/css_general.css';

export default function EditaConsulta (){
  let messages = useRef(null);

  const { register, handleSubmit, errors } = useForm();
  const [loading, setLoading] = useState(false);
  const [consulta, setConsulta] = useState([]);
  const [medico, setMedico] = useState([]);
  const [stateEdit, setStateEdit] = useState(true);

  useEffect(() => {
    setLoading(true);

    var url = window.location.pathname;
    var idConsulta = url.split("/")[2];
    ServiceConsulta.getConsulta(idConsulta)
    .then(response => getConsulta(response))
    .catch((erro) => {
      console.log(erro);
    });

    window.setTimeout(function() {
      setLoading(false);
    }, 1500);
  }, []);

  const getConsultaUpdated = () => {
    var url = window.location.pathname;
    var idExame = url.split("/")[2];

    ServiceConsulta.getConsulta(idExame)
    .then(response => getConsulta(response))
    .catch((erro) => {
      console.log(erro);
    });
  }

  const getConsulta = (response) => {
    response.json().then(data => {
      setConsulta(data.data);
      setMedico(data.data.doctor);
    }).catch((erro) => {
      console.log(erro);
    });
  }

  const onSubmit = data => {
    setLoading(true);
    data.id = consulta.id;
    data.doctor = medico;
    data.date = consulta.date;
    ServiceConsulta.atualizaConsulta(data).then(response => {
      if(response.status === 200){
        showSuccess();
        getConsultaUpdated();
      } else {
        showFailMessage();
      }      
    })
    .catch((erro) => {
      console.log(erro);
    });

    window.setTimeout(function() {
      setLoading(false);
    }, 1500);
  }

  const showSuccess = () => {
    window.scrollTo(0, 0);
    messages.current.show({severity: 'success', summary: 'Consulta atualizada com sucesso'});
  };

  const showFailMessage = () => {
    window.scrollTo(0, 0);
    messages.current.show({severity: 'error', summary: 'Ops, algo inesperado aconteceu'});
  };

  const updateTitle = (value) => {
    consulta.name = value;
    setConsulta(consulta);
  };

  const updateSymptom = (value) => {
    consulta.symptom = value;
    setConsulta(consulta);
  };

  const updateDiagnosis = (value) => {
    consulta.diagnosis = value;
    setConsulta(consulta);
  };

  const updateMedication = (value) => {
    consulta.medication = value;
    setConsulta(consulta);
  };

  return (
    <div>
      <Container>
      <Messages ref={messages} />
        {loading ?
          <Loading/> :
          <div>
          <br/>
          <center>
            <h2>Consulta</h2>
          </center>
          <br/>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row className="justify-content-md-center">
              <Col lg={4} md={12}>
                <br/>
                <Form.Label>Nome médico</Form.Label>
                <Form.Control
                  type="text"
                  name="nome_med"
                  maxLength="50"
                  ref={register({required:true, maxLength: 50})}
                  defaultValue={medico.name}
                  disabled={true}
                  placeholder="Insira aqui seu nome completo"
                />
                {errors.nome && errors.nome.type === "required" && <span className="alertField">Campo nome é obrigatório</span>}
                {errors.nome && errors.nome.type === "maxLength" && <span className="alertField">O tamanho máximo é de 50 caracteres</span> }
              </Col>
              <Col lg={4} md={12}>
                <br/>
                <Form.Label className="required">Título da consulta</Form.Label>
                <Form.Control
                type="text"
                name="title"
                maxLength="50"
                ref={register({required:true, maxLength: 50})}
                placeholder="Insira aqui o título da consulta"
                defaultValue={consulta.title}
                disabled={stateEdit}
                onChange={(e) => updateTitle(e.target.value)}               
                />
                {errors.titulo && errors.titulo.type === "required" && <span className="alertField">Campo título é obrigatório</span>}
                {errors.titulo && errors.titulo.type === "maxLength" && <span className="alertField">O tamanho máximo é de 50 caracteres</span> }
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col lg={4} md={12}><br/>
                <Form.Label className="required">Sintomas</Form.Label><br/>
                <Form.Control
                  as="textarea"
                  rows="5"
                  cols="30"
                  placeholder="Insira aqui os sintomas"
                  maxLength="240"
                  name="symptom"
                  ref={register({required:true, maxLength: 240})}
                  defaultValue={consulta.symptom}
                  disabled={stateEdit}
                  onChange={(e) => updateSymptom(e.target.value)}
                />
                {errors.sintoma && errors.sintoma.type === "required" && <span className="alertField">Campo sintomas é obrigatório</span>}
                {errors.sintoma && errors.sintoma.type === "maxLength" && <span className="alertField">O tamanho máximo é de 240 caracteres</span> }
              </Col>
              <Col lg={4} md={12}><br/>
                <Form.Label>Diagnóstico(CID)</Form.Label><br/>
                <Form.Control
                  as="textarea"
                  rows="5"
                  cols="30"
                  placeholder="Insira aqui o diagnóstico"
                  maxLength="240"
                  name="diagnosis"
                  ref={register({maxLength: 240})}
                  defaultValue={consulta.diagnosis}
                  disabled={stateEdit}
                  onChange={(e) => updateDiagnosis(e.target.value)}
                />
              </Col>
              <Col lg={4} md={12}><br/>
                <Form.Label>Medicação</Form.Label><br/>
                <Form.Control
                  as="textarea"
                  rows="5"
                  cols="30"
                  placeholder="Insira aqui a medicação"
                  maxLength="240"
                  name="medication"
                  ref={register({maxLength: 240})}
                  defaultValue={consulta.medication}
                  disabled={stateEdit}
                  onChange={(e) => updateMedication(e.target.value)}
                />
              </Col>
            </Row>
            {stateEdit ?
              <Row>
                <Col className="justify-content-md-center">
                  <br/><br/><br/>
                  <center>
                    <Link onClick={() => setStateEdit(false)}>Editar consulta</Link>
                  </center>
                </Col>
              </Row> 
           :
            <Row lg={6} className="justify-content-md-center">
                <Col>
                    <br/><br/><br/>
                    <center>
                        <Link to='/historicoConsulta'>
                            <Button label="Voltar" className="p-button-secondary"/>
                        </Link>
                    </center>
                </Col>
                <Col>
                    <br/><br/><br/>
                    <center>
                    <Button
                      label="Atualizar"
                      className="p-button-danger"
                      title="Submit"
                      type="submit"/>
                    </center>
                </Col>
            </Row>
            }
          </form>
          <br/><br/><br/><br/><br/><br/>
          </div> }
        </Container>
      </div>
  )
}