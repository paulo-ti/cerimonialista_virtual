
  'use strict'
//! Referencia do FireBase
  var query = firebase.database().ref("UsuarioNovo").orderByKey();  
  var usuarioLogado;
  
  const email = document.querySelector('#lEmail');
  const password = document.querySelector('#lSenha');
  const btnEntrar = document.querySelector('#btnEntrar');

  function paintField(field) {
    const { value: fieldValue } = field;

    field.border = `1px solid ${(fieldValue === '') ? 'red' : 'purple'}`;
  }

  function validateFields({ email,password }) {
    const fields = [email, password];

    const fieldsValue = fields.map(field => field.value);
    fieldsValue.forEach(fieldValue => { paintField(fieldValue) });

    return !fieldsValue.includes('');
  }
  
  //!Evento de Logar
  btnEntrar.addEventListener('click', (e) => {
    alert("entyou");
    e.preventDefault();
    if (testaCampo( email, password )) {
      firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then(data => {
          console.log(data);
          console.log("logado");
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, false);

  function testaCampo(){
    pintaCampo(email);
      pintaCampo(password);
    if(email.value == "" || password.value == ""){
      return false;
    }else{
      return true;
    }
  }

  function pintaCampo(campo){
    if(campo.value === ""){
      campo.style.border = "1px solid red";
    }else{
      campo.style.border = "1px solid purple";
    }
  }

    
