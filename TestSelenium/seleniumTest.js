const { Builder } = require('selenium-webdriver');

(async () => {
  try {

    const BASE_URL = process.env.BASE_URL || 'http://vitacocina-jenkins.s3-website-sa-east-1.amazonaws.com';

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
