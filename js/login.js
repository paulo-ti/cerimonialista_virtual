
  'use strict'
//! Referencia do FireBase
var query = firebase.database().ref("UsuarioNovo").orderByKey();  
var usuarioLogado;
  function recuperaTag(tag){
    return document.getElementById(tag)
  };
  
  var $usuario = recuperaTag('lUsuario');
  var $senha = recuperaTag('lSenha');
  var $btnEntrar = recuperaTag('btnEntrar');
  
  //!Evento de Logar
  $btnEntrar.addEventListener('click' , btnBuscaUsuario);

  function btnBuscaUsuario(e){
    e.preventDefault();
    var uUsuario = $usuario.value;
    var uSenha = $senha.value;
    var dados = [];

    function testaCampo(){
      if(uUsuario == "" || uSenha == ""){
        pintaCampo($usuario);
        pintaCampo($senha);
        return true;
      }else{
        pintaCampo($usuario);
        pintaCampo($senha);
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

    function checaDados(arr){
      var x = 0;
      var y = [];
      var z = [];
      var erro = recuperaTag('erroLogin');
      var check = false;
      while(arr.length > x){
        y += arr[x]+",";
         x++;
      }
      z = y.split(",");
      z.pop();
      x = 0;
      while(z.length > x){
        
        if(z[x] === uUsuario && z[x+1] === uSenha){
          usuarioLogado = z[x]; 
          window.history.pushState("object or string", "Title", "/home.html?"+usuarioLogado);
          document.location.reload(true);
          return check = true;
        }
        x++;
      }
      if(!check){
        $usuario.style.border = "1px solid red";
        $senha.style.border = "1px solid red";
        erro.classList.remove("d-none");
        
      }

    };

    function buscaUsuario(pUsuario , pSenha){
      query.once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
           var key = childSnapshot.key;
           var childData = childSnapshot.val();
           dados.push([childData.usuario,childData.senha]);
       });
       checaDados(dados);
     });
    }
      
      if(!testaCampo()){
        buscaUsuario(uUsuario , uSenha);
      }
    

  }
