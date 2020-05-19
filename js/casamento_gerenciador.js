
  'use strict'
  verificarUsuarioLogado();
  let $btnSalvarCheckList = document.getElementsByClassName('btnSalvarCheckList')
  let $btnEditarCheckList = document.getElementsByClassName('btnEditarCheckList')
  let $divschecklist = document.querySelectorAll('.divschecklist')
  let $noivos = document.getElementById('noivos')
  let url_atual1 = window.location.href.split('?')
  let event = []
  let itensEvento = []
  let itensCheckList = []
  const query = firebase.database().ref("EventoNovo").orderByKey();
  const query1 = firebase.database().ref("EventoNovo"+"/"+url_atual1[1]).orderByKey();

  window.onload = selectDates()
  //$noivos.textContent = 

  function selectDates(){
    fetchData()
    setTimeout(() =>{listItems(itensEvento , insertValues)} ,3000);
  }
  //insertValues($divschecklist)

  Array.prototype.forEach.call($btnEditarCheckList , function (btnEditarCheckList){
    btnEditarCheckList.addEventListener('click' , function(editar){ 
      editar.preventDefault()
      
      editar.path[1][0].readOnly = false
      editar.path[1][1].disabled = false
      editar.path[1][2].readOnly = false
      editar.path[1][3].readOnly = false
      editar.path[1][4].disabled = true
      editar.path[1][5].disabled = false
      

     editar.path[1][5].addEventListener('click' , function(){
       update(editar)
     })

    })
  })

  function update(values){
    let fb = firebase.database().ref("EventoNovo"+"/"+url_atual1[1]+"/"+values.path[3].id+"/")
    let fornecedor = values.path[1][0].value
    let formaPagamento = values.path[1][1].value
    let valorContrato = values.path[1][2].value
    let dataFinalContrato = values.path[1][3].value
    
    let data = { fornecedor , formaPagamento , valorContrato , dataFinalContrato }
    fb.update(data)

  }

  function insertValues(div){
    let x = 0
    let y = 0
    
    for( x; div.length > x ; x++) {
      for( y ; itensCheckList.length > y ; y++){
      if (div[x].id === itensCheckList[y].nomeCheckList) {
        $divschecklist[x].lastElementChild.lastElementChild[0].value = itensCheckList[y].fornecedor
        $divschecklist[x].lastElementChild.lastElementChild[1].selectedOptions[0].label = `Pagamento em ${itensCheckList[y].formaPagamento}`
        $divschecklist[x].lastElementChild.lastElementChild[2].value = itensCheckList[y].valorContrato
        $divschecklist[x].lastElementChild.lastElementChild[3].value = itensCheckList[y].dataFinalContrato
        $divschecklist[x].lastElementChild.lastElementChild[5].disabled = true

        $divschecklist[x].lastElementChild.lastElementChild[0].readOnly = true
        $divschecklist[x].lastElementChild.lastElementChild[1].disabled = true
        $divschecklist[x].lastElementChild.lastElementChild[2].readOnly = true
        $divschecklist[x].lastElementChild.lastElementChild[3].readOnly = true
        }
      }y = 0
    }
  }
  
  function listItems(obj , call){
    let x = 0
    while(obj.length > x){
      if(typeof obj[x] === "object")
      
      itensCheckList = itensCheckList.concat(obj[x])
      x++;
    }
   call($divschecklist)
  }

  function fetchData(){
    query1.once("value").then(function(snapshot) {
      
      snapshot.forEach(function(childSnapshot) {
        
        var childData = childSnapshot.val();
        itensEvento.push(childData);
      });

    });
  }

  // function hasContent(form){
  //   let check = []
  //   Array.prototype.forEach.call(form , (tag) =>{
  //     if (tag.value !== "") {
  //       check.push(true)
  //     }
  //   })
  //   return check
  //   isValid($divschecklist[0].lastElementChild.lastElementChild)  
  // }

  Array.prototype.forEach.call( $btnSalvarCheckList , (btnSalvarCheckList)=>{
    btnSalvarCheckList.addEventListener('click' , function(buttom){
      buttom.preventDefault()
      
      if (buttom.path[1][4].disabled === false) {
        let check = [
                  isValid(buttom.path[1][0]),
                  isValid(buttom.path[1][1]),
                  isValid(buttom.path[1][2]),
                  isValid(buttom.path[1][3])
                  ]
      
      let checklsit =  check.find( i => i == false)
      if(checklsit == false) {
        alert('Favor preencher todos os campos!')
      }
      else{
        this.disabled = true;
        insertInto(buttom)
      }
      }else{
        alert('Dados atualizados com sucesso!')
        update(buttom)
        this.disabled = true;
        buttom.path[1][4].disabled = false
      }
    })
  })

  function isValid(field){
    let state = false;
    if(field.value === ""){
      field.style.border = "1px solid red";
        return state = false;
      }else{
        field.style.border = "1px solid purple";
        return state = true;
      }
    }

    function insertInto(values){
      //var referenciaBanco = firebase.database().ref("EventoNovo"+"/"+url_atual1[1]+"/"+values.path[3].id+"/");
      
       let referenciaBanco = firebase.database().ref("EventoNovo"+"/"+url_atual1[1]+"/"+values.path[3].id+"/")
    
    
       
       
       // let resultado = referenciaBanco.push({
         let fornecedor = values.path[1][0].value
         let formaPagamento = values.path[1][1].value
         let valorContrato = values.path[1][2].value
         let dataFinalContrato = values.path[1][3].value
         let nomeCheckList = values.path[3].id
         // })
         let data = { fornecedor , formaPagamento , valorContrato , dataFinalContrato  , nomeCheckList }
         referenciaBanco.update(data)
         values.path[1][0].readOnly = true
        values.path[1][1].disabled = true
        values.path[1][2].readOnly = true
        values.path[1][3].readOnly = true
        alert('Os dados foram salvos com Sucesso!!')
    }

    // Para trabalhar no select mais pra frente
 
  