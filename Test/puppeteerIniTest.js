const puppeteer = require('puppeteer');

(async () => {
  try {
    // Iniciar el navegador
    const browser = await puppeteer.launch({
      headless: false, // Para ver el navegador
      slowMo: 100,     // Hace las acciones más lentas para que puedas verlas
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 }); // Tamaño de la ventana

    // Navegar a la página principal
    console.log("Navegando a la página principal...");
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

    // Simular la navegación a la página de la receta
    console.log("Navegando a la página de la receta...");
    await page.goto('http://localhost:3000/Receta', { waitUntil: 'networkidle2' });

    // Esperar 5 segundos para simular que se está viendo la receta
    console.log("Esperando dentro de la receta...");
    await page.waitForTimeout(5000);

    // Volver a la página principal
    console.log("Volviendo a la página principal...");
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

    // Esperar a que la página de inicio se recargue completamente
    await page.waitForTimeout(2000); // Espera 2 segundos

    // Hacer clic en el botón "Siguiente" de los consejos
    console.log("Haciendo clic en el botón 'Siguiente' en la sección de consejos...");
    await page.waitForSelector('.carrusel .boton-siguiente', { visible: true });
    await page.click('.carrusel .boton-siguiente');

    // Esperar 5 segundos para visualizar los nuevos consejos
    await page.waitForTimeout(5000);

    // Mantener el navegador abierto por unos segundos más para visualizar todo
    await page.waitForTimeout(5000);

    // Cerrar el navegador
    await browser.close();

  } catch (error) {
    console.error('Error durante la prueba de receta:', error);
  }
})();
