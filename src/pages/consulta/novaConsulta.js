import React, {useEffect, useState, useRef } from 'react';
import useForm from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import {Button} from 'primereact/button';
import {Dropdown} from "primereact/dropdown";
import {RadioButton} from 'primereact/radiobutton';
import {Calendar} from 'primereact/calendar';
import {Messages} from 'primereact/messages';
import Loading from '../loading';

//SERVICE
import Validador from './../../services/util/validador';
import ServiceConsulta from './../../services/consulta/ServiceConsulta';
import ServiceMedico from './../../services/medico/ServiceMedico';

import './../../css/css_general.css';

export default function NovaConsulta (){
  let messages = useRef(null);

  const { register, handleSubmit, errors } = useForm();
  const [medicoCadastrado, setMedicoCadastrado] = useState(true);
  const [loading, setLoading] = useState(true);
  const [idMedico, setIdMedico] = useState("Informe seu CRM");
  const [id_espec, setId_espec] = useState("Informe sua especialidade");
  const [dataConsulta, setDataConsulta] = useState(null);
  const [medicosCrm, setMedicosCrm] = useState([]);

  useEffect(() => {
    setLoading(true);
    ServiceMedico.listaMedico().then(response => {
      response.json().then(data => {
        let crm_temp = [];
        var i;
        for (i = 0; i < data.data.length; i++) {
          crm_temp.push({label: data.data[i].crm, value: data.data[i].crm});
        }
        setMedicosCrm(crm_temp);
      }).catch((erro) => {
        console.log(erro);
      })
    })
    .catch((erro) => {
      console.log(erro);
    });

    window.setTimeout(function() {
      setLoading(false);
    }, 2000);

  }, []);

  const onSubmit = data => {
    setLoading(true);
    if(medicoCadastrado === true){
      insertConsulta(data)
      .then(retorno => {
        showSuccess();
      }).catch(error => {
        console.log(error);
        showError();
      });
    }
    if(medicoCadastrado === false){
      insertMedico(data).then(retorno => {        
        insertConsulta(data).then(retorno => {
          showSuccess();
        }).catch(error => {
          console.log(error);
          showError();
        });
      }).catch(error => {
        console.log(error);
        showError();
      });
    }

    window.setTimeout(function() {
      setLoading(false);
    }, 2000);
  }

  const insertConsulta = (data) => {
    data.doctor = idMedico;
    data.date = dataConsulta;
    console.log(data);
    return ServiceConsulta.insertConsulta(data);
  }

  const insertMedico = (data) => {
    var doctor = {
      crm : data.crm,
      name : data.nome_med,
      contact : data.contato_med,
      doctor_specialty : Number(id_espec),
    }
    return ServiceMedico.insertMedico(doctor);
  }
 
  const setCRMMedico = (e) => {
    console.log(e.value);
    setIdMedico(e.value);
  }

  const setEspecialidadeMedico = (e) => {
    setId_espec(e.value);
  }

  const showSuccess = () => {
    window.scrollTo(0, 0);
    messages.current.show({severity: 'success', summary: 'Consulta cadastrada com sucesso'});
  };

  const showError = () => {
    window.scrollTo(0, 0);
    messages.current.show({severity: 'error', summary: 'Ops, algo inesperado aconteceu'});
  };

  const medicoJaCadastrado = (e) => {
    setLoading(true);
    if(e.value === "sim"){
      setMedicoCadastrado(true);
    } else {
      if(e.value === "nao"){
        setMedicoCadastrado(false);
        setIdMedico("");
      }
    }
    setLoading(false);
  }

  const convertDate = (str) => {
    var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    setDataConsulta([day, mnth, date.getFullYear()].join("/"));
  }

  return (
    <div>
      <Container>
      <Messages ref={messages} />
      {loading ?
        <Loading/> :
          <div>
          <br/>
          <center>
            <h2>Cadastrar nova consulta</h2>
          </center>
          <br/>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row className="justify-content-md-center">
              <Col lg={3} md={12}>
                <br/>
                <Form.Label className="required">Título da consulta</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  maxLength="50"
                  ref={register({required:true, maxLength: 50})}
                  placeholder="Insira aqui o título da consulta"
                />
                {errors.title && errors.title.type === "required" && <span className="alertField">Campo título é obrigatório</span>}
                {errors.title && errors.title.type === "maxLength" && <span className="alertField">O tamanho máximo é de 50 caracteres</span> }
              </Col>
              <Col lg={3} md={12}>
                <br/>
                <Form.Label>Data exame</Form.Label><br/>
                <Calendar
                  onChange={(e) => convertDate(e.target.value)}
                  dateFormat="dd/mm/yy"
                  monthNavigator={true}
                  yearNavigator={true}
                  yearRange="1900:2020"
                  placeholder="dd/mm/aaaa"
                />
                <br/>
              </Col>
              <Col lg={3} md={12}>
                  <br/>
                  <Form.Label className="required">Médico já cadastrado?</Form.Label>
                  <div className="p-col-12">
                    <RadioButton
                      inputId="sim"
                      name="cadastrado"
                      value="sim"
                      onChange={(e) => medicoJaCadastrado(e)}
                      checked={medicoCadastrado === true}
                    />
                    <label htmlFor="rb1" className="p-radiobutton-label">Sim</label>
                  </div>
                  <div className="p-col-12">
                    <RadioButton
                      inputId="nao"
                      name="cadastrado"
                      value="nao"
                      onChange={(e) => medicoJaCadastrado(e)} 
                      checked={medicoCadastrado === false}
                    />
                    <label htmlFor="rb2" className="p-radiobutton-label">Não</label>
                  </div>
              </Col>
            {medicoCadastrado ?
              <Col lg={3} md={12}>
                <br/>
                <Form.Label>CRM do Médico</Form.Label><br/>
                <Dropdown
                  options={medicosCrm}
                  name="id_medico"
                  onChange={setCRMMedico}
                  style={{width: '18em'}}
                  value={idMedico}
                  filter={true}
                  filterPlaceholder="CRM médico"
                  filterBy="label,value"
                  showClear={true}
                  disabled={!medicoCadastrado}
                />
              </Col>
              : null}
            </Row>
          {!medicoCadastrado ?
            <div>
              <br/>
              <center><h4>Cadastre-se agora, é rápido e fácil!</h4></center>
            <Row className="justify-content-md-center">
              <Col lg={4} md={10}>
                <br/>
                <Form.Label className="required">Nome médico</Form.Label>
                <Form.Control
                  type="text"
                  name="nome_med"
                  maxLength="50"
                  ref={register({required:true, maxLength: 50})}
                  placeholder="Insira aqui seu nome completo"
                />
                {errors.nome && errors.nome.type === "required" && <span className="alertField">Campo nome é obrigatório</span>}
                {errors.nome && errors.nome.type === "maxLength" && <span className="alertField">O tamanho máximo é de 50 caracteres</span> }
              </Col>
              <Col lg={4} md={10}>
                <br/>
                <Form.Label className="required">CRM</Form.Label>
                <Form.Control
                  type="text"
                  name="crm"
                  maxLength="6"
                  ref={register({required:true, maxLength: 6})}
                  placeholder="Insira aqui seu CRM"
                />
                {errors.nome && errors.nome.type === "required" && <span className="alertField">Campo CRM é obrigatório</span>}
                {errors.nome && errors.nome.type === "maxLength" && <span className="alertField">O tamanho máximo é de 6 caracteres</span> }
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col lg={4} md={10}>
                <br/>
                <Form.Label>Telefone</Form.Label><br/>
                <Form.Control
                  type="text"
                  name="contato_med"
                  maxLength="14"
                  ref={register({maxLength: 14})}
                  placeholder="Insira aqui seu ddd e telefone (apenas números)"
                  onKeyUp={(e) => Validador.formatNumber(e)}
                />
                {errors.telefone && errors.telefone.type === "maxLength" && <span className="alertField">O tamanho máximo é de 11 números</span> }
              </Col>
              
              <Col lg={4} md={10}>
                <br/>
                <Form.Label>Especialiadade</Form.Label><br/>
                <Dropdown
                  options={ServiceConsulta.especialidade()}
                  name="id_especialidade"
                  onChange={setEspecialidadeMedico}
                  style={{width: '25em'}}
                  value={id_espec}
                  filter={true}
                  filterPlaceholder="Especialidade médico"
                  filterBy="label,value"
                  showClear={true}
                />
              </Col>
            </Row>
            <br/>
            </div>
            : <br/> }
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
                />
                {errors.symptom && errors.symptom.type === "required" && <span className="alertField">Campo sintomas é obrigatório</span>}
                {errors.symptom && errors.symptom.type === "maxLength" && <span className="alertField">O tamanho máximo é de 240 caracteres</span> }
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
                />
              </Col>
            </Row>
            <Row lg={6} className="justify-content-md-center">
              <Col>
                <br/><br/><br/>
                <center>
                  <Button label="Cadastrar consulta" size="45" className="p-button-danger" type="submit"/>
                </center>
              </Col>
            </Row>
          </form>
          <br/><br/><br/><br/><br/><br/>
          </div> }
        </Container>
      </div>
  )
}