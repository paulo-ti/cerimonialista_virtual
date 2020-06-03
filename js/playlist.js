let $btnSalvarPlaylist = document.getElementById("btnSalvarPlaylist");
let $inputNomeMusica = document.getElementById("inputNomeMusica");
let $inputMomentoMusica = document.getElementById("inputMomentoMusica");
let $inputLinkMusica = document.getElementById("inputLinkMusica");
let $listaMusicas = document.getElementById("listaMusicas");
let $musicasList = document.getElementsByClassName("musicasList");
let url_atual1 = window.location.href.split("?");
let idEvento = url_atual1[1];
let listMusica = [];

window.onload = selectDatesMusic()

$btnSalvarPlaylist.addEventListener("click", function () {
  let nomeMusica = $inputNomeMusica.value;
  let momentoMusica = $inputMomentoMusica.value;
  let linkMusica = $inputLinkMusica.value;

  montaHTML(nomeMusica , momentoMusica , linkMusica);
  limpaCampos($inputNomeMusica , $inputMomentoMusica , $inputLinkMusica)
  insertBanco(nomeMusica, momentoMusica, linkMusica);
  listReloaderList();
});

function selectDatesMusic(){
  let referenciaBanco = firebase.database()
  .ref("EventoNovo"+"/"+idEvento+"/"+"playlist");
  referenciaBanco.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      montaHTML(childData.musica , childData.momento , childData.link);
      listReloaderList();
    });

  });
}

function listReloaderList() {
  Array.prototype.forEach.call($musicasList, (musicasList) => {
    musicasList.addEventListener("click", function (e) {
      if (e.target.classList.value === "textTable") {
        $listaMusicas.lastElementChild.parentNode.removeChild(this);
        removeMusica(e.target.textContent)
        alert(`A musica ${e.target.textContent} foi removida!`);
      }
    });
  });
}

function insertBanco(musica, momento, link) {
  let musicaSemEspaço = joinMusic(musica);
  let referenciaBanco = firebase
    .database()
    .ref("EventoNovo" + "/" + idEvento + "/" + "playlist/"+musicaSemEspaço+"/");
  let data = { musica, momento, link };
  referenciaBanco.update(data);
}

function removeMusica(musica){
  let musicaSemEspaço = joinMusic(musica);
  let referenciaBanco = firebase
  .database()
  .ref("EventoNovo" + "/" + idEvento + "/" + "playlist/");

  referenciaBanco.child(musicaSemEspaço)
  .remove()
  .then(function () {
    console.log(musica + " deletado com sucesso");
  })
  .catch((error) => {
    console.log(Erro + error);
  });
}

function joinMusic(musica){
  let musicaSemEspaço = musica.split(" ");
  musicaSemEspaço = musicaSemEspaço.join("");
  return musicaSemEspaço;
}

function montaHTML(musica1 , momento1 , link){
  let musica = document.createTextNode(musica1);
  let momento = document.createTextNode(momento1);

  let tr = document.createElement("tr");
  let th = document.createElement("th");
  let td = document.createElement("td");
  let td2 = document.createElement("td");
  let a = document.createElement("a");
  let linkIcon = document.createElement("i");

  $listaMusicas.appendChild(tr);
  tr.appendChild(th);
  tr.appendChild(td);
  tr.appendChild(td2);

  th.classList.add("text-center");
  tr.classList.add("musicasList", "text-center");
  td.classList.add("textTable");
  td2.classList.add("text-center");
  linkIcon.classList.add("fas", "fa-volume-up");
  th.appendChild(a);
  a.href = "http://" + link;
  a.target = "_blank";
  a.appendChild(linkIcon);
  td.appendChild(musica);
  td2.appendChild(momento);
}

function limpaCampos(campo1 , campo2 , campo3){
  campo1.value = "";
  campo2.value = "";
  campo3.value = "";
}