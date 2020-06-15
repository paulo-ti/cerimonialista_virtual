function confirmarRemocao(genero, EntidadeASerRemovida){
    const opcao = {
        masculino: 'um',
        feminino: 'uma'
    }
    let masculino = 'um'
    let feminino = 'uma'
    return confirm(`Confirma a remoção? Ao remover ${opcao[genero]} ${EntidadeASerRemovida} os dados estarão perdidos para sempre!`)
}