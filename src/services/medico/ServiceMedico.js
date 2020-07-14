
class ServiceMedico{

    insertMedico(doctor){
        return fetch('https://api-health-wellness.herokuapp.com/hw/doctor', {
            method: 'POST',
            headers: {
              'refresh-token': localStorage.getItem('refreshToken').toString(),
              'access-token': localStorage.getItem('accessToken').toString(),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(doctor),
        });
    };

    listaMedico(){
        return fetch('https://api-health-wellness.herokuapp.com/hw/doctor', {
            method: 'GET',
            headers: {
              'refresh-token': localStorage.getItem('refreshToken').toString(),
              'access-token': localStorage.getItem('accessToken').toString(),
              'Content-Type': 'application/json'
            }
        });
    }
}

export default new ServiceMedico();