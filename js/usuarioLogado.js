function verificarUsuarioLogado(){
    const auth = firebase.auth();
    auth.onAuthStateChanged(function(user) {
        if (!user) {
            window.location.href = "entrar.html";
        } 
    })
}