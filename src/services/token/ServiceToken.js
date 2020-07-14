class ServiceToken{

    getToken(){
        var accessToken = localStorage.getItem('accessToken').toString();
        var refreshToken = localStorage.getItem('refreshToken').toString();
        return fetch('https://api-health-wellness.herokuapp.com/hw/patient-token', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'access-token' : accessToken,
                'refresh-token' : refreshToken
            }
        });
    };

}

export default new ServiceToken();