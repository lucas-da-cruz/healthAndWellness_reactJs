import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import {Button} from 'primereact/button';
import ServiceToken from './../../services/token/ServiceToken';
import Loading from '../loading';

export default function GenerateToken() {

  const [ loading, setLoading ] = useState(false);

  const setCustomTokenUser = (response) => {
    setLoading(true);
    var url = window.location.href;
    url = url.replace('/generateToken', '');
    url = url + "/getToken/";

    response.json().then(data => {
      var tokenUrl = url + data.data.custom_token;
      localStorage.setItem('tokenAccess', tokenUrl);
      document.location.assign('/token/generate');
    }).catch((erro) => {
      console.log(erro);
    });
  }

  const getToken = () => {
    ServiceToken.getToken().then(response => setCustomTokenUser(response))
    .catch((erro) => {
      console.log(erro);
    });
  }

  return (
      <Container>
        {loading ?
          <Loading/>
        :
        <div>
           <br/>
          <center><h2>Geração de token para consulta</h2></center><br/><br/>
          <Row>
            <h2>Como funciona o token?</h2>
            <p>Ao gerar o token será disponibilizado um QRCode e uma URL para que assim 
              o seu médico escolha a melhor forma de visualizar seu histórico de consultas e
              exames. O token gerado terá uma duração de 60 minutos de disponibilidade de acesso.
            </p>
          </Row>
          <br/><br/><br/>
          <Row lg={6} className="justify-content-md-center">
            <Col md={10}>
              <center>
                <Button 
                label="Gerar token"
                className="p-button-danger"
                size="45"
                type="submit"
                onClick={() => getToken()}
                />
              </center>
            </Col>
          </Row>
        </div>
        }
        <br/><br/><br/><br/><br/><br/><br/>
      </Container>
  );
}