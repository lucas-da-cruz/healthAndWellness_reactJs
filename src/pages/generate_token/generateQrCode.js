import React, { useState } from 'react';
import { useQRCode } from 'react-hook-qrcode';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import {Button} from 'primereact/button';
import Form from 'react-bootstrap/Form';
import Loading from '../loading';

function GenerateQrCode() {

  const [ labelCopiar, setLabelCopiar ] = useState("Copiar token");
  const [inputRef] = useQRCode({
    text: localStorage.getItem('tokenAccess'),
    options: {
      level: 'M',
      margin: 2,
      scale: 1,
      width: 340,
      color: {
        dark: '#000000',
        light: '#DCDCDC',
      },
    },
  });

  const copyToClipboard = () => {
    var textField = document.createElement('textarea');
    textField.innerText = localStorage.getItem('tokenAccess');
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    setLabelCopiar("Token copiado");
  };
  
  return (
    <Container>
        {localStorage.getItem('tokenAccess') == null ?
            <Loading/>
        :
        <div>
            <br/>
            <center><h2>Token gerado</h2></center><br/>
            <Row className="justify-content-md-center">
                <Col lg={10} md={10}>
                    <div>
                        <Form.Control
                        as="textarea"
                        rows="12"
                        cols="30"
                        name="token"
                        value={localStorage.getItem('tokenAccess')}
                        disabled={true}
                        />
                        <span className="alertField">O token/QRCode é válido nos próximos 60 minutos.</span>
                    <br/><br/>
                    <center>
                        <Button 
                        label={labelCopiar}
                        size="45"
                        type="submit"
                        onClick={() => copyToClipboard()}
                        />
                    </center>
                    </div>
                    <br/>
                    <center>
                        <canvas ref={inputRef} />
                    </center>
                </Col>
            </Row>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
        }
    </Container>
  )
  
  ;
};

export default GenerateQrCode;