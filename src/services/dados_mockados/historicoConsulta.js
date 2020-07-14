
class dadosConsulta{

    consultas(){
        return [
            {id_consulta: '1', titulo: 'Consulta de virose', data:"30/05/2020"},
            {id_consulta: '2', titulo: 'Consulta de gripe', data:"25/05/2020"},
            {id_consulta: '3', titulo: 'Consulta de rotina', data:"20/05/2020"},
            {id_consulta: '4', titulo: 'Consulta suspeita de dengue', data:"03/05/2020"}
          ];
    };

    consulta(){
        return {
            nome_med: "Lucas da Cruz",
            tipo_espec: "Cardiologia",
            id_paciente: "FtcVJSKh03TNfLavAhmGhWGhsnr1",
            sintoma: "Sintomas aqui",
            diagnostico: "Diagnostico aqui",
            medicacao: "Medicacao aqui",
            id_medico: "222222",
            titulo: "Consulta suspeita de dengue"
        }
    }

}

export default new dadosConsulta();