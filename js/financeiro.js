(function(){
    let url_atual1 = window.location.href.split('?')
    let idEvento = url_atual1[1];
    let fotografo = document.querySelector('#Fotografo1')
    let igreja = document.querySelector('#Igreja1')
    let celebrante = document.querySelector('#Celebrante1')
    let decoracao = document.querySelector('#Decoracao1')
    let iluminacao = document.querySelector('#Iluminacao1')
    let buffet = document.querySelector('#Buffet1')
    let trajes = document.querySelector('#Trajes1')
    let filmagem = document.querySelector('#Filmagem1')
    let bemCasados = document.querySelector('#BemCasados1')
    let bandaDJ = document.querySelector('#BandaDj1')
    let bolo = document.querySelector('#Bolo1')
    let convites = document.querySelector('#Convites1')
    let bebidasAlcoolicas = document.querySelector('#BebidasAlcoolicas1')


    consultaFirebase('Fotos',fotografo);
    consultaFirebase('Igreja',igreja);
    consultaFirebase('Celebrante',celebrante);
    consultaFirebase('decoracao',decoracao);
    consultaFirebase('iluminacao',iluminacao);
    consultaFirebase('Buffet',buffet);
    consultaFirebase('Trajes',trajes);
    consultaFirebase('Filmagem',filmagem);
    consultaFirebase('casados',bemCasados);
    consultaFirebase('Banda',bandaDJ);
    consultaFirebase('Bolo',bolo);
    consultaFirebase('Convites',convites);
    consultaFirebase('Bebidas',bebidasAlcoolicas);
    
    function consultaFirebase(child, HTMLElement){
        let fornecedor = HTMLElement.querySelector('.fornecedor th:nth-child(2)');
        let valorContrato = HTMLElement.querySelector('.valorContrato th:nth-child(2)');
        let quantidadeParcelas = HTMLElement.querySelector('.quantidadeParcelas th:nth-child(2)');
        const ref = firebase.database()
        .ref("EventoNovo" + "/" + idEvento)
        ref.child(child).on('value',snapshot=>{
            snapshot.forEach(value => {
                if(value.key == 'fornecedor')
                    fornecedor.textContent = value.val()
                else if(value.key == 'valorContrato')
                    valorContrato.textContent = value.val()
                else if(value.key == 'formaPagamento'){
                    if(value.val() == 'aVista')
                        quantidadeParcelas.textContent = 'À Vista'
                    else
                        quantidadeParcelas.textContent = value.val();
                }

            });
        })
    }
})()