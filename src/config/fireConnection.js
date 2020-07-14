import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';


  let firebaseConfig = {
    apiKey: "AIzaSyCX0iLmpJ6MSc5WTdqfGtSdWLX3MPth5S4",
    authDomain: "healthapp-e39c7.firebaseapp.com",
    databaseURL: "https://healthapp-e39c7.firebaseio.com",
    projectId: "healthapp-e39c7",
    storageBucket: "healthapp-e39c7.appspot.com",
    messagingSenderId: "794326135355",
    appId: "1:794326135355:web:85705dc7590702c597621e",
    measurementId: "G-CPWP9D6RE5"
  };

class Firebase{
  constructor(){
    app.initializeApp(firebaseConfig);

    //Referenciando a database para acessar em outros locais
    //this.app = app.database();

    this.storage = app.storage();
  }

  login(email, password){
    return app.auth().signInWithEmailAndPassword(email, password);
  }

  logout(){
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('tokenAccess');
    localStorage.removeItem('access');
    localStorage.removeItem('userId');
    return app.auth().signOut();
  }

  signInWithCustomToken(token){
    return app.auth().signInWithCustomToken(token);
  }

  getTokenCreateCustomToken(uid){
    console.log(app.auth().currentUser.uid);
    app.auth().createCustomToken(uid)
    .then(function(customToken) {
      console.log(customToken)
      // Send token back to client
    })
    .catch(function(error) {
      console.log('Error creating custom token:', error);
    });
  }

  cadastrar(email, password){
      return app.auth().createUserWithEmailAndPassword(email, password);
    }   

  isInitialized(){
      return new Promise(resolve =>{
          app.auth().onAuthStateChanged(resolve);
      })
  }

  reLogin(atualPassword){
    var user = app.auth().currentUser;
    const credential = app.auth.EmailAuthProvider.credential(user.email, atualPassword);
    return user.reauthenticateWithCredential(credential);
  }

  updatePassWord(senha){
    var user = app.auth().currentUser;

    return user.updatePassword(senha);
  }

  sendPasswordToResetEmail(emailToChange){
    var user = app.auth();

    return user.sendPasswordResetEmail(emailToChange);
  }

  getUser(){
    return app.auth().currentUser;
  }

  getAccessToken(){
    return app.auth().currentUser.b.b;
  }

  getRefreshToken(){
    return app.auth().currentUser.b.a;
  }

  getUID(){
    return app.auth().currentUser.uid;
  }

  getCurrent(){
    return app.auth().currentUser && app.auth().currentUser.email
  }

  getCurrentUid(){
    return app.auth().currentUser && app.auth().currentUser.uid
  }

  async getUserName(callback){
    if(!app.auth().currentUser){
      return null;
    }

    const uid = app.auth().currentUser.uid;
    await app.database().ref('usuarios').child(uid)
    .once('value').then(callback);

  }

}

export default new Firebase();