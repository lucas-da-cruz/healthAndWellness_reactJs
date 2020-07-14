import React, { useState, useEffect, useRef } from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {InputText} from 'primereact/inputtext';
import Container from 'react-bootstrap/Container';
import Loading from '../loading';
import {Button} from 'primereact/button';
import ServiceExame from './../../services/exame/ServiceExame';
import {Link} from 'react-router-dom';

export default function HistoricoExame (){

    const [globalFilter, setGlobalFilter] = useState(null);
    const [loading, setLoading] = useState(false);
    const [exame, setExame] = useState([]);

    let dt = useRef(null);

    useEffect(() => {
      setLoading(true);
      ServiceExame.listaExame().then(response => {
        response.json().then(data => {
          setExame(data.data);
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

    const visualizarExame = (rowData, column) => {
      return <div>
        <Link to={'/exame/' + rowData.id}>
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
                <h2>Histórico de exame</h2>
              </center>
              <br/>
            <div>
              <DataTable ref={dt} value={exame} paginator={true} rows={10} header={header} globalFilter={globalFilter} emptyMessage="Nenhum exame encontrado">
                  <Column field="id" header="ID" sortable filter={true} filterPlaceholder="ID do exame" style={{textAlign:'center', width: '6em'}}/>
                  <Column field="name" header="Nome" sortable filter={true} filterPlaceholder="Nome do exame"/>
                  <Column field="creation_date" header="Data" sortable filter={true} filterPlaceholder="Data do exame"/>
                  <Column header="+" body={visualizarExame} style={{textAlign:'center', width: '4em'}}/>
              </DataTable>
            </div>
            <br/><br/><br/><br/><br/><br/>
          </div>}
      </Container>
    );
}