
import exame from './../dados_mockados/exame';

class ServiceExame{

    insertExame(data){
        if(data.appointment === '') data.appointment = null;
        var exam = {
            file_path : data.url,
            creation_date : data.data_exame,
            name : data.nome_exame,
            patient : localStorage.getItem('userId'),
            appointment : null,
        }

        console.log(exam);

        return fetch('https://api-health-wellness.herokuapp.com/hw/exam', {
            method: 'POST',
            headers: {
              'refresh-token': localStorage.getItem('refreshToken').toString(),
              'access-token': localStorage.getItem('accessToken').toString(),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(exam),
        });
    };

    atualizaExame(data){
        //if(data.appointment === '') data.appointment = null;
        var exam = {
            file_path : data.url,
            creation_date : data.creation_date,
            name : data.name,
            patient : localStorage.getItem('userId'),
            appointment : null,
            id : data.id,
        }

        let id = data.id;

        return fetch(`${'https://api-health-wellness.herokuapp.com/hw/exam/' + id}`, {
            method: 'PUT',
            headers: {
              'refresh-token': localStorage.getItem('refreshToken').toString(),
              'access-token': localStorage.getItem('accessToken').toString(),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(exam),
        });
    };
    
    listaExame(){
        return fetch('https://api-health-wellness.herokuapp.com/hw/exam', {
            method: 'GET',
            headers: {
              'refresh-token': localStorage.getItem('refreshToken').toString(),
              'access-token': localStorage.getItem('accessToken').toString(),
              'Content-Type': 'application/json'
            }
        });
        
    }

    getExame(idExame){
        return fetch(`${'https://api-health-wellness.herokuapp.com/hw/exam/' + idExame}`, {
            method: 'GET',
            headers: {
              'refresh-token': localStorage.getItem('refreshToken').toString(),
              'access-token': localStorage.getItem('accessToken').toString(),
              'Content-Type': 'application/json'
            }
        });
    }

    listaExameMockado(){
        console.log(exame.exames());
        return exame.exames();
    }

    getExameMockado(idConsulta){
        return exame.exame();
    }

}

export default new ServiceExame();