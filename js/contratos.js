let $btnContratosSalvar = document.getElementById("btnContratosSalvar");
let $descricaoContrato = document.getElementById("descricaoContrato");
let $fileContrato = document.getElementById("fileContrato");
let $listaContratos = document.getElementById("listaContratos");
let $contratosList = document.getElementsByClassName("contratosList");

$btnContratosSalvar.addEventListener("click", function () {
  
  let descricaoContrato = $descricaoContrato.value;
  let fileContrato = $fileContrato.files[0].name;

  let contrato = document.createTextNode(descricaoContrato);
  let nomeContrato = document.createTextNode(fileContrato);
  let tr = document.createElement("tr");
  let th = document.createElement("th");
  let td = document.createElement("td");

  $listaContratos.appendChild(tr);
  tr.appendChild(th);
  tr.appendChild(td);
  th.classList.add("textTable");
  tr.classList.add("contratosList");
  td.classList.add("text-center");
  th.appendChild(contrato);
  td.appendChild(nomeContrato);
 
  $descricaoContrato.value = "";
  $fileContrato.value = ""
  listReloader2()
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
