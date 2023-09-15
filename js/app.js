document.addEventListener("DOMContentLoaded", () => {

  const email = {
    email : "",
    asunto : "",
    mensaje : "",
  }  



  // Seleccionando los campos de entrada y el formulario
  const inputEmail = document.querySelector("#email");
  const inputAsunto = document.querySelector("#asunto");
  const inputMensaje = document.querySelector("#mensaje");
  const formulario = document.querySelector("#formulario");
  const btnSubmit = document.querySelector("#formulario button[type='submit']")
  const btnReset = document.querySelector("#formulario button[type='reset']")
  const spinner = document.querySelector("#spinner")
  

  // Agregando escuchadores de eventos a los campos de entrada
  inputEmail.addEventListener("input", validar);
  inputAsunto.addEventListener("input", validar);
  inputMensaje.addEventListener("input", validar);

  formulario.addEventListener("submit",enviarEmail)

  btnReset.addEventListener("click",(e)=>{
    e.preventDefault();
    
    resetFormulario();
  })

  // Función para validar los campos de entrada
  function validar(e) {
    // Verificando si el campo de entrada está vacío
    if (e.target.value.trim() === "") {
      mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }

    // Verificando si el campo de entrada es el campo de correo electrónico
    if (e.target.id === "email") {
      // Validando el formato del correo electrónico
      const emailValido = validarEmail(e.target.value);
      if (!emailValido) {
        mostrarAlerta("El email no es válido", e.target.parentElement);
        email[e.target.name] = "";
        comprobarEmail();
        return;
      }
    }

    // Limpiando cualquier alerta existente
    limpiarAlerta(e.target.parentElement);


    // Asignar Valores
    email[e.target.name] = e.target.value.trim().toLowerCase();

    // Comprobar objeto de email 

   comprobarEmail(); 
  }

  // Función para mostrar un mensaje de alerta
  function mostrarAlerta(mensaje, referencia) {
    // Limpiando cualquier alerta existente
    limpiarAlerta(referencia);

    // Creando un nuevo elemento de párrafo para la alerta
    const error = document.createElement("p");
    error.textContent = mensaje;
    error.classList.add("bg-red-600", "text-white", "p-2", "text-center", "uppercase");
    error.style.fontSize = "16px"; // Aumentando el tamaño de la fuente

    // Agregando la alerta al elemento padre
    referencia.appendChild(error);
  }

  // Función para eliminar cualquier alerta existente
  function limpiarAlerta(referencia) {
    // Seleccionando y eliminando cualquier alerta existente
    const alerta = referencia.querySelector(".bg-red-600");
    if (alerta) {
      alerta.remove();
    }
  }

  // Función para validar el formato del correo electrónico
  function validarEmail(email) {
    // Expresión regular para validar el formato del correo electrónico
    const regexEmail = /^[a-zA-Z]{2,12}@[^\s@]+\.[^\s@]+$/;
    const resultado = regexEmail.test(email);
    return resultado;
  }


  function comprobarEmail() {
     if(Object.values(email).includes("")){
      btnSubmit.classList.add("opacity-50");
      btnSubmit.disabled = true;
      return;
     }
        btnSubmit.classList.remove("opacity-50");
        btnSubmit.disabled = false;
  }

  function enviarEmail(e) {
    e.preventDefault();

    spinner.classList.add("flex")
    spinner.classList.remove("hidden")

    setTimeout(()=>{
      spinner.classList.add("hidden")
      spinner.classList.remove("flex")

         //REINICIAR EL OBJETO
     resetFormulario();

     //CREAR ALERTA
      const alertaExito = document.createElement("p");
      alertaExito.classList.add("bg-green-500","text-white","p-2","text-center","rounded-lg","mt-1'","font-bold","text-sm","uppercase");
      alertaExito.textContent = "Mensaje enviado correctamente"

      formulario.appendChild(alertaExito);
      setTimeout(() => {
          alertaExito.remove()
      }, 3000);
    },3000)
  }


  function resetFormulario() {
      //REINICIAR EL OBJETO
      email.email = "";
      email.asunto = "";
      email.mensaje = "";
  
      formulario.reset();
        comprobarEmail();
  }
});
