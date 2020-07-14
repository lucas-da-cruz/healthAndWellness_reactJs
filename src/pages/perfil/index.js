import React, { useState, useEffect, useRef } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import useForm from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Validador from './../../services/util/validador';
import {Calendar} from 'primereact/calendar';
import {Button} from 'primereact/button';
import Loading from '../loading';
import {Link} from 'react-router-dom';
import {Messages} from 'primereact/messages';

//SERVICE
import ServicePaciente from './../../services/paciente/ServicePaciente';

let usePacient = [];
export default function Perfil() {
  let messages = useRef(null);

  const { register, handleSubmit, errors } = useForm();
  const [loading, setLoading] = useState(false);
  const [dataNascimento, setDataNascimento] = useState("");
  const [stateEdit, setStateEdit] = useState(true);
  const [user, setUser] = useState([]);

  useEffect(() => {
    setLoading(true);
    ServicePaciente.getPaciente().then(response => getPerfil(response))
    .catch((erro) => {
      console.log(erro);
    });
  }, []);

  const updateScreen = () => {
    ServicePaciente.getPaciente().then(response => getPerfil(response))
    .catch((erro) => {
      console.log(erro);
    });
  }

  const showSuccess = () => {
    messages.current.show({severity: 'success', summary: 'Perfil atualizado com sucesso'});
  };

  const showError = () => {
    messages.current.show({severity: 'error', summary: 'Ops, algo inesperado aconteceu', detail: 'Recarregue a página e tente novamente'});
  };

  const getPerfil = (response) => {
    response.json().then(data => {
      setUser([]);
      usePacient.name = data.data.name;
      usePacient.email = data.data.email;
      usePacient.contact = data.data.contact;
      usePacient.id = data.data.id;

      setDataNascimento(data.data.birth_date);
      var parts = data.data.birth_date.split("/");
      usePacient.birth_date =  new Date(parts[2], parts[1] - 1, parts[0]);
      setUser(usePacient);
      setLoading(false);
    }).catch((erro) => {
      console.log(erro);
    });
  }

  const onSubmit = data => {
    setLoading(true);
    data.birth_date = dataNascimento;
    ServicePaciente.updatePacienteBanco(data, usePacient.id).then(function() {
      updateScreen();
      setStateEdit(true);
      setLoading(false);
      showSuccess();
    })
    .catch(function(error) {
      setStateEdit(true);
      setLoading(false);
      showError();
      console.log(error);
    });
    
  };

  const convertDate = (str) => {
    var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    setDataNascimento([day, mnth, date.getFullYear()].join("/"));
    var newDate = [day, mnth, date.getFullYear()].join("/");
    newDate = newDate.split("/");
    usePacient.birth_date =  new Date(newDate[2], newDate[1] - 1, newDate[0]);
  }

  const updateContact = (value) => {
    user.contact = value;
    setUser(user);
  }

  const updateName = (value) => {
    user.name = value;
    setUser(user);
  }

  return (
    <div>
      <Container>
        {loading? 
        <Loading/> :
        <div>
          <br/>
          <center><h2>Seu perfil de usuário</h2></center><br/>
          <Messages ref={messages} />
          <br/>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row className="justify-content-md-center">
              <Col lg={5} md={10}><br/>
                <Form.Label className="required">Nome completo</Form.Label>
                <Form.Control 
                  type="text" 
                  name="name"
                  maxLength="50"
                  ref={register({required:true, maxLength: 50})}
                  placeholder="Insira aqui seu nome completo"
                  disabled={stateEdit}
                  defaultValue={user.name}
                  onChange={(e) => updateName(e.target.value)}
                />
              {errors.nome && errors.nome.type === "required" && <span className="alertField">Campo nome é obrigatório</span>}
              {errors.nome && errors.nome.type === "maxLength" && <span className="alertField">O tamanho máximo é de 50 caracteres</span> }
              </Col>
              <Col lg={5} md={10}><br/>
                <Form.Label>Telefone</Form.Label><br/>
                <Form.Control
                  type="text"
                  name="contact"
                  maxLength="14"
                  ref={register({maxLength: 14})}
                  placeholder="Insira aqui seu telefone (apenas números)"
                  onKeyUp={(e) => Validador.formatNumber(e)}
                  disabled={stateEdit}
                  defaultValue={user.contact}
                  onChange={(e) => updateContact(e.target.value)}
                />
                {errors.telefone && errors.telefone.type === "maxLength" && <span className="alertField">O tamanho máximo é de 11 números</span> }
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col lg={5} md={10}><br/>
                <Form.Label>Data nascimento</Form.Label><br/>
                <Calendar
                  onChange={(e) => convertDate(e.target.value)}
                  monthNavigator={true}
                  yearNavigator={true}
                  yearRange="1900:2020"
                  placeholder="dd/mm/aaaa"
                  dateFormat="dd/mm/yy"
                  disabled={stateEdit}
                  value={usePacient.birth_date}
                />
              </Col>
              <Col lg={5} md={10}><br/>
                <Form.Label  className="required">Email</Form.Label>
                <Form.Control 
                  type="email"
                  name="email"
                  maxLength="50"
                  ref={register({required:true, maxLength: 50})}
                  placeholder="Insira aqui seu email"
                  disabled={true}
                  defaultValue={usePacient.email}
                />
              {errors.email && errors.email.type === "required" && <span className="alertField">Campo email é obrigatório</span>}
              {errors.email && errors.email.type === "maxLength" && <span className="alertField">O tamanho máximo é de 50 caracteres</span> }
              </Col>
            </Row>
            {stateEdit ?
            <Row>
              <Col className="justify-content-md-center">
                <br/><br/><br/>
                <center>
                  <Link to="/perfil" onClick={() => setStateEdit(false)}>Editar perfil</Link>
                </center><br/>
                <center>
                  <Link to="/resetSenha">Alterar senha?</Link>
                </center>
              </Col>
            </Row> 
            :
            <Row lg={6} className="justify-content-md-center">
              <Col>
                <br/><br/><br/>
                <center>
                  <Button label="Cancelar" onClick={() => setStateEdit(true)} className="p-button-secondary" />
                </center>
              </Col>
              <Col>
                <br/><br/><br/>
                <center>
                  <Button label="Atualizar" className="p-button-danger" type="submit"/>
                </center>
              </Col>
            </Row>
            }
          </form>
          <br/><br/><br/><br/><br/><br/>
        </div>  
      }
      </Container>
    </div>
  );
}