(async function () {
  let $btnContratosSalvar = document.getElementById("btnContratosSalvar");
  let $listaContratos = document.getElementById("listaContratos");
  let $contratosList = document.getElementsByClassName("contratosList");
  var $descricaoContrato = document.getElementById("descricaoContrato");
  var fileInput = document.getElementById("input-file");


  const refStorage = firebase.storage().ref("arquivos/contratos");
  let url_atual1 = window.location.href.split("?");
  var idEvento = url_atual1[1];

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
  }).catch((err) => {
    console.log(err);
  });

  $btnContratosSalvar.addEventListener("click", function (e) {
    
    e.stopImmediatePropagation();

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
            refStorageContrato.getDownloadURL().then(function (url) {
              adicionarContratoHTML(contrato.textContent, nomeContrato.textContent, url);
              $descricaoContrato.value = "";
              fileInput.value = "";
              listReloader2();
            });
          });
      })
      .catch((err) => {
        alert("Erro ao enviar o arquivo");
        console.log(err);
      });
  });

  function listReloader2() {
  
    Array.prototype.forEach.call($contratosList, (contratosList) => {
      
      contratosList.addEventListener("click", function (e) {
        if (e.target.classList.value === "textTable") {
          $listaContratos.lastElementChild.parentNode.removeChild(this);
          let nomeFile = this.lastElementChild.textContent
          let descricao = this.firstElementChild.textContent
          let nomeCompleto = nomeFile.concat("_"+descricao)
          alert(`O Contrato ${descricao} foi removido!`);
          deletarArquivoStorage(nomeCompleto);
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
  function removerArquivoDoHTML() {
    
  }

  function adicionarContratoHTML(nome, descricao, url) {
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    let td = document.createElement("td");
    //let URL = document.createElement("td");
    let link = document.createElement("a");
    let downloadIcon = document.createElement("i");
    $listaContratos.appendChild(tr);
    tr.appendChild(th);
    tr.appendChild(td);
    td.appendChild(link);
    //URL.appendChild(link);
    //link.appendChild(downloadIcon);
    th.classList.add("textTable");
    tr.classList.add("contratosList");
    td.classList.add("text-center");
    th.innerText = nome;
    link.href = url;
    link.target = "_blank";
    link.textContent = descricao;
    listReloader2();
  }

  // function adicionarContratoHTML2(nome, descricao, url) {
    
  //   let tr = document.createElement("tr");
  //   let th = document.createElement("th");
  //   let td = document.createElement("td");
  //   //let URL = document.createElement("td");
  //   let link = document.createElement("a");
  //   let downloadIcon = document.createElement("i");
  //   $listaContratos.appendChild(tr);
  //   tr.appendChild(th);
  //   tr.appendChild(td);
  //   td.appendChild(link);
  //   //URL.appendChild(link);
  //   //link.appendChild(downloadIcon);
  //   th.classList.add("textTable");
  //   tr.classList.add("contratosList");
  //   td.classList.add("text-center");
  //   th.innerText = nome;
  //   link.href = url;
  //   link.textContent = descricao;
  //   listReloader2();
  // }

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
