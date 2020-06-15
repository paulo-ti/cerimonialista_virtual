(function(){
    let estado = document.querySelector('#estado')
    let cidade = document.querySelector('#cidade')
    estado.addEventListener('change',(event)=>{
        request = new XMLHttpRequest()
        let estadoSelecionado = estado.options[estado.selectedIndex].value
        console.log(estadoSelecionado)
        request.open('GET',`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`)
        request.send()
        request.addEventListener('load',()=>{
            if(request.status == 200){
                cidade.innerHTML = ''
                adicionarOpcaoDefault()
                let cidades = JSON.parse(request.responseText)
                const cidadesSet = new Set()
                cidades.forEach(cidade => {
                    cidadesSet.add(cidade.nome)
                });
                let cidadesLista = Array.from(cidadesSet)
                cidadesLista.sort(function (a, b) {
                    return a.localeCompare(b);
                });
                cidadesLista.forEach(cidade => {
                    adicionarAoHTML(cidade)
            });
            }
        })
    })
    
    function adicionarAoHTML(nomeCidade){
        let opcaoCidade = document.createElement('option')
        opcaoCidade.value = nomeCidade
        opcaoCidade.appendChild(document.createTextNode(nomeCidade))
        cidade.appendChild(opcaoCidade)
    }
    function adicionarOpcaoDefault(){
        let opcaoCidade = document.createElement('option')
        opcaoCidade.value =''
        opcaoCidade.disabled = true
        opcaoCidade.selected = true
        opcaoCidade.appendChild(document.createTextNode('Selecione a Cidade'))
        cidade.appendChild(opcaoCidade)
    }
})()
/*
const localidades = {
        RO: 11,
        AC: 12,
        AM: 13,
        RR: 14,
        PA: 15,
        AP: 16,
        TO: 17,
        MA: 21,
        PI: 22,
        CE: 23,
        RN: 24,
        PB: 25,
        PE: 26,
        AL: 27,
        SE: 28,
        BA: 29,
        MG: 31,
        ES: 32,
        RJ: 33,
        SP: 35,
        PR: 41,
        SC: 42,
        RS: 43,
        MS: 50,
        MT: 51,
        GO: 52,
        DF: 53
    }
    */