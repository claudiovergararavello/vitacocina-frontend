const { Builder, By, until } = require('selenium-webdriver');

(async () => {
  try {

    const BASE_URL = process.env.BASE_URL || 'http://vitacocina-jenkins.s3-website-sa-east-1.amazonaws.com';

    // Iniciar el navegador (Chrome)
    const driver = await new Builder().forBrowser('chrome').build();

    // Establecer un timeout global
    const TIMEOUT = 10000;

    console.log("Navegando a la página de creación de usuario...");
    // Navegar a la página de creación
    await driver.get(`${BASE_URL}/administrador/crearu`);

    console.log("Esperando a que aparezca el botón de iniciar sesión...");
    // Esperar y hacer clic en el botón "Iniciar sesión"
    const loginButton = await driver.wait(until.elementLocated(By.css('.boton-login')), TIMEOUT);
    await clickWithDelay(loginButton, 300); // Retraso de 300ms

    console.log("Esperando que el formulario de creación aparezca...");
    // Esperar que el formulario esté visible
    await driver.wait(until.elementLocated(By.css('.formulario-consejo')), TIMEOUT);

    console.log("Llenando el formulario de creación de usuario...");
    // Llenar los campos del formulario
    const nombreInput = await driver.findElement(By.css('input#nombre'));
    const emailInput = await driver.findElement(By.css('input#mail'));
    const passwordInput = await driver.findElement(By.css('input#contraseña'));
    const confirmPasswordInput = await driver.findElement(By.css('input#ccontraseña'));
    const roleSelect = await driver.findElement(By.css('select#tipo'));
    const submitButton = await driver.findElement(By.css('button[type="submit"]'));

    // Rellenar los campos con retraso
    await sendKeysWithDelay(nombreInput, 'Prueba de Selenium', 150); // Retraso de 300ms
    await sendKeysWithDelay(emailInput, 'usuario.prueba@example.com', 150);
    await sendKeysWithDelay(passwordInput, 'contraseñaSegura123', 150);
    await sendKeysWithDelay(confirmPasswordInput, 'contraseñaSegura123', 150);

    // Seleccionar rol del usuario con retraso
    await roleSelect.sendKeys('usuariox'); // Cambia según el valor necesario ('admin', 'usuario', etc.)
    console.log("Esperando 300ms antes de hacer clic en enviar...");
    await sleep(300); // Retraso adicional antes de enviar el formulario

    console.log("Enviando el formulario de creación de usuario...");
    // Enviar el formulario con retraso
    await clickWithDelay(submitButton, 300); // Retraso de 300ms

    console.log("Esperando respuesta del formulario...");
    // Esperar un tiempo para que se procese la creación del usuario
    await driver.sleep(2000);

    console.log("Verificando el mensaje de éxito...");
    // Verificar si se muestra el mensaje de éxito
    const successMessageElement = await driver.findElement(By.css('p')); // Cambia el selector según tu implementación
    const successMessage = await successMessageElement.getText();
    if (successMessage.includes('Usuario creado exitosamente')) {
      console.log('Prueba exitosa: El usuario fue creado correctamente.');
    } else {
      console.error('Prueba fallida: No se mostró el mensaje de éxito esperado.');
    }

    console.log("Esperando unos segundos para visualizar el resultado...");
    // Esperar unos segundos para visualizar los resultados
    await driver.sleep(5000);

    console.log('Cerrando el navegador...');
    // Cerrar el navegador
    await driver.quit();

  } catch (error) {
    console.error('Error durante la prueba de creación de usuario:', error);
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
