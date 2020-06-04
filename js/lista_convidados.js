(function () {
  let $btnAdicionarConvidados = document.getElementById("btnAdicionarConvidados");
  let $inputNomeConvidado = document.getElementById("inputNomeConvidado");
  let $inputConfirmado = document.getElementById("inputConfirmado");
  let $listaConvidados = document.getElementById("listaConvidados");
  let $checks = document.getElementsByClassName("checks");
  let $qtdTotal = document.querySelector("#qtdTotal");
  let $qtdConfirmados = document.querySelector("#qtdConfirmados");
  let $namesList = document.getElementsByClassName("namesList");
  let url_atual1 = window.location.href.split("?");
  let idEvento = url_atual1[1];

  referenciaBanco = firebase.database().ref("EventoNovo"+"/"+idEvento+"/"+"Convidados");
  referenciaBanco.once("value").then(function(snapshot) {
    snapshot.forEach(value =>{
      var confirmado = value.val().confirmado
      var nomeConvidado = value.val().nomeConvidado
      montaHTML(nomeConvidado, confirmado, value.key );
    })
  })

  $btnAdicionarConvidados.addEventListener("click", function () {
    let nomeConvidado = $inputNomeConvidado.value;
    let inputConfirmado = $inputConfirmado.checked;
    referenciaBanco.push().set(
       { nomeConvidado: nomeConvidado, confirmado: inputConfirmado }
    ).then(function(snapshot){
      montaHTML(nomeConvidado, inputConfirmado, snapshot.key)
    })
  });
  //Event do checkbox dinâmico
  document.addEventListener('change',function(e){
    if(e.target && e.target.id == 'checkbox-convidado'){
          var id = e.target.parentNode.parentNode.querySelector('.textTable').querySelector('.invisible').textContent;
          referenciaBanco.child(id).update({confirmado: e.target.checked}).then(function(){
            console.log('Alterado com sucesso no firebase!')
          })
     }
 });



  function accountantGuests(list) {
    let totalConvidados = list.length;
    $qtdTotal.textContent = totalConvidados;
  }

  function accountantChecked(list) {
    let x = 0;
    let count = 0;

    while (list.length > x) {
      if (list[x].checked === true) {
        count++;
      }
      x++;
    }
    $qtdConfirmados.textContent = count;
  }

  function listReloader() {
    Array.prototype.forEach.call($checks, (check) => {
      check.addEventListener("click", function () {
        accountantChecked($checks);
      });
    });
    Array.prototype.forEach.call($namesList, (nameList) => {
      nameList.addEventListener("click", function (e) {
        if (e.target.classList.value === "textTable") {
          try{
            removeConvidado(e.target.parentNode.querySelector('.invisible').textContent)
            $listaConvidados.lastElementChild.parentNode.removeChild(this);
            alert(`O convidado ${this.textContent} foi removido!`);
          }catch(err){
            console.log(err)
          }       
        }
        accountantGuests($checks);
        accountantChecked($checks);
      });
    });
  }

  function montaHTML(nomeConvidado , confirmado, id){
    let nome = document.createTextNode(nomeConvidado);
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    let td = document.createElement("td");
    let idTd = document.createElement("td");
    let checkbox = document.createElement("input");
    
    idTd.textContent = id;
    $listaConvidados.appendChild(tr);
    tr.appendChild(th);
    tr.appendChild(td);
    th.appendChild(idTd);
    idTd.classList.add("invisible");
    th.classList.add("textTable");
    tr.classList.add("namesList");
    td.classList.add("text-center");
    checkbox.type = "checkbox";
    checkbox.classList.add("checks");
    checkbox.id = 'checkbox-convidado'
    checkbox.checked = confirmado;
    th.appendChild(nome);
    td.appendChild(checkbox);
    accountantGuests($checks);
    accountantChecked($checks);
    listReloader();
    $inputNomeConvidado.value = "";
    $inputConfirmado.checked = false;
  }

  function removeConvidado(id){
    referenciaBanco.child(id)
    .remove()
    .then(function () {
      console.log(id + " deletado com sucesso");
    })
    .catch((error) => {
      console.log(Erro + error);
    });
  }
})();

