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

    // Hacer clic en el enlace de "Administrador"
    console.log("Navegando a la página de creación...");
    await page.goto('http://localhost:3000/administrador/creacionc', { waitUntil: 'networkidle2' });

    // Esperar a que el formulario esté visible
    console.log("Esperando que el formulario de creación aparezca...");
    await page.waitForSelector('.formulario-consejo', { visible: true });

    // Llenar los campos del formulario
    console.log("Llenando el formulario de creación...");
    await page.type('input#nombre', 'Nombre del consejo', { delay: 100 });
    await page.type('textarea#descripcion', 'Descripción del consejo', { delay: 100 });
    await page.type('textarea#consejo', 'Contenido del consejo', { delay: 100 });
    
    // Llenar la valoración inicial
    console.log("Estableciendo la valoración inicial...");
    await page.type('input#valoracion', '4', { delay: 100 }); // Asignar un valor de valoración inicial

    // Manejar la subida de una imagen (si es necesario)
    const filePath = 'ruta/a/tu/imagen.jpg'; // Cambia esto a la ruta de tu imagen
    const inputFile = await page.$('input[type="file"]');
    if (inputFile) {
      await inputFile.uploadFile(filePath);
      console.log("Imagen cargada.");
    }

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
