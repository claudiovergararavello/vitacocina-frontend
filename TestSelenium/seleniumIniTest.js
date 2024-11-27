const { Builder, By, until } = require('selenium-webdriver');

(async () => {
  try {
    // Iniciar el navegador (Chrome)
    const driver = await new Builder().forBrowser('chrome').build();

    // Establecer un timeout global
    const TIMEOUT = 10000;

    console.log("Navegando a la página principal...");
    // Navegar a la página principal
    await driver.get('http://localhost:3000');

    console.log("Navegando a la página de la receta...");
    // Navegar a la página de recetas
    await driver.get('http://localhost:3000/Receta');

    // Esperar 5 segundos para simular la visualización de la receta
    console.log("Esperando dentro de la receta...");
    await driver.sleep(5000);

    console.log("Volviendo a la página principal...");
    // Volver a la página principal
    await driver.get('http://localhost:3000');

    // Esperar 2 segundos para asegurar que la página de inicio se recarga completamente
    await driver.sleep(2000);

    console.log("Haciendo clic en el botón 'Siguiente' en la sección de consejos...");
    // Esperar que el botón "Siguiente" esté visible
    await driver.wait(until.elementLocated(By.css('.carrusel .boton-siguiente')), TIMEOUT);
    const nextButton = await driver.findElement(By.css('.carrusel .boton-siguiente'));

    // Hacer clic en el botón "Siguiente" con un retraso para simular un clic más realista
    await clickWithDelay(nextButton);

    // Esperar 5 segundos para visualizar los nuevos consejos
    console.log("Esperando para visualizar los nuevos consejos...");
    await driver.sleep(5000);

    // Mantener el navegador abierto por unos segundos más para visualizar todo
    console.log("Finalizando prueba...");
    await driver.sleep(5000);

    // Cerrar el navegador
    await driver.quit();
  } catch (error) {
    console.error('Error durante la prueba de receta:', error);
  }
})();

// Función para hacer clic con retraso
async function clickWithDelay(element) {
  await element.click();
  console.log("Clic realizado con retraso.");
  await sleep(500); // Retraso de 500ms entre el clic y la siguiente acción (ajustable)
}

// Función de espera personalizada
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
