const { Builder, By, until } = require('selenium-webdriver');

(async () => {
  try {
    // Iniciar el navegador (Chrome)
    const driver = await new Builder().forBrowser('chrome').build();

    // Establecer un timeout global para las esperas
    const TIMEOUT = 10000;

    console.log("Navegando a la página principal...");
    // Navegar a la página principal
    await driver.get('http://localhost:3000');

    // Hacer clic en el enlace de "Iniciar Sesión" en el header
    console.log("Abriendo el formulario de inicio de sesión...");
    await driver.wait(until.elementsLocated(By.css('.header-item > .header-title')), TIMEOUT);
    const elements = await driver.findElements(By.css('.header-item > .header-title')); // Selecciona todos los elementos
    await elements[1].click(); // El segundo es el de Iniciar Sesión

    // Esperar a que el modal/formulario esté visible
    console.log("Esperando que el formulario de inicio de sesión aparezca...");
    await driver.wait(until.elementLocated(By.css('.modal-content')), TIMEOUT);

    // Llenar los campos del formulario de inicio de sesión lentamente
    console.log("Llenando el formulario de inicio de sesión...");
    const emailInput = await driver.findElement(By.css('input#email'));
    const passwordInput = await driver.findElement(By.css('input#password'));

    // Escribir los valores lentamente
    await typeWithDelay(emailInput, 'testuser@example.com');
    await typeWithDelay(passwordInput, 'password123');

    // Enviar el formulario
    console.log("Enviando el formulario de inicio de sesión...");
    const loginButton = await driver.findElement(By.css('button.btn-login'));
    await loginButton.click();

    // Esperar unos segundos para observar el resultado
    console.log("Esperando para observar el resultado...");
    await driver.sleep(5000); // 5 segundos

    console.log('Formulario de inicio de sesión enviado, prueba completa.');
    // Cerrar el navegador
    await driver.quit();
  } catch (error) {
    console.error('Error durante la prueba de inicio de sesión:', error);
  }
})();

// Función para escribir lentamente en un campo
async function typeWithDelay(element, text) {
  for (let i = 0; i < text.length; i++) {
    await element.sendKeys(text[i]);  // Escribir cada letra
    await sleep(150);  // Retraso de 150 ms entre cada letra (ajustable)
  }
}

// Función de espera personalizada
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
