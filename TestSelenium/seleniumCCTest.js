const { Builder, By, until, Key } = require('selenium-webdriver');

(async () => {
  try {
    // Iniciar el navegador (Chrome)
    const driver = await new Builder().forBrowser('chrome').build();

    // Establecer un timeout global
    const TIMEOUT = 10000;

    console.log("Navegando a la página de creación de consejos...");
    // Navegar a la página donde aparece la caja de login (URL original)
    await driver.get('http://localhost:3000/administrador/creacionc');

    console.log("Esperando a que aparezca el botón de iniciar sesión...");
    // Esperar y hacer clic en el botón de login/registro
    const loginButton = await driver.wait(until.elementLocated(By.css('.boton-login')), TIMEOUT);
    await loginButton.click();  // Clic en el botón de login/registro

    // Esperar que el contenido de la página se actualice después de hacer clic
    await driver.sleep(1500); // Espera de 1500ms para dar tiempo a que la acción se ejecute

    console.log("Esperando que el formulario de creación aparezca...");
    // Esperar que el formulario esté visible
    await driver.wait(until.elementLocated(By.css('.formulario-consejo')), TIMEOUT);

    console.log("Llenando el formulario de creación...");
    // Llenar los campos del formulario
    const nombreInput = await driver.findElement(By.css('input#nombre'));
    const descripcionInput = await driver.findElement(By.css('textarea#descripcion'));
    const consejoInput = await driver.findElement(By.css('textarea#consejo'));
    const valoracionInput = await driver.findElement(By.css('input#valoracion'));
    const submitButton = await driver.findElement(By.css('button[type="submit"]'));

    // Rellenar los campos del formulario con retraso
    await sendKeysWithDelay(nombreInput, 'Nombre del consejo', 150); 
    await sendKeysWithDelay(descripcionInput, 'Descripción del consejo', 150);
    await sendKeysWithDelay(consejoInput, 'Contenido del consejo', 150);
    await sendKeysWithDelay(valoracionInput, '4', 150); // Establecer la valoración inicial

    console.log("Enviando el formulario de creación...");
    // Enviar el formulario con retraso
    await clickWithDelay(submitButton, 150); 

    console.log("Esperando el resultado...");
    // Esperar unos segundos para visualizar el resultado
    await driver.sleep(5000); // Esperar 5 segundos

    console.log('Formulario de creación enviado correctamente.');

    // Cerrar el navegador
    await driver.quit();
  } catch (error) {
    console.error('Error durante la prueba de creación de consejos:', error);
  }
})();

// Función para hacer clic con retraso
async function clickWithDelay(element, delay) {
  await element.click();
  console.log(`Clic realizado con retraso de ${delay}ms.`);
  await sleep(delay); // Retraso configurado
}

// Función para escribir con retraso
async function sendKeysWithDelay(element, text, delay) {
  for (let i = 0; i < text.length; i++) {
    await element.sendKeys(text[i]);
    console.log(`Escribiendo "${text[i]}"...`);
    await sleep(delay); // Retraso entre cada letra
  }
}

// Función de espera personalizada
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
