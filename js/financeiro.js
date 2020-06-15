(function(){
    let url_atual1 = window.location.href.split('?')
    let idEvento = url_atual1[1];
    const ref = firebase.database()
        .ref("EventoNovo" + "/" + idEvento)
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

    let botoesAdicao = document.querySelectorAll('.btn-parcelas-pagas-adicao')
    let botoesSubtracao = document.querySelectorAll('.btn-parcelas-pagas-subtracao')

    const correspondenteFirebase = {
        Fotografo1: 'Fotos', 
        Igreja1: 'Igreja',
        Celebrante1: 'Celebrante',
        Decoracao1: 'decoracao',
        Iluminacao1: 'iluminacao',
        Buffet1: 'Buffet',
        Trajes1: 'Trajes',
        Filmagem1: 'Filmagem',
        BemCasados1: 'casados',
        BandaDj1: 'Banda',
        Bolo1: 'Bolo',
        Convites1: 'Convites',
        BebidasAlcoolicas1: 'Bebidas'
    }

    addListenersBotoesAdicao()
    addListenersBotoeSubtracao()

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
        let debito = HTMLElement.querySelector('.debito th:nth-child(2)');
        let parcelasPagas = HTMLElement.querySelector('.parcelasPagas span');
        
        ref.child(child).on('value',snapshot=>{
            fornecedor.textContent = snapshot.val().fornecedor
            let valorContratoValue = parseFloat(snapshot.val().valorContrato);
            if(isNaN(valorContratoValue.toFixed(2)))
                valorContrato.textContent = '0.00'
            else
                valorContrato.textContent = valorContratoValue.toFixed(2)

            if(snapshot.val().formaPagamento == 'aVista')
                quantidadeParcelas.textContent = 'À Vista'
            else
                quantidadeParcelas.textContent = snapshot.val().formaPagamento;
            if(snapshot.hasChild('parcelasPagas')){
                parcelasPagas.textContent = snapshot.val().parcelasPagas
            }
            else
                parcelasPagas.textContent = 0
            let valorParcela = valorContrato.textContent / quantidadeParcelas.textContent.split("").filter(n => (Number(n) || n == 0)).join("");;
            var debitoValor = (valorContrato.textContent - valorParcela * parcelasPagas.textContent).toFixed(2)
            if(isNaN(debitoValor)){
                debito.textContent = '0.00'
            }else{
                debito.textContent = debitoValor
            }
            var debitosTotais = calcularDebitos()
            var custoTotal = calcularCusto();
            var pago = (custoTotal - debitosTotais).toFixed(2)
            document.querySelector('#totalPago').textContent = pago
        })
    }

    function addListenersBotoesAdicao(){
        for(let i = 0; i < botoesAdicao.length; i++){
            botoesAdicao[i].addEventListener('click',(event)=>{
                let tbody = event.target.parentNode.parentNode.parentNode
                let quantidadeParcelasMaxima = tbody.querySelector('.quantidadeParcelas th:nth-child(2)').textContent.split("").filter(n => (Number(n) || n == 0)).join("");
                var idHTML = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id
                var parcelasPagasNode = event.target.parentNode.querySelector('span');
                var parcelasPagasInt = parseInt(parcelasPagasNode.textContent)
                if(quantidadeParcelasMaxima > parcelasPagasInt){
                    parcelasPagasInt++
                    updateParcelas(correspondenteFirebase[idHTML],parcelasPagasInt, parcelasPagasNode)
                }
                
            })
        }
    }
    function addListenersBotoeSubtracao(){
        for(let i = 0; i < botoesSubtracao.length; i++){
            botoesSubtracao[i].addEventListener('click',(event)=>{
                var idHTML = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id
                var parcelasPagasNode = event.target.parentNode.querySelector('span');
                var parcelasPagasInt = parseInt(parcelasPagasNode.textContent)
                if(parcelasPagasInt > 0){
                    parcelasPagasInt--
                    updateParcelas(correspondenteFirebase[idHTML],parcelasPagasInt, parcelasPagasNode)
                }
            })
        }
    }
    function updateParcelas(child, parcelasPagas){
        ref.child(`${child}/parcelasPagas`).set(parcelasPagas)
    }
    function calcularDebitos(){
        var debitos = document.querySelectorAll('.debito th:nth-child(2)')
        var somaDebitos = 0;
        for(let i = 0; i < debitos.length; i++){
            if((!isNaN(debitos[i].textContent)) && debitos[i].textContent != ''){
                somaDebitos += parseFloat(debitos[i].textContent)
            }
        }
        document.querySelector('#totalDebito').textContent = somaDebitos.toFixed(2)
        return somaDebitos;
    }
    function calcularCusto(){
        var valorContrato = document.querySelectorAll('.valorContrato th:nth-child(2)')
        var somaCusto = 0;
        for(let i = 0; i < valorContrato.length; i++){
            if(!isNaN(valorContrato[i].textContent) && valorContrato[i].textContent != '')
                somaCusto += parseFloat(valorContrato[i].textContent)
        }
        document.querySelector('#totalCusto').textContent = somaCusto.toFixed(2)
        return somaCusto;
    }
})()