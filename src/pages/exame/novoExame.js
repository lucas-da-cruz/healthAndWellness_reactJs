import React, {useState, useRef} from 'react';
import {Button} from 'primereact/button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useForm from "react-hook-form";
import ServiceExame from './../../services/exame/ServiceExame';
import {Calendar} from 'primereact/calendar';
import firebase from './../../config/fireConnection';
import {Messages} from 'primereact/messages';

import './../../css/css_general.css';

export default function NovoExame() {
  let messages = useRef(null);

  const { register, handleSubmit, errors } = useForm();
  const [dataExame, setDataExame] = useState(null);
  const [urlExame, setUrlExame] = useState('');
  const [progress, setProgress] = useState(0);
  const [stateInsert, setStateInsert] = useState(true);

  const onSubmit = async (data) => {
    data.data_exame = dataExame;
    data.url = urlExame;
    ServiceExame.insertExame(data).then(retorno => {
      showSuccess();
      setStateInsert(false);
      //alert("Exame cadastrado com sucesso!");
    }).catch(error => {
      console.log(error);
      showError(error);
    });
  }

  const handleFile = async (e) => {
    if(e.target.files[0]){
      const doc = e.target.files[0];
      if(doc.type === 'image/png' || doc.type === 'image/jpeg' || doc.type === 'image/jpg'){
        insertExame(doc).then(retorno =>{
          
        })
      } else {
        errorTypeFile();
        setStateInsert(true);
        return null;
      }
    }
  }

  const showSuccess = () => {
    window.scrollTo(0, 0);
    messages.current.show({severity: 'success', summary: 'Exame criado com sucesso'});
  };

  const showError = (error) => {
    window.scrollTo(0, 0);
    messages.current.show({severity: 'error', summary: 'Ops, algo inesperado aconteceu', detail: error});
  };

  const errorTypeFile = () => {
    window.scrollTo(0, 0);
    messages.current.show({severity: 'error', summary: 'Ops, Anexe um arquivo do tipo PNG ou JPG'});
  };

  const convertDate = (str) => {
    var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    setDataExame([day, mnth, date.getFullYear()].join("/"));
  }

  const insertExame = async (doc) => {
    let uid = firebase.getUID();
    const uploadTasks = firebase.storage.ref(`exames/${uid}/${doc.name}`).put(doc);
    //return "url";
    await uploadTasks.on('state_changed',
    (snapshot)=> {
      //progress
      const progressState = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgress(progressState);
    },
    (error) => {
        //Error
        console.log('Error imagem' + error);
    },
    () => {
      //sucess
      firebase.storage.ref(`exames/${uid}`)
      .child(doc.name).getDownloadURL()
      .then(url => {
        setUrlExame(url);
        setStateInsert(false);
      })

    })
  };

    return (
            <div>
              <Container>
              <div>
                <br/>
                <center>
                  <h2>Cadastrar novo exame</h2>
                </center>
                <br/>
                <Messages ref={messages} />
                <br/>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Row className="justify-content-md-center">
                    <Col lg={4} md={10}>
                      <br/>
                      <Form.Label className="required">Título do exame</Form.Label>
                      <Form.Control
                        type="text"
                        name="nome_exame"
                        maxLength="50"
                        ref={register({required:true, maxLength: 50})}
                        placeholder="Insira aqui o título do exame"
                      />
                      {errors.nome_exame && errors.nome_exame.type === "required" && <span className="alertField">Campo nome exame é obrigatório</span>}
                      {errors.nome_exame && errors.nome_exame.type === "maxLength" && <span className="alertField">O tamanho máximo é de 50 caracteres</span> }
                    </Col>
                    <Col lg={4} md={10}>
                      <br/>
                      <Form.Label className="required">Exame</Form.Label><br/>
                      <input 
                      type="file"
                      onChange={(e) => handleFile(e)}
                      />
                      <br/><br/>
                      {urlExame !== '' ?
                      <center>
                        <img src={urlExame} width="250" height="150" alt="Imagem exame"/>
                      </center>
                          :
                        <div>
                          <progress value={progress} max="100"/>
                        </div>
                      }
                    </Col>
                    <Col lg={4} md={10}>
                      <br/>
                      <Form.Label>Data exame</Form.Label><br/>
                      <Calendar onChange={(e) => convertDate(e.target.value)} dateFormat="dd/mm/yy"
                      monthNavigator={true} yearNavigator={true} yearRange="1900:2020" placeholder="dd/mm/aaaa"/>
                      <br/>
                    </Col>
                    {/*
                      <Col lg={4} md={10}>
                      <br/>
                      <Form.Label>ID da consulta</Form.Label>
                      <Form.Control
                        type="number"
                        name="appointment"
                        maxLength="50"
                        ref={register({maxLength: 4})}
                        placeholder="Insira aqui o ID da consulta"
                      />
                      {errors.appointment && errors.appointment.type === "maxLength" && <span className="alertField">O tamanho máximo é de 4 caracteres</span> }
                    </Col>
                    */}
                  </Row>
                  <Row lg={6} className="justify-content-md-center">
                    <Col>
                      <br/><br/><br/>
                      <center>
                        <Button disabled={stateInsert} label="Cadastrar exame" size="45" className="p-button-danger" type="submit"/>
                      </center>
                    </Col>
                  </Row>
                </form>
                <br/><br/><br/><br/><br/>
              </div>
              </Container>
            </div>
      )
}