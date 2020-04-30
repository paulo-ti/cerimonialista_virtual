
var query = firebase.database().ref("EventoNovo").orderByKey();
var url_atual = window.location.href.split('?');
var eventos = [];
var eventoCheckado = []
var retorno = false;
var $eventosCadastrados = document.getElementById('eventosCadastrados');

buscarDados(validaUsuarioEvento);
incluiCampo(eventoCheckado);
function buscarDados(callback){
  query.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
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
        
        if(eventos[x].usuario === url_atual[1]){
          eventoCheckado.push(eventos[x]);
        }
        x++;
      }
    }, 1000);
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
        button.classList.add("btn","btn-roxa-opacite","text-light");
        button.id = "casamentoGerenciador"+x;
        i.classList.add("ml-2","fas","fa-cogs","mr-2");
  //       $eventosCadastrados.innerHTML = `
  //                   <li>  
  //                 
  //                  
  //                     3  <div class="card-body text-roxa">
  //                           =    <h5 class="card-title ">Casamento</h5>
  //                            =   <p class="card-text">
  //                                 De  com 
  //                               </p>
  //                          =     <p> Data:
  //                           =    <button id="casamentoGerenciador" class="btn btn-roxa-opacite text-light">Gerenciar<i class="ml-2 fas fa-cogs mr-2"></i></button>
  //                      3 </div>
  //                     4  <div class="card-footer text-muted">
  //                      4 </div>
  //                    1 </div>
  //                   </li>
  // `;
  
        x++;
      }
    }, 3000);
    
  }