import React from 'react';
import {Menubar} from 'primereact/menubar';
import { useHistory } from "react-router-dom";

export default function MenuBar() {
  const history = useHistory();

   const handleOnClick = (e) => {
      history.push(e.item.path);
   };

  let item = [
    {
        label:'Início',
        icon:'pi pi-home',
        path:"/",
        command:(e)=> handleOnClick(e)
    },
    {
        label:'Consulta',
        icon:'pi pi-file-o',
        items:[
           {
              label:'Nova consulta',
              icon:'pi pi-fw pi-cloud-upload',
              path:"/novaConsulta",
              command:(e)=> handleOnClick(e)
           },
           {
              label:'Histórico',
              icon:'pi pi-fw pi-list',
              path:"/historicoConsulta",
              command:(e)=> handleOnClick(e)
           }
        ]
    },
    {
       label:'Exame',
       icon:'pi pi-id-card',
       items:[
          {
             label:'Novo exame',
             icon:'pi pi-fw pi-cloud-upload',
             path:"/novoExame",
             command:(e)=> handleOnClick(e)
          },
          {
             label:'Histórico',
             icon:'pi pi-fw pi-list',
             path:"/historicoExame",
             command:(e)=> handleOnClick(e)
          }
       ]
    },
    {
      label:'IMC',
      icon:'pi pi-fw pi-heart',
      path:"/imc",
      command:(e)=> handleOnClick(e)
   },
   {
      label:'Gerar token',
      icon:'pi pi-fw pi-share-alt',
      path:"/generateToken",
      command:(e)=> handleOnClick(e)
   },
   {
      label:'Perfil',
      icon:'pi pi-fw pi-user',
      path:"/perfil",
      command:(e)=> handleOnClick(e)
   },
 ]

  return (
    <div>
        <div className="content-section implementation">
            <Menubar model={item}>
            </Menubar>
        </div>
    </div>
  );
}

