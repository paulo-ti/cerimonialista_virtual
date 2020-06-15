(function () {
  const $inputsCronograma = document.querySelectorAll(".inputsCronograma");
  const $btnSendCronograma = document.querySelector("#btnSendCronograma");
  const $listaCronograma = document.getElementById("listaCronograma");
  const url_atual1 = window.location.href.split("?");
  const idEvento = url_atual1[1];
  const referenciaBanco = firebase.database().ref("EventoNovo/" + idEvento + "/Cronograma");
  let cronogramaList = [];

  window.addEventListener("load", fetchData);
  $btnSendCronograma.addEventListener("click", start);
  $listaCronograma.addEventListener("click", listenerTable);

  function start() {
    let datas = dataRecover($inputsCronograma);
      insertDB(datas);
      clearFields($inputsCronograma);
  }

  function listenerTable(e) {
    if (e.toElement.classList[0] === "horario") {
      if(confirmarRemocao('feminino','atividade')){
        let remove = cronogramaList.find( (horario) => horario.id === this.lastElementChild.id)
        cronogramaList.splice(cronogramaList.indexOf(remove),1)
        removeDB(this.lastElementChild.id);
        $listaCronograma.removeChild(this.lastElementChild);
        alert(`Horario removido com sucesso!`);
      }
    }
  }

  function fetchData() {
    referenciaBanco.once("value").then(function (snapshot) {
      if (snapshot.exists()) {
        snapshot.forEach(function (childSnapshot) {
          let childData = childSnapshot.val();
          let intHora = transformData(childData.hora);
          cronogramaList.push(
            {
             hora: childData.hora, descricao: childData.descricao, id: childSnapshot.key , 
             intHora: intHora
            });
        });
        mountHTML(cronogramaList);
      }
    });
  }

  function transformData(data){
    let intHora = data.split(":").join("").split("");
    if(intHora[0] === "0"){
    intHora.shift()
    intHora = +intHora.join("")
      return intHora;
    }else{
      intHora = +intHora.join("")
      return intHora;
    }
  }

  function insertDB(datas) {
    let newCrono = referenciaBanco.push();
    newCrono
      .set({
        hora: datas[0],
        descricao: datas[1],
      })
      .then(function () {
        let objCronograma = []
        let cronoId = newCrono.key;
        let intHora = transformData(datas[0]);
        cleanTable($listaCronograma.children);
        objCronograma.push(
          {
            hora: datas[0], descricao: datas[1], id: newCrono.key , 
            intHora: intHora
          })
          cronogramaList = cronogramaList.concat(objCronograma);
          mountHTML(cronogramaList);
        })
      .catch(function (err) {
        console.log(err);
      });
  }

  function cleanTable(list){
   let x = 0;
   while (list.length > x) {
    $listaCronograma.removeChild($listaCronograma.children[x])
   }
  }

  function removeDB(id) {
    referenciaBanco
      .child(id)
      .remove()
      .then(function () {
        console.log(id + " deletado com sucesso");
      })
      .catch((error) => {
        console.log(Erro + error.message);
      });
  }

  function mountHTML(array) {
    let sort = sortBYSmallest(array)
    
    sort.forEach((element , index)=>{
      let hour = document.createTextNode(element.hora);
      let description = document.createTextNode(element.descricao);

      let tr = document.createElement("tr");
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");

      $listaCronograma.appendChild(tr);
      tr.appendChild(td1);
      tr.appendChild(td2);

      td1.appendChild(hour);
      td2.appendChild(description);
      tr.classList.add("text-center");
      td1.classList.add("horario");
      tr.id = element.id || "";
    })
  }

  function sortBYSmallest(list){
    let sort = list.sort( function(a,b){
      return a.intHora - b.intHora;
    })
    return sort;
  }

  function dataRecover(nodeList) {
    let datas = [];
    for (let x = 0; x < nodeList.length; x++) {
      if (!nodeList[x].value){
        nodeList[x].style.border = "1px solid red";
        if(!nodeList[x+1].value){
        nodeList[x+1].style.border = "1px solid red";
        return}
      }else{
        nodeList[x].style.border = "1px solid purple";        
        datas[x] = nodeList[x].value;
    }
    }
    return datas;
  }

  function clearFields(fields) {
    x = 0;
    while (fields.length > x) {
      fields[x].value = "";
      x++;
    }
  }
})();
