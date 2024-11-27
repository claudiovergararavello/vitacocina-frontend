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

    // Hacer clic en el enlace de "Registrarse" en el header
    console.log("Abriendo el formulario de registro...");
    await driver.wait(until.elementLocated(By.css('.header-item > .header-title')), TIMEOUT);
    const registerLink = await driver.findElement(By.css('.header-item > .header-title'));
    await registerLink.click();

    // Esperar a que el modal/formulario esté visible
    console.log("Esperando que el formulario de registro aparezca...");
    await driver.wait(until.elementLocated(By.css('.modal-content')), TIMEOUT);

    // Llenar los campos del formulario lentamente
    console.log("Llenando el formulario de registro...");
    const usernameInput = await driver.findElement(By.css('input#username'));
    const emailInput = await driver.findElement(By.css('input#email'));
    const passwordInput = await driver.findElement(By.css('input#password'));
    const confirmPasswordInput = await driver.findElement(By.css('input#confirmPassword'));

    // Escribir en los campos con retraso
    await typeWithDelay(usernameInput, 'testuser');
    await typeWithDelay(emailInput, 'testuser@example.com');
    await typeWithDelay(passwordInput, 'password123');
    await typeWithDelay(confirmPasswordInput, 'password123');

    // Enviar el formulario
    console.log("Enviando el formulario de registro...");
    const registerButton = await driver.findElement(By.css('button.btn-register'));
    await registerButton.click();

    // Esperar unos segundos para observar el resultado
    console.log("Esperando para observar el resultado...");
    await driver.sleep(5000); // 5 segundos

    console.log('Formulario de registro enviado, prueba completa.');
    // Cerrar el navegador
    await driver.quit();
  } catch (error) {
    console.error('Error durante la prueba de registro:', error);
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
