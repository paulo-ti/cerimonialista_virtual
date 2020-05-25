

const refStorage = firebase.storage().ref('arquivos/contratos');
let fileInput = document.getElementById('input-file');

fileInput.onchange = function(event){
    let arquivo = event.target.files[0];
    refStorage.child(idEventoGlobal+'/1').put(arquivo, {
        customMetadata:{
            descricao: "desc teste"
        }
    }).then(()=>{
      alert('Arquivo Enviado com Sucesso!');
    }).catch(err =>{
        alert("Erro ao enviar o arquivo" + e);
    })
  }