function verificarUsuarioLogado(){
    const auth = firebase.auth();
    auth.onAuthStateChanged(function(user) {
        if (!user) {
            window.location.href = "entrar.html";
        }
        else 
            return auth.currentUser.uid; 
    })
}
function verificarUsuarioLogadoAsync(){
    const auth = firebase.auth();
    return new Promise((resolve, reject)=>{
        auth.onAuthStateChanged((user)=>{
            if(user){
                resolve(user);
            }else{
                reject(new Error("User not logged!"));
            }
        })
    })
}