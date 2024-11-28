const { Builder, By, until, Key } = require('selenium-webdriver');

(async () => {
  try {

    const BASE_URL = process.env.BASE_URL || 'http://vitacocina-jenkins.s3-website-sa-east-1.amazonaws.com';

    // Iniciar el navegador (Chrome)
    const driver = await new Builder().forBrowser('chrome').build();

    // Establecer un timeout global
    const TIMEOUT = 10000;

    console.log("Navegando a la página de creación de recetas...");
    // Navegar a la página de creación
    await driver.get(`${BASE_URL}/administrador/creacionr`);

    console.log("Esperando a que aparezca el botón de iniciar sesión...");
    // Esperar y hacer clic en el botón "Iniciar sesión"
    const loginButton = await driver.wait(until.elementLocated(By.css('.boton-login')), TIMEOUT);
    await clickWithDelay(loginButton, 150); // Retraso de 150ms

    console.log("Esperando que el formulario de creación aparezca...");
    // Esperar que el formulario esté visible
    await driver.wait(until.elementLocated(By.css('.formulario-receta')), TIMEOUT);

    console.log("Llenando el formulario de creación de recetas...");
    // Llenar los campos del formulario
    const nombreInput = await driver.findElement(By.css('input#nombre'));
    const descripcionInput = await driver.findElement(By.css('textarea#descripcion'));
    const ingredientesInput = await driver.findElement(By.css('input#ingredientes'));
    const preparacionInput = await driver.findElement(By.css('textarea#preparacion'));
    const categoriaSelect = await driver.findElement(By.css('select#categoria'));
    const duracionSelect = await driver.findElement(By.css('select#duracion'));
    const nivelSelect = await driver.findElement(By.css('select#nivel'));
    const submitButton = await driver.findElement(By.css('button[type="submit"]'));

    // Rellenar campos con retraso
    await sendKeysWithDelay(nombreInput, 'Prueba de Selenium', 150); // Retraso de 150ms
    await sendKeysWithDelay(descripcionInput, 'Descripción de la receta', 150);
    await sendKeysWithDelay(ingredientesInput, 'Ingrediente 1', 150); // Ingrediente 1
    await ingredientesInput.sendKeys(Key.ENTER); // Agregar Ingrediente 1
    await sendKeysWithDelay(ingredientesInput, 'Ingrediente 2', 150); // Ingrediente 2
    await ingredientesInput.sendKeys(Key.ENTER); // Agregar Ingrediente 2
    await sendKeysWithDelay(preparacionInput, 'Instrucciones de la receta', 150);

    // Seleccionar opciones con retraso
    await categoriaSelect.sendKeys('Vegana'); // Cambiar a "Vegana"
    await duracionSelect.sendKeys('Normal'); // Cambiar a "Normal"
    await nivelSelect.sendKeys('Normal'); // Cambiar a "Normal"

    console.log("Enviando el formulario de creación...");
    // Enviar el formulario con retraso
    await clickWithDelay(submitButton, 150); // Retraso de 150ms

    // Esperar unos segundos para observar el resultado
    await driver.sleep(5000);

    console.log('Formulario de creación de recetas enviado correctamente.');

    // Cerrar el navegador
    await driver.quit();
  } catch (error) {
    console.error('Error durante la prueba de creación de recetas:', error);
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
