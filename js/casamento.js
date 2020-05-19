verificarUsuarioLogado();
  var $btnInicioCasamento = document.getElementById('btnInicioCasamento');
  var uNoivo1 ;
  var uNoivo2;
  var uDataCasamento;
  var uEstado;
  var uCidade;
  var uNumeroConvidados;
  var url_atual = window.location.href.split('?');
  var referenciaBanco = firebase.database().ref("EventoNovo");
  
  $btnInicioCasamento.addEventListener('click' , (e)=>{
    e.preventDefault();
    uNoivo1 = recuperaDados('noivo1').value;
    uNoivo2 = recuperaDados('noivo2').value;
    uDataCasamento = recuperaDados('dataCasamento').value;
    uEstado = recuperaDados('estado').value;
    uCidade = recuperaDados('cidade').value;
    uNumeroConvidados = recuperaDados('numeroConvidados').value;

    cadastraEvento(validaCampos());
  });

  function cadastraEvento(verificacao){
    
    if(verificacao){
      
       var resultato = referenciaBanco.push({
        noivo1: uNoivo1,
        noivo2 : uNoivo2,
        dataCasamento: uDataCasamento,
        estado: uEstado,
        cidade: uCidade,
        numeroConvidados: uNumeroConvidados,
        idUsuario: firebase.auth().currentUser.uid
      });
      window.history.pushState("object or string", "Title", "/casamento_gerenciador.html?"+resultato.key);
      document.location.reload(true);
    }
  }

  function recuperaDados(elemento){
    return document.getElementById(elemento);
  }

  function testaCampo(elemento){
    if(elemento.value === ""){
      elemento.style.border = "1px solid red";
      return false;
    }else{
      elemento.style.border = "1px solid purple";
      return true;
    }
  }

  function validaCampos(){
    var validacao = [];
    var check = true;
    validacao.push(testaCampo(recuperaDados('noivo1')));
    validacao.push(testaCampo(recuperaDados('noivo2')));
    validacao.push(testaCampo(recuperaDados('dataCasamento')));
    validacao.push(testaCampo(recuperaDados('estado')));
    validacao.push(testaCampo(recuperaDados('cidade')));
    validacao.push(testaCampo(recuperaDados('numeroConvidados')));
    validacao.filter( (teste) => {
      if(!teste){
        return check = false;
      }
    })
    validacao = [];
    return check;
  }