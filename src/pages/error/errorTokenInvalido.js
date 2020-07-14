import React, {Component} from 'react';
import not_found from './../../img/not_found.png';
import './../../css/css_general.css';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

export default class ErrorUrlTokenInvalido extends Component{

  render(){
    return(
        <Container>
            <br/>
            <Row className="justify-content-md-center">
                <Col>
                <center>
                    <h2>Ops, esse token já expirou ou está incorreto!<span role="img" aria-label="sheep">🙁</span></h2>
                    <h4>Gere um novo token e tente novamente</h4>
                    <img src={not_found} style={{width:'40%'}} alt="Imagem de URL não encontrada"/>
                </center>
                </Col>
            </Row>
        </Container>
        );
  }
}