import React, { useState, useEffect, useRef } from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {InputText} from 'primereact/inputtext';
import Container from 'react-bootstrap/Container';
import Loading from '../loading';
import {Button} from 'primereact/button';
import ServiceConsulta from './../../services/consulta/ServiceConsulta';
import {Link} from 'react-router-dom';

export default function HistoricoConsulta (){

    const [globalFilter, setGlobalFilter] = useState(null);
    const [loading, setLoading] = useState(false);
    const [consulta, setConsulta] = useState([]);

    let dt = useRef(null);

    useEffect(() => {
      setLoading(true);
      ServiceConsulta.listaConsulta().then(response => {
        response.json().then(data => {
          setConsulta(data.data);
        }).catch((erro) => {
          console.log(erro);
        })
      })
      .catch((erro) => {
        console.log(erro);
      });

      window.setTimeout(function() {
        setLoading(false);
    }, 1500);

    }, []);

    const header = (
        <div style={{'textAlign':'left'}}>
            <i className="pi pi-search" style={{margin:'4px 4px 0 0'}}></i>
            <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Pesquisa geral" size="25"/>
        </div>
    );

    const visualizarConsulta = (rowData, column) => {
      return <div>
        <Link to={'/consulta/' + rowData.id}>
          <Button type="button" icon="pi pi-search"className="p-button-success" style={{marginRight: '.5em'}}></Button>
        </Link>
          
      </div>;
    };

    return (
      <Container>
        {loading ?
          <Loading/> :
          <div>
            <br/>
              <center>
                <h2>Histórico de consulta</h2>
              </center>
              <br/>
            <div>
              <DataTable ref={dt} value={consulta} paginator={true} rows={10} header={header}
                globalFilter={globalFilter} emptyMessage="Nenhuma consulta encontrada">
                  <Column field="id" header="ID" sortable filter={true} filterPlaceholder="ID da consulta" style={{textAlign:'center', width: '6em'}}/>
                  <Column field="title" header="Título" sortable filter={true} filterPlaceholder="Título da consulta"/>
                  <Column field="date" header="Data" sortable filter={true} filterPlaceholder="Data da consulta"/>
                  <Column header="+" body={visualizarConsulta} style={{textAlign:'center', width: '4em'}}/>
              </DataTable>
            </div>
            <br/><br/><br/><br/><br/><br/>
          </div>}
      </Container>
    );
}