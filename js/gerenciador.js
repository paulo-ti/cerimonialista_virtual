

var query = firebase.database().ref("EventoNovo").orderByKey(); 
  function buscarDados(){
  query.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
       var key = childSnapshot.key;
       var childData = childSnapshot.val();
       console.log(childData)
   });
 });
}
 buscarDados();
