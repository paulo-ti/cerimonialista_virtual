(function () {

  const email = document.querySelector('#txtEmail');
  const completeName = document.querySelector('#txtNome');
  const username = document.querySelector('#txtUsuario');
  const password = document.querySelector('#txtSenha');
  const registerBtn = document.querySelector('#btnCadastrar');

  function pintaCampo(campo) {
    if (campo.value === "") {
      campo.style.border = "1px solid red";
    } else {
      campo.style.border = "1px solid purple";
    }
  }

  function testaCampo( email, completeName, username, password ) {
      pintaCampo(email);
      pintaCampo(completeName);
      pintaCampo(username);
      pintaCampo(password);
    if (email.value == "" || completeName.value == "" || username.value == "" || password.value == "") {
      console.log(email);
      return false;
    } else {
      console.log(password);
      return true;
    }
  }

  // Evento de Cadastro
  registerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (testaCampo( email, completeName, username, password )) {
      firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((data) => {
          writeUserData(data.user.uid, completeName.value, username.value).then(v=>{
            window.location.href = "home.html";
          })
          .catch(err =>{
            console.error(err);
          });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, false);

  async function writeUserData(userId, name, username) {
    await firebase.database().ref('users/' + userId).set({
      nomeCompleto: name,
      nomeUsuario: username,
      uid: userId
    });
  }
})();
