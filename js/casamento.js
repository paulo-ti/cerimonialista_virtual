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
  let $selectEstado = document.getElementById('selectEstado');
  let $selectCidade = document.getElementById('selectCidade');
  let $dataCasamento = document.getElementById('dataCasamento');
  populateStateSelect()

  window.addEventListener('load' , function(){
    debugger
    let date = new Date;
    let month = date.getMonth()+1;
    let day = date.getDate()+1;
    if(month < 10) month = "0"+month
    if(day < 10) day = "0"+day
    date = `${date.getFullYear()}-${month}-${day}`
    $dataCasamento.min = date;
  })

  $selectEstado.addEventListener('change' , function(e){
    let nodesSelects = $selectCidade.childNodes;
    [...nodesSelects].map( node => node.remove())
    let estadoSelected = this.value;
    fetch('/json/estados-cidades.json')
    .then(res => res.json())
    .then(states =>{
      
      let estado = states.estados.find( state => state.sigla === estadoSelected);
        estado.cidades.map( (cidade) =>{
          $selectCidade.disabled = false
          const option = document.createElement('option');
          option.setAttribute("value" ,cidade )
          option.textContent = cidade;
          $selectCidade.appendChild(option)
        })
    })
  })

  function populateStateSelect(){
    fetch('/json/estados-cidades.json')
    .then(res => res.json())
    .then(states =>{
      states.estados.map( state =>{
        const option = document.createElement("option");
        option.setAttribute("value" , state.sigla);
        option.textContent = state.nome;
        $selectEstado.appendChild(option);
      })
    })
  }

  
  $btnInicioCasamento.addEventListener('click' , (e)=>{
    e.preventDefault();
    uNoivo1 = recuperaDados('noivo1').value;
    uNoivo2 = recuperaDados('noivo2').value;
    uDataCasamento = recuperaDados('dataCasamento').value;
    uEstado = recuperaDados('selectEstado').value;
    uCidade = recuperaDados('selectCidade').value;
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
      window.location.href = "casamento_gerenciador.html?"+resultato.key;
      // window.history.pushState("object or string", "Title", "/casamento_gerenciador.html?"+resultato.key);
      // document.location.reload(true);
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
    validacao.push(testaCampo(recuperaDados('selectEstado')));
    validacao.push(testaCampo(recuperaDados('selectCidade')));
    validacao.push(testaCampo(recuperaDados('numeroConvidados')));
    validacao.filter( (teste) => {
      if(!teste){
        return check = false;
      }
    })
    validacao = [];
    return check;
  }