    getUsers();

    async function getUsers(){
        const user = await verificarUsuarioLogadoAsync();
        const userData = await getUsersFromDatabase(user.uid);
        try{
            document.getElementById("nomeCompleto").value = userData.nomeCompleto;
        }catch(e){
            console.log(e);
        }
        document.getElementById("email").value = user.email;
    }

    function getUsersFromDatabase(uid){
        const ref = firebase.database().ref(`users/${uid}`);
        return new Promise((resolve, reject)=>{
            ref.orderByKey().once("value", function(snapshot){
                resolve(snapshot)
            })
        })
        .then(snapshot=>snapshot.val())
    }