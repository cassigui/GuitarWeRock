// class FormSubmit {
//   constructor(settings) {
//     this.settings = settings;
//     this.form = document.querySelector(settings.form);
//     this.formButton = document.querySelector(settings.button);

//     if (this.form) {
//       this.url = this.form.getAttribute("action");
//     }

//     // Corrige a vinculação do método para o escopo correto
//     this.sendForm = this.sendForm.bind(this);
//   }

//   displaySuccess() {
//     this.form.innerHTML = this.settings.success;
//   }

//   displayError() {
//     this.form.innerHTML = this.settings.error;
//   }

//   getFormObj() {
//     const formObj = {};
//     const fields = this.form.querySelectorAll("[name]");

//     fields.forEach((field) => {
//       formObj[field.getAttribute("name")] = field.value;
//     });

//     return formObj;
//   }

//   onSubmission(event) {
//     event.preventDefault();
//     event.target.disabled = true;
//     event.target.innerHTML = "enviando";
//   }

//   async sendForm(event) {
//     this.onSubmission(event);
//     try {
//       const response = await fetch(this.url, {
//         method: "POST",
//         mode: "no-cors",
//         headers: {
//           "Content-type": "application/json",
//           "Accept": "application/json",
//         },
//         body: JSON.stringify(this.getFormObj()),
//       });

//       if (response.ok) {
//         this.displaySuccess();
//       } else {
//         this.displayError();
//       }
//     } catch (error) {
//       this.displayError();
//       console.error(error);
//     } finally {
//       event.target.disabled = false;
//       event.target.innerHTML = "Enviar";
//     }
//   }

//   init() {
//     if (this.form) this.formButton.addEventListener("click", this.sendForm);
//     return this;
//   }
// }

// const formSubmit = new FormSubmit({
//   form: "[data-form]",
//   button: "[data-button]",
//   success: "<h1>Mensagem enviada</h1>",
//   error: "<h1>Não foi possível enviar sua mensagem</h1>",
// });

// formSubmit.init();
document.getElementById("contact-form").addEventListener("submit", (event) => {

  event.preventDefault();
  const email = document.getElementById("email").value
  const nome = document.getElementById("nome").value
  const telefone = document.getElementById("celular").value
  const mensagem = document.getElementById("mensagem").value

  const modalTitle = document.getElementById("modal-title")
  const modalText = document.getElementById("modal-text")

  const modalStyle = document.getElementById("modalStyle")
  const btnStyle = document.getElementById("btnModal")

  if (email && mensagem && nome && telefone) {
    try {
      Email.send({
        Host: "smtp.elasticemail.com",
        Username: "cassianoguilhermee@gmail.com",
        Password: "70ABEDF546761F90E647EE0ABA27499FA908",
        To: "cassianoguilhermee@gmail.com",
        From: "cassianoguilhermee@gmail.com",
        Subject: "This is the subject",
        Body: "Email de " + nome + "<br>Email:" + email + "<br>Telefone: " + telefone + "<br>Mensagem:" + mensagem
      })
      modalTitle.innerHTML = "Sucesso!"
      modalText.innerHTML = nome + ", seu email foi enviado com sucesso!"
      modalStyle.className += " bg-success"
      btnStyle.className += " bg-success"
    }
    catch (error) {
      throw new Error(error)
    }
  } else {
    modalTitle.innerHTML = "Falha ao enviar o email"
    modalText.innerHTML = "Preencha todos os campos corretamente"
    modalStyle.className += " bg-danger"
    btnStyle.className += " bg-danger"
  }
})
