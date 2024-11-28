const puppeteer = require('puppeteer');

(async () => {
  try {

    BASE_URL = 'http://vitacocina-jenkins.s3-website-sa-east-1.amazonaws.com'

    // Iniciar el navegador
    const browser = await puppeteer.launch({
      headless: false, // Mostrar el navegador
      slowMo: 50,      // Reducir la velocidad de las acciones
      devtools: true,  // Abrir DevTools en la ventana de Chrome
    });

    const page = await browser.newPage();

    // Establecer las dimensiones de la pantalla (viewport)
    await page.setViewport({ width: 1280, height: 800 });

    // Configurar un timeout global mayor
    page.setDefaultNavigationTimeout(60000);

    // Función para visitar una página y esperar el clic
    const visitPage = async (url, description) => {
      try {
        console.log(`Accediendo a: ${description} -> ${url}`);
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Esperar hasta que el usuario haga clic en cualquier parte de la pantalla
        console.log(`Por favor, haz clic en la pantalla para continuar a la siguiente página...`);
        await page.waitForFunction(() => new Promise(resolve => {
          // Escuchar el evento de clic en la página
          document.addEventListener('click', () => {
            resolve(true);
          }, { once: true });
        }));

        console.log(`Clic detectado. Navegando a la siguiente página...`);
      } catch (err) {
        console.error(`Error al intentar acceder: ${url} ->`, err);
      }
    };

    // Definir las páginas a visitar
    const pagesToVisit = [
      { url: `${BASE_URL}`, description: 'Página Principal' },
      { url: `${BASE_URL}/recetas/favoritos`, description: 'Recetas Favoritas' },
      { url: `${BASE_URL}/recetas/creacion`, description: 'Crear Recetas' },
      { url: `${BASE_URL}/recetas/buscador`, description: 'Buscador de Recetas' },
      { url: `${BASE_URL}/consejos/favoritosc`, description: 'Consejos Favoritos' },
      { url: `${BASE_URL}/consejos/buscadorc`, description: 'Buscador de Consejos' },
      { url: `${BASE_URL}/administrador/crearu`, description: 'Crear Usuario en Administrador' },
      { url: `${BASE_URL}/administrador/creacionr`, description: 'Crear Receta en Administrador' },
      { url: `${BASE_URL}/administrador/creacionc`, description: 'Crear Consejo en Administrador' },
    ];

    // Navegar a las diferentes páginas
    for (const { url, description } of pagesToVisit) {
      await visitPage(url, description); // Esperar hasta que se haga clic en la página
    }

    // Mantener el navegador abierto para inspeccionar
    console.log('Proceso finalizado. El navegador permanecerá abierto.');
    await page.waitForTimeout(30000); // Mantener el navegador abierto por 30 segundos más
    // Si deseas cerrarlo manualmente, comenta la línea de abajo
    await browser.close();
  } catch (error) {
    console.error('Ocurrió un error:', error);
  }
})();
