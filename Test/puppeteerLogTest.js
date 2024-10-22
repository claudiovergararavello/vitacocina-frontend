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

    // Hacer clic en el enlace de "Iniciar Sesión" en el header
    console.log("Abriendo el formulario de inicio de sesión...");
    await page.waitForSelector('.header-item > .header-title'); // Esperar el selector del enlace de inicio de sesión
    const elements = await page.$$('.header-item > .header-title'); // Selecciona todos los elementos de la clase
    await elements[1].click(); // El segundo es el de Iniciar Sesión

    // Esperar a que el modal/formulario esté visible
    console.log("Esperando que el formulario de inicio de sesión aparezca...");
    await page.waitForSelector('.modal-content', { visible: true });

    // Llenar los campos del formulario de inicio de sesión
    console.log("Llenando el formulario de inicio de sesión...");
    await page.type('input#email', 'testuser@example.com', { delay: 100 });
    await page.type('input#password', 'password123', { delay: 100 });

    // Enviar el formulario
    console.log("Enviando el formulario de inicio de sesión...");
    await page.click('button.btn-login');

    // Esperar unos segundos para ver el resultado
    await page.waitForTimeout(5000); // Esperar 5 segundos antes de cerrar el navegador

    // Cerrar el navegador
    console.log('Formulario de inicio de sesión enviado, prueba completa.');
    await browser.close();

  } catch (error) {
    console.error('Error durante la prueba de inicio de sesión:', error);
  }
})();
