verificarUsuarioLogado();
var query = firebase.database().ref("EventoNovo").orderByKey();
var url_atual = window.location.href.split('?');
var eventos = [];
var eventoCheckado = []
var retorno = false;
var $eventosCadastrados = document.getElementById('eventosCadastrados');
let $btnGerenciadores = document.getElementsByClassName('btnGerenciadores');


buscarDados(validaUsuarioEvento);
incluiCampo(eventoCheckado);
function buscarDados(callback){
  query.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      Array.prototype.push.call(childData , childSnapshot.key)
      eventos.push(childData);
      //console.log(childData);
    });
  });
  callback();
}

  function validaUsuarioEvento(){
    var x = 0
    setTimeout(() => {
      while(x < eventos.length){
        
        if(eventos[x].idUsuario === firebase.auth().currentUser.uid){
          eventoCheckado.push(eventos[x] );
        }
        x++;
      }
    }, 4000);
  }

  function incluiCampo(eventoCheckado){ 

    var x = 0;
    setTimeout(() => {
      
      while(x < eventoCheckado.length){
        
        function ajustaData(data) {
          let arrayData = data.split("-");
          let dataAjustada = (arrayData[2]) +"/"+ (arrayData[1]) +"/"+ (arrayData[0]);
          return dataAjustada;
        }
        let textH5 = document.createTextNode(`Casamento`);
        let noivos = document.createTextNode(`De ${eventoCheckado[x].noivo1} com  ${eventoCheckado[x].noivo2}`);
        let dataCasamento = document.createTextNode(`Data: ${ajustaData(eventoCheckado[x].dataCasamento)}`);
        let textButton = document.createTextNode(`Gerenciar`);

        let li = document.createElement('li');
        let div1 = document.createElement('div');
        let div2 = document.createElement('div');
        let div3 = document.createElement('div');
        let div4 = document.createElement('div');
        let h5 = document.createElement('h5');
        let p1 = document.createElement('p');
        let p2 = document.createElement('p');
        let button = document.createElement('button');
        let i = document.createElement('i');

        $eventosCadastrados.appendChild(li);
        li.appendChild(div1);
        div1.appendChild(div2);
        div1.appendChild(div3);
        div3.appendChild(h5);
        div3.appendChild(p1);
        div3.appendChild(p2);
        div3.appendChild(button);
        div1.appendChild(div4);
        h5.appendChild(textH5);
        p1.appendChild(noivos);
        p2.appendChild(dataCasamento);
        button.appendChild(textButton);
        button.appendChild(i);
        
        div1.classList.add("card","text-center","mb-4");
        div2.classList.add("card-header");
        div3.classList.add("card-body","text-roxa");
        div4.classList.add("card-footer","text-muted");
        h5.classList.add("card-title");
        p1.classList.add("card-text");
        p2.classList.add("card-text");
        button.classList.add("btn","btn-roxa-opacite","text-light" , "btnGerenciadores");
        button.id = eventoCheckado[x][0];
        i.classList.add("ml-2","fas","fa-cogs","mr-2");
        x++;
      }
    }, 4000);
    
  }

  setTimeout(() => {
    Array.prototype.forEach.call($btnGerenciadores, function(i){
      i.addEventListener('click' , function(){
        window.location.href = "casamento_gerenciador.html?"+this.id;
     })
   })
  }, 4000);
      