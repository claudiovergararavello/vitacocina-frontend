const puppeteer = require('puppeteer');

(async () => {
  try {
    // Iniciar el navegador en modo visible (headless: false)
    const browser = await puppeteer.launch({
      headless: false, // Para ver el navegador
      slowMo: 100,      // Hace las acciones más lentas para que puedas verlas
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    // Navegar a la página principal
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

    // Hacer clic en el enlace de "Registrarse" en el header
    console.log("Abriendo el formulario de registro...");
    await page.waitForSelector('.header-item > .header-title'); // Esperar el selector del enlace de registro
    await page.click('.header-item > .header-title'); // Hacer clic en el enlace

    // Esperar a que el modal/formulario esté visible
    console.log("Esperando que el formulario de registro aparezca...");
    await page.waitForSelector('.modal-content', { visible: true });

    // Llenar los campos del formulario
    console.log("Llenando el formulario de registro...");
    await page.type('input#username', 'testuser', { delay: 100 });
    await page.type('input#email', 'testuser@example.com', { delay: 100 });
    await page.type('input#password', 'password123', { delay: 100 });
    await page.type('input#confirmPassword', 'password123', { delay: 100 });

    // Enviar el formulario
    console.log("Enviando el formulario de registro...");
    await page.click('button.btn-register');

    // Esperar unos segundos para ver el resultado
    await page.waitForTimeout(5000); // Esperar 5 segundos antes de cerrar el navegador

    // Cerrar el navegador
    console.log('Formulario de registro enviado, prueba completa.');
    await browser.close();

  } catch (error) {
    console.error('Error durante la prueba de registro:', error);
  }
})();
