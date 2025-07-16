/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const usuarioInput = this.usuario.value.trim();
  const contrasenaInput = this.contrasena.value.trim();

  // Obtener los usuarios registrados en localStorage
  const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Buscar si hay un usuario con esos datos
  const usuarioValido = usuariosGuardados.find(
    (u) => u.usuario === usuarioInput && u.contrasena === contrasenaInput
  );

  if (usuarioValido) {
    alert("¡Inicio de sesión exitoso!");
    localStorage.setItem("usuarioActual", JSON.stringify(usuarioValido));
    window.location.href = "inicio.html";
  } else {
    alert("Usuario o contraseña incorrectos. Inténtalo de nuevo.");
  }
});


