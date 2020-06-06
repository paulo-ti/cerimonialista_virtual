(function () {
  let $btnSalvarObservacao = document.getElementById("btnSalvarObservacao");
  let $textObservacao = document.getElementById("textObservacao");
  
  let $listaObservacoes = document.getElementById("listaObservacoes");

  let $observacoesList = document.getElementsByClassName("observacoesList");
  let url_atual1 = window.location.href.split("?");
  var idEvento = url_atual1[1];
  let listObservacoes = [];
  const referenciaBanco = firebase.database().ref("EventoNovo/"+idEvento+"/Observacoes");
  window.onload = selectDatesObservacoes()

  $btnSalvarObservacao.addEventListener("click", function () {
    let textObservacao = $textObservacao.value;
    if (!textObservacao) {
      $textObservacao.style.border = "1px solid red";
    }else{
      $textObservacao.style.border = "1px solid purple";
      insertBanco(textObservacao);
      limpaCampos($textObservacao)
      listReloaderList();
    }
  });

  function selectDatesObservacoes(){
      referenciaBanco.once("value").then(function(snapshot) {
      if(snapshot.exists()){
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          montaHTML(childData.observacao , childSnapshot.key);
          listReloaderList();
        });
      }
    });
  }

  function listReloaderList() {
    Array.prototype.forEach.call($observacoesList, (observacoesList) => {
      observacoesList.addEventListener("click", function (e) {
        if (e.target.tagName === "TH") {
          removeObservacao(this.lastElementChild.id)
          $listaObservacoes.removeChild(this);
          alert(`Observação removida com sucesso!`);
        }
      });
    });
  }

  function insertBanco(obs) {
    let newObs = referenciaBanco.push();
    newObs.set(
      { observacao: obs}
    )
    let obsId = newObs.key;
    montaHTML(obs , obsId);
  }

  function removeObservacao(obs){
    referenciaBanco.child(obs)
    .remove()
    .then(function () {
      console.log(obs + " deletado com sucesso");
    })
    .catch((error) => {
      console.log(Erro + error);
    });
  }

  function montaHTML(obs1 ,id){
    let obs = document.createTextNode(obs1);
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    $listaObservacoes.appendChild(tr);
    tr.appendChild(th);
    th.appendChild(obs)
    th.classList.add("text-center");
    tr.classList.add("observacoesList", "text-center");
    th.id = id || ""
  }

  function limpaCampos(campo1){
    campo1.value = "";
  }
})();
