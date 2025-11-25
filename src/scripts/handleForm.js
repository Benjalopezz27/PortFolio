// src/scripts/handleForm.js
import Swal from "sweetalert2";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", async function (event) {
      event.preventDefault(); 

      const formData = new FormData(form);
      const actionUrl = form.getAttribute("action");

      // 1. Obtener el botón de envío
      const submitButton = form.querySelector('button[type="submit"]');

      // 2. Deshabilitar el botón e indicar que se está enviando
      const originalText = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.innerHTML = 'Enviando...'; // Muestra estado de carga

      try {
        const response = await fetch(actionUrl, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "¡Mensaje Enviado con Éxito!",
            text: "¡Gracias por contactarme! Te responderé lo antes posible.",
            confirmButtonColor: "#F59E0B",
          });
          form.reset();
        } else {
          Swal.fire({
            icon: "error",
            title: "Error de Envío",
            text: "Hubo un error al enviar tu mensaje. Por favor, asegúrate de que todos los campos sean correctos.",
            confirmButtonColor: "#F59E0B",
          });
        }
      } catch (error) {
        console.error("Error de red:", error);
        Swal.fire({
          icon: "warning",
          title: "Error de Conexión",
          text: "Hubo un error de conexión. Por favor, comprueba tu internet o usa los enlaces de contacto directo.",
          confirmButtonColor: "#F59E0B",
        });
      } finally {
        // 3. Habilitar el botón de nuevo (siempre se ejecuta)
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
      }
    });
  }
});