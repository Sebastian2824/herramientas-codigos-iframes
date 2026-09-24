 import { ENV } from '../Config/config.js';

 // Configura tu Firebase
  const firebaseConfig = {
      apiKey: ENV.FIREBASE_API_KEY,
      authDomain: ENV.FIREBASE_AUTH_DOMAIN,
      projectId: ENV.FIREBASE_PROYECT_ID,
      storageBucket: ENV.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: ENV.FIREBASE_MESSAGING_SENDER_ID,
      appId: ENV.FIREBASE_APP_ID,
      measurementId: ENV.FIREBASE_MEASUREMENT_ID
    };

  // Inicializa Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

   // Espera a que cargue todo el DOM
  window.onload = () => {
    document.querySelector('.login-btn').addEventListener('click', async () => {
      const correo = document.getElementById('correo').value.trim();
      const password = document.getElementById('password').value.trim();

      if (!correo || !password) {
        alert("Por favor completa todos los campos.");
        return;
      }

      try {
        const snapshot = await db.collection('usuarios')
          .where('correo', '==', correo)
          .where('contraseña', '==', password)
          .get();

        if (!snapshot.empty) {
          alert("Inicio de sesión exitoso");
          const userId = snapshot.docs[0].id;
          localStorage.setItem("usuarioId", userId);
          window.location.href = "/herramientas-codigos-iframes/Views/Menu-Principal.html"; // Redirige al menú principal
        } else {
          alert("Correo o contraseña incorrectos.");
        }
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("Error al iniciar sesión. Inténtalo más tarde.");
      }
    });
  };

  // Mostrar ventana flotante al hacer clic en ¿Olvidaste tu contraseña?
document.querySelector('.forgot-password a').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('ventana-recuperacion').style.display = 'flex';
});

document.getElementById('btn-actualizar-password').addEventListener('click', async () => {
  const correo = document.getElementById('recuperar-correo').value.trim();
  const fecha = document.getElementById('recuperar-fecha').value.trim();
  const nuevaPassword = document.getElementById('nueva-password').value.trim();

  if (!correo || !fecha || !nuevaPassword) {
    alert("Por favor completa todos los campos.");
    return;
  }

  try {
    const snapshot = await db.collection('usuarios')
      .where('correo', '==', correo)
      .where('fechaNacimiento', '==', fecha)
      .get();

    if (!snapshot.empty) {
      const docRef = snapshot.docs[0].ref;
      await docRef.update({ contraseña: nuevaPassword });
      alert("Contraseña actualizada correctamente. Ahora puedes iniciar sesión.");
      document.getElementById('ventana-recuperacion').style.display = 'none';
      location.reload(); // Reinicia la interfaz
    } else {
      alert("Datos incorrectos. Verifica tu correo y fecha de nacimiento.");
    }
  } catch (error) {
    console.error("Error al actualizar contraseña:", error);
    alert("Hubo un error. Inténtalo más tarde.");
  }
});