import { startSignIn, resetPassword } from '../controler/controlerReg.js';

export default () => {
  const login = `
  <div class = "containerRow">
  <div class="containerColumn">
  <a href="#/"> <img class = "buttonback" src="https://github.com/mafcht/DEV003-social-network/blob/v1.0/src/Media/backarrow.png?raw=true" alt="botonback" ></a>
  <figure>
  <img class = "image" src="https://github.com/mafcht/DEV003-social-network/blob/v1.0/src/Media/LogoR.png?raw=true" alt="logo">
  </figure>
  <h2 class= "textlogin"> GIVE <br> SHARE <br> ASK <br> GRATITUDE</h2>
  </div>
  <div class="line"> </div>
  <div class="containerColumn" id="columnRight1">
  <form action="" id="loginForm">
  <img class = "imagebuynothing" src="https://github.com/mafcht/DEV003-social-network/blob/v1.0/src/Media/buy-nothing.jpeg?raw=true" alt="buynothing"><br><br>
  <spam class="displayNone" id="somethingWrong1">Something went wrong </spam>
  <label for="email">Email:</label><br> 
  <input type="email" id= "signinEmail" placeholder="Email"class="textEmail" required></input><br>
  <spam class="displayNone" id="missingEmail1"> Type your email </spam>
  <spam class="displayNone" id="loginEmailNull1">Invalid email</spam>  
  <label for="password"> Password:</label><br>  
  <input type="password" id= "signinPassword" placeholder="**********"class="textPassword" required></input><br><br>
  <spam class="displayNone" id="missingPassword1">Type a password </spam> 
  <spam class="displayNone" id="wrongPassword1">Wrong password </spam> 
  <spam class="displayNone" id="requestPassword1">Too many requests </spam> 
  <button type="submit" class="btnSingIn">Sing In</button><br><br>
  <button type="submit" class="buttonForgot"> Forgot your Password </button><br>
  </form>
  </div>
  </div>
  `;
  const div = document.createElement('div');
  div.innerHTML = login;
  const inputEmail = div.querySelector('.textEmail');
  const inputPassword = div.querySelector('.textPassword');
  const buttonIngresar = div.querySelector('.btnSingIn');

  // Funcion para ingresar con correo
  buttonIngresar.addEventListener('click', (e) => {
    e.preventDefault();
    startSignIn(inputEmail.value, inputPassword.value)
      .then((success) => {
        window.location.hash = '#/home';
        return success;
      })
      .catch((error) => {
        const errorCode = error.code;

        // Traemos los ID de los spam loginem
        const missingEmail1 = document.getElementById('missingEmail1');
        const loginNulo1 = document.getElementById('loginEmailNull1');
        const missingPassword1 = document.getElementById('missingPassword1');
        const somethingWrong1 = document.getElementById('somethingWrong1');
        const wrongPassword1 = document.getElementById('wrongPassword1');
        const requestPassword1 = document.getElementById('requestPassword1');
        // pintamos los errores con un span y los mostramos y escondemos
        if (errorCode === 'auth/missing-email') {
          missingEmail1.style.display = 'block';
          loginNulo1.style.display = 'none';
        } else if (errorCode === 'auth/invalid-email') {
          loginNulo1.style.display = 'block';
          missingEmail1.style.display = 'none';
        } else if (errorCode === 'auth/wrong-password') {
          wrongPassword1.style.display = 'block';
          missingEmail1.style.display = 'none';
        } else if (errorCode === 'auth/too-many-requests') {
          requestPassword1.style.display = 'block';
          wrongPassword1.style.display = 'none';
          missingEmail1.style.display = 'none';
        } else if (errorCode === 'auth/internal-error') {
          missingPassword1.style.display = 'block';
        } else if (errorCode) {
          somethingWrong1.style.display = 'block';
        }
      });
  });
  // funcion para enviar correo para restablecer contraseña
  const btnForgot = div.querySelector('.buttonForgot');
  btnForgot.addEventListener('click', () => {
    resetPassword(inputEmail.value); // funcion del controlador - firebase
  });
  return div; // regresamos el div de la vista que se va a pintar en el contenedor
};
