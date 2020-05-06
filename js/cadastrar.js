(function () {
  const database = firebase.database();
  const userRef = database.ref("Usuario");

  const email = document.querySelector('#txtEmail');
  const completeName = document.querySelector('#txtNome');
  const username = document.querySelector('#txtUsuario');
  const password = document.querySelector('#txtSenha');
  const registerBtn = document.querySelector('#btnCadastrar');

  function paintField(field) {
    const { value: fieldValue } = field;

    field.border = `1px solid ${(fieldValue === '') ? 'red' : 'purple'}`;
  }

  function validateFields({ email, completeName, username, password }) {
    const fields = [email, completeName, username, password];

    const fieldsValue = fields.map(field => field.value);
    fieldsValue.forEach(fieldValue => { paintField(fieldValue) });

    return !fieldsValue.includes('');
  }

  async function registerUser(email, password) {
    try {
      const register = await firebase.auth().createUserWithEmailAndPassword(email, password);
      return register;
    } catch (err) {
      console.error(err);
    }
  }

  // Evento de Cadastro
  registerBtn.addEventListener('click', (e) => {
    e.preventDefault();

    console.log('Entrou');
    if (validateFields({ email, completeName, username, password })) {
      registerUser(email.value, password.value)
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, false);

})();
