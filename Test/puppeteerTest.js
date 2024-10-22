const puppeteer = require('puppeteer');

(async () => {
  try {
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
      { url: 'http://localhost:3000', description: 'Página Principal' },
      { url: 'http://localhost:3000/recetas/favoritos', description: 'Recetas Favoritas' },
      { url: 'http://localhost:3000/recetas/creacion', description: 'Crear Recetas' },
      { url: 'http://localhost:3000/recetas/buscador', description: 'Buscador de Recetas' },
      { url: 'http://localhost:3000/consejos/favoritosc', description: 'Consejos Favoritos' },
      { url: 'http://localhost:3000/consejos/buscadorc', description: 'Buscador de Consejos' },
      { url: 'http://localhost:3000/administrador/crearu', description: 'Crear Usuario en Administrador' },
      { url: 'http://localhost:3000/administrador/creacionr', description: 'Crear Receta en Administrador' },
      { url: 'http://localhost:3000/administrador/creacionc', description: 'Crear Consejo en Administrador' },
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
