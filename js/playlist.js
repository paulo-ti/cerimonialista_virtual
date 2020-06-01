let $btnSalvarPlaylist = document.getElementById("btnSalvarPlaylist");
let $inputNomeMusica = document.getElementById("inputNomeMusica");
let $inputMomentoMusica = document.getElementById("inputMomentoMusica");
let $inputLinkMusica = document.getElementById("inputLinkMusica");

let $listaMusicas = document.getElementById("listaMusicas");

let $musicasList = document.getElementsByClassName("musicasList");

$btnSalvarPlaylist.addEventListener("click", function () {
  
  let nomeMusica = $inputNomeMusica.value;
  let momentoMusica = $inputMomentoMusica.value;
  let linkMusica = $inputLinkMusica.value;

  let musica = document.createTextNode(nomeMusica);
  let momento = document.createTextNode(momentoMusica);

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
  tr.classList.add("musicasList" , "text-center");
  td.classList.add("textTable");
  td2.classList.add("text-center");
  linkIcon.classList.add("fas" , "fa-volume-up");
  th.appendChild(a);
  a.href = "http://"+linkMusica;
  a.target = "_blank";
  a.appendChild(linkIcon);
  td.appendChild(musica);
  td2.appendChild(momento);
  
  $inputNomeMusica.value = ""
  $inputMomentoMusica.value = ""
  $inputLinkMusica.value = ""
 
  listReloaderList()
});
function listReloaderList() {
  Array.prototype.forEach.call($musicasList, (musicasList) => {
    musicasList.addEventListener("click", function (e) {
      if (e.target.classList.value === "textTable") {
        
        $listaMusicas.lastElementChild.parentNode.removeChild(this);
        alert(`A musica ${e.target.textContent} foi removida!`);
      }
    });
  });
}


