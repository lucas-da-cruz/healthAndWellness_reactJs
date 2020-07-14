import React, { useState, useEffect } from 'react';
import Loading from './../loading';
import firebase from './../../config/fireConnection';
import ErrorUrlTokenInvalido from './../../pages/error/errorTokenInvalido';

export default function GenerateToken() {
  const [ erro, setErro ] = useState(false);

  useEffect(() => {
    var url = window.location.pathname;
    var token = url.split("/")[2];

    firebase.signInWithCustomToken(token)
    .then(function() {
      localStorage.setItem('access', "token");
      localStorage.setItem('accessToken', firebase.getAccessToken());
      localStorage.setItem('refreshToken', firebase.getRefreshToken());
      document.location.assign('/');
    })
    .catch(function(error) {
      setErro(true);
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + errorMessage);
    });
  });

  return (
    <div>
      {erro ?
        <ErrorUrlTokenInvalido/>
          :
        <Loading/>
      }
    </div>
  );
}