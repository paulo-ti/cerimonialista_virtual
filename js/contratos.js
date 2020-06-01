(async function () {
  let $btnContratosSalvar = document.getElementById("btnContratosSalvar");
  let $listaContratos = document.getElementById("listaContratos");
  let $contratosList = document.getElementsByClassName("contratosList");

  const refStorage = firebase.storage().ref("arquivos/contratos");

  let url_atual1 = window.location.href.split("?");
  let idEvento = url_atual1[1];

  const refContratos = firebase
    .database()
    .ref("EventoNovo" + "/" + idEvento)
    .child("Contratos");
  refContratos.once("value").then(function (snapshot) {
    var arrayKeys = Object.keys(snapshot.val());

    for (let i = 0; i < arrayKeys.length; i++) {
      var nomeCompletoContrato = snapshot.child(arrayKeys[i]).val()
        .nomeContrato;

      refStorage
        .child(idEvento + "/" + nomeCompletoContrato)
        .getMetadata()
        .then(function (snapshot) {
          var nome = snapshot.customMetadata.nome;
          var descricao = snapshot.customMetadata.descricao;

          refStorage
            .child(idEvento + "/" + snapshot.name)
            .getDownloadURL()
            .then(function (snapshot) {
              if (descricao == "") adicionarContratoHTML(nome, nome, snapshot);
              else adicionarContratoHTML(descricao, nome, snapshot);
            });
        });
    }
  });

  $btnContratosSalvar.addEventListener("click", function (e) {
    e.stopImmediatePropagation();
    var $descricaoContrato = document.getElementById("descricaoContrato");
    var fileInput = document.getElementById("input-file");

    let descricaoContrato = $descricaoContrato.value;
    var fileContrato = fileInput.files[0].name;
    if (descricaoContrato == "") descricaoContrato = fileContrato;

    let contrato = document.createTextNode(descricaoContrato);
    let nomeContrato = document.createTextNode(fileContrato);

    let arquivo = fileInput.files[0];
    let nomeCompletoContrato = fileContrato + "_" + $descricaoContrato.value;
    const refStorageContrato = refStorage.child(
      idEvento + "/" + nomeCompletoContrato
    );
    refStorageContrato
      .put(arquivo, {
        customMetadata: {
          nome: fileContrato,
          descricao: $descricaoContrato.value,
        },
      })
      .then((snapshot) => {
        firebase
          .database()
          .ref("EventoNovo" + "/" + idEvento)
          .child("Contratos")
          .push()
          .set({ nomeContrato: nomeCompletoContrato })
          .then(function () {
            console.log(snapshot);
            refStorageContrato.getDownloadURL().then(function (url) {
              adicionarContratoHTML2(contrato, nomeContrato, url);
              $descricaoContrato.value = "";
              $input-file.value = "";
              listReloader2();
            });
          });
      })
      .catch((err) => {
        alert("Erro ao enviar o arquivo");
        console.log(err);
      });
    $descricaoContrato.value = "";
    $fileContrato.value = "";
    listReloader2();
  });

  function listReloader2() {
    Array.prototype.forEach.call($contratosList, (contratosList) => {
      contratosList.addEventListener("click", function (e) {
        if (e.target.classList.value === "textTable") {
          $listaContratos.lastElementChild.parentNode.removeChild(this);
          alert(`O Contrato ${this.textContent} foi removido!`);
        }
      });
    });
  }

  function deletarArquivoStorage(nomeArquivo) {
    refStorage
      .child(idEvento + "/" + nomeArquivo)
      .delete()
      .then(function () {
        console.log(nomeArquivo + " deletado com sucesso");
        removerArquivoDoHTML();
      })
      .catch((error) => {
        console.log(Erro + error);
      });
  }
  function removerArquivoDoHTML() {}

  function adicionarContratoHTML(nome, descricao, url) {
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    let td = document.createElement("td");
    let URL = document.createElement("td");
    $listaContratos.appendChild(tr);
    tr.appendChild(th);
    tr.appendChild(td);
    tr.appendChild(URL);
    th.classList.add("textTable");
    tr.classList.add("contratosList");
    td.classList.add("text-center");
    td.classList.add("text-center");
    th.innerText = nome;
    td.innerText = descricao;
    listReloader2();
  }

  function adicionarContratoHTML2(nome, descricao, url) {
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    let td = document.createElement("td");
    let URL = document.createElement("td");
    $listaContratos.appendChild(tr);
    tr.appendChild(th);
    tr.appendChild(td);
    tr.appendChild(URL);
    th.classList.add("textTable");
    tr.classList.add("contratosList");
    td.classList.add("text-center");
    td.classList.add("text-center");
    th.appendChild(nome);
    td.appendChild(descricao);
  }

  // fileInput.onchange = function(event){
  //   let arquivo = event.target.files[0];
  //   refStorage.child(idEventoGlobal+'/1').put(arquivo, {
  //       customMetadata:{
  //           descricao: "desc teste"
  //       }
  //   }).then(()=>{
  //     alert('Arquivo Enviado com Sucesso!');
  //   }).catch(err =>{
  //       alert("Erro ao enviar o arquivo" + e);
  //   })
  // }
})();
