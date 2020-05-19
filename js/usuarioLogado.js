function verificarUsuarioLogado(){
    const auth = firebase.auth();
    console.log(auth);
    auth.onAuthStateChanged(function(user) {
        if (!user) {
            window.location.href = "entrar.html";
        } 
    })
}