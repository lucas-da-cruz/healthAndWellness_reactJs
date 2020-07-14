
class exame{

    exames(){
        return [
            {id_exame: '1', nome_exame: 'Exame de sangue', data_criacao:"30/05/2020"},
            {id_exame: '2', nome_exame: 'Exame de vezes', data_criacao:"25/05/2020"},
            {id_exame: '3', nome_exame: 'Exame de vista', data_criacao:"20/05/2020"},
            {id_exame: '4', nome_exame: 'Exame teste COVID', data_criacao:"03/05/2020"}
          ];
    };

    exame(){
        return {
            nome_exame: 'Exame de sangue',
            id_consulta: "1"
        }
    }

}

export default new exame();