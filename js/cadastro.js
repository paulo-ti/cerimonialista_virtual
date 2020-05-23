var user;
(async function() {
    user = await getUser();

    async function getUser(){
        const user = await verificarUsuarioLogadoAsync();
        const userData = await getUserFromDatabase(user.uid);
        try{
            document.getElementById("nomeCompleto").value = userData.nomeCompleto;
        }catch(e){
            console.log(e);
        }
        try{
            document.getElementById("email").value = user.email
        }
        catch(e){
            console.log(e);
        }
        try{
            let checkboxSexoMasculino = document.getElementById("sexoM");
            let checkboxSexoFeminino = document.getElementById("sexoF");
            if (checkboxSexoMasculino.value == userData.sexo)
                checkboxSexoMasculino.checked = true;
            else if (checkboxSexoFeminino.value == userData.sexo)
            checkboxSexoFeminino.checked = true;
        }
        catch(e){
            console.log(e);
        }
        try{
            document.getElementById("telefone").value = userData.telefone
        }
        catch(e){
            console.log(e);
        }
        try{
            document.getElementById("dataNascimento").value = userData.dataNascimento
        }
        catch(e){
            console.log(e);
        }
        try{
            document.getElementById("receberEmail").checked = userData.emailsPromocionais
        }
        catch(e){
            console.log(e);
        }try{
            document.getElementById("receberWpp").checked = userData.notificacaoWhatsApp
        }
        catch(e){
            console.log(e);
        }
        return user;
    }

    function getUserFromDatabase(uid){
        const ref = firebase.database().ref(`users/${uid}`);
        return new Promise((resolve, reject)=>{
            ref.orderByKey().once("value", function(snapshot){
                resolve(snapshot)
            })
        })
        .then(snapshot=>snapshot.val())
    }

})()

//Evento do botão SalvarAlterações
function updateUser(e){
    e.preventDefault();
    try{
        const refUsers = firebase.database().ref("users")
        var nomeCompleto = document.getElementById('nomeCompleto').value;
        console.log(document.getElementById('sexoM').value);
        let radios = document.getElementsByName("sexo");
        let sexo;
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                sexo = radios[i].value;
            }
        }
        var telefone = document.getElementById('telefone').value;
        var dataNascimento = document.getElementById('dataNascimento').value;
        if(document.getElementById('receberEmail').checked == true)
            var emailsPromocionais = true;
        else
            var emailsPromocionais = false;
        if(document.getElementById('receberWpp').checked == true)
            var notificacaoWhatsApp = true;
        else
            var notificacaoWhatsApp = false;
        var updateData = {nomeCompleto: nomeCompleto,sexo: sexo ,telefone: telefone, dataNascimento: dataNascimento, emailsPromocionais : emailsPromocionais, notificacaoWhatsApp : notificacaoWhatsApp};
        refUsers.child(user.uid).update(updateData).then(()=>{
            alert("Dados Atualizados com Sucesso!");
        });
    }catch(e){
        alert("Não foi possível atualizar os dados.");
        console.log(e);
    }
}

