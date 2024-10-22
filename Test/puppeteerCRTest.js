const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    // Navegar a la página de creación
    await page.goto('http://localhost:3000/administrador/creacionr', { waitUntil: 'networkidle2' });

    // Esperar y hacer clic en el botón "Iniciar sesión"
    console.log("Esperando a que aparezca el botón de iniciar sesión...");
    await page.waitForSelector('.boton-login'); // Cambia el selector si es necesario
    await page.click('.boton-login');

    // Esperar a que el formulario esté visible
    console.log("Esperando que el formulario de creación aparezca...");
    await page.waitForSelector('.formulario-receta', { visible: true });

    // Llenar los campos del formulario
    console.log("Llenando el formulario de creación...");
    await page.type('input#nombre', 'Prueba de Puppeteer', { delay: 100 }); // Cambiado a "Prueba de Puppeteer"
    await page.type('textarea#descripcion', 'Descripción de la receta', { delay: 100 });
    await page.type('input#ingredientes', 'Ingrediente 1', { delay: 100 });
    await page.keyboard.press('Enter'); // Agregar ingrediente
    await page.type('input#ingredientes', 'Ingrediente 2', { delay: 100 });
    await page.keyboard.press('Enter'); // Agregar ingrediente
    await page.type('textarea#preparacion', 'Instrucciones de la receta', { delay: 100 });

    // Seleccionar opciones en los campos expandibles
    await page.select('select#categoria', 'Vegana'); // Seleccionar tipo de receta
    await page.select('select#duracion', 'Normal'); // Seleccionar duración
    await page.select('select#nivel', 'Normal'); // Seleccionar nivel de dificultad

    // Enviar el formulario
    console.log("Enviando el formulario de creación...");
    await page.click('button[type="submit"]');

    // Esperar unos segundos para ver el resultado
    await page.waitForTimeout(5000); // Esperar 5 segundos antes de cerrar el navegador

    // Cerrar el navegador
    console.log('Formulario de creación enviado, prueba completa.');
    await browser.close();

  } catch (error) {
    console.error('Error durante la prueba de creación:', error);
  }
})();
