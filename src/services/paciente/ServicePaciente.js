class ServicePaciente{

    insertPacienteBanco(data){
        var patient = {
            name :  data.name,
            contact : data.contact,
            email : data.email,
            birth_date : data.birth_date,
            password : data.password,
        }
        return fetch('https://api-health-wellness.herokuapp.com/hw/patient-auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patient),
        });
    };

    getPaciente(){
        return fetch('https://api-health-wellness.herokuapp.com/hw/patient', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'access-token' :  localStorage.getItem('accessToken').toString(),
                'refresh-token' : localStorage.getItem('refreshToken').toString()
            }
        });
    };

    updatePacienteBanco(data, idPatient){
        var patient = {
            name :  data.name,
            contact : data.contact,
            email : data.email,
            birth_date : data.birth_date,
        }
        return fetch(`${'https://api-health-wellness.herokuapp.com/hw/patient/' + idPatient}`, {
            method: 'PUT',
            headers: {
              'refresh-token': localStorage.getItem('refreshToken').toString(),
              'access-token': localStorage.getItem('accessToken').toString(),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(patient),
        });
    };

}

export default new ServicePaciente();