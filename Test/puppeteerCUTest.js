const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false, // Cambia a true si no quieres ver el navegador
      slowMo: 100, // Velocidad de interacción con la página
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    // Navegar a la página de creación
    await page.goto('http://localhost:3000/administrador/crearu', { waitUntil: 'networkidle2' });

    // Esperar y hacer clic en el botón "Iniciar sesión"
    console.log("Esperando a que aparezca el botón de iniciar sesión...");
    await page.waitForSelector('.boton-login'); // Asegúrate de que este selector es correcto
    await page.click('.boton-login');

    // Esperar a que el formulario esté visible
    console.log("Esperando que el formulario de creación aparezca...");
    await page.waitForSelector('.formulario-consejo', { visible: true });

    // Llenar los campos del formulario
    console.log("Llenando el formulario de creación de usuario...");
    await page.type('input#nombre', 'Prueba de Puppeteer', { delay: 100 });
    await page.type('input#mail', 'usuario.prueba@example.com', { delay: 100 });
    await page.type('input#contraseña', 'contraseñaSegura123', { delay: 100 });

    // Llenar el campo de confirmación de contraseña
    await page.type('input#ccontraseña', 'contraseñaSegura123', { delay: 100 });

    // Seleccionar rol del usuario
    await page.select('select#tipo', 'usuariox'); // Cambiar a 'admin' o 'usuario' según sea necesario

    // Enviar el formulario
    console.log("Enviando el formulario de creación de usuario...");
    await page.click('button[type="submit"]');

    // Esperar mensaje de éxito o que el formulario se haya enviado correctamente
    console.log("Esperando respuesta del formulario...");
    await page.waitForTimeout(2000); // Esperar 2 segundos para que se procese la creación

    // Verificar si se muestra el mensaje de éxito
    const successMessage = await page.$eval('p', el => el.textContent); // Cambia el selector según tu implementación
    if (successMessage.includes('Usuario creado exitosamente')) {
      console.log('Prueba exitosa: El usuario fue creado correctamente.');
    } else {
      console.error('Prueba fallida: No se mostró el mensaje de éxito esperado.');
    }

    // Esperar un momento para ver el resultado
    await page.waitForTimeout(5000); // Esperar 5 segundos antes de cerrar el navegador

    // Cerrar el navegador
    console.log('Formulario de creación de usuario enviado, prueba completa.');
    await browser.close();

  } catch (error) {
    console.error('Error durante la prueba de creación de usuario:', error);
  }
})();
