let $btnAdicionarConvidados = document.getElementById("btnAdicionarConvidados");
let $inputNomeConvidado = document.getElementById("inputNomeConvidado");
let $inputConfirmado = document.getElementById("inputConfirmado");
let $listaConvidados = document.getElementById("listaConvidados");
let $checks = document.getElementsByClassName("checks");
let $qtdTotal = document.querySelector("#qtdTotal");
let $qtdConfirmados = document.querySelector("#qtdConfirmados");
let $namesList = document.getElementsByClassName("namesList");

$btnAdicionarConvidados.addEventListener("click", function () {
  let nomeConvidado = $inputNomeConvidado.value;
  let inputConfirmado = $inputConfirmado.checked;

  let nome = document.createTextNode(nomeConvidado);
  let tr = document.createElement("tr");
  let th = document.createElement("th");
  let td = document.createElement("td");
  let checkbox = document.createElement("input");

  $listaConvidados.appendChild(tr);
  tr.appendChild(th);
  tr.appendChild(td);
  th.classList.add("textTable");
  tr.classList.add("namesList");
  td.classList.add("text-center");
  checkbox.type = "checkbox";
  checkbox.classList.add("checks");
  checkbox.checked = inputConfirmado;
  th.appendChild(nome);
  td.appendChild(checkbox);
  accountantGuests($checks);
  accountantChecked($checks);
  listReloader();

  $inputNomeConvidado.value = "";
  $inputConfirmado.checked = false;
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
        $listaConvidados.lastElementChild.parentNode.removeChild(this);
        alert(`O convidado ${this.textContent} foi removido!`);
      }
      accountantGuests($checks);
      accountantChecked($checks);
    });
  });
}
