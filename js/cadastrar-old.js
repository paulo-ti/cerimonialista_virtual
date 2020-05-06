function recuperaTag(tag) {
  return document.getElementById(tag)
};

var uNome = $txtNome.value;
var uUsuario = $txtUsuario.value;
var uSenha = $txtSenha.value;

function btnCadastrarUsuario(e) {
  e.preventDefault();

  function testaCampo() {
    if (uCelular == "" || uNome == "" || uUsuario == "" || uSenha == "") {
      pintaCampo($txtCelular);
      pintaCampo($txtNome);
      pintaCampo($txtUsuario);
      pintaCampo($txtSenha);
      return true;
    } else {
      pintaCampo($txtCelular);
      pintaCampo($txtNome);
      pintaCampo($txtUsuario);
      pintaCampo($txtSenha);
      return false;
    }
  }

  function pintaCampo(campo) {
    if (campo.value === "") {
      campo.style.border = "1px solid red";
    } else {
      campo.style.border = "1px solid purple";
    }
  }

  function cadastraUsuario(celular, senha) {
    console.log(firebase);
    firebase.auth().createUserWithEmailAndPassword(celular, senha).then(function () {
      alert('Cadastrado')
    }).catch(function (e) {
      console.error(e.code);
      console.error(e.message);
      alert("Falha ao cadastrar, verifique o erro no console.");
    });
  }

  if (!testaCampo()) {
    cadastraUsuario(uCelular, uSenha);
    // window.history.pushState("object or string", "Title", "/home.html?"+uUsuario);
    // document.location.reload(true);
  }

}