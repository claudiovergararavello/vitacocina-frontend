# Vitacocina: Aplicación de Gestión de Recetas y Consejos de Cocina

Vitacocina es una aplicación web diseñada para ayudar a los usuarios a gestionar recetas y consejos de cocina de manera fácil y efectiva. La plataforma permite a los usuarios crear, editar y visualizar recetas, así como acceder a consejos útiles que mejoran su experiencia culinaria. Con una interfaz intuitiva y funcionalidades como la búsqueda y filtrado de recetas, Vitacocina busca ser una herramienta útil para aquellos que desean mejorar sus habilidades en la cocina.

## Video Entrega 1
Veasé [Video Entrega 1](https://drive.google.com/file/d/1B3rjq94RmdHwjjrV9jQNVyUdSfMg4INa/view?usp=drive_link) para más información del proyecto.

## Descripción del Proyecto

Vitacocina es una aplicación web que permite a los usuarios gestionar sus recetas y consejos de cocina de manera eficiente. Esta aplicación está destinada principalmente a personas jóvenes con poca experiencia en la cocina, proporcionando una plataforma fácil de usar donde pueden aprender, explorar y experimentar con nuevas recetas.

### Funcionalidades Clave

- **Gestión de Recetas**: Los usuarios pueden crear, editar y eliminar recetas, incluyendo detalles como ingredientes y pasos de preparación.
- **Consejos de Cocina**: Sección dedicada a consejos útiles que ayudan a mejorar las habilidades culinarias de los usuarios.
- **Favoritos**: Los usuarios pueden marcar recetas y consejos como favoritos para un acceso rápido y fácil.
- **Búsqueda y Filtrado**: Funcionalidad que permite buscar recetas y consejos por categoría, tiempo de preparación y nivel de habilidad.
- **Interfaz Intuitiva**: Diseño amigable que facilita la navegación y el uso de la aplicación, incluso para principiantes.

## Instalación

Para instalar y ejecutar Vitacocina en tu entorno local, sigue estos pasos:

### Requisitos Previos

Asegúrate de tener instalados los siguientes programas en tu máquina:

- **Node.js** (v14 o superior)
- **npm** (v6 o superior)

### Pasos de Instalación

1. **Clona el repositorio**:
   Abre tu terminal y ejecuta el siguiente comando para clonar el repositorio de Vitacocina:

   ```bash
   git clone https://github.com/claudiovergararavello/vitacocina-frontend.git

2. **Navega al directorio del proyecto: Cambia al directorio del proyecto clonado**:

    ```bash
    cd vitacocina-frontend

3. **Instala las dependencias: Ejecuta el siguiente comando para instalar todas las dependencias necesarias**:

    ```bash
    npm install

4. **Ejecuta la aplicación: Una vez que todas las dependencias estén instaladas, puedes iniciar la aplicación en modo desarrollo con**:

    ```bash
    npm start

Abre tu navegador y visita http://localhost:3000 para ver la aplicación en acción.

**Notas Adicionales**
Asegúrate de tener una conexión a internet activa, ya que algunas dependencias pueden requerir descargar paquetes adicionales.
Si encuentras algún problema durante la instalación, verifica que tu versión de Node.js y npm sea compatible con el proyecto.

## Uso

Una vez que hayas instalado Vitacocina, puedes empezar a usar la aplicación. A continuación se describen las funcionalidades principales y cómo interactuar con ellas.

## Navegación

La aplicación se estructura en diferentes secciones accesibles desde el menú principal. Las secciones incluyen:

- **Inicio**: Muestra una vista general de las recetas y consejos más populares.
- **Recetas**: Permite buscar, ver y crear recetas.
- **Consejos**: Ofrece recomendaciones sobre cocina y otros temas relacionados.
- **Administrador**: Área restringida para la gestión de usuarios y contenido.

## Funcionalidades Principales

### Inicio

- **Visualización de Recetas**: Las recetas más populares se muestran en un carrusel.
- **Consejos**: Se presentan consejos destacados para ayudar a los usuarios.

### Recetas

- **Buscar Recetas**: Utiliza el buscador para encontrar recetas por nombre, ingredientes o categorías.
- **Crear Receta**: Permite a los usuarios agregar nuevas recetas a la base de datos.
- **Favoritos**: Los usuarios pueden marcar recetas como favoritas para acceder rápidamente a ellas.

### Consejos

- **Visualización de Consejos**: Se pueden ver consejos individuales y evaluarlos con estrellas.
- **Favoritos**: Los usuarios pueden guardar sus consejos favoritos para referencia futura.

### Administrador

- **Gestión de Usuarios**: Permite crear, editar y eliminar usuarios.
- **Gestión de Recetas**: Facilita la creación, edición y eliminación de recetas.
- **Gestión de Consejos**: Permite a los administradores agregar y modificar consejos en la aplicación.

## Ejemplo de Uso

Para empezar a usar la aplicación:

1. Abre el navegador y ve a [http://localhost:3000](http://localhost:3000).
2. Navega a las secciones utilizando el menú en la parte superior.
3. Explora las recetas y consejos disponibles.
4. Si eres un administrador, utiliza las funciones de gestión para mantener el contenido actualizado.

## Pruebas

El proyecto incluye pruebas automatizadas para garantizar que todas las funcionalidades funcionen correctamente. Se utilizan herramientas como **Puppeteer** para realizar las pruebas.

## Ejecución de Pruebas

Para ejecutar las pruebas, sigue estos pasos:

### Pruebas E2E (End-to-End)

Para ejecutar las pruebas de extremo a extremo (E2E) con Puppeteer:

1. Asegúrate de que la aplicación esté corriendo en `http://localhost:3000`.
2. Abre otra terminal y navega al directorio del proyecto.
3. Ejecuta las pruebas de Puppeteer.

Las pruebas automatizadas disponibles son las siguientes:

- **puppeteerTest.js**: Realiza pruebas de navegación en diferentes secciones de la aplicación.
- **puppeteerLogTest.js**: Prueba la funcionalidad de inicio de sesión.
- **puppeteerRegisTest.js**: Prueba la funcionalidad de registro.
- **puppeteerCCTest.js**: Realiza pruebas en la sección de consejos.
- **puppeteerCRTest.js**: Realiza pruebas en la creación de recetas.
- **puppeteerCUTest.js**: Realiza pruebas en la creación de usuarios.
- **puppeteerIniTest.js**: Realiza pruebas en la sección de inicio.

## Estructura de Pruebas

Las pruebas automatizadas están organizadas de la siguiente manera:

- **Test/**: Contiene todos los scripts de prueba de Puppeteer.

### Notas Adicionales

- Asegúrate de que la aplicación esté en funcionamiento antes de ejecutar las pruebas E2E.

## Tecnologías Utilizadas

El proyecto Vitacocina utiliza una variedad de tecnologías y herramientas que facilitan su desarrollo y funcionamiento. A continuación se detallan las principales tecnologías empleadas:

## Frontend

- **React**: Una biblioteca de JavaScript para construir interfaces de usuario, utilizada para desarrollar la aplicación.
- **Axios**: Una biblioteca para realizar solicitudes HTTP, utilizada para interactuar con las APIs.
- **Puppeteer**: Herramienta para realizar pruebas automatizadas de navegación en la aplicación.

## Backend

- **AWS (Amazon Web Services)**: Plataforma de servicios en la nube que proporciona una variedad de servicios de infraestructura y computación, incluyendo almacenamiento, bases de datos (DynamoDB), gestión y creación de apis (Funciones Lambda/API Gateway), y despliegue de aplicaciones. Se utiliza para asegurar la escalabilidad y disponibilidad de la aplicación.

## Herramientas de Desarrollo

- **npm**: Gestor de paquetes para JavaScript, utilizado para manejar las dependencias del proyecto.
- **Git**: Sistema de control de versiones utilizado para gestionar el código fuente y la colaboración entre desarrolladores.

## Estilos

- **CSS**: Se utiliza para dar estilo a la aplicación, asegurando que la interfaz sea atractiva y fácil de usar.

### Notas Adicionales

- Todas las tecnologías y bibliotecas utilizadas en este proyecto son de código abierto y están bien documentadas, lo que facilita su aprendizaje y uso.

## Contribuciones

Las contribuciones son bienvenidas y se agradecen. Si deseas contribuir al proyecto Vitacocina, sigue estos pasos:

## Pasos para Contribuir

1. **Fork el Repositorio**: Haz un fork del repositorio original en GitHub.
   
2. **Crea una Nueva Rama**: Crea una nueva rama para tu funcionalidad o corrección de errores:
   - Utiliza un nombre descriptivo para la rama que refleje la mejora que deseas realizar.
   
3. **Realiza Cambios**: Realiza los cambios que desees en tu rama local. Asegúrate de seguir las buenas prácticas de codificación y de mantener la calidad del código.

4. **Realiza Pruebas**: Asegúrate de que todos los tests pasen y que tu código no rompa la funcionalidad existente.

5. **Envía un Pull Request**: Una vez que estés listo, envía un pull request desde tu rama al repositorio original. Describe claramente los cambios realizados y la razón de tu contribución.

## Código de Conducta

Se espera que todos los contribuyentes sigan un código de conducta que fomente un entorno de colaboración y respeto. Por favor, asegúrate de leer y entender nuestras pautas de conducta antes de contribuir.

### Notas Adicionales

- Las contribuciones pueden incluir, pero no se limitan a: corrección de errores, mejoras en la documentación, nuevas características y mejoras en el rendimiento.
- Agradecemos cualquier tipo de contribución, grande o pequeña. ¡Gracias por tu interés en mejorar Vitacocina!

## Licencia

Este proyecto está bajo la Licencia MIT. Puedes usar, modificar y distribuir el código fuente según los términos de esta licencia.

## Detalles de la Licencia

La Licencia MIT es una de las licencias más permisivas. Permite a los desarrolladores hacer lo siguiente:

- Usar el software para cualquier propósito.
- Modificar el software y distribuir sus modificaciones.
- Distribuir copias del software original.

### Condiciones

La única condición es que se incluya el aviso de copyright y la nota de licencia en todas las copias o partes sustanciales del software.

## Aprendizaje
### Claudio
### Esteban
### Rodrigo
- Gracias al desarrollo hasta este momento del proyecto, he aprendido una forma de trabajo grupal basada en nuevas herramientas, tales como Jira, Slack y el sistema de ramas de GitHub, herramientas que resultan muy útiles y efectivas para el trabajo en equipo y que previamente no había utilizado. Además, gracias a la ayuda y colaboración de mis compañeros aprendí el funcionamiento de Apis y AWS para el uso común de los datos en la base de datos.






