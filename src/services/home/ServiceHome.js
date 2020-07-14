class ServiceHome{

    getName(){
        console.log(localStorage.getItem('accessToken').toString());
        console.log(localStorage.getItem('refreshToken').toString());
        return fetch('https://api-health-wellness.herokuapp.com/hw/patient', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'access-token' :  localStorage.getItem('accessToken').toString(),
                'refresh-token' : localStorage.getItem('refreshToken').toString()
            }
        });
    };


}

export default new ServiceHome();