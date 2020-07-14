import dadosConsulta from './../dados_mockados/historicoConsulta';

class ServiceConsulta{

    insertConsulta(data){
        var appointment = {
            title : data.title,
            date : data.date,
            symptom : data.symptom,
            diagnosis : data.diagnosis,
            medication : data.medication,
            patient : localStorage.getItem('userId'),
            //doctor : data.doctor,
            doctor : Number(data.doctor),
        }

        return fetch('https://api-health-wellness.herokuapp.com/hw/appointment', {
            method: 'POST',
            headers: {
              'refresh-token': localStorage.getItem('refreshToken').toString(),
              'access-token': localStorage.getItem('accessToken').toString(),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(appointment),
        });
    };

    atualizaConsulta(data){
        var appointment = {
            id : data.id,
            title : data.title,
            date : data.date,
            symptom : data.symptom,
            diagnosis : data.diagnosis,
            medication : data.medication,
            patient : localStorage.getItem('userId'),
            doctor : data.doctor.crm,
        }
        
        return fetch(`${'https://api-health-wellness.herokuapp.com/hw/appointment/' + appointment.id}`, {
            method: 'PUT',
            headers: {
              'refresh-token': localStorage.getItem('refreshToken').toString(),
              'access-token': localStorage.getItem('accessToken').toString(),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(appointment),
        });
    };

    listaConsulta(){
        return fetch('https://api-health-wellness.herokuapp.com/hw/appointment', {
            method: 'GET',
            headers: {
              'refresh-token': localStorage.getItem('refreshToken').toString(),
              'access-token': localStorage.getItem('accessToken').toString(),
              'Content-Type': 'application/json'
            }
        });
    }

    getConsulta(id_consulta){
        return fetch(`${'https://api-health-wellness.herokuapp.com/hw/appointment/' + id_consulta}`, {
            method: 'GET',
            headers: {
              'refresh-token': localStorage.getItem('refreshToken').toString(),
              'access-token': localStorage.getItem('accessToken').toString(),
              'Content-Type': 'application/json'
            }
        });
    }

    listaConsultaMockado(){
        return dadosConsulta.consultas();
    }

    getConsultaMockado(idConsulta){
        return dadosConsulta.consulta();
    }

    especialidade(){
        return [
            {label: 'Anestesiologia', value: '1'},
            {label: 'Cardiologia', value: '2'},
            {label: 'Cirurgia geral', value: '3'},
            {label: 'Cirurgia plástica', value: '4'},
            {label: 'Coloproctologia', value: '5'},
            {label: 'Dermatologia', value: '6'},
            {label: 'Endocrinologia', value: '7'},
            {label: 'Gastroenterologia', value: '8'},
            {label: 'Genética médica', value: '9'},
            {label: 'Geriatria', value: '10'},
            {label: 'Ginecologia e obstetrícia', value: '11'},
            {label: 'Hematologia', value: '12'},
            {label: 'Mastologia', value: '13'},
            {label: 'Medicina de emergência', value: '14'},
            {label: 'Medicina legal ou medicina forense', value: '15'},
            {label: 'Neurologia', value: '16'},
            {label: 'Oftalmologia', value: '17'},
            {label: 'Oncologia', value: '18'},
            {label: 'Ortopedia', value: '19'},
            {label: 'Pediatria', value: '20'},
            {label: 'Psiquiatria', value: '21'},
            {label: 'Urologia', value: '22'}
          ];
    };

}

export default new ServiceConsulta();