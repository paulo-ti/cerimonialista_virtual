
  'use strict'
//! Referencia do FireBase
  var refCadastro = firebase.database().ref("UsuarioNovo");

  function recuperaTag(tag){
    return document.getElementById(tag)
  };
  
  var $txtCelular = recuperaTag('txtCelular');
  var $txtNome = recuperaTag('txtNome');
  var $txtUsuario = recuperaTag('txtUsuario');
  var $txtSenha = recuperaTag('txtSenha');
  var $btnCadastrar = recuperaTag('btnCadastrar');
  
  //!Evento de Cadastro
  $btnCadastrar.addEventListener('click' , btnCadastrarUsuario);

  function btnCadastrarUsuario(e){
    e.preventDefault();

    var uCelular = $txtCelular.value;
    var uNome = $txtNome.value;
    var uUsuario  =$txtUsuario.value;
    var uSenha = $txtSenha.value;

    function testaCampo(){
      if(uCelular == "" || uNome == "" || uUsuario == "" || uSenha == ""){
        pintaCampo($txtCelular);
        pintaCampo($txtNome);
        pintaCampo($txtUsuario);
        pintaCampo($txtSenha);
        return true;
      }else{
        pintaCampo($txtCelular);
        pintaCampo($txtNome);
        pintaCampo($txtUsuario);
        pintaCampo($txtSenha);
        return false;
      }
    }

    function pintaCampo(campo){
      if(campo.value === ""){
        campo.style.border = "1px solid red";
      }else{
        campo.style.border = "1px solid purple";
      }
    }

    function cadastraUsuario(celular , nome , usuario , senha){
      var resultato = refCadastro.push({
        celular: celular,
        nome : nome,
        usuario: usuario,
        senha: senha
      });
    }
      
      if(!testaCampo()){
        cadastraUsuario(uCelular , uNome , uUsuario , uSenha);
        window.history.pushState("object or string", "Title", "/home.html?"+uUsuario);
        document.location.reload(true);
      }
    
  }

