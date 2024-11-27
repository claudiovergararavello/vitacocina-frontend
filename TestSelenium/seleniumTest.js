const { Builder } = require('selenium-webdriver');

(async () => {
  try {
    // Iniciar el navegador
    const driver = await new Builder().forBrowser('chrome').build();

    // Función para visitar una página automáticamente
    const visitPage = async (url, description) => {
      try {
        console.log(`Accediendo a: ${description} -> ${url}`);
        await driver.get(url);

        // Esperar unos segundos para que la página cargue completamente
        await driver.sleep(3000); // Esperar 3 segundos
        console.log(`Página cargada: ${description}`);
      } catch (err) {
        console.error(`Error al intentar acceder a: ${url} ->`, err);
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
      await visitPage(url, description); // Navegar a cada página automáticamente
    }

    console.log('Proceso finalizado. El navegador permanecerá abierto por 10 segundos.');
    await driver.sleep(10000); // Mantener el navegador abierto por 30 segundos
    // Si deseas cerrarlo automáticamente, descomenta la línea de abajo
    await driver.quit();
  } catch (error) {
    console.error('Ocurrió un error:', error);
  }
})();
