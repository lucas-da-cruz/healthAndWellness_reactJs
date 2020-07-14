import React, { useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import useForm from 'react-hook-form';

export default function Perfil() {

  const { register, handleSubmit, errors } = useForm();
  
  useEffect(() => {
    console.log("Iniciando");
  });

  const onSubmit = data => {

  };

  return (
    <div>
      <Container>
        <br/>
          <center><h2>Seu perfil de usuário</h2></center><br/><br/>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row className="justify-content-md-center">
              <Col lg={4} md={10}>
                
              </Col>
              <Col lg={4} md={10}>
                
              </Col>
              <Col lg={4} md={10}>
                
              </Col>
            </Row>
          </form>
          <br/><br/><br/>
      </Container>
    </div>
  );
}